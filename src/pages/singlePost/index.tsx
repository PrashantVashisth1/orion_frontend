// // src/pages/SinglePost/index.tsx
// import { useParams } from "react-router-dom";
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// // import ActivityPost, { SinglePost } from "@/components/feed/my-activity-post";
// import { Loader2, Frown } from "lucide-react";
// import { usePost, useLikePost, useUnlikePost } from "@/hooks/usePosts";
// import { useCreateComment } from "@/hooks/useComments";
// // import { SinglePost } from "@/components/feed/my-activity-post";

// export default function SinglePostPage() {
//   const { id } = useParams<{ id: string }>();
//   const postId = id ? parseInt(id) : undefined;

//   const { data: post, isLoading, error } = usePost(postId);
  
//   const likePostMutation = useLikePost();
//   const unlikePostMutation = useUnlikePost();
//   const createCommentMutation = useCreateComment();

//   const handleLikeToggle = async (isLiked: boolean) => {
//     if (postId) {
//       try {
//         if (isLiked) {
//           await unlikePostMutation.mutateAsync(postId);
//         } else {
//           await likePostMutation.mutateAsync(postId);
//         }
//       } catch (err) {
//         console.error("Like toggle error:", err);
//       }
//     }
//   };

//   const handleCreateComment = async (content: string) => {
//     if (postId) {
//       try {
//         await createCommentMutation.mutateAsync({ postId, content });
//       } catch (err) {
//         console.error("Create comment error:", err);
//       }
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-900 flex flex-col">
//       <Navbarpostlogin />
//       <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1">
//         <h1 className="text-3xl font-bold text-white mb-8">Post Details</h1>
//         {isLoading ? (
//           <div className="flex flex-col items-center justify-center py-12">
//             <Loader2 className="h-10 w-10 text-blue-400 animate-spin mb-4" />
//             <p className="text-gray-400">Loading post...</p>
//           </div>
//         ) : error ? (
//           <div className="flex flex-col items-center justify-center py-12 text-red-400">
//             <Frown className="h-12 w-12 mb-4" />
//             <p className="text-lg">Failed to load post. Please try again.</p>
//           </div>
//         ) : post ? (
//           <SinglePost
//             {...post} 
//             handleLikeToggle={handleLikeToggle}
//             handleCreateComment={handleCreateComment}
//             isLiking={likePostMutation.isPending || unlikePostMutation.isPending}
//             isCommenting={createCommentMutation.isPending}
//           />
//         ) : (
//           <div className="flex flex-col items-center justify-center py-12 text-gray-400">
//             <Frown className="h-12 w-12 mb-4" />
//             <p className="text-lg">No post found.</p>
//           </div>
//         )}
//       </div>
//       <Footer />
//     </div>
//   );
// }