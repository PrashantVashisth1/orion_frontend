import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type CreatePostData, type Post, type Like } from '../lib/my-api-client';
import { toast } from 'react-hot-toast';
import { useAuthStore } from '@/store/authStore';

export const usePosts = () => {
  return useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const response = await apiClient.getPosts();
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const usePost = (id: number) => {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: async () => {
      const response = await apiClient.getPost(id);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: CreatePostData) => apiClient.createPost(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.setQueryData(['posts', response.data.id], response.data);
      toast.success('Post created successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });
};

export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<CreatePostData> }) => 
      apiClient.updatePost(id, data),
    onSuccess: (response, variables) => {
      queryClient.setQueryData(['posts', variables.id], response.data);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post updated successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to update post');
    },
  });
};

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (id: number) => apiClient.deletePost(id),
    onSuccess: (_, deletedId) => {
      queryClient.removeQueries({ queryKey: ['posts', deletedId] });
      queryClient.setQueryData(['posts'], (old: Post[] | undefined) => 
        old?.filter(post => post.id !== deletedId) || []
      );
      toast.success('Post deleted successfully!');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to delete post');
    },
  });
};

// OPTIMISTIC LIKE POST - Updates UI immediately
export const useLikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (postId: number) => apiClient.likePost(postId),
    
    // Optimistic update - runs immediately when mutation is called
    onMutate: async (postId: number) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });

      // Snapshot the previous values
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      const previousPost = queryClient.getQueryData<Post>(['posts', postId]);

      // Create optimistic like object
      const optimisticLike: Like = {
        id: Date.now(), // Temporary ID
        user_id: user?.id || 0,
        post_id: postId,
        user: user!,
        createdAt: new Date().toISOString(),
      };

      // Optimistically update posts list
      if (previousPosts) {
        const optimisticPosts = previousPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: [...(post.likes || []), optimisticLike]
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
          likes: [...(previousPost.likes || []), optimisticLike]
        };
        queryClient.setQueryData(['posts', postId], optimisticPost);
      }

      // Return a context object with the snapshotted values
      return { previousPosts, previousPost };
    },

    onError: (error, postId, context) => {
      // Revert optimistic updates on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', postId], context.previousPost);
      }
      
      toast.error(error.message || 'Failed to like post');
    },

    onSuccess: ( postId) => {
      // Update with real data from server
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });
};

// OPTIMISTIC UNLIKE POST - Updates UI immediately
export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  
  return useMutation({
    mutationFn: (postId: number) => apiClient.unlikePost(postId),
    
    // Optimistic update - runs immediately when mutation is called
    onMutate: async (postId: number) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      await queryClient.cancelQueries({ queryKey: ['posts', postId] });

      // Snapshot the previous values
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']);
      const previousPost = queryClient.getQueryData<Post>(['posts', postId]);

      // Optimistically update posts list - remove user's like
      if (previousPosts) {
        const optimisticPosts = previousPosts.map(post => {
          if (post.id === postId) {
            return {
              ...post,
              likes: (post.likes || []).filter(like => like.user_id !== user?.id)
            };
          }
          return post;
        });
        queryClient.setQueryData(['posts'], optimisticPosts);
      }

      // Optimistically update single post - remove user's like
      if (previousPost) {
        const optimisticPost = {
          ...previousPost,
          likes: (previousPost.likes || []).filter(like => like.user_id !== user?.id)
        };
        queryClient.setQueryData(['posts', postId], optimisticPost);
      }

      return { previousPosts, previousPost };
    },

    onError: (error, postId, context) => {
      // Revert optimistic updates on error
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
      if (context?.previousPost) {
        queryClient.setQueryData(['posts', postId], context.previousPost);
      }
      
      toast.error(error.message || 'Failed to unlike post');
    },

    onSuccess: ( postId) => {
      // Update with real data from server
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
  });
};