import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/attachments/logo.png";
import {
  ChevronDown,
  LogOut,
  Settings,
  User as UserIcon,
  Sun,
  Moon,
} from "lucide-react";
import type { AuthUser } from "../lib/supabase";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  user: AuthUser | null;
  onLogout: () => void;
}

export default function Header({
  currentPage,
  onNavigate,
  user,
  onLogout,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔹 Handle scroll shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔹 Load saved theme
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const activeTheme = storedTheme || "light";
    setTheme(activeTheme);
    document.documentElement.classList.toggle("dark", activeTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  // 🔹 Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isActive = (page: string) =>
    currentPage === page
      ? "text-[#004d26] dark:text-[#00ff99] font-semibold"
      : "text-gray-700 dark:text-gray-200";

  const getDisplayName = () =>
    user?.user_metadata?.full_name || user?.email || "User";

  const getInitials = () => {
    const name = user?.user_metadata?.full_name || user?.email || "";
    return name.charAt(0).toUpperCase();
  };

  return (
    <header
      className={`sticky top-0 z-[1000] bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 transition-all duration-300 ${
        scrolled ? "shadow-md dark:shadow-lg" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          {/* 🔹 LOGO SECTION */}
          <button
            onClick={() => onNavigate("home")}
            className="flex items-center space-x-3 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#004d26]/40 rounded-lg"
          >
            <div className="flex items-center justify-center w-12 h-12">
              <img
                src={logo}
                alt="TechKnots Logo"
                className="h-10 w-auto object-contain"
              />
            </div>
            <div className="text-left">
              <h1 className="text-lg font-bold text-[#004d26] dark:text-[#00ff99]">
                TechKnots
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Academy LLP
              </p>
            </div>
          </button>

          {/* 🔹 NAVIGATION */}
          <nav className="flex items-center space-x-8">
            <button
              onClick={() => onNavigate("explore")}
              className={`${isActive(
                "explore"
              )} hover:text-[#004d26] dark:hover:text-[#00ff99] transition-colors font-medium`}
            >
              Explore
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className={`${isActive(
                "contact"
              )} hover:text-[#004d26] dark:hover:text-[#00ff99] transition-colors font-medium`}
            >
              Contact
            </button>

            {/* 🔹 AUTH MENU */}
            {user ? (
              <div className="relative flex items-center" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen((p) => !p)}
                  className="flex items-center space-x-3 group focus:outline-none"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="w-9 h-9 rounded-full bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 flex items-center justify-center font-semibold shadow-sm"
                  >
                    {getInitials()}
                  </motion.div>
                  <span className="text-sm text-gray-800 dark:text-gray-200 font-medium truncate max-w-[150px] group-hover:text-[#004d26] dark:group-hover:text-[#00ff99] transition-colors">
                    {getDisplayName()}
                  </span>
                  <motion.div
                    animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                  </motion.div>
                </button>

                {/* 🔽 DROPDOWN MENU */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-12 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-100 dark:border-gray-700 w-52 py-2 z-[999]"
                    >
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onNavigate("profile");
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <UserIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>Profile</span>
                      </button>

                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onNavigate("settings");
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Settings className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        <span>Settings</span>
                      </button>

                      <div className="border-t my-1 border-gray-200 dark:border-gray-700"></div>

                      {/* 🌓 THEME TOGGLE */}
                      <button
                        onClick={toggleTheme}
                        className="w-full text-left px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2 transition-colors"
                      >
                        {theme === "light" ? (
                          <>
                            <Moon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            <span>Dark Mode</span>
                          </>
                        ) : (
                          <>
                            <Sun className="w-4 h-4 text-yellow-500" />
                            <span>Light Mode</span>
                          </>
                        )}
                      </button>

                      <div className="border-t my-1 border-gray-200 dark:border-gray-700"></div>

                      {/* 🚪 LOGOUT */}
                      <button
                        onClick={() => {
                          setIsDropdownOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-4 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30 flex items-center space-x-2"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              // 🔹 LOGIN / SIGNUP BUTTONS
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onNavigate("login")}
                  className={`${isActive(
                    "login"
                  )} hover:text-[#004d26] dark:hover:text-[#00ff99] transition-colors font-medium`}
                >
                  Login
                </button>
                <button
                  onClick={() => onNavigate("signup")}
                  className="px-4 py-2 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 rounded-lg hover:bg-[#003d1f] dark:hover:bg-[#00cc80] transition-all font-medium shadow-sm hover:shadow-md"
                >
                  Signup
                </button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}
