import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api-client';
import type {  
  StartupProfileRequest, 
  StartupProfileResponse 
} from '@/types/startup';

// Query keys for caching
export const startupKeys = {
  all: ['startup'] as const,
  profile: () => [...startupKeys.all, 'profile'] as const,
  completion: () => [...startupKeys.all, 'completion'] as const,
};

export const useStartupProfile = () => {
  return useQuery({
    queryKey: startupKeys.profile(),
    // The API client now handles the casing conversion
    queryFn: () => apiClient.get<StartupProfileResponse>('/startup/profile'),
    retry: false,
  });
};

// Check profile completion
export const useProfileCompletion = () => {
  return useQuery({
    queryKey: startupKeys.completion(),
    queryFn: async () => {
      const res = await apiClient.get<any>('/startup/profile/completion');
      const payload = res?.data?.data ?? res?.data ?? {};
      return {
        isComplete: Boolean(payload.is_complete ?? payload.isComplete ?? false),
        completionPercentage: Number(payload.completion_percentage ?? payload.completionPercentage ?? 0),
        profileExists: Boolean(payload.profile_exists ?? payload.profileExists ?? false),
      } as { isComplete: boolean; completionPercentage: number; profileExists: boolean };
    },
    staleTime: 0,
    gcTime: 60_000,
    refetchOnMount: 'always',
    refetchOnWindowFocus: true,
    refetchInterval: 30_000,
  });
};

// Create startup profile
export const useCreateStartupProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: StartupProfileRequest) => 
      apiClient.post<StartupProfileResponse>('/startup/profile', data),
    onSuccess: () => {
      // Invalidate and refetch profile data
      queryClient.invalidateQueries({ queryKey: startupKeys.profile() });
      queryClient.invalidateQueries({ queryKey: startupKeys.completion() });
    },
  });
};

// Update startup profile
export const useUpdateStartupProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: StartupProfileRequest) => 
      apiClient.put<StartupProfileResponse>('/startup/profile', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: startupKeys.profile() });
      queryClient.invalidateQueries({ queryKey: startupKeys.completion() });
    },
  });
};

// Update specific section
export const useUpdateProfileSection = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ section, data }: { section: string; data: any }) => {
      // Convert section names to match backend format
      const sectionMap: Record<string, string> = {
        'personalInfo': 'personal-info',
        'businessDetails': 'business-details', 
        'companyDetails': 'company-details',
        'offerings': 'offerings',
        'interests': 'interests'
      };
      
      const backendSection = sectionMap[section] || section;
      
      // Convert field names for different sections
      let convertedData = data;
      if (section === 'personalInfo') {
        // Filter out empty values to avoid validation errors
        convertedData = {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
          location: data.location,
          ...(data.website && { website: data.website }),
          ...(data.birthDate && { birth_date: data.birthDate }),
          ...(data.bio && { bio: data.bio }),
          ...(data.profilePicture && { profile_picture: data.profilePicture })
        };
      } else if (section === 'businessDetails') {
        // Filter out empty values to avoid validation errors
        convertedData = {
          job_title: data.jobTitle,
          industry: data.industry,
          ...(data.company && { company: data.company }),
          ...(data.experience && { experience: data.experience }),
          ...(data.businessType && { business_type: data.businessType }),
          ...(data.teamSize && { team_size: data.teamSize }),
          ...(data.revenue && { revenue: data.revenue }),
          ...(data.fundingStage && { funding_stage: data.fundingStage }),
          ...(data.skills && { skills: data.skills }),
          ...(data.goals && { goals: data.goals }),
          ...(data.linkedinProfile && { linkedin_profile: data.linkedinProfile }),
          ...(data.twitterProfile && { twitter_profile: data.twitterProfile }),
          ...(data.githubProfile && { github_profile: data.githubProfile }),
          ...(data.portfolioWebsite && { portfolio_website: data.portfolioWebsite })
        };
             } else if (section === 'companyDetails') {
         // Filter out empty values to avoid validation errors
         convertedData = {
           company_name: data.companyName,
           founded_year: data.foundedYear,
           company_email: data.companyEmail,
           company_phone: data.companyPhone,
           company_location: data.companyLocation,
           company_description: data.companyDescription,
           vision: data.vision,
           mission: data.mission,
           industry: data.industry,
           ...(data.companyLogo && { company_logo: data.companyLogo }),
           ...(data.companyWebsite && { company_website: data.companyWebsite }),
           ...(data.teamSize && { team_size: data.teamSize }),
           ...(data.companyType && { company_type: data.companyType }),
           ...(data.revenueRange && { revenue_range: data.revenueRange }),
           ...(data.legalName && { legal_name: data.legalName }),
           ...(data.taxId && { tax_id: data.taxId }),
           ...(data.registrationDate && { registration_date: data.registrationDate }),
           ...(data.businessLicense && { business_license: data.businessLicense })
         };
       } else if (section === 'interests') {
         // For interests, use the data as-is since it's already transformed in the component
         convertedData = data;
       } else if (section === 'offerings') {
        

        convertedData = data;
      }
      
      return apiClient.patch<StartupProfileResponse>(`/startup/profile/${backendSection}`, convertedData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: startupKeys.profile() });
      queryClient.invalidateQueries({ queryKey: startupKeys.completion() });
    },
  });
};

// Delete startup profile
export const useDeleteStartupProfile = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => apiClient.delete<StartupProfileResponse>('/startup/profile'),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: startupKeys.profile() });
      queryClient.invalidateQueries({ queryKey: startupKeys.completion() });
    },
  });
};

// Upload image
export const useUploadImage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ file, type }: { file: File; type: 'profile' | 'logo' }) => 
      apiClient.uploadFile<{ url: string }>('/startup/upload', file, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: startupKeys.profile() });
    },
  });
};
