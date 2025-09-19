import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Briefcase, FlaskConical, Heart, MapPin, Calendar, Users2, Mail, Phone, Code } from "lucide-react"

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

const getBadgeInfo = (type: string) => {
  switch (type) {
    case 'live_projects':
      return { label: 'Live Project', color: 'bg-violet-500/20 text-violet-400 border-violet-500/30' }
    case 'internship':
      return { label: 'Internship', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30' }
    case 'research':
      return { label: 'Research', color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' }
    case 'csr_initiative':
      return { label: 'CSR Initiative', color: 'bg-rose-500/20 text-rose-400 border-rose-500/30' }
    default:
      return { label: 'Need', color: 'bg-gray-500/20 text-gray-400 border-gray-500/30' }
  }
}

const getIconForType = (type: string) => {
  switch (type) {
    case 'live_projects': return <Briefcase className="h-5 w-5 text-violet-400" />
    case 'internship': return <Users2 className="h-5 w-5 text-blue-400" />
    case 'research': return <FlaskConical className="h-5 w-5 text-emerald-400" />
    case 'csr_initiative': return <Heart className="h-5 w-5 text-rose-400" />
    default: return <Code className="h-5 w-5 text-gray-400" />
  }
}

export function NeedCard({ need }: { need: Need }) {
  const badge = getBadgeInfo(need.type)
  console.log(need.type)
  const Icon = getIconForType(need.type)

  return (
    <Card className="bg-slate-800/80 hover:bg-slate-800/90 hover:shadow-2xl transition-all duration-300 border border-slate-700/50 shadow-lg backdrop-blur-sm transform hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-lg bg-slate-700/50 flex items-center justify-center">
              {Icon}
            </div>
            <div>
              <h3 className="font-semibold text-lg text-white">{need.title}</h3>
              <Badge className={`${badge.color} text-xs font-medium`}>{badge.label}</Badge>
            </div>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-6 leading-relaxed line-clamp-3">{need.description}</p>
        <div className="space-y-2 text-sm text-gray-400">
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4 text-purple-400" />
            <span>Company: <span className="font-medium text-white">{need.companyName}</span></span>
          </div>
          {need.location && (
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-400" />
              <span>Location: <span className="font-medium text-white">{need.location}</span></span>
            </div>
          )}
          {need.duration && (
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Duration: <span className="font-medium text-white">{need.duration}</span></span>
            </div>
          )}
          {need.skills && (
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-pink-400" />
              <span>Skills: <span className="font-medium text-white">{need.skills}</span></span>
            </div>
          )}
          {need.compensation && (
            <div className="flex items-center space-x-2">
              <Code className="w-4 h-4 text-yellow-400" />
              <span>Compensation: <span className="font-medium text-white">{need.compensation}</span></span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}