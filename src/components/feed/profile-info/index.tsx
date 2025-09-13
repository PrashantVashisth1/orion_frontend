// import { Mail, Phone, Globe } from "lucide-react"

// export default function ProfileInfo() {
//   return (
//     <div className="space-y-6">
//       {/* Startup Information Card */}
//       <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
//         <h3 className="font-semibold text-white mb-4">Startup Information/ Highlights</h3>

//         <div className="space-y-4">
//           <div className="flex items-center space-x-3">
//             <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
//             <span className="text-sm text-gray-300 break-all">Tech Flow AI1234@gmail.com</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
//             <span className="text-sm text-gray-300">+91 7868420255</span>
//           </div>
//           <div className="flex items-center space-x-3">
//             <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
//             <span className="text-sm text-gray-300">Global</span>
//           </div>
//         </div>
//       </div>

//       {/* Profile Status Card */}
//       <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
//         <div className="text-center">
//           <div className="relative w-20 h-20 mx-auto mb-4">
//             <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
//               <path
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                 fill="none"
//                 stroke="#374151"
//                 strokeWidth="2"
//               />
//               <path
//                 d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
//                 fill="none"
//                 stroke="#3b82f6"
//                 strokeWidth="2"
//                 strokeDasharray="75, 100"
//               />
//             </svg>
//             <div className="absolute inset-0 flex items-center justify-center">
//               <span className="text-2xl font-bold text-blue-400">75%</span>
//             </div>
//           </div>
//           <h4 className="font-semibold text-white mb-2">Profile Status</h4>
//           <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
//             Complete Your Profile →
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Mail, Phone, Globe } from "lucide-react"
import type { StartupProfileResponse } from "@/types/startup"

interface ProfileInfoProps {
  profile: StartupProfileResponse | null | undefined
}

export default function ProfileInfo({ profile }: ProfileInfoProps) {
  const email = profile?.data?.personalInfo?.email || "N/A"
  const phone = profile?.data?.personalInfo?.phone || "N/A"
  const website = profile?.data?.personalInfo?.website || "N/A"
  const completionPercentage = profile?.data?.completionPercentage || 0; 

  return (
    <div className="space-y-6">
      {/* Startup Information Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <h3 className="font-semibold text-white mb-4">Startup Information/ Highlights</h3>

        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-300 break-all">{email}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-300">{phone}</span>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="h-5 w-5 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-300">{website}</span>
          </div>
        </div>
      </div>

      {/* Profile Status Card */}
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-6 shadow-xl">
        <div className="text-center">
          <div className="relative w-20 h-20 mx-auto mb-4">
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#374151"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray={`${completionPercentage}, 100`}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-blue-400">{completionPercentage}%</span>
            </div>
          </div>
          <h4 className="font-semibold text-white mb-2">Profile Status</h4>
          {
            completionPercentage < 100 ? (
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            Complete Your Profile →
          </button>
            ) : (
              <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
            Edit Your Profile →
          </button>
            )
          }
        </div>
      </div>
    </div>
  )
}