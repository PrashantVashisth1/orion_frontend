import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import type { StartupProfile, StartupProfileRequest } from '@/types/startup';
// import { useAuth } from './AuthContext';
import { 
  useStartupProfile, 
  useProfileCompletion, 
  useCreateStartupProfile, 
  useUpdateStartupProfile, 
  useUpdateProfileSection, 
  useDeleteStartupProfile, 
  useUploadImage 
} from '@/hooks/useStartupAPI';

interface StartupProfileContextType {
  profile: StartupProfile | null;
  isLoading: boolean;
  isComplete: boolean;
  completionPercentage: number;
  error: string | null;
  
  // Actions
  updateProfile: (data: StartupProfileRequest) => Promise<void>;
  updateSection: (section: string, data: any) => Promise<void>;
  createProfile: (data: StartupProfileRequest) => Promise<void>;
  deleteProfile: () => Promise<void>;
  uploadImage: (file: File, type: 'profile' | 'logo') => Promise<string>;
  clearError: () => void;
}

const StartupProfileContext = createContext<StartupProfileContextType | undefined>(undefined);

interface StartupProfileProviderProps {
  children: ReactNode;
}

export const StartupProfileProvider: React.FC<StartupProfileProviderProps> = ({ children }) => {
  // const { isAuthenticated } = useAuth();

  // TanStack Query hooks
  const { 
    data: profileData, 
    isLoading: profileLoading, 
    error: profileError 
  } = useStartupProfile();

  const { 
    data: completionData 
  } = useProfileCompletion();

  const createProfileMutation = useCreateStartupProfile();
  const updateProfileMutation = useUpdateStartupProfile();
  const updateSectionMutation = useUpdateProfileSection();
  const deleteProfileMutation = useDeleteStartupProfile();
  const uploadImageMutation = useUploadImage();

  // Extract data from responses
  const profile = profileData?.data || null;
  const isComplete = completionData?.isComplete || false;
  const completionPercentage = completionData?.completionPercentage || 0;
  const isLoading = profileLoading;
  const error = profileError ? (profileError as Error).message : null;

  const clearError = () => {
    // Errors are handled by TanStack Query, so we don't need to clear them manually
  };

  const createProfile = async (data: StartupProfileRequest) => {
    try {
      await createProfileMutation.mutateAsync(data);
    } catch (err) {
      throw err;
    }
  };

  const updateProfile = async (data: StartupProfileRequest) => {
    try {
      await updateProfileMutation.mutateAsync(data);
    } catch (err) {
      throw err;
    }
  };

  const updateSection = async (section: string, data: any) => {
    try {
      await updateSectionMutation.mutateAsync({ section, data });
    } catch (err) {
      throw err;
    }
  };

  const deleteProfile = async () => {
    try {
      await deleteProfileMutation.mutateAsync();
    } catch (err) {
      throw err;
    }
  };

  const uploadImage = async (file: File, type: 'profile' | 'logo') => {
    try {
      const result = await uploadImageMutation.mutateAsync({ file, type });
      // return result.url || result.imageUrl || '';
      return result.url || '';
    } catch (err) {
      throw err;
    }
  };

  const value: StartupProfileContextType = {
    profile,
    isLoading,
    isComplete,
    completionPercentage,
    error,
    updateProfile,
    updateSection,
    createProfile,
    deleteProfile,
    uploadImage,
    clearError,
  };

  return (
    <StartupProfileContext.Provider value={value}>
      {children}
    </StartupProfileContext.Provider>
  );
};

export const useStartupProfileContext = () => {
  const context = useContext(StartupProfileContext);
  if (!context) {
    throw new Error('useStartupProfileContext must be used within a StartupProfileProvider');
  }
  return context;
};
