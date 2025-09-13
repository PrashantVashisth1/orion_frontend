// 4. TanStack Query Hooks - src/hooks/usePosts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, type CreatePostData, type Post } from '../lib/my-api-client';
import { toast } from 'react-hot-toast';

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

export const useLikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: number) => apiClient.likePost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to like post');
    },
  });
};

export const useUnlikePost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (postId: number) => apiClient.unlikePost(postId),
    onSuccess: (_, postId) => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      queryClient.invalidateQueries({ queryKey: ['posts', postId] });
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Failed to unlike post');
    },
  });
};
