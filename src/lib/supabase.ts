import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('❌ Missing Supabase environment variables.')
}

// ✅ Smart redirect detection for GitHub Pages and localhost
const getRedirectUrl = () => {
  if (typeof window === 'undefined') return 'http://localhost:5173/'
  const { origin, pathname } = window.location
  if (origin.includes('github.io')) {
    const repo = pathname.split('/')[1] || ''
    return `${origin}/${repo ? repo + '/' : ''}`
  }
  return 'http://localhost:5173/'
}

const redirectTo = getRedirectUrl()
console.log('🔁 Supabase redirect URL:', redirectTo)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    redirectTo,
  },
})
