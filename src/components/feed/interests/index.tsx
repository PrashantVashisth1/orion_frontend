// import { Check, ToggleLeft, ToggleRight } from "lucide-react"

// const interests = [
//   { name: "Advertise", color: "bg-blue-900/50 text-blue-300 border border-blue-700/50", hasCheck: true },
//   { name: "Share Ideas", color: "bg-pink-900/50 text-pink-300 border border-pink-700/50", hasToggle: true, toggleOn: true },
//   { name: "Network", color: "bg-yellow-900/50 text-yellow-300 border border-yellow-700/50", hasCheck: false },
//   { name: "Raise Funding", color: "bg-orange-900/50 text-orange-300 border border-orange-700/50", hasCheck: true },
//   { name: "Post Requirements", color: "bg-purple-900/50 text-purple-300 border border-purple-700/50", hasCheck: true },
//   { name: "Internships", color: "bg-blue-900/50 text-blue-300 border border-blue-700/50", hasToggle: true, toggleOn: true },
//   { name: "Conduct Brainstorming and GL", color: "bg-red-900/50 text-red-300 border border-red-700/50", hasToggle: true, toggleOn: false },
//   { name: "Live Projects", color: "bg-green-900/50 text-green-300 border border-green-700/50", hasToggle: true, toggleOn: true },
//   { name: "Get Ideas", color: "bg-blue-900/50 text-blue-300 border border-blue-700/50", hasCheck: true },
// ]

// export default function Interests() {
//   return (
//     <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-xl font-bold text-white mb-6">Interested in</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {interests.map((interest, index) => (
//           <div key={index} className={`${interest.color} rounded-lg px-4 py-3 flex items-center justify-between`}>
//             <span className="font-medium">{interest.name}</span>
//             {interest.hasCheck && <Check className="h-4 w-4" />}
//             {interest.hasToggle &&
//               (interest.toggleOn ? <ToggleRight className="h-5 w-5" /> : <ToggleLeft className="h-5 w-5" />)}
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

import { Check, ToggleLeft, ToggleRight } from "lucide-react"
import type { StartupProfileResponse } from "@/types/startup"

interface InterestsProps {
  profile: StartupProfileResponse | null | undefined
}

export default function Interests({ profile }: InterestsProps) {
  const interestsData = profile?.data?.interests || {};
  console.log(interestsData)
  // const technologyInterestsData = profile?.data?.technologyInterests || {};

  // Combine data from different sections into a single list
  const combinedInterests = [
    { name: interestsData?.primaryIndustry, category: 'industry' },
    { name: interestsData.secondaryIndustry, category: 'industry' },
    { name: interestsData.primaryTargetMarket, category: 'market' },
    { name: interestsData.geographicFocus, category: 'geographic' },
    { name: interestsData.marketDescription, category: 'description' },
    { name: interestsData.partnershipGoals, category: 'goals' },
    { name: interestsData.innovationDescription, category: 'innovation' },
    // { name: technologyInterestsData.other_tech, category: 'other-tech' },
  ].filter(item => item.name); // Filter out null or empty values

  // Map boolean technology interests
  // const techInterests = [
  //   { name: 'AI/ML', value: technologyInterestsData.ai_ml },
  //   { name: 'Blockchain', value: technologyInterestsData.blockchain },
  //   { name: 'Cloud Computing', value: technologyInterestsData.cloud_computing },
  //   { name: 'Cybersecurity', value: technologyInterestsData.cybersecurity },
  //   { name: 'IoT', value: technologyInterestsData.iot },
  //   { name: 'Fintech', value: technologyInterestsData.fintech },
  //   { name: 'Healthtech', value: technologyInterestsData.healthtech },
  //   { name: 'Edtech', value: technologyInterestsData.edtech },
  //   { name: 'Sustainability Tech', value: technologyInterestsData.sustainability_tech },
  // ].filter(item => item.value);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
      <h3 className="text-xl font-bold text-white mb-6">Interested in</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {combinedInterests.map((interest, index) => (
          <div key={index} className={`bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-lg px-4 py-3 flex items-center justify-between`}>
            <span className="font-medium">{interest.name}</span>
            <Check className="h-4 w-4 text-green-400" />
          </div>
        ))}
        {/* {techInterests.map((tech, index) => (
          <div key={`tech-${index}`} className={`bg-gray-700/50 text-gray-300 border border-gray-600/50 rounded-lg px-4 py-3 flex items-center justify-between`}>
            <span className="font-medium">{tech.name}</span>
            {tech.value ? <ToggleRight className="h-5 w-5 text-blue-400" /> : <ToggleLeft className="h-5 w-5 text-gray-400" />}
          </div>
        ))} */}
      </div>
    </div>
  );
}