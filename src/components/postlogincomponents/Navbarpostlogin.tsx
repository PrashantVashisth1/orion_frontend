// // // Updated Navbarpostlogin.tsx with Socket.IO integration
// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { Button } from "@/components/ui/button"
// import {
//   Menu,
//   X,
//   Bell,
//   User,
//   Edit,
//   List,
//   LogOut,
//   Trash2,
//   ChevronDown,
//   // Filter,
//   Check,
//   PanelLeft,
// } from "lucide-react"
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu"
// import { useAuthStore } from "../../store/authStore"
// import { useNotifications } from "../../hooks/useNotifications"
// import { 
//   getNotificationIcon, 
//   getNotificationColor, 
//   getAvatarColor, 
//   getTimeAgo,
//   determineNotificationType,
//   extractAuthorName,
//   getAvatarInitial,
//   type NotificationDisplay
// } from "../../lib/notificationHelpers"

// interface NavbarpostloginProps {
//   onFilterToggle?: () => void
//   onSidebarToggle?: () => void
//   showSidebarButton?: boolean
// }

// const Navbarpostlogin = ({ 
//   // onFilterToggle, 
//   onSidebarToggle, 
//   showSidebarButton 
// }: NavbarpostloginProps) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const [isNotificationOpen, setIsNotificationOpen] = useState(false)
//   const navigate = useNavigate()
//   const logout = useAuthStore((state) => state.logout)
//   const token = useAuthStore((state) => state.token)
//   const { user } = useAuthStore();

//   // We will show nav links IF:
//   // - The user is NOT a STARTUP (e.g., a Student)
//   // - OR the user IS a STARTUP and IS VERIFIED
//   const showNavLinks = user?.role !== 'STARTUP' || user?.is_startup_verified;

//   // Use the notifications hook with Socket.IO
//   const {
//     notifications: apiNotifications,
//     unreadCount,
//     loading,
//     error,
//     markAsRead,
//     markAllAsRead,
//     deleteNotification,
//     clearAllNotifications,
//     isConnected
//   } = useNotifications(token)

//   // Transform API notifications to display format
//   const notifications: NotificationDisplay[] = apiNotifications.map(notif => {
//     const notifType = determineNotificationType(notif)
//     const authorName = extractAuthorName(notif.message)
    
//     return {
//       id: notif.id.toString(),
//       type: notifType,
//       title: authorName,
//       message: notif.message,
//       timeAgo: getTimeAgo(notif.createdAt),
//       isRead: notif.isRead,
//       avatar: getAvatarInitial(authorName),
//       avatarColor: getAvatarColor(notifType)
//     }
//   })

//   // Show connection status in console
//   useEffect(() => {
//     console.log('🔌 Socket connection status:', isConnected ? 'Connected' : 'Disconnected')
//   }, [isConnected])

//   // Show error if any
//   useEffect(() => {
//     if (error) {
//       console.error('❌ Notification error:', error)
//     }
//   }, [error])

//   const navigateTo = (path: string) => {
//     navigate(path)
//     setIsMenuOpen(false)
//   }

//   const handleMarkAsRead = (notificationId: string) => {
//     markAsRead([parseInt(notificationId)])
//   }

//   const handleMarkAllAsRead = () => {
//     markAllAsRead()
//   }

//   const handleDeleteNotification = (notificationId: string) => {
//     deleteNotification(parseInt(notificationId))
//   }

//   const handleClearAll = () => {
//     clearAllNotifications()
//     setIsNotificationOpen(false)
//   }

//   const handleNotificationClick = (notification: NotificationDisplay) => {
//     // Mark as read
//     if (!notification.isRead) {
//       handleMarkAsRead(notification.id)
//     }

//     // Navigate to related content
//     const apiNotif = apiNotifications.find(n => n.id.toString() === notification.id)
//     if (apiNotif) {
//       if (apiNotif.postId) {
//         navigate(`/post/${apiNotif.postId}`)
//       } else if (apiNotif.sessionId) {
//         navigate(`/sessions/${apiNotif.sessionId}`)
//       } else if (apiNotif.needId) {
//         navigate(`/needs/${apiNotif.needId}`)
//       }
//     }
    
//     setIsNotificationOpen(false)
//   }

//   const navItems = [
//     { label: "Home", path: "/postlogin" },
//     { label: "Explore", path: "/explore" },
//     { label: "Get Funded", path: "/get-funded" },
//   ]

//   const userMenuItems = [
//     { icon: <User className="h-4 w-4" />, label: "Profile", path: "/profile" },
//     { icon: <Edit className="h-4 w-4" />, label: "Edit Profile", path: "/edit-profile" },
//     { icon: <List className="h-4 w-4" />, label: "My Activities", path: "/activities" },
//     { icon: <LogOut className="h-4 w-4" />, label: "Logout", path: "/logout", action: "logout" },
//     // { icon: <Trash2 className="h-4 w-4 text-red-500" />, label: "Delete Profile", path: "/delete" },
//   ]

//   const renderNavLinks = () =>
//     navItems.map(({ label, path }) => (
//       <button
//         key={path}
//         onClick={() => navigateTo(path)}
//         className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
//       >
//         {label}
//       </button>
//     ))

//   const renderSplitShareNeeds = () => (
//     <div className="relative flex items-center space-x-0">
//       <button
//         onClick={() => navigateTo("/share-needs")}
//         className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 pr-2"
//       >
//         Share Needs
//       </button>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button
//             className="text-gray-300 hover:text-blue-400 transition-colors duration-200 pl-1"
//             aria-label="Open Online Session Dropdown"
//           >
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
//           <DropdownMenuItem onClick={() => navigateTo("/view-needs")}>
//             View Needs
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => navigateTo("/share-needs")}>
//             Share Needs
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )

//   const renderSplitOnlineSession = () => (
//     <div className="relative flex items-center space-x-0">
//       <button
//         onClick={() => navigateTo("/online-session")}
//         className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200 pr-2"
//       >
//         Online Session
//       </button>

//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <button
//             className="text-gray-300 hover:text-blue-400 transition-colors duration-200 pl-1"
//             aria-label="Open Online Session Dropdown"
//           >
//             <ChevronDown className="w-4 h-4" />
//           </button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
//           <DropdownMenuItem onClick={() => navigateTo("/view-session")}>
//             View Sessions
//           </DropdownMenuItem>
//           <DropdownMenuItem onClick={() => navigateTo("/host-session")}>
//             Host Sessions
//           </DropdownMenuItem>
//         </DropdownMenuContent>
//       </DropdownMenu>
//     </div>
//   )

//   const renderUserMenu = () => {
//     const handleItemClick = (item: any) => {
//       if (item.action === "logout") {
//         logout()
//         navigate("/prelogin")
//       } else if (item.path) {
//         navigate(item.path)
//       }
//     }

//     return (
//       <DropdownMenu>
//         <DropdownMenuTrigger asChild>
//           <Button variant="ghost" size="icon" aria-label="User menu">
//             <User className="h-6 w-6 text-gray-300" />
//           </Button>
//         </DropdownMenuTrigger>
//         <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg">
//           {userMenuItems.map((item) => (
//             <DropdownMenuItem
//               key={item.label}
//               className="flex items-center space-x-2"
//               onClick={() => handleItemClick(item)}
//             >
//               {item.icon}
//               <span>{item.label}</span>
//             </DropdownMenuItem>
//           ))}
//         </DropdownMenuContent>
//       </DropdownMenu>
//     )
//   }

//   const renderNotificationMenu = () => (
//     <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="icon" aria-label="Notifications" className="relative">
//           <Bell className="h-6 w-6 text-gray-300" />
//           {unreadCount > 0 && (
//             <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
//               {unreadCount > 9 ? '9+' : unreadCount}
//             </span>
//           )}
//           {/* Connection indicator */}
//           <span 
//             className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${
//               isConnected ? 'bg-green-500' : 'bg-red-500'
//             }`}
//             title={isConnected ? 'Connected' : 'Disconnected'}
//           />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent className="bg-gray-800 text-gray-100 border border-gray-700 shadow-lg w-80 max-h-96 overflow-y-auto">
//         {/* Header */}
//         <div className="flex items-center justify-between p-4 border-b border-gray-700">
//           <div className="flex items-center space-x-2">
//             <h3 className="font-semibold text-white">Notifications</h3>
//             {loading && (
//               <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full" />
//             )}
//           </div>
//           {unreadCount > 0 && (
//             <button
//               onClick={handleMarkAllAsRead}
//               className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
//             >
//               Mark all as read
//             </button>
//           )}
//         </div>

//         {/* Error Message */}
//         {error && (
//           <div className="p-3 bg-red-500/10 border-l-4 border-red-500 text-red-400 text-sm">
//             {error}
//           </div>
//         )}

//         {/* Notifications List */}
//         <div className="p-2">
//           {loading && notifications.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <div className="animate-spin h-8 w-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-2" />
//               <p className="text-sm">Loading notifications...</p>
//             </div>
//           ) : notifications.length === 0 ? (
//             <div className="text-center py-8 text-gray-500">
//               <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
//               <p className="text-sm">No notifications yet</p>
//             </div>
//           ) : (
//             <div className="space-y-2">
//               {notifications.map((notification) => {
//                 const IconComponent = getNotificationIcon(notification.type)
//                 const iconColor = getNotificationColor(notification.type)
                
//                 return (
//                   <div
//                     key={notification.id}
//                     className={`p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
//                       notification.isRead 
//                         ? 'bg-gray-800/50 hover:bg-gray-700/50' 
//                         : 'bg-blue-600/10 border border-blue-500/20 hover:bg-blue-600/20'
//                     }`}
//                     onClick={() => handleNotificationClick(notification)}
//                   >
//                     <div className="flex items-start space-x-3">
//                       {/* Avatar */}
//                       <div className={`w-8 h-8 ${notification.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
//                         {notification.avatar}
//                       </div>
                      
//                       {/* Content */}
//                       <div className="flex-1 min-w-0">
//                         <div className="flex items-center space-x-2 mb-1">
//                           <IconComponent className={`h-4 w-4 ${iconColor}`} />
//                           <span className="font-medium text-white text-sm">{notification.title}</span>
//                           {!notification.isRead && (
//                             <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
//                           )}
//                         </div>
//                         <p className="text-gray-400 text-sm mb-1">{notification.message}</p>
//                         <div className="flex items-center justify-between">
//                           <span className="text-xs text-gray-500">{notification.timeAgo}</span>
//                           <div className="flex items-center space-x-1">
//                             {!notification.isRead && (
//                               <button
//                                 onClick={(e) => {
//                                   e.stopPropagation()
//                                   handleMarkAsRead(notification.id)
//                                 }}
//                                 className="p-1 hover:bg-gray-700/50 rounded transition-colors"
//                                 title="Mark as read"
//                               >
//                                 <Check className="h-3 w-3 text-gray-400 hover:text-green-400" />
//                               </button>
//                             )}
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 handleDeleteNotification(notification.id)
//                               }}
//                               className="p-1 hover:bg-gray-700/50 rounded transition-colors"
//                               title="Delete notification"
//                             >
//                               <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-400" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )
//               })}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {notifications.length > 0 && (
//           <div className="p-3 border-t border-gray-700">
//             <button
//               onClick={handleClearAll}
//               className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
//             >
//               Clear all notifications
//             </button>
//           </div>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )

//   return (
//     <nav className="sticky top-0 left-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
//         <div className="flex justify-between items-center h-16 w-full px-0">
//           {/* Left Side - Sidebar Toggle (only on edit-profile) */}
//           <div className="flex items-center relative z-50">
//             {showSidebarButton && onSidebarToggle && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={onSidebarToggle}
//                 className="mr-4 hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200 relative z-50"
//                 aria-label="Toggle sidebar"
//               >
//                 <PanelLeft className="h-6 w-6 text-gray-300" />
//               </Button>
//             )}
//           </div>

//           {/* Desktop Nav */}
//           <div className="hidden md:flex flex-1 justify-center space-x-8">
//             {showNavLinks && renderNavLinks()}
//             {showNavLinks && renderSplitShareNeeds()}
//             {showNavLinks && renderSplitOnlineSession()}
//           </div>

//           {/* Right Icons */}
//           <div className="hidden md:flex items-center space-x-4">
//             {/* {onFilterToggle && (
//               <Button 
//                 variant="ghost" 
//                 size="icon" 
//                 aria-label="Filter"
//                 onClick={onFilterToggle}
//                 className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200"
//               >
//                 <Filter className="h-6 w-6 text-gray-300" />
//               </Button>
//             )} */}
//             {showNavLinks && renderNotificationMenu()}
//             { renderUserMenu()}
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden">
//             <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? (
//                 <X className="h-6 w-6 text-gray-300" />
//               ) : (
//                 <Menu className="h-6 w-6 text-gray-300" />
//               )}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-700 bg-gray-900/90">
//             <div className="flex flex-col space-y-4 px-4">
//               {showNavLinks && renderNavLinks()}
//               {showNavLinks && renderSplitShareNeeds()}
//               {showNavLinks && renderSplitOnlineSession()}
//               <div className="pt-4 border-t border-gray-700 flex space-x-4">
//                 {/* {onFilterToggle && (
//                   <Button 
//                     variant="ghost" 
//                     size="icon" 
//                     aria-label="Filter"
//                     onClick={onFilterToggle}
//                     className="hover:bg-purple-600/20 hover:text-purple-400 transition-colors duration-200"
//                   >
//                     <Filter className="h-6 w-6 text-gray-300" />
//                   </Button>
//                 )} */}
//                 { showNavLinks &&renderNotificationMenu()}
//                 {showNavLinks && renderUserMenu()}
//               </div>
//             </div>
//           </div>
//         )}
//     </nav>
//   )
// }

// export default Navbarpostlogin



"use client"

import { useState, useEffect } from "react"
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
  ChevronDown,
  Check,
  PanelLeft,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useAuthStore } from "../../store/authStore"
import { useNotifications } from "../../hooks/useNotifications"
import { 
  getNotificationIcon, 
  getNotificationColor, 
  getAvatarColor, 
  getTimeAgo,
  determineNotificationType,
  extractAuthorName,
  getAvatarInitial,
  type NotificationDisplay
} from "../../lib/notificationHelpers"

interface NavbarpostloginProps {
  onFilterToggle?: () => void
  onSidebarToggle?: () => void
  showSidebarButton?: boolean
}

const Navbarpostlogin = ({ 
  // onFilterToggle, 
  onSidebarToggle, 
  showSidebarButton 
}: NavbarpostloginProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isNotificationOpen, setIsNotificationOpen] = useState(false)
  const navigate = useNavigate()
  const logout = useAuthStore((state) => state.logout)
  const token = useAuthStore((state) => state.token)
  const { user } = useAuthStore();

  // We will show nav links IF:
  // - The user is NOT a STARTUP (e.g., a Student)
  // - OR the user IS a STARTUP and IS VERIFIED
  const showNavLinks = user?.role !== 'STARTUP' || user?.is_startup_verified;

  // Use the notifications hook with Socket.IO
  const {
    notifications: apiNotifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    isConnected
  } = useNotifications(token)

  // Transform API notifications to display format
  const notifications: NotificationDisplay[] = apiNotifications.map(notif => {
    const notifType = determineNotificationType(notif)
    const authorName = extractAuthorName(notif.message)
    
    return {
      id: notif.id.toString(),
      type: notifType,
      title: authorName,
      message: notif.message,
      timeAgo: getTimeAgo(notif.createdAt),
      isRead: notif.isRead,
      avatar: getAvatarInitial(authorName),
      avatarColor: getAvatarColor(notifType)
    }
  })

  // Show connection status in console
  useEffect(() => {
    console.log('🔌 Socket connection status:', isConnected ? 'Connected' : 'Disconnected')
  }, [isConnected])

  // Show error if any
  useEffect(() => {
    if (error) {
      console.error('❌ Notification error:', error)
    }
  }, [error])

  const navigateTo = (path: string) => {
    navigate(path)
    setIsMenuOpen(false)
  }

  const handleMarkAsRead = (notificationId: string) => {
    markAsRead([parseInt(notificationId)])
  }

  const handleMarkAllAsRead = () => {
    markAllAsRead()
  }

  const handleDeleteNotification = (notificationId: string) => {
    deleteNotification(parseInt(notificationId))
  }

  const handleClearAll = () => {
    clearAllNotifications()
    setIsNotificationOpen(false)
  }

  const handleNotificationClick = (notification: NotificationDisplay) => {
    // Mark as read
    if (!notification.isRead) {
      handleMarkAsRead(notification.id)
    }

    // Navigate to related content
    const apiNotif = apiNotifications.find(n => n.id.toString() === notification.id)
    if (apiNotif) {
      if (apiNotif.postId) {
        navigate(`/post/${apiNotif.postId}`)
      } else if (apiNotif.sessionId) {
        navigate(`/sessions/${apiNotif.sessionId}`)
      } else if (apiNotif.needId) {
        navigate(`/needs/${apiNotif.needId}`)
      }
    }
    
    setIsNotificationOpen(false)
  }

  const navItems = [
    { label: "Home", path: "/postlogin" },
    { label: "Explore", path: "/explore" },
    { label: "Get Funded", path: "/get-funded" },
  ]

  const userMenuItems = [
    { icon: <User className="h-4 w-4" />, label: "Profile", path: "/profile" },
    { icon: <Edit className="h-4 w-4" />, label: "Edit Profile", path: "/edit-profile" },
    { icon: <List className="h-4 w-4" />, label: "My Activities", path: "/activities" },
    { icon: <LogOut className="h-4 w-4" />, label: "Logout", path: "/logout", action: "logout" },
    // { icon: <Trash2 className="h-4 w-4 text-red-500" />, label: "Delete Profile", path: "/delete" },
  ]

  const renderNavLinks = () =>
    navItems.map(({ label, path }) => (
      <button
        key={path}
        onClick={() => navigateTo(path)}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        {label}
      </button>
    ))

  const renderSplitShareNeeds = () => (
    <div className="relative flex items-center space-x-0">
      <button
        onClick={() => navigateTo("/share-needs")}
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 pr-2"
      >
        Share Needs
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 pl-1"
            aria-label="Open Online Session Dropdown"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-gray-900 border border-gray-200 shadow-lg">
          <DropdownMenuItem onClick={() => navigateTo("/view-needs")} className="hover:bg-gray-100 cursor-pointer">
            View Needs
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/share-needs")} className="hover:bg-gray-100 cursor-pointer">
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
        className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 pr-2"
      >
        Online Session
      </button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="text-gray-600 hover:text-blue-600 transition-colors duration-200 pl-1"
            aria-label="Open Online Session Dropdown"
          >
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-gray-900 border border-gray-200 shadow-lg">
          <DropdownMenuItem onClick={() => navigateTo("/view-session")} className="hover:bg-gray-100 cursor-pointer">
            View Sessions
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/host-session")} className="hover:bg-gray-100 cursor-pointer">
            Host Sessions
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )

  const renderUserMenu = () => {
    const handleItemClick = (item: any) => {
      if (item.action === "logout") {
        logout()
        navigate("/prelogin")
      } else if (item.path) {
        navigate(item.path)
      }
    }

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" aria-label="User menu" className="hover:bg-gray-100">
            <User className="h-6 w-6 text-gray-600" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="bg-white text-gray-900 border border-gray-200 shadow-lg">
          {userMenuItems.map((item) => (
            <DropdownMenuItem
              key={item.label}
              className="flex items-center space-x-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <span className="text-gray-600">{item.icon}</span>
              <span>{item.label}</span>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  const renderNotificationMenu = () => (
    <DropdownMenu open={isNotificationOpen} onOpenChange={setIsNotificationOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative hover:bg-gray-100">
          <Bell className="h-6 w-6 text-gray-600" />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold animate-pulse">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
          {/* Connection indicator */}
          <span 
            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
            title={isConnected ? 'Connected' : 'Disconnected'}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white text-gray-900 border border-gray-200 shadow-lg w-80 max-h-96 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <h3 className="font-semibold text-gray-900">Notifications</h3>
            {loading && (
              <div className="animate-spin h-4 w-4 border-2 border-blue-600 border-t-transparent rounded-full" />
            )}
          </div>
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-blue-600 hover:text-blue-500 transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-600 text-sm">
            {error}
          </div>
        )}

        {/* Notifications List */}
        <div className="p-2">
          {loading && notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <div className="animate-spin h-8 w-8 border-2 border-blue-600 border-t-transparent rounded-full mx-auto mb-2" />
              <p className="text-sm">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No notifications yet</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => {
                const IconComponent = getNotificationIcon(notification.type)
                // You might want to adjust getNotificationColor if it returns text colors that are too light
                const iconColor = getNotificationColor(notification.type)
                
                return (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg transition-colors duration-200 cursor-pointer ${
                      notification.isRead 
                        ? 'bg-gray-50 hover:bg-gray-100' 
                        : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start space-x-3">
                      {/* Avatar */}
                      <div className={`w-8 h-8 ${notification.avatarColor} rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                        {notification.avatar}
                      </div>
                      
                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <IconComponent className={`h-4 w-4 ${iconColor}`} />
                          <span className="font-medium text-gray-900 text-sm">{notification.title}</span>
                          {!notification.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        <p className="text-gray-600 text-sm mb-1">{notification.message}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-500">{notification.timeAgo}</span>
                          <div className="flex items-center space-x-1">
                            {!notification.isRead && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMarkAsRead(notification.id)
                                }}
                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                title="Mark as read"
                              >
                                <Check className="h-3 w-3 text-gray-400 hover:text-green-600" />
                              </button>
                            )}
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                handleDeleteNotification(notification.id)
                              }}
                              className="p-1 hover:bg-gray-200 rounded transition-colors"
                              title="Delete notification"
                            >
                              <Trash2 className="h-3 w-3 text-gray-400 hover:text-red-500" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-3 border-t border-gray-200">
            <button
              onClick={handleClearAll}
              className="w-full text-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear all notifications
            </button>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <nav className="sticky top-0 left-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-200 z-50 shadow-sm">
        <div className="flex justify-between items-center h-16 w-full px-4 md:px-8">
          {/* Left Side - Sidebar Toggle (only on edit-profile) */}
          <div className="flex items-center relative z-50">
            {showSidebarButton && onSidebarToggle && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onSidebarToggle}
                className="mr-4 hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200 relative z-50"
                aria-label="Toggle sidebar"
              >
                <PanelLeft className="h-6 w-6 text-gray-600" />
              </Button>
            )}
            {/* If you have a logo, you can place it here */}
            {/* <span className="font-bold text-xl text-gray-900">Logo</span> */}
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {showNavLinks && renderNavLinks()}
            {showNavLinks && renderSplitShareNeeds()}
            {showNavLinks && renderSplitOnlineSession()}
          </div>

          {/* Right Icons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* {onFilterToggle && (
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Filter"
                onClick={onFilterToggle}
                className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
              >
                <Filter className="h-6 w-6 text-gray-600" />
              </Button>
            )} */}
            {showNavLinks && renderNotificationMenu()}
            { renderUserMenu()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95">
            <div className="flex flex-col space-y-4 px-4">
              {showNavLinks && renderNavLinks()}
              {showNavLinks && renderSplitShareNeeds()}
              {showNavLinks && renderSplitOnlineSession()}
              <div className="pt-4 border-t border-gray-200 flex space-x-4">
                {/* {onFilterToggle && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    aria-label="Filter"
                    onClick={onFilterToggle}
                    className="hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
                  >
                    <Filter className="h-6 w-6 text-gray-600" />
                  </Button>
                )} */}
                { showNavLinks && renderNotificationMenu()}
                {showNavLinks && renderUserMenu()}
              </div>
            </div>
          </div>
        )}
    </nav>
  )
}

export default Navbarpostlogin