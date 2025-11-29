// import logo from '../../../assets/logoimg.png'
// const Navbar = () => {
//   return (
//     <nav className="flex justify-between items-center px-10 py-5 shadow-sm bg-white">
//       <div className="flex items-center space-x-2">
//         <img src={logo} alt="" className='h-12 w-12' />
//         <span className="font-semibold text-gray-500 text-lg">Om<span className='text-fuchsia-600'>Verg</span></span>
//       </div>

//       <ul className="flex space-x-10 text-blue-600 font-medium">
//         <li>Home</li>
//         <li className="text-blue-700 border-b-2 border-blue-700">List of Mentors</li>
//         <li>Explore Possibilities</li>
//         <li>Explore StartUp</li>
//         <li>Learning Resources</li>
//         <li>Share Project/Idea</li>
//       </ul>

//       <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
//         <i className="fa-regular fa-user"></i>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

// import { Link, useLocation } from "react-router-dom";
// import logo from "../../../assets/logoimg.png";

// const Navbar = () => {
//   const location = useLocation();

//   const navItems = [
//     { name: "Home", path: "/students/postlogin" },
//     { name: "List of Mentors", path: "/students/mentor" },
//     { name: "Explore Possibilities", path: "/students/explore-possibilities" },
//     { name: "Explore StartUp", path: "/explore-startup" },
//     { name: "Learning Resources", path: "/students/learning" },
//     { name: "Share Project/Idea", path: "/students/share" },
//   ];

//   return (
//     <nav className="flex justify-between items-center px-10 py-5 shadow-sm bg-white">
//       <div className="flex items-center space-x-2">
//         <img src={logo} alt="Logo" className="h-12 w-12" />
//         <span className="font-semibold text-gray-500 text-lg">
//           Om<span className="text-fuchsia-600">Verg</span>
//         </span>
//       </div>

//       <ul className="flex space-x-10 text-blue-600 font-medium">
//         {navItems.map((item) => (
//           <li key={item.path}>
//             <Link
//               to={item.path}
//               className={`${
//                 location.pathname === item.path
//                   ? "text-blue-700 border-b-2 border-blue-700"
//                   : "hover:text-blue-700"
//               } pb-1`}
//             >
//               {item.name}
//             </Link>
//           </li>
//         ))}
//       </ul>

//       <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
//         <i className="fa-regular fa-user"></i>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../../assets/logoimg.png";
import { useAuthStore } from "../../../store/authStore";
import { PanelLeft } from "lucide-react";

const Navbar = ({ onSidebarToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user); // get user + name

  const [openDropdown, setOpenDropdown] = useState(false);

  // Create initials from user name
  const getInitials = (name) => {
    if (!name) return "?";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const navItems = [
    { name: "Home", path: "/students/postlogin" },
    { name: "List of Mentors", path: "/students/mentor" },
    { name: "Explore Possibilities", path: "/students/explore-possibilities" },
    { name: "Explore StartUp", path: "/explore-startup" },
    { name: "Learning Resources", path: "/students/learning" },
    { name: "Share Project/Idea", path: "/students/share" },
  ];

  return (
    <nav className="flex justify-between items-center px-10 py-5 shadow-sm bg-white relative">
      
      {/* LEFT — Sidebar Toggle + Logo */}
      <div className="flex items-center space-x-4">
        {onSidebarToggle && (
          <button
            onClick={onSidebarToggle}
            className="p-2 cursor-pointer rounded-lg hover:bg-gray-100 transition"
          >
            <PanelLeft className="h-6 w-6 text-gray-600" />
          </button>
        )}

        <div className="flex items-center space-x-2">
          <img src={logo} alt="Logo" className="h-12 w-12" />
          <span className="font-semibold text-gray-500 text-lg">
            Om<span className="text-fuchsia-600">Verg</span>
          </span>
        </div>
      </div>

      {/* CENTER — Menu */}
      <ul className="flex space-x-10 text-blue-600 font-medium">
        {navItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`${
                location.pathname === item.path
                  ? "text-blue-700 border-b-2 border-blue-700"
                  : "hover:text-blue-700"
              } pb-1`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* RIGHT — Initial Avatar + Dropdown */}
      <div className="relative z-50">
        <button
          onClick={() => setOpenDropdown((prev) => !prev)}
          className="w-9 h-9 cursor-pointer rounded-full bg-blue-600 text-white font-semibold flex items-center justify-center"
        >
          {getInitials(user?.full_name)}
        </button>

        {openDropdown && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 z-20">
            <Link
              to="/students/profile"
              className="block cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => setOpenDropdown(false)}
            >
              Profile
            </Link>

            <Link
              to="/students/edit-profile"
              className="block cursor-pointer px-4 py-2 hover:bg-gray-100 text-gray-700"
              onClick={() => setOpenDropdown(false)}
            >
              Edit Profile
            </Link>

            <button
              className="w-full cursor-pointer text-left px-4 py-2 hover:bg-gray-100 text-red-600"
              onClick={() => {
                logout();
                navigate("/students/prelogin");
                setOpenDropdown(false);
              }}
            >  
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
