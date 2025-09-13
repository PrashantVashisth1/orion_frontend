import { ArrowUp } from "lucide-react"

interface TrendingCardProps {
  id: string
  icon: string
  iconColor: string
  title: string
  description: string
  trend: string
}

export default function TrendingCard({ icon, iconColor, title, description, trend }: TrendingCardProps) {
  return (
    <div className="group relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 aspect-square flex flex-col h-80">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 ${iconColor} rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
            {icon /* Render icon as string text */}
          </div>
          <div className="flex items-center space-x-1 text-green-400 text-sm">
            <ArrowUp className="h-4 w-4" />
            <span>{trend}</span>
          </div>
        </div>
        
        <h3 className="font-bold text-xl text-white mb-3 group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-gray-400 text-sm leading-relaxed flex-grow">
          {description}
        </p>
      </div>
    </div>
  )
}
