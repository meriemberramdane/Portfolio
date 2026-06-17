import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Elegant, varying acceleration timer
    let count = 0;
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 8) + 2; // Random speed steps
      count = Math.min(count + increment, 100);
      setProgress(count);

      if (count >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsLoaded(true);
          setTimeout(onComplete, 800); // Allow exit motion to play fully
        }, 500);
      }
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  // Letters of Meriem's branding
  const brandingLetters = ["M", "E", "R", "I", "E", "M"];

  return (
    <AnimatePresence>
      {!isLoaded && (
        <motion.div
          id="visual-preloader-curtain"
          initial={{ opacity: 1 }}
          exit={{ 
            y: '-100%',
            opacity: 0,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505] font-sans overflow-hidden select-none"
        >
          {/* Subtle Glow backdrop */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-violet-600/10 rounded-full blur-[80px]" />

          <div className="relative flex flex-col items-center">
            {/* Minimal SVG Graphic Ornament */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="mb-8"
            >
              <svg width="48" height="48" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <motion.path
                  d="M10 90L50 10L90 90"
                  stroke="#8B5CF6"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.5, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M30 60H70"
                  stroke="#A855F7"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
                />
              </svg>
            </motion.div>

            {/* Staggered Branding Letters */}
            <div className="flex space-x-1.5 mb-2 overflow-hidden">
              {brandingLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: 55, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: [0.215, 0.61, 0.355, 1],
                  }}
                  className="font-display text-2xl lg:text-3xl font-bold tracking-widest text-white"
                >
                  {char}
                </motion.span>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ delay: 0.7 }}
              className="font-mono text-[10px] tracking-widest text-[#A1A1AA] uppercase mb-12"
            >
              Portfolio Portfolio
            </motion.p>

            {/* Premium Digital Percentage Metric */}
            <div className="relative flex items-baseline justify-center font-mono text-gray-500">
              <motion.span 
                className="text-6xl md:text-7xl font-bold text-white tracking-tighter"
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {progress.toString().padStart(3, '0')}
              </motion.span>
              <span className="text-xl font-medium text-violet-500 ml-1">%</span>
            </div>

            {/* Progress linear runner */}
            <div className="w-[180px] h-[2px] bg-white/5 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-violet-500 to-purple-500"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>
          </div>

          <div className="absolute bottom-8 font-mono text-[9px] tracking-widest text-zinc-600">
            CREATIVE DESIGN & CODE • ORGANS OF THE IMAGINATION
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
