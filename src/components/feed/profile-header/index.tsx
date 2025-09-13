// import { Edit, ExternalLink, Camera } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { useNavigate } from "react-router-dom"
// import { useState, useRef } from "react"

// export default function ProfileHeader() {
//   const navigate = useNavigate()
//   const [profileImage, setProfileImage] = useState<string | null>(null)
//   const fileInputRef = useRef<HTMLInputElement>(null)

//   const handleViewFullInfo = () => {
//     // Navigate to a detailed profile page or open a modal
//     navigate('/profile/detailed')
//   }

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       const reader = new FileReader()
//       reader.onload = (e) => {
//         setProfileImage(e.target?.result as string)
//       }
//       reader.readAsDataURL(file)
//     }
//   }

//   const handleEditImage = () => {
//     fileInputRef.current?.click()
//   }

//   return (
//     <div 
//       className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full overflow-hidden"
//       style={{
//         backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
//         backgroundSize: 'cover',
//         backgroundPosition: 'center',
//         backgroundRepeat: 'no-repeat'
//       }}
//     >
//       <Button 
//         variant="ghost" 
//         size="sm" 
//         className="absolute top-6 right-6 text-gray-400 hover:text-white hover:bg-gray-700/50 z-10"
//         onClick={handleEditImage}
//       >
//         <Camera className="h-4 w-4" />
//       </Button>

//       <div className="flex items-center space-x-8 pr-16">
//         <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
//           {profileImage ? (
//             <img 
//               src={profileImage} 
//               alt="Profile" 
//               className="w-full h-full object-cover rounded-full"
//             />
//           ) : (
//             <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
//           )}
//         </div>

//         <div className="flex-1 min-w-0">
//           <div className="flex items-center gap-4 mb-3">
//             <h1 className="text-3xl font-bold text-white whitespace-nowrap">Tech Flow AI Pvt. Lt.</h1>
//             <div className="flex items-center gap-3">
//               <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600">
//                 <span className="text-sm font-medium text-gray-300">Followers</span>
//                 <span className="text-sm font-bold text-blue-400">1.2K</span>
//               </div>
//               <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
//                 <span className="text-sm font-medium text-gray-300">Growth</span>
//                 <span className="text-sm font-bold text-green-400">+12.5%</span>
//               </div>
//               <div className="flex items-center gap-2 bg-orange-600/20 px-3 py-1 rounded-full border border-orange-500/30">
//                 <span className="text-sm font-medium text-gray-300">Hiring</span>
//                 <span className="text-sm font-bold text-orange-400">Yes</span>
//               </div>
//             </div>
//           </div>
//           <p className="text-gray-400 mb-4 text-lg">Founded - 2015</p>

//           <Button 
//             variant="outline" 
//             size="sm"
//             className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white flex items-center gap-2"
//             onClick={handleViewFullInfo}
//           >
//             View full information
//             <ExternalLink className="h-4 w-4" />
//           </Button>
//         </div>
//       </div>
      
//       {/* Hidden file input for image upload */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         onChange={handleImageChange}
//         accept="image/*"
//         className="hidden"
//       />
//     </div>
//   )
// }

import {  ExternalLink, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import type { StartupProfileResponse } from "@/types/startup";

interface ProfileHeaderProps {
  profile: StartupProfileResponse | null | undefined;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const navigate = useNavigate();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleViewFullInfo = () => {
    // Navigate to a detailed profile page or open a modal
    navigate("/profile/detailed");
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditImage = () => {
    fileInputRef.current?.click();
  };

  const profilePictureUrl = profileImage || profile?.data?.personalInfo?.profilePicture || null;
  // const companyName = profile?.data?.companyDetails?.companyName || "Startup Name";
  const foundedYear = profile?.data?.companyDetails?.foundedYear || "N/A";
  
  const companyName = profile?.data?.companyDetails?.companyName || "Startup Name";

  return (
    <div
      className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.9)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className="absolute top-6 right-6 text-gray-400 hover:text-white hover:bg-gray-700/50 z-10"
        onClick={handleEditImage}
      >
        <Camera className="h-4 w-4" />
      </Button>

      <div className="flex items-center space-x-8 pr-16">
        <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 relative overflow-hidden">
          {profilePictureUrl ? (
            <img
              src={profilePictureUrl}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            <div className="w-16 h-16 bg-gray-600 rounded-full"></div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-4 mb-3">
            <h1 className="text-3xl font-bold text-white whitespace-nowrap">
              {companyName}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-700/50 px-3 py-1 rounded-full border border-gray-600">
                <span className="text-sm font-medium text-gray-300">Followers</span>
                <span className="text-sm font-bold text-blue-400">1.2K</span>
              </div>
              <div className="flex items-center gap-2 bg-green-600/20 px-3 py-1 rounded-full border border-green-500/30">
                <span className="text-sm font-medium text-gray-300">Growth</span>
                <span className="text-sm font-bold text-green-400">+12.5%</span>
              </div>
              <div className="flex items-center gap-2 bg-orange-600/20 px-3 py-1 rounded-full border border-orange-500/30">
                <span className="text-sm font-medium text-gray-300">Hiring</span>
                <span className="text-sm font-bold text-orange-400">Yes</span>
              </div>
            </div>
          </div>
          <p className="text-gray-400 mb-4 text-lg">Founded - {foundedYear}</p>

          <Button
            variant="outline"
            size="sm"
            className="bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700/50 hover:text-white flex items-center gap-2"
            onClick={handleViewFullInfo}
          >
            View full information
            <ExternalLink className="h-4 w-4" />
          </Button>
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