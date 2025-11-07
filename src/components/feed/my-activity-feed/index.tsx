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

