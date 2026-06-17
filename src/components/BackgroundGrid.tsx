import { useEffect, useRef, useState } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  decayRate: number;
}

export default function BackgroundGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
      setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.body.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const maxParticles = 60;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      canvas.width = parent.clientWidth;
      canvas.height = parent.clientHeight;
    };

    resizeCanvas();
    const resizeObserver = new ResizeObserver(() => resizeCanvas());
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }

    const createParticle = (x: number, y: number, isInitial = false): Particle => {
      return {
        x: x || Math.random() * canvas.width,
        y: y || Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25 - 0.05, // Slight upward drift
        opacity: isInitial ? Math.random() * 0.5 + 0.1 : 0,
        decayRate: Math.random() * 0.005 + 0.002,
      };
    };

    // Initialize particles
    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(0, 0, true));
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new particles occasionally if count drops
      if (particles.length < maxParticles && Math.random() < 0.15) {
        particles.push(createParticle(Math.random() * canvas.width, canvas.height));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];

        // Move particle
        p.x += p.speedX;
        p.y += p.speedY;

        // Fade in or fade out
        if (p.opacity < 0.6 && p.decayRate > 0) {
          p.opacity += 0.01;
        }

        // Apply mouse pull/interaction if mouse is active and near
        if (isHovered && mousePos) {
          const dx = mousePos.x - p.x;
          const dy = mousePos.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 180) {
            // Soft push away or orbit
            const force = (180 - dist) / 180;
            p.x -= (dx / dist) * force * 0.4;
            p.y -= (dy / dist) * force * 0.4;
          }
        }

        // Decay or reset
        if (p.x < 0 || p.x > canvas.width || p.y < 0 || p.y > canvas.height) {
          particles[i] = createParticle(Math.random() * canvas.width, canvas.height);
          continue;
        }

        // Draw individual particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 92, 246, ${p.opacity * 0.8})`; // Purple hue matching themed accent
        ctx.shadowBlur = p.size > 1.2 ? 4 : 0;
        ctx.shadowColor = '#8B5CF6';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(drawParticles);
    };

    drawParticles();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
    };
  }, [mousePos, isHovered]);

  return (
    <div
      id="background-grid-container"
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#050505] -z-50 overflow-hidden"
    >
      {/* Dynamic Mouse Spotlight Graphic */}
      <div
        className="absolute transition-opacity duration-1000 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none filter blur-[150px]"
        style={{
          left: `${mousePos.x}px`,
          top: `${mousePos.y}px`,
          width: '550px',
          height: '550px',
          background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, rgba(168,85,247,0.05) 50%, transparent 100%)',
          opacity: isHovered ? 1 : 0.4,
        }}
      />

      {/* Retro/High-End Noise Overlaid */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Math Vector Grid Accent */}
      <div 
        className="absolute inset-0 mask-grid pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.035) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px',
        }}
      />

      {/* Floating Sparkles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block pointer-events-none"
      />
    </div>
  );
}
