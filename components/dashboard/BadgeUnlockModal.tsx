// components/dashboard/BadgeUnlockModal.tsx
// Badge unlock animation with confetti

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { X } from 'lucide-react';
import type { Badge } from '@/lib/types/dashboard';

interface BadgeUnlockModalProps {
  badge: Badge | null;
  onClose: () => void;
}

export default function BadgeUnlockModal({ badge, onClose }: BadgeUnlockModalProps) {
  const [showConfetti, setShowConfetti] = useState(true);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    // Set window size for confetti
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });

    // Auto-close after 5 seconds
    if (badge) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setTimeout(onClose, 500); // Wait for fade out
      }, 5000);

      // Stop confetti after 3 seconds
      const confettiTimer = setTimeout(() => {
        setShowConfetti(false);
      }, 3000);

      return () => {
        clearTimeout(timer);
        clearTimeout(confettiTimer);
      };
    }
  }, [badge, onClose]);

  if (!badge) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4"
        data-testid="badge-unlock-modal"
      >
        {/* Confetti */}
        {showConfetti && (
          <Confetti
            width={windowSize.width}
            height={windowSize.height}
            recycle={false}
            numberOfPieces={200}
            gravity={0.3}
            data-testid="confetti-canvas"
          />
        )}

        {/* Modal content */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 180 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="bg-white rounded-2xl p-8 text-center max-w-md w-full shadow-2xl relative"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            data-testid="badge-modal-close"
            className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Fermer"
          >
            <X size={24} />
          </button>

          {/* Badge emoji/icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-7xl mb-6"
          >
            {badge.icon}
          </motion.div>

          {/* Badge unlocked message */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="font-heading font-bold text-3xl mb-3 text-slate-900"
          >
            Badge débloqué!
          </motion.h2>

          {/* Badge name */}
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-2xl text-amber-600 font-semibold mb-4"
          >
            {badge.badge_name}
          </motion.h3>

          {/* Badge description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-slate-600 text-lg mb-6"
          >
            {badge.description}
          </motion.p>

          {/* Awesome message */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-lg p-4"
          >
            <p className="text-amber-900 font-semibold text-lg">
              Fantastique! Continuez comme ça! 🎉
            </p>
          </motion.div>

          {/* Auto-close hint */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-xs text-slate-400 mt-4"
          >
            Fermeture automatique dans 5 secondes...
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
