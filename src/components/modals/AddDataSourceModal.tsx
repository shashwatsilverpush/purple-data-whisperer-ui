
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WebsiteForm } from './WebsiteForm';
import { ManualQnAForm } from './ManualQnAForm';
import { CsvUploadForm } from './CsvUploadForm';
import { WebsiteCrawlResult } from '../WebsiteCrawlResult';
import { QnAPreview } from '../QnAPreview';

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
  const [activeTab, setActiveTab] = useState<'website' | 'manual' | 'csv'>('website');
  const [webStep, setWebStep] = useState(1);
  const [scanType, setScanType] = useState<'individual' | 'multi'>('individual');
  const [formData, setFormData] = useState<any>(null);
  const [crawledPages, setCrawledPages] = useState<any[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [generatedQnAs, setGeneratedQnAs] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleReset = () => {
    setWebStep(1);
    setScanType('individual');
    setFormData(null);
    setCrawledPages([]);
    setSelectedPages([]);
    setGeneratedQnAs([]);
    setIsProcessing(false);
    onClose();
  };

  const handleWebsiteFormSubmit = (data: any) => {
    setFormData(data);
    setScanType(data.scanType);
    
    if (data.scanType === 'individual') {
      // Simulate crawling pages
      setIsProcessing(true);
      setTimeout(() => {
        const mockCrawledPages = data.urls.map((url: string, index: number) => ({
          url,
          title: `Page ${index + 1}`,
          selected: true,
          qnasGenerated: false,
        }));
        
        setCrawledPages(mockCrawledPages);
        setSelectedPages(mockCrawledPages.map(p => p.url));
        setWebStep(2);
        setIsProcessing(false);
      }, 1500);
    } else {
      // For multi-page crawl, process directly
      setIsProcessing(true);
      setTimeout(() => {
        onAddDataSource('website', {
          ...data,
          selectedPages: [data.urls[0]],
        });
        handleReset();
      }, 1500);
    }
  };

  const handleManualQnAFormSubmit = (data: any) => {
    setIsProcessing(true);
    setTimeout(() => {
      onAddDataSource('manual', data);
      handleReset();
    }, 1000);
  };

  const handleCsvFormSubmit = (data: any) => {
    setIsProcessing(true);
    setTimeout(() => {
      onAddDataSource('csv', data);
      handleReset();
    }, 1000);
  };

  const handlePageSelection = (urls: string[]) => {
    setSelectedPages(urls);
  };

  const handleGenerateQnAs = () => {
    // Process and add website data source with selected pages
    onAddDataSource('website', {
      ...formData,
      selectedPages,
    });
    handleReset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Add Data Source</DialogTitle>
          <DialogDescription>
            Select the type of data source you want to add
          </DialogDescription>
        </DialogHeader>
        
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'website' | 'manual' | 'csv')}>
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="website">Website</TabsTrigger>
            <TabsTrigger value="manual">Manual Q&A</TabsTrigger>
            <TabsTrigger value="csv">CSV</TabsTrigger>
          </TabsList>
          
          <TabsContent value="website">
            {webStep === 1 ? (
              <WebsiteForm onSubmit={handleWebsiteFormSubmit} isProcessing={isProcessing} />
            ) : (
              <WebsiteCrawlResult 
                pages={crawledPages} 
                onPageSelection={handlePageSelection}
                onGenerateQnAs={handleGenerateQnAs}
                selectedPages={selectedPages}
              />
            )}
          </TabsContent>
          
          <TabsContent value="manual">
            <ManualQnAForm onSubmit={handleManualQnAFormSubmit} />
          </TabsContent>
          
          <TabsContent value="csv">
            <CsvUploadForm onSubmit={handleCsvFormSubmit} />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleReset}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
