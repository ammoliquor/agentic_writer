'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import VideoPlayer from '@/components/VideoPlayer';
import CodeTranscript from '@/components/CodeTranscript';
import TimelineBar from '@/components/TimelineBar';
import InfoPanel from '@/components/InfoPanel';
import { TUTORIAL_CODE_TIMELINE, ANNOTATIONS, CHALLENGES, CodeLine, Concept, Annotation } from '@/data/tutorialData';

const TOTAL_DURATION = 400;

export default function Home() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeConcept, setActiveConcept] = useState<Concept | null>(null);
  const [highlightAnnotationId, setHighlightAnnotationId] = useState<string | null>(null);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(prev => {
        if (prev >= TOTAL_DURATION) {
          setIsPlaying(false);
          return TOTAL_DURATION;
        }
        return prev + 1;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const visibleLines = useMemo(
    () => TUTORIAL_CODE_TIMELINE.filter(line => line.timestamp <= currentTime),
    [currentTime]
  );

  const codeCompleteness = (visibleLines.length / TUTORIAL_CODE_TIMELINE.length) * 100;

  const handleSeek = useCallback((time: number) => {
    setCurrentTime(time);
  }, []);

  const handleLineClick = useCallback((line: CodeLine) => {
    setCurrentTime(line.timestamp);
  }, []);

  const handleAnnotationClick = useCallback((ann: Annotation) => {
    setCurrentTime(ann.timestamp);
    setHighlightAnnotationId(ann.id);
    setTimeout(() => setHighlightAnnotationId(null), 2000);
  }, []);

  return (
    <main className="min-h-screen bg-gray-950 text-white overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-purple-900/10 pointer-events-none" />

      {/* Header */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold">
            CC
          </div>
          <div>
            <h1 className="text-white font-bold text-lg leading-none">CodeCrafter</h1>
            <p className="text-white/40 text-xs">AI Learning Companion</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-white/50 text-xs">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Python Masterclass: Fibonacci &amp; Memoization
          </span>
        </div>
      </header>

      {/* Main Layout */}
      <div className="relative z-10 p-4 h-[calc(100vh-65px)] flex flex-col gap-3">
        
        {/* Timeline bar */}
        <TimelineBar
          currentTime={currentTime}
          totalDuration={TOTAL_DURATION}
          codeCompleteness={codeCompleteness}
          annotations={ANNOTATIONS}
          onSeek={handleSeek}
          onAnnotationClick={handleAnnotationClick}
        />

        {/* Three panel layout */}
        <div className="flex-1 grid grid-cols-12 gap-3 min-h-0">
          
          {/* Left / Info Panel */}
          <div className="col-span-3 min-h-0">
            <InfoPanel
              activeConcept={activeConcept}
              onConceptClose={() => setActiveConcept(null)}
              annotations={ANNOTATIONS}
              challenges={CHALLENGES}
              currentTime={currentTime}
              onSeek={handleSeek}
              highlightAnnotationId={highlightAnnotationId}
            />
          </div>

          {/* Center / Video Player */}
          <div className="col-span-5 flex flex-col gap-3 min-h-0">
            <VideoPlayer
              currentTime={currentTime}
              isPlaying={isPlaying}
              onTimeUpdate={handleSeek}
              onPlayPause={() => setIsPlaying(p => !p)}
              totalDuration={TOTAL_DURATION}
            />
            
            {/* Controls strip */}
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2.5 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(p => !p)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg text-white text-sm font-medium transition-colors"
              >
                {isPlaying ? '⏸ Pause Demo' : '▶ Play Demo'}
              </button>
              <button
                onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                className="flex items-center gap-2 px-3 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg text-white/70 text-sm transition-colors"
              >
                ↺ Reset
              </button>
              <div className="ml-auto flex items-center gap-2 text-white/40 text-xs">
                <span>{visibleLines.length} lines revealed</span>
                <span>•</span>
                <span className="text-green-400">{Math.floor(codeCompleteness)}% complete</span>
              </div>
            </div>
          </div>

          {/* Right / Code Transcript */}
          <div className="col-span-4 min-h-0">
            <CodeTranscript
              visibleLines={visibleLines}
              currentTime={currentTime}
              allLines={TUTORIAL_CODE_TIMELINE}
              onLineClick={handleLineClick}
              onConceptClick={setActiveConcept}
              onSeek={handleSeek}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
