import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import {  getBadgeInfo, getIconForType } from "./NeedCard" 
import type {  Need } from "./NeedCard"
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Code,
  // Users,
  // X,
  DollarSign
} from "lucide-react"

interface NeedDetailsModalProps {
  need: Need | null
  onClose: () => void
}

export function NeedDetailsModal({ need, onClose }: NeedDetailsModalProps) {
  if (!need) {
    return null
  }

  const info = getBadgeInfo(need.type)
  const Icon = getIconForType(need.type)

  return (
    <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white max-w-2xl p-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          {/* <X className="w-5 h-5" /> */}
        </button>

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
        <div className="max-h-[60vh] overflow-y-auto px-6 pb-6 space-y-6">
          {/* Description */}
          <div>
            <h4 className="font-semibold text-lg text-purple-300 mb-2">
              Description
            </h4>
            <p className="text-slate-300 leading-relaxed">
              {need.description}
            </p>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-slate-700">
            <h4 className="font-semibold text-lg text-purple-300 mb-0 col-span-1 md:col-span-2">
              Opportunity Details
            </h4>
            {need.location && (
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-blue-400" />
                <span className="text-slate-400">Location:</span>
                <span className="font-medium text-white">{need.location}</span>
              </div>
            )}
            {need.duration && (
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-400" />
                <span className="text-slate-400">Duration:</span>
                <span className="font-medium text-white">{need.duration}</span>
              </div>
            )}
            {need.skills && (
              <div className="flex items-center space-x-2">
                <Code className="w-4 h-4 text-pink-400" />
                <span className="text-slate-400">Skills:</span>
                <span className="font-medium text-white">{need.skills}</span>
              </div>
            )}
            {need.compensation && (
              <div className="flex items-center space-x-2">
                <DollarSign className="w-4 h-4 text-yellow-400" />
                <span className="text-slate-400">Compensation:</span>
                <span className="font-medium text-white">
                  {need.compensation}
                </span>
              </div>
            )}
          </div>

          {/* Contact Information Section (The part you asked for!) */}
          {need.contactInfo && (
            <div className="pt-4 border-t border-slate-700">
              <h4 className="font-semibold text-lg text-purple-300 mb-4">
                Contact Information
              </h4>
              <div className="space-y-3">
                {need.contactInfo.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <a
                      href={`mailto:${need.contactInfo.email}`}
                      className="text-white hover:text-purple-300 transition-colors"
                    >
                      {need.contactInfo.email}
                    </a>
                  </div>
                )}
                {need.contactInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <span className="text-white">
                      {need.contactInfo.phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}