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
  TrendingUp,
  ChevronDown,
  ChevronUp,
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
  
  if (!need) {
    return null
  }

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

  return (
    <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-white border-gray-200 text-gray-900 w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0 shadow-2xl">
        {/* The default 'X' close button from ui/dialog.tsx will now appear here */}
        
        {/* Header with Icon and Title */}
        <DialogHeader className="p-6 pb-4 border-b border-gray-100">
          <div className="flex items-center space-x-4 mb-4">
            <div
              className={`w-16 h-16 rounded-lg flex items-center justify-center ${info.iconBg} border-2 border-gray-200 shadow-sm`}
            >
              <Icon className={`h-8 w-8 ${info.iconColor}`} />
            </div>
            <div>
              <DialogTitle className="text-2xl font-bold text-gray-900 mb-1">
                {need.title}
              </DialogTitle>
              <div className="flex items-center space-x-2">
                <Badge className={`text-xs font-medium ${info.badgeClass}`}>
                  {info.label}
                </Badge>
                <span className="text-gray-500 text-sm">by</span>
                <span className="font-medium text-gray-900 text-sm">
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
            <h4 className="font-semibold text-lg text-purple-600 mb-2">
              Description
            </h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
              {displayText}
            </p>
            {isLongDescription && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center space-x-1 text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 transition-colors"
              >
                <span>{isExpanded ? 'Read Less' : 'Read More'}</span>
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </button>
            )}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
            <h4 className="font-semibold text-lg text-purple-600 mb-0 col-span-1 md:col-span-2">
              Opportunity Details
            </h4>
            {need.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-500">Location:</span>
                  <span className="block font-medium text-gray-900">{need.location}</span>
                </div>
              </div>
            )}
            {need.duration && (
              <div className="flex items-start space-x-3">
                <Calendar className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-500">Duration:</span>
                  <span className="block font-medium text-gray-900">{need.duration}</span>
                </div>
              </div>
            )}
            {need.compensation && (
              <div className="flex items-start space-x-3">
                <DollarSign className="w-4 h-4 text-yellow-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-500">Compensation:</span>
                  <span className="block font-medium text-gray-900">
                    {need.compensation}
                  </span>
                </div>
              </div>
            )}
            {need.projectTeamSize && (
              <div className="flex items-start space-x-3">
                <TrendingUp className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="text-gray-500">Team Size:</span>
                  <span className="block font-medium text-gray-900">
                    {need.projectTeamSize}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Required Skills */}
          {skills.length > 0 && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-lg text-purple-600 mb-4">
                Required Skills
              </h4>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="bg-gray-100 text-gray-700 border border-gray-200 text-sm px-3 py-1">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Contact Information Section */}
          {need.contactInfo && (need.contactInfo.email || need.contactInfo.phone) && (
            <div className="pt-4 border-t border-gray-100">
              <h4 className="font-semibold text-lg text-purple-600 mb-4">
                Contact Information
              </h4>
              <div className="space-y-3">
                {need.contactInfo.email && (
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-500" />
                    <a
                      href={`mailto:${need.contactInfo.email}`}
                      className="text-gray-900 hover:text-purple-600 transition-colors font-medium"
                    >
                      {need.contactInfo.email}
                    </a>
                  </div>
                )}
                {need.contactInfo.phone && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-500" />
                    <span className="text-gray-900 font-medium">
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