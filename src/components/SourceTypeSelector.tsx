
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Globe, FileSpreadsheet } from 'lucide-react';

interface SourceTypeSelectorProps {
  onSelect: (type: 'website' | 'manual' | 'csv') => void;
}

export const SourceTypeSelector: React.FC<SourceTypeSelectorProps> = ({ onSelect }) => {
  const sourceTypes = [
    {
      id: 'website',
      title: 'Website',
      description: 'Add content from a website URL. We will crawl the site and extract content to generate Q&As.',
      icon: <Globe className="h-12 w-12 text-purple-500" />,
      gifUrl: '/assets/website-crawl.gif'
    },
    {
      id: 'manual',
      title: 'Manual Q&A',
      description: 'Manually create question and answer pairs to add to your knowledge base.',
      icon: <FileText className="h-12 w-12 text-purple-500" />,
      gifUrl: '/assets/manual-qa.gif'
    },
    {
      id: 'csv',
      title: 'CSV Upload',
      description: 'Upload a CSV file containing questions and answers in a structured format.',
      icon: <FileSpreadsheet className="h-12 w-12 text-purple-500" />,
      gifUrl: '/assets/csv-upload.gif'
    }
  ];

  return (
    <div className="py-6">
      <h2 className="text-lg font-medium text-center mb-6">Select a Data Source Type</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sourceTypes.map((type) => (
          <Card 
            key={type.id}
            className="cursor-pointer hover:border-purple-300 transition-all hover:shadow-md aspect-square flex flex-col"
            onClick={() => onSelect(type.id as 'website' | 'manual' | 'csv')}
          >
            <CardHeader>
              <div className="flex justify-center mb-4">
                {type.icon}
              </div>
              <CardTitle className="text-center">{type.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col items-center justify-center">
              <div className="h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden w-full">
                {/* GIF representation of the data source type */}
                <img 
                  src={type.gifUrl} 
                  alt={`${type.title} process`} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "https://placehold.co/300x200/e9e9e9/7e22ce?text="+type.title;
                  }}
                />
              </div>
              <CardDescription className="text-sm text-center">
                {type.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-center pt-2">
              <Button 
                variant="outline" 
                className="w-full bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              >
                Select {type.title}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
