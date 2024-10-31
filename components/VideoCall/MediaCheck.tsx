"use client";

import { useEffect, useState } from 'react';
import { AlertCircle, Camera, Mic } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { useMediaDevices } from '@/hooks/useMediaDevices';

interface MediaCheckProps {
  onReady: (hasVideo: boolean, hasAudio: boolean) => void;
}

export function MediaCheck({ onReady }: MediaCheckProps) {
  const { hasVideo, hasAudio, error, requestMediaStream } = useMediaDevices();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!error && (hasVideo || hasAudio)) {
      setIsChecking(false);
      onReady(hasVideo, hasAudio);
    }
  }, [hasVideo, hasAudio, error, onReady]);

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Media Access Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  if (isChecking) {
    return (
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Camera className={hasVideo ? "text-green-500" : "text-gray-400"} />
          <span>{hasVideo ? "Camera detected" : "No camera found"}</span>
        </div>
        <div className="flex items-center gap-2">
          <Mic className={hasAudio ? "text-green-500" : "text-gray-400"} />
          <span>{hasAudio ? "Microphone detected" : "No microphone found"}</span>
        </div>
        {(!hasVideo && !hasAudio) && (
          <Button 
            variant="secondary"
            onClick={() => window.location.reload()}
          >
            Retry Device Detection
          </Button>
        )}
      </div>
    );
  }

  return null;
}