import { useState } from "react"
import TrendingSection from "../../components/feed/trending-section"
import ActivityFeed from "../../components/feed/my-activity-feed"
import Navbarpostlogin from "../../components/postlogincomponents/Navbarpostlogin"
import FeedSidebar from "../../components/feed/sidebar"
// import { TrendingUp } from "lucide-react"

export default function SocialFeedApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const closeSidebar = () => {
    setIsSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Custom scrollbar styles */}
      <style>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
          background-color: #4b5563;
          border-radius: 4px;
        }
        .scrollbar-track-gray-800::-webkit-scrollbar-track {
          background-color: #1f2937;
          border-radius: 4px;
        }
        .hover\\:scrollbar-thumb-gray-500:hover::-webkit-scrollbar-thumb {
          background-color: #6b7280;
        }
      `}</style>
      
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <Navbarpostlogin onFilterToggle={toggleSidebar} />

      {/* Main Content */}
      <main className="relative z-10 p-6 px-[204px] py-[60px]">
        <TrendingSection />
        <ActivityFeed />
      </main>

      {/* Sidebar */}
      <FeedSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
    </div>
  )
}
// import { useState } from "react"
// import TrendingSection from "../../components/feed/trending-section"
// import ActivityFeed from "../../components/feed/my-activity-feed"
// import Navbarpostlogin from "../../components/postlogincomponents/Navbarpostlogin"
// import FeedSidebar from "../../components/feed/sidebar"
// // import HomeBanner from "../../components/HomeBanner"
// // import HomeHeader from "../../assets/Home_banner.png"
// export default function SocialFeedApp() {
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false)

//   const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
//   const closeSidebar = () => setIsSidebarOpen(false)

//   return (
//     <div className="min-h-screen bg-white relative overflow-hidden text-gray-800">
//       {/* Custom scrollbar styles */}
//       <style>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 8px;
//         }
//         .scrollbar-thumb-gray-400::-webkit-scrollbar-thumb {
//           background-color: #9ca3af;
//           border-radius: 4px;
//         }
//         .scrollbar-track-gray-100::-webkit-scrollbar-track {
//           background-color: #f3f4f6;
//           border-radius: 4px;
//         }
//         .hover\\:scrollbar-thumb-gray-500:hover::-webkit-scrollbar-thumb {
//           background-color: #6b7280;
//         }
//       `}</style>

//       {/* Animated Background (soft pastel glows) */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
//         <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
//         <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
//         <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-yellow-300/15 rounded-full blur-3xl animate-pulse delay-3000"></div>
//       </div>

//       {/* Subtle grid pattern */}
//       <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.04)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.04)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>

//       {/* Header */}
//       <Navbarpostlogin onFilterToggle={toggleSidebar} />
//       {/* <img src={HomeHeader} className="h-[500px] w-[80%] m-auto" /> */}
//       {/* <HomeBanner/> */}
//       {/* Main Content */}
//       <main className="bg-gray-200 relative z-10 p-6 sm:px-12 md:px-24 py-20">
//         <TrendingSection />
//         <ActivityFeed />
//       </main>

//       {/* Sidebar */}
//       <FeedSidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
//     </div>
//   )
// }
