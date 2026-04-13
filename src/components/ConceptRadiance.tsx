'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Concept } from '@/data/tutorialData';

interface ConceptRadianceProps {
  concept: Concept | null;
  onClose: () => void;
}

const colorMap: Record<string, string> = {
  yellow: 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10',
  blue: 'text-blue-400 border-blue-400/30 bg-blue-400/10',
  purple: 'text-purple-400 border-purple-400/30 bg-purple-400/10',
  green: 'text-green-400 border-green-400/30 bg-green-400/10',
  orange: 'text-orange-400 border-orange-400/30 bg-orange-400/10',
};

export default function ConceptRadiance({ concept, onClose }: ConceptRadianceProps) {
  return (
    <AnimatePresence>
      {concept && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-xl p-5 shadow-2xl"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <span className={`text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded border ${colorMap[concept.color] || colorMap.yellow}`}>
                {concept.term}
              </span>
              <p className="text-white/60 text-sm mt-1">{concept.shortDesc}</p>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors text-lg leading-none ml-3">✕</button>
          </div>

          <p className="text-white/80 text-sm leading-relaxed mb-4">{concept.fullDesc}</p>

          {/* Code Examples */}
          <div className="space-y-2 mb-4">
            <p className="text-white/50 text-xs uppercase tracking-wider">Examples</p>
            {concept.examples.map((ex, i) => (
              <pre key={i} className="bg-black/50 border border-white/10 rounded-lg p-3 text-green-400 text-xs overflow-x-auto">
                <code>{ex}</code>
              </pre>
            ))}
          </div>

          <a
            href={concept.docsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-blue-400 hover:text-blue-300 text-sm transition-colors"
          >
            📖 View Documentation
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
