import { useNavigate } from "react-router-dom"
import ActivityPost from "../my-activity-post"
import { Users, Plus, Loader2 } from "lucide-react"
import { useActivityFeed } from "@/hooks/useActivityFeed"

export default function ActivityFeed() {
  const navigate = useNavigate()
  const { posts, isLoading, error, refetch } = useActivityFeed()

  if (isLoading) {
    return (
      <section className="px-6 sm:px-8 lg:px-12 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <Loader2 className="h-8 w-8 text-blue-500 animate-spin" />
              <p className="text-gray-400">Loading posts...</p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="px-6 sm:px-8 lg:px-12 mb-12">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center space-y-4">
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <Users className="h-8 w-8 text-red-400" />
              </div>
              <div className="text-center">
                <h3 className="text-xl font-semibold text-white mb-2">Failed to load posts</h3>
                <p className="text-gray-400 mb-4">{error.message}</p>
                <button
                  onClick={() => refetch()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    // <section className="px-6 sm:px-8 lg:px-12 mb-12">
    <section className="">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Users className="h-8 w-8 text-blue-500" />
            <h2 className="text-3xl font-bold text-white">Activity Feed</h2>
          </div>
          <button
            onClick={() => navigate('/create-post')}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-105 group"
          >
            <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
            <span>Create Post</span>
          </button>
        </div>

        <div className="space-y-6">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No posts yet</h3>
              <p className="text-gray-400 mb-4">Be the first to share something with the community!</p>
              <button
                onClick={() => navigate('/create-post')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
              >
                Create Post
              </button>
            </div>
          ) : (
            posts.map((post) => (
              <ActivityPost key={post.id} {...post} />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

// import { useNavigate } from "react-router-dom"
// import ActivityPost from "../my-activity-post"
// import { Users, Plus, Loader2 } from "lucide-react"
// import { useActivityFeed } from "@/hooks/useActivityFeed"

// export default function ActivityFeed() {
//   const navigate = useNavigate()
//   // Assuming 'posts' has a property 'id' for the key, and is an array of objects
//   const { posts, isLoading, error, refetch } = useActivityFeed()

//   if (isLoading) {
//     // Kept the loading state styling as it's outside the main feed 'return' block
//     return (
//       <section className="flex items-center justify-center min-h-[400px] bg-gradient-to-br from-indigo-50 via-sky-50 to-cyan-50 text-gray-600 rounded-3xl shadow-inner">
//         <div className="flex flex-col items-center space-y-4">
//           <Loader2 className="h-8 w-8 text-indigo-500 animate-spin" />
//           <p className="text-gray-500">Loading posts...</p>
//         </div>
//       </section>
//     )
//   }

//   if (error) {
//     // Kept the error state styling as it's outside the main feed 'return' block
//     return (
//       <section className="px-6 sm:px-8 lg:px-2 mb-12">
//         <div className="max-w-4xl mx-auto flex flex-col items-center justify-center py-16 rounded-2xl bg-gradient-to-br from-red-50 via-rose-50 to-orange-50 shadow-xl">
//           <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mb-6">
//             <Users className="h-10 w-10 text-red-400" />
//           </div>
//           <h3 className="text-2xl font-semibold text-gray-800 mb-2">Failed to load posts</h3>
//           <p className="text-gray-500 mb-6">{error.message}</p>
//           <button
//             onClick={() => refetch()}
//             className="bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-400/25"
//           >
//             Try Again
//           </button>
//         </div>
//       </section>
//     )
//   }

//   return (
//     <section className="relative **bg-transparent py-14 px-0** font-sans **rounded-none overflow-visible**">
      
//       {/* --- REMOVED Ambient gradient glows DIV --- */}

//       <div className="relative max-w-4xl mx-auto **p-0 rounded-none border-none shadow-none**">
//         <div className="flex items-center justify-between mb-10 px-4">
//           <div className="flex items-center space-x-3">
//             {/* The icon container still has a shadow/padding from the original code,
//                 but for a minimal look, I'll update its background to transparent and remove shadow */}
//             <div className="p-0 rounded-xl **shadow-none bg-transparent**">
//               {/* NOTE: You might need to change the icon color if the background is now transparent/white */}
//               <Users className="h-6 w-6 **text-blue-600**" /> 
//             </div>
//             <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Activity Feed
//             </h2>
//           </div>

//           <button
//             onClick={() => navigate("/create-post")}
//             className="inline-flex items-center space-x-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/25 transform hover:scale-[1.05] active:scale-[0.98] group cursor-pointer"
//           >
//             <Plus className="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" />
//             <span>Create Post</span>
//           </button>
//         </div>

//         {/* Posts List */}
//         <div className="space-y-6">
//           {posts.length === 0 ? (
//             <div className="text-center py-16 **bg-transparent backdrop-blur-none rounded-none border-none shadow-none**">
//               <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
//                 <Users className="h-8 w-8 text-indigo-400" />
//               </div>
//               <h3 className="text-2xl font-semibold text-gray-700 mb-2">No posts yet</h3>
//               <p className="text-gray-500 mb-6">Be the first to share something with the community!</p>
//               <button
//                 onClick={() => navigate("/create-post")}
//                 className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 hover:shadow-md hover:shadow-purple-400/25 cursor-pointer"
//               >
//                 Create Post
//               </button>
//             </div>
//           ) : (
//             // Ensure ActivityPost component itself has minimal/transparent styling if needed
//             posts.map((post) => <ActivityPost key={post.id} {...post} />)
//           )}
//         </div>
//       </div>
//     </section>
//   )
// }