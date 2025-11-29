// // src/pages/explore/index.tsx
// import { useNavigate } from "react-router-dom";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import {
//   TrendingUp,
//   Users,
//   ArrowRight,
//   Rocket,
//   MapPin,
//   Calendar,
//   Globe,
//   Mail,
//   Phone,
//   Building,
//   Award,
//   Target,
//   Search,
//   Loader2
// } from "lucide-react";
// import Navigation from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// import { useState } from "react";
// import { useExploreStartups, type ExploreStartup } from "@/hooks/useExplore";
// import { toast } from "react-hot-toast";

// export default function StartupListing() {
//   const navigate = useNavigate();
//   const [selectedStartup, setSelectedStartup] = useState<ExploreStartup | null>(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filters, setFilters] = useState({
//     page: 1,
//     limit: 20,
//     search: "",
//     industry: "",
//     location: ""
//   });

//   // Fetch startups from backend
//   const { data, isLoading, error, refetch } = useExploreStartups(filters);

//   const handleExploreClick = (startup: ExploreStartup) => {
//     setSelectedStartup(startup);
//     setIsModalOpen(true);
//   };

//   const handleSearch = () => {
//     setFilters(prev => ({
//       ...prev,
//       search: searchTerm,
//       page: 1 // Reset to first page on new search
//     }));
//   };

//   const handleLoadMore = () => {
//     if (data?.pagination.hasNext) {
//       setFilters(prev => ({
//         ...prev,
//         page: prev.page + 1
//       }));
//     }
//   };

//   const handleVisitWebsite = (website: string) => {
//     if (website) {
//       window.open(website.startsWith('http') ? website : `https://${website}`, '_blank');
//     } else {
//       toast.error('Website not available');
//     }
//   };

//   const handleContactTeam = (email: string) => {
//     if (email) {
//       window.location.href = `mailto:${email}`;
//     } else {
//       toast.error('Contact email not available');
//     }
//   };

//   // Get icon based on industry
//   const getIndustryIcon = (industry: string) => {
//     // You can expand this mapping based on your needs
//     let x = industry.toLowerCase();
//     if(x.length === 0) return Rocket;
//     return Rocket;
//   };

//   if (error) {
//     return (
//       <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 min-h-screen">
//         <Navigation />
//         <div className="container mx-auto px-4 py-20">
//           <div className="text-center">
//             <h2 className="text-2xl font-bold text-white mb-4">Failed to load startups</h2>
//             <p className="text-gray-400 mb-6">{error.message}</p>
//             <Button onClick={() => refetch()} className="bg-purple-600 hover:bg-purple-700">
//               Try Again
//             </Button>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

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
//           <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-8">
//             Explore innovative companies that are transforming industries and shaping the future with cutting-edge
//             technology and visionary leadership.
//           </p>

//           {/* Search and Filter Bar */}
//           <div className="max-w-2xl mx-auto flex gap-4 mb-8">
//             <div className="flex-1 relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//               <Input
//                 type="text"
//                 placeholder="Search startups by name, industry, or description..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                 className="pl-10 bg-slate-800/50 border-slate-700 text-white placeholder:text-gray-400 focus:border-purple-500"
//               />
//             </div>
//             <Button
//               onClick={handleSearch}
//               className="bg-purple-600 hover:bg-purple-700 text-white"
//             >
//               <Search className="w-4 h-4 mr-2" />
//               Search
//             </Button>
//           </div>

//           {/* Results count */}
//           {data && (
//             <p className="text-gray-400 text-sm">
//               Showing {data.startups.length} of {data.pagination.total} startups
//             </p>
//           )}
//         </div>

//         {/* Loading State */}
//         {isLoading && (
//           <div className="flex justify-center items-center py-20">
//             <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
//           </div>
//         )}

//         {/* Startups Grid */}
//         {!isLoading && data && (
//           <>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//               {data.startups.map((startup) => {
//                 const IconComponent = getIndustryIcon(startup.industry);
                
//                 return (
//                   <Card
//                     key={startup.id}
//                     className="bg-slate-800/80 hover:bg-slate-800/90 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-1"
//                   >
//                     <CardContent className="p-6">
//                       {/* Header */}
//                       <div className="flex items-start justify-between mb-4">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center overflow-hidden">
//                             {startup.logo ? (
//                               <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
//                             ) : (
//                               <IconComponent className="w-6 h-6 text-purple-400" />
//                             )}
//                           </div>
//                           <div>
//                             <h3 className="font-semibold text-lg text-white">{startup.name}</h3>
//                             <Badge className={`${startup.statusColor} text-xs font-medium`}>
//                               {startup.status}
//                             </Badge>
//                           </div>
//                         </div>
//                       </div>

//                       {/* Description */}
//                       <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">
//                         {startup.description}
//                       </p>

//                       {/* Stats */}
//                       <div className="grid grid-cols-3 gap-4 mb-6">
//                         <div className="text-center">
//                           <div className="text-lg font-bold text-purple-400">{startup.funding}</div>
//                           <div className="text-xs text-gray-400">Funding</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-lg font-bold text-blue-400">{startup.team}</div>
//                           <div className="text-xs text-gray-400">Team</div>
//                         </div>
//                         <div className="text-center">
//                           <div className="text-lg font-bold text-cyan-400">{startup.growth}</div>
//                           <div className="text-xs text-gray-400">Growth</div>
//                         </div>
//                       </div>

//                       {/* Tags & Button */}
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center space-x-4">
//                           {startup.isGrowing && (
//                             <div className="flex items-center space-x-1 text-gray-400">
//                               <TrendingUp className="w-4 h-4" />
//                               <span className="text-xs">Growing</span>
//                             </div>
//                           )}
//                           {startup.isHiring && (
//                             <div className="flex items-center space-x-1 text-green-400">
//                               <Users className="w-4 h-4" />
//                               <span className="text-xs">Hiring</span>
//                             </div>
//                           )}
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={() => handleExploreClick(startup)}
//                             className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 px-2 py-1 h-auto font-medium"
//                           >
//                             SnapShot
//                             <ArrowRight className="w-4 h-4 ml-1" />
//                           </Button>
//                           <Button
//                             variant="outline"
//                             size="sm"
//                             onClick={() => navigate(`/profile/${startup.id}`)}
//                             className="text-blue-400 border-blue-400 hover:text-blue-300 hover:bg-blue-500/10 px-2 py-1 h-auto font-medium"
//                           >
//                             Explore
//                           </Button>
//                         </div>
//                       </div>
//                     </CardContent>
//                   </Card>
//                 );
//               })}
//             </div>

//             {/* Load More */}
//             {data.pagination.hasNext && (
//               <div className="text-center pb-12">
//                 <Button
//                   onClick={handleLoadMore}
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                       Loading...
//                     </>
//                   ) : (
//                     'Load More Startups'
//                   )}
//                 </Button>
//               </div>
//             )}

//             {/* No results */}
//             {data.startups.length === 0 && (
//               <div className="text-center py-20">
//                 <p className="text-gray-400 text-lg">No startups found matching your criteria</p>
//                 <Button
//                   onClick={() => setFilters({ page: 1, limit: 20, search: "", industry: "", location: "" })}
//                   className="mt-4 bg-purple-600 hover:bg-purple-700"
//                 >
//                   Clear Filters
//                 </Button>
//               </div>
//             )}
//           </>
//         )}
//       </div>

//       {/* Modal */}
//       <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
//         <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-800 border-slate-700 text-white">
//           {selectedStartup && (
//             <>
//               <DialogHeader className="border-b border-slate-700 pb-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <div className="w-16 h-16 rounded-xl bg-slate-700/50 flex items-center justify-center overflow-hidden">
//                       {selectedStartup.logo ? (
//                         <img src={selectedStartup.logo} alt={selectedStartup.name} className="w-full h-full object-cover" />
//                       ) : (
//                         <Rocket className="w-8 h-8 text-purple-400" />
//                       )}
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
//                 {selectedStartup.mission && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-purple-400 mb-3 flex items-center">
//                       <Target className="w-5 h-5 mr-2" />
//                       Mission
//                     </h3>
//                     <p className="text-gray-300 leading-relaxed">{selectedStartup.mission}</p>
//                   </div>
//                 )}

//                 {/* Vision */}
//                 {selectedStartup.vision && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-blue-400 mb-3 flex items-center">
//                       <Rocket className="w-5 h-5 mr-2" />
//                       Vision
//                     </h3>
//                     <p className="text-gray-300 leading-relaxed">{selectedStartup.vision}</p>
//                   </div>
//                 )}

//                 {/* Key Metrics */}
//                 <div>
//                   <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center">
//                     <TrendingUp className="w-5 h-5 mr-2" />
//                     Key Metrics
//                   </h3>
//                   <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-purple-400">{selectedStartup.keyMetrics.revenue}</div>
//                       <div className="text-sm text-gray-400">Revenue</div>
//                     </div>
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-blue-400">{selectedStartup.keyMetrics.customers}</div>
//                       <div className="text-sm text-gray-400">Customers</div>
//                     </div>
//                     <div className="bg-slate-700/30 p-4 rounded-lg text-center">
//                       <div className="text-xl font-bold text-cyan-400">{selectedStartup.keyMetrics.retention}</div>
//                       <div className="text-sm text-gray-400">Retention</div>
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
//                       {selectedStartup.website && (
//                         <div className="flex items-center space-x-3 text-gray-300">
//                           <Globe className="w-5 h-5 text-green-400" />
//                           <span className="truncate">{selectedStartup.website}</span>
//                         </div>
//                       )}
//                       {selectedStartup.email && (
//                         <div className="flex items-center space-x-3 text-gray-300">
//                           <Mail className="w-5 h-5 text-purple-400" />
//                           <span className="truncate">{selectedStartup.email}</span>
//                         </div>
//                       )}
//                       {selectedStartup.phone && (
//                         <div className="flex items-center space-x-3 text-gray-300">
//                           <Phone className="w-5 h-5 text-blue-400" />
//                           <span>{selectedStartup.phone}</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Achievements */}
//                 {selectedStartup.achievements.length > 0 && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-green-400 mb-4 flex items-center">
//                       <Award className="w-5 h-5 mr-2" />
//                       Achievements & Awards
//                     </h3>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
//                       {selectedStartup.achievements.map((achievement, index) => (
//                         <div
//                           key={index}
//                           className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 p-3 rounded-lg text-center"
//                         >
//                           <span className="text-sm text-gray-300">{achievement}</span>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Products & Services */}
//                 {(selectedStartup.products.length > 0 || selectedStartup.services.length > 0) && (
//                   <div>
//                     <h3 className="text-lg font-semibold text-purple-400 mb-4">Products & Services</h3>
//                     <div className="space-y-4">
//                       {selectedStartup.products.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-400 mb-2">Products</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {selectedStartup.products.map((product, index) => (
//                               <Badge key={index} variant="outline" className="bg-purple-500/10 border-purple-500/30 text-purple-300">
//                                 {product}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                       {selectedStartup.services.length > 0 && (
//                         <div>
//                           <h4 className="text-sm font-medium text-gray-400 mb-2">Services</h4>
//                           <div className="flex flex-wrap gap-2">
//                             {selectedStartup.services.map((service, index) => (
//                               <Badge key={index} variant="outline" className="bg-blue-500/10 border-blue-500/30 text-blue-300">
//                                 {service}
//                               </Badge>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 )}

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-700">
//                   {selectedStartup.website && (
//                     <Button 
//                       onClick={() => handleVisitWebsite(selectedStartup.website)}
//                       className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white"
//                     >
//                       <Globe className="w-4 h-4 mr-2" />
//                       Visit Website
//                     </Button>
//                   )}
//                   {selectedStartup.email && (
//                     <Button
//                       onClick={() => handleContactTeam(selectedStartup.email)}
//                       variant="outline"
//                       className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 hover:text-white bg-transparent"
//                     >
//                       <Mail className="w-4 h-4 mr-2" />
//                       Contact Team
//                     </Button>
//                   )}
//                   <Button
//                     onClick={() => {
//                       setIsModalOpen(false);
//                       navigate(`/profile/${selectedStartup.id}`);
//                     }}
//                     variant="outline"
//                     className="flex-1 border-blue-600 text-blue-400 hover:bg-blue-600/10 hover:text-blue-300 bg-transparent"
//                   >
//                     <Users className="w-4 h-4 mr-2" />
//                     View Full Profile
//                   </Button>
//                 </div>
//               </div>
//             </>
//           )}
//         </DialogContent>
//       </Dialog>

//       <Footer />
//     </div>
//   );
// }


// light-theme
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

  // const handleContactTeam = (email: string) => {
  //   if (email) {
  //     window.location.href = `mailto:${email}`;
  //   } else {
  //     toast.error('Contact email not available');
  //   }
  // };

  const handleContactTeam = (email: string) => {
  if (!email) {
    toast.error("Contact email not available");
    return;
  }

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;

  window.open(gmailUrl, "_blank", "noopener,noreferrer");
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
      <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
        <Navigation />
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Failed to load startups</h2>
            <p className="text-slate-500 mb-6">{error.message}</p>
            <Button onClick={() => refetch()} className="bg-purple-600 hover:bg-purple-700 text-white">
              Try Again
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-slate-50 via-white to-slate-50 min-h-screen">
      <Navigation />

      <div className="container mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Discover Amazing{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-transparent bg-clip-text">
              Startups
            </span>
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto mb-8">
            Explore innovative companies that are transforming industries and shaping the future with cutting-edge
            technology and visionary leadership.
          </p>

          {/* Search and Filter Bar */}
          <div className="max-w-2xl mx-auto flex gap-4 mb-8">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search startups by name, industry, or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="pl-10 bg-white border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-purple-500 shadow-sm"
              />
            </div>
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
            >
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>
          </div>

          {/* Results count */}
          {data && (
            <p className="text-slate-500 text-sm">
              Showing {data.startups.length} of {data.pagination.total} startups
            </p>
          )}
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
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
                    className="bg-white hover:bg-slate-50 hover:shadow-xl transition-all duration-300 border border-slate-200 shadow-md backdrop-blur-sm transform hover:-translate-y-1"
                  >
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-lg bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                            {startup.logo ? (
                              <img src={startup.logo} alt={startup.name} className="w-full h-full object-cover" />
                            ) : (
                              <IconComponent className="w-6 h-6 text-purple-600" />
                            )}
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg text-slate-900">{startup.name}</h3>
                            <Badge className={`${startup.statusColor} text-xs font-medium`}>
                              {startup.status}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-slate-600 text-sm mb-6 leading-relaxed line-clamp-3">
                        {startup.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="text-center">
                          <div className="text-lg font-bold text-purple-600">{startup.funding}</div>
                          <div className="text-xs text-slate-500">Funding</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-blue-600">{startup.team}</div>
                          <div className="text-xs text-slate-500">Team</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-bold text-cyan-600">{startup.growth}</div>
                          <div className="text-xs text-slate-500">Growth</div>
                        </div>
                      </div>

                      {/* Tags & Button */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          {startup.isGrowing && (
                            <div className="flex items-center space-x-1 text-slate-500">
                              <TrendingUp className="w-4 h-4" />
                              <span className="text-xs">Growing</span>
                            </div>
                          )}
                          {startup.isHiring && (
                            <div className="flex items-center space-x-1 text-green-600">
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
                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 px-2 py-1 h-auto font-medium border border-purple-300 cursor-pointer"
                          >
                            SnapShot
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => navigate(`/profile/${startup.id}`)}
                            className="text-blue-600 border-blue-200 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 h-auto font-medium cursor-pointer"
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
                  className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium shadow-md"
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
                <p className="text-slate-500 text-lg">No startups found matching your criteria</p>
                <Button
                  onClick={() => setFilters({ page: 1, limit: 20, search: "", industry: "", location: "" })}
                  className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
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
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-slate-200 text-slate-900">
          {selectedStartup && (
            <>
              <DialogHeader className="border-b border-slate-100 pb-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-100">
                      {selectedStartup.logo ? (
                        <img src={selectedStartup.logo} alt={selectedStartup.name} className="w-full h-full object-cover" />
                      ) : (
                        <Rocket className="w-8 h-8 text-purple-600" />
                      )}
                    </div>
                    <div>
                      <DialogTitle className="text-2xl font-bold text-slate-900">{selectedStartup.name}</DialogTitle>
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
                    <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Mission
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{selectedStartup.mission}</p>
                  </div>
                )}

                {/* Vision */}
                {selectedStartup.vision && (
                  <div>
                    <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center">
                      <Rocket className="w-5 h-5 mr-2" />
                      Vision
                    </h3>
                    <p className="text-slate-600 leading-relaxed">{selectedStartup.vision}</p>
                  </div>
                )}

                {/* Key Metrics */}
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Key Metrics
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-slate-100 p-4 rounded-lg text-center border border-slate-200">
                      <div className="text-xl font-bold text-purple-600">{selectedStartup.keyMetrics.revenue}</div>
                      <div className="text-sm text-slate-500">Revenue</div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg text-center border border-slate-200">
                      <div className="text-xl font-bold text-blue-600">{selectedStartup.keyMetrics.customers}</div>
                      <div className="text-sm text-slate-500">Customers</div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg text-center border border-slate-200">
                      <div className="text-xl font-bold text-cyan-600">{selectedStartup.keyMetrics.retention}</div>
                      <div className="text-sm text-slate-500">Retention</div>
                    </div>
                    <div className="bg-slate-100 p-4 rounded-lg text-center border border-slate-200">
                      {/* Added break-words and hyphens-auto to fix overflow for long words like 'Bootstrapped' */}
                      <div className="text-xl font-bold text-green-600 truncate max-w-[8rem]">
                        {selectedStartup.keyMetrics.valuation}
                      </div>
                      <div className="text-sm text-slate-500">Valuation</div>
                    </div>
                  </div>
                </div>

                {/* Company Info */}
                <div>
                  <h3 className="text-lg font-semibold text-cyan-600 mb-4 flex items-center">
                    <Building className="w-5 h-5 mr-2" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 text-slate-600">
                        <Calendar className="w-5 h-5 text-purple-600" />
                        <span>Founded: {selectedStartup.founded}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-600">
                        <MapPin className="w-5 h-5 text-blue-600" />
                        <span>Location: {selectedStartup.location}</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-600">
                        <Building className="w-5 h-5 text-cyan-600" />
                        <span>Industry: {selectedStartup.industry}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      {selectedStartup.website && (
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Globe className="w-5 h-5 text-green-600" />
                          <span className="truncate">{selectedStartup.website}</span>
                        </div>
                      )}
                      {selectedStartup.email && (
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Mail className="w-5 h-5 text-purple-600" />
                          <span className="truncate">{selectedStartup.email}</span>
                        </div>
                      )}
                      {selectedStartup.phone && (
                        <div className="flex items-center space-x-3 text-slate-600">
                          <Phone className="w-5 h-5 text-blue-600" />
                          <span>{selectedStartup.phone}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Achievements */}
                {selectedStartup.achievements.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
                      <Award className="w-5 h-5 mr-2" />
                      Achievements & Awards
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {selectedStartup.achievements.map((achievement, index) => (
                        <div
                          key={index}
                          // Changed gradient to solid color to remove the 'purple/violet gradient' look
                          className="bg-slate-50 border border-slate-200 p-3 rounded-lg text-center hover:shadow-md transition-all"
                        >
                          <span className="text-sm text-slate-700">{achievement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Products & Services */}
                {(selectedStartup.products.length > 0 || selectedStartup.services.length > 0) && (
                  <div>
                    <h3 className="text-lg font-semibold text-purple-600 mb-4">Products & Services</h3>
                    <div className="space-y-4">
                      {selectedStartup.products.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 mb-2">Products</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStartup.products.map((product, index) => (
                              <Badge key={index} variant="outline" className="bg-purple-50 border-purple-200 text-purple-700">
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedStartup.services.length > 0 && (
                        <div>
                          <h4 className="text-sm font-medium text-slate-500 mb-2">Services</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedStartup.services.map((service, index) => (
                              <Badge key={index} variant="outline" className="bg-blue-50 border-blue-200 text-blue-700">
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
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-slate-100">
                  {selectedStartup.website && (
                    <Button 
                      onClick={() => handleVisitWebsite(selectedStartup.website)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-sm cursor-pointer"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      Visit Website
                    </Button>
                  )}
                  {selectedStartup.email && (
                    <Button
                      onClick={() => handleContactTeam(selectedStartup.email)}
                      variant="outline"
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-transparent cursor-pointer"
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
                    className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-transparent cursor-pointer"
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
