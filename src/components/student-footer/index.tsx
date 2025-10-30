export default function Footer() {
  return (
    <footer className="w-full mt-28 bg-[#003D9A]">

      {/* Wrapper */}
      <div className="grid grid-cols-1 md:grid-cols-4">

        {/* Left Logo Panel */}
        <div className="bg-gray-200 p-10 flex items-center justify-center">
          <h3 className="text-lg font-semibold text-slate-700">
            Orion Eduverse
          </h3>
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
                <li><a href="#" className="hover:underline">Terms & conditions</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>

            {/* Socials */}
            <div>
              <h4 className="font-semibold mb-4">Socials</h4>
              <div className="flex items-center gap-4">
                {/* Instagram */}
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:opacity-80 transition"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M7 7h10v10H7z"
                    />
                  </svg>
                </a>
                {/* Facebook */}
                <a href="#">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 hover:opacity-80 transition"
                    fill="currentColor"
                    viewBox="0 0 24 24"
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
