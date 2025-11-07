// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Badge } from "@/components/ui/badge"
// import { getBadgeInfo, getIconForType } from "./NeedCard"
// import type { Need } from "./NeedCard"
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Calendar,
//   // X,
//   DollarSign,
//   TrendingUp
// } from "lucide-react"

// interface NeedDetailsModalProps {
//   need: Need | null
//   onClose: () => void
// }

// // Helper function to process skills
// const getSkills = (skillsString: string | undefined) => {
//   if (!skillsString) return [];
//   return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
// }

// export function NeedDetailsModal({ need, onClose }: NeedDetailsModalProps) {
//   if (!need) {
//     return null
//   }

//   const info = getBadgeInfo(need.type)
//   const Icon = getIconForType(need.type)
//   const skills = getSkills(need.skills);

//   return (
//     <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
//       {/* HERE IS THE FIX:
//         - w-full: Ensures it takes up the available width.
//         - max-w-[calc(100%-2rem)]: A good default for mobile, matches the base component.
//         - sm:max-w-4xl: This is the key. It overrides the default 'sm:max-w-lg' at the same breakpoint.
//       */}
//       <DialogContent className="bg-slate-900 border-slate-700 text-white w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-20"
//         >
//           {/* <X className="w-5 h-5" /> */}
//         </button>

//         {/* Header with Icon and Title */}
//         <DialogHeader className="p-6 pb-4">
//           <div className="flex items-center space-x-4 mb-4">
//             <div
//               className={`w-16 h-16 rounded-lg flex items-center justify-center ${info.iconBg} border-2 border-slate-600`}
//             >
//               <Icon className={`h-8 w-8 ${info.iconColor}`} />
//             </div>
//             <div>
//               <DialogTitle className="text-2xl font-bold text-white mb-1">
//                 {need.title}
//               </DialogTitle>
//               <div className="flex items-center space-x-2">
//                 <Badge className={`text-xs font-medium ${info.badgeClass}`}>
//                   {info.label}
//                 </Badge>
//                 <span className="text-slate-400 text-sm">by</span>
//                 <span className="font-medium text-white text-sm">
//                   {need.companyName}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </DialogHeader>

//         {/* Scrollable Body Content */}
//         <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 space-y-6">
//           {/* Description */}
//           <div>
//             <h4 className="font-semibold text-lg text-purple-300 mb-2">
//               Description
//             </h4>
//             <p className="text-slate-300 leading-relaxed">
//               {need.description}
//             </p>
//           </div>

//           {/* Details Grid */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700">
//             <h4 className="font-semibold text-lg text-purple-300 mb-0 col-span-1 md:col-span-2">
//               Opportunity Details
//             </h4>
//             {need.location && (
//               <div className="flex items-start space-x-3">
//                 <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
//                 <div>
//                   <span className="text-slate-400">Location:</span>
//                   <span className="block font-medium text-white">{need.location}</span>
//                 </div>
//               </div>
//             )}
//             {need.duration && (
//               <div className="flex items-start space-x-3">
//                 <Calendar className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
//                 <div>
//                   <span className="text-slate-400">Duration:</span>
//                   <span className="block font-medium text-white">{need.duration}</span>
//                 </div>
//               </div>
//             )}
//             {need.compensation && (
//               <div className="flex items-start space-x-3">
//                 <DollarSign className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
//                 <div>
//                   <span className="text-slate-400">Compensation:</span>
//                   <span className="block font-medium text-white">
//                     {need.compensation}
//                   </span>
//                 </div>
//               </div>
//             )}
//             {need.projectTeamSize && (
//               <div className="flex items-start space-x-3">
//                 <TrendingUp className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
//                 <div>
//                   <span className="text-slate-400">Team Size:</span>
//                   <span className="block font-medium text-white">
//                     {need.projectTeamSize}
//                   </span>
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* Required Skills */}
//           {skills.length > 0 && (
//             <div className="pt-4 border-t border-slate-700">
//               <h4 className="font-semibold text-lg text-purple-300 mb-4">
//                 Required Skills
//               </h4>
//               <div className="flex flex-wrap gap-2">
//                 {skills.map((skill, index) => (
//                   <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-sm px-3 py-1">
//                     {skill}
//                   </Badge>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Contact Information Section */}
//           {need.contactInfo && (need.contactInfo.email || need.contactInfo.phone) && (
//             <div className="pt-4 border-t border-slate-700">
//               <h4 className="font-semibold text-lg text-purple-300 mb-4">
//                 Contact Information
//               </h4>
//               <div className="space-y-3">
//                 {need.contactInfo.email && (
//                   <div className="flex items-center space-x-3">
//                     <Mail className="w-5 h-5 text-purple-400" />
//                     <a
//                       href={`mailto:${need.contactInfo.email}`}
//                       className="text-white hover:text-purple-300 transition-colors"
//                     >
//                       {need.contactInfo.email}
//                     </a>
//                   </div>
//                 )}
//                 {need.contactInfo.phone && (
//                   <div className="flex items-center space-x-3">
//                     <Phone className="w-5 h-5 text-purple-400" />
//                     <span className="text-white">
//                       {need.contactInfo.phone}
//                     </span>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </DialogContent>
//     </Dialog>
//   )
// }


import { useState, useMemo } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { getBadgeInfo, getIconForType } from "./NeedCard"
import type { Need } from "./NeedCard"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  ChevronDown,
  ChevronUp,
  Send,
  Users,
  Briefcase
} from "lucide-react"

interface NeedDetailsModalProps {
  need: Need | null
  onClose: () => void
}

// Helper function to process skills
const getSkills = (skillsString: string | undefined) => {
  if (!skillsString) return [];
  return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
}

const DESCRIPTION_CHAR_LIMIT = 250; 

export function NeedDetailsModal({ need, onClose }: NeedDetailsModalProps) {
  
  // *** THIS IS THE FIX ***
  // Move the early return to be the VERY FIRST line.
  // This way, the component either renders all hooks or zero hooks.
  if (!need) {
    return null
  }

  // --- All hooks are now placed below the early return ---

  // Add state for expanding the description
  const [isExpanded, setIsExpanded] = useState(false);

  // Get info and skills
  const info = getBadgeInfo(need.type)
  const Icon = getIconForType(need.type)
  const skills = getSkills(need.skills);

  // Create truncated and full text for the description
  const {
    isLongDescription,
    displayText
  } = useMemo(() => {
    const description = need.description || "";
    
    if (description.length <= DESCRIPTION_CHAR_LIMIT) {
      return {
        isLongDescription: false,
        displayText: description
      };
    }
    
    if (isExpanded) {
      return {
        isLongDescription: true,
        displayText: description
      };
    }
    
    return {
      isLongDescription: true,
      displayText: `${description.substring(0, DESCRIPTION_CHAR_LIMIT)}...`
    };
  }, [need.description, isExpanded]);

  const contactEmail = need.contactInfo?.email;
  const contactPhone = need.contactInfo?.phone;
  const cvEmail = need.contactInfo?.cvEmail;

  return (
    <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0">
        {/* The default 'X' close button from ui/dialog.tsx will now appear here */}
        
        {/* Header with Icon and Title */}
        <DialogHeader className="p-6 pb-4">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center ${info.iconBg} border-2 border-slate-600`}
            >
              <Icon className={`h-8 w-8 ${info.iconColor}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-white mb-1">
                {need.title}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs font-medium ${info.badgeClass}`}>
                  {info.label}
                </Badge>
                <span className="text-slate-400 text-sm">by</span>
                <span className="font-medium text-white text-sm">
                  {need.companyName}
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Scrollable Body Content */}
        <div className="max-h-[70vh] overflow-y-auto px-6 pb-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg text-purple-300 mb-2">
              Description
            </h4>
            <p className="text-slate-300 leading-relaxed whitespace-pre-wrap">
              {displayText}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-1 text-purple-300 hover:text-purple-200 text-sm font-medium mt-2"
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700">
            <h4 className="font-semibold text-lg text-purple-300 mb-0 col-span-1 md:col-span-2">
              Opportunity Details
            </h4>
            {need.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Location:</span>
                  <span className="block font-medium text-white">{need.location}</span>
                </div>
              </div>
            )}
            {need.duration && (
              <div className="flex items-start space-x-3">
                <Calendar className="w-4 h-4 text-emerald-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Duration:</span>
                  <span className="block font-medium text-white">{need.duration}</span>
                </div>
              </div>
            )}
            {need.compensation && (
              <div className="flex items-start space-x-3">
                <DollarSign className="w-4 h-4 text-yellow-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Compensation:</span>
                  <span className="block font-medium text-white">
                    {need.compensation}
                  </span>
                </div>
              </div>
            )}
            {need.projectTeamSize && (
              <div className="flex items-start space-x-3">
                <Users className="w-4 h-4 text-pink-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Team Size:</span>
                  <span className="block font-medium text-white">
                    {need.projectTeamSize}
                  </span>
                </div>
              </div>
            )}

            {/* --- NEW INTERNSHIP FIELDS --- */}
            {need.type === 'internship' && need.open_for && (
              <div className="flex items-start space-x-3">
                <Users className="w-4 h-4 text-cyan-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Open For:</span>
                  <span className="block font-medium text-white">
                    {need.open_for}
                  </span>
                </div>
              </div>
            )}
            
            {need.type === 'internship' && need.fulltime && (
              <div className="flex items-start space-x-3">
                <Briefcase className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-slate-400">Full-Time Opportunity:</span>
                  <span className="block font-medium text-white">
                    {need.fulltime}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Required Skills */}
          {skills.length > 0 && (
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-semibold text-lg text-purple-300 mb-4">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information Section */}
          {(contactEmail || contactPhone) && (
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-semibold text-lg text-purple-300 mb-4">
                Contact Information
              </h4>
              <div className="space-y-3">
                {contactEmail && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${contactEmail}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      {contactEmail}
                    </a>
                  </div>
                )}
                {contactPhone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span className="text-white">
                      {contactPhone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* --- ADDED CV/APPLY SECTION --- */}
          {cvEmail && (
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-semibold text-lg text-purple-300 mb-4">
                How to Apply
              </h4>
              <p className="text-slate-400 text-sm mb-3">Send your CV/resume to the email address below:</p>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium text-base">
                    {cvEmail}
                  </span>
                </div>
                <a
                  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${cvEmail}&su=Application for ${encodeURIComponent(need.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center justify-center space-x-2 text-sm font-medium"
                >
                  <Send className="w-4 h-4" />
                  <span>Apply Now</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

