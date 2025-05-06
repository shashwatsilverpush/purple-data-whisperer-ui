
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleSelector, Option } from '@/components/MultipleSelector';
import { DownloadCloud, UploadCloud } from 'lucide-react';

interface CsvUploadFormProps {
  onSubmit: (data: any) => void;
}

export const CsvUploadForm: React.FC<CsvUploadFormProps> = ({ onSubmit }) => {
  const [fileName, setFileName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      tags: selectedTags.map(t => t.value),
    });
  };

  const handleDownloadSample = () => {
    // In a real app, this would download a real CSV file
    const sampleCsvContent = "Question,Answer\n\"What are your business hours?\",\"We are open Monday to Friday, 9 AM to 5 PM.\"\n\"Do you offer international shipping?\",\"Yes, we ship to most countries worldwide.\"\n\"What payment methods do you accept?\",\"We accept credit cards, PayPal, and bank transfers.\"";
    const blob = new Blob([sampleCsvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'sample_qna.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Support', value: 'support' },
    { label: 'Pricing', value: 'pricing' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex justify-end mb-2">
        <Button 
          type="button" 
          variant="outline" 
          className="flex items-center text-sm" 
          onClick={handleDownloadSample}
        >
          <DownloadCloud className="h-4 w-4 mr-2" />
          Download Sample CSV
        </Button>
      </div>
      
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
            CSV file format (columns: Question, Answer)
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
