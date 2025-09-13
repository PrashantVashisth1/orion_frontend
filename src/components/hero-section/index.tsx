import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LoginForm from "@/components/auth/login-form"
import { useAuth } from "@/contexts/AuthContext"

import coinRollingVideo from "@/assets/videos/Coins.mp4"

const HeroSection = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  return (
    <section className="relative min-h-[70vh] max-h-[80vh] overflow-hidden rounded-3xl shadow-2xl mx-auto max-w-7xl">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-3xl"
      >
        <source src={coinRollingVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Container */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center text-white bg-black/30 rounded-3xl p-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-900 bg-opacity-50 text-blue-100 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Sparkles className="h-4 w-4" />
            <span>From Pre-Seed to Post-IPO</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            Welcome to World's{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Largest Platform
            </span>
            <br />
            For Startups
          </h1>

          {/* Subheading */}
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Connect, collaborate, and scale your startup with the most comprehensive platform designed for entrepreneurs
            at every stage of their journey.
          </p>

          {/* CTA Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-semibold mb-6">Get Started in Minutes</h2>
            <Button
              size="lg"
              onClick={() => {
                if (!user) {
                  setIsLoginModalOpen(true)
                } else {
                  // Handle navigation for authenticated users
                  console.log('Navigate to dashboard or registration')
                }
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-3"
            >
              Register Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">10K+</div>
              <div>Active Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400 mb-2">$2B+</div>
              <div>Funding Raised</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">50K+</div>
              <div>Connections Made</div>
            </div>
          </div> */}
        </div>
      </div>

      {/* Login Modal */}
      <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
        <DialogContent className="sm:max-w-md border-0 shadow-2xl">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Welcome Back
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Sign in to your account to get started
            </DialogDescription>
          </DialogHeader>
          <LoginForm onClose={() => setIsLoginModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default HeroSection
