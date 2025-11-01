// import { Badge } from "@/components/ui/badge"
// import { Users, Briefcase, FlaskConical, Heart, MapPin, Calendar, Code, ArrowRight } from "lucide-react"

// // Interface (make sure it includes projectExtendable from our last step)
// export interface Need {
//   id: number
//   type: 'internship' | 'live-projects' | 'research' | 'csr-initiative'
//   title: string
//   userId: number | string
//   description: string
//   companyName: string
//   location?: string
//   duration?: string
//   skills?: string
//   compensation?: string
//   projectTeamSize?: string
//   contactInfo?: {
//     email: string
//     phone: string
//   }
//   details_json: any;
// }

// // getBadgeInfo function remains the same...
// export const getBadgeInfo = (type: string) => {
//   switch (type) {
//     case 'live_projects':
//       return {
//         label: 'Live Project',
//         badgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
//         iconColor: 'text-violet-400',
//         iconBg: 'bg-violet-500/10',
//         gradientColor1: '#8b5cf6', 
//         gradientColor2: '#6366f1', 
//       }
//     case 'internship':
//       return {
//         label: 'Internship',
//         badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//         iconColor: 'text-blue-400',
//         iconBg: 'bg-blue-500/10',
//         gradientColor1: '#3b82f6', 
//         gradientColor2: '#0ea5e9', 
//       }
//     case 'research':
//       return {
//         label: 'Research',
//         badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
//         iconColor: 'text-emerald-400',
//         iconBg: 'bg-emerald-500/10',
//         gradientColor1: '#10b981', 
//         gradientColor2: '#22c55e', 
//       }
//     case 'csr_initiative':
//       return {
//         label: 'CSR Initiative',
//         badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
//         iconColor: 'text-rose-400',
//         iconBg: 'bg-rose-500/10',
//         gradientColor1: '#f43f5e', 
//         gradientColor2: '#ec4899', 
//       }
//     default:
//       return {
//         label: 'Need',
//         badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
//         iconColor: 'text-gray-400',
//         iconBg: 'bg-gray-500/10',
//         gradientColor1: '#6b7280', 
//         gradientColor2: '#4b5563', 
//       }
//   }
// }

// // getIconForType function remains the same...
// export const getIconForType = (type: string) => {
//   switch (type) {
//     case 'live_projects': return Briefcase
//     case 'internship': return Users
//     case 'research': return FlaskConical
//     case 'csr_initiative': return Heart
//     default: return Code
//   }
// }

// // Helper function to process skills
// const getSkills = (skillsString: string | undefined) => {
//   if (!skillsString) return [];
//   return skillsString.split(',').map(skill => skill.trim()).filter(Boolean);
// }

// export function NeedCard({ need, onViewClick }: { need: Need, onViewClick: (need: Need) => void }) {
//   const info = getBadgeInfo(need.type)
//   const Icon = getIconForType(need.type)
//   const skills = getSkills(need.skills);

//   return (
//     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group flex flex-col h-full">
//       {/* Background Gradient Effect */}
//       <div 
//         className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
//         style={{
//           background: `radial-gradient(circle at 100% 100%, ${info.gradientColor1}, transparent 35%), radial-gradient(circle at 0% 0%, ${info.gradientColor2}, transparent 35%)`
//         }}
//       ></div>

//       {/* Card Content */}
//       <div className="relative z-10 flex flex-col h-full">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-4">
//           <div className="flex items-center space-x-4">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${info.iconBg} border-2 border-slate-600`}>
//               <Icon className={`h-6 w-6 ${info.iconColor}`} />
//             </div>
//             <div>
//               <p className="text-xs text-slate-400">Company</p>
//               <h3 className="text-lg font-bold text-white mt-1">{need.companyName}</h3>
//             </div>
//           </div>
//           <Badge className={`text-xs font-medium ${info.badgeClass}`}>{info.label}</Badge>
//         </div>

//         {/* Body */}
//         <div className="flex-grow">
//           <h2 className="text-2xl font-bold text-white mt-1 mb-2">{need.title}</h2>
          
//           {/* *** CHANGE 1: Description set to line-clamp-2 *** */}
//           <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-2">{need.description}</p>
        
//           {/* Skills */}
//           {skills.length > 0 && (
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
//         </div>

//         {/* Footer */}
//         <div className="flex items-center justify-between text-slate-400 text-sm mt-4">
//           <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
//             {need.location && (
//               <div className="flex items-center space-x-2">
//                 <MapPin className="w-4 h-4 text-blue-400" />
//                 <span className="font-medium text-white">{need.location}</span>
//               </div>
//             )}
//             {need.duration && (
//               <div className="flex items-center space-x-2">
//                 <Calendar className="w-4 h-4 text-emerald-400" />
//                 <span className="font-medium text-white">{need.duration}</span>
//               </div>
//             )}
//           </div>
//           <button 
//             onClick={() => onViewClick(need)}
//             className={`px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2 text-xs sm:text-sm`}
//           >
//             <span>View</span>
//             <ArrowRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }


import { Badge } from "@/components/ui/badge"
import { 
  Users, Briefcase, FlaskConical, Heart, MapPin, 
  Calendar, Code, ArrowRight, Pencil, Trash2  // <-- 1. Imported icons
} from "lucide-react"

//
// --- 2. Corrected Interface ---
//
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
  projectTeamSize?: string // <-- Corrected from projectExtendable
  contactInfo?: {
    email: string
    phone: string
  }
  details_json: any;
}

// ... (getBadgeInfo, getIconForType, getSkills functions remain the same) ...
export const getBadgeInfo = (type: string) => {
  switch (type) {
    case 'live_projects':
      return {
        label: 'Live Project',
        badgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        gradientColor1: '#8b5cf6', 
        gradientColor2: '#636f1', 
      }
    case 'internship':
      return {
        label: 'Internship',
        badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        gradientColor1: '#3b82f6', 
        gradientColor2: '#0ea5e9', 
      }
    case 'research':
      return {
        label: 'Research',
        badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        gradientColor1: '#10b981', 
        gradientColor2: '#22c55e', 
      }
    case 'csr_initiative':
      return {
        label: 'CSR Initiative',
        badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
        gradientColor1: '#f43f5e', 
        gradientColor2: '#ec4899', 
      }
    default:
      return {
        label: 'Need',
        badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        iconColor: 'text-gray-400',
        iconBg: 'bg-gray-500/10',
        gradientColor1: '#6b7280', 
        gradientColor2: '#4b5563', 
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

//
// --- 3. Updated Props Interface ---
//
interface NeedCardProps {
  need: Need;
  onViewClick: (need: Need) => void;
  onEditClick: (need: Need) => void;
  onDeleteClick: (need: Need) => void;
  currentUserId?: number | string;
}

export function NeedCard({ 
  need, 
  onViewClick,
  onEditClick,
  onDeleteClick,
  currentUserId
}: NeedCardProps) { // <-- 4. Updated component signature
  const info = getBadgeInfo(need.type)
  const Icon = getIconForType(need.type)
  const skills = getSkills(need.skills);

  // --- 5. Added Ownership Logic ---
  const isOwner = currentUserId && Number(need.userId) === Number(currentUserId);

  // --- 6. Added Event Handlers ---
  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's onViewClick from firing
    onEditClick(need);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevents the card's onViewClick from firing
    onDeleteClick(need);
  };

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group flex flex-col h-full">
      {/* Background Gradient Effect */}
      <div 
        className="absolute inset-0 z-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300" 
        style={{
          background: `radial-gradient(circle at 100% 100%, ${info.gradientColor1}, transparent 35%), radial-gradient(circle at 0% 0%, ${info.gradientColor2}, transparent 35%)`
        }}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center space-x-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${info.iconBg} border-2 border-slate-600`}>
              <Icon className={`h-6 w-6 ${info.iconColor}`} />
            </div>
            <div>
              <p className="text-xs text-slate-400">Company</p>
              <h3 className="text-lg font-bold text-white mt-1">{need.companyName}</h3>
            </div>
          </div>
          <Badge className={`text-xs font-medium ${info.badgeClass}`}>{info.label}</Badge>
        </div>

        {/* Body */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold text-white mt-1 mb-2">{need.title}</h2>
          <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-2">{need.description}</p>
          
          {/* Skills */}
          {skills.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-slate-400 mb-2">Top Skills</h4>
              {/* *** CHANGE 2: Skills container now truncates *** */}
              <div className="flex flex-nowrap gap-2 overflow-hidden"> 
                {skills.slice(0, 3).map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-slate-700 text-slate-300 text-xs whitespace-nowrap">
                    {skill}
                  </Badge>
                ))}
                {skills.length > 3 && (
                  <Badge variant="secondary" className="bg-slate-700 text-slate-300 text-xs whitespace-nowrap">
                    +{skills.length - 3} more
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- 7. Updated Footer --- */}
        <div className="flex items-center justify-between text-slate-400 text-sm mt-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            {need.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="font-medium text-white">{need.location}</span>
              </div>
            )}
            {need.duration && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="font-medium text-white">{need.duration}</span>
              </div>
            )}
          </div>

          {/* New Button Container */}
          <div className="flex items-center space-x-2">
            {isOwner && (
              <>
                <button 
                  onClick={handleEdit}
                  className="p-2 text-slate-400 hover:text-blue-400 rounded-full transition-colors"
                  title="Edit"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button 
                  onClick={handleDelete}
                  className="p-2 text-slate-400 hover:text-rose-500 rounded-full transition-colors"
                  title="Delete"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </>
            )}
            <button 
              onClick={() => onViewClick(need)}
              className={`px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2 text-xs sm:text-sm`}
            >
              <span>View</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </div>
  )
}