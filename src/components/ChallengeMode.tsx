'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Challenge } from '@/data/tutorialData';

interface ChallengeModeProps {
  challenges: Challenge[];
}

export default function ChallengeMode({ challenges }: ChallengeModeProps) {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [userCode, setUserCode] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const openChallenge = (challenge: Challenge) => {
    setActiveChallenge(challenge);
    setUserCode(challenge.starterCode);
    setShowHint(false);
    setSubmitted(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">🎯</span>
        <h3 className="text-white font-semibold">Challenges</h3>
        <span className="ml-auto text-xs text-white/40">{challenges.length} available</span>
      </div>

      {/* Challenge List */}
      <div className="space-y-2">
        {challenges.map((challenge, idx) => (
          <motion.button
            key={challenge.id}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => openChallenge(challenge)}
            className="w-full text-left p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-400/40 rounded-lg transition-all group"
          >
            <div className="flex items-start gap-2">
              <span className="text-purple-400 text-xs font-bold mt-0.5">#{idx + 1}</span>
              <div>
                <p className="text-white text-sm font-medium group-hover:text-purple-300 transition-colors">{challenge.title}</p>
                <p className="text-white/40 text-xs mt-0.5 line-clamp-2">{challenge.description}</p>
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Active Challenge Modal */}
      <AnimatePresence>
        {activeChallenge && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={(e) => e.target === e.currentTarget && setActiveChallenge(null)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-gray-900 border border-white/20 rounded-xl p-6 w-full max-w-2xl shadow-2xl"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <span className="text-purple-400 text-xs font-bold uppercase tracking-wider">Challenge</span>
                  <h3 className="text-white text-lg font-semibold mt-1">{activeChallenge.title}</h3>
                  <p className="text-white/60 text-sm mt-1">{activeChallenge.description}</p>
                </div>
                <button onClick={() => setActiveChallenge(null)} className="text-white/40 hover:text-white transition-colors text-xl ml-4">✕</button>
              </div>

              {/* Code Editor */}
              <div className="relative mb-3">
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  className="w-full h-48 bg-black/60 border border-white/10 rounded-lg p-4 text-green-400 font-mono text-sm resize-none focus:outline-none focus:border-purple-400/50"
                  spellCheck={false}
                />
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSubmitted(true)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm rounded-lg transition-colors font-medium"
                >
                  Submit Solution
                </motion.button>
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-colors"
                >
                  {showHint ? 'Hide' : 'Show'} Hint
                </button>
                <button
                  onClick={() => setUserCode(activeChallenge.starterCode)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white/70 text-sm rounded-lg transition-colors"
                >
                  Reset
                </button>
              </div>

              <AnimatePresence>
                {showHint && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-yellow-400/10 border border-yellow-400/20 rounded-lg"
                  >
                    <p className="text-yellow-300 text-sm">💡 {activeChallenge.hint}</p>
                  </motion.div>
                )}
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 p-3 bg-green-400/10 border border-green-400/20 rounded-lg"
                  >
                    <p className="text-green-300 text-sm">✅ Great attempt! In a full implementation, your code would be evaluated here. Keep practicing!</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
