import { Rocket, Users, Building, DollarSign, TrendingUp } from "lucide-react"

interface FilterSidebarProps {
  isOpen: boolean
}

const filterOptions = [
  { icon: Rocket, label: "Startups", active: true },
  { icon: Users, label: "Mentors", active: false },
  { icon: Building, label: "Accelerators", active: false },
  { icon: DollarSign, label: "Investor", active: false },
  { icon: TrendingUp, label: "Trending Ideas", active: false },
]

export default function FilterSidebar({ isOpen }: FilterSidebarProps) {
  return (
    <aside
      className={`fixed left-0 top-16 h-full w-64 bg-gray-200 transform transition-transform duration-300 z-10 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-6">
        <h3 className="text-sm font-semibold text-gray-900 mb-4">FILTER BY TYPE</h3>
        <div className="space-y-2">
          {filterOptions.map((option) => (
            <button
              key={option.label}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-colors ${
                option.active ? "bg-white text-gray-900 shadow-sm" : "text-gray-700 hover:bg-gray-300"
              }`}
            >
              <option.icon className="h-5 w-5" />
              <span className="font-medium">{option.label}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
