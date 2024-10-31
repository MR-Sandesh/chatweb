"use client";

import { Message } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Lock,
  CheckCheck,
  Check,
  Play,
  Pause,
  Image as ImageIcon,
} from 'lucide-react';
import { useState } from 'react';

export function MessageBubble({ message, isUser }: { message: Message; isUser: boolean }) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayVoice = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div
      className={cn(
        'group flex max-w-[70%] items-end gap-2',
        isUser ? 'ml-auto' : 'mr-auto'
      )}
    >
      {message.encrypted && (
        <Lock className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100" />
      )}
      <div
        className={cn(
          'rounded-lg p-3',
          isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'
        )}
      >
        {message.type === 'text' && <p>{message.content}</p>}
        
        {message.type === 'voice' && (
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={handlePlayVoice}
            >
              {isPlaying ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4" />
              )}
            </Button>
            <div className="h-[2px] w-24 bg-current opacity-50" />
            <span className="text-xs">0:12</span>
          </div>
        )}

        {message.type === 'image' && message.mediaUrl && (
          <div className="relative">
            <img
              src={message.mediaUrl}
              alt="Shared image"
              className="rounded-md"
              width={200}
              height={200}
            />
            <Badge
              variant="secondary"
              className="absolute bottom-2 right-2 gap-1 bg-black/50 text-white"
            >
              <ImageIcon className="h-3 w-3" /> Image
            </Badge>
          </div>
        )}

        <div className="mt-1 flex items-center gap-1 text-xs opacity-70">
          <span>{message.timestamp}</span>
          {isUser && (
            <span>
              {message.status === 'read' ? (
                <CheckCheck className="h-3 w-3" />
              ) : (
                <Check className="h-3 w-3" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}