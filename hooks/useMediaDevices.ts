"use client";

import { useState, useEffect } from 'react';

interface MediaDeviceState {
  hasVideo: boolean;
  hasAudio: boolean;
  error: string | null;
}

export const useMediaDevices = () => {
  const [deviceState, setDeviceState] = useState<MediaDeviceState>({
    hasVideo: false,
    hasAudio: false,
    error: null,
  });

  useEffect(() => {
    const checkDevices = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        
        const hasVideo = devices.some(device => device.kind === 'videoinput');
        const hasAudio = devices.some(device => device.kind === 'audioinput');
        
        setDeviceState({
          hasVideo,
          hasAudio,
          error: null,
        });
      } catch (error) {
        setDeviceState(prev => ({
          ...prev,
          error: 'Unable to access media devices. Please check your permissions.',
        }));
      }
    };

    // Check if mediaDevices API is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setDeviceState(prev => ({
        ...prev,
        error: 'Media devices are not supported in your browser.',
      }));
      return;
    }

    checkDevices();

    // Listen for device changes
    navigator.mediaDevices.addEventListener('devicechange', checkDevices);
    
    return () => {
      navigator.mediaDevices.removeEventListener('devicechange', checkDevices);
    };
  }, []);

  const requestMediaStream = async (video = true, audio = true) => {
    try {
      const constraints = {
        video: video && deviceState.hasVideo,
        audio: audio && deviceState.hasAudio,
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      return { stream, error: null };
    } catch (error: any) {
      let errorMessage = 'Failed to access media devices';
      
      if (error.name === 'NotFoundError') {
        errorMessage = 'Required media devices not found. Please check your camera and microphone.';
      } else if (error.name === 'NotAllowedError') {
        errorMessage = 'Permission to access media devices was denied. Please allow access to your camera and microphone.';
      } else if (error.name === 'NotReadableError') {
        errorMessage = 'Unable to access your media devices. They might be in use by another application.';
      }

      return { stream: null, error: errorMessage };
    }
  };

  return {
    ...deviceState,
    requestMediaStream,
  };
};