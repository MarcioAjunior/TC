'use client'
import React, { useState } from 'react';
import { SearchIcon } from '@heroicons/react/outline';

const SearchBar: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(searchQuery)
    setSearchQuery('');
  };

  return (
    <div className="flex justify-center p-12 mt-3">
        <form onSubmit={handleSearchSubmit} className="flex items-center">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="bg-[#181848] w-96 h-12 text-white rounded-l py-3 px-4 focus:outline-none focus:ring-1 focus:ring-[#f0a818]"
          placeholder="Search for profile"
        />
        <button type="submit" className="bg-[#304878] text-white py-2 px-4 rounded-r">
            <SearchIcon className="h-8 w-5 text-[#f0a818]" />
        </button>
        </form>
    </div>
  );
};

export default SearchBar;