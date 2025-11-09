import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

interface ExplorePageProps {
  onNavigate: (page: string) => void;
  onSelectCourse: (course: any) => void;
}

export default function ExplorePage({ onNavigate, onSelectCourse }: ExplorePageProps) {
  // ✅ Combined Course List (Featured + Explore)
  const courses = [
    {
      id: 1,
      title: "React for Beginners",
      description: "Learn the fundamentals of React and build dynamic UIs.",
      category: "Web Development",
      difficulty: "beginner",
      image: "attachments/react.jpeg",
    },
    {
      id: 2,
      title: "Node.js Mastery",
      description: "Backend mastery with Node.js, Express, and APIs.",
      category: "Backend",
      difficulty: "intermediate",
      image: "attachments/node.jpg",
    },
    {
      id: 3,
      title: "AI with Python",
      description: "Build intelligent systems with Python and machine learning.",
      category: "AI / ML",
      difficulty: "advanced",
      image: "attachments/aipy.jpg",
    },
    {
      id: 4,
      title: "Web Development Fundamentals",
      description: "Learn HTML, CSS, and JavaScript from scratch.",
      category: "Frontend",
      difficulty: "beginner",
      image:"attachments/webdev.avif",
    },
    {
      id: 5,
      title: "React Advanced Patterns",
      description: "Master React hooks, context, and state management.",
      category: "Frontend",
      difficulty: "advanced",
      image:"attachments/mern.avif"
    },
      {
        id: 6,
        title: "Python for Data Science",
        description: "Explore data analysis and visualization with Python.",
        category: "Data Science",
        difficulty: "intermediate",
        image:"attachments/ds.jpg",
      },
      {
      id: 7,
      title: "Full Stack Development",
      description: "Build complete web applications using modern tech stacks.",
      category: "Full Stack",
      difficulty: "intermediate",
      image:
       "attachments/mern.avif",
    },
    {
      id: 8,
      title: "Cloud & DevOps Basics",
      description: "Deploy applications using AWS, Docker, and Kubernetes.",
      category: "DevOps",
      difficulty: "advanced",
      image:
       "attachments/devops.jpg",
    },
    {
      id: 9,
      title: "Mobile App Development",
      description: "Create iOS and Android apps using React Native.",
      category: "Mobile Development",
      difficulty: "intermediate",
      image:
        "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600",
    },
  ];

  // ✅ Difficulty color helper
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 py-16 px-6 transition-colors">
      {/* 🟢 Floating Back Button */}
      <motion.button
        onClick={() => onNavigate("home")}
        className="fixed top-6 left-6 bg-white dark:bg-gray-800 text-[#004d26] dark:text-[#00ff99] px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 font-semibold hover:scale-105 hover:shadow-xl transition-all z-50"
        whileHover={{ scale: 1.1 }}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Home</span>
      </motion.button>

      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-[#004d26] dark:text-[#00ff99] text-center mb-12"
        >
          Explore All Courses
        </motion.h1>

        {/* 🧩 Grid of Courses */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {courses.map((course, i) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 px-3 py-1 text-xs font-semibold rounded-full bg-[#004d26] text-white dark:bg-[#00ff99] dark:text-gray-900 shadow-sm">
                  {course.category}
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {course.description}
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${getDifficultyColor(
                      course.difficulty
                    )}`}
                  >
                    {course.difficulty.charAt(0).toUpperCase() +
                      course.difficulty.slice(1)}
                  </span>
                </div>

                <button
                  onClick={() => onSelectCourse(course)}
                  className="w-full py-2.5 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 font-semibold rounded-lg hover:scale-105 hover:shadow-lg transition-all"
                >
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
