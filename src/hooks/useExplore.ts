// src/hooks/useExplore.ts
import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';

export interface ExploreStartup {
  id: number;
  name: string;
  status: string;
  statusColor: string;
  description: string;
  funding: string;
  team: string;
  growth: string;
  isGrowing: boolean;
  isHiring: boolean;
  founded: string;
  location: string;
  website: string;
  email: string;
  phone: string;
  industry: string;
  mission: string;
  vision: string;
  achievements: string[];
  keyMetrics: {
    revenue: string;
    customers: string;
    retention: string;
    valuation: string;
  };
  logo: string | null;
  profilePicture: string | null;
  products: string[];
  services: string[];
  socialLinks: {
    linkedin: string;
    twitter: string;
  };
}

export interface ExploreStartupsResponse {
  success: boolean;
  data: {
    startups: ExploreStartup[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
      hasNext: boolean;
      hasPrev: boolean;
    };
  };
}

export interface ExploreFilters {
  page?: number;
  limit?: number;
  industry?: string;
  fundingStage?: string;
  location?: string;
  search?: string;
  sortBy?: 'created_at' | 'updated_at';
  sortOrder?: 'asc' | 'desc';
}

// Hook to fetch all startups
export const useExploreStartups = (filters: ExploreFilters = {}) => {
  const queryParams = new URLSearchParams();
  
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      queryParams.append(key, value.toString());
    }
  });

  return useQuery({
    queryKey: ['explore-startups', filters],
    queryFn: async () => {
      const response = await apiClient.get<ExploreStartupsResponse>(
        `/explore/startups?${queryParams.toString()}`
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

// Hook to fetch a single startup
export const useStartupDetail = (userId: number | null) => {
  return useQuery({
    queryKey: ['startup-detail', userId],
    queryFn: async () => {
      if (!userId) throw new Error('User ID is required');
      
      const response = await apiClient.get<{ success: boolean; data: ExploreStartup }>(
        `/explore/startups/${userId}`
      );
      return response.data;
    },
    enabled: !!userId, // Only run query if userId is provided
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};