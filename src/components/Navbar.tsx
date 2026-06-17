import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { personalInfo } from '../data';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Navigation Links
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Experience', id: 'experience' },
    { label: 'Services', id: 'services' },
    { label: 'Contact', id: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Calculate global scroll percentage
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(progress);

      // Scrolled state for navigation styling
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setIsMobileMenuOpen(false);
    onNavigate(id);
  };

  return (
    <>
      {/* Scroll Progress Tube */}
      <div className="fixed top-0 left-0 right-0 h-[3px] z-[60] bg-zinc-950 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-purple-500 shadow-[0_0_10px_#8B5CF6]" 
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Main Header Container */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-4 sm:px-8 flex justify-between items-center ${
          isScrolled ? 'pt-4 bg-transparent' : 'pt-6 bg-transparent'
        }`}
      >
        {/* Logo / Sigil */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2 cursor-pointer group"
          onClick={() => handleItemClick('home')}
        >
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-violet-600 to-purple-600 flex items-center justify-center font-display font-bold text-white text-base shadow-[0_0_15px_rgba(139,92,246,0.3)] group-hover:scale-105 transition-all duration-300">
            M
          </div>
          <span className="font-display font-medium text-sm tracking-widest text-white group-hover:text-violet-400 transition-colors duration-300 hidden sm:block">
            MERIEM.B
          </span>
        </motion.div>

        {/* Desktop Navigation Glass Pill Container */}
        <motion.nav
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center space-x-1 glass-panel px-5 py-2 rounded-full border border-white/5 shadow-2xl shadow-black/80"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className="relative px-4 py-1.5 rounded-full font-sans text-[12px] font-medium tracking-wide transition-colors duration-300 cursor-pointer"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="desktop-active-pill"
                    className="absolute inset-0 bg-violet-600/10 border border-violet-500/20 shadow-[0_0_15px_rgba(139,92,246,0.1)]"
                    style={{ borderRadius: 9999 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 transition-colors duration-300 ${
                  isActive ? 'text-violet-400 font-semibold' : 'text-zinc-400 hover:text-white'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </motion.nav>

        {/* CTA Actions */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden md:flex items-center space-x-4"
        >
          <button
            onClick={() => handleItemClick('contact')}
            className="flex items-center space-x-1.5 font-display text-xs tracking-wider uppercase font-semibold text-white px-5 py-2.5 rounded-full bg-white/5 hover:bg-violet-600 border border-white/10 hover:border-violet-500/50 shadow-md group transition-all duration-300 cursor-pointer "
          >
            <span>Let's talk</span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300" />
          </button>
        </motion.div>

        {/* Mobile Hamburger Trigger Toggle Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-full bg-zinc-900/80 border border-white/5 text-white active:scale-95 transition-transform duration-200 cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Drawer Screen */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 md:hidden flex flex-col bg-[#050505]/95 backdrop-blur-2xl px-6 pt-24 pb-12 select-none"
          >
            {/* Grid Pattern Element for background inside mobile drawer */}
            <div className="absolute inset-0 bg-noise pointer-events-none opacity-5" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[80px]" />

            <div className="flex flex-col space-y-3 justify-center items-center my-auto">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.button
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className="relative w-full text-center py-3.5 rounded-xl font-display text-xl font-medium tracking-wide transition-colors"
                  >
                    {isActive && (
                      <div className="absolute inset-0 bg-violet-600/10 border border-violet-500/20 rounded-xl" />
                    )}
                    <span className={isActive ? 'text-violet-400 font-bold' : 'text-zinc-400'}>
                      {item.label}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
              className="mt-auto flex flex-col items-center space-y-4"
            >
              <div className="h-[1px] w-24 bg-white/10" />
              <p className="font-mono text-[10px] text-zinc-500">{personalInfo.email}</p>
              <p className="font-mono text-[10px] text-zinc-600">ALGERIA</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
