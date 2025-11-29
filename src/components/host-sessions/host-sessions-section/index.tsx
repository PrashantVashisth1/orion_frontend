
import { useRef, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Video, Users, Lightbulb, MessageSquare, Play } from "lucide-react";

const HostSessionsSection = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Optional: Add event listeners safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handlePlay = () => console.log("Video started");
    video.addEventListener("play", handlePlay);

    return () => video.removeEventListener("play", handlePlay);
  }, []);

  const sessionTypes = [
    { icon: Video, title: "Product Webinars", description: "Showcase your products to a global audience", color: "bg-blue-100/50 text-blue-700 border-blue-300/50", glowColor: "group-hover:shadow-blue-300/50" },
    { icon: Lightbulb, title: "Brainstorming Sessions", description: "Collaborate on innovative ideas and solutions", color: "bg-yellow-100/50 text-yellow-700 border-yellow-300/50", glowColor: "group-hover:shadow-yellow-300/50" },
    { icon: MessageSquare, title: "Feedback Sessions", description: "Get unbiased feedback from fresh perspectives", color: "bg-green-100/50 text-green-700 border-green-300/50", glowColor: "group-hover:shadow-green-300/50" },
    { icon: Users, title: "Networking Events", description: "Connect with like-minded entrepreneurs", color: "bg-purple-100/50 text-purple-700 border-purple-300/50", glowColor: "group-hover:shadow-purple-300/50" },
  ];

  return (
    <section 
      id="host-sessions" 
      // Main section background changed to light gray/white
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Animated Background (colors made lighter/more subtle) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/3 w-60 h-60 bg-yellow-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/3 right-1/3 w-60 h-60 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-3000"></div>
      </div>

      {/* Subtle grid overlay adjusted for light background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge 
            variant="secondary" 
            // Badge colors changed to light blue background, dark text
            className="mb-4 text-sm bg-blue-100/70 text-blue-700 border-blue-200 backdrop-blur-sm hover:bg-blue-200/80 transition-all duration-300"
          >
            Online Sessions
          </Badge>
          {/* Main heading text changed to dark */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            {/* Gradient accents made darker for visibility on light background */}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Host or Join Live{" "}
            </span>
            Founder's Sessions
          </h2>
          {/* Subtext changed to dark gray */}
          <p className="text-xl text-gray-700 max-w-4xl mx-auto">
            Learn, share, and build visibility with interactive sessions, AMAs, Workshops, and Roundtables — <span className="underline">Online</span> & <span className="underline">Offline</span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Session Cards */}
          <div className="space-y-6">
            {sessionTypes.map((session, index) => {
              const Icon = session.icon;
              return (
                <Card
                  key={index}
                  // Card background changed to light gray/white, border adjusted
                  className={`group hover:shadow-2xl transition-all duration-500 border-l-4 border-l-blue-600 bg-white/70 backdrop-blur-sm border-gray-200/50 hover:bg-white/90 hover:border-gray-300/50 hover:-translate-y-1 ${session.glowColor}`}
                  style={{ animationDelay: `${400 + index * 100}ms` }}
                >
                  <CardContent className="p-6 flex items-start space-x-4">
                    <div className={`p-3 rounded-lg border backdrop-blur-sm ${session.color} group-hover:scale-110 transition-all duration-300`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      {/* Text color changed to dark gray */}
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors duration-300">{session.title}</h3>
                      <p className="text-gray-700 group-hover:text-gray-600 transition-colors duration-300">{session.description}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Video Section */}
          <div className="relative">
            <div className="relative group">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl border border-gray-200/50 bg-white/70 backdrop-blur-sm">
                <video
                  ref={videoRef}
                  src="/Sessions.mp4" // public folder path
                  width={600}
                  height={400}
                  className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700 brightness-90 group-hover:brightness-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
                {/* Overlay kept dark for text contrast over video */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent group-hover:from-black/40 transition-all duration-300" />
                {/* Text kept white for contrast over video */}
                <div className="absolute bottom-6 left-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Live Session in Progress</h3>
                  <p className="text-sm opacity-90">Join 500+ entrepreneurs online</p>
                </div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {/* Play button kept white/transparent for contrast over video */}
                  <Button size="lg" className="rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/30 hover:scale-110 transition-all duration-300">
                    <Play className="h-6 w-6 text-white" />
                  </Button>
                </div>
              </div>

              {/* Glow & Pulse (colors made lighter/more subtle) */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300/30 to-purple-300/30 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-gray-300/50 rounded-full animate-ping opacity-75"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSessionsSection;