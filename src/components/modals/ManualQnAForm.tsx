
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MultipleSelector, Option } from '@/components/MultipleSelector';

interface ManualQnAFormProps {
  onSubmit: (data: any) => void;
}

export const ManualQnAForm: React.FC<ManualQnAFormProps> = ({ onSubmit }) => {
  const [question, setQuestion] = React.useState('');
  const [answer, setAnswer] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [subCategory, setSubCategory] = React.useState('');
  const [selectedTags, setSelectedTags] = React.useState<Option[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      question,
      answer,
      category,
      subCategory,
      tags: selectedTags.map(t => t.value),
    });
  };

  const tagOptions: Option[] = [
    { label: 'Account', value: 'account' },
    { label: 'Payments', value: 'payments' },
    { label: 'Orders', value: 'orders' },
    { label: 'Returns', value: 'returns' },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="question">Question</Label>
        <Input 
          id="question" 
          placeholder="Enter the question" 
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="answer">Answer</Label>
        <Textarea 
          id="answer" 
          placeholder="Enter the answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          required
          rows={6}
        />
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
                <SelectItem value="account">Account</SelectItem>
                <SelectItem value="payments">Payments</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="shipping">Shipping</SelectItem>
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
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="methods">Payment Methods</SelectItem>
                <SelectItem value="tracking">Order Tracking</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
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

      <Button type="submit" className="w-full mt-6 bg-purple-500 hover:bg-purple-600">Add QnA</Button>
    </form>
  );
};
