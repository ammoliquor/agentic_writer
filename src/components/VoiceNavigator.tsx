'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TUTORIAL_CODE_TIMELINE } from '@/data/tutorialData';

interface VoiceNavigatorProps {
  onSeek: (time: number) => void;
}

const SEARCH_RESPONSES: Record<string, { time: number; message: string }> = {
  "recursion": { time: 120, message: "Found: Recursive call at 2:00" },
  "memoization": { time: 45, message: "Found: @lru_cache decorator (memoization) at 0:45" },
  "lru_cache": { time: 45, message: "Found: lru_cache introduced at 0:45" },
  "base case": { time: 90, message: "Found: Base case condition at 1:30" },
  "import": { time: 15, message: "Found: import statement at 0:15" },
  "cache info": { time: 240, message: "Found: cache_info() call at 4:00" },
  "iterative": { time: 285, message: "Found: Iterative version at 4:45" },
  "fibonacci": { time: 60, message: "Found: fibonacci function definition at 1:00" },
  "decorator": { time: 45, message: "Found: @lru_cache decorator at 0:45" },
};

export default function VoiceNavigator({ onSeek }: VoiceNavigatorProps) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<{ time: number; message: string } | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsSearching(true);
    setResult(null);

    await new Promise(r => setTimeout(r, 600));

    const lowerQuery = query.toLowerCase();
    let found: { time: number; message: string } | null = null;
    
    for (const [key, val] of Object.entries(SEARCH_RESPONSES)) {
      if (lowerQuery.includes(key)) {
        found = val;
        break;
      }
    }

    if (!found) {
      const match = TUTORIAL_CODE_TIMELINE.find(line => 
        line.code.toLowerCase().includes(lowerQuery)
      );
      if (match) {
        found = { time: match.timestamp, message: `Found match in code at ${Math.floor(match.timestamp / 60)}:${(match.timestamp % 60).toString().padStart(2, '0')}` };
      }
    }

    if (!found) {
      found = { time: 0, message: "No exact match found. Try: 'recursion', 'memoization', 'base case', 'iterative'" };
    }

    setResult(found);
    setIsSearching(false);
    if (found.time > 0) onSeek(found.time);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎙️</span>
        <h3 className="text-white font-semibold">Voice Navigator</h3>
      </div>

      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='e.g. "Show me where she explained recursion"'
          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm placeholder-white/30 focus:outline-none focus:border-blue-400/50 transition-all pr-12"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-white/50 hover:text-white transition-colors disabled:opacity-50"
        >
          {isSearching ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full"
            />
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          )}
        </button>
      </div>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className={`p-3 rounded-lg border text-sm ${result.time > 0 ? 'bg-blue-400/10 border-blue-400/20 text-blue-300' : 'bg-white/5 border-white/10 text-white/50'}`}
          >
            {result.time > 0 && <span className="mr-2">🎯</span>}
            {result.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick suggestions */}
      <div className="flex flex-wrap gap-1.5">
        {['recursion', 'memoization', 'base case', 'iterative'].map(suggestion => (
          <button
            key={suggestion}
            onClick={() => { setQuery(suggestion); }}
            className="text-xs px-2 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded text-white/50 hover:text-white/70 transition-all"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
