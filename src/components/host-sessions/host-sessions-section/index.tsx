import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Video, Users, Lightbulb, MessageSquare, Play } from "lucide-react"
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

const HostSessionsSection = () => {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  const sessionTypes = [
    {
      icon: Video,
      title: "Product Webinars",
      description: "Showcase your products to a global audience",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      glowColor: "group-hover:shadow-blue-500/25",
    },
    {
      icon: Lightbulb,
      title: "Brainstorming Sessions",
      description: "Collaborate on innovative ideas and solutions",
      color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      glowColor: "group-hover:shadow-yellow-500/25",
    },
    {
      icon: MessageSquare,
      title: "Feedback Sessions",
      description: "Get unbiased feedback from fresh perspectives",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      glowColor: "group-hover:shadow-green-500/25",
    },
    {
      icon: Users,
      title: "Networking Events",
      description: "Connect with like-minded entrepreneurs",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      glowColor: "group-hover:shadow-purple-500/25",
    },
  ]

  return (
    <section 
      id="host-sessions" 
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge 
            variant="secondary" 
            className="mb-4 text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-in fade-in-0 slide-in-from-top-4"
          >
            Host Sessions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-100">
            Whether you want to{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              promote your products
            </span>{" "}
            through webinars
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto animate-in fade-in-0 slide-in-from-top-8 duration-700 delay-200">
            Or brainstorm new ideas, or get feedback from an unbiased and fresh population mind - we've got you covered
            with our comprehensive session hosting platform
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left side - Session types */}
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-8 duration-700 delay-300">
            {sessionTypes.map((session, index) => {
              const IconComponent = session.icon
              return (
                <Card
                  key={index}
                  className={`group hover:shadow-2xl transition-all duration-500 border-l-4 border-l-blue-500 bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600/50 hover:-translate-y-1 ${session.glowColor} animate-in fade-in-0 slide-in-from-left-4 duration-700`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className={`p-3 rounded-lg border backdrop-blur-sm ${session.color} group-hover:scale-110 transition-all duration-300`}>
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300">
                        {session.title}
                      </h3>
                      <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        {session.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Right side - Image */}
          <div className="relative animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-400">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
                <video
                  src="/src/assets/videos/ViewSession_PRElogin.mp4"
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
                <div className="absolute bottom-6 left-6 text-white animate-in fade-in-0 slide-in-from-bottom-4 duration-700 delay-600">
                  <h3 className="text-xl font-semibold mb-2">Live Session in Progress</h3>
                  <p className="text-sm opacity-90">Join 500+ entrepreneurs online</p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-in fade-in-0 zoom-in-50 duration-700 delay-700">
                  <Button
                    size="lg"
                    className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:scale-110 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-white/25"
                  >
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              
              {/* Pulse effect around play button */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/10 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>

        <div className="text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-500">
          <Button
            size="lg"
            onClick={() => {
              if (!user) {
                setIsLoginModalOpen(true)
              } else {
                // Handle navigation for authenticated users
                console.log('Navigate to host session')
              }
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 mr-4 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Host Your Session
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            onClick={() => {
              if (!user) {
                setIsLoginModalOpen(true)
              } else {
                // Handle navigation for authenticated users
                console.log('Navigate to browse sessions')
              }
            }}
            className="bg-gray-800/50 text-gray-300 border-gray-600/50 hover:bg-gray-700/50 hover:text-white hover:border-gray-500/50 backdrop-blur-sm hover:scale-105 transition-all duration-300"
          >
            Browse Sessions
          </Button>
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
              Sign in to your account to host or browse sessions
            </DialogDescription>
          </DialogHeader>
          <LoginForm onClose={() => setIsLoginModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default HostSessionsSection