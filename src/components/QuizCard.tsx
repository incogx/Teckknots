import { useState } from 'react';
import { CheckCircle, XCircle } from 'lucide-react';
import type { QuizQuestion } from '../lib/supabase';

interface QuizCardProps {
  question: QuizQuestion;
  questionNumber: number;
  onAnswer: (questionId: string, answerIndex: number) => void;
  selectedAnswer?: number;
  showResults?: boolean;
}

export default function QuizCard({
  question,
  questionNumber,
  onAnswer,
  selectedAnswer,
  showResults = false,
}: QuizCardProps) {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const isCorrect = (index: number) => index === question.correctAnswer;
  const isSelected = (index: number) => selectedAnswer === index;

  const getOptionStyle = (index: number) => {
    if (!showResults) {
      if (isSelected(index)) {
        return 'bg-[#2b4a26] text-white border-[#2b4a26]';
      }
      if (hoveredOption === index) {
        return 'bg-gray-50 border-[#2b4a26]';
      }
      return 'bg-white border-gray-200 hover:border-[#2b4a26]';
    }

    if (isCorrect(index)) {
      return 'bg-green-50 border-green-500 text-green-900';
    }
    if (isSelected(index) && !isCorrect(index)) {
      return 'bg-red-50 border-red-500 text-red-900';
    }
    return 'bg-gray-50 border-gray-200 text-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-start space-x-3 mb-6">
        <span className="flex-shrink-0 w-8 h-8 bg-[#2b4a26] text-white rounded-full flex items-center justify-center font-bold text-sm">
          {questionNumber}
        </span>
        <h3 className="text-lg font-semibold text-gray-900 flex-1">
          {question.question}
        </h3>
      </div>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showResults && onAnswer(question.id, index)}
            disabled={showResults}
            onMouseEnter={() => !showResults && setHoveredOption(index)}
            onMouseLeave={() => setHoveredOption(null)}
            className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${getOptionStyle(index)} ${
              showResults ? 'cursor-default' : 'cursor-pointer'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="font-medium">{option}</span>
              {showResults && (
                <>
                  {isCorrect(index) && (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  )}
                  {isSelected(index) && !isCorrect(index) && (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
