
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export const ChatbotPlayground: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello! I'm your AI assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponses = [
        "I found some information about that in our knowledge base. Here's what I know...",
        "Based on the data sources available, I can tell you that...",
        "That's an interesting question! According to our documentation...",
        "I've searched through our data sources and found a relevant answer for you.",
        "Great question! Here's what I found about that topic in our resources."
      ];
      
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        content: `${randomResponse} This is a simulated response for "${userMessage.content}". In a real implementation, this would be generated based on your data sources.`,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  
  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col h-[500px] border rounded-md overflow-hidden">
      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={cn(
                "flex items-start gap-3 max-w-[80%]",
                message.isUser ? "ml-auto" : ""
              )}
            >
              {!message.isUser && (
                <Avatar className="h-8 w-8 bg-purple-100 text-purple-600">
                  <span className="text-xs font-bold">AI</span>
                </Avatar>
              )}
              
              <div 
                className={cn(
                  "rounded-lg px-4 py-2 text-sm",
                  message.isUser 
                    ? "bg-purple-500 text-white"
                    : "bg-white border border-gray-200"
                )}
              >
                {message.content}
              </div>
              
              {message.isUser && (
                <Avatar className="h-8 w-8 bg-gray-200">
                  <span className="text-xs font-bold">You</span>
                </Avatar>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 bg-purple-100 text-purple-600">
                <span className="text-xs font-bold">AI</span>
              </Avatar>
              <div className="bg-white border border-gray-200 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '200ms' }}></div>
                  <div className="h-2 w-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '400ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {/* Input Area */}
      <div className="border-t p-4 bg-white">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your question here..."
            className="flex-1"
            disabled={isTyping}
          />
          <Button 
            onClick={handleSendMessage} 
            disabled={!input.trim() || isTyping}
            className="bg-purple-500 hover:bg-purple-600"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
