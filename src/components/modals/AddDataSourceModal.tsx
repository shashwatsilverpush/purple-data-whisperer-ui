
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { WebsiteForm } from './WebsiteForm';
import { ManualQnAForm } from './ManualQnAForm';
import { CsvUploadForm } from './CsvUploadForm';

interface AddDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddDataSource: (type: string, data: any) => void;
}

export const AddDataSourceModal: React.FC<AddDataSourceModalProps> = ({
  isOpen,
  onClose,
  onAddDataSource,
}) => {
  const [activeTab, setActiveTab] = useState('website');

  const handleSubmit = (type: string, data: any) => {
    onAddDataSource(type, data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Add Data Source</DialogTitle>
          <DialogDescription>
            Choose the type of data source you want to add.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="website" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="manual">Manual QnA</TabsTrigger>
            <TabsTrigger value="csv">CSV Upload</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website" className="py-4">
            <WebsiteForm onSubmit={(data) => handleSubmit('website', data)} />
          </TabsContent>
          
          <TabsContent value="manual" className="py-4">
            <ManualQnAForm onSubmit={(data) => handleSubmit('manual', data)} />
          </TabsContent>
          
          <TabsContent value="csv" className="py-4">
            <CsvUploadForm onSubmit={(data) => handleSubmit('csv', data)} />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
