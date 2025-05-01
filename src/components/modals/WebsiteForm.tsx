
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultipleSelector, Option } from '@/components/MultipleSelector';

interface WebsiteFormProps {
  onSubmit: (data: any) => void;
}

export const WebsiteForm: React.FC<WebsiteFormProps> = ({ onSubmit }) => {
  const [url, setUrl] = React.useState('');
  const [scanType, setScanType] = React.useState('individual');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<Option[]>([]);
  const [isMultipage, setIsMultipage] = React.useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      url,
      scanType,
      category,
      subCategory,
      tags: selectedTags.map(t => t.value),
      isMultipage
    });
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Documentation', value: 'docs' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="website-url">Website URL</Label>
        <Input 
          id="website-url" 
          placeholder="https://example.com" 
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
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

      <div className="flex space-x-4">
        <div className="space-y-2 w-1/2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="e-commerce">E-commerce</SelectItem>
                <SelectItem value="blog">Blog</SelectItem>
                <SelectItem value="documentation">Documentation</SelectItem>
                <SelectItem value="support">Support</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 w-1/2">
          <Label htmlFor="sub-category">Sub-category</Label>
          <Select value={subCategory} onValueChange={setSubCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="clothing">Clothing</SelectItem>
                <SelectItem value="tech">Technology</SelectItem>
                <SelectItem value="faq">FAQ</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
      </div>

      <div className="flex items-center space-x-2 pt-2">
        <Checkbox 
          id="multipage" 
          checked={isMultipage}
          onCheckedChange={(checked) => setIsMultipage(checked as boolean)}
        />
        <Label htmlFor="multipage">Process all nested pages</Label>
      </div>

      <Button type="submit" className="w-full mt-6 bg-purple-500 hover:bg-purple-600">Add Website</Button>
    </form>
  );
};
