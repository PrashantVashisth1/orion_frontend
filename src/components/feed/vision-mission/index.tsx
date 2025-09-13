// import { Eye, Target } from "lucide-react"

// export default function VisionMission() {
//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
//       <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//         <div className="flex items-center space-x-2 mb-4">
//           <Eye className="h-5 w-5 text-gray-400" />
//           <h3 className="text-lg font-bold text-white">Vision of Company</h3>
//         </div>
//         <ul className="space-y-3 text-sm text-gray-300">
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             To enable 100 million small businesses in India to succeed online.
//           </li>
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             Create a level playing field for sellers from Tier 2+ cities and rural areas.
//           </li>
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             Make digital entrepreneurship accessible, inclusive, and scalable across the country.
//           </li>
//         </ul>
//       </div>

//       <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//         <div className="flex items-center space-x-2 mb-4">
//           <Target className="h-5 w-5 text-gray-400" />
//           <h3 className="text-lg font-bold text-white">Mission of Company</h3>
//         </div>
//         <ul className="space-y-3 text-sm text-gray-300">
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             To democratize internet commerce for everyone in India.
//           </li>
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             Empower individuals from all backgrounds— especially women and small entrepreneurs—to start their own online
//             businesses.
//           </li>
//           <li className="flex items-start">
//             <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
//             Provide a zero-investment platform with easy product sourcing and sharing tools.
//           </li>
//         </ul>
//       </div>
//     </div>
//   )
// }


import { Eye, Target } from "lucide-react";
import type { StartupProfileResponse } from "@/types/startup";

interface VisionMissionProps {
  profile: StartupProfileResponse | null | undefined;
}

export default function VisionMission({ profile }: VisionMissionProps) {
  const vision = profile?.data?.companyDetails?.vision || "No company vision available.";
  const mission = profile?.data?.companyDetails?.mission || "No company mission available.";

  // Function to split the mission/vision into list items if needed.
  // This assumes the data is a single string and splits by line breaks or a separator.
  const formatTextAsList = (text: string) => {
    return text.split('\n').map((item, index) => (
      <li key={index} className="flex items-start">
        <span className="w-2 h-2 bg-gray-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        {item.trim()}
      </li>
    ));
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
        <div className="flex items-center space-x-2 mb-4">
          <Eye className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-bold text-white">Vision of Company</h3>
        </div>
        <ul className="space-y-3 text-sm text-gray-300">
          {formatTextAsList(vision)}
        </ul>
      </div>

      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="h-5 w-5 text-gray-400" />
          <h3 className="text-lg font-bold text-white">Mission of Company</h3>
        </div>
        <ul className="space-y-3 text-sm text-gray-300">
          {formatTextAsList(mission)}
        </ul>
      </div>
    </div>
  );
}