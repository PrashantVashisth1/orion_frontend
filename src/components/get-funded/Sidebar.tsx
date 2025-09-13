import React from "react";
import { cn } from "@/lib/utils";
import {
  FileText,
  Cpu,
  TrendingUp,
  DollarSign,
  Bell,
  ChevronRight,
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
    label: "AI Pitch Review",
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
    label: "Funding Opportunity",
    icon: DollarSign,
    description: "Explore funding opportunities",
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
    <div
      className={cn(
        "fixed inset-y-0 z-30 flex w-72 flex-col bg-gray-900 transition-transform duration-300 ease-in-out",
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}
    >
      {/* Sidebar Header */}
      <div className="flex h-16 items-center justify-between border-b border-gray-800 px-4">
        <h2 className="text-xl font-semibold text-white">Get Funded</h2>
        <button
          onClick={onToggleSidebar}
          className="text-gray-400 hover:text-white"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
      

      {/* Sidebar Content */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="space-y-2 px-3">
          {sidebarNavItems.map((section) => (
            <button
              key={section.id}
              onClick={() => onSectionChange(section.id)}
              className={cn(
                "flex w-full items-center rounded-lg px-3 py-2 text-sm transition-colors",
                activeSection === section.id
                  ? "bg-purple-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              )}
            >
              <section.icon className="mr-3 h-5 w-5" />
              <div className="flex flex-col items-start">
                <span className="font-medium">{section.label}</span>
                <span className="text-xs text-gray-400">
                  {section.description}
                </span>
              </div>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

// Export the navigation items for use in other components
export { sidebarNavItems };
export type { NavItem };
