
import React, { useState } from 'react';
import { DataSource } from '@/types/DataSource';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight, FolderOpen, FolderClosed, FileText, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DataSourceItemProps {
  dataSource: DataSource;
  level?: number;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
  onToggleChildren: (id: string) => void;
  expanded: Set<string>;
}

export const DataSourceItem: React.FC<DataSourceItemProps> = ({ 
  dataSource, 
  level = 0, 
  isSelected, 
  onSelectChange,
  onToggleChildren,
  expanded
}) => {
  const isExpanded = expanded.has(dataSource.id);
  const hasChildren = dataSource.children && dataSource.children.length > 0;
  
  const handleCheckboxChange = (checked: boolean) => {
    onSelectChange(dataSource.id, checked);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleChildren(dataSource.id);
  };

  const formattedDate = new Date(dataSource.lastUpdated).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const getSourceIcon = () => {
    if (dataSource.isFolder) {
      return isExpanded ? <FolderOpen className="h-4 w-4 text-purple-500" /> : <FolderClosed className="h-4 w-4 text-purple-500" />;
    } else if (dataSource.sourceType === 'Manual QnA') {
      return <FileText className="h-4 w-4 text-purple-500" />;
    } else if (dataSource.sourceType === 'Website' || dataSource.sourceType === 'CSV') {
      return <FileText className="h-4 w-4 text-purple-500" />;
    }
    return null;
  };

  return (
    <>
      <tr 
        className={cn(
          "hover:bg-purple-50 transition-colors",
          isSelected && "bg-purple-100",
          level > 0 && "border-t-0"
        )}
      >
        <td className="pl-4 py-4 whitespace-nowrap">
          <div className="flex items-center">
            <Checkbox 
              checked={isSelected}
              onCheckedChange={handleCheckboxChange}
              className="mr-2"
            />
            <div className="ml-1">{dataSource.serialNumber}</div>
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <div className="flex items-center gap-1">
            <span 
              className="cursor-pointer mr-1"
              style={{ marginLeft: `${level * 16}px` }} 
              onClick={handleToggleExpand}
            >
              {hasChildren && (isExpanded ? (
                <ChevronDown className="h-4 w-4 text-purple-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-purple-500" />
              ))}
            </span>
            {getSourceIcon()}
            <span className="ml-1">{dataSource.sourceType}</span>
          </div>
        </td>
        <td className="px-4 py-4">
          <span className={cn("line-clamp-1", dataSource.isFolder ? "font-medium" : "")}>
            {dataSource.name}
          </span>
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          <Badge 
            variant={dataSource.isActive ? "default" : "outline"}
            className={cn(
              "flex items-center gap-1 w-24 justify-center",
              dataSource.isActive 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
          >
            {dataSource.isActive && <Check className="h-3 w-3" />}
            {dataSource.isActive ? "Active" : "Inactive"}
          </Badge>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
          {formattedDate}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          {dataSource.category}
        </td>
        <td className="px-4 py-4 whitespace-nowrap">
          {dataSource.subCategory}
        </td>
        <td className="px-4 py-4">
          <div className="flex flex-wrap gap-1">
            {dataSource.tags.map(tag => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="bg-purple-50 text-purple-800 border-purple-200"
              >
                {tag}
              </Badge>
            ))}
          </div>
        </td>
        <td className="pr-4 py-4">
          <div className="flex items-center justify-end gap-2">
            {dataSource.sourceType === 'Website' && (
              <Button size="sm" variant="outline" className="text-xs">
                Re-sync
              </Button>
            )}
          </div>
        </td>
      </tr>
      
      {isExpanded && hasChildren && dataSource.children?.map(child => (
        <DataSourceItem
          key={child.id}
          dataSource={child}
          level={level + 1}
          isSelected={isSelected}
          onSelectChange={onSelectChange}
          onToggleChildren={onToggleChildren}
          expanded={expanded}
        />
      ))}
    </>
  );
};
