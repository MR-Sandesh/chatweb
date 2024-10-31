"use client";

import { Contact } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserAvatar } from '@/components/user-avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  BadgeCheck,
  Clock,
  ImageIcon,
  Info,
  MessageSquare,
  X,
} from 'lucide-react';

interface ContactInfoProps {
  contact: Contact;
  isOpen: boolean;
  onClose: () => void;
}

const SHARED_MEDIA = [
  'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
  'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843',
];

export function ContactInfo({ contact, isOpen, onClose }: ContactInfoProps) {
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle>Contact Info</SheetTitle>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-4rem)] pr-4">
          <div className="space-y-6 py-6">
            <div className="flex flex-col items-center gap-4">
              <UserAvatar
                name={contact.name}
                image={contact.avatar}
                size="lg"
              />
              <div className="text-center">
                <div className="flex items-center gap-2">
                  <h2 className="text-2xl font-semibold">{contact.name}</h2>
                  {contact.isVerified && (
                    <BadgeCheck className="h-5 w-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  {contact.online ? 'Online' : contact.lastSeen}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <Info className="h-5 w-5" />
                About
              </h3>
              <p className="text-sm text-muted-foreground">{contact.bio}</p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="flex items-center gap-2 font-semibold">
                  <ImageIcon className="h-5 w-5" />
                  Shared Media
                </h3>
                <Button variant="ghost" className="text-sm">
                  See all
                </Button>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {SHARED_MEDIA.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt={`Shared media ${i + 1}`}
                    className="aspect-square rounded-lg object-cover"
                  />
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="flex items-center gap-2 font-semibold">
                <MessageSquare className="h-5 w-5" />
                1,234 messages
              </h3>
              <h3 className="flex items-center gap-2 font-semibold">
                <Clock className="h-5 w-5" />
                Member since March 2024
              </h3>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}