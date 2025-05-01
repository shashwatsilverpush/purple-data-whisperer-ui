
import React from 'react';
import { Button } from "@/components/ui/button";
import { SearchBar } from './SearchBar';

export const NavBar: React.FC = () => {
  return (
    <header className="bg-purple-500 text-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">DataSource Manager</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <SearchBar className="w-full md:w-80" />
          <div className="flex gap-2">
            <Button variant="secondary" className="bg-white text-purple-500 hover:bg-purple-100">
              Dashboard
            </Button>
            <Button variant="secondary" className="bg-white text-purple-500 hover:bg-purple-100">
              Settings
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
