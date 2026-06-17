import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { skillsData } from '../data';
import { 
  Laptop, 
  Terminal, 
  Database, 
  Wrench, 
  Palette, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Skill } from '../types';

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Static definition of categories with metadata
  const categories = [
    { key: 'frontend', label: 'Frontend UI', icon: Laptop },
    { key: 'backend', label: 'Backend Server', icon: Terminal },
    { key: 'database', label: 'Databases & Cloud', icon: Database },
    { key: 'tools', label: 'Tools & DevOps', icon: Wrench },
    { key: 'design', label: 'Creative Design', icon: Palette },
    { key: 'modern', label: 'Modern Tech', icon: Sparkles },
    { key: 'programming', label: 'Programming', icon: Terminal }
  ];

  // Helper to obtain skills by category
  const getSkillsByCategory = (category: string) => {
    return skillsData.filter(skill => skill.category === category);
  };

  return (
    <section 
      id="skills"
      ref={sectionRef}
      className="relative min-h-screen py-24 px-6 lg:px-16 bg-[#0B0B0B]"
    >
      {/* Glow Ambient Spots */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-12 right-0 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Headings */}
        <div className="flex flex-col mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2">
            02 • EXPERTISE CORE
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            My Technologies & Skills
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        {/* Dynamic Multi-column Viewport Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {categories.map((cat) => {
            const CatIcon = cat.icon;
            const skills = getSkillsByCategory(cat.key);

            return (
              <motion.div
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                key={cat.key}
                className="glass-panel rounded-3xl border border-white/5 p-6 lg:p-8 flex flex-col justify-between relative group/card hover:border-violet-500/20 hover:shadow-2xl hover:shadow-violet-600/5 transition-all duration-400 overflow-hidden"
              >
                <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />
                
                {/* Visual Glow Core effect */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-violet-600/10 rounded-full blur-2xl group-hover/card:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  {/* Card Title Block */}
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="h-10 w-10 rounded-xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-400 transition-all duration-300 group-hover/card:scale-110">
                      <CatIcon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-bold text-white tracking-wide uppercase">
                        {cat.label}
                      </h3>
                      <p className="font-mono text-[9px] text-zinc-500 tracking-wider">
                        PRO LEVEL ARCHITECT
                      </p>
                    </div>
                  </div>

                  {/* Skills tags/badges - NO percentage bars, NO slider meters */}
                  <div className="flex flex-wrap gap-2.5">
                    {skills.map((skill: Skill) => {
                      return (
                        <div 
                          key={skill.name}
                          className="flex items-center space-x-2 px-3 py-1.5 rounded-xl bg-[#050505] hover:bg-zinc-950 border border-white/5 hover:border-violet-500/30 text-zinc-300 hover:text-white transition-all duration-300 pointer-events-none select-none"
                        >
                          <span className="h-1.5 w-1.5 rounded-full bg-violet-500 shadow-[0_0_6px_rgba(139,92,246,0.8)]" />
                          <span className="font-sans text-xs font-light tracking-wide">{skill.name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Minimalist interactive visual decoration at the base of card */}
                <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-between pointer-events-none">
                  <span className="font-mono text-[8.5px] text-zinc-650 tracking-wider">
                    MODULE STATUS: OK
                  </span>
                  <div className="flex items-center space-x-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-violet-500" />
                    <span className="font-mono text-[8.5px] text-zinc-500 tracking-wider font-semibold uppercase">
                      INTEGRATED
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </motion.div>

        {/* Aesthetic design accent */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.3 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center justify-center space-x-2 font-mono text-[10px] text-zinc-500 tracking-widest uppercase">
            <span>Constantly Evolving</span>
            <ChevronRight className="h-3 w-3 text-violet-500" />
            <span>Learning New Paradigms Each Year</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
