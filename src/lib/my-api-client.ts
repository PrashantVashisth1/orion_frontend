// 1. Updated API Client - src/lib/api-client.ts
import { QueryClient } from '@tanstack/react-query';

// API Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Create QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
    mutations: {
      retry: 1,
    },
  },
});

// Types
export interface User {
  id: number;
  full_name: string;
  email: string;
  role: 'STARTUP' | 'INVESTOR' | 'MENTOR' | 'STUDENT' | 'ADMIN';
  mobile?: string;
  emailVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Post {
  id: number;
  text: string;
  images: string[];
  documents: string[];
  published: boolean;
  createdAt: string;
  updated_at: string;
  author: User;
  likes: Like[];
  comments: Comment[];
  userId: number;
}

export interface Like {
  id: number;
  userId: number;
  postId: number;
  user: User;
  createdAt: string;
}

export interface Comment {
  id: number;
  userId: number;
  postId: number;
  content: string;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface CreatePostData {
  text: string;
  images?: string[];
  documents?: string[];
}

export interface AuthResponse {
  success: boolean;
  data: {
    token: string;
    user: User;
  };
  message: string;
}

export interface PostsResponse {
  success: boolean;
  data: Post[];
}

export interface PostResponse {
  success: boolean;
  data: Post;
  message?: string;
}

// API Client class for making authenticated requests
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token && token !== 'undefined') {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    // Merge headers properly
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP error! status: ${response.status}` 
        }));
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Auth endpoints
  async login(email: string, password: string): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async signup(userData: { fullName: string; email: string; password: string; mobile?: string }): Promise<AuthResponse> {
    return this.makeRequest<AuthResponse>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Post endpoints
  async getPosts(): Promise<PostsResponse> {
    return this.makeRequest<PostsResponse>('/posts');
  }

  async getPost(id: number): Promise<PostResponse> {
    return this.makeRequest<PostResponse>(`/posts/${id}`);
  }

  async createPost(data: CreatePostData): Promise<PostResponse> {
    return this.makeRequest<PostResponse>('/posts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updatePost(id: number, data: Partial<CreatePostData>): Promise<PostResponse> {
    return this.makeRequest<PostResponse>(`/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deletePost(id: number): Promise<{ success: boolean; message: string }> {
    return this.makeRequest<{ success: boolean; message: string }>(`/posts/${id}`, {
      method: 'DELETE',
    });
  }

  // Like endpoints
  async likePost(postId: number): Promise<{ success: boolean; data: Like }> {
    return this.makeRequest<{ success: boolean; data: Like }>(`/posts/${postId}/likes`, {
      method: 'POST',
    });
  }

  async unlikePost(postId: number): Promise<{ success: boolean; message: string }> {
    return this.makeRequest<{ success: boolean; message: string }>(`/posts/${postId}/likes`, {
      method: 'DELETE',
    });
  }

  // Comment endpoints
  async createComment(postId: number, content: string): Promise<{ success: boolean; data: Comment }> {
    return this.makeRequest<{ success: boolean; data: Comment }>('/comments', {
      method: 'POST',
      body: JSON.stringify({ postId, content }),
    });
  }

  async updateComment(commentId: number, content: string): Promise<{ success: boolean; data: Comment }> {
    return this.makeRequest<{ success: boolean; data: Comment }>(`/comments/${commentId}`, {
      method: 'PUT',
      body: JSON.stringify({ content }),
    });
  }

  async deleteComment(commentId: number): Promise<{ success: boolean; message: string }> {
    return this.makeRequest<{ success: boolean; message: string }>(`/comments/${commentId}`, {
      method: 'DELETE',
    });
  }

  // File upload
  async uploadFile(file: File): Promise<{ success: boolean; data: { url: string } }> {
    const formData = new FormData();
    formData.append('file', file);
    
    const token = localStorage.getItem('token');
    
    const response = await fetch(`${this.baseURL}/api/startup/upload`, {
      method: 'POST',
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return response.json();
  }
}

export const apiClient = new ApiClient();