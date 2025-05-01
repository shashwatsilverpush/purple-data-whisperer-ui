
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface StatusChangeDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  dataSourceName: string;
  currentStatus: boolean;
}

export const StatusChangeDialog: React.FC<StatusChangeDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  dataSourceName,
  currentStatus
}) => {
  const newStatus = currentStatus ? 'inactive' : 'active';

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Change Status</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to change the status of "{dataSourceName}" to {newStatus}?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm}
            className={currentStatus 
              ? "bg-gray-500 hover:bg-gray-600" 
              : "bg-green-500 hover:bg-green-600"
            }
          >
            {currentStatus ? 'Deactivate' : 'Activate'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
