// src/components/edit-profile/StudentSidebar.tsx

import { 
  User, 
  GraduationCap, 
  Briefcase, 
  Award,
  ChevronRight,
} from "lucide-react";

interface StudentSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function StudentSidebar({ 
  activeSection, 
  onSectionChange, 
  isOpen, 
  onToggle 
}: StudentSidebarProps) {
  const sections = [
    {
      id: "personal-info",
      label: "Personal Info",
      icon: User,
      description: "Basic personal information"
    },
    {
      id: "education",
      label: "Education",
      icon: GraduationCap,
      description: "Basic Education information"
    },
    {
      id: "work-experience",
      label: "Work Experience",
      icon: Briefcase,
      description: "Share your Experience"
    },
    {
      id: "skills",
      label: "Skills",
      icon: Award,
      description: "Showcase your skills"
    }
  ];

  return (
    <>
      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-80 bg-white border-r border-gray-200 shadow-lg z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-900">Edit Profile</h2>
          </div>
          <button
            onClick={onToggle}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            <ChevronRight className="h-5 w-5 cursor-pointer text-gray-600 hover:text-gray-900 " />
          </button>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`
                  w-full flex cursor-pointer items-center space-x-3 p-4 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-50 border border-blue-200 text-blue-700' 
                    : 'bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 hover:border-gray-300'
                  }
                `}
              >
                <div className={`
                  p-2 rounded-lg transition-colors duration-200
                  ${isActive 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-200 text-gray-600'
                  }
                `}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium">{section.label}</div>
                  <div className="text-xs text-gray-500 mt-1">{section.description}</div>
                </div>
                {isActive && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-2">Profile Completion</p>
            <div className="w-full cursor-pointer bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 25)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {Math.min(100, (sections.findIndex(s => s.id === activeSection) + 1) * 25)}% Complete
            </p>
          </div>
        </div>
      </div>
    </>
  );
}