"use client";

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Smile,
  Image as ImageIcon,
  Send,
  Mic,
  Bot,
  StopCircle,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface MessageInputProps {
  onSendMessage: (content: string, type: 'text' | 'voice' | 'image') => void;
  onToggleAI: () => void;
  isAIEnabled: boolean;
}

export function MessageInput({
  onSendMessage,
  onToggleAI,
  isAIEnabled,
}: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message, 'text');
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you'd upload the file and get a URL
      const reader = new FileReader();
      reader.onloadend = () => {
        onSendMessage(reader.result as string, 'image');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVoiceRecord = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      // In a real app, you'd stop recording and send the audio
      onSendMessage('voice-message.mp3', 'voice');
    }
  };

  return (
    <div className="border-t p-4">
      <div className="flex items-center gap-2">
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileSelect}
        />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Send Image</TooltipContent>
        </Tooltip>
        
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon">
              <Smile className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Emoji</TooltipContent>
        </Tooltip>

        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          className="flex-1"
        />

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isRecording ? 'destructive' : 'ghost'}
              size="icon"
              onClick={handleVoiceRecord}
            >
              {isRecording ? (
                <StopCircle className="h-5 w-5" />
              ) : (
                <Mic className="h-5 w-5" />
              )}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            {isRecording ? 'Stop Recording' : 'Voice Message'}
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant={isAIEnabled ? 'default' : 'ghost'}
              size="icon"
              onClick={onToggleAI}
            >
              <Bot className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>AI Assistant</TooltipContent>
        </Tooltip>

        <Button onClick={handleSend} disabled={!message.trim()}>
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}