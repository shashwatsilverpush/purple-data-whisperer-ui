
import React from 'react';
import { Button } from "@/components/ui/button";
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
  onToggleShowAll,
  showAllQnA,
  sortField,
  sortDirection,
  selectedSourceType,
  onAddDataSource,
  onTestDataSource,
}) => {
  return (
    <div className="mb-6 flex flex-col gap-4">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
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

          {/* Category Filter */}
          <Select onValueChange={(value) => onFilterChange('category', value)}>
            <SelectTrigger className="w-[180px] bg-white border-purple-200 hover:bg-purple-50">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Sub-Category Filter */}
          <Select onValueChange={(value) => onFilterChange('subCategory', value)}>
            <SelectTrigger className="w-[180px] bg-white border-purple-200 hover:bg-purple-50">
              <SelectValue placeholder="Sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Sub-categories</SelectLabel>
                {subCategories.map(subCategory => (
                  <SelectItem key={subCategory} value={subCategory}>{subCategory}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

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
      </div>

      {/* Sort Controls */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          className={`bg-white border-purple-200 hover:bg-purple-50 ${
            sortField === 'lastUpdated' ? 'text-purple-500 font-medium' : ''
          }`}
          onClick={() =>
            onSortChange(
              'lastUpdated',
              sortField === 'lastUpdated' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Sort by Last Updated
          {sortField === 'lastUpdated' && (
            sortDirection === 'asc' 
              ? <ArrowUp className="ml-1 h-4 w-4" /> 
              : <ArrowDown className="ml-1 h-4 w-4" />
          )}
        </Button>
        <Button
          variant="outline"
          size="sm"
          className={`bg-white border-purple-200 hover:bg-purple-50 ${
            sortField === 'name' ? 'text-purple-500 font-medium' : ''
          }`}
          onClick={() =>
            onSortChange(
              'name',
              sortField === 'name' && sortDirection === 'asc' ? 'desc' : 'asc'
            )
          }
        >
          Sort by Name
          {sortField === 'name' && (
            sortDirection === 'asc' 
              ? <ArrowUp className="ml-1 h-4 w-4" /> 
              : <ArrowDown className="ml-1 h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
