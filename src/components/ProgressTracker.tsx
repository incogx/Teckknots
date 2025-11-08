interface ProgressTrackerProps {
  completed: number;
  total: number;
  status: 'not_started' | 'in_progress' | 'completed';
}

export default function ProgressTracker({ completed, total, status }: ProgressTrackerProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'in_progress':
        return 'text-[#2b4a26]';
      default:
        return 'text-gray-500';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      default:
        return 'Not Started';
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900">Your Progress</h3>
        <span className={`text-sm font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </span>
      </div>

      <div className="mb-2">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{completed} of {total} lessons</span>
          <span className="font-semibold">{percentage}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div
            className="bg-[#2b4a26] h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
