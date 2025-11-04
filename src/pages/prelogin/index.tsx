// import { Suspense, lazy } from 'react'

// import Navigation from '@/components/navigation'
// import HeroSection from '@/components/hero-section'
// const ShareNeedsSection = lazy(() => import('@/components/share-needs-section'))
// const GetFundedComponent = lazy(() => import('@/components/postlogincomponents/GetFuded'))
// const HostSessionsSection = lazy(() => import('@/components/host-sessions/host-sessions-section'))
// const ExploreSection = lazy(() => import('@/components/explore-section'))
// const FAQComponent = lazy(() => import('@/components/postlogincomponents/FAQComponent'))
// const Footer = lazy(() => import('@/components/postlogincomponents/footer'))

// const Prelogin = () => {
//   return (
//     <div className="min-h-screen relative pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
 


//       <Navigation />
//       <main className="relative z-10">
//         <HeroSection />
//         <Suspense fallback={<div>Loading...</div>}>
//           <ShareNeedsSection />
//           <div id="get-funded">
//             <GetFundedComponent />
//           </div>
//           <HostSessionsSection />
//           <ExploreSection />
//           <FAQComponent />
//           <Footer />
//         </Suspense>
//       </main>
//     </div>
//   )
// }

// export default Prelogin
import { Suspense, lazy } from 'react'
// import { useState } from 'react'

import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
const ShareNeedsSection = lazy(() => import('@/components/Prelogin-share-needs-startup'))
const GetFundedComponent = lazy(() => import('@/components/postlogincomponents/GetFuded'))
const HostSessionsSection = lazy(() => import('@/components/host-sessions/host-sessions-section'))
const ExploreSection = lazy(() => import('@/components/explore-section'))
// const FAQComponent = lazy(() => import('@/components/postlogincomponents/FAQComponent'))
// const Footer = lazy(() => import('@/components/postlogincomponents/footer'))
import Mentor from '../../components/mentors'
const Prelogin = () => {

  return (
    <div className="min-h-screen relative pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
 


      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <Suspense fallback={<div>Loading...</div>}>
          <ShareNeedsSection />
          {/* <h2 className="mt-[20px] text-3xl text-center sm:text-4xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Get Funded
            </span>
          </h2>
          <p className="text-xl text-center text-gray-300 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-200">
            Fuel your startup with smart capital & AI-backed support
          </p> */}
          <div id="get-funded">
            <GetFundedComponent />
          </div>
          <Mentor/>
          <HostSessionsSection />
          <ExploreSection />
          {/* <FAQComponent /> */}
<>
  {/* The Heading with subtle neon glow */}
  <h2 
    className="
      mt-[30px] text-3xl text-center sm:text-4xl md:text-5xl font-extrabold mb-8 
      animate-in fade-in-0 slide-in-from-top-4 duration-700
    "
  >
    <span 
      className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
      style={{ 
        // Applying the subtle glow directly to the text
        filter: 'drop-shadow(0 0 4px rgba(236, 72, 153, 0.7))'
      }}
    >
      Join the Startup Network of the future
    </span>
  </h2>
  
</>
          {/* <Footer /> */}
        </Suspense>
      </main>
    </div>
  )
}

export default Prelogin
