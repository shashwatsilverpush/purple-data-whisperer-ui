
import React, { useState } from 'react';
import { DataSource } from '@/types/DataSource';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ChevronDown, 
  ChevronRight, 
  FolderOpen, 
  FolderClosed, 
  FileText, 
  Check, 
  Edit, 
  Trash2, 
  RefreshCcw 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
import { StatusChangeDialog } from './StatusChangeDialog';
import { EditableTags } from './EditableTags';

interface DataSourceItemProps {
  dataSource: DataSource;
  level?: number;
  isSelected: boolean;
  onSelectChange: (id: string, selected: boolean) => void;
  onToggleChildren: (id: string) => void;
  expanded: Set<string>;
  onStatusChange?: (id: string, newStatus: boolean) => void;
  onTagsChange?: (id: string, newTags: string[]) => void;
}

export const DataSourceItem: React.FC<DataSourceItemProps> = ({ 
  dataSource, 
  level = 0, 
  isSelected, 
  onSelectChange,
  onToggleChildren,
  expanded,
  onStatusChange,
  onTagsChange
}) => {
  const isExpanded = expanded.has(dataSource.id);
  const hasChildren = dataSource.children && dataSource.children.length > 0;
  const [showStatusDialog, setShowStatusDialog] = useState(false);
  
  const handleCheckboxChange = (checked: boolean) => {
    onSelectChange(dataSource.id, checked);
  };

  const handleToggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleChildren(dataSource.id);
  };

  const handleStatusClick = () => {
    setShowStatusDialog(true);
  };

  const handleStatusConfirm = () => {
    if (onStatusChange) {
      onStatusChange(dataSource.id, !dataSource.isActive);
    }
    setShowStatusDialog(false);
  };

  const handleTagsChange = (newTags: string[]) => {
    if (onTagsChange) {
      onTagsChange(dataSource.id, newTags);
    }
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
              "flex items-center gap-1 w-24 justify-center cursor-pointer",
              dataSource.isActive 
                ? "bg-green-100 text-green-800 hover:bg-green-200" 
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            )}
            onClick={handleStatusClick}
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
          <EditableTags tags={dataSource.tags} onTagsChange={handleTagsChange} />
        </td>
        <td className="pr-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <span className="sr-only">Open menu</span>
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <div className="flex items-center gap-2">
                    <Edit className="h-4 w-4" />
                    Edit
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="text-red-600">
                  <div className="flex items-center gap-2">
                    <Trash2 className="h-4 w-4" />
                    Delete
                  </div>
                </DropdownMenuItem>
                {dataSource.sourceType === 'Website' && (
                  <DropdownMenuItem>
                    <div className="flex items-center gap-2">
                      <RefreshCcw className="h-4 w-4" />
                      Re-sync
                    </div>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
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
          onStatusChange={onStatusChange}
          onTagsChange={onTagsChange}
        />
      ))}

      <StatusChangeDialog
        isOpen={showStatusDialog}
        onClose={() => setShowStatusDialog(false)}
        onConfirm={handleStatusConfirm}
        dataSourceName={dataSource.name}
        currentStatus={dataSource.isActive}
      />
    </>
  );
};
