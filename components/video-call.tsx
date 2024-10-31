"use client";

import { useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { UserAvatar } from '@/components/user-avatar';
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  ScreenShare,
  MessageSquare,
} from 'lucide-react';

export function VideoCall({ onClose }: { onClose: () => void }) {
  const localVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    async function setupVideo() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing media devices:', err);
      }
    }
    setupVideo();
  }, []);

  return (
    <div className="relative flex h-full flex-col bg-background">
      <div className="absolute right-4 top-4 z-10">
        <video
          ref={localVideoRef}
          autoPlay
          muted
          playsInline
          className="h-48 w-72 rounded-lg object-cover"
        />
      </div>
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <UserAvatar
            name="Sarah Wilson"
            image="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
            size="lg"
          />
          <h2 className="mt-4 text-xl font-semibold">Sarah Wilson</h2>
          <p className="text-sm text-muted-foreground">00:02:45</p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 border-t bg-muted/50 p-6 backdrop-blur-sm">
        <Button variant="ghost" size="icon">
          <MicOff className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <VideoOff className="h-5 w-5" />
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="h-12 w-12"
          onClick={onClose}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <ScreenShare className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}