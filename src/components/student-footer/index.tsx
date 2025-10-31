import logo from '../../assets/logoimg.png'

export default function Footer() {
  return (
    <footer className="w-full mt-18 bg-[#003D9A]">
      {/* Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-4">

        {/* Left Logo Panel */}
        <div className="bg-gray-200 p-10 flex items-center justify-center">
          <img src={logo} alt="" className="w-16 h-16 mr-3" />
          <h2 className="text-3xl font-semibold text-gray-500">
            Om<span className='text-fuchsia-600'>Verg</span>
          </h2>
        </div>

        {/* Right Content Panel */}
        <div className="md:col-span-3 bg-[#003D9A] text-white p-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">News & Insights</a></li>
                <li><a href="#" className="hover:underline">For Partners</a></li>
                <li><a href="#" className="hover:underline">Ambassadors</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Terms & Conditions</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-semibold mb-4">Socials</h4>
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a href="#" aria-label="Instagram" className="hover:opacity-80 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5ZM20 7.75v8.5A3.75 3.75 0 0 1 16.25 20h-8.5A3.75 3.75 0 0 1 4 16.25v-8.5A3.75 3.75 0 0 1 7.75 4h8.5A3.75 3.75 0 0 1 20 7.75ZM12 8.25A3.75 3.75 0 1 0 12 15a3.75 3.75 0 0 0 0-6.75Zm0 6A2.25 2.25 0 1 1 12 9.75a2.25 2.25 0 0 1 0 4.5Zm4.25-6.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" />
                  </svg>
                </a>

                {/* Facebook */}
                <a href="#" aria-label="Facebook" className="hover:opacity-80 transition">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7H8v-3h2.5V9.5a3.5 3.5 0 0 1 3.8-3.9c.8 0 1.7.1 1.7.1v2H15a2 2 0 0 0-2.3 2.2V12H17l-.5 3h-3v7A10 10 0 0 0 22 12" />
                  </svg>
                </a>
              </div>
            </div>

          </div>

          {/* Bottom Copyright */}
          <div className="text-sm text-gray-200 mt-10">
            © 2025 Orion Eduverse
          </div>
        </div>
      </div>
    </footer>
  );
}
