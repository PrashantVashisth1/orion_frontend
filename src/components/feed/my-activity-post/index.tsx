// 2. Updated Activity Post - src/components/feed/activity-post/index.tsx
import { useState } from "react"
import { Heart, MessageCircle, Share2, Send, X, FileText, Download, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuthStore } from "@/store/authStore"
import { useActivityFeed } from "@/hooks/useActivityFeed"
import { useDeletePost } from "@/hooks/usePosts"
import { formatDistanceToNow } from "date-fns"

interface ActivityPostProps {
  id: number;
  text: string;
  images: string[];
  documents: string[];
  createdAt: string;
  author: {
    id: number;
    fullName: string;
    email: string;
    role: string;
  };
  likes: Array<{ id: number; userId: number; user: { id: number; fullName: string; email: string } }>;
  comments: Array<{
    id: number;
    userId: number;
    content: string;
    user: { id: number; fullName: string; email: string };
    createdAt: string;
  }>;
  isLiked?: boolean;
  likeCount?: number;
  commentCount?: number;
  canEdit?: boolean;
  canDelete?: boolean;
}

export default function ActivityPost(props: ActivityPostProps) {
  const {
    id,
    text,
    images,
    documents,
    createdAt,
    author,
    comments,
    isLiked = false,
    likeCount = 0,
    commentCount = 0,
    canEdit = false,
    canDelete = false,
  } = props

  const { user } = useAuthStore()
  const { handleLikeToggle, handleCreateComment, handleDeleteComment, isLiking, isCommenting } = useActivityFeed()
  const deletePostMutation = useDeletePost()
  
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [liked, setLiked] = useState(isLiked)
  const [currentLikeCount, setCurrentLikeCount] = useState(likeCount)

  const toggleLike = async () => {
    const newLiked = !liked
    setLiked(newLiked)
    setCurrentLikeCount(prev => newLiked ? prev + 1 : prev - 1)
    
    try {
      await handleLikeToggle(id, liked)
    } catch (error) {
      // Revert optimistic update on error
      setLiked(!newLiked)
      setCurrentLikeCount(prev => newLiked ? prev - 1 : prev + 1)
    }
  }

  const handleAddComment = async () => {
    if (commentText.trim()) {
      try {
        await handleCreateComment(id, commentText.trim())
        setCommentText("")
      } catch (error) {
        // Error handled in the hook
      }
    }
  }

  const handleDeletePost = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePostMutation.mutateAsync(id)
      } catch (error) {
        // Error handled in the hook
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleAddComment()
    }
  }

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const getRoleColor = (role: string) => {
    const colors = {
      STARTUP: "bg-green-500/20 text-green-400 border border-green-500/30",
      INVESTOR: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
      MENTOR: "bg-pink-500/20 text-pink-400 border border-pink-500/30",
      STUDENT: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
      ADMIN: "bg-purple-500/20 text-purple-400 border border-purple-500/30",
    }
    return colors[role as keyof typeof colors] || colors.STARTUP
  }

  const getAvatarColor = (role: string) => {
    const colors = {
      STARTUP: "bg-gradient-to-r from-green-500 to-emerald-600",
      INVESTOR: "bg-gradient-to-r from-yellow-500 to-orange-600",
      MENTOR: "bg-gradient-to-r from-pink-500 to-rose-600",
      STUDENT: "bg-gradient-to-r from-blue-500 to-cyan-600",
      ADMIN: "bg-gradient-to-r from-purple-500 to-indigo-600",
    }
    return colors[role as keyof typeof colors] || colors.STARTUP
  }

  return (
    <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 ${getAvatarColor(author.role)} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {getInitials(author.fullName)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-white">{author.fullName}</h3>
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getRoleColor(author.role)}`}>
                {author.role}
              </span>
              <span className="text-gray-500 text-xs">• {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
        
        {/* Action buttons for post owner */}
        {(canEdit || canDelete) && (
          <div className="flex items-center space-x-2">
            {canEdit && (
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Edit className="h-4 w-4 text-gray-400 hover:text-white" />
              </button>
            )}
            {canDelete && (
              <button
                onClick={handleDeletePost}
                disabled={deletePostMutation.isPending}
                className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors disabled:opacity-50"
              >
                <Trash2 className="h-4 w-4 text-gray-400 hover:text-red-400" />
              </button>
            )}
          </div>
        )}
      </div>

      <p className="text-gray-300 mb-6 leading-relaxed whitespace-pre-wrap text-base">
        {text}
      </p>

      {/* Images Display */}
      {images && images.length > 0 && (
        <div className="mb-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative group overflow-hidden rounded-xl border border-gray-700/50">
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
            ))}
          </div>
        </div>
      )}

      {/* Documents Display */}
      {documents && documents.length > 0 && (
        <div className="mb-6">
          <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
            <FileText className="h-4 w-4 text-purple-400" />
            <span>Attachments ({documents.length})</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {documents.map((doc, index) => (
              <div key={index} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FileText className="h-5 w-5 text-red-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate text-sm">{doc.split('/').pop()}</p>
                    <p className="text-gray-400 text-xs">Document</p>
                  </div>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = doc;
                      link.download = doc.split('/').pop() || 'document';
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
          disabled={isLiking}
          className={`flex items-center space-x-2 transition-all duration-200 hover:scale-110 disabled:opacity-50 ${
            liked ? "text-red-500" : "hover:text-red-400"
          }`}
        >
          <Heart className={`h-5 w-5 ${liked ? "fill-current" : ""}`} />
          <span className="font-medium">{currentLikeCount}</span>
        </button>

        <button 
          onClick={() => setShowComments(!showComments)}
          className="flex items-center space-x-2 hover:text-blue-400 transition-all duration-200 hover:scale-110"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{commentCount}</span>
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
            <h4 className="text-white font-semibold mb-4">Comments ({commentCount})</h4>
            
            {/* Comment Input */}
            {user && (
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 ${getAvatarColor(user.role)} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {getInitials(user.fullName)}
                </div>
                <div className="flex-1 flex items-center space-x-2">
                  <Input
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Write a comment..."
                    className="flex-1 bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20"
                    disabled={isCommenting}
                  />
                  <Button
                    onClick={handleAddComment}
                    disabled={!commentText.trim() || isCommenting}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCommenting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Comments List */}
            <div className="space-y-4">
              {comments.map((comment) => (
                <div key={comment.id} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${getAvatarColor('STARTUP')} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                    {getInitials(comment.user.fullName)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-white text-sm">{comment.user.fullName}</span>
                        <span className="text-gray-500 text-xs">• {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}</span>
                      </div>
                      {comment.userId === user?.id && (
                        <button
                          onClick={() => handleDeleteComment(comment.id)}
                          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-gray-700/50 rounded"
                        >
                          <X className="h-3 w-3 text-gray-400 hover:text-red-400" />
                        </button>
                      )}
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