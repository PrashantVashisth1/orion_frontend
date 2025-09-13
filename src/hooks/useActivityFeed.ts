// 7. Activity Feed Hook - src/hooks/useActivityFeed.ts
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
      isLiked: post.likes?.some((like) => like.userId === user?.id) || false,
      likeCount: post.likes?.length || 0,
      commentCount: post.comments?.length || 0,
      canEdit: post.author.id === user?.id,
      canDelete: post.author.id === user?.id,
    })) || [];
  }, [posts, user?.id]);

  // Handle like/unlike
  const handleLikeToggle = useCallback(async (postId: number, isLiked: boolean) => {
    try {
      if (isLiked) {
        await unlikePostMutation.mutateAsync(postId);
      } else {
        await likePostMutation.mutateAsync(postId);
      }
    } catch (error) {
      // Error is handled in the mutation
    }
  }, [likePostMutation, unlikePostMutation]);

  // Handle comment creation
  const handleCreateComment = useCallback(async (postId: number, content: string) => {
    try {
      await createCommentMutation.mutateAsync({ postId, content });
    } catch (error) {
      // Error is handled in the mutation
    }
  }, [createCommentMutation]);

  // Handle comment deletion
  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      await deleteCommentMutation.mutateAsync(commentId);
    } catch (error) {
      // Error is handled in the mutation
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
    isLiking: likePostMutation.isPending || unlikePostMutation.isPending,
    isCommenting: createCommentMutation.isPending,
  };
};