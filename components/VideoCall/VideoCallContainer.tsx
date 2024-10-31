"use client";

import { useState } from 'react';
import { MediaCheck } from './MediaCheck';
import { VideoCallInterface } from './VideoCallInterface';

export function VideoCallContainer() {
  const [mediaState, setMediaState] = useState<{
    isReady: boolean;
    hasVideo: boolean;
    hasAudio: boolean;
  }>({
    isReady: false,
    hasVideo: false,
    hasAudio: false,
  });

  const handleMediaReady = (hasVideo: boolean, hasAudio: boolean) => {
    setMediaState({
      isReady: true,
      hasVideo,
      hasAudio,
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      {!mediaState.isReady ? (
        <MediaCheck onReady={handleMediaReady} />
      ) : (
        <VideoCallInterface
          hasVideo={mediaState.hasVideo}
          hasAudio={mediaState.hasAudio}
        />
      )}
    </div>
  );
}