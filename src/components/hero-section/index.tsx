
"use client";

import { useEffect, useRef } from "react";
import OrionLogo from "../../assets/logoimg.png"

const HeroSection = () => {
const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    
    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
        if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
      }

      draw(context: CanvasRenderingContext2D) {
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.fill();
      }
    }

    // Set canvas size properly
    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    // Initialize canvas and particles
    const initParticles = () => {
      setCanvasSize();
      particles = [];
      const particleCount = 150;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };
    
    // Animation loop
    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.forEach(particle => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      setCanvasSize();
      // Redistribute particles on resize
      particles.forEach(particle => {
        if (particle.x > canvas.width) particle.x = canvas.width;
        if (particle.y > canvas.height) particle.y = canvas.height;
      });
    };

    // Wait for next frame to ensure canvas is properly sized
    requestAnimationFrame(() => {
      initParticles();
      animate();
    });

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[75vh] overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-8xl group">
      {/* Canvas Background with Particles */}
      <div className="absolute top-0 left-0 w-full h-full z-0 rounded-3xl overflow-hidden"
        style={{
          // background: 'linear-gradient(135deg, #0a1628 0%, #1a2332 50%, #0d1b2a 100%)'
          background : 'black'
        }}>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full"
        />
      </div>

      {/* Gradient Overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/20 to-blue-950/40 z-[1] rounded-3xl pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 ">

          <div className="
    // MOBILE: Stack vertically, center items, add vertical spacing
    flex flex-col items-center space-y-4 mb-5 
    
    // DESKTOP (md: and up): Switch to horizontal row, vertically center items, set large horizontal spacing
   
">
    
    {/* Image: Small on mobile (h-32), reverts to original large size and spacing on desktop (h-80, ml-25) */}
    <img 
        src={OrionLogo} 
        alt="Orion Logo" 
        className="
            // Mobile Sizing and Spacing
            mt-5 mb-3 h-32 w-auto 
            
            // Desktop Sizing and Spacing (Restores the original large look)
            md:mt-10 md:mb-5 md:h-80 md:ml-12
        " 
    />
    
    {/* Text Block Container: Holds the two headings. Ensures they are left-aligned next to the image on desktop. */}
    <div className="
        // MOBILE: Center text content
        flex flex-col items-center
    ">
        
        {/* H3 (Title): Small on mobile (text-5xl), original large size on desktop (md:text-9xl) */}
        <h3 className="
            mt-0 mb-3 pb-8 
            font-extrabold 
            text-5xl md:text-9xl // Responsive font size
            bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent
        ">
            <span className="text-white mb-8">Om</span>Verg
        </h3>

        {/* H4 (Subtitle): Small on mobile (text-2xl), original large size on desktop (md:text-5xl) */}
        <h4 className="
            text-2xl md:text-5xl mt-8 // Responsive font size
            text-white font-bold
        ">
            Uniting Possibilities !
        </h4>
    </div>
</div>

        <span className="text-4xl text-indigo-500 font-extrabold mb-5 mt-5">For StartUps</span>

        {/* Main Heading */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight mb-6">
          Build, Connect & Grow with the {" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Next-Gen Startup Network
          </span>{" "}
           — powered by AI and Blockchain.
        </h3>
      </div>

    </section>
  );
};

export default HeroSection;