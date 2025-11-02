// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// import { NeedCard } from "@/components/ViewNeedsComponent/NeedCard";
// import type { Need } from "@/components/ViewNeedsComponent/NeedCard";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import { Plus, Loader2, Frown, Briefcase, Users, FlaskConical, Heart } from "lucide-react"; 
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { NeedDetailsModal } from "@/components/ViewNeedsComponent/NeedDetailModal"; 

// // Re-defined needTypes for tab navigation
// const needTypes = [
//   { id: 'live_projects', label: 'Live Projects', icon: Briefcase },
//   { id: 'internship', label: 'Internships', icon: Users },
//   { id: 'research', label: 'Research', icon: FlaskConical },
//   { id: 'csr_initiative', label: 'CSR Initiative', icon: Heart },
// ];

// export default function ViewNeedsPage() {
//   const [activeType, setActiveType] = useState('live_projects');
//   const [isLoading, setIsLoading] = useState(false);
//   const [needs, setNeeds] = useState<Need[]>([]);
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

//   const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);

//   useEffect(() => {
//     const fetchNeeds = async () => {
//       setIsLoading(true);
      
//       try {
//         const response = await fetch(`${apiBase}/api/needs?type=${activeType.toUpperCase()}`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         });

//         if (!response.ok) {
//           throw new Error('Failed to fetch needs.');
//         }

        

//         const result = await response.json();

//         console.log('Fetched needs:', result.data.needs[0].details_json); // Debug log
//         const fetchedNeeds = result.data.needs.map((need: any) => ({
//           ...need,
//           id: need.id,
//           userId: need.userId,
//           details_json: need.details_json || {},
//           type: need.type.toLowerCase(),
//           companyName: need.details_json.companyName || 'OrionEduverse',
//           title: need.title || need.details_json.jobTitle || need.details_json.projectTitle || need.details_json.researchTitle || need.details_json.initiativeType,
//           description: need.description || need.details_json.description || need.details_json.projectDescription || need.details_json.researchDescription || need.details_json.csrDescription,
//           location: need.location || need.details_json.location || null,
//           duration: need.duration || need.details_json.duration || null,
//           skills: need.skills || need.details_json.skills || null,
//           compensation: need.compensation || need.details_json.compensation || null,
          
//           // 1. ADDED projectExtendable
//           // (Adjust 'need.details_json.projectExtendable' to your actual API key)
//           // projectExtendable: need.details_json.projectExtendable || null, 
//           projectTeamSize: need.details_json.projectTeamSize || null,

//           contactInfo: need.details_json.contactInfo || { 
//             email: need.details_json.projectCvEmail || 'Not specified', 
//             phone: need.details_json.projectPhone || null
//           },
//         }));

//         setNeeds(fetchedNeeds);
//       } catch (error) {
//         console.error('Fetch error:', error);
//         setNeeds([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNeeds();
//   }, [activeType]);

//   const handleTabChange = (tabId: string) => {
//     setActiveType(tabId);
//   };

//   const handleViewNeedClick = (need: Need) => {
//     setSelectedNeed(need);
//   };

//   const handleCloseModal = () => {
//     setSelectedNeed(null);
//   };

//   return (
//     <div className="min-h-screen bg-slate-900">
//       <Navbarpostlogin />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-white">View Needs</h1>
//           {
//             user && user.role === "STARTUP" && (
//               <Button
//                 onClick={() => navigate('/share-needs')}
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add New Need
//               </Button>
//             )
//           }
//         </div>

//         <Tabs value={activeType} onValueChange={handleTabChange}>
//           <TabsList className="w-full grid grid-cols-4 bg-slate-800/50 border border-slate-700/50 mb-8">
//             {needTypes.map(type => {
//               const IconComponent = type.icon;
//               return (
//                 <TabsTrigger 
//                   key={type.id} 
//                   value={type.id} 
//                   className="flex items-center space-x-2 data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/30"
//                 >
//                   <IconComponent className="w-4 h-4" />
//                   <span>{type.label}</span>
//                 </TabsTrigger>
//               )
//             })}
//           </TabsList>

//           {needTypes.map(type => (
//             <TabsContent key={type.id} value={type.id} className="mt-6">
//               {isLoading ? (
//                 <div className="text-center py-12">
//                   <Loader2 className="h-8 w-8 text-blue-400 animate-spin mx-auto mb-4" />
//                   <p className="text-gray-400">Loading needs...</p>
//                 </div>
//               ) : needs.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Frown className="h-12 w-12 text-gray-500 mx-auto mb-4" />
//                   <p className="text-gray-400 text-lg">No needs found for this category.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {needs.map((need) => (
//                     <NeedCard 
//                       key={need.id} 
//                       need={need} 
//                       onViewClick={handleViewNeedClick} 
//                     />
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//       <Footer />

//       <NeedDetailsModal 
//         need={selectedNeed} 
//         onClose={handleCloseModal} 
//       />
//     </div>
//   );
// }


// src/pages/ViewNeeds/index.tsx

import { useState, useEffect, useMemo } from "react"; // <-- Import useMemo
import { useNavigate } from "react-router-dom";
// import { useToast } from "@/components/ui/use-toast";
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
import Footer from "@/components/postlogincomponents/footer";
import { NeedCard } from "@/components/ViewNeedsComponent/NeedCard";
import type { Need } from "@/components/ViewNeedsComponent/NeedCard"; // <-- Our new frontend interface
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { Plus, Loader2, Frown, Briefcase, Users, FlaskConical, Heart } from "lucide-react"; 
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { NeedDetailsModal } from "@/components/ViewNeedsComponent/NeedDetailModal";

// --- IMPORT STORE & MODALS ---
import { useNeedsStore } from "@/store/needsStore";
import type { BackendNeed } from "@/store/needsStore"; // <-- Import your raw backend type
import { DeleteNeedModal } from "@/components/ViewNeedsComponent/DeleteNeedModal";
import { EditNeedModal } from "@/components/ViewNeedsComponent/EditNeedModal";
import toast from "react-hot-toast";

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
  // const { toast } = useToast();
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

  // --- GET ALL STATE FROM ZUSTAND STORE ---
  const { 
    backendNeeds, // <-- This is the raw data (BackendNeed[])
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
        const response = await fetch(`${apiBase}/api/needs?type=${activeType.toUpperCase()}`);
        if (!response.ok) throw new Error('Failed to fetch needs.');
        
        const result = await response.json();
        // Set the raw backend data in the store
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

  // console.log("fetched needs", backendNeeds);


  const needs: Need[] = useMemo(() => {
    return backendNeeds.map((need: BackendNeed) => {
      const details = need.details_json || {};

      console.log("details: ", details)

      let cvEmail = null;
      const lowerCaseType = need.type.toLowerCase();
      if (lowerCaseType === 'live_projects') {
        cvEmail = details.projectCvEmail;
      } else if (lowerCaseType === 'internship') {
        cvEmail = details.internship_cv_email || details.internshipCvEmail;
      } else if (lowerCaseType === 'research') {
        cvEmail = details.researchCvEmail;
      }

      const title = need.title || details.projectTitle || details.job_title || details.researchTitle || details.initiativeType;
      const skills = need.skills || details.projectSkills || details.min_skills || details.researchSkills;
      // const contactInfo = need.contact_info || {};
      
      // Build the object field-by-field to avoid spreading stale data
      return {
        // Core fields from the top level
        id: need.id,
        userId: need.user_id, // Map user_id to userId
        type: need.type.toLowerCase() as Need['type'],
        title: title, // This is now correctly updated from the backend
        description: need.description || details.description || details.projectDescription || details.researchDescription || details.csrDescription, // This is also correct
        
        // The raw JSON blob, required for the Edit modal
        details_json: details,

        // --- Display fields ---
        // We now *prioritize* the details_json, falling back to top-level
        // This is the reverse of what we had, and is much safer.
        companyName: details.projectCompanyName || 'OrionEduverse',
        location: details.location || need.location || null,
        duration: details.duration || need.duration || null,
        skills: skills || null,
        
        // Handle the different compensation/stipend fields
        compensation: need.compensation || undefined,
        
        // Handle the different extendable fields
        projectTeamSize: details.projectTeamSize || details.teamSize || null,

        // INTERNSHIP FIELDS
        open_for: details.open_for || details.openFor || null,
        fulltime: details.fulltime || null,
        
        // Handle the different contact fields
        contactInfo: details.contactInfo || details.contactInfo || { 
          email: details.contact_email || details.contactEmail || details.projectEmail
          || details.researchEmail || details.csrEmail || 'Not specified', 
          phone: details.contact_phone || details.contactPhone || details.projectPhone || details.researchPhone || details.csrPhone || null,
          cvEmail: cvEmail
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
    const token = localStorage.getItem('token');
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
    const token = localStorage.getItem('token');
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
    <div className="min-h-screen bg-slate-900">
      <Navbarpostlogin />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">View Needs</h1>
          {user && user.role === "STARTUP" && (
            <Button
              onClick={() => navigate('/share-needs')}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Need
            </Button>
          )}
        </div>

        <Tabs value={activeType} onValueChange={handleTabChange}>
          <TabsList className="w-full grid grid-cols-4 bg-slate-800/50 border border-slate-700/50 mb-8">
            {needTypes.map(type => (
              <TabsTrigger 
                key={type.id} 
                value={type.id} 
                className="flex items-center space-x-2 data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300 data-[state=active]:border-purple-500/30"
              >
                <type.icon className="w-4 h-4" />
                <span>{type.label}</span>
              </TabsTrigger>
            ))}
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
                  {/* Map over the 'mapped' needs array */}
                  {needs.map((need) => (
                    <NeedCard 
                      key={need.id} 
                      need={need} 
                      onViewClick={handleViewNeedClick}
                      onEditClick={handleEditClick}
                      onDeleteClick={handleDeleteClick}
                      currentUserId={user?.id} // <-- Pass the logged-in user's ID
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

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// import { NeedCard } from "@/components/ViewNeedsComponent/NeedCard";
// import type { Need } from "@/components/ViewNeedsComponent/NeedCard";
// import { Button } from "@/components/ui/button";
// import { useAuth } from "@/contexts/AuthContext";
// import { Plus, Loader2, Frown, Briefcase, Users, FlaskConical, Heart } from "lucide-react"; 
// import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { NeedDetailsModal } from "@/components/ViewNeedsComponent/NeedDetailModal";

// // --- IMPORT STORE & MODALS ---
// import { useNeedsStore } from "@/store/needsStore";
// import type { BackendNeed } from "@/store/needsStore";
// import { DeleteNeedModal } from "@/components/ViewNeedsComponent/DeleteNeedModal";
// import { EditNeedModal } from "@/components/ViewNeedsComponent/EditNeedModal";
// import toast from "react-hot-toast";

// const needTypes = [
//   { id: 'live_projects', label: 'Live Projects', icon: Briefcase },
//   { id: 'internship', label: 'Internships', icon: Users },
//   { id: 'research', label: 'Research', icon: FlaskConical },
//   { id: 'csr_initiative', label: 'CSR Initiative', icon: Heart },
// ];

// export default function ViewNeedsPage() {
//   const [activeType, setActiveType] = useState('live_projects');
//   const [isLoading, setIsLoading] = useState(false);
  
//   const navigate = useNavigate();
//   const { user } = useAuth();
//   const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

//   // --- GET ALL STATE FROM ZUSTAND STORE ---
//   const { 
//     backendNeeds,
//     setBackendNeeds,
//     isDeleting,
//     isUpdating,
//     deleteNeed,
//     updateNeed
//   } = useNeedsStore();

//   // --- MODAL STATES ---
//   const [selectedNeed, setSelectedNeed] = useState<Need | null>(null);
//   const [needToDelete, setNeedToDelete] = useState<Need | null>(null);
//   const [needToEdit, setNeedToEdit] = useState<Need | null>(null);

//   // --- FETCH NEEDS & POPULATE STORE ---
//   useEffect(() => {
//     const fetchNeeds = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`${apiBase}/api/needs?type=${activeType.toUpperCase()}`);
//         if (!response.ok) throw new Error('Failed to fetch needs.');
        
//         const result = await response.json();
//         setBackendNeeds(result.data.needs as BackendNeed[]); 

//       } catch (error) {
//         console.error('Fetch error:', error);
//         setBackendNeeds([]); 
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchNeeds();
//   }, [activeType, setBackendNeeds]); 

//   console.log("fetched needs", backendNeeds);

//   const needs: Need[] = useMemo(() => {
//     return backendNeeds.map((need: BackendNeed) => {
//       const details = need.details_json || {};
      
//       return {
//         id: need.id,
//         userId: need.user_id,
//         type: need.type.toLowerCase() as Need['type'],
//         title: need.title,
//         description: need.description,
        
//         details_json: details,

//         companyName: details.projectCompanyName || 'OrionEduverse',
//         location: details.location || need.location || null,
//         duration: details.duration || need.duration || null,
//         skills: details.skills || need.skills || null,
        
//         compensation: need.compensation || undefined,
        
//         projectTeamSize: details.projectTeamSize || details.teamSize || null,
        
//         contactInfo: details.contactInfo || { 
//           email: details.contactEmail || details.projectEmail || details.researchEmail || details.csrEmail || 'Not specified', 
//           phone: details.contactPhone || details.projectPhone || details.researchPhone || details.csrPhone || null
//         },
//       };
//     });
//   }, [backendNeeds]);

//   const handleTabChange = (tabId: string) => {
//     setActiveType(tabId);
//   };

//   // --- ALL CLICK HANDLERS ---
//   const handleViewNeedClick = (need: Need) => setSelectedNeed(need);
//   const handleCloseModal = () => setSelectedNeed(null);

//   const handleEditClick = (need: Need) => setNeedToEdit(need);
//   const handleDeleteClick = (need: Need) => setNeedToDelete(need);

//   const handleConfirmDelete = async (needId: number) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error("You are not authenticated.");
//       return;
//     }
    
//     try {
//       await deleteNeed(needId, token);
//       toast.success("Need deleted successfully.");
//       setNeedToDelete(null); 
//     } catch (error: any) {
//       toast.error(error.message || "Failed to delete need.");
//     }
//   };

//   const handleConfirmUpdate = async (needId: number, formType: string, formData: any) => {
//     const token = localStorage.getItem('token');
//     if (!token) {
//       toast.error("You are not authenticated.");
//       return;
//     }

//     try {
//       await updateNeed(needId, formType, formData, token);
//       toast.success("Need updated successfully.");
//       setNeedToEdit(null); 
//     } catch (error: any) {
//       toast.error(error.message || "Failed to update need.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
//       <Navbarpostlogin />
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">View Needs</h1>
//           {user && user.role === "STARTUP" && (
//             <Button
//               onClick={() => navigate('/share-needs')}
//               className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md hover:shadow-lg transition-all"
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add New Need
//             </Button>
//           )}
//         </div>

//         <Tabs value={activeType} onValueChange={handleTabChange}>
//           <TabsList className="w-full grid grid-cols-4 bg-white border border-gray-200 mb-8 shadow-sm">
//             {needTypes.map(type => (
//               <TabsTrigger 
//                 key={type.id} 
//                 value={type.id} 
//                 className="flex items-center space-x-2 data-[state=active]:bg-purple-50 data-[state=active]:text-purple-600 data-[state=active]:border-purple-200 text-gray-600 hover:text-gray-900 transition-colors"
//               >
//                 <type.icon className="w-4 h-4" />
//                 <span>{type.label}</span>
//               </TabsTrigger>
//             ))}
//           </TabsList>

//           {needTypes.map(type => (
//             <TabsContent key={type.id} value={type.id} className="mt-6">
//               {isLoading ? (
//                 <div className="text-center py-12">
//                   <Loader2 className="h-8 w-8 text-blue-600 animate-spin mx-auto mb-4" />
//                   <p className="text-gray-600">Loading needs...</p>
//                 </div>
//               ) : needs.length === 0 ? (
//                 <div className="text-center py-12">
//                   <Frown className="h-12 w-12 text-gray-400 mx-auto mb-4" />
//                   <p className="text-gray-600 text-lg">No needs found for this category.</p>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                   {needs.map((need) => (
//                     <NeedCard 
//                       key={need.id} 
//                       need={need} 
//                       onViewClick={handleViewNeedClick}
//                       onEditClick={handleEditClick}
//                       onDeleteClick={handleDeleteClick}
//                       currentUserId={user?.id}
//                     />
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           ))}
//         </Tabs>
//       </div>
//       <Footer />

//       {/* --- RENDER ALL THREE MODALS --- */}
//       <NeedDetailsModal 
//         need={selectedNeed} 
//         onClose={handleCloseModal} 
//       />

//       <DeleteNeedModal
//         need={needToDelete}
//         onClose={() => setNeedToDelete(null)}
//         onConfirmDelete={handleConfirmDelete}
//         isDeleting={isDeleting}
//       />

//       <EditNeedModal
//         need={needToEdit}
//         onClose={() => setNeedToEdit(null)}
//         onConfirmUpdate={handleConfirmUpdate}
//         isUpdating={isUpdating}
//       />
//     </div>
//   );
// }