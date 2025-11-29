
// import { 
//   User, 
//   Building2, 
//   Briefcase, 
//   Heart, 
//   ShoppingCart,
//   ChevronRight,
// } from "lucide-react"


// interface EditProfileSidebarProps {
//   activeSection: string
//   onSectionChange: (section: string) => void
//   isOpen: boolean
//   onToggle: () => void
// }

// export default function EditProfileSidebar({ 
//   activeSection, 
//   onSectionChange, 
//   isOpen, 
//   onToggle 
// }: EditProfileSidebarProps) {
//   const sections = [
//     {
//       id: "personal-info",
//       label: "Personal Info",
//       icon: User,
//       description: "Basic personal information"
//     },
//     {
//       id: "business-details",
//       label: "Business Details",
//       icon: Building2,
//       description: "Company and business information"
//     },
//     {
//       id: "company-details",
//       label: "Company Details",
//       icon: Briefcase,
//       description: "Detailed company information"
//     },
//     {
//       id: "interests",
//       label: "Interests of Company",
//       icon: Heart,
//       description: "Company interests and focus areas"
//     },
//     {
//       id: "offerings",
//       label: "Offerings of Company",
//       icon: ShoppingCart,
//       description: "Products and services offered"
//     }
//   ]

//   return (
//     <>
//       {/* Backdrop for mobile */}
//       {isOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={onToggle}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 
//         backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
//           <div className="flex items-center space-x-3">
//             <User className="h-6 w-6 text-purple-400" />
//             <h2 className="text-xl font-bold text-white">Edit Profile</h2>
//           </div>
//           <button
//             onClick={onToggle}
//             className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
//           >
//             <ChevronRight className="h-5 w-5 text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         {/* Navigation */}
//         <div className="p-4 space-y-2">
//           {sections.map((section) => {
//             const Icon = section.icon
//             const isActive = activeSection === section.id
            
//             return (
//               <button
//                 key={section.id}
//                 onClick={() => onSectionChange(section.id)}
//                 className={`
//                   w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
//                   ${isActive 
//                     ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300' 
//                     : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50'
//                   }
//                 `}
//               >
//                 <div className={`
//                   p-2 rounded-lg transition-colors duration-200
//                   ${isActive 
//                     ? 'bg-purple-600/20 text-purple-400' 
//                     : 'bg-gray-700/50 text-gray-400'
//                   }
//                 `}>
//                   <Icon className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 text-left">
//                   <div className="font-medium">{section.label}</div>
//                   <div className="text-xs text-gray-500 mt-1">{section.description}</div>
//                 </div>
//                 {isActive && (
//                   <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//                 )}
//               </button>
//             )
//           })}
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700/50">
//           <div className="text-center">
//             <p className="text-xs text-gray-500 mb-2">Profile Completion</p>
//             <div className="w-full bg-gray-700 rounded-full h-2">
//               <div 
//                 className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
//                 style={{ width: `${Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 20)}%` }}
//               ></div>
//             </div>
//             <p className="text-xs text-gray-400 mt-2">
//               {Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 20)}% Complete
//             </p>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// } 

import { 
  User, 
  Building2, 
  Briefcase, 
  Heart, 
  ShoppingCart,
  ChevronRight,
} from "lucide-react"

interface EditProfileSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen: boolean
  onToggle: () => void
}

export default function EditProfileSidebar({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle 
}: EditProfileSidebarProps) {
  const sections = [
    {
      id: "personal-info",
      label: "Personal Info",
      icon: User,
      description: "Basic personal information"
    },
    {
      id: "business-details",
      label: "Business Details",
      icon: Building2,
      description: "Company and business information"
    },
    {
      id: "company-details",
      label: "Company Details",
      icon: Briefcase,
      description: "Detailed company information"
    },
    {
      id: "interests",
      label: "Interests of Company",
      icon: Heart,
      description: "Company interests and focus areas"
    },
    {
      id: "offerings",
      label: "Offerings of Company",
      icon: ShoppingCart,
      description: "Products and services offered"
    }
  ]

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white
        backdrop-blur-xl border-r border-slate-200 shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Edit Profile</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 text-slate-500 hover:text-slate-900" />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon
            const isActive = activeSection === section.id
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                    : 'bg-white border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'bg-slate-100 text-slate-500'
                  }
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-slate-500 mt-1">{section.description}</div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            )
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-100">
          <div className="text-center">
            <p className="text-xs text-slate-500 mb-2">Profile Completion</p>
            <div className="w-full bg-slate-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 20)}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              {Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 20)}% Complete
            </p>
          </div>
        </div>
      </div>
    </>
  )
}