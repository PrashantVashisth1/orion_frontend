// import { Card, CardContent } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Users, Briefcase, FlaskConical, Heart, MapPin, Calendar, Users2, Code } from "lucide-react"

// export interface Need {
//   id: number
//   type: 'internship' | 'live-projects' | 'research' | 'csr-initiative'
//   title: string
//   description: string
//   companyName: string
//   location?: string
//   duration?: string
//   skills?: string
//   compensation?: string
//   contactInfo?: {
//     email: string
//     phone: string
//   }
// }

// const getBadgeInfo = (type: string) => {
//   switch (type) {
//     case 'live_projects':
//       return { label: 'Live Project', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' }
//     case 'internship':
//       return { label: 'Internship', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
//     case 'research':
//       return { label: 'Research', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
//     case 'csr_initiative':
//       return { label: 'CSR Initiative', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' }
//     default:
//       return { label: 'Need', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
//   }
// }

// const getIconForType = (type: string) => {
//   switch (type) {
//     case 'live_projects': return <Briefcase className="h-5 w-5 text-violet-400" />
//     case 'internship': return <Users2 className="h-5 w-5 text-blue-400" />
//     case 'research': return <FlaskConical className="h-5 w-5 text-emerald-400" />
//     case 'csr_initiative': return <Heart className="h-5 w-5 text-rose-400" />
//     default: return <Code className="h-5 w-5 text-gray-400" />
//   }
// }

// export function NeedCard({ need }: { need: Need }) {
//   const badge = getBadgeInfo(need.type)
//   console.log(need.type)
//   const Icon = getIconForType(need.type)

//   return (
//     <Card className="bg-slate-800/80 hover:bg-slate-800/90 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-1">
//       <CardContent className="p-6">
//         <div className="flex items-center justify-between mb-4">
//           <div className="flex items-center space-x-3">
//             <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
//               {Icon}
//             </div>
//             <div>
//               <h3 className="font-semibold text-lg text-white">{need.title}</h3>
//               <Badge className={`${badge.color} text-xs font-medium`}>{badge.label}</Badge>
//             </div>
//           </div>
//         </div>
//         <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">{need.description}</p>
//         <div className="space-y-2 text-sm text-gray-400">
//           <div className="flex items-center space-x-2">
//             <Users className="w-4 h-4 text-purple-400" />
//             <span>Company: <span className="font-medium text-white">{need.companyName}</span></span>
//           </div>
//           {need.location && (
//             <div className="flex items-center space-x-2">
//               <MapPin className="w-4 h-4 text-blue-400" />
//               <span>Location: <span className="font-medium text-white">{need.location}</span></span>
//             </div>
//           )}
//           {need.duration && (
//             <div className="flex items-center space-x-2">
//               <Calendar className="w-4 h-4 text-emerald-400" />
//               <span>Duration: <span className="font-medium text-white">{need.duration}</span></span>
//             </div>
//           )}
//           {need.skills && (
//             <div className="flex items-center space-x-2">
//               <Code className="w-4 h-4 text-pink-400" />
//               <span>Skills: <span className="font-medium text-white">{need.skills}</span></span>
//             </div>
//           )}
//           {need.compensation && (
//             <div className="flex items-center space-x-2">
//               <Code className="w-4 h-4 text-yellow-400" />
//               <span>Compensation: <span className="font-medium text-white">{need.compensation}</span></span>
//             </div>
//           )}
//         </div>
//       </CardContent>
//     </Card>
//   )
// }


// import { Badge } from "@/components/ui/badge"
// import { Users, Briefcase, FlaskConical, Heart, MapPin, Calendar, Code, ArrowRight } from "lucide-react"

// // Interface remains the same
// export interface Need {
//   id: number
//   type: 'internship' | 'live-projects' | 'research' | 'csr-initiative'
//   title: string
//   description: string
//   companyName: string
//   location?: string
//   duration?: string
//   skills?: string
//   compensation?: string
//   contactInfo?: {
//     email: string
//     phone: string
//   }
// }

// // Updated getBadgeInfo to provide a full color scheme for each type
// export const getBadgeInfo = (type: string) => {
//   switch (type) {
//     case 'live_projects':
//       return {
//         label: 'Live Project',
//         badgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
//         iconColor: 'text-violet-400',
//         iconBg: 'bg-violet-500/10',
//         gradientColor1: '#8b5cf6', // violet-500
//         gradientColor2: '#6366f1', // indigo-500
//       }
//     case 'internship':
//       return {
//         label: 'Internship',
//         badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
//         iconColor: 'text-blue-400',
//         iconBg: 'bg-blue-500/10',
//         gradientColor1: '#3b82f6', // blue-500
//         gradientColor2: '#0ea5e9', // sky-500
//       }
//     case 'research':
//       return {
//         label: 'Research',
//         badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
//         iconColor: 'text-emerald-400',
//         iconBg: 'bg-emerald-500/10',
//         gradientColor1: '#10b981', // emerald-500
//         gradientColor2: '#22c55e', // green-500
//       }
//     case 'csr_initiative':
//       return {
//         label: 'CSR Initiative',
//         badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
//         iconColor: 'text-rose-400',
//         iconBg: 'bg-rose-500/10',
//         gradientColor1: '#f43f5e', // rose-500
//         gradientColor2: '#ec4899', // pink-500
//       }
//     default:
//       return {
//         label: 'Need',
//         badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
//         iconColor: 'text-gray-400',
//         iconBg: 'bg-gray-500/10',
//         gradientColor1: '#6b7280', // gray-500
//         gradientColor2: '#4b5563', // gray-600
//       }
//   }
// }

// // Updated getIconForType to just return the component
// export const getIconForType = (type: string) => {
//   switch (type) {
//     case 'live_projects': return Briefcase
//     case 'internship': return Users
//     case 'research': return FlaskConical
//     case 'csr_initiative': return Heart
//     default: return Code
//   }
// }

// export function NeedCard({ need }: { need: Need }) {
//   const info = getBadgeInfo(need.type)
//   const Icon = getIconForType(need.type)

//   return (
//     <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group">
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
//           <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-3">{need.description}</p>
        
//           {/* Skills & Compensation Details */}
//           <div className="space-y-3 text-sm text-slate-400 mb-6">
//             {need.skills && (
//               <div className="flex items-center space-x-2">
//                 <Code className={`w-4 h-4 ${info.iconColor}`} />
//                 <span>Skills: <span className="font-medium text-white">{need.skills}</span></span>
//               </div>
//             )}
//             {need.compensation && (
//               <div className="flex items-center space-x-2">
//                 <span className={`text-lg ${info.iconColor} font-bold`}>$</span>
//                 <span>Compensation: <span className="font-medium text-white">{need.compensation}</span></span>
//               </div>
//             )}
//           </div>
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
import { Users, Briefcase, FlaskConical, Heart, MapPin, Calendar, Code, ArrowRight } from "lucide-react"

// Interface remains the same
export interface Need {
  id: number
  type: 'internship' | 'live-projects' | 'research' | 'csr-initiative'
  title: string
  description: string
  companyName: string
  location?: string
  duration?: string
  skills?: string
  compensation?: string
  contactInfo?: {
    email: string
    phone: string
  }
}

// Updated getBadgeInfo to provide a full color scheme
// EXPORTED for modal use
export const getBadgeInfo = (type: string) => {
  switch (type) {
    case 'live_projects':
      return {
        label: 'Live Project',
        badgeClass: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
        iconColor: 'text-violet-400',
        iconBg: 'bg-violet-500/10',
        gradientColor1: '#8b5cf6', // violet-500
        gradientColor2: '#6366f1', // indigo-500
      }
    case 'internship':
      return {
        label: 'Internship',
        badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
        iconColor: 'text-blue-400',
        iconBg: 'bg-blue-500/10',
        gradientColor1: '#3b82f6', // blue-500
        gradientColor2: '#0ea5e9', // sky-500
      }
    case 'research':
      return {
        label: 'Research',
        badgeClass: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        iconColor: 'text-emerald-400',
        iconBg: 'bg-emerald-500/10',
        gradientColor1: '#10b981', // emerald-500
        gradientColor2: '#22c55e', // green-500
      }
    case 'csr_initiative':
      return {
        label: 'CSR Initiative',
        badgeClass: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
        iconColor: 'text-rose-400',
        iconBg: 'bg-rose-500/10',
        gradientColor1: '#f43f5e', // rose-500
        gradientColor2: '#ec4899', // pink-500
      }
    default:
      return {
        label: 'Need',
        badgeClass: 'bg-gray-500/20 text-gray-400 border-gray-500/30',
        iconColor: 'text-gray-400',
        iconBg: 'bg-gray-500/10',
        gradientColor1: '#6b7280', // gray-500
        gradientColor2: '#4b5563', // gray-600
      }
  }
}

// Updated getIconForType to just return the component
// EXPORTED for modal use
export const getIconForType = (type: string) => {
  switch (type) {
    case 'live_projects': return Briefcase
    case 'internship': return Users
    case 'research': return FlaskConical
    case 'csr_initiative': return Heart
    default: return Code
  }
}

// *** ADDED onViewClick PROP ***
export function NeedCard({ need, onViewClick }: { need: Need, onViewClick: (need: Need) => void }) {
  const info = getBadgeInfo(need.type)
  const Icon = getIconForType(need.type)

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group">
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
          <p className="text-sm text-slate-400 mb-6 leading-relaxed line-clamp-3">{need.description}</p>
        
          {/* Skills & Compensation Details */}
          <div className="space-y-3 text-sm text-slate-400 mb-6">
            {need.skills && (
              <div className="flex items-center space-x-2">
                <Code className={`w-4 h-4 ${info.iconColor}`} />
                <span>Skills: <span className="font-medium text-white">{need.skills}</span></span>
              </div>
            )}
            {need.compensation && (
              <div className="flex items-center space-x-2">
                <span className={`text-lg ${info.iconColor} font-bold`}>$</span>
                <span>Compensation: <span className="font-medium text-white">{need.compensation}</span></span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
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
          <button 
            // *** ADDED onClick HANDLER ***
            onClick={() => onViewClick(need)}
            className={`px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors flex items-center space-x-2 text-xs sm:text-sm`}
          >
            <span>View</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}