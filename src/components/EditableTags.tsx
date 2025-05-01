
import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Option } from './MultipleSelector';

interface EditableTagsProps {
  tags: string[];
  onTagsChange: (newTags: string[]) => void;
}

export const EditableTags: React.FC<EditableTagsProps> = ({
  tags,
  onTagsChange
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState('');

  const handleRemoveTag = (tagToRemove: string) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    onTagsChange(updatedTags);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      onTagsChange(updatedTags);
      setNewTag('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <div onClick={() => setIsEditing(true)}>
      {!isEditing ? (
        <div className="flex flex-wrap gap-1 cursor-pointer">
          {tags.map(tag => (
            <Badge 
              key={tag} 
              variant="outline"
              className="bg-purple-50 text-purple-800 border-purple-200"
            >
              {tag}
            </Badge>
          ))}
          {tags.length === 0 && (
            <span className="text-gray-500 text-sm italic">Click to add tags</span>
          )}
        </div>
      ) : (
        <Popover open={isEditing} onOpenChange={setIsEditing}>
          <PopoverTrigger asChild>
            <div className="sr-only">Edit Tags</div>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4" align="start">
            <div className="space-y-4">
              <h4 className="font-medium text-sm">Edit Tags</h4>
              <div className="flex flex-wrap gap-1 mb-2">
                {tags.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="outline"
                    className="bg-purple-50 text-purple-800 border-purple-200 flex items-center gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRemoveTag(tag);
                      }}
                      className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                    >
                      <X className="h-3 w-3 text-purple-800 hover:text-purple-900" />
                    </button>
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add new tag..."
                  className="flex-1"
                  onKeyDown={handleKeyDown}
                />
                <Button 
                  size="sm" 
                  onClick={handleAddTag}
                  variant="outline"
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
};
