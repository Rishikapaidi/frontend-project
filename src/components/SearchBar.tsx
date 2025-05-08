import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (val: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => (
  <input
    type="text"
    className="w-full p-2 border rounded"
    placeholder="Search services..."
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
);

export default SearchBar;
