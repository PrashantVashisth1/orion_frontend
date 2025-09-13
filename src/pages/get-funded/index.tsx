import { useState } from "react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourcesSection } from "@/components/get-funded/ResourcesSection";
import { AIPitchReviewSection } from "@/components/get-funded/AIPitchReviewSection";
import { TrendingSection } from "@/components/get-funded/TrendingSection";
import { FundingOpportunitySection } from "@/components/get-funded/FundingOpportunitySection";
import { AnnouncementSection } from "@/components/get-funded/AnnouncementSection";
import { Sidebar, sidebarNavItems } from "@/components/get-funded/Sidebar";

const GetFundedPage = () => {
  const [activeSection, setActiveSection] = useState<string>("resources");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <div className="flex h-full">
        {/* Toggle button for closed sidebar */}
        {!isSidebarOpen && (
          <Button
            variant="ghost"
            size="icon"
            className="fixed left-4 top-4 z-40 bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white"
            onClick={toggleSidebar}
          >
            <Menu className="h-6 w-6" />
          </Button>
        )}
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          onToggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <main
          className={cn(
            "flex-1 overflow-y-auto p-8 transition-all duration-300 ease-in-out",
            isSidebarOpen ? "ml-72" : "ml-0"
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
