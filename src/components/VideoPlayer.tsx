'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoPlayerProps {
  currentTime: number;
  isPlaying: boolean;
  onTimeUpdate: (time: number) => void;
  onPlayPause: () => void;
  totalDuration: number;
}

export default function VideoPlayer({ currentTime, isPlaying, onTimeUpdate, onPlayPause, totalDuration }: VideoPlayerProps) {
  const [showControls, setShowControls] = useState(true);
  const [isPiP, setIsPiP] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div
      className={`relative bg-black rounded-xl overflow-hidden border border-white/10 ${isPiP ? 'fixed bottom-4 right-4 w-72 h-40 z-50 shadow-2xl' : 'w-full'}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      {/* YouTube Embed */}
      <div className="relative w-full" style={{ paddingBottom: isPiP ? '0' : '56.25%', height: isPiP ? '100%' : 'auto' }}>
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/rfscVS0vtbw?enablejsapi=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}&controls=0&rel=0`}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          title="Python Tutorial"
        />
        {/* Overlay for custom controls */}
        <div className="absolute inset-0 bg-transparent" />
      </div>

      {/* Custom Controls Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showControls ? 1 : 0 }}
        className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3"
      >
        {/* Progress Bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-2 cursor-pointer"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            onTimeUpdate(Math.floor(percent * totalDuration));
          }}
        >
          <div
            className="h-full bg-red-500 rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Controls Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={onPlayPause}
              className="w-8 h-8 flex items-center justify-center text-white hover:text-red-400 transition-colors"
            >
              {isPlaying ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="6" y="4" width="4" height="16" rx="1"/>
                  <rect x="14" y="4" width="4" height="16" rx="1"/>
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <polygon points="5,3 19,12 5,21"/>
                </svg>
              )}
            </button>
            <span className="text-white text-xs font-mono">
              {formatTime(currentTime)} / {formatTime(totalDuration)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Simulated playback label */}
            <span className="text-white/50 text-xs">Demo Mode</span>
            <button
              onClick={() => setIsPiP(!isPiP)}
              className="text-white/70 hover:text-white transition-colors text-xs px-2 py-1 rounded border border-white/20 hover:border-white/40"
              title="Picture in Picture"
            >
              PiP
            </button>
          </div>
        </div>
      </motion.div>

      {/* Timestamp Badge */}
      <div className="absolute top-2 right-2">
        <motion.div
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono border border-white/10"
        >
          ⏱ {formatTime(currentTime)}
        </motion.div>
      </div>

      {/* PiP close button */}
      {isPiP && (
        <button
          onClick={() => setIsPiP(false)}
          className="absolute top-1 left-1 w-5 h-5 bg-black/80 text-white text-xs rounded flex items-center justify-center hover:bg-red-600 transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
