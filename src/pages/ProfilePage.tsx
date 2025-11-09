import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Loader2, BookOpen, GraduationCap, Trophy, Clock } from "lucide-react";
import { supabase } from "../lib/supabase";
import toast from "react-hot-toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProfilePageProps {
  user: any;
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ user, onNavigate }: ProfilePageProps) {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    courses: 0,
    quizzes: 0,
    completed: 0,
    total: 0,
    avgCompletion: 0,
  });
  const [recentActivity, setRecentActivity] = useState({
    quizzes: [],
    courses: [],
  });

  useEffect(() => {
    if (user) {
      fetchProfile();
      fetchStats();
      fetchRecentActivity();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("users")
        .select("id, email, full_name, role, created_at")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load profile.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const { data: progressData } = await supabase
        .from("user_progress")
        .select("status")
        .eq("user_id", user.id);

      const total = progressData?.length || 0;
      const completed = progressData?.filter((p) => p.status === "completed").length || 0;

      const { data: allProgress } = await supabase
        .from("user_progress")
        .select("status");

      const totalAll = allProgress?.length || 0;
      const completedAll = allProgress?.filter((p) => p.status === "completed").length || 0;
      const avgCompletion = totalAll > 0 ? (completedAll / totalAll) * 100 : 0;

      const { data: quizAttempts } = await supabase
        .from("quiz_attempts")
        .select("id")
        .eq("user_id", user.id);

      setStats({
        courses: total,
        quizzes: quizAttempts?.length || 0,
        completed,
        total,
        avgCompletion,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const fetchRecentActivity = async () => {
    try {
      const { data: recentQuizzes } = await supabase
        .from("quiz_attempts")
        .select("score, completed_at, quiz_id, quizzes(title)")
        .eq("user_id", user.id)
        .order("completed_at", { ascending: false })
        .limit(3);

      const { data: recentCourses } = await supabase
        .from("user_progress")
        .select("lesson_id, lessons(title), completion_percentage, updated_at")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false })
        .limit(3);

      setRecentActivity({
        quizzes: recentQuizzes || [],
        courses: recentCourses || [],
      });
    } catch (error) {
      console.error("Failed to fetch recent activity:", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <Loader2 className="w-8 h-8 animate-spin text-[#004d26] dark:text-[#00ff99]" />
      </div>
    );

  if (!profile)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-700 dark:text-gray-300">
        <p>Profile not found.</p>
        <button
          onClick={() => onNavigate("home")}
          className="mt-4 px-6 py-2 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );

  const chartData = [
    { name: "You", value: stats.total ? (stats.completed / stats.total) * 100 : 0 },
    { name: "Avg Users", value: stats.avgCompletion },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-6">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 p-10"
      >
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="relative w-28 h-28 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 rounded-full flex items-center justify-center text-4xl font-bold shadow-lg">
            {profile.full_name?.[0]?.toUpperCase() || "U"}
          </div>
          <h1 className="mt-6 text-3xl font-bold text-[#004d26] dark:text-[#00ff99]">
            {profile.full_name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">{profile.email}</p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">
            Member since {new Date(profile.created_at).toLocaleDateString()}
          </p>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner text-center">
            <BookOpen className="w-8 h-8 text-[#004d26] dark:text-[#00ff99] mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Courses Attended</h3>
            <p className="text-2xl font-bold text-[#004d26] dark:text-[#00ff99]">
              {stats.courses}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner text-center">
            <Trophy className="w-8 h-8 text-[#004d26] dark:text-[#00ff99] mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Quizzes Taken</h3>
            <p className="text-2xl font-bold text-[#004d26] dark:text-[#00ff99]">
              {stats.quizzes}
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl shadow-inner text-center">
            <GraduationCap className="w-8 h-8 text-[#004d26] dark:text-[#00ff99] mx-auto mb-3" />
            <h3 className="text-lg font-semibold">Completed Lessons</h3>
            <p className="text-2xl font-bold text-[#004d26] dark:text-[#00ff99]">
              {stats.completed}/{stats.total}
            </p>
          </div>
        </div>

        {/* Completion Comparison Graph */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-inner mb-10">
          <h3 className="text-xl font-semibold mb-4 text-center">
            Completion Comparison
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
              <XAxis dataKey="name" tick={{ fill: "#888" }} />
              <YAxis tick={{ fill: "#888" }} domain={[0, 100]} />
              <Tooltip formatter={(v: number) => `${v.toFixed(1)}%`} />
              <Bar dataKey="value" fill="#00b16a" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
          <p className="text-center text-gray-500 dark:text-gray-400 mt-3">
            See how your completion compares to the average across all users.
          </p>
        </div>

        {/* Recent Activity */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 shadow-inner">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="w-6 h-6 text-[#004d26] dark:text-[#00ff99]" />
            <h3 className="text-xl font-semibold">Recent Activity</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Recent Courses */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-[#004d26] dark:text-[#00ff99]">
                🧩 Recent Courses
              </h4>
              {recentActivity.courses.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivity.courses.map((c: any, i: number) => (
                    <li
                      key={i}
                      className="bg-white/70 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {c.lessons?.title || "Untitled Lesson"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {c.completion_percentage}% completed
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No recent course activity.
                </p>
              )}
            </div>

            {/* Recent Quizzes */}
            <div>
              <h4 className="text-lg font-medium mb-3 text-[#004d26] dark:text-[#00ff99]">
                🧠 Recent Quizzes
              </h4>
              {recentActivity.quizzes.length > 0 ? (
                <ul className="space-y-3">
                  {recentActivity.quizzes.map((q: any, i: number) => (
                    <li
                      key={i}
                      className="bg-white/70 dark:bg-gray-900/60 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
                    >
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {q.quizzes?.title || "Unnamed Quiz"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Score: {q.score ?? "N/A"} |{" "}
                        {new Date(q.completed_at).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No quizzes taken yet.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center mt-10">
          <button
            onClick={() => onNavigate("home")}
            className="text-[#004d26] dark:text-[#00ff99] font-medium hover:underline"
          >
            ← Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}
