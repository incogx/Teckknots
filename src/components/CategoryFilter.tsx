interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const formatCategory = (category: string) => {
    if (category === "all") return "All Lessons";
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-[#004d26]/40 ${
              isSelected
                ? "bg-[#004d26] text-white shadow-md dark:bg-[#00ff99] dark:text-gray-900"
                : "bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
            }`}
          >
            {formatCategory(category)}
          </button>
        );
      })}
    </div>
  );
}
