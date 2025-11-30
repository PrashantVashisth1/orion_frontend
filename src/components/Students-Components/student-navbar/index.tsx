
// // import { Link, useLocation } from "react-router-dom";
// import { HashLink as Link } from "react-router-hash-link";
// import { useLocation } from "react-router-dom";
// import logo from '../../../assets/logoimg.png'

// export default function Navbar() {
//   const location = useLocation();
//   const navItems = [
//     { name: "Home", path: "/" },
//     { name: "Get Experience", path: "#experience" },
//     { name: "Upskill", path: "#upskill" },
//     { name: "Starting Up", path: "#startup" },
//     { name: "Mentorship", path: "#learn" },
//     { name: "Compete", path: "#compete" },
//   ];

//   return (
//     <nav className="bg-white shadow-sm sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
//         {/* LOGO */}
//         <div className="flex items-center gap-2">
//           <img src={logo} alt="" className="w-12 h-12" />
//           <span className="font-semibold text-gray-900 tracking-wide">OmVerg</span>
//         </div>

//         {/* Nav Menu */}
//         <ul className="hidden md:flex items-center gap-14">
//   {navItems.map((item) => {
//     const isActive = location.pathname === item.path;
//     return (
//       <li key={item.name} className="relative group">
//         <Link
//           to={item.path}
//           className="text-sm font-medium text-black no-underline hover:text-black"
//         >
//           {item.name}
//         </Link>

//         {/* Animated underline */}
//         <span
//           className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300
//             ${isActive ? "w-full" : "w-0 group-hover:w-full"}
//           `}
//         />
//       </li>
//     );
//   })}
// </ul>



//         {/* Auth Buttons */}
//         <div className="flex items-center gap-4">
//           <button className="text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer">
//             Log In
//           </button>
//           <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-900">
//             Sign Up
//           </button>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { HashLink as Link } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import logo from '../../../assets/logoimg.png';

// ✅ Import Auth Modals
import AuthModals from "@/components/auth/auth-modals";

export default function Navbar() {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Get Experience", path: "#experience" },
    { name: "Upskill", path: "#upskill" },
    { name: "StartUp", path: "#startup" },
    { name: "Mentorship", path: "#learn" },
    { name: "Compete", path: "#compete" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-12 h-12" />
          <h2 className="text-3xl font-semibold text-gray-500">
            Om<span className='text-fuchsia-600'>Verg</span>
          </h2>
        </div>

        {/* Nav Items */}
        <ul className="hidden md:flex items-center gap-14">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.name} className="relative group">
                <Link
                  to={item.path}
                  className="text-sm font-medium text-black no-underline hover:text-black"
                >
                  {item.name}
                </Link>

                {/* Underline */}
                <span
                  className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300
                    ${isActive ? "w-full" : "w-0 group-hover:w-full"}
                  `}
                />
              </li>
            );
          })}
        </ul>

        {/* 🔥 Auth Modals (Login / Signup) */}
        <div className="flex items-center gap-4">
          <AuthModals />
        </div>

      </div>
    </nav>
  );
}
