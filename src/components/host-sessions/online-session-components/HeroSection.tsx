

import {  Users, Calendar, Star, TrendingUp } from "lucide-react"


function HeroSection() {
  return (
   <section className="relative bg-white py-16 md:py-24">
        <div className="w-full px-8 md:px-12 lg:px-20 xl:px-32">
          <div className="text-center w-full">
            {/* Decorative Icons */}
            <div className="flex justify-center space-x-8 mb-8 opacity-20">
              <Users className="h-12 w-12 text-blue-500" />
              <Calendar className="h-12 w-12 text-green-500" />
              <TrendingUp className="h-12 w-12 text-blue-600" />
              <Star className="h-12 w-12 text-green-600" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-gray-900">
              Discover or Host Your Next{" "}
              <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-transparent bg-clip-text">
                Big
              </span>{" "}
              Session
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-600 leading-relaxed">
              Connect, collaborate, and scale your startup with the most comprehensive platform designed for
              entrepreneurs at every stage of their journey.
            </p>

            {/* Search Bar */}
            {/* <div className="relative w-full max-w-4xl mx-auto mb-12">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search sessions by topic or host..."
                  className="pl-12 pr-4 py-4 text-lg rounded-full border-2 border-gray-200 shadow-sm bg-white focus:border-blue-500 transition-all duration-300"
                />
                <Button className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6">
                  Search
                </Button>
              </div>
            </div> */}

            {/* Simple Stats */}
            {/* <div className="flex justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span>10K+ Active Members</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                <span>500+ Sessions Monthly</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                <span>50K+ Connections</span>
              </div>
            </div> */}
          </div>
        </div>
      </section>
  )
}

export default HeroSection