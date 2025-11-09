/*
  # TechKnots LMS Schema (v4, hardened & idempotent)

  Includes:
  - Users, Lessons, Quizzes, Progress, Attempts
  - Safe role management (role locked for non-admins)
  - Admin-only `set_user_role()` RPC
  - Full RLS policies
  - Trigger for Auth sync
*/

------------------------------------------------------------
-- 🧩 USERS TABLE (Linked to auth.users)
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.users (
  id uuid PRIMARY KEY, -- must match auth.users.id
  email text UNIQUE NOT NULL,
  full_name text DEFAULT '',
  role text NOT NULL DEFAULT 'student',
  avatar_url text DEFAULT NULL,
  bio text DEFAULT '',
  can_edit boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

------------------------------------------------------------
-- 🔄 TRIGGER: Sync new Auth users → Public.users
------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

------------------------------------------------------------
-- 🧱 LESSONS
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  difficulty text CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  category text NOT NULL DEFAULT 'general',
  created_by uuid REFERENCES public.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

------------------------------------------------------------
-- 🧩 QUIZZES
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  passing_score integer CHECK (passing_score BETWEEN 0 AND 100) DEFAULT 70,
  created_at timestamptz DEFAULT now()
);

------------------------------------------------------------
-- 📈 USER PROGRESS
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES public.lessons(id) ON DELETE CASCADE,
  status text CHECK (status IN ('not_started', 'in_progress', 'completed')) DEFAULT 'not_started',
  completion_percentage integer CHECK (completion_percentage BETWEEN 0 AND 100) DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE (user_id, lesson_id)
);

------------------------------------------------------------
-- 🧪 QUIZ ATTEMPTS
------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES public.quizzes(id) ON DELETE CASCADE,
  score integer CHECK (score BETWEEN 0 AND 100),
  answers jsonb NOT NULL DEFAULT '{}',
  completed_at timestamptz DEFAULT now()
);

------------------------------------------------------------
-- 🔒 ROLE PROTECTION TRIGGER
------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.prevent_role_edit()
RETURNS TRIGGER AS $$
DECLARE
  is_admin boolean;
BEGIN
  SELECT (role = 'admin') INTO is_admin
  FROM public.users
  WHERE id = auth.uid();

  IF (NOT is_admin) AND (NEW.role IS DISTINCT FROM OLD.role) THEN
    RAISE EXCEPTION 'Unauthorized: You cannot modify your role.';
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS prevent_role_update ON public.users;
CREATE TRIGGER prevent_role_update
BEFORE UPDATE ON public.users
FOR EACH ROW
EXECUTE FUNCTION public.prevent_role_edit();

------------------------------------------------------------
-- 🧰 ADMIN ROLE MANAGEMENT FUNCTION
------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.set_user_role(target_user uuid, new_role text)
RETURNS void AS $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM public.users WHERE id = auth.uid() AND role = 'admin'
  ) THEN
    RAISE EXCEPTION 'Unauthorized: Only admins can set roles.';
  END IF;

  IF new_role NOT IN ('student','instructor','admin') THEN
    RAISE EXCEPTION 'Invalid role value.';
  END IF;

  UPDATE public.users
  SET role = new_role, updated_at = now()
  WHERE id = target_user;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

------------------------------------------------------------
-- 🧱 ROW LEVEL SECURITY POLICIES
------------------------------------------------------------
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

-- USERS
DO $$ BEGIN
  CREATE POLICY "Users can view their own profile"
    ON public.users FOR SELECT
    TO authenticated
    USING (auth.uid() = id);

  CREATE POLICY "Users can update their own profile safely"
    ON public.users FOR UPDATE
    TO authenticated
    USING (auth.uid() = id AND can_edit = true)
    WITH CHECK (auth.uid() = id AND can_edit = true AND role IS NOT DISTINCT FROM old.role);

  CREATE POLICY "Admins can manage users"
    ON public.users FOR ALL
    TO authenticated
    USING (EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'))
    WITH CHECK (EXISTS (SELECT 1 FROM public.users u WHERE u.id = auth.uid() AND u.role = 'admin'));
END $$;

-- LESSONS
DO $$ BEGIN
  CREATE POLICY "Anyone can view lessons"
    ON public.lessons FOR SELECT TO authenticated USING (true);

  CREATE POLICY "Instructors can create lessons"
    ON public.lessons FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('instructor', 'admin')
    ));

  CREATE POLICY "Instructors can update own lessons"
    ON public.lessons FOR UPDATE TO authenticated
    USING (created_by = auth.uid()) WITH CHECK (created_by = auth.uid());

  CREATE POLICY "Instructors can delete own lessons"
    ON public.lessons FOR DELETE TO authenticated
    USING (created_by = auth.uid());
END $$;

-- QUIZZES
DO $$ BEGIN
  CREATE POLICY "Anyone can view quizzes"
    ON public.quizzes FOR SELECT TO authenticated USING (true);

  CREATE POLICY "Instructors can create quizzes"
    ON public.quizzes FOR INSERT TO authenticated
    WITH CHECK (EXISTS (
      SELECT 1 FROM public.users
      WHERE id = auth.uid() AND role IN ('instructor', 'admin')
    ));

  CREATE POLICY "Instructors can update their quizzes"
    ON public.quizzes FOR UPDATE TO authenticated
    USING (EXISTS (
      SELECT 1 FROM public.lessons
      WHERE lessons.id = quizzes.lesson_id AND lessons.created_by = auth.uid()
    ));
END $$;

-- USER PROGRESS
DO $$ BEGIN
  CREATE POLICY "Users can view their progress"
    ON public.user_progress FOR SELECT TO authenticated USING (user_id = auth.uid());

  CREATE POLICY "Users can create progress for themselves"
    ON public.user_progress FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

  CREATE POLICY "Users can update their own progress"
    ON public.user_progress FOR UPDATE TO authenticated
    USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
END $$;

-- QUIZ ATTEMPTS
DO $$ BEGIN
  CREATE POLICY "Users can view their quiz attempts"
    ON public.quiz_attempts FOR SELECT TO authenticated USING (user_id = auth.uid());

  CREATE POLICY "Users can insert their quiz attempts"
    ON public.quiz_attempts FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
END $$;

------------------------------------------------------------
-- ⚙️ INDEXES
------------------------------------------------------------
CREATE INDEX IF NOT EXISTS idx_lessons_category ON public.lessons(category);
CREATE INDEX IF NOT EXISTS idx_progress_user ON public.user_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson ON public.user_progress(lesson_id);
CREATE INDEX IF NOT EXISTS idx_quizzes_lesson ON public.quizzes(lesson_id);
CREATE INDEX IF NOT EXISTS idx_attempts_user ON public.quiz_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_attempts_quiz ON public.quiz_attempts(quiz_id);

------------------------------------------------------------
-- ✅ BACKFILL EXISTING USERS
------------------------------------------------------------
INSERT INTO public.users (id, email, full_name)
SELECT id, email, COALESCE(raw_user_meta_data->>'full_name', email)
FROM auth.users
ON CONFLICT (id) DO NOTHING;
