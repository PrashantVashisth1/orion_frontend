// src/pages/StudentEditProfile.tsx

import { useState } from "react";
import Navbarpostlogin from "@/components/Students-Components/StudentPostLoginNavbar";
import StudentSidebar from "../../../components/Students-Components/Edit-Profile/Sidebar";
import StudentPersonalInfoSection from "../../../components/Students-Components/Edit-Profile/Personal_Info";
import StudentEducationSection from "../../../components/Students-Components/Edit-Profile/Education";
import StudentWorkExperienceSection from "../../../components/Students-Components/Edit-Profile/Work_Experience";
import StudentSkillsSection from "../../../components/Students-Components/Edit-Profile/Skills";

export default function StudentEditProfile() {
  const [activeSection, setActiveSection] = useState("personal-info");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal-info":
        return <StudentPersonalInfoSection onSectionChange={setActiveSection} />;
      case "education":
        return <StudentEducationSection onSectionChange={setActiveSection} />;
      case "work-experience":
        return <StudentWorkExperienceSection onSectionChange={setActiveSection} />;
      case "skills":
        return <StudentSkillsSection  />;
      default:
        return <StudentPersonalInfoSection onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <Navbarpostlogin 
          onSidebarToggle={toggleSidebar}
        />
      </div>
      
      {/* Sidebar */}
      <StudentSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 px-[204px] py-[60px]">
        <main className="pb-8 w-full">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}