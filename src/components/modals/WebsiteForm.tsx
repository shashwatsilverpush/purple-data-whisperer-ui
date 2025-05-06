
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleSelector, Option } from '@/components/MultipleSelector';
import { Plus, X, Database } from 'lucide-react';

interface WebsiteFormProps {
  onSubmit: (data: any) => void;
  isProcessing?: boolean;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ onSubmit, isProcessing = false }) => {
  const [urls, setUrls] = useState<string[]>(['']);
  const [scanType, setScanType] = useState<'individual' | 'multi'>('individual');
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filter out empty URLs
    const filteredUrls = urls.filter(url => url.trim() !== '');
    
    if (filteredUrls.length === 0) {
      return;
    }
    
    onSubmit({
      urls: filteredUrls,
      scanType,
      tags: selectedTags.map(t => t.value),
    });
  };

  const handleAddUrl = () => {
    setUrls([...urls, '']);
  };

  const handleRemoveUrl = (index: number) => {
    const newUrls = [...urls];
    newUrls.splice(index, 1);
    setUrls(newUrls.length > 0 ? newUrls : ['']);
  };

  const handleUrlChange = (value: string, index: number) => {
    const newUrls = [...urls];
    newUrls[index] = value;
    setUrls(newUrls);
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Documentation', value: 'docs' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <Label>Scan Type</Label>
        <RadioGroup 
          value={scanType} 
          onValueChange={(value) => {
            setScanType(value as 'individual' | 'multi');
            // Reset URLs if changing scan type
            if (value === 'multi' && urls.length > 1) {
              setUrls([urls[0] || '']);
            }
          }}
          className="flex flex-col space-y-1"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual Pages</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multi" id="multi" />
            <Label htmlFor="multi">Multi-page (crawl all pages)</Label>
          </div>
        </RadioGroup>
      </div>

      <div className="space-y-4">
        <Label>Website URL{scanType === 'individual' ? 's' : ''}</Label>
        <div className="space-y-3">
          {urls.map((url, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input 
                placeholder="https://example.com" 
                value={url}
                onChange={(e) => handleUrlChange(e.target.value, index)}
                required
              />
              {(scanType === 'individual' && urls.length > 1) && (
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon" 
                  onClick={() => handleRemoveUrl(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </div>

        {scanType === 'individual' && (
          <Button 
            type="button" 
            variant="outline" 
            size="sm" 
            onClick={handleAddUrl}
            className="mt-2"
          >
            <Plus className="h-4 w-4 mr-1" /> Add URL
          </Button>
        )}

        <p className="text-xs text-gray-500">
          {scanType === 'individual' 
            ? 'Enter the URLs of the specific pages you want to crawl.' 
            : 'Enter the starting URL. All linked pages will be crawled automatically.'}
        </p>
      </div>

      <div className="space-y-2">
        <Label>Tags</Label>
        <MultipleSelector
          placeholder="Select tags..."
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          creatable
        />
        <p className="text-xs text-gray-500">
          Tags help organize and filter your data sources.
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-purple-500 hover:bg-purple-600"
        disabled={isProcessing || urls.every(url => !url)}
      >
        {isProcessing ? "Processing..." : "Submit"}
      </Button>
    </form>
  );
};
