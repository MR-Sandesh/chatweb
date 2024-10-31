"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';
import { VideoCall } from '@/components/video-call';
import { MessageBubble } from '@/components/chat/message-bubble';
import { MessageInput } from '@/components/chat/message-input';
import { ContactInfo } from '@/components/chat/contact-info';
import { Message, Contact } from '@/lib/types';
import {
  Phone,
  Video,
  MoreVertical,
  Info,
} from 'lucide-react';

const CURRENT_CONTACT: Contact = {
  id: 1,
  name: 'Sarah Wilson',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  bio: "Hey there! I'm a UX designer passionate about creating beautiful and functional interfaces.",
  status: "Living in the moment ✨",
  lastSeen: "2 hours ago",
  isVerified: true,
  online: true,
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: '1',
    content: 'Hey Sarah! How are you doing?',
    timestamp: '10:00 AM',
    sender: 'user',
    type: 'text',
    status: 'read',
    encrypted: true,
  },
  {
    id: '2',
    content: "Hi! I'm doing great, thanks for asking! How about you?",
    timestamp: '10:02 AM',
    sender: 'contact',
    type: 'text',
    status: 'read',
    encrypted: true,
  },
  {
    id: '3',
    content: 'Would you like to have a quick video call to discuss the project?',
    timestamp: '10:03 AM',
    sender: 'user',
    type: 'text',
    status: 'delivered',
    encrypted: true,
  },
];

export function ChatArea() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [isAIEnabled, setIsAIEnabled] = useState(false);

  const handleSendMessage = (content: string, type: 'text' | 'voice' | 'image') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
      sender: 'user',
      type,
      status: 'sent',
      encrypted: true,
      ...(type === 'image' && { mediaUrl: content }),
    };

    setMessages((prev) => [...prev, newMessage]);

    if (isAIEnabled) {
      setTimeout(() => {
        const aiResponse: Message = {
          id: Date.now().toString(),
          content: 'This is an AI-assisted response. How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          sender: 'ai',
          type: 'text',
          status: 'read',
          encrypted: true,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <div className="flex flex-1 flex-col">
      {showVideoCall ? (
        <VideoCall onClose={() => setShowVideoCall(false)} />
      ) : (
        <>
          <div className="flex items-center justify-between border-b p-4">
            <button
              className="flex items-center gap-3"
              onClick={() => setShowContactInfo(true)}
            >
              <UserAvatar
                name={CURRENT_CONTACT.name}
                image={CURRENT_CONTACT.avatar}
                online={CURRENT_CONTACT.online}
              />
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-semibold">{CURRENT_CONTACT.name}</h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  {CURRENT_CONTACT.online ? 'Online' : CURRENT_CONTACT.lastSeen}
                </p>
              </div>
            </button>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowVideoCall(true)}
              >
                <Video className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowContactInfo(true)}
              >
                <Info className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isUser={message.sender === 'user'}
                />
              ))}
            </div>
          </ScrollArea>
          <MessageInput
            onSendMessage={handleSendMessage}
            onToggleAI={() => setIsAIEnabled(!isAIEnabled)}
            isAIEnabled={isAIEnabled}
          />
          <ContactInfo
            contact={CURRENT_CONTACT}
            isOpen={showContactInfo}
            onClose={() => setShowContactInfo(false)}
          />
        </>
      )}
    </div>
  );
}