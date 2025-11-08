import { Star, Users } from 'lucide-react';
import type { Course } from '../lib/supabase';

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group">
      <div className="relative h-48 overflow-hidden bg-gray-200">
        <img
          src={course.image_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getLevelColor(course.level)}`}>
            {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
          </span>
          <div className="flex items-center space-x-1 text-yellow-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-xs font-semibold text-gray-700">4.8</span>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-[#004d26] transition-colors">
          {course.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-1 text-gray-500 text-sm">
            <Users className="w-4 h-4" />
            <span>{course.students_enrolled.toLocaleString()} enrolled</span>
          </div>
          <button className="px-4 py-2 bg-[#004d26] text-white rounded-lg hover:bg-[#003d1f] transition-colors font-semibold text-sm">
            Enroll
          </button>
        </div>
      </div>
    </div>
  );
}
