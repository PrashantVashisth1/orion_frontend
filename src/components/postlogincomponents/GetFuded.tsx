
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { 
    Search, // For Investor Discovery
    Rocket, // For Accelerator/Grant Connect
    Presentation, // For Pitch Day Sessions
    Shield, // For Zero Equity
    Sparkles, // For AI-Powered Funding Readiness
    Trello, // For AI toolkits & smart templates
} from "lucide-react" 
import LoginForm from "@/components/auth/login-form"
// import { useAuth } from "@/contexts/AuthContext"

export default function GetFundedComponent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  // const { user } = useAuth()

  const sessionTypes = [
    {
      icon: Search, // Relevant Icon: Search/Discovery
      title: "Investor Discovery & Matching",
      description: "Access curated lists of global angel investors, syndicates, VCs, and institutional Investors.",
      // Light theme colors: light background, dark text/border accent
      color: "bg-blue-100/50 text-blue-700 border-blue-300/50",
      glowColor: "group-hover:shadow-blue-300/50",
    },
    {
      icon: Rocket, // Relevant Icon: Accelerator/Launch
      title: "Accelerator & Grant Connect",
      description: "Explore vetted Accelerators, Incubators, and Grant programs across the globe-in Real Time.",
      // Light theme colors
      color: "bg-yellow-100/50 text-yellow-700 border-yellow-300/50",
      glowColor: "group-hover:shadow-yellow-300/50",
    },
    {
      icon: Presentation, // Relevant Icon: Pitch/Presentation
      title: "Pitch Day Sessions & Demo Events",
      description: "Present your startup to Investors and Ecosystem partners directly in our exclusive Pitch Day & Demo events.",
      // Light theme colors
      color: "bg-green-100/50 text-green-700 border-green-300/50",
      glowColor: "group-hover:shadow-green-300/50",
    },
    {
      icon: Shield, // Relevant Icon: Protection/Security (Equity)
      title: "Zero Equity. 100 % Founder-owned",
      description: "We don't take equity—your company stays fully yours while you scale.",
      // Light theme colors
      color: "bg-purple-100/50 text-purple-700 border-purple-300/50", 
      glowColor: "group-hover:shadow-purple-300/50",
    },
    {
      icon: Sparkles, // Relevant Icon: AI/Intelligence/Magic
      title: "AI-Powered Funding Readiness",
      description: "Get a funding score, insights, and action steps tailored to your stage and sector.",
      // Light theme colors
      color: "bg-pink-100/50 text-pink-700 border-pink-300/50", 
      glowColor: "group-hover:shadow-pink-300/50",
    },
    {
      icon: Trello, // Relevant Icon: Toolkits/Organization
      title: "AI toolkits & smart templates",
      description: "Make your startup journey smoother with our exclusive AI Suite toolkit. Get sector-wise fundraising tools, financial models, legal docs and much more for free!",
      // Light theme colors
      color: "bg-red-100/50 text-red-700 border-red-300/50", 
      glowColor: "group-hover:shadow-red-300/50",
    },
  ]

  return (
    <div className="max-w-9xl mx-auto px-4 py-12 space-y-16">
      {/* Get Funded Section */}
      <section
        // Main section background changed to light gray/white
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 rounded-2xl p-8 lg:p-12 overflow-hidden border border-gray-200"
      >
        
        {/* Animated background elements (colors made lighter/more subtle) */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
          <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
        </div>

        {/* Subtle grid pattern adjusted for light background */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

        <div className="relative text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-extrabold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600">
            Get Funded
          </h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Fuel your startup with smart capital & AI-backed support
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {sessionTypes.map((session, index) => {
            const IconComponent = session.icon
            return (
              <Card
                key={index}
                className={`
                    group hover:shadow-2xl transition-all duration-500 
                     border-gray-200/50 
                    bg-white/70 backdrop-blur-md 
                    hover:bg-white/90 
                    hover:border-gray-300/50 
                    hover:-translate-y-1 
                    ${session.glowColor.replace('shadow-blue-500/25', 'shadow-blue-300/50').replace('shadow-yellow-500/25', 'shadow-yellow-300/50').replace('shadow-green-500/25', 'shadow-green-300/50').replace('shadow-purple-500/25', 'shadow-purple-300/50').replace('shadow-pink-500/25', 'shadow-pink-300/50').replace('shadow-red-500/25', 'shadow-red-300/50')} 
                    shadow-lg shadow-gray-200/50
                    animate-in fade-in-0 slide-in-from-bottom-4 duration-700
                `}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-6 flex items-start space-x-4">
                  <div className={`
                        p-3 rounded-full border-2 
                        // Icon background changed to light gray
                        bg-gray-100/80 backdrop-blur-sm 
                        ${session.color.replace('500/20', '600/50').replace('-400', '-700').replace('border-500/30', 'border-600/50')}
                        group-hover:scale-105 
                        group-hover:shadow-lg 
                        group-hover:shadow-current/50
                        transition-all duration-300
                    `}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  
                  <div className="text-left flex-1">
                    {/* Text color changed to dark gray */}
                    <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-800 transition-colors duration-300">
                      {session.title}
                    </h3>
                    {/* Description color changed to medium gray */}
                    <p className="text-base text-gray-700 group-hover:text-gray-600 transition-colors duration-300">
                      {session.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </section>

      {/* Login Modal (unchanged - assumes LoginForm handles its own light/dark styling) */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Sign in to your account to start fundraising
            </DialogDescription>
          </DialogHeader>
          <LoginForm onClose={() => setIsLoginModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}