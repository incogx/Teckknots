/*
  # Teckknots Educational Platform Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key) - Unique user identifier
      - `email` (text, unique) - User email address
      - `full_name` (text) - User's full name
      - `role` (text) - User role (student, instructor, admin)
      - `created_at` (timestamptz) - Account creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `lessons`
      - `id` (uuid, primary key) - Unique lesson identifier
      - `title` (text) - Lesson title
      - `description` (text) - Lesson description
      - `content` (jsonb) - Lesson content structure
      - `difficulty` (text) - Difficulty level (beginner, intermediate, advanced)
      - `category` (text) - Category (coding, hardware, networking, etc.)
      - `created_by` (uuid) - Foreign key to users
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
    
    - `quizzes`
      - `id` (uuid, primary key) - Unique quiz identifier
      - `lesson_id` (uuid) - Foreign key to lessons
      - `title` (text) - Quiz title
      - `questions` (jsonb) - Array of questions with options and answers
      - `passing_score` (integer) - Minimum score to pass (0-100)
      - `created_at` (timestamptz) - Creation timestamp
    
    - `user_progress`
      - `id` (uuid, primary key) - Unique progress record identifier
      - `user_id` (uuid) - Foreign key to users
      - `lesson_id` (uuid) - Foreign key to lessons
      - `status` (text) - Status (not_started, in_progress, completed)
      - `completion_percentage` (integer) - Progress percentage (0-100)
      - `last_accessed` (timestamptz) - Last access timestamp
      - `created_at` (timestamptz) - Initial enrollment timestamp
    
    - `quiz_attempts`
      - `id` (uuid, primary key) - Unique attempt identifier
      - `user_id` (uuid) - Foreign key to users
      - `quiz_id` (uuid) - Foreign key to quizzes
      - `score` (integer) - Score achieved (0-100)
      - `answers` (jsonb) - User's answers
      - `completed_at` (timestamptz) - Completion timestamp

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access their own data
    - Instructors can create and manage lessons
    - Students can view lessons and track progress
*/

CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role text NOT NULL DEFAULT 'student',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lessons (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  content jsonb NOT NULL DEFAULT '{}',
  difficulty text NOT NULL DEFAULT 'beginner',
  category text NOT NULL,
  created_by uuid REFERENCES users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quizzes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  title text NOT NULL,
  questions jsonb NOT NULL DEFAULT '[]',
  passing_score integer NOT NULL DEFAULT 70,
  created_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  lesson_id uuid REFERENCES lessons(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'not_started',
  completion_percentage integer NOT NULL DEFAULT 0,
  last_accessed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE CASCADE,
  quiz_id uuid REFERENCES quizzes(id) ON DELETE CASCADE,
  score integer NOT NULL,
  answers jsonb NOT NULL DEFAULT '{}',
  completed_at timestamptz DEFAULT now()
);

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Anyone can view published lessons"
  ON lessons FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Instructors can create lessons"
  ON lessons FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update own lessons"
  ON lessons FOR UPDATE
  TO authenticated
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());

CREATE POLICY "Instructors can delete own lessons"
  ON lessons FOR DELETE
  TO authenticated
  USING (created_by = auth.uid());

CREATE POLICY "Users can view quizzes for accessible lessons"
  ON quizzes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Instructors can create quizzes"
  ON quizzes FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM users
      WHERE users.id = auth.uid()
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Users can view own progress"
  ON user_progress FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own progress"
  ON user_progress FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own progress"
  ON user_progress FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid())
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can view own quiz attempts"
  ON quiz_attempts FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create own quiz attempts"
  ON quiz_attempts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());