import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// Components
import Preloader from './components/Preloader';
import BackgroundGrid from './components/BackgroundGrid';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [isPreloaderFinished, setIsPreloaderFinished] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Trigger high-end window scroll watcher to highlight active section in Navbar
  useEffect(() => {
    if (!isPreloaderFinished) return;

    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'services', 'contact'];
    
    const handleViewportScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45; // Sweet focal point offset

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;

          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleViewportScroll);
    // Initial call to set correctly on spawn
    handleViewportScroll();

    return () => window.removeEventListener('scroll', handleViewportScroll);
  }, [isPreloaderFinished]);

  // Smooth scroll router to target elements
  const handleSectionNavigation = (sectionId: string) => {
    const targetElement = document.getElementById(sectionId);
    if (!targetElement) return;

    // Direct scroll logic with smooth behavior
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
    
    // Set immediate state for snappier UI visual responses
    setActiveSection(sectionId);
  };

  return (
    <div id="creative-portfolio-root" className="relative min-h-screen bg-[#050505] selection:bg-violet-600/30 selection:text-white">
      
      {/* 1. Breathtaking intro preloader Gate */}
      <Preloader onComplete={() => setIsPreloaderFinished(true)} />

      {/* 2. Full visual interface loaded post-loader */}
      <AnimatePresence>
        {isPreloaderFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="w-full relative"
          >
            {/* Elegant Global FX components */}
            <BackgroundGrid />
            <CustomCursor />
            <Navbar activeSection={activeSection} onNavigate={handleSectionNavigation} />

            {/* Main Content scrollable regions */}
            <main className="w-full relative overflow-hidden">
              <Hero onNavigate={handleSectionNavigation} />
              <About />
              <Skills />
              <Projects />
              <Experience />
              <Services />
              <Contact />
            </main>

            {/* Seamless Visual Footer block */}
            <Footer onNavigate={handleSectionNavigation} />
          </motion.div>
        )}
      </AnimatePresence>
      
    </div>
  );
}
