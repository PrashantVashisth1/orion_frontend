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
  ChevronDown, // Import ChevronDown
  ChevronUp,   // Import ChevronUp
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useActivityFeed } from "@/hooks/useActivityFeed";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";

// import type { Post } from '@/lib/my-api-client';

export interface ActivityPostProps {
  id: number;
  text: string;
  images?: string[];
  documents?: string[];
  created_at: string;
  author: {
    id: number;
    role: string;
    full_name: string;
    email: string;
  };
  likes?: Array<{
    id: number;
    user_id: number;
  }>;
  comments?: Array<{
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    user: {
      id: number;
      full_name: string;
    };
  }>;
  // handleLikeToggle: (isLiked: boolean) => void;
  // handleCreateComment: (commentText: string) => void;
  // // handleDeleteComment: (commentId: number) => void;
  // isLiking: boolean;
  // isCommenting: boolean;
  // canDelete?: boolean;
  // canEdit?: boolean;
}

export interface SinglePostProps {
  id: number;
  text: string;
  images?: string[];
  documents?: string[];
  created_at: string;
  author: {
    id: number;
    role: string;
    full_name: string;
    email: string;
  };
  likes?: Array<{
    id: number;
    user_id: number;
  }>;
  comments?: Array<{
    id: number;
    user_id: number;
    content: string;
    created_at: string;
    user: {
      id: number;
      full_name: string;
    };
  }>;
  handleLikeToggle: (isLiked: boolean) => void;
  handleCreateComment: (commentText: string) => void;
  // handleDeleteComment: (commentId: number) => void;
  isLiking: boolean;
  isCommenting: boolean;
  canDelete?: boolean;
  canEdit?: boolean;
}

// // Define character limit for truncation
const CONTENT_CHAR_LIMIT = 600; // You can adjust this value

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

  // --- Read More State ---
  const [isExpanded, setIsExpanded] = useState(false);
  const isTextLong = text.length > CONTENT_CHAR_LIMIT;
  const displayText =
    isTextLong && !isExpanded
      ? `${text.substring(0, CONTENT_CHAR_LIMIT)}...`
      : text;
  // --- End Read More State ---

  const { user } = useAuthStore();
  // const { toast } = useToast(); // Initialized useToast hook

  const {
    handleLikeToggle,
    handleCreateComment,
    // handleDeleteComment,
    isLiking,
    isCommenting,
  } = useActivityFeed();

  // Calculate derived values
  const isLiked = likes.some((like) => like.user_id === user?.id);
  const likeCount = likes.length;
  const commentCount = comments.length;
  const canEdit = author.id === user?.id;
  const canDelete = author.id === user?.id;

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

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), { addSuffix: true });
    } catch {
      return "Recently";
    }
  };

  const roleConfig = {
    STARTUP: {
      label: "Startup",
      bgColor: "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
      textColor: "text-emerald-400",
      borderColor: "border-emerald-500/30",
      icon: Briefcase,
    },
    INVESTOR: {
      label: "Investor",
      bgColor: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
      textColor: "text-amber-400",
      borderColor: "border-amber-500/30",
      icon: DollarSign,
    },
    STUDENT: {
      label: "Student",
      bgColor: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
      textColor: "text-blue-400",
      borderColor: "border-blue-500/30",
      icon: GraduationCap,
    },
    MENTOR: {
      label: "Mentor",
      bgColor: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
      textColor: "text-purple-400",
      borderColor: "border-purple-500/30",
      icon: Users,
    },
    ADMIN: {
      label: "Admin",
      bgColor: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
      textColor: "text-red-400",
      borderColor: "border-red-500/30",
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
    <article className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-purple-500/30 transition-all duration-300">
      {/* Post Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {author.full_name?.charAt(0).toUpperCase() || (
              <User className="h-6 w-6" />
            )}
          </div>
          <div>
            <div className="flex items-center space-x-3">
              <h3 className="font-semibold text-white text-lg">
                {author.full_name || "Anonymous User"}
              </h3>
              {author.role && <RoleBadge role={author.role as UserRole} />}
            </div>
            <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(created_at)}</span>
            </div>
          </div>
        </div>

        {(canEdit || canDelete) && (
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
            >
              <MoreHorizontal className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
            </button>
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl z-10 overflow-hidden">
                {canEdit && (
                  <button className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Post</span>
                  </button>
                )}
                {canDelete && (
                  <button className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
                    <Trash2 className="h-4 w-4" />
                    <span>Delete Post</span>
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
        <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">
          {displayText}
        </p>

        {/* ADDED: Read More/Less Button */}
        {isTextLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center mt-2"
          >
            {isExpanded ? "Read Less" : "Read More"}
            {isExpanded ? (
              <ChevronUp className="ml-1 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-1 h-4 w-4" />
            )}
          </button>
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
                className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors group"
              >
                <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1">
                  <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
                    Document {index + 1}
                  </p>
                  <p className="text-gray-400 text-sm">Click to view</p>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>

      {/* Post Actions */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center space-x-6">
          <button
            onClick={handleLike}
            disabled={isLiking}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
              isLiked
                ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
                : "text-gray-400 hover:text-red-500 hover:bg-red-500/10"
            } disabled:opacity-50`}
          >
            <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
            <span className="font-medium">{likeCount}</span>
          </button>

          <button
            onClick={() => setShowComments(!showComments)}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-200"
          >
            <MessageCircle className="h-5 w-5" />
            <span className="font-medium">{commentCount}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-all duration-200"
          >
            <Share className="h-5 w-5" />
            <span className="font-medium">Share</span>
          </button>
        </div>
      </div>

      {/* Comments Section */}
      {showComments && (
        <div className="mt-6 pt-6 border-t border-gray-700/50">
          {/* Add Comment Form */}
          <form onSubmit={handleComment} className="mb-6">
            <div className="flex space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                {user?.full_name?.charAt(0).toUpperCase() || "Y"}
              </div>
              <div className="flex-1 flex space-x-2">
                <input
                  type="text"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
                  disabled={isCommenting}
                />
                <button
                  type="submit"
                  disabled={!commentText.trim() || isCommenting}
                  className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-4">
            {/* {console.log(comments)} */}
            {comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {comment.user.full_name?.charAt(0).toUpperCase() || (
                    <User className="h-4 w-4" />
                  )}
                </div>
                <div className="flex-1 bg-gray-700/30 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <h4 className="font-medium text-white text-sm">
                      {comment.user.full_name}
                    </h4>
                    <span className="text-gray-500 text-xs">
                      {formatDate(comment.created_at)}
                    </span>
                  </div>
                  <p className="text-gray-200 text-sm">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

// export function SinglePost({
//   id,
//   text,
//   images = [],
//   documents = [],
//   created_at,
//   author,
//   likes = [],
//   comments = [],
// }: SinglePostProps) {
//   const [showComments, setShowComments] = useState(false);
//   const [commentText, setCommentText] = useState("");
//   const [showMenu, setShowMenu] = useState(false);

//   // --- Read More State ---
//   const [isExpanded, setIsExpanded] = useState(false);
//   const isTextLong = text.length > CONTENT_CHAR_LIMIT;
//   const displayText =
//     isTextLong && !isExpanded
//       ? `${text.substring(0, CONTENT_CHAR_LIMIT)}...`
//       : text;
//   // --- End Read More State ---

//   const { user } = useAuthStore();
//   // const { toast } = useToast(); // Initialized useToast hook

//   const {
//     handleLikeToggle,
//     handleCreateComment,
//     // handleDeleteComment,
//     isLiking,
//     isCommenting,
//   } = useActivityFeed();

//   // Calculate derived values
//   const isLiked = likes.some((like) => like.user_id === user?.id);
//   const likeCount = likes.length;
//   const commentCount = comments.length;
//   const canEdit = author.id === user?.id;
//   const canDelete = author.id === user?.id;

//   const handleLike = () => {
//     handleLikeToggle(id, isLiked);
//   };

//   const handleComment = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (commentText.trim()) {
//       handleCreateComment(id, commentText.trim());
//       setCommentText("");
//     }
//   };

//   const handleShare = async () => {
//     const postUrl = `${window.location.origin}/post/${id}`;
//     try {
//       await navigator.clipboard.writeText(postUrl);
//       toast.success("Link copied to clipboard!");
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//       toast.error("Failed to copy link. Please try again.");
//     }
//   };

//   const formatDate = (date: string) => {
//     try {
//       return formatDistanceToNow(new Date(date), { addSuffix: true });
//     } catch {
//       return "Recently";
//     }
//   };

//   const roleConfig = {
//     STARTUP: {
//       label: "Startup",
//       bgColor: "bg-gradient-to-r from-emerald-500/20 to-green-500/20",
//       textColor: "text-emerald-400",
//       borderColor: "border-emerald-500/30",
//       icon: Briefcase,
//     },
//     INVESTOR: {
//       label: "Investor",
//       bgColor: "bg-gradient-to-r from-amber-500/20 to-yellow-500/20",
//       textColor: "text-amber-400",
//       borderColor: "border-amber-500/30",
//       icon: DollarSign,
//     },
//     STUDENT: {
//       label: "Student",
//       bgColor: "bg-gradient-to-r from-blue-500/20 to-cyan-500/20",
//       textColor: "text-blue-400",
//       borderColor: "border-blue-500/30",
//       icon: GraduationCap,
//     },
//     MENTOR: {
//       label: "Mentor",
//       bgColor: "bg-gradient-to-r from-purple-500/20 to-indigo-500/20",
//       textColor: "text-purple-400",
//       borderColor: "border-purple-500/30",
//       icon: Users,
//     },
//     ADMIN: {
//       label: "Admin",
//       bgColor: "bg-gradient-to-r from-red-500/20 to-pink-500/20",
//       textColor: "text-red-400",
//       borderColor: "border-red-500/30",
//       icon: Users,
//     },
//   } as const;

//   type UserRole = "STARTUP" | "INVESTOR" | "STUDENT" | "MENTOR" | "ADMIN";

//   const RoleBadge = ({ role }: { role: UserRole }) => {
//     const config = roleConfig[role];
//     if (!config) return null;

//     const Icon = config.icon;

//     return (
//       <span
//         className={`
//       inline-flex items-center space-x-1 rounded-full border backdrop-blur-sm
//       px-2 py-1 text-xs font-medium transition-all duration-200 hover:scale-105
//       ${config.bgColor} 
//       ${config.textColor} 
//       ${config.borderColor}
//     `}
//       >
//         <Icon className="h-3 w-3" />
//         <span>{config.label}</span>
//       </span>
//     );
//   };

//   return (
//     <article className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 shadow-xl hover:border-purple-500/30 transition-all duration-300">
//       {/* Post Header */}
//       <div className="flex items-start justify-between mb-4">
//         <div className="flex items-center space-x-3">
//           <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
//             {author.full_name?.charAt(0).toUpperCase() || (
//               <User className="h-6 w-6" />
//             )}
//           </div>
//           <div>
//             <div className="flex items-center space-x-3">
//               <h3 className="font-semibold text-white text-lg">
//                 {author.full_name || "Anonymous User"}
//               </h3>
//               {author.role && <RoleBadge role={author.role as UserRole} />}
//             </div>
//             <div className="flex items-center space-x-2 text-gray-400 text-sm mt-1">
//               <Calendar className="h-4 w-4" />
//               <span>{formatDate(created_at)}</span>
//             </div>
//           </div>
//         </div>

//         {(canEdit || canDelete) && (
//           <div className="relative">
//             <button
//               onClick={() => setShowMenu(!showMenu)}
//               className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors group"
//             >
//               <MoreHorizontal className="h-5 w-5 text-gray-400 group-hover:text-gray-300" />
//             </button>
//             {showMenu && (
//               <div className="absolute right-0 mt-2 w-48 bg-gray-800/95 backdrop-blur-sm rounded-lg border border-gray-700 shadow-xl z-10 overflow-hidden">
//                 {canEdit && (
//                   <button className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-white transition-all duration-200">
//                     <Edit3 className="h-4 w-4" />
//                     <span>Edit Post</span>
//                   </button>
//                 )}
//                 {canDelete && (
//                   <button className="flex items-center space-x-2 w-full px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-200">
//                     <Trash2 className="h-4 w-4" />
//                     <span>Delete Post</span>
//                   </button>
//                 )}
//               </div>
//             )}
//           </div>
//         )}
//       </div>

//       {/* Post Content */}
//       <div className="mb-6">
//         {/* MODIFIED: Added whitespace-pre-wrap to respect line breaks */}
//         <p className="text-gray-200 leading-relaxed text-lg whitespace-pre-wrap">
//           {displayText}
//         </p>

//         {/* ADDED: Read More/Less Button */}
//         {isTextLong && (
//           <button
//             onClick={() => setIsExpanded(!isExpanded)}
//             className="text-blue-400 hover:text-blue-300 font-medium text-sm flex items-center mt-2"
//           >
//             {isExpanded ? "Read Less" : "Read More"}
//             {isExpanded ? (
//               <ChevronUp className="ml-1 h-4 w-4" />
//             ) : (
//               <ChevronDown className="ml-1 h-4 w-4" />
//             )}
//           </button>
//         )}

//         {/* Images */}
//         {images.length > 0 && (
//           <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//             {images.map((image, index) => (
//               <div
//                 key={index}
//                 className="relative group overflow-hidden rounded-xl"
//               >
//                 <img
//                   src={image}
//                   alt={`Post image ${index + 1}`}
//                   className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
//                   onError={(e) => {
//                     const target = e.target as HTMLImageElement;
//                     target.style.display = "none";
//                   }}
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Documents */}
//         {documents.length > 0 && (
//           <div className="mt-4 space-y-2">
//             {documents.map((doc, index) => (
//               <a
//                 key={index}
//                 href={doc}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-600/50 transition-colors group"
//               >
//                 <div className="w-10 h-10 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-lg flex items-center justify-center">
//                   <FileText className="h-5 w-5 text-red-400" />
//                 </div>
//                 <div className="flex-1">
//                   <p className="text-white font-medium group-hover:text-blue-400 transition-colors">
//                     Document {index + 1}
//                   </p>
//                   <p className="text-gray-400 text-sm">Click to view</p>
//                 </div>
//               </a>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Post Actions */}
//       <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
//         <div className="flex items-center space-x-6">
//           <button
//             onClick={handleLike}
//             disabled={isLiking}
//             className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
//               isLiked
//                 ? "text-red-500 bg-red-500/10 hover:bg-red-500/20"
//                 : "text-gray-400 hover:text-red-500 hover:bg-red-500/10"
//             } disabled:opacity-50`}
//           >
//             <Heart className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`} />
//             <span className="font-medium">{likeCount}</span>
//           </button>

//           <button
//             onClick={() => setShowComments(!showComments)}
//             className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-blue-500 hover:bg-blue-500/10 transition-all duration-200"
//           >
//             <MessageCircle className="h-5 w-5" />
//             <span className="font-medium">{commentCount}</span>
//           </button>

//           <button
//             onClick={handleShare}
//             className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-400 hover:text-green-500 hover:bg-green-500/10 transition-all duration-200"
//           >
//             <Share className="h-5 w-5" />
//             <span className="font-medium">Share</span>
//           </button>
//         </div>
//       </div>

//       {/* Comments Section */}
//       {showComments && (
//         <div className="mt-6 pt-6 border-t border-gray-700/50">
//           {/* Add Comment Form */}
//           <form onSubmit={handleComment} className="mb-6">
//             <div className="flex space-x-3">
//               <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                 {user?.full_name?.charAt(0).toUpperCase() || "Y"}
//               </div>
//               <div className="flex-1 flex space-x-2">
//                 <input
//                   type="text"
//                   value={commentText}
//                   onChange={(e) => setCommentText(e.target.value)}
//                   placeholder="Write a comment..."
//                   className="flex-1 bg-gray-700/50 border border-gray-600/50 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none"
//                   disabled={isCommenting}
//                 />
//                 <button
//                   type="submit"
//                   disabled={!commentText.trim() || isCommenting}
//                   className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                   <Send className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </form>

//           {/* Comments List */}
//           <div className="space-y-4">
//             {/* {console.log(comments)} */}
//             {comments.map((comment) => (
//               <div key={comment.id} className="flex space-x-3">
//                 <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
//                   {comment.user.full_name?.charAt(0).toUpperCase() || (
//                     <User className="h-4 w-4" />
//                   )}
//                 </div>
//                 <div className="flex-1 bg-gray-700/30 rounded-lg p-3">
//                   <div className="flex items-center justify-between mb-1">
//                     <h4 className="font-medium text-white text-sm">
//                       {comment.user.full_name}
//                     </h4>
//                     <span className="text-gray-500 text-xs">
//                       {formatDate(comment.created_at)}
//                     </span>
//                   </div>
//                   <p className="text-gray-200 text-sm">{comment.content}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </article>
//   );
// }

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
