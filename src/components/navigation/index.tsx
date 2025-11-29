// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import OrionLogo from "../../assets/logoimg.png"
// // Import the new auth components at the top
// import AuthModals from "@/components/auth/auth-modals"

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//     setIsMenuOpen(false)
//   }

//   const navItems = [
//     { label: "Share Needs", id: "share-needs" },
//     { label: "Explore", id: "explore" },
//     { label: "Host Sessions", id: "host-sessions" },
//     { label: "Get Funded", id: "get-funded" },
//   ]

//   return (
//     <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-md border-b border-gray-700 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           {/* <div className="flex items-center space-x-2">
//             <img src={OrionLogo} alt="Orion Logo" className="h-14 w-auto" />
//           </div> */}
//           <div className="flex items-center space-x-2">
//               {/* NOTE: Make sure OrionLogo path is correct or use a placeholder */}
//               <img src={OrionLogo} alt="Orion Logo" className="h-10 w-auto" />
//               {/* <img src={LogoWord} alt="Orion Logo" className="h-5 ml-[0px] w-auto" /> */}
//               <h3 className="text-white font-bold">Om<span className="text-fuchsia-500">Verg</span></h3>
//             </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 className="text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
//               >
//                 {item.label}
//               </button>
//             ))}
//             {/* Replace the Login and Sign Up buttons section with: */}
//             <div className="flex items-center space-x-4">
//               <AuthModals />
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="h-6 w-6 text-gray-300" /> : <Menu className="h-6 w-6 text-gray-300" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-700 bg-gray-900/90">
//             <div className="flex flex-col space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   className="text-left text-gray-300 hover:text-blue-400 font-medium transition-colors duration-200"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               {/* Also update the mobile navigation section to use AuthModals: */}
//               <div className="flex flex-col space-y-2 pt-4 border-t border-gray-700">
//                 <AuthModals />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navigation
// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Menu, X } from "lucide-react"
// import OrionLogo from "../../assets/logoimg.png"
// // Import the new auth components at the top
// import AuthModals from "@/components/auth/auth-modals"

// const Navigation = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false)

//   const scrollToSection = (sectionId: string) => {
//     const element = document.getElementById(sectionId)
//     if (element) {
//       element.scrollIntoView({ behavior: "smooth" })
//     }
//     setIsMenuOpen(false)
//   }

//   const navItems = [
//     { label : "Home ", id : "/"},
//     { label: "Share Needs", id: "share-needs" },
//     { label: "Explore", id: "explore" },
//     { label: "Host Sessions", id: "host-sessions" },
//     { label: "Get Funded", id: "get-funded" },
//   ]

//   return (
//     // Light theme: White/light background, light border
//     <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16">
//           {/* Logo */}
//           <div className="flex items-center space-x-2">
//             {/* NOTE: Make sure OrionLogo path is correct or use a placeholder */}
//             <img src={OrionLogo} alt="Orion Logo" className="h-10 w-auto" />
//             {/* Dark text for light background */}
//             <h3 className="text-gray-900 font-bold">Om<span className="text-fuchsia-600">Verg</span></h3>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-8">
//             {navItems.map((item) => (
//               <button
//                 key={item.id}
//                 onClick={() => scrollToSection(item.id)}
//                 // Dark text, light hover accent
//                 className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
//               >
//                 {item.label}
//               </button>
//             ))}
//             {/* AuthModals section */}
//             <div className="flex items-center space-x-4">
//               <AuthModals />
//             </div>
//           </div>

//           {/* Mobile menu button */}
//           <div className="md:hidden">
//             <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {/* Dark icons for light background */}
//               {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           // Light background, light border
//           <div className="md:hidden py-4 border-t border-gray-200 bg-white/95">
//             <div className="flex flex-col space-y-4">
//               {navItems.map((item) => (
//                 <button
//                   key={item.id}
//                   onClick={() => scrollToSection(item.id)}
//                   // Dark text, light hover accent
//                   className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
//                 >
//                   {item.label}
//                 </button>
//               ))}
//               {/* Also update the mobile navigation section to use AuthModals: */}
//               <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
//                 <AuthModals />
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </nav>
//   )
// }

// export default Navigation

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import OrionLogo from "../../assets/logoimg.png"
// Import the new auth components at the top
import AuthModals from "@/components/auth/auth-modals"

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  // FIX 1: Update scrollToSection to handle '/' for hard navigation
  const scrollToSection = (sectionId: string) => {
    // If the ID is '/', navigate to the root path
    if (sectionId === '/') {
        window.location.href = '/'
        return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    // Close the menu after click
    setIsMenuOpen(false) 
  }

  const navItems = [
    // Using the full path / to signal root navigation
    { label : "Home", id : "/"},
    { label: "Share Needs", id: "share-needs" },
    { label: "Explore", id: "explore" },
    { label: "Host Sessions", id: "host-sessions" },
    { label: "Get Funded", id: "get-funded" },
  ]

  // FIX 2: Apply hover animation styles
  const navButtonClass = "text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
  const underlineAnimationClass = "after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-blue-600 after:transition-all after:duration-300 group-hover:after:w-full"


  return (
    // Light theme: White/light background, light border
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={OrionLogo} alt="OmVerg Logo" className="h-10 w-auto" />
            <h3 className="text-gray-900 font-bold">Om<span className="text-fuchsia-600">Verg</span></h3>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                // Combined classes for hover and underline animation
                className={`py-1 ${navButtonClass} ${underlineAnimationClass}`}
              >
                {item.label}
              </button>
            ))}
            {/* AuthModals section */}
            <div className="flex items-center space-x-4">
              <AuthModals />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          // Light background, light border
          <div className="md:hidden py-4 border-t border-gray-200 bg-white/95">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  // Simplified classes for mobile list items
                  className="text-left text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
                >
                  {item.label}
                </button>
              ))}
              {/* Also update the mobile navigation section to use AuthModals: */}
              <div className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
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