"use client";

import { useEffect, useRef, useState } from 'react';
import { Camera, CameraOff, Mic, MicOff, PhoneOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMediaDevices } from '@/hooks/useMediaDevices';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface VideoCallInterfaceProps {
  hasVideo: boolean;
  hasAudio: boolean;
}

export function VideoCallInterface({ hasVideo, hasAudio }: VideoCallInterfaceProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { requestMediaStream } = useMediaDevices();
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isVideoEnabled, setIsVideoEnabled] = useState(hasVideo);
  const [isAudioEnabled, setIsAudioEnabled] = useState(hasAudio);

  useEffect(() => {
    const initializeStream = async () => {
      const { stream: mediaStream, error } = await requestMediaStream(isVideoEnabled, isAudioEnabled);
      
      if (error) {
        setError(error);
        return;
      }

      if (mediaStream && videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setError(null);
      }
    };

    initializeStream();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isVideoEnabled, isAudioEnabled]);

  const toggleVideo = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => {
        track.enabled = !isVideoEnabled;
      });
      setIsVideoEnabled(!isVideoEnabled);
    }
  };

  const toggleAudio = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => {
        track.enabled = !isAudioEnabled;
      });
      setIsAudioEnabled(!isAudioEnabled);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex justify-center gap-4">
        {hasVideo && (
          <Button
            variant={isVideoEnabled ? "default" : "secondary"}
            size="icon"
            onClick={toggleVideo}
          >
            {isVideoEnabled ? (
              <Camera className="h-5 w-5" />
            ) : (
              <CameraOff className="h-5 w-5" />
            )}
          </Button>
        )}

        {hasAudio && (
          <Button
            variant={isAudioEnabled ? "default" : "secondary"}
            size="icon"
            onClick={toggleAudio}
          >
            {isAudioEnabled ? (
              <Mic className="h-5 w-5" />
            ) : (
              <MicOff className="h-5 w-5" />
            )}
          </Button>
        )}

        <Button
          variant="destructive"
          size="icon"
          onClick={endCall}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}