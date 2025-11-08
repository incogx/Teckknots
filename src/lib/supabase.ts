import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lesson = {
  id: string;
  title: string;
  description: string;
  content: Record<string, unknown>;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  created_by: string;
  created_at: string;
  updated_at: string;
};

export type Quiz = {
  id: string;
  lesson_id: string;
  title: string;
  questions: QuizQuestion[];
  passing_score: number;
  created_at: string;
};

export type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
};

export type UserProgress = {
  id: string;
  user_id: string;
  lesson_id: string;
  status: 'not_started' | 'in_progress' | 'completed';
  completion_percentage: number;
  last_accessed: string;
  created_at: string;
};

export type QuizAttempt = {
  id: string;
  user_id: string;
  quiz_id: string;
  score: number;
  answers: Record<string, number>;
  completed_at: string;
};

export type Course = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  students_enrolled: number;
  created_at: string;
};

export type AuthUser = {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
};
