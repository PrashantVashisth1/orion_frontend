import { useState } from "react";
import { cn } from "@/lib/utils";
import { ResourcesSection } from "@/components/get-funded/ResourcesSection";
import { AIPitchReviewSection } from "@/components/get-funded/AIPitchReviewSection";
import { TrendingSection } from "@/components/get-funded/TrendingSection";
import { FundingOpportunitySection } from "@/components/get-funded/FundingOpportunitySection";
import { AnnouncementSection } from "@/components/get-funded/AnnouncementSection";
import { Sidebar, sidebarNavItems } from "@/components/get-funded/Sidebar";
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";

const GetFundedPage = () => {
  const [activeSection, setActiveSection] = useState<string>("resources");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900">
      {/* Navbar with higher z-index and Sidebar Toggle */}
      <div className="relative z-50">
        <Navbarpostlogin 
          onSidebarToggle={toggleSidebar}
          showSidebarButton={true} 
        />
      </div>

      <div className="flex h-full relative">
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onToggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-8 pt-24 transition-all duration-300 ease-in-out",
            // Adjusted margin to match the new w-80 (320px) sidebar width
            // 80 * 4px = 320px
            isSidebarOpen ? "ml-80" : "ml-0"
          )}
        >
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-6 text-3xl font-bold text-white">
              {sidebarNavItems.find((item) => item.id === activeSection)?.label}
            </h1>
            {(() => {
              switch (activeSection) {
                case "resources":
                  return <ResourcesSection />;
                case "ai-pitch-review":
                  return <AIPitchReviewSection />;
                case "trending":
                  return <TrendingSection />;
                case "funding-opportunity":
                  return <FundingOpportunitySection />;
                case "announcement":
                  return <AnnouncementSection />;
                default:
                  return (
                    <div className="rounded-lg bg-gray-800/50 p-6 text-gray-300">
                      Content for{" "}
                      {
                        sidebarNavItems.find(
                          (item) => item.id === activeSection
                        )?.label
                      }{" "}
                      will be displayed here
                    </div>
                  );
              }
            })()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default GetFundedPage;
