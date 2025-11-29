import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Navbarpostlogin from "@/components/Students-Components/StudentPostLoginNavbar";
import Footer from "@/components/Students-Components/student-footer";
import { NeedCard } from "@/components/Students-Components/ViewNeedsComponents/NeedCard";
import type { Need } from "@/components/ViewNeedsComponent/NeedCard";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Loader2, Frown, Briefcase, Users, FlaskConical, Heart } from "lucide-react"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NeedDetailsModal } from "@/components/Students-Components/ViewNeedsComponents/NeedDetailModel";

// --- IMPORT STORE & MODALS ---
import { useNeedsStore } from "@/store/needsStore";
import type { BackendNeed } from "@/store/needsStore";
import { DeleteNeedModal } from "@/components/ViewNeedsComponent/DeleteNeedModal";
import { EditNeedModal } from "@/components/ViewNeedsComponent/EditNeedModal";
import toast from "react-hot-toast";
import { useAuthStore } from "@/store/authStore";

const needTypes = [
  { id: 'live_projects', label: 'Live Projects', icon: Briefcase },
  { id: 'internship', label: 'Internships', icon: Users },
  { id: 'research', label: 'Research', icon: FlaskConical },
  { id: 'csr_initiative', label: 'CSR Initiative', icon: Heart },
];

export default function ViewNeedsPage() {
  const [activeType, setActiveType] = useState('live_projects');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  // --- GET ALL STATE FROM ZUSTAND STORE ---
  const { 
    backendNeeds,
    setBackendNeeds,
    isDeleting,
    isUpdating,
    deleteNeed,
    updateNeed
  } = useNeedsStore();

  // --- MODAL STATES ---
  const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
  const [needToDelete, setNeedToDelete] = useState<Need | null>(null);
  const [needToEdit, setNeedToEdit] = useState<Need | null>(null);

  // --- FETCH NEEDS & POPULATE STORE ---
  useEffect(() => {
    const fetchNeeds = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${apiBase}/needs?type=${activeType.toUpperCase()}`);
        if (!response.ok) throw new Error('Failed to fetch needs.');
        
        const result = await response.json();
        setBackendNeeds(result.data.needs as BackendNeed[]); 

      } catch (error) {
        console.error('Fetch error:', error);
        setBackendNeeds([]); 
      } finally {
        setIsLoading(false);
      }
    };

    fetchNeeds();
  }, [activeType, setBackendNeeds]); 

  console.log("fetched needs", backendNeeds);

  const needs: Need[] = useMemo(() => {
    return backendNeeds.map((need: BackendNeed) => {
      const details = need.details_json || {};
      
      return {
        id: need.id,
        userId: need.user_id,
        type: need.type.toLowerCase() as Need['type'],
        title: need.title,
        description: need.description,
        
        details_json: details,

        companyName: details.projectCompanyName || 'OrionEduverse',
        location: details.location || need.location || null,
        duration: details.duration || need.duration || null,
        skills: details.skills || need.skills || null,
        
        compensation: need.compensation || undefined,
        
        projectTeamSize: details.projectTeamSize || details.teamSize || null,
        
        contactInfo: details.contactInfo || { 
          email: details.contactEmail || details.projectEmail || details.researchEmail || details.csrEmail || 'Not specified', 
          phone: details.contactPhone || details.projectPhone || details.researchPhone || details.csrPhone || null
        },
      };
    });
  }, [backendNeeds]);

  const handleTabChange = (tabId: string) => {
    setActiveType(tabId);
  };

  // --- ALL CLICK HANDLERS ---
  const handleViewNeedClick = (need: Need) => setSelectedNeed(need);
  const handleCloseModal = () => setSelectedNeed(null);

  const handleEditClick = (need: Need) => setNeedToEdit(need);
  const handleDeleteClick = (need: Need) => setNeedToDelete(need);

  const handleConfirmDelete = async (needId: number) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }
    
    try {
      await deleteNeed(needId, token);
      toast.success("Need deleted successfully.");
      setNeedToDelete(null); 
    } catch (error: any) {
      toast.error(error.message || "Failed to delete need.");
    }
  };

  const handleConfirmUpdate = async (needId: number, formType: string, formData: any) => {
    const token = useAuthStore.getState().token;
    if (!token) {
      toast.error("You are not authenticated.");
      return;
    }

    try {
      await updateNeed(needId, formType, formData, token);
      toast.success("Need updated successfully.");
      setNeedToEdit(null); 
    } catch (error: any) {
      toast.error(error.message || "Failed to update need.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbarpostlogin onSidebarToggle={false} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">View Needs</h1>
          {user && user.role === "STARTUP" && (
            <Button
              onClick={() => navigate('/share-needs')}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Need
            </Button>
          )}
        </div>

        <Tabs value={activeType} onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-4 bg-white border border-gray-200 mb-8 shadow-sm">
            {needTypes.map(type => (
              <TabsTrigger 
                key={type.id} 
                value={type.id} 
                className="flex items-center space-x-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:border-purple-200 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <type.icon className="w-4 h-4" />
                <span>{type.label}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {needTypes.map(type => (
            <TabsContent key={type.id} value={type.id} className="mt-6 ">
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">Loading needs...</p>
                </div>
              ) : needs.length === 0 ? (
                <div className="text-center py-12">
                  <Frown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 text-lg">No needs found for this category.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {needs.map((need) => (
                    <NeedCard 
                      key={need.id} 
                      need={need} 
                      onViewClick={handleViewNeedClick}
                      onEditClick={handleEditClick}
                      onDeleteClick={handleDeleteClick}
                      currentUserId={user?.id}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
      <Footer />

      {/* --- RENDER ALL THREE MODALS --- */}
      <NeedDetailsModal 
        need={selectedNeed} 
        onClose={handleCloseModal} 
      />

      <DeleteNeedModal
        need={needToDelete}
        onClose={() => setNeedToDelete(null)}
        onConfirmDelete={handleConfirmDelete}
        isDeleting={isDeleting}
      />

      <EditNeedModal
        need={needToEdit}
        onClose={() => setNeedToEdit(null)}
        onConfirmUpdate={handleConfirmUpdate}
        isUpdating={isUpdating}
      />
    </div>
  );
}