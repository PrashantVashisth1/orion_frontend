import React, { Suspense, lazy } from 'react'

import Navigation from '@/components/navigation'
import HeroSection from '@/components/hero-section'
const ShareNeedsSection = lazy(() => import('@/components/share-needs-section'))
const GetFundedComponent = lazy(() => import('@/components/postlogincomponents/GetFuded'))
const HostSessionsSection = lazy(() => import('@/components/host-sessions/host-sessions-section'))
const ExploreSection = lazy(() => import('@/components/explore-section'))
const FAQComponent = lazy(() => import('@/components/postlogincomponents/FAQComponent'))
const Footer = lazy(() => import('@/components/postlogincomponents/footer'))

const Prelogin = () => {
  return (
    <div className="min-h-screen relative pt-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden">
 


      <Navigation />
      <main className="relative z-10">
        <HeroSection />
        <Suspense fallback={<div>Loading...</div>}>
          <ShareNeedsSection />
          <div id="get-funded">
            <GetFundedComponent />
          </div>
          <HostSessionsSection />
          <ExploreSection />
          <FAQComponent />
          <Footer />
        </Suspense>
      </main>
    </div>
  )
}

export default Prelogin
