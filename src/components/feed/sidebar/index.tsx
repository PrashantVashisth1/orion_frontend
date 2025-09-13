import { useState } from "react"
import { X, Filter, TrendingUp, Users, Building2, UserCheck, DollarSign, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function FeedSidebar({ isOpen, onClose }: SidebarProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([])

  const filterOptions = [
    {
      id: "startups",
      label: "Startups",
      icon: Building2,
      description: "Early-stage companies and innovative ventures"
    },
    {
      id: "accelerators",
      label: "Accelerators",
      icon: TrendingUp,
      description: "Programs that help startups scale and grow"
    },
    {
      id: "mentors",
      label: "Mentors",
      icon: UserCheck,
      description: "Experienced professionals offering guidance"
    },
    {
      id: "investor",
      label: "Investor",
      icon: DollarSign,
      description: "Angel investors, VCs, and funding sources"
    },
    {
      id: "trending-ideas",
      label: "Trending Ideas",
      icon: Lightbulb,
      description: "Latest innovations and breakthrough concepts"
    }
  ]

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId) 
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    )
  }

  const clearAllFilters = () => {
    setSelectedFilters([])
  }

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 right-0 h-full w-80 bg-gradient-to-b from-gray-900/95 to-gray-800/95 
        backdrop-blur-xl border-l border-gray-700/50 shadow-2xl z-50
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700/50">
          <div className="flex items-center space-x-3">
            <Filter className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">Filter</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors duration-200"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Active Filters */}
          {selectedFilters.length > 0 && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-300">Active Filters</span>
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
                >
                  Clear All
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedFilters.map(filterId => {
                  const filter = filterOptions.find(f => f.id === filterId)
                  return (
                    <div
                      key={filterId}
                      className="flex items-center space-x-2 bg-purple-600/20 border border-purple-500/30 rounded-full px-3 py-1"
                    >
                      <span className="text-xs text-purple-300">{filter?.label}</span>
                      <button
                        onClick={() => toggleFilter(filterId)}
                        className="text-purple-400 hover:text-purple-300"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )
                })}
              </div>
            </div>
          )}

          {/* Filter Options */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-gray-300 mb-4">Categories</h3>
            {filterOptions.map((option) => {
              const Icon = option.icon
              const isSelected = selectedFilters.includes(option.id)
              
              return (
                <button
                  key={option.id}
                  onClick={() => toggleFilter(option.id)}
                  className={`
                    w-full flex items-center space-x-3 p-4 rounded-xl transition-all duration-200
                    ${isSelected 
                      ? 'bg-purple-600/20 border border-purple-500/30 text-purple-300' 
                      : 'bg-gray-800/50 border border-gray-700/50 text-gray-300 hover:bg-gray-700/50 hover:border-gray-600/50'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-lg transition-colors duration-200
                    ${isSelected 
                      ? 'bg-purple-600/20 text-purple-400' 
                      : 'bg-gray-700/50 text-gray-400'
                    }
                  `}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium">{option.label}</div>
                    <div className="text-xs text-gray-500 mt-1">{option.description}</div>
                  </div>
                  {isSelected && (
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Apply Filters Button */}
          <div className="pt-6 border-t border-gray-700/50">
            <Button
              onClick={onClose}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 rounded-xl transition-all duration-200 shadow-lg"
            >
              Apply Filters ({selectedFilters.length})
            </Button>
          </div>
        </div>
      </div>
    </>
  )
} 