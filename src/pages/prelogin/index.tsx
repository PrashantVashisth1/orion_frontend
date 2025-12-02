// import { Suspense, lazy } from 'react'
// // import { useState } from 'react'

// import Navigation from '@/components/navigation'
// import HeroSection from '@/components/hero-section'
// const ShareNeedsSection = lazy(() => import('@/components/Prelogin-share-needs-startup'))
// const GetFundedComponent = lazy(() => import('@/components/postlogincomponents/GetFuded'))
// const HostSessionsSection = lazy(() => import('@/components/host-sessions/host-sessions-section'))
// const ExploreSection = lazy(() => import('@/components/explore-section'))
// // const FAQComponent = lazy(() => import('@/components/postlogincomponents/FAQComponent'))
// const Footer = lazy(() => import('@/components/postlogincomponents/footer'))
// import Mentor from '../../components/mentors'

// const Prelogin = () => {

//   return (
//     // Light theme background: soft white gradient
//     // REMOVED: px-4 sm:px-6 lg:px-8 from here to allow footer to be full width
//     <div className="min-h-screen relative pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
 
//       <Navigation />
//       <main className="relative z-10">
        
//         {/* ADDED: Wrapper div with padding for the main content */}
//         <div className="px-4 sm:px-6 lg:px-8">
//           <HeroSection/>
//           <Suspense fallback={<div>Loading...</div>}>
//             <ShareNeedsSection />
//             {/* <h2 className="mt-[20px] text-3xl text-center sm:text-4xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
//               <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
//                 Get Funded
//               </span>
//             </h2>
//             <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-200">
//               Fuel your startup with smart capital & AI-backed support
//             </p> */}
//             <div id="get-funded">
//               <GetFundedComponent />
//             </div>
//             <Mentor/>
//             <HostSessionsSection />
//             <ExploreSection />
//             {/* <FAQComponent /> */}
//             <>
//               {/* The Heading with subtle glow changed to use darker base colors */}
              
//             </>
//           </Suspense>
//         </div>

//         {/* Footer is now outside the padded wrapper */}
//         <Suspense fallback={<div>Loading...</div>}>
//           <Footer />
//         </Suspense>
//       </main>
//     </div>
//   )
// }

// export default Prelogin;  

import { Suspense, lazy } from 'react'
// import { useState } from 'react'

import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
const ShareNeedsSection = lazy(() => import('@/components/Prelogin-share-needs-startup'))
const GetFundedComponent = lazy(() => import('@/components/postlogincomponents/GetFuded'))
const HostSessionsSection = lazy(() => import('@/components/host-sessions/host-sessions-section'))
const ExploreSection = lazy(() => import('@/components/explore-section'))
// const FAQComponent = lazy(() => import('@/components/postlogincomponents/FAQComponent'))
const Footer = lazy(() => import('@/components/postlogincomponents/footer'))
import Mentor from '../../components/mentors'

// Import logos for the ticker
import aayaamaLogo from '@/assets/aayaama.jpeg'
import OrangeLogo from '@/assets/OrangeLogo.jpg'
import orionLogo from '@/assets/Orion__logo.png'

const StartupTicker = () => {
  // List of logos to display
  const logos = [
    { src: aayaamaLogo, alt: "Aayaama" },
    { src: OrangeLogo, alt: "Orange" },
    { src: orionLogo, alt: "Orion" },
    { src: aayaamaLogo, alt: "Aayaama" },
    { src: OrangeLogo, alt: "Orange" },
    { src: orionLogo, alt: "Orion" },
  ];

  // Create a seamless loop by duplicating the list
  const duplicatedLogos = [...logos, ...logos, ...logos];

  return (
    <div className="w-full bg-white border-y border-gray-100 py-12">
       {/* Inline styles for the animation */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.33%);
          }
        }
        .animate-scroll-fast {
          animation: scroll-fast 20s linear infinite; /* Adjusted speed for larger logos */
        }
        .animate-scroll-fast:hover {
          animation-play-state: paused;
        }
      `}} />

      {/* Constrained Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-base font-semibold text-blue-500 uppercase tracking-wider mb-8">
          Trusted by innovative startups
        </p>

        {/* Ticker Mask - Now inside the container */}
        <div className="relative w-full overflow-hidden">
          {/* Left gradient fade */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
          
          {/* Right gradient fade */}
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling track */}
          <div className="flex gap-24 items-center animate-scroll-fast w-max">
            {duplicatedLogos.map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100 cursor-pointer"
              >
                <img 
                  src={logo.src} 
                  alt={logo.alt} 
                  className="h-16 md:h-20 w-auto object-contain max-w-[200px]" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Prelogin = () => {

  return (
    // Light theme background: soft white gradient
    <div className="min-h-screen relative pt-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden">
 
      <Navigation />
      <main className="relative z-10">
        
        {/* Wrapper div with padding for the main content */}
        <div className="px-4 sm:px-6 lg:px-8">
          <HeroSection/>
        </div>

        {/* Startup Ticker Section - Placed here */}
        <StartupTicker />

        <div className="px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<div>Loading...</div>}>
            <ShareNeedsSection />
            <div id="get-funded">
              <GetFundedComponent />
            </div>
            <Mentor/>
            <HostSessionsSection />
            <ExploreSection />
            <>
              {/* The Heading with subtle glow changed to use darker base colors */}
            </>
          </Suspense>
        </div>

        {/* Footer */}
        <Suspense fallback={<div>Loading...</div>}>
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default Prelogin;