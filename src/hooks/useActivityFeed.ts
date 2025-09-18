import { useMemo, useCallback } from 'react';
import { useAuthStore } from '../store/authStore';
import { useLikePost, usePosts, useUnlikePost } from './usePosts';
import { useCreateComment, useDeleteComment } from './useComments';

export const useActivityFeed = () => {
  const { data: posts, isLoading, error, refetch } = usePosts();
  const { user } = useAuthStore();
  
  const likePostMutation = useLikePost();
  const unlikePostMutation = useUnlikePost();
  const createCommentMutation = useCreateComment();
  const deleteCommentMutation = useDeleteComment();

  // Transform posts with user interaction state
  const transformedPosts = useMemo(() => {
    return posts?.map((post) => ({
      ...post,
      isLiked: post.likes?.some((like) => like.user_id === user?.id) || false,
      likeCount: post.likes?.length || 0,
      commentCount: post.comments?.length || 0,
      canEdit: post.author.id === user?.id,
      canDelete: post.author.id === user?.id,
    })) || [];
  }, [posts, user?.id]);

  // OPTIMIZED like/unlike handler - no loading state needed!
  const handleLikeToggle = useCallback(async (postId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        // UI updates immediately via optimistic update
        await unlikePostMutation.mutateAsync(postId);
      } else {
        // UI updates immediately via optimistic update
        await likePostMutation.mutateAsync(postId);
      }
    } catch (error) {
      // Error handling and revert is handled in the mutations
      console.error('Like toggle error:', error);
    }
  }, [likePostMutation, unlikePostMutation]);

  // Handle comment creation
  const handleCreateComment = useCallback(async (postId: number, content: string) => {
    try {
      await createCommentMutation.mutateAsync({ postId, content });
    } catch (error) {
      console.error('Create comment error:', error);
    }
  }, [createCommentMutation]);

  // Handle comment deletion
  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      console.error('Delete comment error:', error);
    }
  }, [deleteCommentMutation]);

  return {
    posts: transformedPosts,
    isLoading,
    error,
    refetch,
    handleLikeToggle,
    handleCreateComment,
    handleDeleteComment,
    // These are no longer needed for like/unlike since they're instant!
    isLiking: false, // Always false since UI updates instantly
    isCommenting: createCommentMutation.isPending,
  };
};