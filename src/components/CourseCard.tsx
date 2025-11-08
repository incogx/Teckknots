import { Star, Users } from "lucide-react";
import type { Course } from "../lib/supabase";

interface CourseCardProps {
  course: Course;
  onClick?: () => void; // 👈 add this for navigation (to course details)
}

export default function CourseCard({ course, onClick }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case "beginner":
        return "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300";
      case "advanced":
        return "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group"
    >
      {/* Image Banner */}
      <div className="relative h-48 overflow-hidden bg-gray-200 dark:bg-gray-800">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Course Info */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(
              course.level
            )}`}
          >
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>

          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-semibold text-gray-700 dark:text-gray-300">
              4.8
            </span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-[#004d26] dark:group-hover:text-[#00ff99] transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-1 text-gray-500 dark:text-gray-400 text-sm">
            <Users className="w-4 h-4" />
            <span>{course.students_enrolled.toLocaleString()} enrolled</span>
          </div>

          {/* Enroll Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent bubbling to card click
              onClick?.(); // navigate to detail page
            }}
            className="px-4 py-2 bg-[#004d26] dark:bg-[#00ff99] text-white dark:text-gray-900 rounded-lg hover:bg-[#003d1f] dark:hover:bg-[#00cc80] transition-all font-semibold text-sm shadow-sm hover:shadow-md"
          >
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
