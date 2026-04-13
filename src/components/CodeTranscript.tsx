'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CodeLine, Concept, CONCEPTS } from '@/data/tutorialData';

interface CodeTranscriptProps {
  visibleLines: CodeLine[];
  currentTime: number;
  allLines: CodeLine[];
  onLineClick: (line: CodeLine) => void;
  onConceptClick: (concept: Concept) => void;
  onSeek: (time: number) => void;
}

const CONCEPT_TERMS = Object.keys(CONCEPTS);

function highlightConcepts(code: string, onConceptClick: (concept: Concept) => void): React.ReactNode {
  const parts: React.ReactNode[] = [];
  let remaining = code;
  let key = 0;

  while (remaining.length > 0) {
    let foundIdx = -1;
    let foundTerm = '';
    
    for (const term of CONCEPT_TERMS) {
      const idx = remaining.indexOf(term);
      if (idx !== -1 && (foundIdx === -1 || idx < foundIdx)) {
        foundIdx = idx;
        foundTerm = term;
      }
    }

    if (foundIdx === -1) {
      parts.push(<span key={key++}>{remaining}</span>);
      break;
    }

    if (foundIdx > 0) {
      parts.push(<span key={key++}>{remaining.slice(0, foundIdx)}</span>);
    }

    const concept = CONCEPTS[foundTerm];
    const colorClasses: Record<string, string> = {
      yellow: 'text-yellow-300 hover:text-yellow-200 glow-yellow',
      blue: 'text-blue-300 hover:text-blue-200 glow-blue',
      purple: 'text-purple-300 hover:text-purple-200 glow-purple',
      green: 'text-green-300 hover:text-green-200 glow-green',
      orange: 'text-orange-300 hover:text-orange-200 glow-orange',
    };

    parts.push(
      <span
        key={key++}
        className={`cursor-pointer font-bold animate-pulse ${colorClasses[concept.color] || colorClasses.yellow} underline decoration-dotted`}
        onClick={(e) => { e.stopPropagation(); onConceptClick(concept); }}
        title={`Click to learn about ${foundTerm}`}
      >
        {foundTerm}
      </span>
    );

    remaining = remaining.slice(foundIdx + foundTerm.length);
  }

  return <>{parts}</>;
}

export default function CodeTranscript({ visibleLines, allLines, onLineClick, onConceptClick, onSeek }: CodeTranscriptProps) {
  const [hoveredLine, setHoveredLine] = useState<number | null>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const activeLine = visibleLines.length > 0 ? visibleLines[visibleLines.length - 1].line : -1;

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [visibleLines.length]);

  return (
    <div className="relative bg-gray-950/90 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/70" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
          <div className="w-3 h-3 rounded-full bg-green-500/70" />
          <span className="ml-3 text-white/50 text-xs font-mono">fibonacci.py</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-white/30 text-xs">{visibleLines.length} / {allLines.length} lines</span>
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
        </div>
      </div>

      {/* Code Area */}
      <div className="flex-1 overflow-y-auto font-mono text-sm">
        <div className="p-2">
          {visibleLines.map((line, idx) => {
            const isActive = line.line === activeLine;
            const isHovered = hoveredLine === line.line;
            const isLast = idx === visibleLines.length - 1;

            return (
              <motion.div
                key={line.line}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`relative flex group cursor-pointer rounded transition-all duration-150 ${
                  isActive ? 'bg-blue-500/20 border-l-2 border-blue-400' : 'border-l-2 border-transparent hover:bg-white/5 hover:border-white/20'
                }`}
                onClick={() => { onLineClick(line); onSeek(line.timestamp); }}
                onMouseEnter={() => setHoveredLine(line.line)}
                onMouseLeave={() => setHoveredLine(null)}
              >
                {/* Line Number */}
                <span className="select-none text-white/20 text-right pr-4 pl-3 py-0.5 min-w-[3rem] text-xs leading-6">
                  {line.line}
                </span>

                {/* Code Content */}
                <span className="py-0.5 pr-4 flex-1 leading-6 text-sm whitespace-pre">
                  {line.code === '' ? (
                    <span>&nbsp;</span>
                  ) : (
                    highlightConcepts(line.code, onConceptClick)
                  )}
                </span>

                {/* Ghost cursor on active line */}
                {isLast && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="absolute right-2 top-0.5 text-blue-400 leading-6"
                  >
                    |
                  </motion.span>
                )}

                {/* Hover tooltip */}
                {isHovered && line.instructorQuote && (
                  <div className="absolute left-full top-0 ml-2 z-50 w-64 bg-gray-900 border border-white/20 rounded-lg p-3 shadow-2xl pointer-events-none">
                    <div className="text-xs text-white/40 mb-1">💬 Instructor</div>
                    <p className="text-white/80 text-xs leading-relaxed">{line.instructorQuote}</p>
                    {line.diff && (
                      <div className="mt-2 text-green-400 text-xs font-mono">+{line.diff}</div>
                    )}
                    <div className="mt-1 text-white/30 text-xs">Click to jump to timestamp</div>
                  </div>
                )}
              </motion.div>
            );
          })}
          <div ref={endRef} />
        </div>
      </div>
    </div>
  );
}
