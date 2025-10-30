
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const navItems = [
    { name: "Home", path: "/" },
    { name: "Get Experience", path: "/#experience" },
    { name: "Upskill", path: "/#upskill" },
    { name: "Starting Up", path: "/#startup" },
    { name: "Mentorship", path: "/#learn" },
    { name: "Compete", path: "/#compete" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-black rounded-full" />
          <span className="font-semibold text-gray-900 tracking-wide">Home</span>
        </div>

        {/* Nav Menu */}
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

        {/* Animated underline */}
        <span
          className={`absolute left-0 -bottom-1 h-[2px] bg-black transition-all duration-300
            ${isActive ? "w-full" : "w-0 group-hover:w-full"}
          `}
        />
      </li>
    );
  })}
</ul>



        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <button className="text-gray-700 hover:text-gray-900 text-sm font-medium cursor-pointer">
            Log In
          </button>
          <button className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium cursor-pointer hover:bg-gray-900">
            Sign Up
          </button>
        </div>
      </div>
    </nav>
  );
}
