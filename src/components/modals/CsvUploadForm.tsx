
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultipleSelector, Option } from '@/components/MultipleSelector';
import { UploadCloud } from 'lucide-react';

interface CsvUploadFormProps {
  onSubmit: (data: any) => void;
}

export const CsvUploadForm: React.FC<CsvUploadFormProps> = ({ onSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<Option[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFileName(file.name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      file: selectedFile,
      fileName,
      category,
      subCategory,
      tags: selectedTags.map(t => t.value),
    });
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Support', value: 'support' },
    { label: 'Pricing', value: 'pricing' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-2">
          <UploadCloud className="h-12 w-12 text-gray-400" />
          <div className="text-sm text-gray-500">
            <Label htmlFor="csv-upload" className="cursor-pointer text-purple-500 hover:text-purple-600">
              Click to upload
            </Label>{' '}
            or drag and drop
          </div>
          <p className="text-xs text-gray-500">
            CSV file format (columns: Question, Answer, Category, Sub-category)
          </p>
          {fileName && (
            <p className="text-sm font-medium text-purple-500">{fileName}</p>
          )}
        </div>
        <Input 
          id="csv-upload" 
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div className="flex space-x-4">
        <div className="space-y-2 w-1/2">
          <Label htmlFor="category">Default Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="products">Products</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 w-1/2">
          <Label htmlFor="sub-category">Default Sub-category</Label>
          <Select value={subCategory} onValueChange={setSubCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Select sub-category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="faqs">FAQs</SelectItem>
                <SelectItem value="warranty">Warranty</SelectItem>
                <SelectItem value="returns">Returns</SelectItem>
                <SelectItem value="international">International</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label>Default Tags</Label>
        <MultipleSelector
          placeholder="Select tags..."
          value={selectedTags}
          onChange={setSelectedTags}
          options={tagOptions}
          creatable
        />
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-purple-500 hover:bg-purple-600" 
        disabled={!selectedFile}
      >
        Upload CSV
      </Button>
    </form>
  );
};
