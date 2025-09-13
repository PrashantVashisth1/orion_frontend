import { useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom"
import ActivityPost from "../activity-post"
import { Users, Zap, Plus } from "lucide-react"

const initialActivityData = [
  {
    id: "techflow",
    name: "TechFlow AI",
    avatar: "T",
    avatarColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    badge: "Startup",
    badgeColor: "bg-green-500/20 text-green-400 border border-green-500/30",
    timeAgo: "2h ago",
    content: "We're excited to announce our Series A funding of $15M! 🚀 Looking forward to scaling our AI-powered workflow automation platform. Thank you to all our early supporters and investors who believed in our vision.",
    likes: 124,
    comments: 13,
    isFollowing: false,
    image: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: "anuvad",
    name: "Anuvad",
    avatar: "A",
    avatarColor: "bg-gradient-to-r from-purple-500 to-pink-600",
    badge: "Startup",
    badgeColor: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    timeAgo: "7h ago",
    content: "If you're a driven designer or builder looking to work on real problems that impact millions of users, we'd love to hear from you! Our team is growing rapidly and we're looking for passionate individuals.",
    likes: 65,
    comments: 10,
    isFollowing: false,
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: "neu-foece",
    name: "Neu Foece",
    avatar: "N",
    avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
    badge: "Startup",
    badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
    timeAgo: "9h ago",
    content: "If you're building in AI, productivity, or enterprise SaaS — we want to connect with you! Our accelerator program is designed to help ambitious founders scale their vision.",
    likes: 130,
    comments: 7,
    isFollowing: false
  }
]

const generateMorePosts = (startIndex: number) => [
  {
    id: `post-${startIndex}`,
    name: "InnovateLab",
    avatar: "I",
    avatarColor: "bg-gradient-to-r from-indigo-500 to-purple-600",
    badge: "Accelerator",
    badgeColor: "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30",
    timeAgo: `${Math.floor(Math.random() * 12) + 1}h ago`,
    content: "Looking for the next breakthrough in fintech. Our accelerator program is now accepting applications for Q2 2024. Join us in building the future of financial technology!",
    likes: Math.floor(Math.random() * 200) + 50,
    comments: Math.floor(Math.random() * 20) + 5,
    isFollowing: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: `post-${startIndex + 1}`,
    name: "Sarah Chen",
    avatar: "S",
    avatarColor: "bg-gradient-to-r from-pink-500 to-rose-600",
    badge: "Mentor",
    badgeColor: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
    timeAgo: `${Math.floor(Math.random() * 24) + 1}h ago`,
    content: "Just wrapped up an amazing mentoring session with three promising startups. The future of tech is bright! 🌟 Always excited to guide the next generation of entrepreneurs.",
    likes: Math.floor(Math.random() * 150) + 30,
    comments: Math.floor(Math.random() * 15) + 3,
    isFollowing: false,
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&h=600&fit=crop&crop=center"
  },
  {
    id: `post-${startIndex + 2}`,
    name: "VentureCapital Pro",
    avatar: "V",
    avatarColor: "bg-gradient-to-r from-yellow-500 to-orange-600",
    badge: "Investor",
    badgeColor: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
    timeAgo: `${Math.floor(Math.random() * 48) + 1}h ago`,
    content: "Invested in 5 new startups this quarter. Excited to see how AI and sustainability converge in these innovative solutions. The intersection of tech and environmental impact is fascinating!",
    likes: Math.floor(Math.random() * 300) + 100,
    comments: Math.floor(Math.random() * 25) + 8,
    isFollowing: false,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center"
  }
]

export default function ActivityFeed() {
  const [posts, setPosts] = useState(initialActivityData)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [postIndex, setPostIndex] = useState(3)
  const navigate = useNavigate()
  const mergedUserPostsRef = useRef(false)

  // Load user-created posts from localStorage
  useEffect(() => {
    if (mergedUserPostsRef.current) return
    mergedUserPostsRef.current = true

    const userPosts = JSON.parse(localStorage.getItem('activityPosts') || '[]')
    if (userPosts.length > 0) {
      setPosts(prevPosts => {
        // Deduplicate by id when merging
        const byId = new Map<string, any>()
        ;[...userPosts, ...prevPosts].forEach(p => byId.set(p.id, p))
        return Array.from(byId.values())
      })
    }
  }, [])

  const loadMorePosts = async () => {
    if (loading || !hasMore) return

    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newPosts = generateMorePosts(postIndex)
    setPosts((prevPosts) => [...prevPosts, ...newPosts])
    setPostIndex((prevIndex) => prevIndex + 3)

    if (posts.length + newPosts.length >= 15) {
      setHasMore(false)
    }

    setLoading(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 1000) {
        loadMorePosts()
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [loading, hasMore, posts.length])

  return (
    <section className="px-6 sm:px-8 lg:px-12 mb-12">
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
          {posts.map((post) => (
            <ActivityPost key={post.id} {...post} />
          ))}

          {loading && (
            <div className="flex justify-center py-8">
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-600 border-t-blue-500 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-500 rounded-full animate-spin animate-reverse"></div>
              </div>
            </div>
          )}

          {hasMore && !loading && (
            <button
              onClick={loadMorePosts}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-2xl transform hover:scale-105"
            >
              Load More Posts
            </button>
          )}

          {!hasMore && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-800 rounded-full mb-4">
                <Zap className="h-8 w-8 text-yellow-500" />
              </div>
              <p className="text-gray-400 font-medium text-lg">You've reached the end!</p>
              <p className="text-gray-500 text-sm mt-2">Check back later for more exciting updates</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
