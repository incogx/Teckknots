import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { supabase, type AuthUser } from "./lib/supabase";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ContactPage from "./pages/ContactPage";
import ExplorePage from "./pages/ExplorePage";
import CourseDetailPage from "./pages/CourseDetailPage";
import { Toaster, toast } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

type Page =
  | "home"
  | "login"
  | "signup"
  | "explore"
  | "contact"
  | "course-detail";

function App() {
  const [currentPage, setCurrentPage] = useState<Page>("home");
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
  const [pendingCourse, setPendingCourse] = useState<any | null>(null);
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => {
    const handleOAuthRedirect = async () => {
      const hash = window.location.hash;
      if (hash.includes("access_token")) {
        const { data, error } = await supabase.auth.getSessionFromUrl({
          storeSession: true,
        });
        if (data?.session?.user) {
          const { user } = data.session;
          setUser({
            id: user.id,
            email: user.email || "",
            user_metadata: user.user_metadata,
          });
          const name =
            user.user_metadata?.full_name ||
            user.user_metadata?.name ||
            "Learner";
          toast.success(`Welcome, ${name}! 👋`);

          if (pendingCourse) {
            setSelectedCourse(pendingCourse);
            setPendingCourse(null);
            setCurrentPage("course-detail");
          } else setCurrentPage("home");
        }
        if (error) console.error("OAuth redirect error:", error);
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    };

    handleOAuthRedirect();
    checkAuthStatus();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser({
          id: session.user.id,
          email: session.user.email || "",
          user_metadata: session.user.user_metadata,
        });
      } else setUser(null);
    });

    return () => subscription.unsubscribe();
  }, [pendingCourse]);

  const checkAuthStatus = async () => {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user) {
        setUser({
          id: data.session.user.id,
          email: data.session.user.email || "",
          user_metadata: data.session.user.user_metadata,
        });
      }
    } catch (error) {
      console.error("Error checking auth:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      setUser(null);
      setCurrentPage("home");
      toast.success("You’ve logged out successfully 👋");
    } catch {
      toast.error("Logout failed. Try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#004d26] dark:border-[#00ff99]" />
      </div>
    );
  }

  const fadeTransition = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.25 },
  };

  // 🧊 macOS-style modal (with reduced blur)
  const LoginRequiredModal = () => {
    if (typeof document === "undefined") return null;
    return createPortal(
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-md" // 🔹 reduced blur here
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setShowLoginModal(false)}
          >
            <motion.div
              className="relative bg-white/60 dark:bg-gray-900/60 border border-white/30 dark:border-gray-700/40 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.3)] p-8 max-w-sm w-[90%] text-center backdrop-blur-lg" // 🔹 inner blur slightly lowered
              initial={{ scale: 0.85, y: -20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 140, damping: 15 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent dark:from-white/10 rounded-2xl pointer-events-none" />
              <div className="relative">
                <h2 className="text-3xl font-bold text-[#004d26] dark:text-[#00ff99] mb-3">
                  Login Required
                </h2>
                <p className="text-gray-700 dark:text-gray-400 mb-8">
                  Please log in or sign up to access this course.
                </p>
                <div className="flex justify-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowLoginModal(false);
                      setCurrentPage("login");
                    }}
                    className="px-5 py-2.5 bg-[#004d26] text-white rounded-lg hover:bg-[#003d1f] font-semibold shadow-md transition-all"
                  >
                    Login
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setShowLoginModal(false);
                      setCurrentPage("signup");
                    }}
                    className="px-5 py-2.5 border border-[#004d26] text-[#004d26] dark:border-[#00ff99] dark:text-[#00ff99] rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 font-semibold shadow-sm transition-all"
                  >
                    Sign Up
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    );
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
      <Header
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        user={user}
        onLogout={handleLogout}
      />

      <main className="relative">
        <AnimatePresence mode="wait">
          {currentPage === "home" && (
            <motion.div key="home" {...fadeTransition}>
              <HomePage
                onNavigate={(page: Page, course?: any) => {
                  if (page === "course-detail" && course) {
                    if (!user) {
                      setPendingCourse(course);
                      setShowLoginModal(true);
                      return;
                    }
                    setSelectedCourse(course);
                  }
                  setCurrentPage(page);
                }}
              />
            </motion.div>
          )}

          {currentPage === "login" && (
            <motion.div key="login" {...fadeTransition}>
              <LoginPage
                onNavigate={setCurrentPage}
                onLoginSuccess={() => {
                  if (pendingCourse) {
                    setSelectedCourse(pendingCourse);
                    setPendingCourse(null);
                    setCurrentPage("course-detail");
                  } else {
                    setCurrentPage("home");
                  }
                  toast.success("Welcome back! 👋");
                }}
              />
            </motion.div>
          )}

          {currentPage === "signup" && (
            <motion.div key="signup" {...fadeTransition}>
              <SignupPage
                onNavigate={setCurrentPage}
                onSignupSuccess={() => {
                  if (pendingCourse) {
                    setSelectedCourse(pendingCourse);
                    setPendingCourse(null);
                    setCurrentPage("course-detail");
                  } else {
                    setCurrentPage("home");
                  }
                  toast.success("Account created successfully! 🎉");
                }}
              />
            </motion.div>
          )}

          {currentPage === "explore" && (
            <motion.div key="explore" {...fadeTransition}>
              <ExplorePage
                onNavigate={setCurrentPage}
                onSelectCourse={(course) => {
                  if (!user) {
                    setPendingCourse(course);
                    setShowLoginModal(true);
                    return;
                  }
                  setSelectedCourse(course);
                  setCurrentPage("course-detail");
                }}
              />
            </motion.div>
          )}

          {currentPage === "contact" && (
            <motion.div key="contact" {...fadeTransition}>
              <ContactPage user={user} onNavigate={setCurrentPage} />
            </motion.div>
          )}

          {currentPage === "course-detail" && selectedCourse && (
            <motion.div key="course-detail" {...fadeTransition}>
              <CourseDetailPage
                onNavigate={setCurrentPage}
                course={selectedCourse}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <LoginRequiredModal />
    </div>
  );
}

export default App;
