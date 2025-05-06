
import React, { useState } from 'react';
import { DataSourceItem } from './DataSourceItem';
import { DataSource } from '@/types/DataSource';
import { Checkbox } from "@/components/ui/checkbox";
import { BulkActions } from './BulkActions';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

interface DataSourceListProps {
  dataSources: DataSource[];
  onDelete: (ids: string[]) => void;
  onStatusChange?: (id: string, newStatus: boolean) => void;
  onTagsChange?: (id: string, newTags: string[]) => void;
  onEdit?: (id: string) => void;
  onResync?: (id: string) => void;
  onViewQnA?: (id: string) => void;
}

export const DataSourceList: React.FC<DataSourceListProps> = ({
  dataSources,
  onDelete,
  onStatusChange,
  onTagsChange,
  onEdit,
  onResync,
  onViewQnA
}) => {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);

  const handleToggleAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      const allIds = new Set<string>();
      const addIds = (sources: DataSource[]) => {
        sources.forEach(source => {
          allIds.add(source.id);
          if (source.children) {
            addIds(source.children);
          }
        });
      };
      addIds(dataSources);
      setSelectedIds(allIds);
    } else {
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string, selected: boolean) => {
    const newSelectedIds = new Set(selectedIds);
    if (selected) {
      newSelectedIds.add(id);
    } else {
      newSelectedIds.delete(id);
    }
    setSelectedIds(newSelectedIds);
    setSelectAll(newSelectedIds.size === getTotalCount(dataSources));
  };

  const handleToggleExpand = (id: string) => {
    const newExpandedIds = new Set(expandedIds);
    if (newExpandedIds.has(id)) {
      newExpandedIds.delete(id);
    } else {
      newExpandedIds.add(id);
    }
    setExpandedIds(newExpandedIds);
  };

  const handleDelete = () => {
    onDelete(Array.from(selectedIds));
    setSelectedIds(new Set());
    setSelectAll(false);
  };

  const getTotalCount = (sources: DataSource[]): number => {
    let count = sources.length;
    sources.forEach(source => {
      if (source.children) {
        count += getTotalCount(source.children);
      }
    });
    return count;
  };

  // Get all selected data sources for BulkActions
  const getSelectedSources = (): DataSource[] => {
    const selected: DataSource[] = [];
    
    const findSelected = (sources: DataSource[]) => {
      sources.forEach(source => {
        if (selectedIds.has(source.id)) {
          selected.push(source);
        }
        if (source.children) {
          findSelected(source.children);
        }
      });
    };
    
    findSelected(dataSources);
    return selected;
  };

  const selectedSources = getSelectedSources();
  
  // Determine if we can offer resync based on selected sources
  const canResync = selectedSources.every(source => source.sourceType === 'Website');

  return (
    <div>
      {selectedIds.size > 0 && (
        <BulkActions 
          selectedCount={selectedIds.size} 
          onDelete={handleDelete}
          onClearSelection={() => {
            setSelectedIds(new Set());
            setSelectAll(false);
          }}
          selectedSources={selectedSources}
          canResync={canResync}
          onResync={onResync ? () => {
            selectedSources.forEach(source => {
              if (onResync) onResync(source.id);
            });
            setSelectedIds(new Set());
            setSelectAll(false);
          } : undefined}
        />
      )}
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-purple-50">
              <TableRow>
                <TableHead className="pl-4 w-16">
                  <div className="flex items-center">
                    <Checkbox 
                      checked={selectAll}
                      onCheckedChange={handleToggleAll}
                      className="mr-2"
                    />
                    S.No.
                  </div>
                </TableHead>
                <TableHead className="w-32">Source</TableHead>
                <TableHead>Name/URL</TableHead>
                <TableHead className="w-24 text-center">Status</TableHead>
                <TableHead className="w-40">Last Updated</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead className="text-right w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dataSources.map((dataSource) => (
                <DataSourceItem
                  key={dataSource.id}
                  dataSource={dataSource}
                  isSelected={selectedIds.has(dataSource.id)}
                  onSelectChange={handleToggleSelect}
                  onToggleChildren={handleToggleExpand}
                  expanded={expandedIds}
                  onStatusChange={onStatusChange}
                  onTagsChange={onTagsChange}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  onResync={onResync}
                  onViewQnA={onViewQnA}
                />
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
