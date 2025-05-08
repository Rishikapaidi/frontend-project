import React from 'react';

interface CategoriesProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Categories: React.FC<CategoriesProps> = ({ selectedCategory, onCategoryChange }) => {
  const categories = [
    { id: 'all', name: 'All Services', icon: '🏠' },
    { id: 'home', name: 'Home Services', icon: '🔧' },
    { id: 'tech', name: 'Technology', icon: '💻' },
    { id: 'education', name: 'Education', icon: '📚' },
    { id: 'health', name: 'Health & Wellness', icon: '🏥' },
    { id: 'outdoor', name: 'Outdoor Services', icon: '🌳' },
    { id: 'events', name: 'Events', icon: '🎉' },
    { id: 'food', name: 'Food Services', icon: '🍔' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 mb-6">
      <h3 className="text-lg font-medium mb-3">Categories</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id === 'all' ? '' : category.id)}
            className={`flex items-center px-3 py-2 rounded-md text-sm ${
              (selectedCategory === category.id) || (selectedCategory === '' && category.id === 'all')
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Categories; 