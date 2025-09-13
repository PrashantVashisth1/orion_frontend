"use client"

import { Bell, User, Menu, Settings, Activity, LogOut, UserX } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { useNavigate } from "react-router-dom"

interface HeaderProps {
  onToggleFilter: () => void
}

export default function Header({ onToggleFilter }: HeaderProps) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <Button variant="ghost" size="sm" onClick={onToggleFilter} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-black font-medium border-b-2 border-black pb-4">
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-black pb-4">
              Share Needs
            </a>
            <a href="#" className="text-gray-600 hover:text-black pb-4">
              Explore
            </a>
            <a href="#" className="text-gray-600 hover:text-black pb-4">
              Online Sessions
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <Bell className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="relative">
                  <div className="relative">
                    <User className="h-5 w-5" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/profile")}>
                  <User className="mr-3 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => navigate("/edit-profile")}>
                  <Settings className="mr-3 h-4 w-4" />
                  <span>Edit Profile</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  <Activity className="mr-3 h-4 w-4" />
                  <span>My Activities</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                  <LogOut className="mr-3 h-4 w-4" />
                  <span>Logout</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
                  <UserX className="mr-3 h-4 w-4" />
                  <span>Delete Profile</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}
