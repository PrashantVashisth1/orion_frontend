import {Badge} from "@/components/ui/badge"
import {    TrendingUp } from "lucide-react"


  const trendingTags: string[] = [
    "Startup",
    "AI",
    "Fundraising",
    "Product Management",
    "Marketing",
    "Development",
    "Design",
    "Leadership",
    "Growth Hacking",
    "Blockchain",
  ]

function ActionCards() {
  return (<>
    {/* Interactive Cards Section */}
      <section className="w-full px-8 md:px-12 lg:px-20 xl:px-32 py-5 bg-slate-900">
        <div className="grid md:grid-cols-2 gap-8 w-full">
          {/* Join Session Card */}

        </div>
      </section>
      
      <section className="w-full px-8 md:px-12 lg:px-20 xl:px-32 py-16 bg-slate-900">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center justify-center">
            <TrendingUp className="h-6 w-6 mr-2 text-purple-400" />
            Trending Topics
          </h2>
          <p className="text-gray-300">Explore popular session topics</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 w-full">
          {trendingTags.map((tag, index) => (
            <Badge
              key={index}
              variant="outline"
              className="px-4 py-2 text-sm cursor-pointer border-purple-500/30 text-purple-300 bg-slate-800/50 hover:bg-purple-900/30 hover:border-purple-400 transition-all duration-200 hover:scale-105"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </section>
      </>
    
  )
}

export default ActionCards