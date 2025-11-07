
import React, { useState } from "react"
import {
  Heart,
  MessageCircle,
  Share,
  MoreHorizontal,
  User,
  Calendar,
  FileText,
  Send,
  Trash2,
  Edit3,
  Briefcase,
  DollarSign,
  GraduationCap,
  Users,
  ChevronDown,
  ChevronUp,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useActivityFeed } from "@/hooks/useActivityFeed"
import { useAuthStore } from "@/store/authStore"
import toast from "react-hot-toast"

export interface ActivityPostProps {
  id: number
  text: string
  images?: string[]
  documents?: string[]
  created_at: string
  author: {
    id: number
    role: string
    full_name: string
    email: string
  }
  likes?: Array<{ id: number; user_id: number }>
  comments?: Array<{
    id: number
    user_id: number
    content: string
    created_at: string
    user?: { id: number; full_name?: string | null }
  }>
}

const CONTENT_CHAR_LIMIT = 600

export default function ActivityPost({
  id,
  text,
  images = [],
  documents = [],
  created_at,
  author,
  likes = [],
  comments = [],
}: ActivityPostProps) {
  const [showComments, setShowComments] = useState(false)
  const [commentText, setCommentText] = useState("")
  const [showMenu, setShowMenu] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)

  const { user } = useAuthStore()
  const { handleLikeToggle, handleCreateComment, isLiking, isCommenting } = useActivityFeed()

  const isTextLong = text.length > CONTENT_CHAR_LIMIT
  const displayText = isTextLong && !isExpanded ? `${text.substring(0, CONTENT_CHAR_LIMIT)}...` : text

  const isLiked = likes.some((like) => like.user_id === user?.id)
  const likeCount = likes.length
  const commentCount = comments.length
  const canEdit = author.id === user?.id
  const canDelete = author.id === user?.id

  const handleLike = () => handleLikeToggle(id, isLiked)

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      handleCreateComment(id, commentText.trim())
      setCommentText("")
    }
  }

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${id}`
    try {
      await navigator.clipboard.writeText(postUrl)
      toast.success("Link copied to clipboard!")
    } catch {
      toast.error("Failed to copy link.")
    }
  }

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true })
    } catch {
      return "Recently"
    }
  }

  const roleConfig = {
    STARTUP: { label: "Startup", color: "from-green-400 to-emerald-500", icon: Briefcase },
    INVESTOR: { label: "Investor", color: "from-yellow-400 to-amber-500", icon: DollarSign },
    STUDENT: { label: "Student", color: "from-blue-400 to-cyan-500", icon: GraduationCap },
    MENTOR: { label: "Mentor", color: "from-purple-400 to-indigo-500", icon: Users },
    ADMIN: { label: "Admin", color: "from-red-400 to-pink-500", icon: Users },
  } as const

  const RoleBadge = ({ role }: { role: keyof typeof roleConfig }) => {
    const r = roleConfig[role]
    if (!r) return null
    const Icon = r.icon
    return (
      <span
        className={`inline-flex items-center space-x-1 bg-gradient-to-r ${r.color} text-white px-2 py-1 text-xs font-medium rounded-full shadow-sm`}
      >
        <Icon className="h-3 w-3" />
        <span>{r.label}</span>
      </span>
    )
  }

  return (
    <article className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
            {author.full_name?.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-gray-900 text-lg">{author.full_name || "Anonymous"}</h3>
              {author.role && <RoleBadge role={author.role as keyof typeof roleConfig} />}
            </div>
            <div className="flex items-center text-gray-500 text-sm mt-1">
              <Calendar className="h-4 w-4 mr-1" />
              <span>{formatDate(created_at)}</span>
            </div>
          </div>
        </div>

        {(canEdit || canDelete) && (
          <div className="relative">
            <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg hover:bg-gray-100">
              <MoreHorizontal className="h-5 w-5 text-gray-500" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
                {canEdit && (
                  <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
                    <Edit3 className="h-4 w-4 mr-2" /> Edit Post
                  </button>
                )}
                {canDelete && (
                  <button className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 w-full">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete Post
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">{displayText}</p>
      {isTextLong && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-500 font-medium text-sm flex items-center"
        >
          {isExpanded ? "Read Less" : "Read More"}
          {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
        </button>
      )}

      {/* Images */}
      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt=""
              className="w-full h-48 object-cover rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition"
            />
          ))}
        </div>
      )}

      {/* Documents */}
      {documents.length > 0 && (
        <div className="mt-4 space-y-2">
          {documents.map((doc, i) => (
            <a
              key={i}
              href={doc}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
            >
              <FileText className="h-5 w-5 text-red-500 mr-3" />
              <span className="text-gray-800 font-medium">Document {i + 1}</span>
            </a>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
              isLiked
                ? "bg-red-100 text-red-600 hover:bg-red-200"
                : "hover:bg-gray-100 text-gray-600"
            }`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span>{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{commentCount}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
          >
            <Share className="h-5 w-5" />
            <span>Share</span>
          </button>
        </div>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="mt-6 border-t border-gray-200 pt-4">
          <form onSubmit={handleComment} className="flex space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
              {user?.full_name?.charAt(0).toUpperCase() || "U"}
            </div>
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
              className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              disabled={!commentText.trim() || isCommenting}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>

          <div className="space-y-3">
            {comments.map((c) => (
              <div key={c.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {c.user?.full_name?.charAt(0).toUpperCase() || "?"}
                </div>
                <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-gray-900">{c.user?.full_name || "Unknown"}</span>
                    <span className="text-gray-400">{formatDate(c.created_at)}</span>
                  </div>
                  <p className="text-gray-800 text-sm">{c.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}