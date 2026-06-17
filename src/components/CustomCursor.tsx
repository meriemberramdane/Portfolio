import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Position using MotionValues for extreme performance
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs to add organic inertia/lag
  const springConfig = { damping: 30, stiffness: 350, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen on elements for hover interactions (micro UI hooks)
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isClickable = 
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.classList.contains('cursor-pointer') ||
        target.closest('.cursor-pointer');

      setIsHovered(!!isClickable);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);

    // Apply global CSS mode to body for cursor hiding
    document.documentElement.classList.add('custom-cursor-enabled');

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.classList.remove('custom-cursor-enabled');
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <div id="tech-cursor-gateway" className="hidden lg:block pointer-events-none fixed inset-0 z-50">
      {/* Lagging Spring Outer Circle Ring */}
      <motion.div
        className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-500/50 backdrop-blur-[1px]"
        style={{
          x: smoothX,
          y: smoothY,
          width: isHovered ? 48 : 28,
          height: isHovered ? 48 : 28,
          backgroundColor: isHovered ? 'rgba(139, 92, 246, 0.15)' : 'rgba(139, 92, 246, 0.02)',
          boxShadow: isHovered 
            ? '0 0 15px rgba(139, 92, 246, 0.4), inset 0 0 8px rgba(139, 92, 246, 0.2)' 
            : 'none',
        }}
        transition={{ type: 'tween', ease: 'backOut' }}
      />

      {/* Instant Center Pinpoint Jewel */}
      <motion.div
        className="absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-400"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isHovered ? 1.5 : 1,
          boxShadow: '0 0 6px #8B5CF6, 0 0 10px #A855F7',
        }}
      />
    </div>
  );
}
