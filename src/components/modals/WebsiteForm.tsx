
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { MultipleSelector, Option } from '@/components/MultipleSelector';

interface WebsiteFormProps {
  onSubmit: (data: any) => void;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = React.useState('');
  const [scanType, setScanType] = React.useState('individual');
  const [selectedTags, setSelectedTags] = React.useState<Option[]>([]);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onSubmit({
        url,
        scanType,
        tags: selectedTags.map(t => t.value),
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Documentation', value: 'docs' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="website-url">Website URL</Label>
        <Input 
          id="website-url" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <p className="text-xs text-gray-500">
          Enter the URL of the website you want to crawl. For best results, use the homepage or main content page.
        </p>
      </div>

      <div className="space-y-2">
        <Label>Scan Type</Label>
        <RadioGroup value={scanType} onValueChange={setScanType} className="flex flex-col space-y-1">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="individual" id="individual" />
            <Label htmlFor="individual">Individual Page</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="multi" id="multi" />
            <Label htmlFor="multi">Multi-page (crawl all pages)</Label>
          </div>
        </RadioGroup>
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
          Tags help organize and filter your data sources. You can create new tags by typing and pressing Enter.
        </p>
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-purple-500 hover:bg-purple-600"
        disabled={isSubmitting || !url}
      >
        {isSubmitting ? "Processing..." : "Crawl Website"}
      </Button>
    </form>
  );
};
