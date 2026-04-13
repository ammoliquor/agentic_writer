'use client';

import { motion } from 'framer-motion';
import { Annotation } from '@/data/tutorialData';

interface TimelineBarProps {
  currentTime: number;
  totalDuration: number;
  codeCompleteness: number;
  annotations: Annotation[];
  onSeek: (time: number) => void;
  onAnnotationClick: (annotation: Annotation) => void;
}

export default function TimelineBar({ currentTime, totalDuration, codeCompleteness, annotations, onSeek, onAnnotationClick }: TimelineBarProps) {
  const progressPercent = (currentTime / totalDuration) * 100;

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-4">
      {/* Video Progress */}
      <div className="mb-3">
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>Video Progress</span>
          <span>{Math.floor(progressPercent)}%</span>
        </div>
        <div
          className="relative w-full h-2 bg-white/10 rounded-full cursor-pointer group"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const percent = (e.clientX - rect.left) / rect.width;
            onSeek(Math.floor(percent * totalDuration));
          }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-full"
            style={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3 }}
          />
          {/* Annotation markers */}
          {annotations.map((ann) => (
            <button
              key={ann.id}
              className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-yellow-400 border-2 border-yellow-600 hover:scale-150 transition-transform z-10 cursor-pointer"
              style={{ left: `${(ann.timestamp / totalDuration) * 100}%` }}
              onClick={(e) => {
                e.stopPropagation();
                onAnnotationClick(ann);
              }}
              title={ann.text}
            />
          ))}
          {/* Playhead */}
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg border-2 border-red-400 transition-all duration-300"
            style={{ left: `calc(${progressPercent}% - 6px)` }}
          />
        </div>
      </div>

      {/* Code Completeness */}
      <div>
        <div className="flex justify-between text-xs text-white/50 mb-1">
          <span>Code Revealed</span>
          <span className="text-green-400 font-semibold">{Math.floor(codeCompleteness)}%</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
            animate={{ width: `${codeCompleteness}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </div>
    </div>
  );
}
