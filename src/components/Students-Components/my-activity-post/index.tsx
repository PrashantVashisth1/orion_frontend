
// import React, { useState } from "react"
// import {
//   Heart,
//   MessageCircle,
//   Share,
//   MoreHorizontal,
//   User,
//   Calendar,
//   FileText,
//   Send,
//   Trash2,
//   Edit3,
//   Briefcase,
//   DollarSign,
//   GraduationCap,
//   Users,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react"
// import { formatDistanceToNow } from "date-fns"
// import { useActivityFeed } from "@/hooks/useActivityFeed"
// import { useAuthStore } from "@/store/authStore"
// import toast from "react-hot-toast"

// export interface ActivityPostProps {
//   id: number
//   text: string
//   images?: string[]
//   documents?: string[]
//   created_at: string
//   author: {
//     id: number
//     role: string
//     full_name: string
//     email: string
//   }
//   likes?: Array<{ id: number; user_id: number }>
//   comments?: Array<{
//     id: number
//     user_id: number
//     content: string
//     created_at: string
//     user?: { id: number; full_name?: string | null }
//   }>
// }

// const CONTENT_CHAR_LIMIT = 600

// export default function ActivityPost({
//   id,
//   text,
//   images = [],
//   documents = [],
//   created_at,
//   author,
//   likes = [],
//   comments = [],
// }: ActivityPostProps) {
//   const [showComments, setShowComments] = useState(false)
//   const [commentText, setCommentText] = useState("")
//   const [showMenu, setShowMenu] = useState(false)
//   const [isExpanded, setIsExpanded] = useState(false)

//   const { user } = useAuthStore()
//   const { handleLikeToggle, handleCreateComment, isLiking, isCommenting } = useActivityFeed()

//   const isTextLong = text.length > CONTENT_CHAR_LIMIT
//   const displayText = isTextLong && !isExpanded ? `${text.substring(0, CONTENT_CHAR_LIMIT)}...` : text

//   const isLiked = likes.some((like) => like.user_id === user?.id)
//   const likeCount = likes.length
//   const commentCount = comments.length
//   const canEdit = author.id === user?.id
//   const canDelete = author.id === user?.id

//   const handleLike = () => handleLikeToggle(id, isLiked)

//   const handleComment = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (commentText.trim()) {
//       handleCreateComment(id, commentText.trim())
//       setCommentText("")
//     }
//   }

//   const handleShare = async () => {
//     const postUrl = `${window.location.origin}/post/${id}`
//     try {
//       await navigator.clipboard.writeText(postUrl)
//       toast.success("Link copied to clipboard!")
//     } catch {
//       toast.error("Failed to copy link.")
//     }
//   }

//   const formatDate = (date: string) => {
//     try {
//       return formatDistanceToNow(new Date(date), { addSuffix: true })
//     } catch {
//       return "Recently"
//     }
//   }

//   const roleConfig = {
//     STARTUP: { label: "Startup", color: "from-green-400 to-emerald-500", icon: Briefcase },
//     INVESTOR: { label: "Investor", color: "from-yellow-400 to-amber-500", icon: DollarSign },
//     STUDENT: { label: "Student", color: "from-blue-400 to-cyan-500", icon: GraduationCap },
//     MENTOR: { label: "Mentor", color: "from-purple-400 to-indigo-500", icon: Users },
//     ADMIN: { label: "Admin", color: "from-red-400 to-pink-500", icon: Users },
//   } as const

//   const RoleBadge = ({ role }: { role: keyof typeof roleConfig }) => {
//     const r = roleConfig[role]
//     if (!r) return null
//     const Icon = r.icon
//     return (
//       <span
//         className={`inline-flex items-center space-x-1 bg-gradient-to-r ${r.color} text-white px-2 py-1 text-xs font-medium rounded-full shadow-sm`}
//       >
//         <Icon className="h-3 w-3" />
//         <span>{r.label}</span>
//       </span>
//     )
//   }

//   return (
//     <article className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200 shadow-md hover:shadow-xl transition-all duration-300">
//       {/* Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md">
//             {author.full_name?.charAt(0).toUpperCase() || <User className="h-6 w-6" />}
//           </div>
//           <div>
//             <div className="flex items-center space-x-3">
//               <h3 className="font-semibold text-gray-900 text-lg">{author.full_name || "Anonymous"}</h3>
//               {author.role && <RoleBadge role={author.role as keyof typeof roleConfig} />}
//             </div>
//             <div className="flex items-center text-gray-500 text-sm mt-1">
//               <Calendar className="h-4 w-4 mr-1" />
//               <span>{formatDate(created_at)}</span>
//             </div>
//           </div>
//         </div>

//         {(canEdit || canDelete) && (
//           <div className="relative">
//             <button onClick={() => setShowMenu(!showMenu)} className="p-2 rounded-lg hover:bg-gray-100">
//               <MoreHorizontal className="h-5 w-5 text-gray-500" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">
//                 {canEdit && (
//                   <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full">
//                     <Edit3 className="h-4 w-4 mr-2" /> Edit Post
//                   </button>
//                 )}
//                 {canDelete && (
//                   <button className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 w-full">
//                     <Trash2 className="h-4 w-4 mr-2" /> Delete Post
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Content */}
//       <p className="text-gray-800 leading-relaxed whitespace-pre-wrap mb-4">{displayText}</p>
//       {isTextLong && (
//         <button
//           onClick={() => setIsExpanded(!isExpanded)}
//           className="text-blue-600 hover:text-blue-500 font-medium text-sm flex items-center"
//         >
//           {isExpanded ? "Read Less" : "Read More"}
//           {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
//         </button>
//       )}

//       {/* Images */}
//       {images.length > 0 && (
//         <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
//           {images.map((img, i) => (
//             <img
//               key={i}
//               src={img}
//               alt=""
//               className="w-full h-48 object-cover rounded-xl shadow-sm hover:shadow-md hover:scale-[1.02] transition"
//             />
//           ))}
//         </div>
//       )}

//       {/* Documents */}
//       {documents.length > 0 && (
//         <div className="mt-4 space-y-2">
//           {documents.map((doc, i) => (
//             <a
//               key={i}
//               href={doc}
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
//             >
//               <FileText className="h-5 w-5 text-red-500 mr-3" />
//               <span className="text-gray-800 font-medium">Document {i + 1}</span>
//             </a>
//           ))}
//         </div>
//       )}

//       {/* Actions */}
//       <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200">
//         <div className="flex items-center space-x-4">
//           <button
//             onClick={handleLike}
//             disabled={isLiking}
//             className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition ${
//               isLiked
//                 ? "bg-red-100 text-red-600 hover:bg-red-200"
//                 : "hover:bg-gray-100 text-gray-600"
//             }`}
//           >
//             <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
//             <span>{likeCount}</span>
//           </button>

//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition"
//           >
//             <MessageCircle className="h-5 w-5" />
//             <span>{commentCount}</span>
//           </button>

//           <button
//             onClick={handleShare}
//             className="flex items-center space-x-2 px-3 py-2 rounded-lg text-gray-600 hover:bg-green-50 hover:text-green-600 transition"
//           >
//             <Share className="h-5 w-5" />
//             <span>Share</span>
//           </button>
//         </div>
//       </div>

//       {/* Comments */}
//       {showComments && (
//         <div className="mt-6 border-t border-gray-200 pt-4">
//           <form onSubmit={handleComment} className="flex space-x-2 mb-4">
//             <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
//               {user?.full_name?.charAt(0).toUpperCase() || "U"}
//             </div>
//             <input
//               type="text"
//               value={commentText}
//               onChange={(e) => setCommentText(e.target.value)}
//               placeholder="Write a comment..."
//               className="flex-1 bg-gray-100 border border-gray-200 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             />
//             <button
//               type="submit"
//               disabled={!commentText.trim() || isCommenting}
//               className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50"
//             >
//               <Send className="h-4 w-4" />
//             </button>
//           </form>

//           <div className="space-y-3">
//             {comments.map((c) => (
//               <div key={c.id} className="flex space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
//                   {c.user?.full_name?.charAt(0).toUpperCase() || "?"}
//                 </div>
//                 <div className="flex-1 bg-gray-100 rounded-lg px-4 py-2">
//                   <div className="flex justify-between text-sm mb-1">
//                     <span className="font-medium text-gray-900">{c.user?.full_name || "Unknown"}</span>
//                     <span className="text-gray-400">{formatDate(c.created_at)}</span>
//                   </div>
//                   <p className="text-gray-800 text-sm">{c.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </article>
//   )
// }

import React, { useState } from "react";
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
  Loader2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
// Assuming these custom hooks/stores exist and are correct
import { useActivityFeed } from "@/hooks/useActivityFeed"; 
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { useUpdatePost, useDeletePost } from "@/hooks/usePosts";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

// --- INTERFACES (Moved to the top for proper scoping) ---

export interface AuthorProfile {
  personal_info?: {
    profile_picture: string | null;
  };
  company_details?: {
    company_logo: string | null;
    company_name: string | null;
  };
}

export interface PostAuthor {
  id: number;
  role: string;
  full_name: string;
  email: string;
  startup_profile: AuthorProfile | null;
}

export interface CommentAuthor {
  id: number;
  full_name: string;
  role: string;
  startup_profile: AuthorProfile | null;
}

export interface PostComment {
  id: number;
  user_id: number;
  content: string;
  created_at: string;
  user: CommentAuthor;
}

export interface ActivityPostProps {
  id: number;
  text: string;
  images?: string[];
  documents?: string[];
  created_at: string;
  author: PostAuthor;
  likes?: Array<{
    id: number;
    user_id: number;
  }>;
  comments?: Array<PostComment>;
}
// Removed the redundant/incomplete SinglePostProps and SinglePost component definition

// --- HELPER FUNCTIONS ---

const getAuthorInfo = (author: PostAuthor | CommentAuthor | undefined) => {
  if (!author) {
    return {
      avatarUrl: null,
      name: "Anonymous User",
      subtext: "User not found",
      // Light theme avatar fallback text
      fallback: <User className="h-6 w-6 text-gray-500" />,
    };
  }
  let avatarUrl: string | null = null;
  let name = author.full_name;
  let subtext = author.role.toLowerCase();
  
  if (author.role === 'STARTUP' && author.startup_profile) {
    avatarUrl = author.startup_profile.company_details?.company_logo || null;
    name = author.startup_profile.company_details?.company_name || author.full_name; 
    subtext = author.full_name; 
  } 
  else if (author.role !== 'STARTUP' && author.startup_profile?.personal_info?.profile_picture) {
    avatarUrl = author.startup_profile.personal_info.profile_picture;
  }

  // Generate a fallback (initials)
  const fallback = name?.charAt(0).toUpperCase() || <User className="h-6 w-6 text-white" />;

  return { avatarUrl, name, subtext, fallback };
};

const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

const CONTENT_CHAR_LIMIT = 600;

// --- MAIN COMPONENT ---

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
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [isExpanded, setIsExpanded] = useState(false);
  
  // --- HOOK USAGE (Moved inside the component) ---
  const { user } = useAuthStore();
  const {
    handleLikeToggle,
    handleCreateComment,
    // handleDeleteComment,
    isLiking,
    isCommenting,
  } = useActivityFeed();

  const { mutate: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost();
  // --- END HOOK USAGE ---


  const isTextLong = text.length > CONTENT_CHAR_LIMIT;
  const displayText =
    isTextLong && !isExpanded
      ? `${text.substring(0, CONTENT_CHAR_LIMIT)}...`
      : text;

  const isLiked = likes.some((like) => like.user_id === user?.id);
  const likeCount = likes.length;
  const commentCount = comments.length;
  const canEdit = author.id === user?.id;
  const canDelete = author.id === user?.id;

  const handleDeleteClick = () => {
    setShowMenu(false); 
    if (window.confirm("Are you sure you want to delete this post?")) {
      deletePost(id);
    }
  };

  const handleUpdateClick = () => {
    if (editText.trim() === "") {
      return toast.error("Post cannot be empty.");
    }
    updatePost({ postId: id, text: editText }, {
      onSuccess: () => {
        setIsEditing(false); 
        setShowMenu(false); 
      }
    });
  };

  const handleEditClick = () => {
    setEditText(text); 
    setIsEditing(true);
    setShowMenu(false);
  };


  const handleLike = () => {
    handleLikeToggle(id, isLiked);
  };

  const handleComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentText.trim()) {
      handleCreateComment(id, commentText.trim());
      setCommentText("");
    }
  };

  const handleShare = async () => {
    const postUrl = `${window.location.origin}/post/${id}`;
    try {
      await navigator.clipboard.writeText(postUrl);
      toast.success("Link copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy link. Please try again.");
    }
  };

  const authorInfo = getAuthorInfo(author);


  const roleConfig = {
    STARTUP: {
      label: "Startup",
      // Light theme colors
      bgColor: "bg-gradient-to-r from-emerald-100/50 to-green-100/50",
      textColor: "text-emerald-700",
      borderColor: "border-emerald-300/50",
      icon: Briefcase,
    },
    INVESTOR: {
      label: "Investor",
      // Light theme colors
      bgColor: "bg-gradient-to-r from-amber-100/50 to-yellow-100/50",
      textColor: "text-amber-700",
      borderColor: "border-amber-300/50",
      icon: DollarSign,
    },
    STUDENT: {
      label: "Student",
      // Light theme colors
      bgColor: "bg-gradient-to-r from-blue-100/50 to-cyan-100/50",
      textColor: "text-blue-700",
      borderColor: "border-blue-300/50",
      icon: GraduationCap,
    },
    MENTOR: {
      label: "Mentor",
      // Light theme colors
      bgColor: "bg-gradient-to-r from-purple-100/50 to-indigo-100/50",
      textColor: "text-purple-700",
      borderColor: "border-purple-300/50",
      icon: Users,
    },
    ADMIN: {
      label: "Admin",
      // Light theme colors
      bgColor: "bg-gradient-to-r from-red-100/50 to-pink-100/50",
      textColor: "text-red-700",
      borderColor: "border-red-300/50",
      icon: Users,
    },
  } as const;

  type UserRole = "STARTUP" | "INVESTOR" | "STUDENT" | "MENTOR" | "ADMIN";

  const RoleBadge = ({ role }: { role: UserRole }) => {
    const config = roleConfig[role];
    if (!config) return null;

    const Icon = config.icon;

    return (
      <span
        className={`
      inline-flex items-center space-x-1 rounded-full border backdrop-blur-sm
      px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105
      ${config.bgColor} 
      ${config.textColor} 
      ${config.borderColor}
    `}
      >
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  return (
    // Main Post Container: Background changed to light gray/white
    <article className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 shadow-lg hover:border-blue-300/50 transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          {/* Avatar Container: Retain vibrant gradient/color for visual punch */}
          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md overflow-hidden flex-shrink-0">
            {authorInfo.avatarUrl ? (
              <img src={authorInfo.avatarUrl} alt={authorInfo.name} className="w-full h-full object-cover" />
            ) : (
                authorInfo.fallback
            )}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              {/* Name text changed to dark */}
              <h3 className="font-semibold text-gray-900 text-lg">
                {authorInfo.name || "Anonymous User"}
              </h3>
              {author.role && <RoleBadge role={author.role as UserRole} />}
            </div>
            {/* Date text changed to medium gray */}
            <div className="flex items-center space-x-2 text-gray-500 text-sm mt-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(created_at)}</span>
            </div>
          </div>
        </div>

        {(canEdit || canDelete) && !isEditing && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              // Button hover background changed to light gray
              className="p-2 hover:bg-gray-100/50 rounded-lg transition-colors group"
            >
              {/* Icon color changed to dark gray */}
              <MoreHorizontal className="h-5 w-5 text-gray-500 group-hover:text-gray-700" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-sm rounded-lg border border-gray-200 shadow-xl z-10 overflow-hidden">
                {canEdit && (
                  <button onClick={handleEditClick} className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-100/50 hover:text-gray-900 transition-all duration-200">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Post</span>
                  </button>
                )}
                {canDelete && (
                  <button onClick={handleDeleteClick} disabled={isDeleting} className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-600 hover:bg-red-100/50 hover:text-red-700 transition-all duration-200">
                    {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    <span>{isDeleting ? "Deleting..." : "Delete Post"}</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Post Content */}
      <div className="mb-6">
        {/* MODIFIED: Added whitespace-pre-wrap to respect line breaks */}
        {isEditing ? (
          <div className="space-y-3">
            <Textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              // Textarea colors changed to light theme
              className="bg-gray-100/50 border border-gray-300/50 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none"
              rows={5}
            />
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(false)}
                // Button colors changed to light theme
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleUpdateClick}
                disabled={isUpdating}
                // Button colors changed to light theme
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                {isUpdating ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
              </Button>
            </div>
          </div>
        ) : (
          <>
            {/* Post content text changed to dark gray */}
            <p className="text-gray-800 leading-relaxed text-lg whitespace-pre-wrap">
              {displayText}
            </p>
            {isTextLong && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                // Read more link text changed to dark blue
                className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center mt-2"
              >
                {isExpanded ? "Read Less" : "Read More"}
                {isExpanded ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />}
              </button>
            )}
          </>
        )}

        {/* Images */}
        {images.length > 0 && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl"
              >
                <img
                  src={image}
                  alt={`Post image ${index + 1}`}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                  }}
                />
                {/* Image overlay kept subtle/dark for image contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>
        )}

        {/* Documents */}
        {documents.length > 0 && (
          <div className="mt-4 space-y-2">
            {documents.map((doc, index) => (
              <a
                key={index}
                href={doc}
                target="_blank"
                rel="noopener noreferrer"
                // Document card colors changed to light theme
                className="flex items-center space-x-3 p-3 bg-gray-100/50 rounded-lg hover:bg-gray-200/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-red-100/50 to-orange-100/50 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-600" />
                </div>
                <div className="flex-1">
                  {/* Document text changed to dark gray */}
                  <p className="text-gray-900 font-medium group-hover:text-blue-600 transition-colors">
                    Document {index + 1}
                  </p>
                  <p className="text-gray-500 text-sm">Click to view</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200/50">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            // Like button colors changed for light theme
            className={`flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isLiked
                ? "text-red-600 bg-red-300/50 hover:bg-red-200 "
                : "text-gray-500 hover:text-red-600 hover:bg-red-100/50"
            } disabled:opacity-50`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            {/* Text color changed to dark gray */}
            <span className="font-medium text-gray-700">{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            // Comment button colors changed for light theme
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg text-gray-500 hover:text-blue-600 hover:bg-blue-100/50 transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            {/* Text color changed to dark gray */}
            <span className="font-medium text-gray-700">{commentCount}</span>
          </button>

          <button
            onClick={handleShare}
            // Share button colors changed for light theme
            className="flex items-center cursor-pointer space-x-2 px-4 py-2 rounded-lg text-gray-500 hover:text-green-600 hover:bg-green-100/50 transition-all duration-200"
          >
            <Share className="h-5 w-5" />
            <span className="font-medium text-gray-700">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t border-gray-200/50">
          {/* Add Comment Form */}
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex space-x-3">
              {/* User Avatar in form: Retain vibrant color, but adjust gradient for light theme */}
              <div className="w-8 h-8 bg-gradient-to-r from-green-600 to-emerald-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.full_name?.charAt(0).toUpperCase() || "Y"}
              </div>
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  // Input colors changed to light theme
                  className="flex-1 bg-gray-100/50 border border-gray-300/50 rounded-lg px-4 py-2 text-gray-900 placeholder-gray-500 focus:border-purple-600 focus:ring-1 focus:ring-purple-600 focus:outline-none"
                  disabled={isCommenting}
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || isCommenting}
                  // Button colors retained vibrant purple, kept white text
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {comments.map((comment) => {
              // --- 12. Get Comment Author Info ---
              // Note: Your old prop was comment.user, new one is comment.author
              const commentAuthorInfo = getAuthorInfo(comment.user);
              return (
              <div key={comment.id} className="flex space-x-3">
                  {/* --- 13. Update Comment Avatar --- */}
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-sm overflow-hidden flex-shrink-0">
                    {commentAuthorInfo.avatarUrl ? (
                      <img src={commentAuthorInfo.avatarUrl} alt={commentAuthorInfo.name} className="w-full h-full object-cover" />
                    ) : (
                      commentAuthorInfo.fallback
                    )}
                </div>
                {/* Comment background changed to light gray */}
                <div className="flex-1 bg-gray-100/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                      {/* --- 14. Update Comment Name --- */}
                    <h4 className="font-medium text-gray-900 text-sm">
                     {commentAuthorInfo.name}
                   </h4>
                    {/* Date text changed to medium gray */}
                    <span className="text-gray-500 text-xs">
                      {formatDate(comment.created_at)}
                    </span>
                </div>
                  {/* Comment content text changed to dark gray */}
                  <p className="text-gray-800 text-sm">{comment.content}</p>
                </div>
              </div>
              );
            })}
          </div>
        </div>
      )}
    </article>
  );
}