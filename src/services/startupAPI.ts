// import type { StartupProfile, StartupProfileRequest, StartupProfileResponse } from '@/types/startup';

// const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

// class StartupAPIService {
//   private async makeRequest<T>(
//     endpoint: string, 
//     options: RequestInit = {}
//   ): Promise<T> {
//     const token = localStorage.getItem('token');
//     console.log('Token found in localStorage:', !!token);
    
//     const config: RequestInit = {
//       headers: {
//         'Content-Type': 'application/json',
//         ...(token && { Authorization: `Bearer ${token}` }),
//         ...options.headers,
//       },
//       ...options,
//     };

//     try {
//       const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ message: 'Network error' }));
//         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('API Request failed:', error);
//       throw error;
//     }
//   }

//   // Get user's startup profile
//   async getStartupProfile(): Promise<StartupProfileResponse> {
//     return this.makeRequest<StartupProfileResponse>('/startup/profile');
//   }

//   // Create new startup profile
//   async createStartupProfile(profileData: StartupProfileRequest): Promise<StartupProfileResponse> {
//     return this.makeRequest<StartupProfileResponse>('/startup/profile', {
//       method: 'POST',
//       body: JSON.stringify(profileData),
//     });
//   }

//   // Update existing startup profile
//   async updateStartupProfile(profileData: StartupProfileRequest): Promise<StartupProfileResponse> {
//     return this.makeRequest<StartupProfileResponse>('/startup/profile', {
//       method: 'PUT',
//       body: JSON.stringify(profileData),
//     });
//   }

//   // Update specific section of startup profile
//   async updateProfileSection(section: string, sectionData: any): Promise<StartupProfileResponse> {
//     // Convert section names to match backend format
//     const sectionMap: Record<string, string> = {
//       'personalInfo': 'personal-info',
//       'businessDetails': 'business-details', 
//       'companyDetails': 'company-details',
//       'offerings': 'offerings',
//       'interests': 'interests'
//     };
    
//     const backendSection = sectionMap[section] || section;
//     return this.makeRequest<StartupProfileResponse>(`/startup/profile/${backendSection}`, {
//       method: 'PATCH',
//       body: JSON.stringify(sectionData),
//     });
//   }

//   // Delete startup profile
//   async deleteStartupProfile(): Promise<StartupProfileResponse> {
//     return this.makeRequest<StartupProfileResponse>('/startup/profile', {
//       method: 'DELETE',
//     });
//   }

//   // Check if user has completed startup profile
//   async checkProfileCompletion(): Promise<{ isComplete: boolean; completionPercentage: number }> {
//     return this.makeRequest<{ isComplete: boolean; completionPercentage: number }>('/startup/profile/completion');
//   }

//   // Upload profile picture or company logo
//   async uploadImage(file: File, type: 'profile' | 'logo'): Promise<{ url: string }> {
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('type', type);

//     const token = localStorage.getItem('token');
    
//     const response = await fetch(`${API_BASE_URL}/startup/upload`, {
//       method: 'POST',
//       headers: {
//         ...(token && { Authorization: `Bearer ${token}` }),
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Image upload failed');
//     }

//     return await response.json();
//   }
// }

// export const startupAPI = new StartupAPIService();
// export default startupAPI;

// src/services/startupService.ts
import { apiClient } from "@/lib/api-client";
import type {
  // StartupProfile,
  StartupProfileRequest,
  StartupProfileResponse,
} from "@/types/startup";

export const startupService = {
  // Get user's startup profile
  getStartupProfile: () =>
    apiClient.get<StartupProfileResponse>("/startup/profile"),

  // Create new startup profile
  createStartupProfile: (profileData: StartupProfileRequest) =>
    apiClient.post<StartupProfileResponse>("/startup/profile", profileData),

  // Update existing startup profile
  updateStartupProfile: (profileData: StartupProfileRequest) =>
    apiClient.put<StartupProfileResponse>("/startup/profile", profileData),

  // Update specific section of startup profile
  updateProfileSection: (section: string, sectionData: any) => {
    // Map frontend section names → backend API format
    const sectionMap: Record<string, string> = {
      personalInfo: "personal-info",
      businessDetails: "business-details",
      companyDetails: "company-details",
      offerings: "offerings",
      interests: "interests",
    };

    const backendSection = sectionMap[section] || section;

    return apiClient.patch<StartupProfileResponse>(
      `/startup/profile/${backendSection}`,
      sectionData
    );
  },

  // Delete startup profile
  deleteStartupProfile: () =>
    apiClient.delete<StartupProfileResponse>("/startup/profile"),

  // Check if user has completed startup profile
  checkProfileCompletion: () =>
    apiClient.get<{ isComplete: boolean; completionPercentage: number }>(
      "/startup/profile/completion"
    ),

  // Upload profile picture or company logo
  uploadImage: (file: File, type: "profile" | "logo") =>
    apiClient.uploadFile<{ url: string }>("/startup/upload", file, type),
};

