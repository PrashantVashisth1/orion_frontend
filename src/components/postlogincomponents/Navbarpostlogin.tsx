"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Menu,
  X,
  Bell,
  User,
  Edit,
  List,
  LogOut,
  Trash2,
  ChevronDown,
  Filter,
  Check,
  MessageSquare,
  Heart,
  Users,
  TrendingUp,
  Clock,
  PanelLeft,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { useAuthStore } from "@/store/authStore";

interface NavbarpostloginProps {
  onFilterToggle?: () => void
  onSidebarToggle?: () => void
  showSidebarButton?: boolean
}

interface Notification {
  id: string
  type: 'message' | 'like' | 'follow' | 'trending' | 'reminder'
  title: string
  message: string
  timeAgo: string
  isRead: boolean
  avatar?: string
  avatarColor?: string
}

const Navbarpostlogin = ({ onFilterToggle, onSidebarToggle, showSidebarButton }: NavbarpostloginProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const navigate = useNavigate()

  // Sample notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "message",
      title: "Sarah Chen",
      message: "commented on your post",
      timeAgo: "2m ago",
      isRead: false,
      avatar: "S",
      avatarColor: "bg-gradient-to-r from-pink-500 to-rose-600"
    },
    {
      id: "2",
      type: "like",
      title: "TechFlow AI",
      message: "liked your post about funding",
      timeAgo: "5m ago",
      isRead: false,
      avatar: "T",
      avatarColor: "bg-gradient-to-r from-green-500 to-emerald-600"
    },
    {
      id: "3",
      type: "follow",
      title: "Alex Kumar",
      message: "started following you",
      timeAgo: "15m ago",
      isRead: true,
      avatar: "A",
      avatarColor: "bg-gradient-to-r from-blue-500 to-cyan-600"
    },
    {
      id: "4",
      type: "trending",
      title: "Trending Alert",
      message: "Your post is now trending in the startup community",
      timeAgo: "1h ago",
      isRead: false,
      avatar: "🔥",
      avatarColor: "bg-gradient-to-r from-orange-500 to-red-600"
    },
    {
      id: "5",
      type: "reminder",
      title: "Session Reminder",
      message: "You have a mentoring session in 30 minutes",
      timeAgo: "2h ago",
      isRead: true,
      avatar: "⏰",
      avatarColor: "bg-gradient-to-r from-purple-500 to-pink-600"
    }
  ])

  const unreadCount = notifications.filter(n => !n.isRead).length

  const navigateTo = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const markAsRead = (notificationId: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === notificationId 
          ? { ...notification, isRead: true }
          : notification
      )
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    )
  }

  const deleteNotification = (notificationId: string) => {
    setNotifications(prev => 
      prev.filter(notification => notification.id !== notificationId)
    )
  }

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="h-4 w-4 text-blue-400" />
      case 'like':
        return <Heart className="h-4 w-4 text-red-400" />
      case 'follow':
        return <Users className="h-4 w-4 text-green-400" />
      case 'trending':
        return <TrendingUp className="h-4 w-4 text-orange-400" />
      case 'reminder':
        return <Clock className="h-4 w-4 text-purple-400" />
      default:
        return <Bell className="h-4 w-4 text-gray-400" />
    }
  }

  const navItems = [
    { label: "Home", path: "/postlogin" },
    // { label: "Share Needs", path: "/share-needs" },
    { label: "Explore", path: "/explore" },
    { label: "Get Funded", path: "/get-funded" },
  ]

  const userMenuItems = [
    { icon: <User className="h-4 w-4" />, label: "Profile", path: "/profile" },
    { icon: <Edit className="h-4 w-4" />, label: "Edit Profile", path: "/edit-profile" },
    { icon: <List className="h-4 w-4" />, label: "My Activities", path: "/activities" },
    { icon: <LogOut className="h-4 w-4" />, label: "Logout", path: "/logout", action: "logout"  },
    { icon: <Trash2 className="h-4 w-4 text-red-500" />, label: "Delete Profile", path: "/delete" },
  ]

  const renderNavLinks = () =>
    navItems.map(({ label, path }) => (
      <button
        key={path}
        onClick={() => navigateTo(path)}
        className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
      >
        {label}
      </button>
    ))

  const renderSplitShareNeeds = () => (
    <div className="relative flex items-center space-x-0">
      <button
        onClick={() => navigateTo("/share-needs")}
        className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 pr-2"
      >
        Share Needs
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 pl-1"
            aria-label="Open Online Session Dropdown"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
          <DropdownMenuItem onClick={() => navigateTo("/view-needs")}>
            View Needs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/share-needs")}>
            Share Needs
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const renderSplitOnlineSession = () => (
    <div className="relative flex items-center space-x-0">
      <button
        onClick={() => navigateTo("/online-session")}
        className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 pr-2"
      >
        Online Session
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="text-gray-300 hover:text-blue-400 transition-colors duration-200 pl-1"
            aria-label="Open Online Session Dropdown"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
          <DropdownMenuItem onClick={() => navigateTo("/view-session")}>
            View Sessions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/host-session")}>
            Host Sessions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  // const renderUserMenu = () => (
    
  //   <DropdownMenu>
  //     <DropdownMenuTrigger asChild>
  //       <Button variant="ghost" size="icon" aria-label="User menu">
  //         <User className="h-6 w-6 text-gray-300" />
  //       </Button>
  //     </DropdownMenuTrigger>
  //     <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
  //       {userMenuItems.map(({ icon, label, path }) => (
  //         <DropdownMenuItem
  //           key={label}
  //           className="flex items-center space-x-2"
  //           onClick={() => {
  //             if (path) {
  //               navigateTo(path)
  //             }
  //           }}
  //         >
  //           {icon}
  //           <span>{label}</span>
  //         </DropdownMenuItem>
  //       ))}
  //     </DropdownMenuContent>
  //   </DropdownMenu>
  // )

  const renderUserMenu = () => {
    // Hooks must be called at the top of the component
    const logout = useAuthStore((state) => state.logout);
    const navigate = useNavigate();

    const handleItemClick = (item) => {
        if (item.action === "logout") {
            logout(); // Call the logout function from the Zustand store
            navigate("/prelogin"); // Redirect to the pre-login page
        } else if (item.path) {
            navigate(item.path); // Use `Maps` from react-router-dom for other links
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="User menu">
                    <User className="h-6 w-6 text-gray-300" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
                {userMenuItems.map((item) => (
                    <DropdownMenuItem
                        key={item.label}
                        className="flex items-center space-x-2"
                        onClick={() => handleItemClick(item)} // Use the new handler
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

  const renderNotificationMenu = () => (
    <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
          <Bell className="h-6 w-6 text-gray-300" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg w-80 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h3 className="font-semibold text-white">Notifications</h3>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="p-2">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg transition-colors duration-200 ${
                    notification.isRead 
                      ? 'bg-gray-800/50 hover:bg-gray-700/50' 
                      : 'bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    {/* Avatar */}
                    <div className={`w-8 h-8 ${notification.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                      {notification.avatar}
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-1">
                        {getNotificationIcon(notification.type)}
                        <span className="font-medium text-white text-sm">{notification.title}</span>
                        {!notification.isRead && (
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        )}
                      </div>
                      <p className="text-gray-400 text-sm mb-1">{notification.message}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{notification.timeAgo}</span>
                        <div className="flex items-center space-x-1">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-3 w-3 text-gray-400 hover:text-green-400" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1 hover:bg-gray-700/50 rounded transition-colors"
                            title="Delete notification"
                          >
                            <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-400" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-700">
            <button
              onClick={() => {
                setNotifications([])
                setIsNotificationOpen(false)
              }}
              className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
            >
              Clear all notifications
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  
  return (
    <nav className="sticky top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
        <div className="flex justify-between items-center h-16 w-full px-0">
          {/* Left Side - Sidebar Toggle (only on edit-profile) */}
          <div className="flex items-center relative z-50">
            {showSidebarButton && onSidebarToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSidebarToggle}
                className="mr-4 hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200 relative z-50"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="h-6 w-6 text-gray-300" />
              </Button>
            )}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {renderNavLinks()}
            {renderSplitShareNeeds()}
            {renderSplitOnlineSession()}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {onFilterToggle && (
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Filter"
                onClick={onFilterToggle}
                className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200"
              >
                <Filter className="h-6 w-6 text-gray-300" />
              </Button>
            )}
            {renderNotificationMenu()}
            {renderUserMenu()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-300" />
              ) : (
                <Menu className="h-6 w-6 text-gray-300" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-700 bg-gray-900/90">
            <div className="flex flex-col space-y-4 px-4">
              {renderNavLinks()}
              {renderSplitOnlineSession()}
              <div className="pt-4 border-t border-gray-700 flex space-x-4">
                {onFilterToggle && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Filter"
                    onClick={onFilterToggle}
                    className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200"
                  >
                    <Filter className="h-6 w-6 text-gray-300" />
                  </Button>
                )}
                {renderNotificationMenu()}
                {renderUserMenu()}
              </div>
            </div>
          </div>
        )}
    </nav>
  )
}

export default Navbarpostlogin
