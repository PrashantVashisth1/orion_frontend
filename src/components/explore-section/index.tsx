import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import SignupForm from "@/components/auth/signup-form"
import { useAuth } from "@/contexts/AuthContext"
import { 
  Plane, 
  Wheat, 
  Dna, 
  DollarSign, 
  ShoppingBag, 
  Heart,
  Rocket,
  Eye,
  Shield,
  Cloud,
  Building,
  Users,
  Database,
  Globe,
  Smartphone,
  ShoppingCart,
  GraduationCap,
  Zap,
  Gamepad2,
  Leaf,
  MapPin,
  Activity,
  Utensils,
  Home,
  Hotel,
  Target,
  Factory,
  Monitor,
  FileText,
  Wifi,
  Briefcase,
  Newspaper,
  Baby,
  BookOpen,
  Scale,
  Truck,
  Crown,
  Cog,
  Music,
  Stethoscope,
  Car,
  Atom,
  Store,
  Droplets,
  Code,
  Tv,
  CreditCard,
  Wallet,
  Building2,
  Wrench,
  Cpu,
  Lock,
  Users2,
  Satellite,
  Trophy,
  Recycle,
  Train,
  Underline,
  Mic,
  Network,
  Watch,
  Trash2,
  Package,
  Wind,
  Battery
} from "lucide-react"

const ExploreSection = () => {
  const [showAllIndustries, setShowAllIndustries] = useState(false)
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false)
  const { user } = useAuth()

  const industries = [
    { icon: Rocket, name: "Aerospace & Agribon Analytics", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "150+" },
    { icon: Eye, name: "Alignment and Reality (AR)", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "200+" },
    { icon: Dna, name: "Biotech", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "320+" },
    { icon: Shield, name: "Blockchain", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "280+" },
    { icon: Leaf, name: "Clean Tech & Cultural", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glowColor: "group-hover:shadow-emerald-500/25", startups: "180+" },
    { icon: Cloud, name: "Cloud Computing & Construct", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", glowColor: "group-hover:shadow-sky-500/25", startups: "450+" },
    { icon: Building, name: "ConTech", color: "bg-stone-500/20 text-stone-400 border-stone-500/30", glowColor: "group-hover:shadow-stone-500/25", startups: "120+" },
    { icon: Users, name: "Consumer", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", glowColor: "group-hover:shadow-pink-500/25", startups: "380+" },
    { icon: Database, name: "Data Science", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "290+" },
    { icon: Shield, name: "Defense Tech", color: "bg-red-500/20 text-red-400 border-red-500/30", glowColor: "group-hover:shadow-red-500/25", startups: "90+" },
    { icon: Heart, name: "Digital Health", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", glowColor: "group-hover:shadow-rose-500/25", startups: "340+" },
    { icon: Plane, name: "Drones", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "160+" },
    { icon: ShoppingCart, name: "E-commerce", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "420+" },
    { icon: GraduationCap, name: "EdTech", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", glowColor: "group-hover:shadow-teal-500/25", startups: "260+" },
    { icon: Zap, name: "Electronic", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", glowColor: "group-hover:shadow-yellow-500/25", startups: "180+" },
    { icon: Battery, name: "Energy Storage", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "140+" },
    { icon: Trophy, name: "Entertainment & Sports", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "220+" },
    { icon: ShoppingBag, name: "Fashion Tech", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", glowColor: "group-hover:shadow-pink-500/25", startups: "150+" },
    { icon: DollarSign, name: "FinTech", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glowColor: "group-hover:shadow-emerald-500/25", startups: "450+" },
    { icon: Activity, name: "Fitness & Wellness", color: "bg-red-500/20 text-red-400 border-red-500/30", glowColor: "group-hover:shadow-red-500/25", startups: "190+" },
    { icon: Utensils, name: "FoodTech", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "170+" },
    { icon: Gamepad2, name: "Gaming & GovTech", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "280+" },
    { icon: Leaf, name: "GreenTech", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "200+" },
    { icon: MapPin, name: "Geo-spatial Tech", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "110+" },
    { icon: Stethoscope, name: "HealthTech", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", glowColor: "group-hover:shadow-rose-500/25", startups: "360+" },
    { icon: Users2, name: "HRTech", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "140+" },
    { icon: Home, name: "Home Automation", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", glowColor: "group-hover:shadow-slate-500/25", startups: "130+" },
    { icon: Hotel, name: "Hospitality Tech", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", glowColor: "group-hover:shadow-amber-500/25", startups: "120+" },
    { icon: Target, name: "Impact Tech", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", glowColor: "group-hover:shadow-teal-500/25", startups: "100+" },
    { icon: Factory, name: "Industrial", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", glowColor: "group-hover:shadow-gray-500/25", startups: "180+" },
    { icon: Monitor, name: "InfoTech", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "400+" },
    { icon: FileText, name: "InsurTech", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", glowColor: "group-hover:shadow-cyan-500/25", startups: "160+" },
    { icon: Wifi, name: "IoT (Internet of Things)", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "240+" },
    { icon: Briefcase, name: "JobTech", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "150+" },
    { icon: Newspaper, name: "Journalism Tech", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "80+" },
    { icon: Baby, name: "KidsTech", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", glowColor: "group-hover:shadow-pink-500/25", startups: "90+" },
    { icon: BookOpen, name: "Knowledge Management", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", glowColor: "group-hover:shadow-teal-500/25", startups: "110+" },
    { icon: Scale, name: "LegalTech", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", glowColor: "group-hover:shadow-slate-500/25", startups: "120+" },
    { icon: Truck, name: "Logistics & Supply Chain", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "200+" },
    { icon: Crown, name: "Lifestyle & Luxury", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", glowColor: "group-hover:shadow-amber-500/25", startups: "140+" },
    { icon: Cog, name: "Manufacturing Tech", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", glowColor: "group-hover:shadow-gray-500/25", startups: "160+" },
    { icon: Music, name: "Media & Entertainment", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "280+" },
    { icon: Heart, name: "MedTech", color: "bg-red-500/20 text-red-400 border-red-500/30", glowColor: "group-hover:shadow-red-500/25", startups: "290+" },
    { icon: Car, name: "Mobility", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "220+" },
    { icon: Music, name: "MusicTech", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", glowColor: "group-hover:shadow-pink-500/25", startups: "130+" },
    { icon: Atom, name: "NanoTech", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "70+" },
    { icon: Store, name: "New Retail", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "180+" },
    { icon: Droplets, name: "Oil & Gas", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", glowColor: "group-hover:shadow-yellow-500/25", startups: "100+" },
    { icon: Code, name: "Open Source", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "150+" },
    { icon: Tv, name: "Online Media", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "200+" },
    { icon: CreditCard, name: "Payments & Digital Wallets", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glowColor: "group-hover:shadow-emerald-500/25", startups: "240+" },
    { icon: Wallet, name: "Personal Finance", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", glowColor: "group-hover:shadow-cyan-500/25", startups: "160+" },
    { icon: Building2, name: "PropTech", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", glowColor: "group-hover:shadow-slate-500/25", startups: "170+" },
    { icon: Wrench, name: "Productivity Tools", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "220+" },
    { icon: Cpu, name: "Quantum Computing", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "60+" },
    { icon: Building2, name: "Real Estate Tech", color: "bg-amber-500/20 text-amber-400 border-amber-500/30", glowColor: "group-hover:shadow-amber-500/25", startups: "140+" },
    { icon: Cog, name: "Robotics", color: "bg-gray-500/20 text-gray-400 border-gray-500/30", glowColor: "group-hover:shadow-gray-500/25", startups: "180+" },
    { icon: Cloud, name: "SaaS (Software as a Service)", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", glowColor: "group-hover:shadow-sky-500/25", startups: "500+" },
    { icon: Lock, name: "Security", color: "bg-red-500/20 text-red-400 border-red-500/30", glowColor: "group-hover:shadow-red-500/25", startups: "260+" },
    { icon: Building2, name: "Smart Cities", color: "bg-teal-500/20 text-teal-400 border-teal-500/30", glowColor: "group-hover:shadow-teal-500/25", startups: "120+" },
    { icon: Users2, name: "Social Impact", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "100+" },
    { icon: Satellite, name: "SpaceTech", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "80+" },
    { icon: Trophy, name: "SportTech", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "150+" },
    { icon: Recycle, name: "Sustainable", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glowColor: "group-hover:shadow-emerald-500/25", startups: "180+" },
    { icon: Plane, name: "TravelTech", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", glowColor: "group-hover:shadow-sky-500/25", startups: "200+" },
    { icon: Train, name: "Transport & Logistics Tech", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "160+" },
    { icon: Building, name: "UrbanTech", color: "bg-slate-500/20 text-slate-400 border-slate-500/30", glowColor: "group-hover:shadow-slate-500/25", startups: "110+" },
    { icon: Zap, name: "Utilities Management", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30", glowColor: "group-hover:shadow-yellow-500/25", startups: "90+" },
    { icon: Underline, name: "Underwriting & Venture Capital & Investors", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "300+" },
    { icon: Eye, name: "Virtual Reality (VR)", color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30", glowColor: "group-hover:shadow-indigo-500/25", startups: "140+" },
    { icon: Mic, name: "VoiceTech", color: "bg-pink-500/20 text-pink-400 border-pink-500/30", glowColor: "group-hover:shadow-pink-500/25", startups: "120+" },
    { icon: Network, name: "Web3", color: "bg-orange-500/20 text-orange-400 border-orange-500/30", glowColor: "group-hover:shadow-orange-500/25", startups: "200+" },
    { icon: Watch, name: "Wearables", color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30", glowColor: "group-hover:shadow-cyan-500/25", startups: "160+" },
    { icon: Trash2, name: "Waste Management", color: "bg-green-500/20 text-green-400 border-green-500/30", glowColor: "group-hover:shadow-green-500/25", startups: "80+" },
    { icon: Droplets, name: "WaterTech", color: "bg-blue-500/20 text-blue-400 border-blue-500/30", glowColor: "group-hover:shadow-blue-500/25", startups: "90+" },
    { icon: Eye, name: "XR (Extended Reality)", color: "bg-purple-500/20 text-purple-400 border-purple-500/30", glowColor: "group-hover:shadow-purple-500/25", startups: "130+" },
    { icon: Package, name: "XaaS (Everything as a Service)", color: "bg-sky-500/20 text-sky-400 border-sky-500/30", glowColor: "group-hover:shadow-sky-500/25", startups: "180+" },
    { icon: Wind, name: "Zero-Emission Mobility", color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30", glowColor: "group-hover:shadow-emerald-500/25", startups: "100+" },
    { icon: Package, name: "Zoonotic Disease Tech / Animal Health", color: "bg-rose-500/20 text-rose-400 border-rose-500/30", glowColor: "group-hover:shadow-rose-500/25", startups: "70+" },
  ]

  // Show only top 8 industries by default
  const displayedIndustries = showAllIndustries ? industries : industries.slice(0, 8)

  return (
    <section 
      id="explore" 
      className="relative mt-12 py-20 px-4 sm:px-6 lg:px-8 rounded-xl bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/4 left-1/4 w-60 h-60 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 h-60 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-3000"></div>
        <div className="absolute top-3/4 left-3/4 w-40 h-40 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-4000"></div>
      </div>
      
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)]"></div>

      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge 
            variant="secondary" 
            className="mb-4 text-sm bg-white/10 text-white border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 animate-in fade-in-0 slide-in-from-top-4 duration-700"
          >
            Explore Opportunities
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6 animate-in fade-in-0 slide-in-from-top-6 duration-700 delay-100">
            Explore from amongst{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              1000s of Startups
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-4xl mx-auto mb-8 animate-in fade-in-0 slide-in-from-top-8 duration-700 delay-200">
            Discover collaboration opportunities, expand your market reach, gain valuable knowledge, build credibility,
            and drive innovation across diverse industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {displayedIndustries.map((industry, index) => {
            const IconComponent = industry.icon
            return (
              <Card
                key={index}
                className={`group hover:shadow-2xl transition-all duration-500 cursor-pointer border-0 shadow-lg bg-gray-800/50 backdrop-blur-sm border-gray-700/50 hover:bg-gray-800/80 hover:border-gray-600/50 hover:-translate-y-2 ${industry.glowColor} animate-in fade-in-0 slide-in-from-bottom-8 duration-700`}
                style={{ animationDelay: `${300 + index * 50}ms` }}
              >
                <CardContent className="p-4 text-center">
                  <div
                    className={`inline-flex p-3 rounded-full border backdrop-blur-sm mb-3 ${industry.color} group-hover:scale-110 transition-all duration-300`}
                  >
                    <IconComponent className="h-6 w-6" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-2 group-hover:text-gray-100 transition-colors duration-300 line-clamp-2">
                    {industry.name}
                  </h3>
                  <p className="text-xs text-gray-400 mb-3 group-hover:text-gray-300 transition-colors duration-300">
                    {industry.startups} startups
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      if (!user) {
                        setIsSignupModalOpen(true)
                      } else {
                        // Handle navigation for authenticated users
                        console.log('Navigate to industry:', industry.name)
                      }
                    }}
                    className="bg-gray-700/50 text-gray-300 border-gray-600/50 hover:bg-gray-600/50 hover:text-white hover:border-gray-500/50 backdrop-blur-sm group-hover:scale-105 transition-all duration-300 text-xs px-3 py-1"
                  >
                    Explore
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="text-center animate-in fade-in-0 slide-in-from-bottom-8 duration-700 delay-500">
          <Button
            size="lg"
            onClick={() => setShowAllIndustries(!showAllIndustries)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            {showAllIndustries ? "Show Less" : `View All Industries (${industries.length})`}
          </Button>
        </div>
      </div>

      {/* Signup Modal */}
      <Dialog open={isSignupModalOpen} onOpenChange={setIsSignupModalOpen}>
        <DialogContent className="sm:max-w-lg border-0 shadow-2xl max-h-[90vh] overflow-y-auto bg-gray-900">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Join OrionEduverse
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Create your account to explore industry opportunities and connect with startups
            </DialogDescription>
          </DialogHeader>
          <SignupForm onClose={() => setIsSignupModalOpen(false)} />
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default ExploreSection