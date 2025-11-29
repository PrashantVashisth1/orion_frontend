
// import { useState } from "react"
// import { ChevronDown, ChevronUp, Eye, Target, Briefcase } from "lucide-react"
// import { Button } from "@/components/ui/button"
// // import type { StartupProfileResponse } from "@/types/startup"

// // interface AboutCompanyProps { profile: StartupProfileResponse | null | undefined }

// export default function AboutCompany({ profile }) {
//   const [isExpanded, setIsExpanded] = useState(false)
//   const companyDescription = profile?.data?.companyDetails?.companyDescription || "No company description available."
//   const vision = profile?.data?.companyDetails?.vision || "No vision available."
//   const mission = profile?.data?.companyDetails?.mission || "No mission available."
  
//   // Get main attributes for highlights
//   const mainIndustry = profile?.data?.companyDetails?.industry || 'N/A';
//   const teamSize = profile?.data?.companyDetails?.teamSize || 'N/A';
//   const revenueRange = profile?.data?.companyDetails?.revenueRange || 'N/A';

//   const handleReadMore = () => {
//     setIsExpanded(!isExpanded)
//   }

//   return (
//     <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
//         <Briefcase className="h-6 w-6 text-blue-400" /> About & Overview
//       </h3>
      
//       {/* Highlights/Tags */}
//       <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-700 pb-4">
//         <span className="px-3 py-1 bg-green-600/20 text-green-300 text-sm rounded-full font-medium">Industry: {mainIndustry}</span>
//         <span className="px-3 py-1 bg-purple-600/20 text-purple-300 text-sm rounded-full font-medium">Team Size: {teamSize}</span>
//         <span className="px-3 py-1 bg-orange-600/20 text-orange-300 text-sm rounded-full font-medium">Revenue: {revenueRange}</span>
//       </div>

//       {/* Description */}
//       <div className="text-gray-300 leading-relaxed mb-6">
//         <h4 className="font-semibold text-white mb-2">Company Description</h4>
//         <p className="text-base">
//           {isExpanded || companyDescription.length < 300 ? companyDescription : `${companyDescription.substring(0, 300)}...`}
//         </p>
        
//         {companyDescription.length >= 300 && (
//           <div className="mt-4">
//             <Button 
//               variant="ghost" 
//               size="sm"
//               className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 p-0 h-auto"
//               onClick={handleReadMore}
//             >
//               {isExpanded ? 'Read Less' : 'Read more'}
//               {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//             </Button>
//           </div>
//         )}
//       </div>

//       {/* Vision & Mission - Always visible in full */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-700">
//         <VisionMissionCard 
//             title="Vision" 
//             icon={Eye} 
//             content={vision} 
//             color="text-indigo-400" 
//             bgColor="bg-indigo-600/10"
//         />
//         <VisionMissionCard 
//             title="Mission" 
//             icon={Target} 
//             content={mission} 
//             color="text-teal-400" 
//             bgColor="bg-teal-600/10"
//         />
//       </div>
//     </div>
//   )
// }

// // Internal component for cleaner code
// const VisionMissionCard = ({ title, icon: Icon, content, color, bgColor }) => (
//     <div className={`${bgColor} rounded-xl p-5 border border-gray-700/50`}>
//         <div className="flex items-center space-x-3 mb-3">
//             <Icon className={`h-5 w-5 ${color} flex-shrink-0`} />
//             <h4 className="text-lg font-bold text-white">{title}</h4>
//         </div>
//         <p className="text-sm text-gray-300 leading-relaxed italic">
//             "{content}"
//         </p>
//     </div>
// );

import { useState } from "react"
import { ChevronDown, ChevronUp, Eye, Target, Briefcase } from "lucide-react"
import { Button } from "@/components/ui/button"
// import type { StartupProfileResponse } from "@/types/startup"

// interface AboutCompanyProps { profile: StartupProfileResponse | null | undefined }

export default function AboutCompany({ profile }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const companyDescription = profile?.data?.companyDetails?.companyDescription || "No company description available."
  const vision = profile?.data?.companyDetails?.vision || "No vision available."
  const mission = profile?.data?.companyDetails?.mission || "No mission available."
  
  // Get main attributes for highlights
  const mainIndustry = profile?.data?.companyDetails?.industry || 'N/A';
  const teamSize = profile?.data?.companyDetails?.teamSize || 'N/A';
  const revenueRange = profile?.data?.companyDetails?.revenueRange || 'N/A';

  const handleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    // Light theme: White/Light Gray background, light border, soft shadow.
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-xl relative w-full">
      <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        {/* Icon color adjusted for contrast */}
        <Briefcase className="h-6 w-6 text-blue-600" /> About & Overview
      </h3>
      
      {/* Highlights/Tags */}
      <div className="flex flex-wrap gap-3 mb-6 border-b border-gray-200 pb-4">
        {/* Tags adjusted to use light backgrounds and dark text */}
        <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded-full font-medium border border-green-200">Industry: {mainIndustry}</span>
        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full font-medium border border-purple-200">Team Size: {teamSize}</span>
        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm rounded-full font-medium border border-orange-200">Revenue: {revenueRange}</span>
      </div>

      {/* Description */}
      <div className="text-gray-700 leading-relaxed mb-6">
        {/* Text colors adjusted */}
        <h4 className="font-semibold text-gray-900 mb-2">Company Description</h4>
        <p className="text-base">
          {isExpanded || companyDescription.length < 300 ? companyDescription : `${companyDescription.substring(0, 300)}...`}
        </p>
        
        {companyDescription.length >= 300 && (
          <div className="mt-4">
            <Button 
              variant="ghost" 
              size="sm"
              // Read more button color adjusted to a darker blue for contrast
              className="text-blue-600 hover:text-blue-700 font-medium flex items-center gap-2 p-0 h-auto"
              onClick={handleReadMore}
            >
              {isExpanded ? 'Read Less' : 'Read more'}
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        )}
      </div>

      {/* Vision & Mission - Always visible in full */}
      {/* Separator adjusted to light gray */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-200">
        <VisionMissionCard 
            title="Vision" 
            icon={Eye} 
            content={vision} 
            // Color variants adjusted for light theme
            color="text-indigo-600" 
            bgColor="bg-indigo-50"
        />
        <VisionMissionCard 
            title="Mission" 
            icon={Target} 
            content={mission} 
            // Color variants adjusted for light theme
            color="text-teal-600" 
            bgColor="bg-teal-50"
        />
      </div>
    </div>
  )
}

// Internal component for cleaner code
const VisionMissionCard = ({ title, icon: Icon, content, color, bgColor }) => (
    // Card background and border adjusted
    <div className={`${bgColor} rounded-xl p-5 border border-gray-200/50`}>
      <div className="flex items-center space-x-3 mb-3">
        {/* Icon and title colors adjusted */}
        <Icon className={`h-5 w-5 ${color} flex-shrink-0`} />
        <h4 className="text-lg font-bold text-gray-900">{title}</h4>
      </div>
      {/* Content text color adjusted */}
      <p className="text-sm text-gray-700 leading-relaxed italic">
        "{content}"
      </p>
    </div>
);