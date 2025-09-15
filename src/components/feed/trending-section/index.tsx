// import TrendingCard from "../trending-card"
// import { TrendingUp } from "lucide-react"

// const trendingData = [
//   {
//     id: "ai-funding",
//     icon: "S",
//     iconColor: "bg-gradient-to-r from-green-500 to-emerald-600",
//     title: "AI Startup Funding",
//     description: "A fresh generation of startups is revolutionizing the AI landscape with breakthrough innovations...",
//     trend: "24%"
//   },
//   {
//     id: "mentor-momentum",
//     icon: "M",
//     iconColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
//     title: "Mentor Momentum",
//     description: "Tiya Malhotra has been a guiding force for emerging entrepreneurs across the tech ecosystem...",
//     trend: "18%"
//   },
//   {
//     id: "accelerator-highlights",
//     icon: "A",
//     iconColor: "bg-gradient-to-r from-orange-500 to-red-600",
//     title: "Accelerator Highlights",
//     description: "ForgeLab Accelerator continues to fuel innovation with their latest cohort of promising startups...",
//     trend: "32%"
//   }
// ]

// export default function TrendingSection() {
//   return (
//     <section className="mb-12 px-4">
//       <div>
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
//           <div className="flex items-center justify-between mb-8">
//             <div className="flex items-center space-x-3">
//               <TrendingUp className="h-8 w-8 text-yellow-500" />
//               <h2 className="text-3xl font-bold text-white">Trending Now</h2>
//             </div>
//             <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-gray-700">
//               View All
//             </button>
//           </div>

//           <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
//             {trendingData.map((item) => (
//               <div key={item.id} className="flex-shrink-0 w-80">
//                 <TrendingCard {...item} />
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }



// src/components/feed/trending-section/index.tsx
import { TrendingUp, Origami, Users, MessageSquare } from "lucide-react"

export default function TrendingSection() {
  const trendingTopics = [
    { name: "AI & Machine Learning", posts: 142, growth: "+15%" },
    { name: "Startup Funding", posts: 98, growth: "+22%" },
    { name: "Product Management", posts: 76, growth: "+8%" },
    { name: "Developer Tools", posts: 64, growth: "+12%" },
  ]

  return (
    <section className="px-6 sm:px-8 lg:px-12 mb-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-3 mb-8">
          <TrendingUp className="h-8 w-8 text-orange-500" />
          <h2 className="text-3xl font-bold text-white">Trending Now</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {trendingTopics.map((topic, index) => (
            <div
              key={topic.name}
              className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-orange-500/30 transition-all duration-300 cursor-pointer group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Origami className="h-6 w-6 text-orange-400" />
                </div>
                <span className="text-green-400 text-sm font-medium bg-green-400/10 px-2 py-1 rounded-full">
                  {topic.growth}
                </span>
              </div>
              
              <h3 className="font-semibold text-white mb-3 group-hover:text-orange-400 transition-colors">
                {topic.name}
              </h3>
              
              <div className="flex items-center justify-between text-gray-400 text-sm">
                <div className="flex items-center space-x-1">
                  <MessageSquare className="h-4 w-4" />
                  <span>{topic.posts} posts</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>Active</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
