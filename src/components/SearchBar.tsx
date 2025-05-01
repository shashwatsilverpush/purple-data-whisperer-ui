
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
  onSearch?: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <div className={`${className}`}>
      <label htmlFor="search" className="block text-sm font-medium text-purple-800 mb-1">
        Search by name
      </label>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          id="search"
          type="text" 
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Search by name..." 
          className="pl-10 bg-white border-gray-300"
        />
      </div>
    </div>
  );
};
