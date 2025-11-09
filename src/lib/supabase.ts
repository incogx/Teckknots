import { createClient } from '@supabase/supabase-js'

// 🧩 Load environment variables from Vite (.env, Vercel dashboard, etc.)
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables. Please check your .env file.')
}

// 🌐 Determine correct redirect URL automatically
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5173/'

  const { origin } = window.location

  // 🏡 Local development
  if (origin.includes('localhost')) {
    return 'http://localhost:5173/'
  }

  // 🚀 Vercel production
  if (origin.includes('vercel.app')) {
    return `${origin}/`
  }

  // 🧠 Fallback (for custom domain or other host)
  return `${origin}/`
}

const redirectTo = getRedirectUrl()
console.log('🔁 Supabase redirect URL:', redirectTo)

// ✅ Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo,
  },
})
