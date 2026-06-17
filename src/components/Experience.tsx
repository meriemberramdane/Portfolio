import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { experienceData } from '../data';
import { 
  Briefcase, 
  Code, 
  GraduationCap, 
  Award, 
  Calendar, 
  Building2,
  CheckCircle2 
} from 'lucide-react';

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll activity over the timeline container for active path coloring
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end']
  });

  // Smooth out the progress reading
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Type resolver for aesthetic icons
  const iconResolver = (type: string) => {
    switch (type) {
      case 'freelance':
        return Briefcase;
      case 'academic-project':
        return Code;
      case 'certification':
        return Award;
      case 'education':
        return GraduationCap;
      default:
        return Briefcase;
    }
  };

  return (
    <section 
      id="experience"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 lg:px-16 bg-[#0B0B0B]"
    >
      {/* Visual Glowing spots */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Headings */}
        <div className="flex flex-col mb-20">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2">
            04 • HISTORIC TIMELINE
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Education & Journey
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        {/* Timeline structural body */}
        <div className="relative mt-12 pl-4 sm:pl-8 lg:pl-12 max-w-5xl mx-auto">
          
          {/* Base Background Vertical Line tube */}
          <div className="absolute left-0 sm:left-4 lg:left-8 top-2 bottom-2 w-[2px] bg-white/5 rounded-full" />

          {/* Active colored runner on scroll */}
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 sm:left-4 lg:left-8 top-2 bottom-2 w-[2px] bg-gradient-to-b from-violet-500 via-fuchsia-500 to-purple-500 rounded-full shadow-[0_0_10px_rgba(139,92,246,0.5)]"
          />

          {/* Sequential Timeline Nodes list */}
          <div className="space-y-12 sm:space-y-16">
            {experienceData.map((item, idx) => {
              const ItemIcon = iconResolver(item.type);
              
              return (
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  key={item.id}
                  className="relative pl-8 sm:pl-12 lg:pl-16 group/timeline"
                >
                  
                  {/* Floating Left Hub Node Icon */}
                  <div className="absolute left-[-15px] sm:left-[-1px] lg:left-[3px] top-1 h-8 w-8 rounded-full bg-[#111111] border border-white/10 group-hover/timeline:border-violet-500/50 flex items-center justify-center text-zinc-500 group-hover/timeline:text-violet-400 group-hover/timeline:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300 z-10">
                    <ItemIcon className="h-4 w-4" />
                  </div>

                  {/* Body Card panel */}
                  <div className="glass-panel rounded-3xl border border-white/5 p-6 sm:p-8 hover:border-violet-500/20 hover:shadow-2xl hover:shadow-violet-600/5 transition-all duration-400 relative overflow-hidden">
                    <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />
                    
                    {/* Floating top header parameters */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
                      
                      {/* Period calendar stamp */}
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-[10px] font-mono text-violet-400 tracking-wider font-semibold uppercase self-start sm:self-auto">
                        <Calendar className="h-3 w-3" />
                        <span>{item.period}</span>
                      </span>

                      {/* Micro coordinates parameters */}
                      <span className="font-mono text-[9px] text-zinc-500 tracking-widest hidden sm:block">
                        REG_ID // {item.id.toUpperCase()}
                      </span>
                    </div>

                    {/* Main items title */}
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-white tracking-tight group-hover/timeline:text-violet-400 transition-colors duration-200">
                      {item.title}
                    </h3>

                    {/* Organization metadata layout */}
                    <div className="flex items-center space-x-2 text-zinc-400 text-sm mt-2 mb-6">
                      <Building2 className="h-4 w-4 text-zinc-500 shrink-0" strokeWidth="1.5" />
                      <span className="font-sans font-medium">{item.organization}</span>
                    </div>

                    {/* Stagger bullets list */}
                    <ul className="space-y-3.5">
                      {item.description.map((bullet, b_idx) => (
                        <li key={b_idx} className="flex items-start space-x-3 text-zinc-400 text-[14px] leading-relaxed">
                          <CheckCircle2 className="h-4 w-4 text-violet-400 shrink-0 mt-0.5" strokeWidth="2.5" />
                          <span className="font-sans font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>

                  </div>

                </motion.div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
