
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MultipleSelector, Option } from '@/components/MultipleSelector';
import { WebsiteCrawlResult } from '../WebsiteCrawlResult';
import { QnAPreview } from '../QnAPreview';
import { DataSource, SourceType } from '@/types/DataSource';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/tabs';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '../ui/table';
import { Textarea } from '../ui/textarea';

interface EditDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
  dataSource?: DataSource;
  onSave: (id: string, updatedData: any) => void;
}

export const EditDataSourceModal: React.FC<EditDataSourceModalProps> = ({
  isOpen,
  onClose,
  dataSource,
  onSave,
}) => {
  const [name, setName] = useState(dataSource?.name || '');
  const [category, setCategory] = useState(dataSource?.category || '');
  const [subCategory, setSubCategory] = useState(dataSource?.subCategory || '');
  const [selectedTags, setSelectedTags] = useState<Option[]>(
    dataSource?.tags.map(tag => ({ label: tag, value: tag })) || []
  );
  const [activeTab, setActiveTab] = useState('details');

  // Website specific state
  const [url, setUrl] = useState(dataSource?.url || '');
  const [crawledPages, setCrawledPages] = useState<any[]>([]);
  const [selectedPages, setSelectedPages] = useState<string[]>([]);

  // QnA specific state
  const [qnas, setQnas] = useState<any[]>([
    { id: '1', question: 'What products do you offer?', answer: 'We offer a range of products in software, hardware, and services.' },
    { id: '2', question: 'How can I contact customer support?', answer: 'You can contact our customer support at support@example.com or call us at 123-456-7890.' },
    { id: '3', question: 'What is your refund policy?', answer: 'We offer a 30-day money-back guarantee on all our products.' },
  ]);

  // Manual QnA editing state
  const [editingQnA, setEditingQnA] = useState<number | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [currentAnswer, setCurrentAnswer] = useState('');

  // For new QnA
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  React.useEffect(() => {
    if (dataSource) {
      setName(dataSource.name);
      setCategory(dataSource.category || '');
      setSubCategory(dataSource.subCategory || '');
      setSelectedTags(dataSource.tags.map(tag => ({ label: tag, value: tag })));
      setUrl(dataSource.url || '');
      
      if (dataSource.sourceType === 'Website') {
        // Mock crawled pages data
        setCrawledPages([
          { url: 'https://example.com', title: 'Homepage', selected: true, qnasGenerated: true },
          { url: 'https://example.com/about', title: 'About Us', selected: true, qnasGenerated: true },
          { url: 'https://example.com/products', title: 'Products', selected: true, qnasGenerated: false },
          { url: 'https://example.com/blog', title: 'Blog', selected: true, qnasGenerated: false },
        ]);
        setSelectedPages(['https://example.com', 'https://example.com/about']);
      }
    }
  }, [dataSource]);

  const handleSave = () => {
    if (!dataSource) return;

    const updatedData: any = {
      name,
      category,
      subCategory,
      tags: selectedTags.map(tag => tag.value),
    };

    if (dataSource.sourceType === 'Website') {
      updatedData.url = url;
      updatedData.selectedPages = selectedPages;
    }

    if (dataSource.sourceType === 'Manual QnA') {
      updatedData.qnas = qnas;
    }

    onSave(dataSource.id, updatedData);
    onClose();
  };

  const handleStartEditQnA = (index: number) => {
    setEditingQnA(index);
    setCurrentQuestion(qnas[index].question);
    setCurrentAnswer(qnas[index].answer);
  };

  const handleSaveQnA = () => {
    if (editingQnA === null) return;
    
    const updatedQnAs = [...qnas];
    updatedQnAs[editingQnA] = {
      ...updatedQnAs[editingQnA],
      question: currentQuestion,
      answer: currentAnswer
    };
    
    setQnas(updatedQnAs);
    setEditingQnA(null);
    setCurrentQuestion('');
    setCurrentAnswer('');
  };

  const handleDeleteQnA = (index: number) => {
    const updatedQnAs = qnas.filter((_, i) => i !== index);
    setQnas(updatedQnAs);
  };

  const handleAddQnA = () => {
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    
    const newQnA = {
      id: Date.now().toString(),
      question: newQuestion,
      answer: newAnswer
    };
    
    setQnas([...qnas, newQnA]);
    setNewQuestion('');
    setNewAnswer('');
  };

  const categoryOptions = [
    'E-commerce', 'Documentation', 'Blog', 'Support', 'Tools', 'Services', 'Company'
  ];
  
  const subcategoryOptions = [
    'Product Info', 'FAQ', 'Tutorials', 'Policies', 'Technical', 'General'
  ];

  const tagOptions: Option[] = [
    { label: 'Product', value: 'product' },
    { label: 'Support', value: 'support' },
    { label: 'FAQ', value: 'faq' },
    { label: 'Documentation', value: 'docs' },
    { label: 'Marketing', value: 'marketing' },
    { label: 'Technical', value: 'technical' },
  ];

  const renderSourceSpecificContent = () => {
    if (!dataSource) return null;

    switch (dataSource.sourceType) {
      case 'Website':
        return (
          <TabsContent value="sources">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="website-url">Website URL</Label>
                <Input 
                  id="website-url" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              
              <WebsiteCrawlResult 
                pages={crawledPages}
                selectedPages={selectedPages}
                onPageSelection={setSelectedPages}
                onGenerateQnAs={() => {}}
              />
            </div>
          </TabsContent>
        );
        
      case 'Manual QnA':
        return (
          <TabsContent value="qna">
            <div className="space-y-6">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Answer</TableHead>
                      <TableHead className="w-24">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qnas.map((qna, index) => (
                      <TableRow key={qna.id}>
                        <TableCell>
                          {editingQnA === index ? (
                            <Input 
                              value={currentQuestion}
                              onChange={(e) => setCurrentQuestion(e.target.value)}
                            />
                          ) : (
                            qna.question
                          )}
                        </TableCell>
                        <TableCell>
                          {editingQnA === index ? (
                            <Textarea 
                              value={currentAnswer}
                              onChange={(e) => setCurrentAnswer(e.target.value)}
                              rows={3}
                            />
                          ) : (
                            <div className="line-clamp-2">{qna.answer}</div>
                          )}
                        </TableCell>
                        <TableCell>
                          {editingQnA === index ? (
                            <Button size="sm" onClick={handleSaveQnA}>Save</Button>
                          ) : (
                            <div className="flex space-x-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleStartEditQnA(index)}
                              >
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive"
                                onClick={() => handleDeleteQnA(index)}
                              >
                                Delete
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
              
              <div className="space-y-4 border-t pt-4">
                <h3 className="font-medium">Add New Q&A</h3>
                <div className="space-y-2">
                  <Label htmlFor="new-question">Question</Label>
                  <Input 
                    id="new-question"
                    value={newQuestion}
                    onChange={(e) => setNewQuestion(e.target.value)}
                    placeholder="Enter new question..."
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="new-answer">Answer</Label>
                  <Textarea 
                    id="new-answer"
                    value={newAnswer}
                    onChange={(e) => setNewAnswer(e.target.value)}
                    placeholder="Enter the answer..."
                    rows={4}
                  />
                </div>
                
                <Button 
                  onClick={handleAddQnA}
                  disabled={!newQuestion.trim() || !newAnswer.trim()}
                  className="bg-purple-500 hover:bg-purple-600"
                >
                  Add Q&A
                </Button>
              </div>
            </div>
          </TabsContent>
        );
        
      case 'CSV':
        return (
          <TabsContent value="sources">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Current CSV File</Label>
                <div className="p-4 border rounded-md bg-gray-50 text-sm">
                  data_source_example.csv <span className="text-gray-500">(Uploaded on {new Date().toLocaleDateString()})</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="csv-upload">Upload New CSV</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                  <Input 
                    id="csv-upload" 
                    type="file" 
                    accept=".csv"
                    className="hidden"
                  />
                  <Label htmlFor="csv-upload" className="cursor-pointer">
                    <div className="space-y-2">
                      <div className="text-purple-500">Click to upload or drag and drop</div>
                      <div className="text-xs text-gray-500">CSV files only (max 10MB)</div>
                    </div>
                  </Label>
                </div>
              </div>
              
              <div>
                <Button 
                  variant="outline"
                  size="sm"
                  className="text-purple-600 border-purple-200 hover:bg-purple-50"
                >
                  Download Sample CSV
                </Button>
              </div>
            </div>
          </TabsContent>
        );

      default:
        return null;
    }
  };

  if (!dataSource) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Edit Data Source: {dataSource.name}</DialogTitle>
          <DialogDescription>
            Make changes to your {dataSource.sourceType} data source.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="details" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-2 md:grid-cols-3 mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            {(dataSource.sourceType === 'Website' || dataSource.sourceType === 'CSV') && 
              <TabsTrigger value="sources">Sources</TabsTrigger>
            }
            {dataSource.sourceType === 'Manual QnA' && 
              <TabsTrigger value="qna">Q&A</TabsTrigger>
            }
            <TabsTrigger value="preview">Generated Q&As</TabsTrigger>
          </TabsList>
          
          <TabsContent value="details">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input 
                  id="name" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {categoryOptions.map(cat => (
                        <SelectItem key={cat} value={cat.toLowerCase()}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="sub-category">Sub-category</Label>
                  <Select value={subCategory} onValueChange={setSubCategory}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select sub-category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {subcategoryOptions.map(subcat => (
                        <SelectItem key={subcat} value={subcat.toLowerCase()}>
                          {subcat}
                        </SelectItem>
                      ))}
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
            </div>
          </TabsContent>
          
          {renderSourceSpecificContent()}
          
          <TabsContent value="preview">
            <QnAPreview 
              qnas={qnas}
              onFinish={() => setActiveTab('details')}
            />
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSave}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
