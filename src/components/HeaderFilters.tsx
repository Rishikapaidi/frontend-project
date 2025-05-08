import React, { useState } from "react";

export interface HeaderFiltersProps {
  range: number;
  onRangeChange: (value: number) => void;
  onSortChange: (sortType: string) => void;
  onCategoryChange?: (category: string) => void;
  onSearch?: (query: string) => void;
}

const HeaderFilters: React.FC<HeaderFiltersProps> = ({
  range,
  onRangeChange,
  onSortChange,
  onCategoryChange,
  onSearch,
}) => {
  const [showRangeSelector, setShowRangeSelector] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4">
      <div className="mb-3">
        <h3 className="text-lg font-medium">✨ Available Services</h3>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        {/* Category Button */}
        <button 
          className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
          onClick={() => onCategoryChange && onCategoryChange("")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>Categories</span>
        </button>

        {/* Range Filter */}
        <div className="relative">
          <button 
            className="flex items-center gap-1 px-3 py-2 border rounded-md hover:bg-gray-50 text-sm"
            onClick={() => setShowRangeSelector(!showRangeSelector)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            <span>Filters</span>
          </button>
          
          {showRangeSelector && (
            <div className="absolute top-full left-0 mt-1 p-3 bg-white shadow-lg rounded-md z-10 min-w-[250px]">
              <p className="mb-1 text-sm font-medium">Distance: {range} miles</p>
              <input
                type="range"
                min={0}
                max={100}
                value={range}
                className="w-full"
                onChange={(e) => onRangeChange(Number(e.target.value))}
              />
            </div>
          )}
        </div>

        {/* Sort Button */}
        <div className="relative">
          <select
            className="px-3 py-2 border rounded-md appearance-none bg-white text-sm pr-8"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <option value="latest">Newest First</option>
            <option value="high">Price: High to Low</option>
            <option value="low">Price: Low to High</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex items-center px-3 py-2 border rounded-md flex-grow max-w-sm">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search services..."
            className="w-full outline-none text-sm"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>
    </div>
  );
};

export default HeaderFilters;
