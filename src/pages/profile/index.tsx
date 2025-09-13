
// import AboutCompany from "@/components/feed/about-company"
// import Footer from "@/components/postlogincomponents/footer"
// import Header from "@/components/postlogincomponents/Navbarpostlogin"
// import Interests from "@/components/feed/interests"
// import Offerings from "@/components/feed/offerings"
// import ProfileHeader from "@/components/feed/profile-header"
// import ProfileInfo from "@/components/feed/profile-info"
// import VisionMission from "@/components/feed/vision-mission"

// export default function ProfilePage() {

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
//       {/* Custom scrollbar styles */}
//       <style>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 8px;
//         }
//         .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
//           background-color: #4b5563;
//           border-radius: 4px;
//         }
//         .scrollbar-track-gray-800::-webkit-scrollbar-track {
//           background-color: #1f2937;
//           border-radius: 4px;
//         }
//         .hover\\:scrollbar-thumb-gray-500:hover::-webkit-scrollbar-thumb {
//           background-color: #6b7280;
//         }
//       `}</style>
      
//       {/* Animated Background */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
//       </div>

//       {/* Content */}
//       <div className="relative z-10">
//         <Header />

//         <main className="px-4 py-8">
//           {/* Profile Information Section */}
//           <div className="mb-8">
//             <div className="space-y-6">
//               <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl mx-auto" style={{width: '90vw', maxWidth: '2000px'}}>
//                 <ProfileHeader />
//               </div>
              
//               <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl mx-auto" style={{width: '90vw', maxWidth: '2000px'}}>
//                 <ProfileInfo />
//               </div>
//             </div>
//           </div>

//           {/* Company Details Section - Now below profile info */}
//           <div className="space-y-6">
//             <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
//               <AboutCompany />
//             </div>
            
//             <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
//               <VisionMission />
//             </div>
            
//             <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
//               <Offerings />
//             </div>
            
//             <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
//               <Interests />
//             </div>
//           </div>
//         </main>

//         <Footer />
//       </div>
//     </div>
//   )
// }


import AboutCompany from "@/components/feed/about-company"
import Footer from "@/components/postlogincomponents/footer"
import Header from "@/components/postlogincomponents/Navbarpostlogin"
import Interests from "@/components/feed/interests"
import Offerings from "@/components/feed/offerings"
import ProfileHeader from "@/components/feed/profile-header"
import ProfileInfo from "@/components/feed/profile-info"
import VisionMission from "@/components/feed/vision-mission"
import { useStartupProfile } from '@/hooks/useStartupAPI'
import { Skeleton } from "@/components/ui/skeleton"

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useStartupProfile();
  // console.log('This is the profile', profile);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
        <Header />
        <main className="px-4 py-8">
          <div className="space-y-6">
            <Skeleton className="h-[200px] w-full bg-gray-700/50" />
            <Skeleton className="h-[200px] w-full bg-gray-700/50" />
            <Skeleton className="h-[200px] w-full bg-gray-700/50" />
            <Skeleton className="h-[200px] w-full bg-gray-700/50" />
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden text-white">
        <Header />
        <main className="px-4 py-8 text-center">
          <h1 className="text-3xl font-bold mb-4">Error</h1>
          <p>Could not load profile. Please try again later.</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <style>{`
        .scrollbar-thin::-webkit-scrollbar { height: 8px; }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 4px; }
        .scrollbar-track-gray-800::-webkit-scrollbar-track { background-color: #1f2937; border-radius: 4px; }
        .hover\\:scrollbar-thumb-gray-500:hover::-webkit-scrollbar-thumb { background-color: #6b7280; }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      <div className="relative z-10">
        <Header />

        <main className="px-4 py-8">
          <div className="mb-8">
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl mx-auto" style={{width: '90vw', maxWidth: '2000px'}}>
                <ProfileHeader profile={profile} />
              </div>
              
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl mx-auto" style={{width: '90vw', maxWidth: '2000px'}}>
                <ProfileInfo profile={profile} />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
              <AboutCompany profile={profile} />
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
              <VisionMission profile={profile} />
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
              <Offerings profile={profile} />
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl">
              <Interests profile={profile}  />
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  )
}