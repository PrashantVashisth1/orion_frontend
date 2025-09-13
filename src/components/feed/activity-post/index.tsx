import { useState } from "react"
import { Heart, MessageCircle, Share2, Send, X, FileText, Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface ActivityPostProps {
  name: string
  avatar: string
  avatarColor: string
  badge: string
  badgeColor: string
  timeAgo: string
  content: string
  likes: number
  comments: number
  isFollowing: boolean
  image?: string // Optional image URL
  files?: Array<{
    name: string
    type: 'image' | 'pdf'
    url: string
  }>
}

export default function ActivityPost({
  name,
  avatar,
  avatarColor,
  badge,
  badgeColor,
  timeAgo,
  content,
  likes,
  comments,
  isFollowing,
  image,
  files
}: ActivityPostProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(likes)
  const [following, setFollowing] = useState(isFollowing)
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [postComments, setPostComments] = useState([
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "S",
      avatarColor: "bg-gradient-to-r from-pink-500 to-rose-600",
      content: "This is amazing! Looking forward to seeing more updates.",
      timeAgo: "2h ago"
    },
    {
      id: 2,
      name: "Alex Kumar",
      avatar: "A",
      avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-600",
      content: "Great initiative! Would love to collaborate.",
      timeAgo: "1h ago"
    }
  ])

  const toggleLike = () => {
    if (liked) {
      setLikeCount(likeCount - 1)
    } else {
      setLikeCount(likeCount + 1)
    }
    setLiked(!liked)
  }

  const toggleFollow = () => {
    setFollowing(!following)
  }

  const handleAddComment = () => {
    if (commentText.trim()) {
      const newComment = {
        id: postComments.length + 1,
        name: "You",
        avatar: "Y",
        avatarColor: "bg-gradient-to-r from-green-500 to-emerald-600",
        content: commentText,
        timeAgo: "Just now"
      }
      setPostComments([newComment, ...postComments])
      setCommentText("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${avatarColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {avatar /* Render avatar as string text */}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{name}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}>
                {badge}
              </span>
              <span className="text-gray-500 text-xs">• {timeAgo}</span>
            </div>
          </div>
        </div>
        <button
          className={`px-4 py-2 rounded-full font-medium transition-all duration-200 ${
            following
              ? "bg-gray-700/50 text-gray-300 hover:bg-gray-600/50"
              : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg"
          }`}
          onClick={toggleFollow}
        >
          {following ? "Following" : "Follow"}
        </button>
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap text-base">
        {content}
      </p>

      {/* Image Display */}
      {image && (
        <div className="mb-6">
          <div className="relative group overflow-hidden rounded-xl border border-gray-700/50">
            <img
              src={image}
              alt="Post content"
              className="w-full h-auto max-h-96 object-cover transition-transform duration-300 group-hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>
        </div>
      )}

      {/* Files Display */}
      {files && files.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
            <FileText className="h-4 w-4 text-purple-400" />
            <span>Attachments ({files.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {files.map((file, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    {file.type === 'pdf' ? (
                      <FileText className="h-5 w-5 text-red-400" />
                    ) : (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.parentElement!.innerHTML = '<FileText class="h-5 w-5 text-blue-400" />';
                        }}
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate text-sm">{file.name}</p>
                    <p className="text-gray-400 text-xs capitalize">{file.type} file</p>
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = file.url;
                      link.download = file.name;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 hover:bg-gray-600/50 rounded-lg"
                  >
                    <Download className="h-4 w-4 text-gray-400 hover:text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between text-gray-400">
        <button
          onClick={toggleLike}
          className={`flex items-center space-x-2 transition-all duration-200 hover:scale-110 ${
            liked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          <span className="font-medium">{likeCount}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-blue-400 transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{postComments.length}</span>
        </button>

        <button className="flex items-center space-x-2 hover:text-green-400 transition-all duration-200 hover:scale-110">
          <Share2 className="h-5 w-5" />
          <span className="font-medium">Share</span>
        </button>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 border-t border-gray-700/50 pt-6">
          <div className="mb-4">
            <h4 className="text-white font-semibold mb-4">Comments ({postComments.length})</h4>
            
            {/* Comment Input */}
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                Y
              </div>
              <div className="flex-1 flex items-center space-x-2">
                <Input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                />
                <Button
                  onClick={handleAddComment}
                  disabled={!commentText.trim()}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-4">
              {postComments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${comment.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {comment.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-white text-sm">{comment.name}</span>
                      <span className="text-gray-500 text-xs">• {comment.timeAgo}</span>
                    </div>
                    <p className="text-gray-300 text-sm leading-relaxed">{comment.content}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
