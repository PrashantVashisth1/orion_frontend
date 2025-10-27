// src/pages/public-profile/index.tsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '@/lib/api-client';
import { Skeleton } from '@/components/ui/skeleton';

import AboutCompany from "@/components/feed/about-company"
import Footer from "@/components/postlogincomponents/footer"
import Header from "@/components/postlogincomponents/Navbarpostlogin"
import Interests from "@/components/feed/interests"
import Offerings from "@/components/feed/offerings"
import ProfileHeader from "@/components/feed/profile-header"
import ProfileInfo from "@/components/feed/profile-info"
import BusinessDetails from "@/components/feed/bussiness-details"

// Import the type we just defined
import type { StartuppProfile } from '@/types/startup';

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
  const [profileData, setProfileData] = useState<StartuppProfile | null>(null);
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
        const data = await apiClient.get<StartuppProfile>(`/startup/profile/${userId}`);
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

  let profile = {
    data: {...profileData}
  }

  console.log("prfile", profile);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Custom scrollbar styles and Animated Background remain */}
      <style>{/* ... */}</style>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">{/* ... */}</div>

      <div className="relative z-10">
        <Header />

        <main className="px-4 py-8 max-w-7xl mx-auto"> {/* Added max-width for better desktop view */}
          <div className="mb-8">
            <div className="space-y-6">
              <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-0 shadow-2xl mx-auto rounded-3xl overflow-hidden">
                <ProfileHeader profile={profile} />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1 space-y-6">
                  {/* ProfileInfo will contain contact details and profile status */}
                  <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 p-6 shadow-xl rounded-2xl h-full">
                    <ProfileInfo profile={profile} />
                  </div>
                </div>
                
                <div className="lg:col-span-2 space-y-6">
                  {/* AboutCompany will contain Description, Vision, and Mission */}
                  <AboutCompany profile={profile} /> 
                  
                  {/* Business & Legal Details combined into one section for better flow */}
                  <BusinessDetails profile={profile} />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6 mt-8">
            <Offerings profile={profile} />
            <Interests profile={profile} />
          </div>
        </main>
        
        <Footer />
      </div>
    </div>
  )
}

export default PublicProfilePage;