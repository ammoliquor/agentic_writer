'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Concept, Annotation, Challenge } from '@/data/tutorialData';
import ConceptRadiance from './ConceptRadiance';
import ChallengeMode from './ChallengeMode';
import CommunityAnnotations from './CommunityAnnotations';
import VoiceNavigator from './VoiceNavigator';

interface InfoPanelProps {
  activeConcept: Concept | null;
  onConceptClose: () => void;
  annotations: Annotation[];
  challenges: Challenge[];
  currentTime: number;
  onSeek: (time: number) => void;
  highlightAnnotationId?: string | null;
}

type Tab = 'concept' | 'challenges' | 'annotations' | 'search';

export default function InfoPanel({ activeConcept, onConceptClose, annotations, challenges, currentTime, onSeek, highlightAnnotationId }: InfoPanelProps) {
  const [tab, setTab] = useState<Tab>('concept');

  const effectiveTab = activeConcept && tab !== 'concept' ? 'concept' : tab;

  const tabs: { id: Tab; label: string; icon: string }[] = [
    { id: 'concept', label: 'Concept', icon: '⚡' },
    { id: 'challenges', label: 'Challenges', icon: '🎯' },
    { id: 'annotations', label: 'Notes', icon: '💬' },
    { id: 'search', label: 'Search', icon: '🔍' },
  ];

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden flex flex-col h-full">
      {/* Tab Bar */}
      <div className="flex border-b border-white/10">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 py-2.5 text-xs font-medium transition-all relative ${
              effectiveTab === t.id
                ? 'text-white bg-white/5'
                : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
            }`}
          >
            <span className="mr-1">{t.icon}</span>
            <span className="hidden sm:inline">{t.label}</span>
            {effectiveTab === t.id && (
              <motion.div
                layoutId="tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400"
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={effectiveTab}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.15 }}
          >
            {effectiveTab === 'concept' && (
              <div>
                {activeConcept ? (
                  <ConceptRadiance concept={activeConcept} onClose={onConceptClose} />
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-3">⚡</div>
                    <p className="text-white/40 text-sm">Click a <span className="text-yellow-400 animate-pulse">glowing term</span> in the code to learn more</p>
                    <div className="mt-4 flex flex-wrap gap-2 justify-center">
                      {['lru_cache', 'memoization', 'recursion', 'decorator', 'functools'].map(term => (
                        <span key={term} className="text-xs px-2 py-1 bg-white/5 rounded text-yellow-400/70 border border-yellow-400/20 animate-pulse">
                          {term}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
            {effectiveTab === 'challenges' && (
              <ChallengeMode challenges={challenges} />
            )}
            {effectiveTab === 'annotations' && (
              <CommunityAnnotations
                annotations={annotations}
                currentTime={currentTime}
                onSeek={onSeek}
                highlightId={highlightAnnotationId}
              />
            )}
            {effectiveTab === 'search' && (
              <VoiceNavigator onSeek={onSeek} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fork & Tinker button */}
      <div className="p-3 border-t border-white/10">
        <a
          href="https://replit.com"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full py-2.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 hover:from-orange-500/30 hover:to-red-500/30 border border-orange-400/20 hover:border-orange-400/40 rounded-lg text-orange-300 hover:text-orange-200 text-sm font-medium transition-all group"
          title="Open this code in Replit to run and tinker with it"
        >
          <span className="text-base">🍴</span>
          Fork &amp; Tinker on Replit
          <svg className="w-3 h-3 opacity-50 group-hover:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>
    </div>
  );
}
