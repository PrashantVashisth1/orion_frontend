import { Button } from "@/components/ui/button"
import { Bell, User } from "lucide-react"

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <div className="w-10 h-10 bg-gray-300 rounded-full border-2 border-gray-400"></div>
            <nav className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-900 hover:text-gray-700">
                Home
              </a>
              <a href="/explore" className="text-gray-900 hover:text-gray-700">
                Explore
              </a>
              <a href="/online-sessions" className="text-gray-900 hover:text-gray-700">
                Online Sessions
              </a>
              <a href="/get-funded" className="text-gray-900 hover:text-gray-700">
                Get Funded
              </a>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="text-gray-600">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-gray-600">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
