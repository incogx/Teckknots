import { motion } from "framer-motion";

interface ProgressTrackerProps {
  completed: number;
  total: number;
  status: "not_started" | "in_progress" | "completed";
}

export default function ProgressTracker({
  completed,
  total,
  status,
}: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getStatusColor = () => {
    switch (status) {
      case "completed":
        return "text-green-600 dark:text-green-400";
      case "in_progress":
        return "text-[#004d26] dark:text-[#00ff99]";
      default:
        return "text-gray-500 dark:text-gray-400";
    }
  };

  const getStatusText = () => {
    switch (status) {
      case "completed":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Not Started";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-lg">
          Your Progress
        </h3>
        <span
          className={`text-sm font-semibold tracking-wide ${getStatusColor()}`}
        >
          {getStatusText()}
        </span>
      </div>

      {/* Progress Info */}
      <div className="flex items-center justify-between text-sm mb-2">
        <span className="text-gray-600 dark:text-gray-400">
          {completed} of {total} lessons
        </span>
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          {percentage}%
        </span>
      </div>

      {/* Animated Progress Bar */}
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`h-full ${
            status === "completed"
              ? "bg-green-600 dark:bg-green-400"
              : "bg-[#004d26] dark:bg-[#00ff99]"
          } rounded-full shadow-sm`}
        />
      </div>
    </div>
  );
}
