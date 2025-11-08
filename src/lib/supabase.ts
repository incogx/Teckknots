import { createClient } from '@supabase/supabase-js';

/**
 * Initialize Supabase client
 */
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * ----------------------------
 * Database Type Definitions
 * ----------------------------
 */

/**
 * Matches the `users` table in Supabase
 */
export type User = {
  id: string; // uuid
  email: string;
  full_name: string;
  role: 'student' | 'instructor' | 'admin';
  created_at: string;
  updated_at: string;
};

/**
 * Matches the `lessons` table
 */
export type Lesson = {
  id: string; // uuid
  title: string;
  description: string;
  content: Record<string, unknown>; // jsonb
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  created_by: string; // user_id (uuid)
  created_at: string;
  updated_at: string;
};

/**
 * Matches the `quizzes` table
 */
export type Quiz = {
  id: string; // uuid
  lesson_id: string; // foreign key to lessons
  title: string;
  questions: QuizQuestion[]; // stored as JSONB
  passing_score: number;
  created_at: string;
};

/**
 * Represents each question object inside `quizzes.questions`
 */
export type QuizQuestion = {
  question: string;
  options: string[];
  correct_answer: number; // matches DB naming style
};

/**
 * Matches the `user_progress` table
 */
export type UserProgress = {
  id: string; // uuid
  user_id: string; // foreign key to users
  lesson_id: string; // foreign key to lessons
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  last_accessed: string;
  created_at: string;
};

/**
 * Matches the `quiz_attempts` table
 */
export type QuizAttempt = {
  id: string; // uuid
  user_id: string; // foreign key to users
  quiz_id: string; // foreign key to quizzes
  score: number;
  answers: Record<string, number>; // stored as JSONB
  completed_at: string;
};

/**
 * Simplified authenticated user structure from Supabase Auth
 */
export type AuthUser = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
    role?: 'student' | 'instructor' | 'admin';
  };
};

/**
 * Helper to get the currently logged-in user
 */
export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}
