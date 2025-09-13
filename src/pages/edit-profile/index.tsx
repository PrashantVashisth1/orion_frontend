

import { useState } from "react"
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin"
import EditProfileSidebar from "@/components/edit-profile/sidebar"
import PersonalInfoSection from "@/components/edit-profile/sections/PersonalInfoSection"
import BusinessDetailsSection from "@/components/edit-profile/sections/BusinessDetailsSection"
import CompanyDetailsSection from "@/components/edit-profile/sections/CompanyDetailsSection"
import InterestsSection from "@/components/edit-profile/sections/InterestsSection"
import OfferingsSection from "@/components/edit-profile/sections/OfferingsSection"

export default function EditProfile() {
  const [activeSection, setActiveSection] = useState("personal-info")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const renderSection = () => {
    switch (activeSection) {
      case "personal-info":
        return <PersonalInfoSection onSectionChange={setActiveSection} />
      case "business-details":
        return <BusinessDetailsSection onSectionChange={setActiveSection} />
      case "company-details":
        return <CompanyDetailsSection onSectionChange={setActiveSection} />
      case "interests":
        return <InterestsSection onSectionChange={setActiveSection} />
      case "offerings":
        return <OfferingsSection onSectionChange={setActiveSection} />
      default:
        return <PersonalInfoSection onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-900">
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <Navbarpostlogin 
          onSidebarToggle={toggleSidebar}
          showSidebarButton={true}
        />
      </div>
      
      {/* Sidebar */}
      <EditProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content - Fixed padding, no dynamic adjustment */}
      <div className="relative z-10 p-6 px-[204px] py-[60px]">
        <main className="pb-8 w-full">
          {renderSection()}
        </main>
      </div>
    </div>
  )
} 