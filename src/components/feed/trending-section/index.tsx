import TrendingCard from "../trending-card"
import { TrendingUp } from "lucide-react"

const trendingData = [
  {
    id: "ai-funding",
    icon: "S",
    iconColor: "bg-gradient-to-r from-green-500 to-emerald-600",
    title: "AI Startup Funding",
    description: "A fresh generation of startups is revolutionizing the AI landscape with breakthrough innovations...",
    trend: "24%"
  },
  {
    id: "mentor-momentum",
    icon: "M",
    iconColor: "bg-gradient-to-r from-blue-500 to-indigo-600",
    title: "Mentor Momentum",
    description: "Tiya Malhotra has been a guiding force for emerging entrepreneurs across the tech ecosystem...",
    trend: "18%"
  },
  {
    id: "accelerator-highlights",
    icon: "A",
    iconColor: "bg-gradient-to-r from-orange-500 to-red-600",
    title: "Accelerator Highlights",
    description: "ForgeLab Accelerator continues to fuel innovation with their latest cohort of promising startups...",
    trend: "32%"
  }
]

export default function TrendingSection() {
  return (
    <section className="mb-12 px-4">
      <div>
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl p-8 border border-gray-700 shadow-2xl">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-8 w-8 text-yellow-500" />
              <h2 className="text-3xl font-bold text-white">Trending Now</h2>
            </div>
            <button className="text-blue-400 font-medium hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-gray-700">
              View All
            </button>
          </div>

          <div className="flex overflow-x-auto gap-6 pb-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 hover:scrollbar-thumb-gray-500">
            {trendingData.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80">
                <TrendingCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
