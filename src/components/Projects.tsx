import { useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { projectsData } from '../data';
import { ExternalLink, Github, Sparkles } from 'lucide-react';
import { Project } from '../types';

export default function Projects() {
  const scrollRef = useRef(null);

  const filteredProjects = projectsData;

  return (
    <section 
      id="projects"
      ref={scrollRef}
      className="relative min-h-screen py-24 px-6 lg:px-16 bg-[#050505]"
    >
      {/* Absolute Ambient Decor */}
      <div className="absolute top-1/4 right-0 w-[350px] h-[350px] bg-purple-600/5 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Headings */}
        <div className="flex flex-col mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2">
            03 • WORK GALLERY
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Projects I've Built
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        {/* Grid project cards container with entry motion animation */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project: Project, idx) => {
              return (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 35 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 20 }}
                  transition={{ duration: 0.6, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
                  key={project.id}
                  className="group/proj flex flex-col justify-between bg-[#111111]/50 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden hover:border-violet-500/30 shadow-2xl transition-all duration-500 relative"
                >
                  <div className="absolute inset-0 bg-noise opacity-[0.02] rounded-3xl pointer-events-none" />

                  {/* Core Card visual: Image viewport with overlay & interactive indicator */}
                  <div className="relative aspect-video w-full overflow-hidden bg-zinc-950 border-b border-white/5">
                    
                    {/* Glowing active banner placeholder overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/30 to-transparent z-10" />
                    
                    {/* Hover micro zoom and image opacity blend */}
                    <img
                      src={project.image}
                      alt={project.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover/proj:scale-[1.04] transition-transform duration-700 select-none grayscale-[40%] group-hover/proj:grayscale-0 opacity-80 group-hover/proj:opacity-100"
                    />

                    {/* Interactive Live Preview Indicator Pill floating inside */}
                    <div className="absolute top-4 left-4 z-20 flex space-x-2">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/75 border border-white/10 text-[9px] tracking-widest font-mono text-zinc-300 uppercase">
                        <span className="h-1.5 w-1.5 rounded-full bg-violet-500 animate-ping" />
                        <span>ACTIVE SCHEMATIC</span>
                      </span>
                    </div>

                    <div className="absolute top-4 right-4 z-20">
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-900/60 border border-violet-500/30 text-[9px] tracking-widest font-mono text-violet-300 uppercase font-semibold">
                        {project.category.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Core Card Details Content Area */}
                  <div className="p-6 lg:p-8 flex-1 flex flex-col justify-between">
                    <div className="space-y-4">
                      
                      {/* Projects label tag */}
                      <div className="flex items-center space-x-2 text-violet-400 font-mono text-[9px] tracking-widest font-semibold uppercase">
                        <Sparkles className="h-3 w-3" />
                        <span>PROJECT • {project.id.toUpperCase()}</span>
                      </div>

                      {/* Main project title info */}
                      <h3 className="font-display text-2xl font-bold text-white tracking-tight group-hover/proj:text-violet-400 transition-colors duration-300">
                        {project.title}
                      </h3>

                      {/* Descriptive body */}
                      <p className="text-zinc-400 font-sans text-sm leading-relaxed font-light line-clamp-3">
                        {project.description}
                      </p>

                      {/* Tech Chips */}
                      <div className="flex flex-wrap gap-1.5 pt-4">
                        {project.technologies.map(tech => (
                          <span 
                            key={tech} 
                            className="text-[10px] font-mono font-medium text-zinc-500 bg-zinc-950 px-2.5 py-1 rounded-full border border-white/5 group-hover/proj:border-violet-500/10 transition-colors"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                    </div>

                    {/* Actions panel */}
                    <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
                      
                      {/* GitHub Link if exists */}
                      <div className="flex items-center space-x-4">
                        {project.githubUrl && (
                          <a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-zinc-950 hover:bg-violet-600 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer"
                            title="GitHub Repository"
                          >
                            <Github className="h-4 w-4" />
                          </a>
                        )}

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-full bg-zinc-950 hover:bg-violet-600 border border-white/5 hover:border-violet-500/30 text-zinc-400 hover:text-white transition-all duration-300 cursor-pointer"
                            title="Live Prototype"
                          >
                            <ExternalLink className="h-4 w-4" />
                          </a>
                        )}
                      </div>

                      {/* Fake design telemetry metrics for premium UI polish */}
                      <span className="font-mono text-[9px] text-zinc-600 tracking-wider">
                        PORTFOLIO-ID // {idx.toString().padStart(2, '0')}
                      </span>

                    </div>
                  </div>

                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {/* Informative block */}
        <div className="mt-16 text-center text-zinc-500 font-sans text-xs">
          Want a highly specific specialized bespoke full-stack custom software?{' '}
          <button 
            onClick={() => {
              const contactSection = document.getElementById('contact');
              if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
            }}
            className="text-violet-400 hover:text-violet-300 hover:underline font-semibold cursor-pointer"
          >
            Express your requirements
          </button>
        </div>

      </div>
    </section>
  );
}
