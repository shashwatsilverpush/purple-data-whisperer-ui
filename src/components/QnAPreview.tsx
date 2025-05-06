
import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface QnAPreviewProps {
  qnas: {
    id: string;
    question: string;
    answer: string;
  }[];
  onFinish: () => void;
}

export const QnAPreview: React.FC<QnAPreviewProps> = ({ qnas, onFinish }) => {
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium">Generated Q&As</h3>
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            {qnas.length} Q&As Generated
          </Badge>
        </div>
        
        <p className="text-sm text-gray-500 mb-4">
          Review the following questions and answers generated from your data source.
        </p>
        
        <Accordion type="multiple" className="border rounded-md divide-y">
          {qnas.map((qna) => (
            <AccordionItem value={qna.id} key={qna.id} className="px-4">
              <AccordionTrigger className="hover:bg-gray-50 py-3">
                {qna.question}
              </AccordionTrigger>
              <AccordionContent className="pb-3 pt-1 text-gray-700">
                {qna.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      <div className="flex justify-end">
        <Button 
          onClick={onFinish}
          className="bg-purple-500 hover:bg-purple-600"
        >
          Finish
        </Button>
      </div>
    </div>
  );
};
