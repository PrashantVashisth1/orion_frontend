
// import { User, DollarSign, Users, Scale, FileText } from "lucide-react";
// // Importing necessary icons for BusinessDetails.jsx
// import { Tag, Zap, Factory, Shield, Calendar, BookOpen, Briefcase, Linkedin, Twitter, Github, Link } from "lucide-react";
// // import type { StartupProfileResponse } from "@/types/startup";

// // interface BusinessDetailsProps { profile: StartupProfileResponse | null | undefined; }

// export default function BusinessDetails({ profile }) {
//   const pInfo = profile?.data?.personalInfo;
//   const bDetails = profile?.data?.businessDetails;
//   const cDetails = profile?.data?.companyDetails;

//   // Combine relevant data into sections
//   const personalHighlights = [
//     { label: "Role/Title", value: bDetails?.jobTitle || 'N/A', icon: User },
//     { label: "Bio", value: pInfo?.bio || 'N/A', icon: FileText },
//     { label: "Experience", value: bDetails?.experience || 'N/A', icon: Briefcase },
//     { label: "Key Skills", value: bDetails?.skills || 'N/A', icon: Zap },
//   ].filter(item => item.value !== 'N/A');

//   const businessHighlights = [
//     { label: "Business Type", value: bDetails?.businessType || 'N/A', icon: Tag },
//     { label: "Funding Stage", value: bDetails?.fundingStage || 'N/A', icon: DollarSign },
//     { label: "Team Size", value: cDetails?.teamSize || 'N/A', icon: Users },
//     { label: "Company Type", value: cDetails?.companyType || 'N/A', icon: Factory },
//   ].filter(item => item.value !== 'N/A');

//   const legalInfo = [
//     { label: "Legal Name", value: cDetails?.legalName || 'N/A', icon: Scale },
//     { label: "Tax ID/GSTIN", value: cDetails?.taxId || 'N/A', icon: Shield },
//     { label: "Registration Date", value: cDetails?.registrationDate ? new Date(cDetails.registrationDate).toLocaleDateString() : 'N/A', icon: Calendar },
//     { label: "Business License", value: cDetails?.businessLicense || 'N/A', icon: BookOpen },
//   ].filter(item => item.value !== 'N/A');

//   const socialLinks = [
//     { label: "LinkedIn", value: bDetails?.linkedinProfile, icon: Linkedin },
//     { label: "Twitter", value: bDetails?.twitterProfile, icon: Twitter },
//     { label: "GitHub", value: bDetails?.githubProfile, icon: Github },
//     { label: "Portfolio", value: bDetails?.portfolioWebsite, icon: Link },
//   ].filter(item => item.value);

//   // Helper component for detail items
//   const DetailItem = ({ label, value, icon: Icon }) => (
//     <div className="flex items-start space-x-3 p-4 bg-gray-700/30 rounded-lg border border-gray-600/50">
//         <Icon className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
//         <div className="flex flex-col">
//             <span className="text-xs text-gray-400 uppercase font-semibold">{label}</span>
//             <span className="text-sm text-white font-medium break-words">{value}</span>
//         </div>
//     </div>
//   );

//   const SocialLink = ({ label, value, icon: Icon }) => (
//     <a href={value} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 bg-blue-600/20 text-blue-300 px-4 py-2 rounded-full hover:bg-blue-600/30 transition duration-300">
//         <Icon className="h-5 w-5" />
//         <span className="text-sm font-medium hidden sm:inline">{label}</span>
//     </a>
//   );

//   return (
//     <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full space-y-8">
      
//       <div className="space-y-6">
//         <h3 className="text-2xl font-bold text-white flex items-center gap-2">
//             <DollarSign className="h-6 w-6 text-yellow-400" /> Business and Founder Details
//         </h3>

//         {/* Founder Highlights */}
//         <div className="space-y-4">
//             <h4 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Founder Highlights</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {personalHighlights.map((item, index) => (
//                     <DetailItem key={index} {...item} />
//                 ))}
//             </div>
//         </div>

//         {/* Business Highlights */}
//         <div className="space-y-4 pt-4 border-t border-gray-800">
//             <h4 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Company Overview</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {businessHighlights.map((item, index) => (
//                     <DetailItem key={index} {...item} />
//                 ))}
//             </div>
//         </div>

//         {/* Legal Info */}
//         <div className="space-y-4 pt-4 border-t border-gray-800">
//             <h4 className="text-lg font-semibold text-gray-300 border-b border-gray-700 pb-2">Legal Information</h4>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {legalInfo.map((item, index) => (
//                     <DetailItem key={index} {...item} />
//                 ))}
//             </div>
//         </div>
//       </div>

//       {/* Social Links */}
//       {socialLinks.length > 0 && (
//           <div className="pt-4 border-t border-gray-800">
//               <h4 className="text-lg font-semibold text-gray-300 mb-4">Social Presence</h4>
//               <div className="flex flex-wrap gap-4">
//                   {socialLinks.map((link, index) => (
//                       <SocialLink key={index} {...link} />
//                   ))}
//               </div>
//           </div>
//       )}
//     </div>
//   );
// }

import { User, DollarSign, Users, Scale, FileText } from "lucide-react";
// Importing necessary icons for BusinessDetails.jsx
import { Tag, Zap, Factory, Shield, Calendar, BookOpen, Briefcase, Linkedin, Twitter, Github, Link } from "lucide-react";
// import type { StartupProfileResponse } from "@/types/startup";

// interface BusinessDetailsProps { profile: StartupProfileResponse | null | undefined; }

export default function BusinessDetails({ profile }) {
  const pInfo = profile?.data?.personalInfo;
  const bDetails = profile?.data?.businessDetails;
  const cDetails = profile?.data?.companyDetails;

  // Combine relevant data into sections
  const personalHighlights = [
    { label: "Role/Title", value: bDetails?.jobTitle || 'N/A', icon: User },
    { label: "Bio", value: pInfo?.bio || 'N/A', icon: FileText },
    { label: "Experience", value: bDetails?.experience || 'N/A', icon: Briefcase },
    { label: "Key Skills", value: bDetails?.skills || 'N/A', icon: Zap },
  ].filter(item => item.value !== 'N/A');

  const businessHighlights = [
    { label: "Business Type", value: bDetails?.businessType || 'N/A', icon: Tag },
    { label: "Funding Stage", value: bDetails?.fundingStage || 'N/A', icon: DollarSign },
    { label: "Team Size", value: cDetails?.teamSize || 'N/A', icon: Users },
    { label: "Company Type", value: cDetails?.companyType || 'N/A', icon: Factory },
  ].filter(item => item.value !== 'N/A');

  const legalInfo = [
    { label: "Legal Name", value: cDetails?.legalName || 'N/A', icon: Scale },
    { label: "Tax ID/GSTIN", value: cDetails?.taxId || 'N/A', icon: Shield },
    { label: "Registration Date", value: cDetails?.registrationDate ? new Date(cDetails.registrationDate).toLocaleDateString() : 'N/A', icon: Calendar },
    { label: "Business License", value: cDetails?.businessLicense || 'N/A', icon: BookOpen },
  ].filter(item => item.value !== 'N/A');

  const socialLinks = [
    { label: "LinkedIn", value: bDetails?.linkedinProfile, icon: Linkedin },
    { label: "Twitter", value: bDetails?.twitterProfile, icon: Twitter },
    { label: "GitHub", value: bDetails?.githubProfile, icon: Github },
    { label: "Portfolio", value: bDetails?.portfolioWebsite, icon: Link },
  ].filter(item => item.value);

  // Helper component for detail items
  const DetailItem = ({ label, value, icon: Icon }) => (
    // Light theme background, border, and text colors
    <div className="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
        {/* Icon color adjusted to a darker, vibrant tone */}
        <Icon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-1" />
        <div className="flex flex-col">
            <span className="text-xs text-gray-500 uppercase font-semibold">{label}</span>
            <span className="text-sm text-gray-800 font-medium break-words">{value}</span>
        </div>
    </div>
  );

  const SocialLink = ({ label, value, icon: Icon }) => (
    // Social links adjusted for light theme: light blue background, dark blue text
    <a 
        href={value} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="flex items-center gap-3 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition duration-300 border border-blue-200"
    >
        <Icon className="h-5 w-5" />
        <span className="text-sm font-medium hidden sm:inline">{label}</span>
    </a>
  );

  return (
    // Main card background and border adjusted
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-xl relative w-full space-y-8">
      
      <div className="space-y-6">
        {/* Main heading text and icon color adjusted */}
        <h3 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-yellow-600" /> Business and Founder Details
        </h3>

        {/* Founder Highlights */}
        <div className="space-y-4">
            {/* Sub-heading text and border adjusted */}
            <h4 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Founder Highlights</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {personalHighlights.map((item, index) => (
                    <DetailItem key={index} {...item} />
                ))}
            </div>
        </div>

        {/* Business Highlights */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Company Overview</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {businessHighlights.map((item, index) => (
                    <DetailItem key={index} {...item} />
                ))}
            </div>
        </div>

        {/* Legal Info */}
        <div className="space-y-4 pt-4 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-700 border-b border-gray-200 pb-2">Legal Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {legalInfo.map((item, index) => (
                    <DetailItem key={index} {...item} />
                ))}
            </div>
        </div>
      </div>

      {/* Social Links */}
      {socialLinks.length > 0 && (
          <div className="pt-4 border-t border-gray-200">
              <h4 className="text-lg font-semibold text-gray-700 mb-4">Social Presence</h4>
              <div className="flex flex-wrap gap-4">
                  {socialLinks.map((link, index) => (
                      <SocialLink key={index} {...link} />
                  ))}
              </div>
          </div>
      )}
    </div>
  );
}