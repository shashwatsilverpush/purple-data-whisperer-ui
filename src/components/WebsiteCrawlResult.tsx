
import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Link, Check } from 'lucide-react';

interface WebsiteCrawlResultProps {
  pages: {
    url: string;
    title: string;
    selected: boolean;
    qnasGenerated: boolean;
  }[];
  selectedPages: string[];
  onPageSelection: (urls: string[]) => void;
  onGenerateQnAs: () => void;
}

export const WebsiteCrawlResult: React.FC<WebsiteCrawlResultProps> = ({ 
  pages, 
  selectedPages,
  onPageSelection,
  onGenerateQnAs
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectAll, setSelectAll] = useState(true);

  const handleToggleAll = (checked: boolean) => {
    setSelectAll(checked);
    if (checked) {
      onPageSelection(pages.map(page => page.url));
    } else {
      onPageSelection([]);
    }
  };

  const handleTogglePage = (url: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedPages, url]
      : selectedPages.filter(pageUrl => pageUrl !== url);
    
    onPageSelection(newSelected);
    setSelectAll(newSelected.length === pages.length);
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Submit selected pages
    setTimeout(() => {
      onGenerateQnAs();
      setIsProcessing(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">Crawled Pages</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">
            {selectedPages.length} of {pages.length} selected
          </span>
        </div>
      </div>
      
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox 
                  checked={selectAll} 
                  onCheckedChange={handleToggleAll} 
                />
              </TableHead>
              <TableHead>Page URL</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="w-32">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.url}>
                <TableCell>
                  <Checkbox 
                    checked={selectedPages.includes(page.url)}
                    onCheckedChange={(checked) => handleTogglePage(page.url, !!checked)}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Link className="h-4 w-4 text-purple-500" />
                    <a 
                      href={page.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:underline"
                    >
                      {page.url}
                    </a>
                  </div>
                </TableCell>
                <TableCell>{page.title}</TableCell>
                <TableCell>
                  {page.qnasGenerated ? (
                    <div className="flex items-center text-green-600">
                      <Check className="h-4 w-4 mr-1" /> 
                      <span>Q&As Generated</span>
                    </div>
                  ) : (
                    <span className="text-gray-500">Pending</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={handleSubmit}
          disabled={selectedPages.length === 0 || isProcessing}
          className="bg-purple-500 hover:bg-purple-600"
        >
          {isProcessing ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};
