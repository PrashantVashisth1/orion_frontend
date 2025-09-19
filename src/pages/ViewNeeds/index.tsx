import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin"
import Footer from "@/components/postlogincomponents/footer"
import { NeedCard } from "@/components/ViewNeedsComponent/NeedCard"
import type { Need } from "@/components/ViewNeedsComponent/NeedCard"
import { Button } from "@/components/ui/button"
import { ChevronDown, Plus, Loader2, Frown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { useNeedsStore } from "@/store/needsStore"

const needTypes = [
  { id: 'internship', label: 'Internships' },
  { id: 'live_projects', label: 'Live Projects' },
  { id: 'research', label: 'Research' },
  { id: 'csr_initiative', label: 'CSR Initiative' },
]

export default function ViewNeedsPage() {
  const [activeType, setActiveType] = useState('internship')
  const [isLoading, setIsLoading] = useState(false)
  const [needs, setNeeds] = useState<Need[]>([])
  const { setBackendNeeds } = useNeedsStore()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNeeds = async () => {
      setIsLoading(true)
      console.log(`Fetching needs for type: ${activeType}`)
      
      try {
        // FIX: Use the correct endpoint with a query parameter
        const response = await fetch(`http://localhost:4000/api/needs?type=${activeType.toUpperCase()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            // Include authorization if needed
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch needs.')
        }

        const result = await response.json()
        const fetchedNeeds = result.data.needs.map((need: any) => ({
          ...need,
          id: need.id,
          type: need.type.toLowerCase(), // Ensure type is lowercase for display
          companyName: need.details_json.companyName || 'OrionEduverse',
          title: need.title || need.details_json.jobTitle || need.details_json.projectTitle || need.details_json.researchTitle || need.details_json.initiativeType,
          description: need.description || need.details_json.description || need.details_json.projectDescription || need.details_json.researchDescription || need.details_json.csrDescription,
          location: need.location || need.details_json.location || null,
          duration: need.duration || need.details_json.duration || null,
          skills: need.skills || need.details_json.skills || null,
          compensation: need.compensation || need.details_json.compensation || null,
        }));

        setNeeds(fetchedNeeds)
      } catch (error) {
        console.error('Fetch error:', error)
        setNeeds([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchNeeds()
  }, [activeType])

  const handleDropdownChange = (typeId: string) => {
    setActiveType(typeId);
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbarpostlogin />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">View Needs</h1>
          <div className="flex space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="text-white bg-slate-800 border-slate-700 hover:bg-slate-700/50">
                  {needTypes.find(t => t.id === activeType)?.label || 'Select Need'}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-slate-800 text-white border-slate-700">
                {needTypes.map(type => (
                  <DropdownMenuItem key={type.id} onClick={() => handleDropdownChange(type.id)}>
                    {type.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              onClick={() => navigate('/share-needs')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Need
            </Button>
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading needs...</p>
          </div>
        ) : needs.length === 0 ? (
          <div className="text-center py-12">
            <Frown className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No needs found for this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {needs.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}