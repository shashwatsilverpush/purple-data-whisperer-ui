
import React from 'react';
import { DataSource } from '@/types/DataSource';
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { 
  ChevronDown, 
  ChevronRight, 
  FolderOpen, 
  FolderClosed, 
  FileText, 
  Edit, 
  Trash2, 
  RefreshCcw, 
  Link
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from '@/lib/utils';
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
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onResync?: (id: string) => void;
  onViewQnA?: (id: string) => void;
}

export const DataSourceItem: React.FC<DataSourceItemProps> = ({ 
  dataSource, 
  level = 0, 
  isSelected, 
  onSelectChange,
  onToggleChildren,
  expanded,
  onStatusChange,
  onTagsChange,
  onEdit,
  onDelete,
  onResync,
  onViewQnA
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

  const handleStatusChange = (checked: boolean) => {
    if (onStatusChange) {
      onStatusChange(dataSource.id, checked);
    }
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

  // Determine available actions based on source type
  const showResync = dataSource.sourceType === 'Website';

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
          <div className="flex flex-col">
            {/* Make the name clickable to view QnAs */}
            <span 
              className={cn(
                "line-clamp-1 hover:text-purple-600 cursor-pointer", 
                dataSource.isFolder ? "font-medium" : ""
              )}
              onClick={() => onViewQnA && onViewQnA(dataSource.id)}
            >
              {dataSource.name}
            </span>
            {dataSource.url && (
              <div className="flex items-center text-xs text-purple-600 mt-1">
                <Link className="h-3 w-3 mr-1" /> 
                <a href={dataSource.url} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {dataSource.url}
                </a>
              </div>
            )}
          </div>
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-center">
          {/* Replace badge with toggle switch */}
          <Switch 
            checked={dataSource.isActive}
            onCheckedChange={handleStatusChange}
            className="data-[state=checked]:bg-green-500"
          />
        </td>
        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
          {formattedDate}
        </td>
        <td className="px-4 py-4">
          <EditableTags tags={dataSource.tags} onTagsChange={handleTagsChange} />
        </td>
        <td className="pr-4 py-4">
          <div className="flex items-center justify-end gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  <span className="sr-only">Actions</span>
                  <Edit className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={() => onEdit(dataSource.id)}>
                    <div className="flex items-center gap-2">
                      <Edit className="h-4 w-4" />
                      Edit
                    </div>
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem className="text-red-600" onClick={() => onDelete(dataSource.id)}>
                    <div className="flex items-center gap-2">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </div>
                  </DropdownMenuItem>
                )}
                {onResync && showResync && (
                  <DropdownMenuItem onClick={() => onResync(dataSource.id)}>
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
          onEdit={onEdit}
          onDelete={onDelete}
          onResync={onResync}
          onViewQnA={onViewQnA}
        />
      ))}
    </>
  );
};
