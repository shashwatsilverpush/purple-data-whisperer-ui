
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
import { SourceTypeSelector } from '../SourceTypeSelector';
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
  const [step, setStep] = useState(1);
  const [sourceType, setSourceType] = useState<'website' | 'manual' | 'csv' | null>(null);
  const [formData, setFormData] = useState<any>(null);
  const [crawledPages, setCrawledPages] = useState<any[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);
  const [generatedQnAs, setGeneratedQnAs] = useState<any[]>([]);

  const handleTypeSelect = (type: 'website' | 'manual' | 'csv') => {
    setSourceType(type);
    setStep(2);
  };

  const handleFormSubmit = (type: string, data: any) => {
    setFormData(data);
    
    if (type === 'website') {
      // Simulate crawling pages
      setTimeout(() => {
        const mockCrawledPages = [
          { url: 'https://example.com', title: 'Homepage', selected: true, qnasGenerated: false },
          { url: 'https://example.com/about', title: 'About Us', selected: true, qnasGenerated: false },
          { url: 'https://example.com/products', title: 'Products', selected: true, qnasGenerated: false },
          { url: 'https://example.com/blog', title: 'Blog', selected: true, qnasGenerated: false },
          { url: 'https://example.com/contact', title: 'Contact', selected: true, qnasGenerated: false },
        ];
        setCrawledPages(mockCrawledPages);
        setSelectedPages(mockCrawledPages.map(p => p.url));
        setStep(3);
      }, 1500);
    } else {
      // For manual QnA and CSV, go directly to QnA preview
      setTimeout(() => {
        const mockQnAs = [
          { id: '1', question: 'What products do you offer?', answer: 'We offer a range of products in software, hardware, and services.' },
          { id: '2', question: 'How can I contact customer support?', answer: 'You can contact our customer support at support@example.com or call us at 123-456-7890.' },
          { id: '3', question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee on all our products.' },
        ];
        setGeneratedQnAs(mockQnAs);
        setStep(4);
      }, 1500);
    }
  };

  const handlePageSelection = (urls: string[]) => {
    setSelectedPages(urls);
  };

  const handleGenerateQnAs = () => {
    // Simulate API call to generate Q&As
    setTimeout(() => {
      const mockQnAs = [
        { id: '1', question: 'What products do you offer?', answer: 'We offer a range of products in software, hardware, and services.' },
        { id: '2', question: 'How can I contact customer support?', answer: 'You can contact our customer support at support@example.com or call us at 123-456-7890.' },
        { id: '3', question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee on all our products.' },
      ];
      setGeneratedQnAs(mockQnAs);
      setStep(4);
    }, 1500);
  };

  const handleFinish = () => {
    onAddDataSource(sourceType || '', {
      ...formData,
      selectedPages,
      generatedQnAs,
    });
    handleReset();
  };

  const handleReset = () => {
    setStep(1);
    setSourceType(null);
    setFormData(null);
    setCrawledPages([]);
    setSelectedPages([]);
    setGeneratedQnAs([]);
    onClose();
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <SourceTypeSelector onSelect={handleTypeSelect} />;
      
      case 2:
        if (sourceType === 'website') {
          return <WebsiteForm onSubmit={(data) => handleFormSubmit('website', data)} />;
        } else if (sourceType === 'manual') {
          return <ManualQnAForm onSubmit={(data) => handleFormSubmit('manual', data)} />;
        } else if (sourceType === 'csv') {
          return <CsvUploadForm onSubmit={(data) => handleFormSubmit('csv', data)} />;
        }
        return null;
      
      case 3:
        return (
          <WebsiteCrawlResult 
            pages={crawledPages} 
            onPageSelection={handlePageSelection}
            onGenerateQnAs={handleGenerateQnAs}
            selectedPages={selectedPages}
          />
        );
      
      case 4:
        return (
          <QnAPreview 
            qnas={generatedQnAs} 
            onFinish={handleFinish}
          />
        );
      
      default:
        return null;
    }
  };

  const getModalTitle = () => {
    switch (step) {
      case 1: return 'Add Data Source';
      case 2: 
        if (sourceType === 'website') return 'Add Website Source';
        if (sourceType === 'manual') return 'Add Manual Q&A';
        if (sourceType === 'csv') return 'Upload CSV';
        return 'Add Data Source';
      case 3: return 'Select Pages to Process';
      case 4: return 'Generated Q&As';
      default: return 'Add Data Source';
    }
  };

  const getStepIndicator = () => {
    const totalSteps = sourceType === 'website' ? 4 : 3;
    
    return (
      <div className="flex items-center justify-center mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <React.Fragment key={i}>
            <div 
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                i + 1 === step ? 'bg-purple-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}
            >
              {i + 1}
            </div>
            {i < totalSteps - 1 && (
              <div 
                className={`h-1 w-12 ${
                  i + 1 < step ? 'bg-purple-500' : 'bg-gray-200'
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleReset}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{getModalTitle()}</DialogTitle>
          <DialogDescription>
            {step > 1 && sourceType && `Step ${step} of ${sourceType === 'website' ? '4' : '3'}`}
          </DialogDescription>
        </DialogHeader>
        
        {step > 1 && getStepIndicator()}
        
        {renderStepContent()}

        <DialogFooter>
          {step > 1 && (
            <Button 
              variant="outline" 
              onClick={() => step > 1 ? setStep(step - 1) : handleReset()}
            >
              Back
            </Button>
          )}
          <Button variant="outline" onClick={handleReset}>Cancel</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
