


// import React from "react";
// import {
//   FileText,
//   Cpu,
//   TrendingUp,
//   DollarSign,
//   Bell,
//   ChevronRight,
//   Zap, // Added a generic icon for the header
// } from "lucide-react";

// interface NavItem {
//   id: string;
//   label: string;
//   icon: React.ElementType;
//   description: string;
// }

// const sidebarNavItems: NavItem[] = [
//   {
//     id: "resources",
//     label: "Resources",
//     icon: FileText,
//     description: "Access funding resources",
//   },
//   {
//     id: "ai-pitch-review",
//     label: "AI Suite",
//     icon: Cpu,
//     description: "Get AI feedback on your pitch",
//   },
//   {
//     id: "trending",
//     label: "Trending",
//     icon: TrendingUp,
//     description: "See what's trending",
//   },
//   {
//     id: "funding-opportunity",
//     label: "Evalon AI",
//     icon: DollarSign,
//     description: "AI-powered pitch feedback",
//   },
//   {
//     id: "announcement",
//     label: "Announcement",
//     icon: Bell,
//     description: "Latest announcements",
//   },
// ];

// interface SidebarProps {
//   isSidebarOpen: boolean;
//   activeSection: string;
//   onSectionChange: (sectionId: string) => void;
//   onToggleSidebar: () => void;
// }

// export function Sidebar({
//   isSidebarOpen,
//   activeSection,
//   onSectionChange,
//   onToggleSidebar,
// }: SidebarProps) {
//   return (
//     <>
//       {/* Backdrop for mobile (matches EditProfileSidebar) */}
//       {isSidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
//           onClick={onToggleSidebar}
//         />
//       )}

//       {/* Sidebar Container */}
//       <div
//         className={`
//         fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 
//         backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-50
//         transform transition-transform duration-300 ease-in-out
//         ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
//       `}
//       >
//         {/* Header */}
//         <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
//           <div className="flex items-center space-x-3">
//             {/* Used a generic icon here, you can change it */}
//             <Zap className="h-6 w-6 text-purple-400" />
//             <h2 className="text-xl font-bold text-white">Get Funded</h2>
//           </div>
//           <button
//             onClick={onToggleSidebar}
//             className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
//           >
//             <ChevronRight className="h-5 w-5 text-gray-400 hover:text-white" />
//           </button>
//         </div>

//         {/* Navigation Items */}
//         <div className="p-4 space-y-2">
//           {sidebarNavItems.map((section) => {
//             const Icon = section.icon;
//             const isActive = activeSection === section.id;

//             return (
//               <button
//                 key={section.id}
//                 onClick={() => onSectionChange(section.id)}
//                 className={`
//                   w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
//                   ${
//                     isActive
//                       ? "bg-purple-600/20 border border-purple-500/30 text-purple-300"
//                       : "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50"
//                   }
//                 `}
//               >
//                 <div
//                   className={`
//                   p-2 rounded-lg transition-colors duration-200
//                   ${
//                     isActive
//                       ? "bg-purple-600/20 text-purple-400"
//                       : "bg-gray-700/50 text-gray-400"
//                   }
//                 `}
//                 >
//                   <Icon className="h-5 w-5" />
//                 </div>
//                 <div className="flex-1 text-left">
//                   <div className="font-medium">{section.label}</div>
//                   <div className="text-xs text-gray-500 mt-1">
//                     {section.description}
//                   </div>
//                 </div>
//                 {isActive && (
//                   <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//     </>
//   );
// }

// // Export the navigation items for use in other components
// export { sidebarNavItems };
// export type { NavItem };

import React from "react";
import {
  FileText,
  Cpu,
  TrendingUp,
  DollarSign,
  Bell,
  ChevronRight,
  Zap, 
} from "lucide-react";

export interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

export const sidebarNavItems: NavItem[] = [
  {
    id: "resources",
    label: "Resources",
    icon: FileText,
    description: "Access funding resources",
  },
  {
    id: "ai-pitch-review",
    label: "AI Suite",
    icon: Cpu,
    description: "Get AI feedback on your pitch",
  },
  {
    id: "trending",
    label: "Trending",
    icon: TrendingUp,
    description: "See what's trending",
  },
  {
    id: "funding-opportunity",
    label: "Evalon AI",
    icon: DollarSign,
    description: "AI-powered pitch feedback",
  },
  {
    id: "announcement",
    label: "Announcement",
    icon: Bell,
    description: "Latest announcements",
  },
];

interface SidebarProps {
  isSidebarOpen: boolean;
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
  onToggleSidebar: () => void;
}

export function Sidebar({
  isSidebarOpen,
  activeSection,
  onSectionChange,
  onToggleSidebar,
}: SidebarProps) {
  return (
    <>
      {/* Backdrop for mobile */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Sidebar Container - Light Theme */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-white
        backdrop-blur-xl border-r border-slate-200 shadow-xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            {/* Changed to Blue */}
            <Zap className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-slate-900">Get Funded</h2>
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 text-slate-500 hover:text-slate-900" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="p-4 space-y-2">
          {sidebarNavItems.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 text-left
                  ${
                    isActive
                      // Changed to Blue Theme
                      ? "bg-blue-50 border border-blue-200 text-blue-700"
                      : "bg-white border border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }
                `}
              >
                <div
                  className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      // Changed to Blue Theme
                      ? "bg-blue-100 text-blue-700"
                      : "bg-slate-100 text-slate-500"
                  }
                `}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-slate-500 mt-1">
                    {section.description}
                  </div>
                </div>
                {isActive && (
                  // Changed to Blue
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}