import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
import Footer from "@/components/postlogincomponents/footer";
import { NeedCard } from "@/components/ViewNeedsComponent/NeedCard";
import type { Need } from "@/components/ViewNeedsComponent/NeedCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Loader2, Frown, Briefcase, Users, FlaskConical, Heart } from "lucide-react"; // Imported tab icons
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"; // Imported Tabs components
// import { useNeedsStore } from "@/store/needsStore";

// Re-defined needTypes for tab navigation
const needTypes = [
  { id: 'live_projects', label: 'Live Projects', icon: Briefcase },
  { id: 'internship', label: 'Internships', icon: Users },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'csr_initiative', label: 'CSR Initiative', icon: Heart },
];

export default function ViewNeedsPage() {
  const [activeType, setActiveType] = useState('live_projects');
  const [isLoading, setIsLoading] = useState(false);
  const [needs, setNeeds] = useState<Need[]>([]);
  // const { setBackendNeeds } = useNeedsStore();
  const navigate = useNavigate();
  const { user } = useAuth();
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  useEffect(() => {
    const fetchNeeds = async () => {
      setIsLoading(true);
      
      try {
        const response = await fetch(`${apiBase}/api/needs?type=${activeType.toUpperCase()}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch needs.');
        }

        const result = await response.json();
        const fetchedNeeds = result.data.needs.map((need: any) => ({
          ...need,
          id: need.id,
          type: need.type.toLowerCase(),
          companyName: need.details_json.companyName || 'OrionEduverse',
          title: need.title || need.details_json.jobTitle || need.details_json.projectTitle || need.details_json.researchTitle || need.details_json.initiativeType,
          description: need.description || need.details_json.description || need.details_json.projectDescription || need.details_json.researchDescription || need.details_json.csrDescription,
          location: need.location || need.details_json.location || null,
          duration: need.duration || need.details_json.duration || null,
          skills: need.skills || need.details_json.skills || null,
          compensation: need.compensation || need.details_json.compensation || null,
        }));

        setNeeds(fetchedNeeds);
      } catch (error) {
        console.error('Fetch error:', error);
        setNeeds([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNeeds();
  }, [activeType]);

  const handleTabChange = (tabId: string) => {
    setActiveType(tabId);
  };

  return (
    <div className="min-h-screen bg-slate-900">
      <Navbarpostlogin />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">View Needs</h1>
          {
            user && user.role === "STARTUP" && (
              <Button
            onClick={() => navigate('/share-needs')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Need
          </Button>
            )
          }
        </div>

        <Tabs value={activeType} onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-4 bg-slate-800/50 border border-slate-700/50 mb-8">
            {needTypes.map(type => {
              const IconComponent = type.icon;
              return (
                <TabsTrigger 
                  key={type.id} 
                  value={type.id} 
                  className="flex items-center space-x-2 data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/30"
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{type.label}</span>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {needTypes.map(type => (
            <TabsContent key={type.id} value={type.id} className="mt-6">
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
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />
    </div>
  );
}