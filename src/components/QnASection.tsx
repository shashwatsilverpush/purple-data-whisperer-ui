
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Search, Filter } from "lucide-react";
import { QnA } from '@/types/DataSource';
import { Label } from './ui/label';
import { MultipleSelector, Option } from './MultipleSelector';

interface QnASectionProps {
  dataSourceId?: string;
}

export const QnASection: React.FC<QnASectionProps> = ({ dataSourceId }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<string | null>(null);
  const [selectedTags, setSelectedTags] = useState<Option[]>([]);
  const [sortField, setSortField] = useState('createdAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');

  // Mock data
  const mockQnAs: QnA[] = [
    {
      id: '1',
      question: 'What products do you offer?',
      answer: 'We offer a range of products in software, hardware, and services.',
      sourceId: 'src1',
      sourceName: 'Company Website',
      sourceType: 'Website',
      tags: ['product', 'general'],
      createdAt: '2023-05-10T10:30:00.000Z',
      updatedAt: '2023-05-10T10:30:00.000Z',
    },
    {
      id: '2',
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support at support@example.com or call us at 123-456-7890.',
      sourceId: 'src1',
      sourceName: 'Company Website',
      sourceType: 'Website',
      tags: ['support', 'contact'],
      createdAt: '2023-05-11T09:15:00.000Z',
      updatedAt: '2023-05-12T14:20:00.000Z',
    },
    {
      id: '3',
      question: 'What is your refund policy?',
      answer: 'We offer a 30-day money-back guarantee on all our products.',
      sourceId: 'src2',
      sourceName: 'FAQ Page',
      sourceType: 'Manual QnA',
      tags: ['policy', 'refund'],
      createdAt: '2023-05-09T11:45:00.000Z',
      updatedAt: '2023-05-09T11:45:00.000Z',
    },
    {
      id: '4',
      question: 'Do you ship internationally?',
      answer: 'Yes, we ship to most countries worldwide. Shipping costs and delivery times vary depending on location.',
      sourceId: 'src3',
      sourceName: 'Product Info',
      sourceType: 'CSV',
      tags: ['shipping', 'international'],
      createdAt: '2023-05-08T15:20:00.000Z',
      updatedAt: '2023-05-08T15:20:00.000Z',
    },
    {
      id: '5',
      question: 'How long does shipping take?',
      answer: 'Domestic shipping typically takes 2-5 business days. International shipping can take 7-21 days depending on the destination country.',
      sourceId: 'src3',
      sourceName: 'Product Info',
      sourceType: 'CSV',
      tags: ['shipping', 'delivery'],
      createdAt: '2023-05-07T09:10:00.000Z',
      updatedAt: '2023-05-07T09:10:00.000Z',
    },
  ];

  // Filter QnAs based on search, source, and tags
  const filteredQnAs = mockQnAs.filter(qna => {
    // Filter by dataSourceId if provided
    if (dataSourceId && qna.sourceId !== dataSourceId) {
      return false;
    }
    
    // Filter by selected source
    if (selectedSource && qna.sourceId !== selectedSource) {
      return false;
    }
    
    // Filter by tags
    if (selectedTags.length > 0) {
      const tagValues = selectedTags.map(t => t.value);
      if (!qna.tags.some(tag => tagValues.includes(tag))) {
        return false;
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        qna.question.toLowerCase().includes(query) ||
        qna.answer.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Sort filtered QnAs
  const sortedQnAs = [...filteredQnAs].sort((a, b) => {
    if (sortField === 'createdAt') {
      return sortDirection === 'asc'
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    } else {
      // Sort by question text
      return sortDirection === 'asc'
        ? a.question.localeCompare(b.question)
        : b.question.localeCompare(a.question);
    }
  });

  // Get unique sources for the filter dropdown
  const sources = Array.from(new Set(mockQnAs.map(qna => qna.sourceId))).map(
    sourceId => {
      const qna = mockQnAs.find(q => q.sourceId === sourceId);
      return {
        id: sourceId,
        name: qna ? qna.sourceName : 'Unknown Source'
      };
    }
  );
  
  // Get unique tags for the filter dropdown
  const tags: Option[] = Array.from(
    new Set(mockQnAs.flatMap(qna => qna.tags))
  ).map(tag => ({
    label: tag.charAt(0).toUpperCase() + tag.slice(1),
    value: tag
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Q&A Library</h2>
        <span className="text-sm text-gray-500">
          {filteredQnAs.length} Q&As found
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="w-full md:w-1/3">
          <Label className="mb-1 block">Search Q&As</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search questions or answers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="w-full md:w-1/4">
          <Label className="mb-1 block">Filter by Source</Label>
          <Select 
            value={selectedSource || ''} 
            onValueChange={(value) => setSelectedSource(value || null)}
          >
            <SelectTrigger>
              <SelectValue placeholder="All Sources" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Sources</SelectItem>
              {sources.map(source => (
                <SelectItem key={source.id} value={source.id}>
                  {source.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full md:w-1/4">
          <Label className="mb-1 block">Filter by Tags</Label>
          <MultipleSelector
            placeholder="Select tags..."
            value={selectedTags}
            onChange={setSelectedTags}
            options={tags}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              size="sm"
              className="whitespace-nowrap"
            >
              Sort by {sortField === 'createdAt' ? 'Date' : 'Question'}
              {sortDirection === 'asc' ? <ArrowUp className="ml-1 h-4 w-4" /> : <ArrowDown className="ml-1 h-4 w-4" />}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem 
              onClick={() => {
                setSortField('createdAt');
                setSortDirection('desc');
              }}
              className={sortField === 'createdAt' && sortDirection === 'desc' ? 'bg-purple-50' : ''}
            >
              Newest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSortField('createdAt');
                setSortDirection('asc');
              }}
              className={sortField === 'createdAt' && sortDirection === 'asc' ? 'bg-purple-50' : ''}
            >
              Oldest First
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSortField('question');
                setSortDirection('asc');
              }}
              className={sortField === 'question' && sortDirection === 'asc' ? 'bg-purple-50' : ''}
            >
              Question (A-Z)
            </DropdownMenuItem>
            <DropdownMenuItem 
              onClick={() => {
                setSortField('question');
                setSortDirection('desc');
              }}
              className={sortField === 'question' && sortDirection === 'desc' ? 'bg-purple-50' : ''}
            >
              Question (Z-A)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="border rounded-md">
        <Accordion type="multiple" className="w-full">
          {sortedQnAs.length > 0 ? (
            sortedQnAs.map((qna) => (
              <AccordionItem value={qna.id} key={qna.id}>
                <AccordionTrigger className="px-4 hover:bg-gray-50">
                  <div className="flex flex-col items-start text-left">
                    <div>{qna.question}</div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      <Badge variant="outline" className="text-xs bg-gray-50">
                        {qna.sourceName}
                      </Badge>
                      {qna.tags.map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="text-xs bg-purple-50 text-purple-700"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-4">
                  <div className="bg-gray-50 p-3 rounded-md">
                    {qna.answer}
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    Last updated: {new Date(qna.updatedAt).toLocaleString()}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))
          ) : (
            <div className="p-6 text-center text-gray-500">
              No Q&As match your search criteria.
            </div>
          )}
        </Accordion>
      </div>
    </div>
  );
};
