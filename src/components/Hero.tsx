import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ArrowRight, Sparkles, Terminal, Shield } from 'lucide-react';
import { personalInfo } from '../data';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const [typedText, setTypedText] = useState('');
  const [showCursor, setShowCursor] = useState(true);

  // Subheading typing effect animation
  useEffect(() => {
    const fullText = personalInfo.title;
    let index = 0;
    const typingInterval = setInterval(() => {
      setTypedText((prev) => prev + fullText.charAt(index));
      index++;
      if (index >= fullText.length) {
        clearInterval(typingInterval);
      }
    }, 60);

    const cursorInterval = setInterval(() => {
      setShowCursor((c) => !c);
    }, 500);

    return () => {
      clearInterval(typingInterval);
      clearInterval(cursorInterval);
    };
  }, []);

  // Parallax tracking for visual shape
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { damping: 50, stiffness: 300 });
  const springY = useSpring(mouseY, { damping: 50, stiffness: 300 });

  // Map mouse movement to coordinate shifts
  const rotateX = useTransform(springY, [-300, 300], [15, -15]);
  const rotateY = useTransform(springX, [-300, 300], [-15, 15]);
  const shapeTranslateX = useTransform(springX, [-300, 300], [-25, 25]);
  const shapeTranslateY = useTransform(springY, [-300, 300], [-25, 25]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      mouseX.set(e.clientX - centerX);
      mouseY.set(e.clientY - centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section 
      id="home"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-6 lg:px-16 overflow-hidden bg-transparent select-none"
    >
      {/* Decorative gradient glowing spots in the background */}
      <div className="absolute top-1/4 left-1/4 w-[250px] h-[250px] bg-violet-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Grid Content block */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
        
        {/* Left column: Bio, Typo, Actions */}
        <div className="lg:col-span-7 flex flex-col items-start text-left space-y-6">
          
          {/* Elite tag */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-xs font-semibold text-violet-400 tracking-wider font-mono uppercase"
          >
            <Sparkles className="h-3.5 w-3.5 text-violet-400 animate-pulse" />
            <span>Creative Design • Code Craftsman</span>
          </motion.div>

          {/* Staggered Heading letters */}
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-5xl sm:text-6xl xl:text-8xl font-black tracking-tight leading-[0.95] text-white"
            >
              Hi, I'm <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-purple-500 text-glow">
                Berramdane Nawel Meriem
              </span>
            </motion.h1>
          </div>

          {/* Animating Typing Subheading */}
          <div className="h-8 md:h-10 flex items-center">
            <p className="font-mono text-zinc-400 uppercase text-xs md:text-sm tracking-[0.25em] font-semibold">
              {typedText}
              <span className={`inline-block w-2 h-4 ml-1 bg-violet-500 ${showCursor ? 'opacity-100' : 'opacity-0'}`}></span>
            </p>
          </div>

          {/* Short Bio info text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-base text-zinc-400 font-sans max-w-lg leading-relaxed font-light"
          >
            {personalInfo.bio}
          </motion.p>

          {/* Call to action cluster buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            {/* View Work Button - Magnetic effect simulated via translate-x on active */}
            <button
              onClick={() => onNavigate('projects')}
              className="relative p-[1px] rounded-full overflow-hidden bg-gradient-to-r from-violet-500 to-purple-600 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)] group transition-all duration-300 cursor-pointer text-center"
            >
              <div className="px-7 py-3.5 rounded-full bg-zinc-950/90 text-white font-display text-sm tracking-wider font-semibold hover:bg-transparent transition-all duration-300 flex items-center justify-center space-x-2">
                <span>View My Work</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Contact Button */}
            <button
              onClick={() => onNavigate('contact')}
              className="px-7 py-3.5 rounded-full bg-white/5 hover:bg-white/10 text-zinc-300 hover:text-white font-display text-sm tracking-wider font-semibold border border-white/10 hover:border-white/20 transition-all duration-300 text-center cursor-pointer"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Micro telemetry indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
            transition={{ delay: 0.8 }}
            className="pt-6 flex items-center space-x-6 text-zinc-500 font-mono text-[10px] tracking-widest uppercase"
          >
            <span className="flex items-center space-x-1.5">
              <Terminal className="h-3 w-3" />
              <span>REACT 19 • TS</span>
            </span>
            <span>•</span>
            <span className="flex items-center space-x-1.5">
              <Shield className="h-3 w-3" />
              <span>SECURE PROTOCOL</span>
            </span>
          </motion.div>
        </div>

        {/* Right column: Interactive Futuristic Geometric Graphics Area */}
        <div className="lg:col-span-5 flex justify-center items-center relative aspect-square h-full w-full max-w-[420px] lg:max-w-none mx-auto">
          
          {/* Glass Card frame wrapping around geometric abstract space */}
          <motion.div 
            style={{ rotateX, rotateY }}
            className="relative w-full h-full glass-panel rounded-3xl border border-white/10 p-4 shadow-3xl shadow-black flex items-center justify-center overflow-hidden group/interactive-orb"
          >
            <div className="absolute inset-0 bg-noise opacity-[0.04]" />
            <div className="absolute inset-0 bg-gradient-to-tr from-violet-600/5 via-transparent to-purple-600/5" />

            {/* Glowing active center core */}
            <div className="absolute w-[180px] h-[180px] rounded-full bg-violet-600/10 blur-[40px] pointer-events-none group-hover/interactive-orb:scale-125 transition-transform duration-700" />

            {/* Dynamic Vector Orb Design */}
            <motion.div
              style={{ x: shapeTranslateX, y: shapeTranslateY }}
              className="relative w-[300px] h-[300px] flex items-center justify-center pointer-events-none"
            >
              {/* Spinning tech orbits */}
              <svg 
                viewBox="0 0 100 100" 
                className="absolute inset-0 w-full h-full text-violet-500/20 group-hover/interactive-orb:text-violet-500/40 transition-colors duration-500"
              >
                <motion.circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  strokeDasharray="4 6"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="30"
                  stroke="#A855F7"
                  strokeWidth="0.5"
                  strokeOpacity="0.3"
                  fill="none"
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="20"
                  stroke="#8B5CF6"
                  strokeWidth="1"
                  strokeDasharray="40 10"
                  fill="none"
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
                />
              </svg>

              {/* Central creative monogram or elegant emblem */}
              <div className="w-24 h-24 rounded-full border border-white/10 bg-zinc-950/80 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(139,92,246,0.15)] group-hover/interactive-orb:shadow-[0_0_40px_rgba(139,92,246,0.3)] transition-all duration-500 relative">
                
                {/* Floating inner geometric dots */}
                <span className="font-display font-bold text-4xl text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-purple-500 select-none">
                  MB
                </span>

                {/* Satellite small glowing nodes rotating */}
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '6s' }}>
                  <div className="absolute top-1 left-1.5 h-2 w-2 rounded-full bg-fuchsia-500 shadow-[0_0_6px_#D946EF]" />
                </div>
                <div className="absolute inset-0 animate-spin" style={{ animationDuration: '10s', animationDirection: 'reverse' }}>
                  <div className="absolute bottom-1 right-1.5 h-1.5 w-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#A78BFA]" />
                </div>
              </div>
            </motion.div>

            {/* Glowing technical parameters placed at cards boundary */}
            <div className="absolute bottom-4 left-6 font-mono text-[8px] text-zinc-500 uppercase tracking-widest">
              L_INDEX: ORBITAL_GRID
            </div>
            <div className="absolute bottom-4 right-6 font-mono text-[8px] text-zinc-500 tracking-widest font-semibold text-right">
              0x213F98A • MERIEM
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
