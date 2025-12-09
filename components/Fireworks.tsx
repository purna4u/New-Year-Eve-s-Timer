import React, { useEffect, useRef } from 'react';

export const Fireworks: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];
    const colors = ['#fbbf24', '#ef4444', '#3b82f6', '#22c55e', '#a855f7', '#ffffff'];

    class Rocket {
      x: number;
      y: number;
      vy: number;
      color: string;
      exploded: boolean;

      constructor() {
        this.x = Math.random() * width;
        this.y = height;
        this.vy = -(Math.random() * 5 + 12); // Initial velocity up
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.exploded = false;
      }

      update() {
        this.y += this.vy;
        this.vy += 0.2; // Gravity
        
        // Explode when velocity slows down
        if (this.vy >= -2 && !this.exploded) {
          this.explode();
          return false; // Remove rocket
        }
        return true; // Keep rocket
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        
        // Trail
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y + 10);
        ctx.strokeStyle = `rgba(255,255,255,0.3)`;
        ctx.stroke();
      }

      explode() {
        const particleCount = 80 + Math.random() * 50;
        for (let i = 0; i < particleCount; i++) {
          particles.push(new Particle(this.x, this.y, this.color));
        }
      }
    }

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      alpha: number;
      color: string;
      decay: number;

      constructor(x: number, y: number, color: string) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        this.vx = Math.cos(angle) * speed;
        this.vy = Math.sin(angle) * speed;
        this.alpha = 1;
        this.color = color;
        this.decay = Math.random() * 0.015 + 0.005;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy += 0.05; // Gravity
        this.vx *= 0.98; // Air resistance
        this.vy *= 0.98;
        this.alpha -= this.decay;
        return this.alpha > 0;
      }

      draw() {
        if (!ctx) return;
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.restore();
      }
    }

    let animationId: number;
    let frame = 0;

    const animate = () => {
      // Clear with trail effect
      if (!ctx) return;
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)'; // Match bg-slate-950
      ctx.fillRect(0, 0, width, height);

      // Launch rockets randomly
      if (frame % 30 === 0) { // Approx every 0.5s
         if (Math.random() > 0.3) rockets.push(new Rocket());
      }
      if (Math.random() < 0.05) rockets.push(new Rocket()); // Random extra launches

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        rockets[i].draw();
        if (!rockets[i].update()) {
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        if (!particles[i].update()) {
          particles.splice(i, 1);
        }
      }

      frame++;
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />;
};