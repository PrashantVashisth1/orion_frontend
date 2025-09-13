
import { Button } from "@/components/ui/button"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {  Users, Calendar, Clock, Star } from "lucide-react"

interface Session {
  id: number;
  title: string;
  description: string;
  host: string;
  date: string;
  time: string;
  tags: string[];
  attendees: number;
  rating: number;
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
      description: "Explore how artificial intelligence is reshaping software development practices.",
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
    }, {
      id: 5,
      title: "Product Design Thinking",
      description: "Design products that users love with proven methodologies.",
      host: "David Kim",
      date: "Dec 22, 2024",
      time: "3:00 PM EST",
      tags: ["Design", "UX", "Product"],
      attendees: 78,
      rating: 4.8,
    },
  ]
  return (
     <section className="w-full px-8 md:px-12 lg:px-20 xl:px-32 py-16">
           <div className="text-center mb-12">
             <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Sessions</h2>
             <p className="text-xl text-gray-600">Don't miss these upcoming sessions from top entrepreneurs</p>
           </div>
   
           <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6 w-full">
             {featuredSessions.map((session) => (
               <Card
                 key={session.id}
                 className="group cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white/80 backdrop-blur-sm"
               >
                 <CardHeader className="pb-3">
                   <div className="flex items-center justify-between mb-2">
                     <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                       {session.tags[0]}
                     </Badge>
                     <div className="flex items-center text-sm text-gray-500">
                       <Star className="h-4 w-4 text-yellow-400 mr-1" />
                       {session.rating}
                     </div>
                   </div>
                   <CardTitle className="text-lg group-hover:text-purple-600 transition-colors">{session.title}</CardTitle>
                   <CardDescription className="text-sm">{session.description}</CardDescription>
                 </CardHeader>
               
                 <CardContent className="pt-0">
                   <div className="space-y-2 text-sm text-gray-600">
                     <div className="flex items-center">
                       <Users className="h-4 w-4 mr-2 text-purple-500" />
                       {/* <span className="font-medium">{session.host}</span> */}
                     </div>
                     <div className="flex items-center">
                       <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                       <span>{session.date}</span>
                     </div>
                     <div className="flex items-center">
                       <Clock className="h-4 w-4 mr-2 text-green-500" />
                       <span>{session.time}</span>
                     </div>
                     <div className="flex items-center justify-between pt-2">
                       <span className="text-purple-600 font-medium">{session.attendees} attending</span>
                       <Button
                         size="sm"
                         className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
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