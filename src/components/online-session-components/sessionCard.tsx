"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Users, Presentation } from "lucide-react"
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

export default function SessionCard() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  const handleNavigation = (path) => {
    if (!user) {
      setIsLoginModalOpen(true)
    } else {
      console.log(`Navigating to: ${path}`)
      // In your actual implementation, replace this with your navigation logic
    }
  }

  return (
    <section className="w-full px-4 md:px-8 lg:px-16 py-10 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Join Session Card */}
          <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-slate-700 to-slate-800 text-white rounded-3xl">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800">
                  {/* Geometric Shapes */}
                  <div className="absolute top-4 right-4 w-20 h-20 bg-white/10 rounded-full blur-xl group-hover:scale-150 transition-transform duration-700"></div>
                  <div className="absolute top-1/3 left-8 w-16 h-16 bg-white/5 rounded-lg rotate-45 group-hover:rotate-90 transition-transform duration-700"></div>
                  <div className="absolute bottom-1/4 right-1/3 w-12 h-12 bg-white/10 rounded-full group-hover:translate-x-4 transition-transform duration-700"></div>

                  {/* Grid Pattern */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `
                        linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                      `,
                      backgroundSize: "20px 20px",
                    }}
                  ></div>

                  {/* Floating Circles */}
                  <div className="absolute top-1/2 left-1/4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/15 rounded-full animate-pulse delay-300"></div>
                </div>

                {/* Icon */}
                <div className="absolute top-8 left-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">View Session</h3>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                      Discover amazing sessions from industry experts and expand your knowledge
                    </p>
                    <Button
                      onClick={() => handleNavigation("/view-session")}
                      variant="secondary"
                      className="bg-white text-slate-800 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl w-fit group-hover:scale-105 transition-transform duration-300"
                    >
                      View Sessions
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Host Session Card */}
          <Card className="group cursor-pointer overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-gradient-to-br from-slate-600 to-slate-700 text-white rounded-3xl">
            <CardContent className="p-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-600 to-slate-700">
                  {/* Geometric Shapes */}
                  <div className="absolute top-6 right-6 w-24 h-24 bg-white/10 rounded-2xl rotate-12 group-hover:rotate-45 transition-transform duration-700"></div>
                  <div className="absolute top-1/2 left-4 w-18 h-18 bg-white/5 rounded-full group-hover:scale-125 transition-transform duration-700"></div>
                  <div className="absolute bottom-1/3 right-1/4 w-14 h-14 bg-white/10 rounded-lg rotate-45 group-hover:-rotate-12 transition-transform duration-700"></div>

                  {/* Dot Pattern */}
                  <div
                    className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500"
                    style={{
                      backgroundImage: `radial-gradient(circle, rgba(255,255,255,0.2) 1px, transparent 1px)`,
                      backgroundSize: "24px 24px",
                    }}
                  ></div>

                  {/* Floating Elements */}
                  <div className="absolute top-1/3 left-1/3 w-10 h-10 bg-white/15 rounded-full animate-bounce delay-100"></div>
                  <div className="absolute bottom-1/2 right-1/3 w-7 h-7 bg-white/20 rounded-full animate-bounce delay-500"></div>

                  {/* Diagonal Lines */}
                  <div
                    className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500"
                    style={{
                      backgroundImage: `repeating-linear-gradient(
                        45deg,
                        transparent,
                        transparent 10px,
                        rgba(255,255,255,0.1) 10px,
                        rgba(255,255,255,0.1) 11px
                      )`,
                    }}
                  ></div>
                </div>

                {/* Icon */}
                <div className="absolute top-8 left-8">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Presentation className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="space-y-4">
                    <h3 className="text-2xl md:text-3xl font-bold leading-tight">Host Session</h3>
                    <p className="text-slate-300 text-base md:text-lg leading-relaxed">
                      Share your expertise with the community and inspire others
                    </p>
                    <Button
                      onClick={() => handleNavigation("/host-session")}
                      variant="secondary"
                      className="bg-white text-slate-800 hover:bg-gray-100 font-semibold px-6 py-3 rounded-xl w-fit group-hover:scale-105 transition-transform duration-300"
                    >
                      Start Hosting
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
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
              Sign in to your account to view or host sessions
            </DialogDescription>
          </DialogHeader>
          <LoginForm onClose={() => setIsLoginModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}