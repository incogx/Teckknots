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
    if (category === 'all') return 'All Lessons';
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onSelectCategory(category)}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all ${
            selectedCategory === category
              ? 'bg-[#2b4a26] text-white shadow-md'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {formatCategory(category)}
        </button>
      ))}
    </div>
  );
}
