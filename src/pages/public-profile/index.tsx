// src/pages/public-profile/index.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';

// Import display components (adjust paths)
import ProfileHeader from '@/components/feed/profile-header';
import ProfileInfo from '@/components/feed/profile-info';
import AboutCompany from '@/components/feed/about-company';
import BusinessDetailsCard from '@/components/feed/bussiness-details';
import OfferingsCard from '@/components/feed/offerings';
import InterestsCard from '@/components/feed/interests';

// Import the type we just defined
import type { StartupProfile } from '@/types/startup';

// Re-define Skeleton or import from ProfilePage if you extracted it
const PublicProfilePageSkeleton = () => (
  <div className="container mx-auto max-w-6xl space-y-6 p-4 md:p-6">
    <Skeleton className="h-48 w-full rounded-lg" /> {/* Header */}
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <div className="col-span-1 space-y-6"> {/* Left Column */}
        <Skeleton className="h-64 w-full rounded-lg" /> {/* Profile Info */}
        <Skeleton className="h-40 w-full rounded-lg" /> {/* Business Details */}
      </div>
      <div className="col-span-1 space-y-6 md:col-span-2"> {/* Right Column */}
        <Skeleton className="h-40 w-full rounded-lg" /> {/* About */}
        <Skeleton className="h-40 w-full rounded-lg" /> {/* Offerings */}
        <Skeleton className="h-40 w-full rounded-lg" /> {/* Interests */}
      </div>
    </div>
  </div>
);


const PublicProfilePage = () => {
  // Get the userId from the URL, e.g., /users/123 -> userId = "123"
  const { userId } = useParams<{ userId: string }>();
  const [profileData, setProfileData] = useState<StartupProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!userId) {
        setError("User ID not found in URL.");
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        // Call the backend endpoint using the userId from the URL
        const data = await apiClient.get<StartupProfile>(`/startup/profile/${userId}`);
        console.log(data);
        setProfileData(data);
      } catch (err: any) {
        console.error("Failed to fetch public profile:", err);
        setError(err.message || "Failed to load profile data.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]); // Dependency array includes userId

  if (isLoading) {
    return <PublicProfilePageSkeleton />;
  }

  if (error) {
    return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>;
  }

  if (!profileData) {
    return <div className="container mx-auto p-6 text-center text-gray-500">Profile not found.</div>;
  }

  // --- Render Profile ---
  // Pass the fetched data to your display components
  // Adapt props based on component needs and data structure
  return (
    <div className="container mx-auto max-w-6xl space-y-6 p-4 md:p-6">
      <ProfileHeader
        profilePictureUrl={profileData.personal_info?.profile_picture}
        fullName={profileData.user?.full_name}
        jobTitle={profileData.business_details?.job_title}
        companyName={profileData.company_details?.company_name}
        // Add other props...
      />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="col-span-1 space-y-6">
          <ProfileInfo personalInfo={profileData.personal_info} />
          <BusinessDetailsCard businessDetails={profileData.business_details} />
        </div>
        <div className="col-span-1 space-y-6 md:col-span-2">
          <AboutCompany companyDetails={profileData.company_details} />
          <OfferingsCard offerings={profileData.offerings} />
          <InterestsCard interests={profileData.interests} />
        </div>
      </div>
    </div>
  );
};

export default PublicProfilePage;