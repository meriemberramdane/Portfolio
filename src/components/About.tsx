import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Award, MapPin, GraduationCap, Download, CheckCircle, Sparkles } from 'lucide-react';
import { personalInfo } from '../data';

// Custom lightweight counter hook for premium numeric counts
function AnimatingCounter({ value, duration = 1.5 }: { value: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const totalFrames = Math.round(duration * 60); // Assuming 60fps
    let frame = 0;

    const counter = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      // Ease out quad formula for luxury deceleration style
      const current = Math.round(end * (1 - (1 - progress) * (1 - progress)));
      setCount(current);

      if (frame >= totalFrames) {
        clearInterval(counter);
        setCount(end); // Force final accuracy
      }
    }, 1000 / 60);

    return () => clearInterval(counter);
  }, [isInView, value, duration]);

  return <span ref={elementRef}>{count}</span>;
}

export default function About() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section 
      id="about"
      ref={containerRef}
      className="relative min-h-screen py-24 px-6 lg:px-16 flex items-center bg-transparent"
    >
      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Section Heading Tagline */}
        <div className="flex flex-col mb-16">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 0.5, y: 0 }}
            viewport={{ once: true }}
            className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2"
          >
            01 • INTROSPECTIVE
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight"
          >
            About Me
          </motion.h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Paragraph explanation & Resume triggers */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-8 glass-panel rounded-3xl border border-white/5 p-8 lg:p-10 relative">
            <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_8px_#8B5CF6]" />
                <h3 className="font-display text-lg font-bold tracking-wider text-zinc-300 uppercase">
                  Biographical Profile
                </h3>
              </div>
              
              <h4 className="font-display text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
                I am {personalInfo.name}
              </h4>
              <p className="font-mono text-xs text-violet-400 tracking-wider font-semibold uppercase mb-4">
                {personalInfo.title}
              </p>
              
              <p className="text-zinc-400 font-sans leading-relaxed text-[15px] font-light">
                {personalInfo.aboutDescription}
              </p>

              {/* Information metrics slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-white/5">
                <div className="flex items-center space-x-3 text-zinc-400">
                  <MapPin className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="font-sans text-[13px]">Location: <strong className="text-white font-medium">{personalInfo.location}</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <GraduationCap className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="font-sans text-[13px]">Degree: <strong className="text-white font-medium">Computer Science</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Award className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="font-sans text-[13px]">Specialization: <strong className="text-white font-medium">Design & Logic</strong></span>
                </div>
                <div className="flex items-center space-x-3 text-zinc-400">
                  <Sparkles className="h-4 w-4 text-violet-400 shrink-0" />
                  <span className="font-sans text-[13px]">Interests: <strong className="text-white font-medium">High Interaction Web</strong></span>
                </div>
              </div>
            </div>

          </div>

          {/* Right column: Stat grids bento block */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-4">
            
            {/* Bento block: projects count */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col justify-between relative group/stat hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-noise opacity-[0.02] rounded-3xl pointer-events-none" />
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/10 mb-4 group-hover/stat:scale-105 transition-transform">
                <Sparkles className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-4xl lg:text-5xl font-black text-white tracking-tight">
                  <AnimatingCounter value={10} />+
                </h5>
                <p className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Projects Developed
                </p>
              </div>
            </div>

            {/* Bento block: react skill */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col justify-between relative group/stat hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-noise opacity-[0.02] rounded-3xl pointer-events-none" />
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/10 mb-4 group-hover/stat:scale-105 transition-transform">
                <GraduationCap className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-xl lg:text-2xl font-black text-white tracking-tight line-clamp-1 leading-none pt-2">
                  React Developer
                </h5>
                <p className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Tech Core focus
                </p>
              </div>
            </div>

            {/* Bento block: creative design */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col justify-between relative group/stat hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-noise opacity-[0.02] rounded-3xl pointer-events-none" />
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/10 mb-4 group-hover/stat:scale-105 transition-transform">
                <Award className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-xl lg:text-2xl font-black text-white tracking-tight line-clamp-1 leading-none pt-2">
                  Creative UI Art
                </h5>
                <p className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Aesthetic layout
                </p>
              </div>
            </div>

            {/* Bento block: problem solver */}
            <div className="glass-panel rounded-3xl border border-white/5 p-6 flex flex-col justify-between relative group/stat hover:border-violet-500/20 transition-all duration-300">
              <div className="absolute inset-0 bg-noise opacity-[0.02] rounded-3xl pointer-events-none" />
              <div className="h-8 w-8 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 border border-violet-500/10 mb-4 group-hover/stat:scale-105 transition-transform">
                <CheckCircle className="h-4 w-4" />
              </div>
              <div className="space-y-1">
                <h5 className="font-display text-xl lg:text-2xl font-black text-white tracking-tight line-clamp-1 leading-none pt-2">
                  Problem Solver
                </h5>
                <p className="font-sans text-[11px] font-semibold text-zinc-400 uppercase tracking-widest leading-relaxed">
                  Heuristic code
                </p>
              </div>
            </div>

            {/* Wide layout card inside bento grid */}
            <div className="col-span-2 glass-panel rounded-3xl border border-white/5 p-6 relative flex items-center space-x-4">
              <div className="absolute inset-0 bg-noise opacity-[0.01] rounded-3xl pointer-events-none" />
              <div className="h-10 w-10 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center shrink-0">
                <GraduationCap className="h-5 w-5 text-violet-400 animate-pulse" />
              </div>
              <div>
                <p className="font-mono text-[9px] tracking-widest text-violet-400 uppercase font-semibold">
                  Philosophy Pillar
                </p>
                <h6 className="font-display text-xs md:text-sm text-zinc-300 font-medium tracking-tight mt-0.5">
                  "Thoughtful visual graphics are of no value if the supporting system is sluggish, and robust logic is hollow if the presentation repels."
                </h6>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
