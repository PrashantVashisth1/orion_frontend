import { Users, Calendar, Star, TrendingUp } from 'lucide-react'

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-16 md:py-24">
      <div className="w-full px-8 md:px-12 lg:px-20 xl:px-32">
        <div className="text-center w-full">
          {/* Decorative Icons */}
          <div className="flex justify-center space-x-8 mb-8 opacity-20">
            <Users className="h-12 w-12 text-purple-400" />
            <Calendar className="h-12 w-12 text-blue-400" />
            <TrendingUp className="h-12 w-12 text-indigo-400" />
            <Star className="h-12 w-12 text-cyan-400" />
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-white">
            Discover or Host Your Next{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Big
            </span>{" "}
            Session
          </h1>

          <p className="text-xl md:text-2xl mb-8 text-gray-300 leading-relaxed">
            Connect, collaborate, and scale your startup with the most comprehensive platform designed for entrepreneurs
            at every stage of their journey.
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
