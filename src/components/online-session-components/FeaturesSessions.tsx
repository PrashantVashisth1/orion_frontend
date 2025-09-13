import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar, Clock, Star } from "lucide-react"

interface Session {
  id: number
  title: string
  description: string
  host: string
  date: string
  time: string
  tags: string[]
  attendees: number
  rating: number
}

function FeaturesSessions() {
  const featuredSessions: Session[] = [
    {
      id: 1,
      title: "Building Your First Startup",
      description: "Learn the fundamentals of starting a tech company from industry veterans.",
      host: "Sarah Chen",
      date: "Dec 15, 2024",
      time: "2:00 PM EST",
      tags: ["Startup", "Entrepreneurship", "Business"],
      attendees: 124,
      rating: 4.8,
    },
    {
      id: 2,
      title: "AI in Modern Development",
      description: "Explore how artificial intelligence is evolving the way we develop software.",
      host: "Marcus Rodriguez",
      date: "Dec 18, 2024",
      time: "4:00 PM EST",
      tags: ["AI", "Development", "Technology"],
      attendees: 89,
      rating: 4.9,
    },
    {
      id: 3,
      title: "Fundraising Strategies 2024",
      description: "Master the art of raising capital in today's competitive market.",
      host: "Emily Watson",
      date: "Dec 20, 2024",
      time: "1:00 PM EST",
      tags: ["Fundraising", "Investment", "Finance"],
      attendees: 156,
      rating: 4.7,
    },
    {
      id: 4,
      title: "Product Design Thinking",
      description: "Design products that users love with proven methodologies.",
      host: "David Kim",
      date: "Dec 22, 2024",
      time: "3:00 PM EST",
      tags: ["Design", "UX", "Product"],
      attendees: 78,
      rating: 4.8,
    },
    {
      id: 5,
      title: "Advanced Product Strategy",
      description: "Scale your product with data-driven strategies and user insights.",
      host: "Lisa Park",
      date: "Dec 25, 2024",
      time: "5:00 PM EST",
      tags: ["Strategy", "Product", "Growth"],
      attendees: 92,
      rating: 4.9,
    },
  ]

  return (
     <section className="w-full px-8 md:px-12 lg:px-20 xl:px-32 pt-16 pb-16 bg-gradient-to-br from-slate-900  to-slate-900">
    
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Featured{" "}
          <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
            Sessions
          </span>
        </h2>
        <p className="text-xl text-gray-300">
          Don't miss these upcoming sessions from top entrepreneurs
        </p>
      </div>

      <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
        {featuredSessions.map((session) => (
          <Card
            key={session.id}
            className="group cursor-pointer border border-slate-700/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-slate-800/80 backdrop-blur-sm hover:bg-slate-800/90"
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge
                  variant="secondary"
                  className="bg-purple-500/20 text-purple-300 hover:bg-purple-500/30 border-purple-500/30"
                >
                  {session.tags[0]}
                </Badge>
                <div className="flex items-center text-sm text-gray-400">
                  <Star className="h-4 w-4 text-yellow-400 mr-1" />
                  {session.rating}
                </div>
              </div>
              <CardTitle className="text-lg text-white group-hover:text-purple-400 transition-colors">
                {session.title}
              </CardTitle>
              <CardDescription className="text-sm text-gray-300">
                {session.description}
              </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2 text-purple-400" />
                  <span className="font-medium text-gray-300">{session.host}</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-blue-400" />
                  <span>{session.date}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-cyan-400" />
                  <span>{session.time}</span>
                </div>
                <div className="flex items-center justify-between pt-2">
                  <span className="text-purple-400 font-medium">
                    {session.attendees} attending
                  </span>
                  <Button
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white border-0"
                  >
                    Join
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

    </section>
  )
}

export default FeaturesSessions