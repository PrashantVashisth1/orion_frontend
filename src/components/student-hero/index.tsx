// import hero from '../../assets/hero-student.png'
// export default function Hero() {
//   return (
//     <section className="mt-10 ">
//       <div className="rounded-2xl mt-12 overflow-hidden shadow-lg">
//         <div className="relative h-64 sm:h-80 lg:h-96">
//           <img
//             src={hero}
//             alt="office"
//             className="absolute inset-0 w-full h-full object-cover"
//           />

//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//             <div className="text-center text-white max-w-2xl px-6">
//               <p className="uppercase text-sm underline">From Pre - seed to Post - IPO</p>
//               <h1 className="text-2xl sm:text-4xl font-extrabold mt-3">Welcome to the world's largest platform For Students!</h1>
//               <p className="mt-2 text-sm">Get started under 10 minutes</p>
//               <a
//                 href="#experience"
//                 className="inline-block mt-5 bg-white text-black py-2 px-6 rounded-full font-semibold shadow"
//               >
//                 Register
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

"use client";

import { useEffect, useRef } from "react";
import hero from "../../assets/logoimg.png";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

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
        context.fillStyle = "rgba(255, 255, 255, 0.8)";
        context.fill();
      }
    }

    const setCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const initParticles = () => {
      setCanvasSize();
      particles = [];
      const particleCount = 120;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      if (!canvas.width || !canvas.height) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update(canvas.width, canvas.height);
        particle.draw(ctx);
      });

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

    const handleResize = () => {
      setCanvasSize();
    };

    requestAnimationFrame(() => {
      initParticles();
      animate();
    });

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-[80vh] overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-7xl mt-10">
      {/* Animated background */}
      <div
        className="absolute top-0 left-0 w-full h-full z-0 rounded-3xl overflow-hidden"
        style={{ background: "black" }}
      >
        <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
      </div>

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-[1]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8">
        {/* Centered Image */}
        <img
          src={hero}
          alt="Students hero"
          className="
            mt-5 mb-8 
            h-28 w-auto 
            sm:h-32 
            md:h-36 
            object-contain
            transition-transform duration-500 hover:scale-105
          "
        />

        <p className="uppercase text-sm underline text-gray-200 mb-2">
          From Pre - seed to Post - IPO
        </p>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 max-w-3xl leading-snug">
          Welcome to the world's largest platform{" "}
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            For Students!
          </span>
        </h1>

        <p className="mt-4 text-gray-300 text-sm sm:text-base">
          Get started under 10 minutes
        </p>

        <a
          href="#experience"
          className="inline-block mt-6 bg-white text-black py-2 px-8 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
        >
          Register
        </a>
      </div>
    </section>
  );
}
