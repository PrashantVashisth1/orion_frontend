import { FileText, User, Building, Briefcase, Package } from "lucide-react"

interface EditProfileSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeSection: string
  onSectionChange: (section: string) => void
}

const sidebarItems = [
  { id: 'personal', label: 'Personal Info', icon: User },
  { id: 'business', label: 'Business Details', icon: Briefcase },
  { id: 'company', label: 'Company Details', icon: Building },
  { id: 'interests', label: 'Interests of Company', icon: FileText },
  { id: 'offerings', label: 'Offerings of Company', icon: Package },
]

export default function EditProfileSidebar({ 
  isOpen, 
  onClose,
  activeSection,
  onSectionChange 
}: EditProfileSidebarProps) {
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}
    >
      <div className="h-full flex flex-col">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold text-gray-900">PROFILE SECTIONS</h2>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left mb-2 transition-colors
                ${activeSection === item.id 
                  ? 'bg-gray-100 text-blue-600' 
                  : 'text-gray-700 hover:bg-gray-50'}
              `}
            >
              <item.icon className="h-5 w-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}
