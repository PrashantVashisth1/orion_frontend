
// import { useNavigate } from "react-router-dom";
// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
// import {
//   TrendingUp,
//   Users,
//   ArrowRight,
//   Rocket,
//   Leaf,
//   HeartPulse,
//   Banknote,
//   GraduationCap,
//   ShieldCheck,
//   MapPin,
//   Calendar,
//   Globe,
//   Mail,
//   Phone,
//   Building,
//   Award,
//   Target,
  
// } from "lucide-react"
// import Navigation from "@/components/postlogincomponents/Navbarpostlogin"
// import Footer from "@/components/postlogincomponents/footer"
// import { useState } from "react"

// const startups = [
//   {
//     id: 21,
//     name: "Ekosight",
//     icon: Rocket,
//     status: "Growth Stage",
//     statusColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
//     description:
//       "Revolutionary AI platform transforming business operations with intelligent automation and predictive analytics.",
//     funding: "$2.1B",
//     team: "500+",
//     growth: "300%",
//     isGrowing: true,
//     isHiring: true,
//     founded: "2021",
//     location: "New Delhi, India",
//     website: "ekosight.com",
//     email: "ekosight@gmail.com",
//     phone: "+1 (555) 123-4567",
//     industry: "Environmental Services",
//     mission: "With a strong focus on precision, accuracy, and user-friendly design🎯, we strive to empower farmers, researchers, and agriculture enthusiasts to make informed decisions, improve yield, and promote responsible farming practices. 🌻",
//     achievements: ["Forbes 30 Under 30", "Best Soil Doctor", "TechCrunch Disruptor Award"],
//     keyMetrics: {
//       revenue: "$450M ARR",
//       customers: "10,000+",
//       retention: "98%",
//       valuation: "$2.1B",
//     },
//   },
//   {
//     id: 1,
//     name: "Gurugram Finance Company",
//     icon: Leaf,
//     status: "Rising Star",
//     statusColor: "bg-green-500/20 text-green-300 border-green-500/30",
//     description:
//       "Forward-thinking clean energy startup developing cutting-edge technologies to promote sustainable living.",
//     funding: "$150M",
//     team: "200+",
//     growth: "250%",
//     isGrowing: true,
//     isHiring: false,
//     founded: "2020",
//     location: "Gurugram, India",
//     website: "gurugram-finance.com",
//     email: "info@gurugram-finance.com",
//     phone: "+1 (555) 234-5678",
//     industry: "Clean Energy",
//     mission:
//       "To accelerate the world's transition to sustainable energy through innovative clean technology solutions.",
//     achievements: ["Clean Tech Innovation Award", "Sustainability Leader 2023", "Green Business Certification"],
//     keyMetrics: {
//       revenue: "$85M ARR",
//       customers: "5,000+",
//       retention: "95%",
//       valuation: "$150M",
//     },
//   },
//   {
//     id: 3,
//     name: "HealthSync",
//     icon: HeartPulse,
//     status: "Unicorn",
//     statusColor: "bg-purple-500/20 text-purple-300 border-purple-500/30",
//     description:
//       "Digital health platform connecting patients with personalized care solutions through AI-driven diagnostics.",
//     funding: "$1.8B",
//     team: "400+",
//     growth: "180%",
//     isGrowing: true,
//     isHiring: true,
//     founded: "2018",
//     location: "Boston, MA",
//     website: "healthsync.com",
//     email: "support@healthsync.com",
//     phone: "+1 (555) 345-6789",
//     industry: "Digital Health",
//     mission: "To revolutionize healthcare delivery through personalized, AI-powered medical solutions.",
//     achievements: ["Healthcare Innovation Award", "FDA Breakthrough Device", "Digital Health Leader 2023"],
//     keyMetrics: {
//       revenue: "$320M ARR",
//       customers: "2M+",
//       retention: "92%",
//       valuation: "$1.8B",
//     },
//   },
//   {
//     id: 4,
//     name: "FinanceFlow",
//     icon: Banknote,
//     status: "Growth Stage",
//     statusColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
//     description:
//       "Next-generation fintech platform revolutionizing digital payments and financial services for businesses.",
//     funding: "$320M",
//     team: "150+",
//     growth: "220%",
//     isGrowing: true,
//     isHiring: false,
//     founded: "2021",
//     location: "New York, NY",
//     website: "financeflow.com",
//     email: "hello@financeflow.com",
//     phone: "+1 (555) 456-7890",
//     industry: "Financial Technology",
//     mission: "To simplify financial operations for businesses through innovative payment and banking solutions.",
//     achievements: ["Fintech Startup of the Year", "Payment Innovation Award", "Best B2B Platform 2023"],
//     keyMetrics: {
//       revenue: "$120M ARR",
//       customers: "25,000+",
//       retention: "94%",
//       valuation: "$320M",
//     },
//   },
//   {
//     id: 5,
//     name: "EduTech Plus",
//     icon: GraduationCap,
//     status: "Rising Star",
//     statusColor: "bg-green-500/20 text-green-300 border-green-500/30",
//     description:
//       "Innovative educational technology platform enhancing learning experiences through interactive content and AI tutoring.",
//     funding: "$85M",
//     team: "120+",
//     growth: "190%",
//     isGrowing: false,
//     isHiring: true,
//     founded: "2022",
//     location: "Seattle, WA",
//     website: "edutech-plus.com",
//     email: "learn@edutech-plus.com",
//     phone: "+1 (555) 567-8901",
//     industry: "Education Technology",
//     mission: "To transform education through personalized learning experiences powered by artificial intelligence.",
//     achievements: ["EdTech Innovation Award", "Best Learning Platform 2023", "Education Excellence Award"],
//     keyMetrics: {
//       revenue: "$35M ARR",
//       customers: "500K+",
//       retention: "89%",
//       valuation: "$85M",
//     },
//   },
//   {
//     id: 6,
//     name: "CloudSecure",
//     icon: ShieldCheck,
//     status: "Growth Stage",
//     statusColor: "bg-blue-500/20 text-blue-300 border-blue-500/30",
//     description:
//       "Advanced cybersecurity solutions protecting enterprises with cutting-edge threat detection and prevention systems.",
//     funding: "$240M",
//     team: "180+",
//     growth: "160%",
//     isGrowing: false,
//     isHiring: false,
//     founded: "2020",
//     location: "Denver, CO",
//     website: "cloudsecure.com",
//     email: "security@cloudsecure.com",
//     phone: "+1 (555) 678-9012",
//     industry: "Cybersecurity",
//     mission: "To protect businesses from cyber threats through advanced AI-powered security solutions.",
//     achievements: ["Cybersecurity Excellence Award", "Best Security Platform 2023", "Enterprise Security Leader"],
//     keyMetrics: {
//       revenue: "$95M ARR",
//       customers: "8,000+",
//       retention: "96%",
//       valuation: "$240M",
//     },
//   },
//   {
//     id: 7,
//     name: "AgroSmart Tech",
//     icon: Leaf,
//     status: "Early Stage",
//     statusColor: "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
//     description:
//       "AI-driven precision agriculture startup optimizing crop yields and resource usage for farmers worldwide.",
//     funding: "$40M",
//     team: "75+",
//     growth: "140%",
//     isGrowing: true,
//     isHiring: true,
//     founded: "2021",
//     location: "Iowa City, IA",
//     website: "agrosmarttech.com",
//     email: "support@agrosmarttech.com",
//     phone: "+1 (555) 789-0123",
//     industry: "AgriTech",
//     mission: "To revolutionize farming through real-time data, smart sensors, and AI-based recommendations.",
//     achievements: ["Top AgriTech 2024", "Smart Farming Innovation Award"],
//     keyMetrics: {
//       revenue: "$12M ARR",
//       customers: "2,000+ farms",
//       retention: "91%",
//       valuation: "$40M",
//     },
//   },
//   {
//     id: 8,
//     name: "WellNest",
//     icon: HeartPulse,
//     status: "Seed Funded",
//     statusColor: "bg-pink-500/20 text-pink-300 border-pink-500/30",
//     description:
//       "Mental wellness app offering personalized therapy, meditation, and health tracking through AI.",
//     funding: "$10M",
//     team: "35+",
//     growth: "350%",
//     isGrowing: true,
//     isHiring: false,
//     founded: "2023",
//     location: "Remote",
//     website: "wellnest.app",
//     email: "hello@wellnest.app",
//     phone: "+1 (555) 890-1234",
//     industry: "Digital Wellness",
//     mission: "To make mental healthcare accessible and stigma-free for everyone, anywhere.",
//     achievements: ["Best Health App 2024", "Fastest Growing Wellness Startup"],
//     keyMetrics: {
//       revenue: "$3M ARR",
//       customers: "300K+",
//       retention: "88%",
//       valuation: "$10M",
//     },
//   },
// ]

// export default function StartupListing() {
//   const navigate = useNavigate();
//   const [selectedStartup, setSelectedStartup] = useState<(typeof startups)[0] | null>(null)
//   const [isModalOpen, setIsModalOpen] = useState(false)

//   const handleExploreClick = (startup: (typeof startups)[0]) => {
//     console.log("Explore clicked for:", startup.name) // Debug log
//     setSelectedStartup(startup)
//     setIsModalOpen(true)
//   }

//   // const closeModal = () => {
//   //   setIsModalOpen(false)
//   //   setSelectedStartup(null)
//   // }

//   return (
//     <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
//       <Navigation />

//       <div className="container mx-auto px-4 py-20">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
//             Discover Amazing{" "}
//             <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
//               Startups
//             </span>
//           </h1>
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto">
//             Explore innovative companies that are transforming industries and shaping the future with cutting-edge
//             technology and visionary leadership.
//           </p>
//         </div>

//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//           {startups.map((startup) => (
//             <Card
//               key={startup.id}
//               className="bg-slate-800/80 hover:bg-slate-800/90 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-1"
//             >
//               <CardContent className="p-6">
//                 {/* Header */}
//                 <div className="flex items-start justify-between mb-4">
//                   <div className="flex items-center space-x-3">
//                     <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
//                       <startup.icon className="w-6 h-6 text-purple-400" />
//                     </div>
//                     <div>
//                       <h3 className="font-semibold text-lg text-white">{startup.name}</h3>
//                       <Badge className={`${startup.statusColor} text-xs font-medium`}>{startup.status}</Badge>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Description */}
//                 <p className="text-gray-300 text-sm mb-6 leading-relaxed">{startup.description}</p>

//                 {/* Stats */}
//                 <div className="grid grid-cols-3 gap-4 mb-6">
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-purple-400">{startup.funding}</div>
//                     <div className="text-xs text-gray-400">Funding</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-blue-400">{startup.team}</div>
//                     <div className="text-xs text-gray-400">Team</div>
//                   </div>
//                   <div className="text-center">
//                     <div className="text-lg font-bold text-cyan-400">{startup.growth}</div>
//                     <div className="text-xs text-gray-400">Growth</div>
//                   </div>
//                 </div>

//                 {/* Tags & Button */}
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     {startup.isGrowing && (
//                       <div className="flex items-center space-x-1 text-gray-400">
//                         <TrendingUp className="w-4 h-4" />
//                         <span className="text-xs">Growing</span>
//                       </div>
//                     )}
//                     {startup.isHiring && (
//                       <div className="flex items-center space-x-1 text-green-400">
//                         <Users className="w-4 h-4" />
//                         <span className="text-xs">Hiring</span>
//                       </div>
//                     )}
//                   </div>
//                   <div className="flex items-center space-x-2">
//                     <Button
//                       variant="ghost"
//                       size="sm"
//                       onClick={() => handleExploreClick(startup)}
//                       className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 px-2 py-1 h-auto font-medium"
//                     >
//                       SnapShot
//                       <ArrowRight className="w-4 h-4 ml-1" />
//                     </Button>
//                     <Button
//                       variant="outline"
//                       size="sm"
//                       onClick={() => {
//                         handleExploreClick(startup);
//                         navigate(`/profile/${startup.id}`);
//                         // Navigate to startup details or join section
//                         // You can replace this with actual navigation logic
//                       }}
//                       className="text-blue-400 border-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-2 py-1 h-auto font-medium"
//                     >
//                       Explore
//                     </Button>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           ))}
//         </div>

//         {/* Load More */}
//         <div className="text-center pb-12">
//           <Button className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium">
//             Load More Startups
//           </Button>
//         </div>
//       </div>

//       {/* Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
//           {selectedStartup && (
//             <>
//               <DialogHeader className="border-b border-slate-700 pb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center">
//                       <selectedStartup.icon className="w-8 h-8 text-purple-400" />
//                     </div>
//                     <div>
//                       <DialogTitle className="text-2xl font-bold text-white">{selectedStartup.name}</DialogTitle>
//                       <Badge className={`${selectedStartup.statusColor} text-sm font-medium mt-2`}>
//                         {selectedStartup.status}
//                       </Badge>
//                     </div>
//                   </div>
               
//                 </div>
//               </DialogHeader>

//               <div className="py-6 space-y-8">
//                 {/* Mission */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
//                     <Target className="w-5 h-5 mr-2" />
//                     Mission
//                   </h3>
//                   <p className="text-gray-300 leading-relaxed">{selectedStartup.mission}</p>
//                 </div>

//                 {/* Key Metrics */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
//                     <TrendingUp className="w-5 h-5 mr-2" />
//                     Key Metrics
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-purple-400">{selectedStartup.keyMetrics.revenue}</div>
//                       <div className="text-sm text-gray-400">Annual Revenue</div>
//                     </div>
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-blue-400">{selectedStartup.keyMetrics.customers}</div>
//                       <div className="text-sm text-gray-400">Customers</div>
//                     </div>
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-cyan-400">{selectedStartup.keyMetrics.retention}</div>
//                       <div className="text-sm text-gray-400">Retention Rate</div>
//                     </div>
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-green-400">{selectedStartup.keyMetrics.valuation}</div>
//                       <div className="text-sm text-gray-400">Valuation</div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Company Info */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
//                     <Building className="w-5 h-5 mr-2" />
//                     Company Information
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <Calendar className="w-5 h-5 text-purple-400" />
//                         <span>Founded: {selectedStartup.founded}</span>
//                       </div>
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <MapPin className="w-5 h-5 text-blue-400" />
//                         <span>Location: {selectedStartup.location}</span>
//                       </div>
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <Building className="w-5 h-5 text-cyan-400" />
//                         <span>Industry: {selectedStartup.industry}</span>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <Globe className="w-5 h-5 text-green-400" />
//                         <span>{selectedStartup.website}</span>
//                       </div>
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <Mail className="w-5 h-5 text-purple-400" />
//                         <span>{selectedStartup.email}</span>
//                       </div>
//                       <div className="flex items-center space-x-3 text-gray-300">
//                         <Phone className="w-5 h-5 text-blue-400" />
//                         <span>{selectedStartup.phone}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Achievements */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
//                     <Award className="w-5 h-5 mr-2" />
//                     Achievements & Awards
//                   </h3>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                     {selectedStartup.achievements.map((achievement, index) => (
//                       <div
//                         key={index}
//                         className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-3 rounded-lg text-center"
//                       >
//                         <span className="text-sm text-gray-300">{achievement}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
//                   <Button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
//                     <Globe className="w-4 h-4 mr-2" />
//                     Visit Website
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white bg-transparent"
//                   >
//                     <Mail className="w-4 h-4 mr-2" />
//                     Contact Team
//                   </Button>
//                   {selectedStartup.isHiring && (
//                     <Button
//                       variant="outline"
//                       className="flex-1 border-green-600 text-green-400 hover:bg-green-600/10 hover:text-green-300 bg-transparent"
//                     >
//                       <Users className="w-4 h-4 mr-2" />
//                       View Jobs
//                     </Button>
//                   )}
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       <Footer />
//     </div>
//   )
// }


// src/pages/explore/index.tsx
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  Users,
  ArrowRight,
  Rocket,
  MapPin,
  Calendar,
  Globe,
  Mail,
  Phone,
  Building,
  Award,
  Target,
  Search,
  Loader2
} from "lucide-react";
import Navigation from "@/components/postlogincomponents/Navbarpostlogin";
import Footer from "@/components/postlogincomponents/footer";
import { useState } from "react";
import { useExploreStartups, type ExploreStartup } from "@/hooks/useExplore";
import { toast } from "react-hot-toast";

export default function StartupListing() {
  const navigate = useNavigate();
  const [selectedStartup, setSelectedStartup] = useState<ExploreStartup | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    page: 1,
    limit: 20,
    search: "",
    industry: "",
    location: ""
  });

  // Fetch startups from backend
  const { data, isLoading, error, refetch } = useExploreStartups(filters);

  const handleExploreClick = (startup: ExploreStartup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleSearch = () => {
    setFilters(prev => ({
      ...prev,
      search: searchTerm,
      page: 1 // Reset to first page on new search
    }));
  };

  const handleLoadMore = () => {
    if (data?.pagination.hasNext) {
      setFilters(prev => ({
        ...prev,
        page: prev.page + 1
      }));
    }
  };

  const handleVisitWebsite = (website: string) => {
    if (website) {
      window.open(website.startsWith('http') ? website : `https://${website}`, '_blank');
    } else {
      toast.error('Website not available');
    }
  };

  const handleContactTeam = (email: string) => {
    if (email) {
      window.location.href = `mailto:${email}`;
    } else {
      toast.error('Contact email not available');
    }
  };

  // Get icon based on industry
  const getIndustryIcon = (industry: string) => {
    // You can expand this mapping based on your needs
    let x = industry.toLowerCase();
    if(x.length === 0) return Rocket;
    return Rocket;
  };

  if (error) {
    return (
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white mb-4">Failed to load startups</h2>
            <p className="text-gray-400 mb-6">{error.message}</p>
            <Button onClick={() => refetch()} className="bg-purple-600 hover:bg-purple-700">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 text-transparent bg-clip-text">
              Startups
            </span>
          </h1>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
            Explore innovative companies that are transforming industries and shaping the future with cutting-edge
            technology and visionary leadership.
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search startups by name, industry, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-purple-600 hover:bg-purple-700 text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Results count */}
          {data && (
            <p className="text-gray-400 text-sm">
              Showing {data.startups.length} of {data.pagination.total} startups
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
          </div>
        )}

        {/* Startups Grid */}
        {!isLoading && data && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {data.startups.map((startup) => {
                const IconComponent = getIndustryIcon(startup.industry);
                
                return (
                  <Card
                    key={startup.id}
                    className="bg-slate-800/80 hover:bg-slate-800/90 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
                            {startup.logo ? (
                              <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                            ) : (
                              <IconComponent className="w-6 h-6 text-purple-400" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-white">{startup.name}</h3>
                            <Badge className={`${startup.statusColor} text-xs font-medium`}>
                              {startup.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
                        {startup.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-400">{startup.funding}</div>
                          <div className="text-xs text-gray-400">Funding</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-400">{startup.team}</div>
                          <div className="text-xs text-gray-400">Team</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-400">{startup.growth}</div>
                          <div className="text-xs text-gray-400">Growth</div>
                        </div>
                      </div>

                      {/* Tags & Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {startup.isGrowing && (
                            <div className="flex items-center space-x-1 text-gray-400">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs">Growing</span>
                            </div>
                          )}
                          {startup.isHiring && (
                            <div className="flex items-center space-x-1 text-green-400">
                              <Users className="w-4 h-4" />
                              <span className="text-xs">Hiring</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleExploreClick(startup)}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 px-2 py-1 h-auto font-medium"
                          >
                            SnapShot
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/profile/${startup.id}`)}
                            className="text-blue-400 border-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-2 py-1 h-auto font-medium"
                          >
                            Explore
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Load More */}
            {data.pagination.hasNext && (
              <div className="text-center pb-12">
                <Button
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    'Load More Startups'
                  )}
                </Button>
              </div>
            )}

            {/* No results */}
            {data.startups.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">No startups found matching your criteria</p>
                <Button
                  onClick={() => setFilters({ page: 1, limit: 20, search: "", industry: "", location: "" })}
                  className="mt-4 bg-purple-600 hover:bg-purple-700"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
          {selectedStartup && (
            <>
              <DialogHeader className="border-b border-slate-700 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center overflow-hidden">
                      {selectedStartup.logo ? (
                        <img src={selectedStartup.logo} alt={selectedStartup.name} className="w-full h-full object-cover" />
                      ) : (
                        <Rocket className="w-8 h-8 text-purple-400" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-white">{selectedStartup.name}</DialogTitle>
                      <Badge className={`${selectedStartup.statusColor} text-sm font-medium mt-2`}>
                        {selectedStartup.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </DialogHeader>

              <div className="py-6 space-y-8">
                {/* Mission */}
                {selectedStartup.mission && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Mission
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedStartup.mission}</p>
                  </div>
                )}

                {/* Vision */}
                {selectedStartup.vision && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Vision
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{selectedStartup.vision}</p>
                  </div>
                )}

                {/* Key Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-purple-400">{selectedStartup.keyMetrics.revenue}</div>
                      <div className="text-sm text-gray-400">Revenue</div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-blue-400">{selectedStartup.keyMetrics.customers}</div>
                      <div className="text-sm text-gray-400">Customers</div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-cyan-400">{selectedStartup.keyMetrics.retention}</div>
                      <div className="text-sm text-gray-400">Retention</div>
                    </div>
                    <div className="bg-slate-700/30 p-4 rounded-lg text-center">
                      <div className="text-xl font-bold text-green-400">{selectedStartup.keyMetrics.valuation}</div>
                      <div className="text-sm text-gray-400">Valuation</div>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-400 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <span>Founded: {selectedStartup.founded}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <MapPin className="w-5 h-5 text-blue-400" />
                        <span>Location: {selectedStartup.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-gray-300">
                        <Building className="w-5 h-5 text-cyan-400" />
                        <span>Industry: {selectedStartup.industry}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedStartup.website && (
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Globe className="w-5 h-5 text-green-400" />
                          <span className="truncate">{selectedStartup.website}</span>
                        </div>
                      )}
                      {selectedStartup.email && (
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Mail className="w-5 h-5 text-purple-400" />
                          <span className="truncate">{selectedStartup.email}</span>
                        </div>
                      )}
                      {selectedStartup.phone && (
                        <div className="flex items-center space-x-3 text-gray-300">
                          <Phone className="w-5 h-5 text-blue-400" />
                          <span>{selectedStartup.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {selectedStartup.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Achievements & Awards
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedStartup.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-3 rounded-lg text-center"
                        >
                          <span className="text-sm text-gray-300">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products & Services */}
                {(selectedStartup.products.length > 0 || selectedStartup.services.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400 mb-4">Products & Services</h3>
                    <div className="space-y-4">
                      {selectedStartup.products.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Products</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStartup.products.map((product, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedStartup.services.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-gray-400 mb-2">Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStartup.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
                  {selectedStartup.website && (
                    <Button 
                      onClick={() => handleVisitWebsite(selectedStartup.website)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  )}
                  {selectedStartup.email && (
                    <Button
                      onClick={() => handleContactTeam(selectedStartup.email)}
                      variant="outline"
                      className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white bg-transparent"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Contact Team
                    </Button>
                  )}
                  <Button
                    onClick={() => {
                      setIsModalOpen(false);
                      navigate(`/profile/${selectedStartup.id}`);
                    }}
                    variant="outline"
                    className="flex-1 border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:text-blue-300 bg-transparent"
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Full Profile
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}