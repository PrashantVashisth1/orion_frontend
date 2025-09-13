import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import LoginForm from "@/components/auth/login-form"
import { useAuth } from "@/contexts/AuthContext"

export default function GetFundedComponent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
  const { user } = useAuth()

  // Professional funding-related images with direct links
  const fundingImages = [
    {
      src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&crop=center",
      alt: "Startup team presenting to investors in a modern boardroom",
      title: "Pitch to Investors"
    },
    {
      src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop&crop=center",
      alt: "Business handshake and investment meeting",
      title: "Secure Funding"
    },
    {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop&crop=center",
      alt: "Business growth charts and scaling opportunities",
      title: "Scale Your Business"
    },
    {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop&crop=center",
      alt: "Innovation and research development team",
      title: "Innovate & Research"
    },
    {
      src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&crop=center",
      alt: "Partnership and collaboration opportunities",
      title: "Build Partnerships"
    }
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % fundingImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [fundingImages.length]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-16">
      {/* Get Funded Section */}
      <section
        className="relative py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 lg:p-12 overflow-hidden"
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

        <div className="relative grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="space-y-6 animate-in fade-in-0 slide-in-from-left-8 duration-700 bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8">
            <h2 className="text-3xl lg:text-4xl font-bold text-white">
              Get{" "}
              <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Funded
              </span>
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed font-medium">
              Looking to raise capital?
            </p>
            <p className="text-gray-400 leading-relaxed">
              Explore curated investment opportunities, join high-impact pitch day events, and network with active
              investors ready to back bold ideas. Fuel your vision with the right funding partners.
            </p>
            <Button
              size="lg"
              onClick={() => {
                if (!user) {
                  setIsLoginModalOpen(true)
                } else {
                  // Handle navigation for authenticated users
                  console.log('Navigate to fundraising')
                }
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25 group"
            >
              <span className="relative z-10">Start Fundraising</span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"></div>
            </Button>
          </div>
          
          <div className="relative animate-in fade-in-0 slide-in-from-right-8 duration-700 delay-200">
            <div className="relative group">
              <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 bg-gray-800/50 backdrop-blur-sm">
                <img
                  src={fundingImages[currentIndex].src}
                  alt={fundingImages[currentIndex].alt}
                  width={500}
                  height={300}
                  className="w-full h-auto object-cover transition-all duration-700 ease-in-out group-hover:scale-105 brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 to-transparent group-hover:from-gray-900/10 transition-all duration-300"></div>
                
                {/* Image title overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900/80 to-transparent p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {fundingImages[currentIndex].title}
                  </h3>
                </div>
              </div>
              
              {/* Enhanced glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
            </div>
            
            {/* Enhanced pagination dots */}
            <div className="absolute -bottom-6 -right-6 flex space-x-3 bg-gray-800/80 backdrop-blur-sm rounded-full p-3 border border-gray-700/50">
              {fundingImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToImage(i)}
                  className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 transform hover:scale-125 ${
                    i === currentIndex 
                      ? "bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg shadow-purple-500/50" 
                      : "bg-gray-500 hover:bg-gray-400"
                  }`}
                  aria-label={`Go to ${fundingImages[i].title}`}
                />
              ))}
            </div>
            
            {/* Image transition indicator */}
            <div className="absolute top-4 right-4 flex space-x-1">
              {fundingImages.map((_, i) => (
                <div
                  key={i}
                  className={`w-8 h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex 
                      ? "bg-gradient-to-r from-purple-400 to-blue-400" 
                      : "bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
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