
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { MultipleSelector, Option } from '@/components/MultipleSelector';
import { Download } from 'lucide-react';

interface CsvUploadFormProps {
  onSubmit: (data: any) => void;
}

export const CsvUploadForm: React.FC<CsvUploadFormProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name,
      file,
      tags: selectedTags.map(tag => tag.value),
    };
    
    onSubmit(formData);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const downloadSampleCsv = () => {
    // Create sample CSV content
    const csvContent = "question,answer,tags\n" +
      "What products do you offer?,We offer a range of products in software hardware and services.,product general\n" +
      "How can I contact customer support?,You can contact our customer support at support@example.com or call us at 123-456-7890.,support contact\n" +
      "What is your refund policy?,We offer a 30-day money-back guarantee on all our products.,policy refund";
    
    // Create a blob with the CSV content
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary link element to trigger download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'sample_qna.csv');
    
    // Append the link to the body
    document.body.appendChild(link);
    
    // Trigger the download
    link.click();
    
    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
    { label: 'Account', value: 'account' },
    { label: 'Payments', value: 'payments' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input 
          id="name" 
          placeholder="Enter a name for this CSV source" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="csv-file">CSV File</Label>
          <Button 
            type="button" 
            variant="outline" 
            size="sm"
            className="text-purple-500"
            onClick={downloadSampleCsv}
          >
            <Download className="h-4 w-4 mr-1" /> Download Sample CSV
          </Button>
        </div>
        <Input 
          id="csv-file" 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          required
        />
        <p className="text-sm text-gray-500">
          Upload a CSV file with columns: question, answer, and optional tags.
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
      </div>

      <Button 
        type="submit" 
        className="w-full mt-6 bg-purple-500 hover:bg-purple-600"
        disabled={!file || !name}
      >
        Upload & Process
      </Button>
    </form>
  );
};
