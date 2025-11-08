import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Lock, User, Github } from 'lucide-react';

interface SignupPageProps {
  onNavigate: (page: string) => void;
  onSignupSuccess: () => void;
}

export default function SignupPage({ onNavigate, onSignupSuccess }: SignupPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (error) {
        setError(error.message);
      } else {
        onSignupSuccess();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with Google');
    }
  };

  const handleGithubSignup = async () => {
    setError('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
          redirectTo: `${window.location.origin}`,
        },
      });

      if (error) {
        setError(error.message);
      }
    } catch (err) {
      setError('Failed to sign up with GitHub');
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#004d26] to-[#1a7735] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="white" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative flex flex-col items-center justify-center w-full h-full text-white p-12">
          <div className="max-w-md text-center">
            <div className="mb-8">
              <div className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                <User className="w-12 h-12 text-white" />
              </div>
              <h2 className="text-4xl font-bold mb-4">Start Learning Today</h2>
              <p className="text-lg opacity-90">Join thousands of students mastering in-demand tech skills</p>
            </div>

            <div className="space-y-4 mt-12">
              <div className="flex items-center space-x-3 opacity-75">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Free account setup</span>
              </div>
              <div className="flex items-center space-x-3 opacity-75">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Instant access to courses</span>
              </div>
              <div className="flex items-center space-x-3 opacity-75">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">✓</div>
                <span>Get certified</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
            <p className="text-gray-600">Create your account to begin your learning journey</p>
          </div>

          <form onSubmit={handleSignup} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700 text-sm font-medium">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d26] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d26] focus:border-transparent"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004d26] focus:border-transparent"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">At least 8 characters</p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#004d26] text-white font-semibold rounded-lg hover:bg-[#003d1f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Creating Account...' : 'Continue'}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or sign up with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                onClick={handleGoogleSignup}
                className="py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fontFamily="Arial" fill="currentColor">
                    G
                  </text>
                </svg>
                <span className="text-sm font-medium">Google</span>
              </button>
              <button
                onClick={handleGithubSignup}
                className="py-2.5 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm font-medium">GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600">
            Already have an account?{' '}
            <button
              onClick={() => onNavigate('login')}
              className="text-[#004d26] font-semibold hover:underline"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
