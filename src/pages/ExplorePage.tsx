import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import CategoryFilter from "../components/CategoryFilter";
import LessonCard from "../components/LessonCard";

interface ExplorePageProps {
  onNavigate: (page: string) => void;
  onSelectCourse: (course: any) => void;
}

export default function ExplorePage({ onNavigate, onSelectCourse }: ExplorePageProps) {
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
      image: "attachments/webdev.avif",
    },
    {
      id: 5,
      title: "React Advanced Patterns",
      description: "Master React hooks, context, and state management.",
      category: "Frontend",
      difficulty: "advanced",
      image: "attachments/mern.avif",
    },
    {
      id: 6,
      title: "Python for Data Science",
      description: "Explore data analysis and visualization with Python.",
      category: "Data Science",
      difficulty: "intermediate",
      image: "attachments/ds.jpg",
    },
    {
      id: 7,
      title: "Full Stack Development",
      description: "Build complete web applications using modern tech stacks.",
      category: "Full Stack",
      difficulty: "intermediate",
      image: "attachments/mern.avif",
    },
    {
      id: 8,
      title: "Cloud & DevOps Basics",
      description: "Deploy applications using AWS, Docker, and Kubernetes.",
      category: "DevOps",
      difficulty: "advanced",
      image: "attachments/devops.jpg",
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

  // 🧭 Category Filter
  const allCategories = useMemo(() => {
    const unique = Array.from(new Set(courses.map((c) => c.category)));
    return ["All", ...unique];
  }, [courses]);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredCourses = useMemo(() => {
    if (selectedCategory === "All") return courses;
    return courses.filter((c) => c.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-50 to-white py-16 px-6 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* 🔤 Header */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-extrabold text-[#004d26] text-center mb-8"
        >
          Explore All Courses
        </motion.h1>

        {/* 🟢 Back Button (below header) */}
        <div className="flex justify-center mb-10">
          <motion.button
            onClick={() => onNavigate("home")}
            className="bg-white text-[#004d26] px-5 py-2 rounded-full shadow-lg flex items-center space-x-2 font-semibold hover:scale-105 hover:shadow-xl transition-all"
            whileHover={{ scale: 1.05 }}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </motion.button>
        </div>

        {/* 🧩 Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <CategoryFilter
            categories={allCategories}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />
        </motion.div>

        {/* 🔍 Course Results Count */}
        <div className="text-center text-gray-600 mb-6 text-sm font-medium">
          {filteredCourses.length} {filteredCourses.length === 1 ? "course" : "courses"} found
        </div>

        {/* 📚 Courses Grid */}
        {filteredCourses.length === 0 ? (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-gray-500 mt-10"
          >
            No courses found in this category.
          </motion.p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <LessonCard
                  lesson={course}
                  onStart={(selected) => onSelectCourse(selected)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
