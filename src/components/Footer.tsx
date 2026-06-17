import { motion } from 'motion/react';
import { ArrowUp, Sparkles, Github, Linkedin, Instagram } from 'lucide-react';
import { personalInfo } from '../data';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const handleScrollToTop = () => {
    onNavigate('home');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer-section" className="relative bg-[#050505] border-t border-white/5 py-16 px-6 lg:px-16 overflow-hidden">
      {/* Glow highlight */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[100px] bg-violet-600/5 rounded-full blur-[50px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10 flex flex-col items-center">
        
        {/* Core row elements */}
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-10 items-center justify-between pb-12 border-b border-white/5">
          
          {/* Logo signature column */}
          <div className="flex flex-col items-center md:items-start space-y-3 text-center md:text-left">
            <div 
              onClick={() => onNavigate('home')}
              className="flex items-center space-x-2.5 cursor-pointer group"
            >
              <div className="h-8.5 w-8.5 rounded-full bg-gradient-to-tr from-violet-600 to-purple-600 flex items-center justify-center font-display font-black text-white text-sm shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-all duration-300">
                M
              </div>
              <span className="font-display font-medium text-xs tracking-widest text-white group-hover:text-violet-400 transition-colors">
                MERIEM.B
              </span>
            </div>
            <p className="text-zinc-500 font-sans text-xs font-light max-w-xs leading-relaxed">
              Merging modular systems architecture with beautiful emotional interface design.
            </p>
          </div>

          {/* Social networks in the middle column */}
          <div className="flex items-center justify-center space-x-3.5">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-zinc-950 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer"
              title="GitHub Profile"
            >
              <Github className="h-4.5 w-4.5" />
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-zinc-950 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer"
              title="LinkedIn Profile"
            >
              <Linkedin className="h-4.5 w-4.5" />
            </a>
            <a
              href={personalInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 rounded-full bg-zinc-950 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer"
              title="Instagram Profile"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
          </div>

          {/* Upward Scroll gate */}
          <div className="flex flex-col items-center md:items-end justify-center">
            <button
              onClick={handleScrollToTop}
              className="group/up h-11 w-11 rounded-full bg-zinc-950 hover:bg-violet-600 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 cursor-pointer"
              aria-label="Back to top"
            >
              <ArrowUp className="h-4.5 w-4.5 group-hover/up:-translate-y-1 transition-transform duration-300" />
            </button>
            <span className="font-mono text-[8px] text-zinc-500 tracking-widest uppercase mt-2 select-none">
              BACK TO INDEX
            </span>
          </div>

        </div>

        {/* Lower row: Copyright logs & System details */}
        <div className="w-full pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[10px] text-zinc-650">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-left text-zinc-600 select-none">
            <span>© {currentYear} MERIEM BERRAMDANE • ALL RIGHTS RESERVED</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center space-x-1">
              <Sparkles className="h-3 w-3 text-violet-500/50" />
              <span>CRAFTED IN ALGERIA</span>
            </span>
          </div>

          <div className="text-zinc-600 text-center sm:text-right select-none uppercase tracking-widest hidden md:block">
            DEPLOY_BUILD: v4.19 • SECURE PROTOCOL CHANNELS
          </div>
        </div>

      </div>
    </footer>
  );
}
