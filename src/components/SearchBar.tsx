
import React from 'react';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";

interface SearchBarProps {
  className?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ className }) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input 
        type="text" 
        placeholder="Search by name..." 
        className="pl-10 bg-white/10 focus:bg-white/20 border-white/20 text-white placeholder:text-white/70"
      />
    </div>
  );
};
