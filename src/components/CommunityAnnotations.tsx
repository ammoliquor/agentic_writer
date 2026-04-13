'use client';

import { motion } from 'framer-motion';
import { Annotation } from '@/data/tutorialData';

interface CommunityAnnotationsProps {
  annotations: Annotation[];
  currentTime: number;
  onSeek: (time: number) => void;
  highlightId?: string | null;
}

export default function CommunityAnnotations({ annotations, currentTime, onSeek, highlightId }: CommunityAnnotationsProps) {
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const sortedAnnotations = [...annotations].sort((a, b) => a.timestamp - b.timestamp);

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💬</span>
        <h3 className="text-white font-semibold">Community Notes</h3>
        <span className="ml-auto text-xs text-white/40">{annotations.length} notes</span>
      </div>

      <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
        {sortedAnnotations.map((ann) => {
          const isNear = Math.abs(ann.timestamp - currentTime) < 30;
          const isHighlighted = highlightId === ann.id;
          return (
            <motion.div
              key={ann.id}
              animate={isHighlighted ? { scale: [1, 1.02, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`p-3 rounded-lg border cursor-pointer transition-all hover:bg-white/10 ${
                isHighlighted
                  ? 'bg-yellow-400/10 border-yellow-400/40'
                  : isNear
                  ? 'bg-blue-500/10 border-blue-400/20'
                  : 'bg-white/5 border-white/10'
              }`}
              onClick={() => onSeek(ann.timestamp)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-blue-400 hover:text-blue-300 transition-colors">
                      @{formatTime(ann.timestamp)}
                    </span>
                    <span className="text-white/40 text-xs">•</span>
                    <span className="text-white/50 text-xs truncate">{ann.author}</span>
                  </div>
                  <p className="text-white/80 text-sm leading-snug">{ann.text}</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <span className="text-white/40 text-xs">👍</span>
                  <span className="text-white/40 text-xs">{ann.likes}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <button className="w-full py-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg text-white/50 hover:text-white/70 text-xs transition-all">
        + Add Annotation
      </button>
    </div>
  );
}
