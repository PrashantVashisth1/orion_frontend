import { apiClient, type Comment, type Post } from "@/lib/my-api-client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

// OPTIMISTIC CREATE COMMENT - Updates UI immediately
export const useCreateComment = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: ({ postId, content }: { postId: number; content: string }) => 
      apiClient.createComment(postId, content),
    
    onMutate: async ({ postId, content }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });

      // Snapshot the previous values
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      const previousPost = queryClient.getQueryData<Post>(['posts', postId]);

      // Create optimistic comment
      const optimisticComment: Comment = {
        id: Date.now(), // Temporary ID
        user_id: user?.id || 0,
        post_id: postId,
        content,
        user: user!,
        created_at: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // Optimistically update posts list
      if (previousPosts) {
        const optimisticPosts = previousPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              comments: [...(post.comments || []), optimisticComment]
            };
          }
          return post;
        });
        queryClient.setQueryData(['posts'], optimisticPosts);
      }

      // Optimistically update single post
      if (previousPost) {
        const optimisticPost = {
          ...previousPost,
          comments: [...(previousPost.comments || []), optimisticComment]
        };
        queryClient.setQueryData(['posts', postId], optimisticPost);
      }

      return { previousPosts, previousPost, optimisticComment };
    },

    onError: (error, { postId }, context) => {
      console.log("error: comment", error)
      // Revert optimistic updates on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', postId], context.previousPost);
      }
      
      toast.error(error.message || 'Failed to add comment');
    },

    onSuccess: (response: { success: boolean; data: Comment }) => {
      const post_id = response.data.post_id; 
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', post_id] });
      toast.success('Comment added successfully!');
    }
  });
};

export const useUpdateComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ commentId, content }: { commentId: number; content: string }) => 
      apiClient.updateComment(commentId, content),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update comment');
    },
  });
};

// OPTIMISTIC DELETE COMMENT - Updates UI immediately
export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (commentId: number) => apiClient.deleteComment(commentId),
    
    onMutate: async (commentId: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });

      // Snapshot the previous values
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);

      // Optimistically remove comment from all posts
      if (previousPosts) {
        const optimisticPosts = previousPosts.map(post => ({
          ...post,
          comments: (post.comments || []).filter(comment => comment.id !== commentId)
        }));
        queryClient.setQueryData(['posts'], optimisticPosts);
      }

      return { previousPosts };
    },

    // onError: (error, context) => {
    //   // Revert optimistic updates on error
    //   if (context?.previousPosts) {
    //     queryClient.setQueryData(['posts'], context.previousPosts);
    //   }
      
    //   toast.error(error.message || 'Failed to delete comment');
    // },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Comment deleted successfully!');
    },
  });
};