import logo from '../../assets/logoimg.png'
const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-10 py-5 shadow-sm bg-white">
      <div className="flex items-center space-x-2">
        <img src={logo} alt="" className='h-12 w-12' />
        <span className="font-semibold text-gray-500 text-lg">Om<span className='text-fuchsia-600'>Verg</span></span>
      </div>

      <ul className="flex space-x-10 text-blue-600 font-medium">
        <li>Home</li>
        <li className="text-blue-700 border-b-2 border-blue-700">List of Mentors</li>
        <li>Explore Possibilities</li>
        <li>Explore StartUp</li>
        <li>Learning Resources</li>
        <li>Share Project/Idea</li>
      </ul>

      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700">
        <i className="fa-regular fa-user"></i>
      </div>
    </nav>
  );
};

export default Navbar;
