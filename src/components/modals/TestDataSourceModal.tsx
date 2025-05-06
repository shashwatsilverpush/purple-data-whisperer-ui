
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
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { ChatbotPlayground } from '../ChatbotPlayground';

interface TestDataSourceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TestDataSourceModal: React.FC<TestDataSourceModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [chatMode, setChatMode] = useState(false);

  const handleTest = () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setResult(`The query "${query}" was processed successfully. The chatbot was able to find relevant information from the data sources and generate an appropriate response.`);
      setLoading(false);
    }, 1500);
  };

  const toggleChatMode = () => {
    setChatMode(!chatMode);
    setResult('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Test Data Source</DialogTitle>
          <DialogDescription>
            Enter a query to test how your chatbot would respond using the current data sources.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Checkbox id="include-all" />
              <Label htmlFor="include-all">Include all data sources (including inactive)</Label>
            </div>
            
            <Button 
              variant="outline" 
              onClick={toggleChatMode}
              className="text-purple-600 border-purple-200 hover:bg-purple-50"
            >
              {chatMode ? "Simple Mode" : "Chat Mode"}
            </Button>
          </div>

          {chatMode ? (
            <ChatbotPlayground />
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="test-query">Test Query</Label>
                <Input 
                  id="test-query" 
                  placeholder="How do I return a product?" 
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                />
              </div>

              {result && (
                <div className="space-y-2 mt-4">
                  <Label>Result</Label>
                  <Textarea 
                    value={result}
                    readOnly
                    rows={8}
                    className="bg-gray-50"
                  />
                </div>
              )}
            </>
          )}
        </div>

        {!chatMode && (
          <DialogFooter>
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button 
              onClick={handleTest} 
              disabled={loading || !query} 
              className="bg-purple-500 hover:bg-purple-600"
            >
              {loading ? "Testing..." : "Test Query"}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};
