// import { useNavigate } from "react-router-dom"
// import { Mail, Phone, Globe, MapPin } from "lucide-react"
// // import type { StartupProfileResponse } from "@/types/startup"

// // interface ProfileInfoProps { profile: StartupProfileResponse | null | undefined }

// export default function ProfileInfo({ profile }) {
//   const navigate = useNavigate();
//   const email = profile?.data?.companyDetails?.companyEmail || "N/A"
//   const phone = profile?.data?.companyDetails?.companyPhone || "N/A"
//   const website = profile?.data?.companyDetails?.companyWebsite || "N/A"
//   const location = profile?.data?.companyDetails?.companyLocation || "N/A"
//   const completionPercentage = profile?.data?.completionPercentage || 0;

//   return (
//     <div className="space-y-6 h-full flex flex-col justify-between">
//       {/* Contact & Location */}
//       <div>
//         <h3 className="text-lg font-bold text-white mb-4 border-b border-gray-700 pb-2">Contact & Basic Info</h3>

//         <div className="space-y-4">
//           <div className="flex items-start space-x-3">
//             <Mail className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
//             <div className="flex flex-col min-w-0">
//               <span className="text-xs text-gray-400">Email</span>
//               <span className="text-sm text-gray-300 break-all font-medium">{email}</span>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <Phone className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
//             <div className="flex flex-col min-w-0">
//               <span className="text-xs text-gray-400">Phone</span>
//               <span className="text-sm text-gray-300 font-medium">{phone}</span>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <Globe className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
//             <div className="flex flex-col min-w-0">
//               <span className="text-xs text-gray-400">Website</span>
//               <span className="text-sm text-gray-300 break-all font-medium">{website}</span>
//             </div>
//           </div>
//           <div className="flex items-start space-x-3">
//             <MapPin className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
//             <div className="flex flex-col min-w-0">
//               <span className="text-xs text-gray-400">Location</span>
//               <span className="text-sm text-gray-300 font-medium">{location}</span>
//             </div>
//           </div>
//         </div>
//       </div>
      
//       {/* Profile Status Card */}
//       <div className="bg-gray-700/30 rounded-xl border border-gray-600/50 p-4 mt-6">
//         <div className="text-center">
//           <div className="relative w-24 h-24 mx-auto mb-3">
//             <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
//               <path
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                 fill="none"
//                 stroke="#4b5563"
//                 strokeWidth="2.5"
//               />
//               <path
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                 fill="none"
//                 stroke="#3b82f6"
//                 strokeWidth="3"
//                 strokeDasharray={`${completionPercentage}, 100`}
//                 className="transition-all duration-700 ease-out"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-3xl font-extrabold text-blue-400">{completionPercentage}%</span>
//             </div>
//           </div>
//           <h4 className="font-semibold text-white mb-2">Profile Completion</h4>
//           <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors" onClick={() => navigate('/edit-profile')}>
//             {completionPercentage < 100 ? 'Complete Your Profile →' : 'Edit Your Profile →'}
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useNavigate } from "react-router-dom"
import { Mail, Phone, Globe, MapPin } from "lucide-react"
// import type { StartupProfileResponse } from "@/types/startup"

// interface ProfileInfoProps { profile: StartupProfileResponse | null | undefined }

export default function ProfileInfo({ profile }) {
  const navigate = useNavigate();
  const email = profile?.data?.companyDetails?.companyEmail || "N/A"
  const phone = profile?.data?.companyDetails?.companyPhone || "N/A"
  const website = profile?.data?.companyDetails?.companyWebsite || "N/A"
  const location = profile?.data?.companyDetails?.companyLocation || "N/A"
  const completionPercentage = profile?.data?.completionPercentage || 0;

  return (
    <div className="space-y-6 h-full flex flex-col justify-between">
      {/* Contact & Location */}
      <div>
        {/* Heading text is dark, border is light gray */}
        <h3 className="text-lg font-bold text-gray-800 mb-4 border-b border-gray-200 pb-2">Contact & Basic Info</h3>

        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            {/* Icon color is dark blue */}
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0">
              {/* Labels are medium gray */}
              <span className="text-xs text-gray-500">Email</span>
              {/* Values are dark gray */}
              <span className="text-sm text-gray-800 break-all font-medium">{email}</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-500">Phone</span>
              <span className="text-sm text-gray-800 font-medium">{phone}</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Globe className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-500">Website</span>
              <span className="text-sm text-gray-800 break-all font-medium">{website}</span>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0 mt-1" />
            <div className="flex flex-col min-w-0">
              <span className="text-xs text-gray-500">Location</span>
              <span className="text-sm text-gray-800 font-medium">{location}</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Status Card */}
      {/* Background is light gray/white, border is light */}
      <div className="bg-gray-50/50 rounded-xl border border-gray-200/50 p-4 mt-6">
        <div className="text-center">
          <div className="relative w-24 h-24 mx-auto mb-3">
            <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                // Track color is light gray
                stroke="#e5e7eb" 
                strokeWidth="2.5"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                // Progress color is a deeper blue
                stroke="#2563eb"
                strokeWidth="3"
                strokeDasharray={`${completionPercentage}, 100`}
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Percentage color is a deeper blue */}
              <span className="text-3xl font-extrabold text-blue-600">{completionPercentage}%</span>
            </div>
          </div>
          {/* Heading is dark gray */}
          <h4 className="font-semibold text-gray-800 mb-2">Profile Completion</h4>
          {/* Button link is a deeper blue */}
          <button 
            className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors" 
            onClick={() => navigate('/edit-profile')}
          >
            {completionPercentage < 100 ? 'Complete Your Profile →' : 'Edit Your Profile →'}
          </button>
        </div>
      </div>
    </div>
  )
}