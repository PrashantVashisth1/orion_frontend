import type React from "react"
import { Rocket, Twitter, Linkedin, Github, Mail, Phone, MapPin } from "lucide-react"
// import { Button } from "@/components/ui/button"

const Footer: React.FC = () => {
  const footerLinks = {
    platform: [
      { label: "Explore Startups", href: "/" },
      { label: "Find Funding", href: "#funding" },
      { label: "Host Events", href: "/host-session" },
      { label: "Share Needs", href: "#share-needs" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#privacy" },
      { label: "Terms of Service", href: "#terms" },
      { label: "Cookie Policy", href: "#cookies" },
      { label: "GDPR", href: "#gdpr" },
    ],
  }

  const socialLinks = [
    { icon: Twitter, href: "/host-session", label: "Twitter" },
    { icon: Linkedin, href: "#linkedin", label: "LinkedIn" },
    { icon: Github, href: "#github", label: "GitHub" },
  ]

  return (
<footer className="relative mt-12 overflow-hidden bg-gradient-to-r bg-black text-white">
      <div className="absolute inset-0 bg-black/10"></div>

      <div className="relative w-full px-8 md:px-12 lg:px-20 xl:px-32 py-5">
 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6 group">
              <Rocket className="h-8 w-8 text-indigo-400 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-300" />
              <span className="text-2xl font-bold group-hover:text-indigo-400 transition-colors duration-300">
          Orion Eduverse
              </span>
            </div>
            <p className="text-purple-100 mb-6 leading-relaxed">
              Connecting innovators, investors, and entrepreneurs to build the future together. Join our community of
              game-changers.
            </p>
            <div className="space-y-3 text-sm text-purple-200">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>orioneduverse@gmail.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+91 123456789</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>Ranchi, Jharkhand</span>
              </div>
            </div>
            <div className="flex mt-4 space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-all duration-300"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Call to Action */}
          <div className="text-center lg:text-left">
            <h4 className="text-2xl font-bold mb-4">Ready to Transform Your Startup Journey?</h4>
            <p className="text-purple-100 mb-6">
              Join thousands of entrepreneurs who are already connecting, learning, and growing together.
            </p>
           
          </div>
        </div>

        {/* Bottom Note */}
        {/* <div className="mt-12 pt-6 border-t border-white/10 text-center text-sm text-purple-300">
          &copy; 2024 StartupHub. All rights reserved. Made with ❤️ for entrepreneurs worldwide.
        </div> */}
      </div>
    </footer>
  )
}

export default Footer
