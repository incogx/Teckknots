import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Bell, Trash2, AlertTriangle } from "lucide-react";
import { supabase } from "../lib/supabase";

interface SettingsPageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export default function SettingsPage({ user, onNavigate }: SettingsPageProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [notifications, setNotifications] = useState<boolean>(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // ✅ Load persisted theme from localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const activeTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(activeTheme);
  }, []);

  // ✅ Toggle theme & persist it
  const handleThemeToggle = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // ✅ Delete Account Handler
  const handleDeleteAccount = async () => {
    try {
      setDeleting(true);
      const { error } = await supabase.auth.admin.deleteUser(user.id);
      if (error) throw error;
      setShowDeleteModal(false);
      alert("Your account has been deleted successfully.");
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Failed to delete account. Please contact support.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex justify-center items-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8"
      >
        <h1 className="text-3xl font-bold text-[#004d26] dark:text-[#00ff99] mb-8 text-center">
          Settings
        </h1>

        <div className="space-y-6">
          {/* 🌗 Theme Toggle */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              {theme === "light" ? (
                <Sun className="w-6 h-6 text-[#004d26] dark:text-[#00ff99]" />
              ) : (
                <Moon className="w-6 h-6 text-[#004d26] dark:text-[#00ff99]" />
              )}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Theme
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Switch between light and dark mode.
                </p>
              </div>
            </div>
            <button
              onClick={handleThemeToggle}
              className="px-4 py-2 rounded-full bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold hover:opacity-90 transition-all shadow-md"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>

          {/* 🔔 Notifications */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Bell className="w-6 h-6 text-[#004d26] dark:text-[#00ff99]" />
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Notifications
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Enable or disable email alerts.
                </p>
              </div>
            </div>
            <button
              onClick={() => setNotifications((prev) => !prev)}
              className={`px-4 py-2 rounded-full font-semibold transition-all shadow-md ${
                notifications
                  ? "bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300"
              }`}
            >
              {notifications ? "Enabled" : "Disabled"}
            </button>
          </div>

          {/* ❌ Delete Account */}
          <div className="flex items-center justify-between py-3 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-6 h-6 text-red-500" />
              <div>
                <h3 className="text-lg font-semibold text-red-600 dark:text-red-400">
                  Delete Account
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Permanently remove your account and all data.
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(true)}
              className="px-4 py-2 rounded-full bg-red-600 text-white font-semibold hover:bg-red-700 transition-all shadow-md"
            >
              Delete
            </button>
          </div>
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => onNavigate("home")}
            className="px-6 py-2 rounded-full bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold hover:opacity-90 transition-all shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </motion.div>

      {/* ⚠️ Delete Account Modal */}
      <AnimatePresence>
        {showDeleteModal && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-md z-[9999]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 14 }}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 text-center max-w-sm w-[90%]"
            >
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-600 dark:text-red-400 mb-2">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete your account? This action cannot
                be undone.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 font-semibold hover:opacity-90 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition-all"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
