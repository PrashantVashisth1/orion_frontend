
// import { ExternalLink, Camera } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
// Assuming the full response structure is now available in the profile prop
// import type { StartupProfileResponse } from "@/types/startup";

// interface ProfileHeaderProps { profile: StartupProfileResponse | null | undefined; }

export default function ProfileHeader({ profile }) {

  // const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // const handleViewFullInfo = () => navigate("/profile/detailed");
  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfileImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };
  // const handleEditImage = () => fileInputRef.current?.click();
  console.log("profile", profile)

  // const profilePictureUrl = profileImage || profile?.data?.personalInfo?.profilePicture || null;
  const companyName = profile?.data?.companyDetails?.companyName || "Startup Name";
  const foundedYear = profile?.data?.companyDetails?.foundedYear || "N/A";
  // const bgURL = profile?.data?.personalInfo?.profilePicture || null;
  const profilePictureUrl = profileImage || profile?.data?.companyDetails?.companyLogo || null;
  const bgURL = "https://images.presentationgo.com/2025/04/blue-technology-wave-background.jpg";


  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border-none p-8 shadow-xl relative w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.9)), url(${bgURL})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div> {/* Dark overlay for better text contrast */}
      
      {/* <Button
        variant="ghost"
        size="icon"
        className="absolute top-6 right-6 text-gray-400 hover:text-white hover:bg-gray-700/50 z-20 rounded-full w-10 h-10"
        onClick={handleEditImage}
      >
        <Camera className="h-5 w-5" />
      </Button> */}

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8 pr-16">
        {/* Profile Picture / Logo */}
        <div className="w-28 h-28 bg-gray-700 p-1 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden ring-4 ring-blue-500/50">
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-600 rounded-full flex items-center justify-center text-xl font-bold text-white">
              {companyName.charAt(0)}
            </div>
          )}
        </div>

        {/* Company Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-4 mb-3">
            <h1 className="text-4xl font-extrabold text-white break-words max-w-full">
              {companyName}
            </h1>
          </div>
          <p className="text-gray-400 mb-4 text-lg font-medium">
            Founded: **{foundedYear}** {profile?.company_details?.company_location && ` · Location: ${profile.company_details.company_location}`}
          </p>

          <div className="flex flex-wrap items-center gap-3 mb-4">
            {/* These are static placeholders, keeping them for UI aesthetic */}
            <div className="flex items-center gap-2 bg-blue-600/20 px-3 py-1 rounded-full border border-blue-500/30">
              <span className="text-xs font-medium text-gray-300">Followers</span>
              <span className="text-sm font-bold text-blue-400">1.2K</span>
            </div>
            {/* <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
              <span className="text-xs font-medium text-gray-300">Growth</span>
              <span className="text-sm font-bold text-green-400">+12.5%</span>
            </div> */}
          </div>

          {/* <Button
            variant="outline"
            size="sm"
            className="bg-blue-600/20 border-blue-600/50 text-blue-300 hover:bg-blue-600/30 hover:text-white flex items-center gap-2 transition duration-300"
            onClick={handleViewFullInfo}
          >
            View full information
            <ExternalLink className="h-4 w-4" />
          </Button> */}
        </div>
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
}