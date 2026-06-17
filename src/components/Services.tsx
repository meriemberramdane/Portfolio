import { motion } from 'motion/react';
import { servicesData } from '../data';
import { 
  Globe, 
  Palette, 
  Laptop, 
  Cpu, 
  Check
} from 'lucide-react';
import { ServiceItem } from '../types';

export default function Services() {
  // Dynamic Icon Resolver mapping servicesData iconName references safely
  const iconResolver = (iconName: string) => {
    switch (iconName) {
      case 'Globe':
        return Globe;
      case 'Palette':
        return Palette;
      case 'Laptop':
        return Laptop;
      case 'Cpu':
        return Cpu;
      default:
        return Globe;
    }
  };

  return (
    <section 
      id="services"
      className="relative min-h-screen py-24 px-6 lg:px-16 bg-[#050505]"
    >
      {/* Visual Accent */}
      <div className="absolute top-1/2 right-12 w-[350px] h-[350px] bg-violet-600/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-4 left-1/3 w-[300px] h-[300px] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full z-10">
        
        {/* Headings */}
        <div className="flex flex-col mb-16">
          <p className="font-mono text-xs tracking-[0.25em] text-violet-400 font-semibold uppercase mb-2">
            05 • BESPOKE UTILITIES
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
            Offered Services
          </h2>
          <div className="h-[2px] w-12 bg-gradient-to-r from-violet-500 to-transparent mt-4" />
        </div>

        {/* Services Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {servicesData.map((item: ServiceItem, idx) => {
            const ServiceIcon = iconResolver(item.iconName);
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.05 }}
                key={item.id}
                className="group/service glass-panel rounded-3xl border border-white/5 p-8 hover:border-violet-500/25 hover:shadow-2xl hover:shadow-violet-600/5 transition-all duration-400 relative overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute inset-0 bg-noise opacity-[0.03] rounded-3xl pointer-events-none" />
                
                {/* Visual Glow Spotlight inside service cards on hover */}
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-violet-600/10 rounded-full blur-2xl group-hover/service:scale-125 transition-transform duration-700 pointer-events-none" />

                <div>
                  {/* Icon Block */}
                  <div className="h-12 w-12 rounded-2xl bg-zinc-950 flex items-center justify-center border border-white/5 text-violet-400 group-hover/service:scale-110 group-hover/service:bg-violet-600 group-hover/service:text-white transition-all duration-300">
                    <ServiceIcon className="h-5 w-5" />
                  </div>

                  {/* Header Title */}
                  <h3 className="font-display text-xl md:text-2xl font-bold text-white tracking-tight mt-6 mb-3">
                    {item.title}
                  </h3>

                  {/* Paragraph definition text */}
                  <p className="text-zinc-400 font-sans text-sm font-light leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                {/* Sub Bullet definitions */}
                <ul className="space-y-2.5 pt-4 border-t border-white/5">
                  {item.details.map((detail, d_idx) => (
                    <li key={d_idx} className="flex items-center space-x-2 text-xs text-zinc-400 font-sans">
                      <Check className="h-3.5 w-3.5 text-violet-400 shrink-0" strokeWidth="3" />
                      <span className="font-light">{detail}</span>
                    </li>
                  ))}
                </ul>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
