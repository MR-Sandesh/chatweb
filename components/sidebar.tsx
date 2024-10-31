"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { UserAvatar } from '@/components/user-avatar';
import { Search, Settings, MessageSquarePlus } from 'lucide-react';
import { SettingsPanel } from '@/components/settings-panel';

const CONTACTS = [
  {
    id: 1,
    name: 'Sarah Wilson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    lastMessage: 'Hey, are we still meeting today?',
    time: '2m ago',
    online: true,
  },
  {
    id: 2,
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    lastMessage: 'The project looks great! 🎉',
    time: '1h ago',
    online: true,
  },
  {
    id: 3,
    name: 'Emma Thompson',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    lastMessage: 'Can you send me the files?',
    time: '2h ago',
    online: false,
  },
];

export function Sidebar() {
  const [search, setSearch] = useState('');
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <>
      <div className="flex h-full w-80 flex-col border-r">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Wave</h1>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSettingsOpen(true)}
            >
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          <div className="mt-4 flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search messages..."
                className="pl-8"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <Button size="icon" variant="ghost">
              <MessageSquarePlus className="h-5 w-5" />
            </Button>
          </div>
        </div>
        <Separator />
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-4 py-4">
            {CONTACTS.map((contact) => (
              <button
                key={contact.id}
                className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-muted"
              >
                <UserAvatar
                  name={contact.name}
                  image={contact.avatar}
                  online={contact.online}
                />
                <div className="flex-1 text-left">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{contact.name}</span>
                    <span className="text-xs text-muted-foreground">
                      {contact.time}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {contact.lastMessage}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
      <SettingsPanel
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </>
  );
}