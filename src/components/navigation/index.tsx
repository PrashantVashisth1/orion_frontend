"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import OrionLogo from "../../assets/Orion__logo.png"
// Import the new auth components at the top
import AuthModals from "@/components/auth/auth-modals"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { label: "Share Needs", id: "share-needs" },
    { label: "Explore", id: "explore" },
    { label: "Host Sessions", id: "host-sessions" },
    { label: "Get Funded", id: "get-funded" },
  ]

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={OrionLogo} alt="Orion Logo" className="h-14 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
              >
                {item.label}
              </button>
            ))}
            {/* Replace the Login and Sign Up buttons section with: */}
            <div className="flex items-center space-x-4">
              <AuthModals />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 bg-gray-900/90">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              {/* Also update the mobile navigation section to use AuthModals: */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
                <AuthModals />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
