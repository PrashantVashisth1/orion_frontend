
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Building, Briefcase, HandshakeIcon } from "lucide-react"
// Assuming these paths are correct in your project setup
import Internship from "../../assets/internship.png" 
import LiveProject from "../../assets/Full Time employee.png"
import Research from "../../assets/co-builders & tech partners.png"
import Volunteering from "../../assets/volunteering.png"

const ShareNeedsSection = () => {
  const needsCategories = [
    {
      icon: Users,
      title: "Internships",
      description: "Find talented students to join your team",
      // Color accent adjusted for light theme: darker text, subtle shadow
      color: "border-blue-600/60 text-blue-700 shadow-md shadow-blue-300/60",
      glowColor: "group-hover:shadow-blue-300/50",
      image: Internship,
    },
    {
      icon: Briefcase,
      title: "Full Timers",
      description: "Find best fit for full time employees",
      // Color accent adjusted for light theme: darker text, subtle shadow
      color: "border-green-600/60 text-green-700 shadow-md shadow-green-300/60",
      glowColor: "group-hover:shadow-green-300/50",
      image: LiveProject,
    },
    {
      icon: HandshakeIcon,
      title: "Partners",
      description: "Find co-builders & tech partners.",
      // Color accent adjusted for light theme: darker text, subtle shadow
      color: "border-purple-600/60 text-purple-700 shadow-md shadow-purple-300/60",
      glowColor: "group-hover:shadow-purple-300/50",
      image: Research,
    },
    {
      icon: Building,
      title: "Volunteer",
      description: "Find volunteers to support your mission",
      // Color accent adjusted for light theme: darker text, subtle shadow
      color: "border-orange-600/60 text-orange-700 shadow-md shadow-orange-300/60",
      glowColor: "group-hover:shadow-orange-300/50",
      image: Volunteering,
    },
  ]

  return (
    <section 
      id="share-needs" 
      // Light theme background
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-50 via-white to-gray-100 overflow-hidden"
    >
      {/* Animated background elements (colors made lighter/more subtle) */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-300/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Subtle grid pattern adjusted for light background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge 
            variant="secondary" 
            // Badge colors changed to light blue background, dark text
            className="mb-4 text-sm bg-blue-100/70 text-blue-700 border-blue-200 backdrop-blur-sm hover:bg-blue-200/80 transition-all duration-300"
          >
            Share Your Needs
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            Find {" "}
            {/* Gradient accents made darker for visibility on light background */}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent animate-pulse">
              Talent,Teams & Co-Founders Instantly
            </span>{" "}
          </h2>
          {/* Subtext changed to dark gray */}
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-200">
            Share hiring needs or collaboration requests and connect with blockchain verified students, professionals and other startups.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {needsCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card 
                key={index} 
                // Card background changed to light gray/white, hover state adjusted
                className={`group hover:shadow-2xl transition-all duration-500 border-gray-200/50 shadow-md bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:border-gray-300/50 hover:-translate-y-2 ${category.glowColor} animate-in fade-in-0 slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0 relative overflow-hidden rounded-xl h-[350px]">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  />
                  {/* Overlay gradient adjusted to dark/transparent for light card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 to-transparent group-hover:from-gray-900/30 transition-all duration-300"></div>
                  
                  {/* --- ENHANCED ICON CONTAINER: Prominent, Glowing Circle --- */}
                  {/* Icon background changed to dark gray, hover scale and border preserved */}
                  <div className={`absolute top-4 left-4 p-3 rounded-full border-2 bg-gray-800 backdrop-blur-sm ${category.color.replace('text-blue-400', 'text-blue-700').replace('text-green-400', 'text-green-700').replace('text-purple-400', 'text-purple-700').replace('text-orange-400', 'text-orange-700')} group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>

                  {/* --- ENHANCED DESCRIPTION CONTAINER: Dark Frosted Glass & Bolder Text --- */}
                  {/* Container background kept dark for text contrast over the image */}
                  <div className="absolute bottom-4 left-4 right-4 bg-gray-900/60 backdrop-blur-lg rounded-xl p-6 text-white border border-white/10 hover:border-white/30 transition-all duration-300">
                    {/* Title and Description text kept white for contrast */}
                    <h3 className="text-2xl font-extrabold mb-2 mt-1">{category.title}</h3>
                    
                    <p className="text-gray-200 text-lg font-medium leading-relaxed">{category.description}</p>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default ShareNeedsSection