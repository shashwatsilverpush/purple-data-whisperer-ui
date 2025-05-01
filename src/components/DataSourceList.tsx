
import React, { useState } from 'react';
import { DataSourceItem } from './DataSourceItem';
import { DataSource } from '@/types/DataSource';
import { Checkbox } from "@/components/ui/checkbox";
import { BulkActions } from './BulkActions';

interface DataSourceListProps {
  dataSources: DataSource[];
  onDelete: (ids: string[]) => void;
}

export const DataSourceList: React.FC<DataSourceListProps> = ({
  dataSources,
  onDelete,
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

  const includeFolders = Array.from(selectedIds).some(id => {
    const findFolder = (sources: DataSource[]): boolean => {
      for (const source of sources) {
        if (source.id === id && source.isFolder) return true;
        if (source.children && findFolder(source.children)) return true;
      }
      return false;
    };
    return findFolder(dataSources);
  });

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
        />
      )}
      
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple-50">
              <tr>
                <th scope="col" className="pl-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  <div className="flex items-center">
                    <Checkbox 
                      checked={selectAll}
                      onCheckedChange={handleToggleAll}
                      className="mr-2"
                    />
                    S.No.
                  </div>
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Source
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Last Updated
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Sub-category
                </th>
                <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Tags
                </th>
                <th scope="col" className="pr-4 py-3 text-right text-xs font-medium text-purple-800 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {dataSources.map((dataSource) => (
                <DataSourceItem
                  key={dataSource.id}
                  dataSource={dataSource}
                  isSelected={selectedIds.has(dataSource.id)}
                  onSelectChange={handleToggleSelect}
                  onToggleChildren={handleToggleExpand}
                  expanded={expandedIds}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
