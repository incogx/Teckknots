import { Clock, Award, ArrowRight } from "lucide-react";
import type { Lesson } from "../lib/supabase";

interface LessonCardProps {
  lesson: Lesson;
  onStart?: (lesson: Lesson) => void; // ✅ added: allows navigation or any action
}

export default function LessonCard({ lesson, onStart }: LessonCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
      {/* Gradient Header Line */}
      <div className="h-2 bg-gradient-to-r from-[#2b4a26] to-[#3d6638]" />

      <div className="p-6">
        {/* Tags */}
        <div className="flex items-start justify-between mb-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
              lesson.difficulty
            )}`}
          >
            {lesson.difficulty}
          </span>
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
            {lesson.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-[#2b4a26] dark:group-hover:text-[#00ff99] transition-colors">
          {lesson.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-3">
          {lesson.description}
        </p>

        {/* Footer Info */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-1">
              <Clock className="w-4 h-4" />
              <span>30 min</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4" />
              <span>Certificate</span>
            </div>
          </div>

          {/* Start Button */}
          <button
            onClick={() => onStart && onStart(lesson)} // ✅ triggers navigation
            className="flex items-center space-x-2 text-[#2b4a26] dark:text-[#00ff99] font-semibold hover:text-[#1f3519] dark:hover:text-[#00cc80] transition-colors group"
          >
            <span>Start</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
}
