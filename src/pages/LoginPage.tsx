import { useState } from "react";
import { supabase } from "../lib/supabase";
import { Mail, Lock, Github } from "lucide-react";
import { motion } from "framer-motion";

interface LoginPageProps {
  onNavigate: (page: string) => void;
  onLoginSuccess: () => void;
}

export default function LoginPage({
  onNavigate,
  onLoginSuccess,
}: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) setError(error.message);
      else onLoginSuccess();
    } catch {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = async (provider: "google" | "github") => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}` },
      });
      if (error) setError(error.message);
    } catch {
      setError(`Failed to sign in with ${provider}`);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel */}
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex md:w-1/2 bg-gradient-to-br from-[#004d26] to-[#1a7735] dark:from-gray-900 dark:to-gray-800 items-center justify-center text-white p-12"
      >
        <div className="max-w-md text-center space-y-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="w-24 h-24 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm"
          >
            <Mail className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="text-4xl font-bold">Welcome Back</h2>
          <p className="text-lg opacity-90">
            Continue your journey with TechKnots Academy
          </p>
        </div>
      </motion.div>

      {/* Right Panel */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="w-full max-w-md p-8 sm:p-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Login
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Sign in to continue learning
          </p>

          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/40 border border-red-200 dark:border-red-700 rounded-lg">
                <p className="text-red-700 dark:text-red-400 text-sm font-medium">
                  {error}
                </p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#004d26] dark:focus:ring-[#00ff99] outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-[#004d26] dark:focus:ring-[#00ff99] outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold rounded-lg hover:bg-[#003d1f] dark:hover:bg-[#00cc80] transition-colors disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Continue"}
            </button>
          </form>

          {/* OAuth Buttons */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              Or continue with
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleOAuth("google")}
                className="py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                <span>🌐 Google</span>
              </button>
              <button
                onClick={() => handleOAuth("github")}
                className="py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2 text-gray-700 dark:text-gray-300"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
            Don’t have an account?{" "}
            <button
              onClick={() => onNavigate("signup")}
              className="text-[#004d26] dark:text-[#00ff99] font-semibold hover:underline"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
