

// "use client";

// import { useEffect, useRef } from "react";
// import hero from "../../../assets/logoimg.png";

// export default function Hero() {
//   const canvasRef = useRef<HTMLCanvasElement>(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let particles: Particle[] = [];
//     let animationFrameId: number;

//     class Particle {
//       x: number;
//       y: number;
//       vx: number;
//       vy: number;
//       radius: number;

//       constructor(width: number, height: number) {
//         this.x = Math.random() * width;
//         this.y = Math.random() * height;
//         this.vx = (Math.random() - 0.5) * 0.5;
//         this.vy = (Math.random() - 0.5) * 0.5;
//         this.radius = Math.random() * 2 + 1;
//       }

//       update(canvasWidth: number, canvasHeight: number) {
//         this.x += this.vx;
//         this.y += this.vy;

//         if (this.x < 0 || this.x > canvasWidth) this.vx *= -1;
//         if (this.y < 0 || this.y > canvasHeight) this.vy *= -1;
//       }

//       draw(context: CanvasRenderingContext2D) {
//         context.beginPath();
//         context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
//         context.fillStyle = "rgba(255, 255, 255, 0.8)";
//         context.fill();
//       }
//     }

//     const setCanvasSize = () => {
//       const rect = canvas.getBoundingClientRect();
//       canvas.width = rect.width;
//       canvas.height = rect.height;
//     };

//     const initParticles = () => {
//       setCanvasSize();
//       particles = [];
//       const particleCount = 120;
//       for (let i = 0; i < particleCount; i++) {
//         particles.push(new Particle(canvas.width, canvas.height));
//       }
//     };

//     const animate = () => {
//       if (!canvas.width || !canvas.height) return;
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       particles.forEach((particle) => {
//         particle.update(canvas.width, canvas.height);
//         particle.draw(ctx);
//       });

//       for (let i = 0; i < particles.length; i++) {
//         for (let j = i + 1; j < particles.length; j++) {
//           const dx = particles[i].x - particles[j].x;
//           const dy = particles[i].y - particles[j].y;
//           const distance = Math.sqrt(dx * dx + dy * dy);

//           if (distance < 150) {
//             ctx.beginPath();
//             ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - distance / 150)})`;
//             ctx.lineWidth = 0.8;
//             ctx.moveTo(particles[i].x, particles[i].y);
//             ctx.lineTo(particles[j].x, particles[j].y);
//             ctx.stroke();
//           }
//         }
//       }

//       animationFrameId = requestAnimationFrame(animate);
//     };

//     const handleResize = () => {
//       setCanvasSize();
//     };

//     requestAnimationFrame(() => {
//       initParticles();
//       animate();
//     });

//     window.addEventListener("resize", handleResize);
//     return () => {
//       window.removeEventListener("resize", handleResize);
//       cancelAnimationFrame(animationFrameId);
//     };
//   }, []);

//   return (
//     <section className="relative min-h-[80vh] overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-7xl mt-10">
//       {/* Animated background */}
//       <div
//         className="absolute top-0 left-0 w-full h-full z-0 rounded-3xl overflow-hidden"
//         style={{ background: "black" }}
//       >
//         <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full" />
//       </div>

//       {/* Overlay gradient */}
//       <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black/80 z-[1]" />

//       {/* Content */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-8">
//         {/* Centered Image */}
//         <img
//           src={hero}
//           alt="Students hero"
//           className="
//             mt-5 mb-8 
//             h-28 w-auto 
//             sm:h-32 
//             md:h-36 
//             object-contain
//             transition-transform duration-500 hover:scale-105
//           "
//         />

//         <p className="uppercase text-sm underline text-gray-200 mb-2">
//           From Pre - seed to Post - IPO
//         </p>

//         <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-2 max-w-3xl leading-snug">
//           Welcome to the world's largest platform{" "}
//           <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
//             For Students!
//           </span>
//         </h1>

//         <p className="mt-4 text-gray-300 text-sm sm:text-base">
//           Get started under 10 minutes
//         </p>

//         <a
//           href="#experience"
//           className="inline-block mt-6 bg-white text-black py-2 px-8 rounded-full font-semibold shadow-md hover:scale-105 transition-transform"
//         >
//           Register
//         </a>
//       </div>
//     </section>
//   );
// }

"use client";
import hero from "../../../assets/logoimg.png";

export default function Hero() {
  return (
    <section className="relative min-h-[80vh] overflow-hidden rounded-3xl shadow-xl mx-auto max-w-7xl mt-10">
      
      {/* Enhanced light background with gradient */}
      <div
        className="absolute inset-0 z-0 rounded-3xl"
        style={{
          background: "linear-gradient(135deg, #ffffff 0%, #f0f9ff 50%, #e0f2fe 100%)",
        }}
      />
      
      {/* Decorative circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000" />
      
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-14">
        {/* Logo with subtle shadow */}
        <img
          src={hero}
          alt="OmVerg Logo"
          className="h-28 sm:h-32 md:h-36 w-auto mt-4 mb-6 object-contain drop-shadow-lg"
        />
        
        {/* OmVerg title with enhanced styling */}
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-gray-900 tracking-tight">
          Om
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm">
            Verg
          </span>
        </h1>
        
        {/* Tagline with refined styling */}
        <p className="text-gray-800 text-xl sm:text-2xl font-bold mt-4 tracking-wide">
          Uniting Possibilities !
        </p>
        
        {/* Subtext lines with enhanced styling */}
        <div className="flex flex-col items-center mt-8 gap-2">
          <p className="text-base sm:text-lg font-semibold text-gray-700 tracking-wide">
             Empowering Growth
          </p>
          <p className="text-base sm:text-lg font-semibold text-blue-700 tracking-wide">
             For Students
          </p>
        </div>
        
        {/* Bottom sentence with card styling */}
        <div className="mt-8 max-w-3xl">
          <p className="text-gray-900 text-lg sm:text-xl font-semibold leading-relaxed bg-white/60 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg border border-gray-200">
            Build, Connect & Grow with the{" "}
            <span className="text-blue-600 font-bold">World's Smartest Growth Ecosystem</span>{" "}
            powered by{" "}
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-bold">
              AI and Blockchain
            </span>.
          </p>
        </div>
      </div>
    </section>
  );
}
