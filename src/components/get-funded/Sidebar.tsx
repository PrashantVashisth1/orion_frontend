// import React from "react";
// import { cn } from "@/lib/utils";
// import {
//   FileText,
//   Cpu,
//   TrendingUp,
//   DollarSign,
//   Bell,
//   ChevronRight,
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
//     <div
//       className={cn(
//         "fixed inset-y-0 z-30 flex w-72 flex-col bg-gray-900 transition-transform duration-300 ease-in-out",
//         isSidebarOpen ? "translate-x-0" : "-translate-x-full"
//       )}
//     >
//       {/* Sidebar Header */}
//       <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
//         <h2 className="text-xl font-semibold text-white">Get Funded</h2>
//         <button
//           onClick={onToggleSidebar}
//           className="text-gray-400 hover:text-white"
//         >
//           <ChevronRight className="h-6 w-6" />
//         </button>
//       </div>
      

//       {/* Sidebar Content */}
//       <div className="flex-1 overflow-y-auto py-4">
//         <nav className="space-y-2 px-3">
//           {sidebarNavItems.map((section) => (
//             <button
//               key={section.id}
//               onClick={() => onSectionChange(section.id)}
//               className={cn(
//                 "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors",
//                 activeSection === section.id
//                   ? "bg-purple-600 text-white"
//                   : "text-gray-400 hover:bg-gray-800 hover:text-white"
//               )}
//             >
//               <section.icon className="mr-3 h-5 w-5" />
//               <div className="flex flex-col items-start">
//                 <span className="font-medium">{section.label}</span>
//                 <span className="text-xs text-gray-400">
//                   {section.description}
//                 </span>
//               </div>
//             </button>
//           ))}
//         </nav>
//       </div>
//     </div>
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
  Zap, // Added a generic icon for the header
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  description: string;
}

const sidebarNavItems: NavItem[] = [
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
      {/* Backdrop for mobile (matches EditProfileSidebar) */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggleSidebar}
        />
      )}

      {/* Sidebar Container */}
      <div
        className={`
        fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 
        backdrop-blur-xl border-r border-gray-700/50 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            {/* Used a generic icon here, you can change it */}
            <Zap className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Get Funded</h2>
          </div>
          <button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-400 hover:text-white" />
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
                  w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
                  ${
                    isActive
                      ? "bg-purple-600/20 border border-purple-500/30 text-purple-300"
                      : "bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50"
                  }
                `}
              >
                <div
                  className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${
                    isActive
                      ? "bg-purple-600/20 text-purple-400"
                      : "bg-gray-700/50 text-gray-400"
                  }
                `}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {section.description}
                  </div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

// Export the navigation items for use in other components
export { sidebarNavItems };
export type { NavItem };