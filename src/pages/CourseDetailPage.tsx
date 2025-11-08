import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, Trophy, BarChart3 } from "lucide-react";

interface CourseDetailPageProps {
  onNavigate: (page: string) => void;
  course?: {
    id: number;
    title: string;
    description: string;
    category: string;
    difficulty: string;
    image: string;
  };
}

export default function CourseDetailPage({ onNavigate, course }: CourseDetailPageProps) {
  const mockCourse =
    course || {
      id: 1,
      title: "React for Beginners",
      description:
        "Learn how to build powerful, dynamic front-end applications with React — covering components, hooks, and real-world projects.",
      category: "Web Development",
      difficulty: "beginner",
      image:
        "https://cdn.pixabay.com/photo/2017/01/10/23/01/code-1970468_1280.jpg",
    };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 flex flex-col items-center justify-start pt-20 pb-16 px-6 transition-colors">
      {/* 🌿 Back Button */}
      <motion.button
        onClick={() => onNavigate("explore")}
        className="absolute top-6 left-6 bg-white dark:bg-gray-800 text-[#004d26] dark:text-[#00ff99] px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 font-semibold hover:scale-105 hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Explore</span>
      </motion.button>

      {/* Course Container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-5xl bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden"
      >
        {/* Course Banner */}
        <div className="relative group">
          <img
            src={mockCourse.image}
            alt={mockCourse.title}
            className="w-full h-72 object-cover group-hover:brightness-90 transition-all duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          <div className="absolute bottom-6 left-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg"
            >
              {mockCourse.title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-sm md:text-base text-gray-200 mt-2 font-medium"
            >
              {mockCourse.category} •{" "}
              <span className="uppercase">{mockCourse.difficulty}</span>
            </motion.p>
          </div>
        </div>

        {/* Course Content Section */}
        <div className="p-8 md:p-10 space-y-8">
          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold text-[#004d26] dark:text-[#00ff99] mb-3">
              About this Course
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base md:text-lg">
              {mockCourse.description}
            </p>
          </motion.div>

          {/* Highlights Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid sm:grid-cols-3 gap-6"
          >
            {[
              {
                icon: <BookOpen className="w-8 h-8 text-[#004d26] dark:text-[#00ff99]" />,
                title: "12 Lessons",
                desc: "Interactive chapters covering React fundamentals.",
              },
              {
                icon: <Trophy className="w-8 h-8 text-[#004d26] dark:text-[#00ff99]" />,
                title: "Certificate",
                desc: "Earn a shareable completion certificate.",
              },
              {
                icon: <BarChart3 className="w-8 h-8 text-[#004d26] dark:text-[#00ff99]" />,
                title: "Track Progress",
                desc: "Monitor your learning progress and quiz results.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-6 rounded-xl bg-gray-50 dark:bg-gray-800 shadow-sm text-center border border-gray-200 dark:border-gray-700 transition-all"
              >
                <div className="flex justify-center mb-3">{item.icon}</div>
                <h3 className="font-semibold text-gray-800 dark:text-gray-200">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 flex flex-wrap gap-4 justify-center"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert("Starting Lesson...")}
              className="px-8 py-3 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold rounded-full hover:shadow-lg transition-all"
            >
              Start Lesson
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => alert("Taking Quiz...")}
              className="px-8 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
            >
              Take Quiz
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
