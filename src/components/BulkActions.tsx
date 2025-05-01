
import React from 'react';
import { Button } from "@/components/ui/button";
import { Trash2 } from 'lucide-react';

interface BulkActionsProps {
  selectedCount: number;
  onDelete: () => void;
  onClearSelection: () => void;
}

export const BulkActions: React.FC<BulkActionsProps> = ({ 
  selectedCount, 
  onDelete, 
  onClearSelection 
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="flex items-center p-3 bg-purple-50 border border-purple-200 rounded-lg mb-4">
      <span className="text-sm font-medium text-purple-800 mr-auto">
        {selectedCount} item{selectedCount > 1 ? 's' : ''} selected
      </span>
      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="sm"
          onClick={onClearSelection}
          className="text-gray-600 hover:bg-gray-100"
        >
          Clear selection
        </Button>
        <Button 
          variant="destructive" 
          size="sm" 
          onClick={onDelete}
          className="bg-red-500 hover:bg-red-600"
        >
          <Trash2 className="h-4 w-4 mr-1" />
          Delete Selected
        </Button>
      </div>
    </div>
  );
};
