
import AboutCompany from "@/components/feed/about-company"
import Footer from "@/components/postlogincomponents/footer"
import Header from "@/components/postlogincomponents/Navbarpostlogin"
import Interests from "@/components/feed/interests"
import Offerings from "@/components/feed/offerings"
import ProfileHeader from "@/components/feed/profile-header"
import ProfileInfo from "@/components/feed/profile-info"

import { useStartupProfile } from '@/hooks/useStartupAPI'
import BusinessDetails from "@/components/feed/bussiness-details"

export default function ProfilePage() {
  const { data: profile } = useStartupProfile();
  
  // The rest of the logic remains the same.
  // ... (isLoading, isError checks)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Custom scrollbar styles and Animated Background remain */}
      <style>{/* ... */}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{/* ... */}</div>

      <div className="relative z-10">
        <Header />

        <main className="px-4 py-8 max-w-7xl mx-auto"> {/* Added max-width for better desktop view */}
          <div className="mb-8">
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-0 shadow-2xl mx-auto rounded-3xl overflow-hidden">
                <ProfileHeader profile={profile} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  {/* ProfileInfo will contain contact details and profile status */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl rounded-2xl h-full">
                    <ProfileInfo profile={profile} />
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  {/* AboutCompany will contain Description, Vision, and Mission */}
                  <AboutCompany profile={profile} /> 
                  
                  {/* Business & Legal Details combined into one section for better flow */}
                  <BusinessDetails profile={profile} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <Offerings profile={profile} />
            <Interests profile={profile} />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}