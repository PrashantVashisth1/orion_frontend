// src/hooks/useStudentAPI.ts

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import type {
  StudentProfileResponse,
  UpdateSectionPayload,
  AddEducationPayload,
  UpdateEducationPayload,
  AddWorkExperiencePayload,
  UpdateWorkExperiencePayload,
  AddCertificatePayload,
  UpdateCertificatePayload,
} from '../types/student';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:4000';

// Create axios instance with auth token
// const createAuthAxios = () => {
//   const token = localStorage.getItem('token');
//   return axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json',
//     },
//   });
// };

// Modify createAuthAxios to optionally accept custom headers
// const createAuthAxios = (customHeaders = {}) => {
//   const token = localStorage.getItem('token');
//   return axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       Authorization: `Bearer ${token}`,
//       'Content-Type': 'application/json', // Default for JSON data
//       ...customHeaders, // Merge custom headers
//     },
//   });
// };
// const createAuthAxios = (customHeaders = {}) => {
//   const token = localStorage.getItem("token");

//   return axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       ...customHeaders,   // merged first
//       Authorization: `Bearer ${token}`, // always last
//     },
//   });
// };

import { useAuthStore } from "@/store/authStore";

const createAuthAxios = (customHeaders = {}) => {
  const token = useAuthStore.getState().token; // USE ZUSTAND TOKEN

  return axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...customHeaders,
    },
  });
};


// ... (Existing query and mutation hooks remain the same)

/**
 * Update profile section (Personal Info or Skills)
 * FIX: Dynamically set headers to allow FormData (file uploads)
 */
export const useUpdateProfileSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ section, data }: UpdateSectionPayload) => {
      
      let customHeaders = {};
      
      // 1. Check if the payload is FormData (i.e., contains a file)
      if (data instanceof FormData) {
        // Setting Content-Type to undefined allows the browser to correctly set
        // the necessary 'multipart/form-data' boundary header.
        customHeaders = { 
            'Content-Type': undefined 
        };
      }
      
      // 2. Create Axios instance with potentially overridden headers
      const axiosInstance = createAuthAxios(customHeaders);
      
      const endpoint = `/api/student/profile/${section === 'personalInfo' ? 'personal-info' : 'skills'}`;
      
      try {
        // We must use PATCH because your route is PATCH, and we use the 'data' payload
        const response = await axiosInstance.patch(endpoint, data); 
        return response.data;
      } catch (error: any) {
        console.error('API Error details:', error.response?.data);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
    },
  });
};

// ... (Existing mutation hooks remain the same)

// ==================== PROFILE QUERIES ====================

/**
 * Fetch student profile
 */
export const useStudentProfile = () => {
  return useQuery<StudentProfileResponse>({
    queryKey: ['studentProfile'],
    queryFn: async () => {
      const axiosInstance = createAuthAxios();
      const { data } = await axiosInstance.get('/api/student/profile');
      return data;
    },
    retry: 1,
    staleTime: 30000, // 30 seconds
  });
};

/**
 * Get completion status
 */
export const useCompletionStatus = () => {
  return useQuery<{ completionPercentage: number; isComplete: boolean }>({
    queryKey: ['studentCompletion'],
    queryFn: async () => {
      const axiosInstance = createAuthAxios();
      const { data } = await axiosInstance.get('/api/student/profile/completion');
      return data;
    },
  });
};

// ==================== PROFILE MUTATIONS ====================

/**
 * Create initial profile
 */
export const useCreateProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const axiosInstance = createAuthAxios();
      const { data } = await axiosInstance.post('/api/student/profile');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Delete profile
 */
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const axiosInstance = createAuthAxios();
      const { data } = await axiosInstance.delete('/api/student/profile');
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Update profile section (Personal Info or Skills)
 */
// export const useUpdateProfileSection = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async ({ section, data }: UpdateSectionPayload) => {
//       const axiosInstance = createAuthAxios();
//       const response = await axiosInstance.patch(`/api/student/profile/${section === 'personalInfo' ? 'personal-info' : 'skills'}`, data);
//       return response.data;
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
//       queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
//     },
//   });
// };

// Temporary debug version - add this to your useStudentAPI.ts

// export const useUpdateProfileSection = () => {
//   const queryClient = useQueryClient();
  
//   return useMutation({
//     mutationFn: async ({ section, data }: UpdateSectionPayload) => {
//       const axiosInstance = createAuthAxios();
      
//       // Debug logging
//       console.log('=== UPDATE PROFILE SECTION DEBUG ===');
//       console.log('Section:', section);
//       console.log('Data being sent:', data);
//       console.log('Endpoint:', `/api/student/profile/${section === 'personalInfo' ? 'personal-info' : 'skills'}`);
      
//       try {
//         const response = await axiosInstance.patch(
//           `/api/student/profile/${section === 'personalInfo' ? 'personal-info' : 'skills'}`, 
//           data
//         );
//         console.log('Success response:', response.data);
//         return response.data;
//       } catch (error: any) {
//         console.error('API Error:', error);
//         console.error('Error details:', error.response?.data);
//         throw error;
//       }
//     },
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
//       queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
//     },
//   });
// };

// ==================== EDUCATION MUTATIONS ====================

/**
 * Add education record
 */
export const useAddEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: AddEducationPayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.post('/api/student/profile/education', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
    },
  });
};

/**
 * Update education record
 */
export const useUpdateEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ recordId, ...data }: UpdateEducationPayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.patch(`/api/student/profile/education/${recordId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Delete education record
 */
export const useDeleteEducation = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recordId: number) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.delete(`/api/student/profile/education/${recordId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
    },
  });
};

// ==================== WORK EXPERIENCE MUTATIONS ====================

/**
 * Add work experience
 */
export const useAddWorkExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: AddWorkExperiencePayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.post('/api/student/profile/work-experience', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
    },
  });
};

/**
 * Update work experience
 */
export const useUpdateWorkExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ recordId, ...data }: UpdateWorkExperiencePayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.patch(`/api/student/profile/work-experience/${recordId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Delete work experience
 */
export const useDeleteWorkExperience = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recordId: number) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.delete(`/api/student/profile/work-experience/${recordId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
      queryClient.invalidateQueries({ queryKey: ['studentCompletion'] });
    },
  });
};

// ==================== CERTIFICATE MUTATIONS ====================

/**
 * Add certificate
 */
export const useAddCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (data: AddCertificatePayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.post('/api/student/profile/skills/certificate', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Update certificate
 */
export const useUpdateCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ recordId, ...data }: UpdateCertificatePayload) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.patch(`/api/student/profile/skills/certificate/${recordId}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

/**
 * Delete certificate
 */
export const useDeleteCertificate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (recordId: number) => {
      const axiosInstance = createAuthAxios();
      const response = await axiosInstance.delete(`/api/student/profile/skills/certificate/${recordId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studentProfile'] });
    },
  });
};

// ==================== IMAGE UPLOAD ====================

/**
 * Upload image (for profile picture if needed)
 */
export const useUploadImage = () => {
  return useMutation({
    mutationFn: async ({ file, type }: { file: File; type: 'profile' }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', type);

      const token = localStorage.getItem('token');
      const { data } = await axios.post(`${API_BASE_URL}/api/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
  });
};