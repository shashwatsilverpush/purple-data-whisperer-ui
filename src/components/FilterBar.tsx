
import React from 'react';
import { Button } from "@/components/ui/button";
import { SearchBar } from './SearchBar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Filter, ArrowUp, ArrowDown, Plus, FileSearch } from 'lucide-react';
import { SourceType } from '@/types/DataSource';

interface FilterBarProps {
  sourceTypes: SourceType[];
  categories: string[];
  subCategories: string[];
  tags: string[];
  onFilterChange: (filterType: string, value: string) => void;
  onSortChange: (field: string, direction: 'asc' | 'desc') => void;
  onSearch: (query: string) => void;
  onToggleShowAll: () => void;
  showAllQnA: boolean;
  sortField: string;
  sortDirection: 'asc' | 'desc';
  selectedSourceType: string | null;
  onAddDataSource: () => void;
  onTestDataSource: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  sourceTypes,
  categories,
  subCategories,
  tags,
  onFilterChange,
  onSortChange,
  onSearch,
  onToggleShowAll,
  showAllQnA,
  sortField,
  sortDirection,
  selectedSourceType,
  onAddDataSource,
  onTestDataSource,
}) => {
  return (
    <div className="mb-6 space-y-4">
      {/* First row: Add Data Source and Test Data Source buttons */}
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          <Button 
            variant="outline" 
            className="bg-white text-purple-500 border-purple-200 hover:bg-purple-50"
            onClick={onAddDataSource}
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Data Source
          </Button>
          
          <Button 
            variant="outline"
            className="bg-white text-purple-500 border-purple-200 hover:bg-purple-50"
            onClick={onTestDataSource}
          >
            <FileSearch className="mr-1 h-4 w-4" />
            Test Data Source
          </Button>
        </div>
      </div>

      {/* Second row: Filters, Search and Sort */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        {/* Left side - Filters */}
        <div className="flex flex-wrap gap-2">
          {/* Source Type Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-purple-200 hover:bg-purple-50">
                <Filter className="mr-1 h-4 w-4" />
                Source Type {selectedSourceType && `(${selectedSourceType})`}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Source</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onFilterChange('sourceType', 'all')}>
                <div className="flex items-center gap-2">
                  <Checkbox checked={!selectedSourceType} />
                  <span>All</span>
                </div>
              </DropdownMenuItem>
              {sourceTypes.map(type => (
                <DropdownMenuItem key={type} onClick={() => onFilterChange('sourceType', type)}>
                  <div className="flex items-center gap-2">
                    <Checkbox checked={selectedSourceType === type} />
                    <span>{type}</span>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Tags Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-purple-200 hover:bg-purple-50">
                Tags
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56">
              <DropdownMenuLabel>Filter by Tags</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {tags.map(tag => (
                <DropdownMenuItem key={tag} onClick={() => onFilterChange('tag', tag)}>
                  {tag}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Status Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-white border-purple-200 hover:bg-purple-50">
                Status
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => onFilterChange('status', 'active')}>
                Active
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('status', 'inactive')}>
                Inactive
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onFilterChange('status', 'all')}>
                All
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Show All QnA Toggle */}
          <Button 
            variant={showAllQnA ? "default" : "outline"} 
            className={showAllQnA 
              ? "bg-purple-500 hover:bg-purple-600" 
              : "bg-white border-purple-200 hover:bg-purple-50"
            }
            onClick={onToggleShowAll}
          >
            Show All QnA
          </Button>
        </div>

        {/* Right side - Search and Sort */}
        <div className="flex items-center gap-2">
          <SearchBar 
            className="w-72" 
            onSearch={onSearch}
          />
          
          {/* Sort Controls */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-white border-purple-200 hover:bg-purple-50"
              >
                Sort by {sortField === 'name' ? 'Name' : 'Last Updated'}
                {sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem 
                onClick={() => onSortChange('name', 'asc')}
                className={sortField === 'name' && sortDirection === 'asc' ? 'bg-purple-50' : ''}
              >
                <span className="flex items-center">
                  Name <ArrowUp className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onSortChange('name', 'desc')}
                className={sortField === 'name' && sortDirection === 'desc' ? 'bg-purple-50' : ''}
              >
                <span className="flex items-center">
                  Name <ArrowDown className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onSortChange('lastUpdated', 'asc')}
                className={sortField === 'lastUpdated' && sortDirection === 'asc' ? 'bg-purple-50' : ''}
              >
                <span className="flex items-center">
                  Last Updated <ArrowUp className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={() => onSortChange('lastUpdated', 'desc')}
                className={sortField === 'lastUpdated' && sortDirection === 'desc' ? 'bg-purple-50' : ''}
              >
                <span className="flex items-center">
                  Last Updated <ArrowDown className="ml-1 h-4 w-4" />
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};
