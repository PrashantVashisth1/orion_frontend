import { CardHeader } from "../ui/card";
import { Button } from "@/components/ui/button";
import {
  X,
  Briefcase,
  Users,
  FlaskConical,
  Heart,
  Sparkles,
  // ArrowRight,
  // Upload,
  // Image as ImageIcon,
} from "lucide-react";

const TABS_CONFIG = [
  {
    id: "live-projects",
    label: "Live Projects",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "internship",
    label: "Internship",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "research",
    label: "Research",
    icon: FlaskConical,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "csr-initiative",
    label: "CSR Initiative",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
];





// Enhanced Main Header Component
export const MainHeader = ({ activeTab, onTabChange }) => (
  
  <CardHeader className="relative p-0 m-0 overflow-hidden">
    <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-between px-8 py-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Share your Needs
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h1>
            <p className="text-purple-200 text-lg">
              Post opportunities and connect with talent
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-xl h-12 w-12"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="flex border-t border-white/20 bg-black/20 backdrop-blur-sm">
        {TABS_CONFIG.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 px-6 py-5 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-10`}
                ></div>
              )}
              <div className="relative z-10 flex items-center space-x-2">
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </CardHeader>
);