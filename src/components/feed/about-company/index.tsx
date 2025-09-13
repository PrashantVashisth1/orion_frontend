// import { useState } from "react"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import { Button } from "@/components/ui/button"

// export default function AboutCompany() {
//   const [isExpanded, setIsExpanded] = useState(false)

//   const handleReadMore = () => {
//     setIsExpanded(!isExpanded)
//   }

//   return (
//     <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-xl font-bold text-white mb-4">About The Company</h3>
      
//       <div className="text-gray-300 leading-relaxed">
//         <p>
//           Tech Flow AI is India's leading social commerce platform that enables individuals and small businesses to start their
//           own online stores. Founded in 2015, it offers a wide range of products and services.
//         </p>
        
//         {isExpanded && (
//           <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
//             <p className="text-gray-300 text-sm leading-relaxed mb-3">
//               Our mission is to democratize e-commerce by providing innovative AI-powered solutions that help businesses 
//               grow and succeed in the digital marketplace. We specialize in machine learning algorithms that optimize 
//               product recommendations, inventory management, and customer engagement.
//             </p>
//             <div className="flex flex-wrap gap-2">
//               <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">E-commerce</span>
//               <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded">AI/ML</span>
//               <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">Social Commerce</span>
//               <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded">Technology</span>
//             </div>
//           </div>
//         )}
//       </div>

//       <div className="mt-4">
//         <Button 
//           variant="ghost" 
//           size="sm"
//           className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 p-0 h-auto"
//           onClick={handleReadMore}
//         >
//           {isExpanded ? 'Read Less' : 'Read more'}
//           {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
//         </Button>
//       </div>
//     </div>
//   )
// }

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { StartupProfileResponse } from "@/types/startup"

interface AboutCompanyProps {
  profile: StartupProfileResponse | null | undefined
}

export default function AboutCompany({ profile }: AboutCompanyProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const companyDescription = profile?.data?.companyDetails?.companyDescription || "No company description available."
  const vision = profile?.data?.companyDetails?.vision || "No vision available."

  const handleReadMore = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
      <h3 className="text-xl font-bold text-white mb-4">About The Company</h3>
      
      <div className="text-gray-300 leading-relaxed">
        <p>
          {isExpanded ? companyDescription : `${companyDescription.substring(0, 150)}...`}
        </p>
        
        {isExpanded && (
          <div className="mt-4 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
            <p className="text-gray-300 text-sm leading-relaxed mb-3">
              {vision}
            </p>
            {/* The following div would be for displaying interests or technologies,
                but for now, we'll leave it as a placeholder. We will improve this later.
            */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded">E-commerce</span>
              <span className="px-2 py-1 bg-green-600/20 text-green-300 text-xs rounded">AI/ML</span>
              <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded">Social Commerce</span>
              <span className="px-2 py-1 bg-orange-600/20 text-orange-300 text-xs rounded">Technology</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4">
        <Button 
          variant="ghost" 
          size="sm"
          className="text-blue-400 hover:text-blue-300 font-medium flex items-center gap-2 p-0 h-auto"
          onClick={handleReadMore}
        >
          {isExpanded ? 'Read Less' : 'Read more'}
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
    </div>
  )
}