import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Lightbulb, FlaskConical, Building } from "lucide-react"
import Internship from "../../assets/internship.png"
import LiveProject from "../../assets/liveproject.png"
import Research from "../../assets/research.png"
import Volunteering from "../../assets/volunteering.png"

const ShareNeedsSection = () => {
  const needsCategories = [
    {
      icon: Users,
      title: "Internships",
      description: "Find talented interns to join your team",
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      glowColor: "group-hover:shadow-blue-500/25",
      image: Internship,
    },
    {
      icon: Lightbulb,
      title: "Live Projects",
      description: "Collaborate on real-world projects",
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      glowColor: "group-hover:shadow-green-500/25",
      image: LiveProject,
    },
    {
      icon: FlaskConical,
      title: "Research",
      description: "Partner for cutting-edge research",
      color: "bg-purple-500/20 text-purple-400 border-purple-500/30",
      glowColor: "group-hover:shadow-purple-500/25",
      image: Research,
    },
    {
      icon: Building,
      title: "Volunteer",
      description: "Find volunteers to support your mission",
      color: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      glowColor: "group-hover:shadow-orange-500/25",
      image: Volunteering,
    },
  ]

  return (
    <section 
      id="share-needs" 
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge 
            variant="secondary" 
            className="mb-4 text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
          >
            Share Your Needs
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-top-4 duration-700">
            Instantly Share Your{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              Immediate, Short & Long Term
            </span>{" "}
            Needs
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-200">
            Connect with the right partners, talent, and resources to accelerate your startup's growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {needsCategories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Card 
                key={index} 
                className={`group hover:shadow-2xl transition-all duration-500 border-gray-700/50 shadow-xl bg-gray-800/50 backdrop-blur-sm hover:bg-gray-800/80 hover:border-gray-600/50 hover:-translate-y-2 ${category.glowColor} animate-in fade-in-0 slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0 relative overflow-hidden rounded-xl h-[550px]">
                  <img
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    width={300}
                    height={400}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-90 group-hover:brightness-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent group-hover:from-gray-900/40 transition-all duration-300"></div>
                  <div className={`absolute top-4 left-4 p-3 rounded-xl border backdrop-blur-sm bg-white/30 text-white ${category.color} group-hover:scale-110 transition-all duration-300`}>
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 bg-white/30 backdrop-blur-md rounded-lg p-4 text-white">
                    <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                    <p className="text-white/90 leading-relaxed">{category.description}</p>
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