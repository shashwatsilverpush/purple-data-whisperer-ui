
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2, RefreshCcw, Edit } from 'lucide-react';
import { DataSource } from '@/types/DataSource';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onClearSelection: () => void;
  selectedSources: DataSource[];
}

export const BulkActions: React.FC<BulkActionsProps> = ({ 
  selectedCount, 
  onDelete, 
  onClearSelection,
  selectedSources
}) => {
  if (selectedCount === 0) return null;

  // Check if all selected items are of type Website for re-sync
  const allWebsites = selectedSources.every(source => source.sourceType === 'Website');
  
  // In case we need to add other actions that require specific source types
  const hasCommonActions = true; // Delete is always available

  return (
    <div className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg mb-4">
      <span className="text-sm font-medium text-purple-800 mr-auto">
        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
      </span>
      <div className="flex gap-2">
        {/* Common actions */}
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearSelection}
          className="text-gray-600 hover:bg-gray-100"
        >
          Clear selection
        </Button>
        
        {/* Delete is always available */}
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Selected
        </Button>

        {/* Only show re-sync if all selected items are websites */}
        {allWebsites && (
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white border-purple-200 hover:bg-purple-50"
          >
            <RefreshCcw className="h-4 w-4 mr-1" />
            Re-sync All
          </Button>
        )}
      </div>
    </div>
  );
};
