// import { Badge } from "@/components/ui/badge"
// import { 
//   Users, Briefcase, FlaskConical, Heart, MapPin, 
//   Calendar, Code, ArrowRight, Pencil, Trash2  // <-- 1. Imported icons
// } from "lucide-react"
// import defaultNeedImage from '../../assets/default-need.jpg';

// //
// // --- 2. Corrected Interface ---
// //
// export interface Need {
//   id: number
//   type: 'internship' | 'live_projects' | 'research' | 'csr_initiative'
//   title: string
//   userId: number | string
//   description: string
//   companyName: string
//   location?: string
//   duration?: string
//   skills?: string
//   compensation?: string
//   projectTeamSize?: string // <-- Corrected from projectExtendable
//   contactInfo?: {
//     email: string
//     phone: string
//     cvEmail?: string
//   }
//   details_json: any;
//   // INTERNSHIP FIELDS
//   open_for?: string;
//   fulltime?: string;
//   // --- ADDED/UPDATED FIELDS ---
//   extendable?: string; // <-- This is the standardized name
//   research_open_for?: string; // <-- Add research-specific fields
//   members?: string;           // <-- Add CSR-specific fields
//   mode?: string;              // <-- Add CSR-specific fields
//   // --- END ADD ---
// }

// // ... (getBadgeInfo, getIconForType, getSkills functions remain the same) ...
// export const getBadgeInfo = (type: string) => {
//   switch (type) {
//     case 'live_projects':
//       return {
//         label: 'Live Project',
//         badgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
//         iconColor: 'text-violet-400',
//         iconBg: 'bg-violet-500/10',
//         gradientColor1: '#8b5cf6', 
//         gradientColor2: '#636f1', 
//       }
//     case 'internship':
//       return {
//         label: 'Internship',
//         badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//         iconColor: 'text-blue-400',
//         iconBg: 'bg-blue-500/10',
//         gradientColor1: '#3b82f6', 
//         gradientColor2: '#0ea5e9', 
//       }
//     case 'research':
//       return {
//         label: 'Research',
//         badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
//         iconColor: 'text-emerald-400',
//         iconBg: 'bg-emerald-500/10',
//         gradientColor1: '#10b981', 
//         gradientColor2: '#22c55e', 
//       }
//     case 'csr_initiative':
//       return {
//         label: 'CSR Initiative',
//         badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
//         iconColor: 'text-rose-400',
//         iconBg: 'bg-rose-500/10',
//         gradientColor1: '#f43f5e', 
//         gradientColor2: '#ec4899', 
//       }
//     default:
//       return {
//         label: 'Need',
//         badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
//         iconColor: 'text-gray-400',
//         iconBg: 'bg-gray-500/10',
//         gradientColor1: '#6b7280', 
//         gradientColor2: '#4b5563', 
//       }
//   }
// }
// export const getIconForType = (type: string) => {
//   switch (type) {
//     case 'live_projects': return Briefcase
//     case 'internship': return Users
//     case 'research': return FlaskConical
//     case 'csr_initiative': return Heart
//     default: return Code
//   }
// }
// const getSkills = (skillsString: string | undefined) => {
//   if (!skillsString) return [];
//   return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
// }

// //
// // --- 3. Updated Props Interface ---
// //
// interface NeedCardProps {
//   need: Need;
//   onViewClick: (need: Need) => void;
//   onEditClick: (need: Need) => void;
//   onDeleteClick: (need: Need) => void;
//   currentUserId?: number | string;
// }

// // Helper function to get the correct image URL
// const getImageUrl = (need: Need) => {
//   if (!need.details_json) return null;

//   switch (need.type) {
//     case 'live_projects':
//       return need.details_json.LiveProjectsImage;
//     case 'internship':
//       return need.details_json.InternshipImage;
//     case 'research':
//       return need.details_json.ResearchImage;
//     case 'csr_initiative':
//       return need.details_json.CsrInitiativeImage;
//     default:
//       return defaultNeedImage;
//   }
// };

// export function NeedCard({ 
//   need, 
//   onViewClick,
//   onEditClick,
//   onDeleteClick,
//   currentUserId
// }: NeedCardProps) { // <-- 4. Updated component signature
//   const info = getBadgeInfo(need.type)
//   const Icon = getIconForType(need.type)
//   const skills = getSkills(need.skills);

//   // --- 5. Added Ownership Logic ---
//   const isOwner = currentUserId && Number(need.userId) === Number(currentUserId);


//   const imageUrl = getImageUrl(need) || defaultNeedImage;
//   console.log("imageUrl", imageUrl)

  

//   // --- 6. Added Event Handlers ---
//   const handleEdit = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevents the card's onViewClick from firing
//     onEditClick(need);
//   };

//   const handleDelete = (e: React.MouseEvent) => {
//     e.stopPropagation(); // Prevents the card's onViewClick from firing
//     onDeleteClick(need);
//   };

//   return (
//     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-2 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group flex flex-col h-full">
//       {/* Background Gradient Effect */}
//       <div 
//         className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
//         style={{
//           background: `radial-gradient(circle at 100% 100%, ${info.gradientColor1}, transparent 35%), radial-gradient(circle at 0% 0%, ${info.gradientColor2}, transparent 35%)`
//         }}
//       ></div>

//       {/* Card Content */}
//       {imageUrl && (
//         <img
//           src={imageUrl}
//           alt={`${need.title} poster`}
//           className="w-full h-48 object-fit mb-1" // You can adjust height (h-48)
//         />
//       )}
//       <div className="relative z-10 flex flex-col h-full">
        
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center space-x-4">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${info.iconBg} border-2 border-slate-600`}>
//               <Icon className={`h-6 w-6 ${info.iconColor}`} />
//             </div>
//             <div>
//               <p className="text-xs text-slate-400">Company</p>
//               <h3 className="text-lg font-bold text-white mt-1">{need.companyName}</h3>
//             </div>
//           </div>
//           <Badge className={`text-xs font-medium ${info.badgeClass}`}>{info.label}</Badge>
//         </div>

//         {/* Body */}
//         <div className="flex-grow">
//           <h2 className="text-2xl font-bold text-white mt-1 mb-2">{need.title}</h2>
//           <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-2">{need.description}</p>
//           
//           {/* Skills */}
//           {skills.length > 0 && (
//             <div className="mb-6">
//               <h4 className="text-sm font-semibold text-slate-400 mb-2">Top Skills</h4>
//               {/* *** CHANGE 2: Skills container now truncates *** */}
//               <div className="flex flex-nowrap gap-2 overflow-hidden"> 
//                 {skills.slice(0, 3).map((skill, index) => (
//                   <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs whitespace-nowrap">
//                     {skill}
//                   </Badge>
//                 ))}
//                 {skills.length > 3 && (
//                   <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs whitespace-nowrap">
//                     +{skills.length - 3} more
//                   </Badge>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

//         {/* --- 7. Updated Footer --- */}
//         <div className="flex items-center justify-between text-slate-400 text-sm mt-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
//             {need.location && (
//               <div className="flex items-center space-x-2">
//                 <MapPin className="w-4 h-4 text-blue-400" />
//                 <span className="font-medium text-white">{need.location}</span>
//               </div>
//             )}
//             {need.duration && (
//               <div className="flex items-center space-x-2">
//                 <Calendar className="w-4 h-4 text-emerald-400" />
//                 <span className="font-medium text-white">{need.duration}</span>
//               </div>
//             )}
//           </div>

//           {/* New Button Container */}
//           <div className="flex items-center space-x-2">
//             {isOwner && (
//               <>
//                 <button 
//                   onClick={handleEdit}
//                   className="p-2 text-slate-400 hover:text-blue-400 rounded-full transition-colors"
//                   title="Edit"
//                 >
//                   <Pencil className="w-4 h-4" />
//                 </button>
//                 <button 
//                   onClick={handleDelete}
//                   className="p-2 text-slate-400 hover:text-rose-500 rounded-full transition-colors"
//                   title="Delete"
//                 >
//                   <Trash2 className="w-4 h-4" />
//                 </button>
//               </>
//             )}
//             <button 
//               onClick={() => onViewClick(need)}
//               className={`px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2 text-xs sm:text-sm`}
//             >
//               <span>View</span>
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   )
// }

import { Badge } from "@/components/ui/badge"
import { 
  Users, Briefcase, FlaskConical, Heart, MapPin, 
  Calendar, Code, ArrowRight, Pencil, Trash2 
} from "lucide-react"
import defaultNeedImage from '../../assets/default-need.jpg'; // Ensure this path is correct

// --- Interfaces (Same as before) ---
export interface Need {
  id: number
  type: 'internship' | 'live_projects' | 'research' | 'csr_initiative'
  title: string
  userId: number | string
  description: string
  companyName: string
  location?: string
  duration?: string
  skills?: string
  compensation?: string
  projectTeamSize?: string 
  contactInfo?: {
    email: string
    phone: string
    cvEmail?: string
  }
  details_json: any;
  open_for?: string;
  fulltime?: string;
  extendable?: string; 
  research_open_for?: string; 
  members?: string;           
  mode?: string;              
}

interface NeedCardProps {
  need: Need;
  onViewClick: (need: Need) => void;
  onEditClick: (need: Need) => void;
  onDeleteClick: (need: Need) => void;
  currentUserId?: number | string;
}

// --- Helper Functions (Same as before) ---
export const getBadgeInfo = (type: string) => {
  switch (type) {
    case 'live_projects':
      return {
        label: 'Live Project',
        badgeClass: 'bg-violet-500/90 text-white hover:bg-violet-600',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-950',
        borderColor: 'group-hover:border-violet-500/50'
      }
    case 'internship':
      return {
        label: 'Internship',
        badgeClass: 'bg-blue-500/90 text-white hover:bg-blue-600',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-950',
        borderColor: 'group-hover:border-blue-500/50'
      }
    case 'research':
      return {
        label: 'Research',
        badgeClass: 'bg-emerald-500/90 text-white hover:bg-emerald-600',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-950',
        borderColor: 'group-hover:border-emerald-500/50'
      }
    case 'csr_initiative':
      return {
        label: 'CSR Initiative',
        badgeClass: 'bg-rose-500/90 text-white hover:bg-rose-600',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-950',
        borderColor: 'group-hover:border-rose-500/50'
      }
    default:
      return {
        label: 'Need',
        badgeClass: 'bg-slate-500/90 text-white hover:bg-slate-600',
        iconColor: 'text-slate-400',
        iconBg: 'bg-slate-900',
        borderColor: 'group-hover:border-slate-500/50'
      }
  }
}

export const getIconForType = (type: string) => {
  switch (type) {
    case 'live_projects': return Briefcase
    case 'internship': return Users
    case 'research': return FlaskConical
    case 'csr_initiative': return Heart
    default: return Code
  }
}

const getSkills = (skillsString: string | undefined) => {
  if (!skillsString) return [];
  return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
}

const getImageUrl = (need: Need) => {
  if (!need.details_json) return null;
  switch (need.type) {
    case 'live_projects': return need.details_json.LiveProjectsImage;
    case 'internship': return need.details_json.InternshipImage;
    case 'research': return need.details_json.ResearchImage;
    case 'csr_initiative': return need.details_json.CsrInitiativeImage;
    default: return null;
  }
};

// --- Main Component ---
export function NeedCard({ 
  need, 
  onViewClick,
  onEditClick,
  onDeleteClick,
  currentUserId
}: NeedCardProps) {
  const info = getBadgeInfo(need.type)
  const Icon = getIconForType(need.type)
  const skills = getSkills(need.skills);
  const isOwner = currentUserId && Number(need.userId) === Number(currentUserId);
  const imageUrl = getImageUrl(need) || defaultNeedImage;

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEditClick(need);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDeleteClick(need);
  };

  return (
    <div 
      className={`group relative flex flex-col h-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 ${info.borderColor}`}
    >
      {/* 1. IMPROVED IMAGE SECTION 
          We increased height slightly to h-56 to allow vertical posters more room.
      */}
      <div className="relative h-56 w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        
        {/* Layer A: Blurred Background (Provides the color fill) */}
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center blur-xl opacity-60 transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />

        {/* Layer B: The Actual Image (Visible in full, centered) */}
        <img
          src={imageUrl}
          alt={need.title}
          className="relative w-full h-full object-fit z-0 transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Layer C: Gradient Overlay (For text readability at the bottom) */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 z-10"></div>

        {/* Layer D: Floating Badge */}
        <div className="absolute top-3 right-3 z-20">
          <Badge className={`${info.badgeClass} backdrop-blur-md shadow-lg border-none px-3 py-1`}>
            {info.label}
          </Badge>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="flex flex-col flex-grow px-5 pb-5 relative">
        
        {/* Floating Icon */}
        <div className="-mt-8 mb-3 flex justify-between items-end relative z-20">
          <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${info.iconBg} border-4 border-slate-900 shadow-lg`}>
            <Icon className={`h-7 w-7 ${info.iconColor}`} />
          </div>
          
          <div className="mb-1 text-right max-w-[60%]">
            <h3 className="text-sm font-medium text-slate-300 truncate">
              {need.companyName}
            </h3>
          </div>
        </div>

        {/* Title & Description */}
        <div className="mb-4">
          <h2 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-blue-400 transition-colors">
            {need.title}
          </h2>
          <p className="text-sm text-slate-400 line-clamp-2 leading-relaxed">
            {need.description}
          </p>
        </div>
        
        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-5">
            <div className="flex flex-wrap gap-2 h-[28px] overflow-hidden"> 
              {skills.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="secondary" className="bg-slate-800 text-slate-300 text-xs border-slate-700">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="text-slate-500 text-xs border-slate-700">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Spacer */}
        <div className="flex-grow" />

        {/* 3. Footer Section */}
        <div className="pt-4 mt-2 border-t border-slate-800 flex items-center justify-between">
          
          <div className="flex flex-col gap-1.5">
            {need.location && (
              <div className="flex items-center text-xs text-slate-400">
                <MapPin className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <span className="truncate max-w-[100px]">{need.location}</span>
              </div>
            )}
            {need.duration && (
              <div className="flex items-center text-xs text-slate-400">
                <Calendar className="w-3.5 h-3.5 mr-1.5 text-slate-500" />
                <span>{need.duration}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            {isOwner && (
              <>
                <button 
                  onClick={handleEdit}
                  className="p-2 text-slate-500 hover:text-blue-400 hover:bg-blue-500/10 rounded-full transition-all"
                  title="Edit Need"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-slate-500 hover:text-rose-500 hover:bg-rose-500/10 rounded-full transition-all"
                  title="Delete Need"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            
            <button 
              onClick={() => onViewClick(need)}
              className="group/btn px-4 py-2 bg-white text-slate-900 rounded-full hover:bg-slate-200 transition-all font-medium text-xs flex items-center gap-2"
            >
              View
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}