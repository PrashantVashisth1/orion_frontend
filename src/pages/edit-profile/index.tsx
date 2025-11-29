

// import { useState } from "react"
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin"
// import EditProfileSidebar from "@/components/edit-profile/sidebar"
// import PersonalInfoSection from "@/components/edit-profile/sections/PersonalInfoSection"
// import BusinessDetailsSection from "@/components/edit-profile/sections/BusinessDetailsSection"
// import CompanyDetailsSection from "@/components/edit-profile/sections/CompanyDetailsSection"
// import InterestsSection from "@/components/edit-profile/sections/InterestsSection"
// import OfferingsSection from "@/components/edit-profile/sections/OfferingsSection"
// import { useAuthStore } from "@/store/authStore"


// import { Button } from "@/components/ui/button"
// import { Loader2 } from "lucide-react"
// import { useStartupProfileContext } from "@/contexts/StartupProfileContext" 
// import { useNavigate } from "react-router-dom"

// export default function EditProfile() {
//   const [activeSection, setActiveSection] = useState("personal-info")
//   const [isSidebarOpen, setIsSidebarOpen] = useState(true)

//   // Get the submit function from the context we built in the previous step
//   const { handleSubmitForReview } = useStartupProfileContext(); 
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const navigate = useNavigate();
//   const { user } = useAuthStore();

//   const toggleSidebar = () => {
//     setIsSidebarOpen(!isSidebarOpen)
//   }

//   const onFinalSubmit = async () => {
//     setIsSubmitting(true);
//     try {
//       // This calls the function from your context
//       // The context handles the API call, toasts, and auth state update
//       await handleSubmitForReview(); 
      
//       // On success, navigate to the pending page
//       navigate('/pending-verification');

//     } catch (error) {
//       // The context hook already showed an error toast.
//       console.error("Submit for review failed in UI:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const renderSection = () => {
//     switch (activeSection) {
//       case "personal-info":
//         return <PersonalInfoSection onSectionChange={setActiveSection} />
//       case "business-details":
//         return <BusinessDetailsSection onSectionChange={setActiveSection} />
//       case "company-details":
//         return <CompanyDetailsSection onSectionChange={setActiveSection} />
//       case "interests":
//         return <InterestsSection onSectionChange={setActiveSection} />
//       case "offerings":
//         return <OfferingsSection onSectionChange={setActiveSection} />
//       default:
//         return <PersonalInfoSection onSectionChange={setActiveSection} />
//     }
//   }

//   return (
//     <div className="min-h-screen w-full bg-slate-900">
//       {/* Navbar with higher z-index */}
//       <div className="relative z-50">
//         <Navbarpostlogin 
//           onSidebarToggle={toggleSidebar}
//           showSidebarButton={true}
//         />
//       </div>
      
//       {/* Sidebar */}
//       <EditProfileSidebar
//         activeSection={activeSection}
//         onSectionChange={setActiveSection}
//         isOpen={isSidebarOpen}
//         onToggle={toggleSidebar}
//       />

//       {/* Main Content - Fixed padding, no dynamic adjustment */}
//       <div className="relative z-10 p-6 px-[204px] py-[60px]">
//         <main className="pb-8 w-full">
//           {renderSection()}
//           {/* --- 4. ADD THE NEW SUBMIT BUTTON BLOCK --- */}
//           {/* Only show this block if the user exists AND is NOT verified */}
//           {user && !user.is_startup_verified && (
//             <div className="mt-10 ml-40 pt-6 border-t-2 border-gray-700">
//               <h3 className="text-xl font-semibold text-white">Submit for Verification</h3>
//               <p className="text-sm text-gray-400 mt-2 mb-4">
//                 Once all 5 sections are complete and saved, click here to submit your profile for manual review by our team.
//               </p>
//               <Button
//                 onClick={onFinalSubmit}
//                 disabled={isSubmitting}
//                 size="lg"
//                 className="bg-blue-600 hover:bg-blue-700 text-white"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
//                     Submitting...
//                   </>
//                 ) : (
//                   'Submit Profile for Review'
//                 )}
//               </Button>
//             </div>
//           )}
//           {/* --- END OF NEW BLOCK --- */}
//         </main>
//       </div>
//     </div>
//   )
// } 

import { useState } from "react"
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin"
import EditProfileSidebar from "@/components/edit-profile/sidebar"
import PersonalInfoSection from "@/components/edit-profile/sections/PersonalInfoSection"
import BusinessDetailsSection from "@/components/edit-profile/sections/BusinessDetailsSection"
import CompanyDetailsSection from "@/components/edit-profile/sections/CompanyDetailsSection"
import InterestsSection from "@/components/edit-profile/sections/InterestsSection"
import OfferingsSection from "@/components/edit-profile/sections/OfferingsSection"
import { useAuthStore } from "@/store/authStore"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useStartupProfileContext } from "@/contexts/StartupProfileContext" 
import { useNavigate } from "react-router-dom"

export default function EditProfile() {
  const [activeSection, setActiveSection] = useState("personal-info")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  const { handleSubmitForReview } = useStartupProfileContext(); 
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen)
  }

  const onFinalSubmit = async () => {
    setIsSubmitting(true);
    try {
      await handleSubmitForReview(); 
      navigate('/pending-verification');
    } catch (error) {
      console.error("Submit for review failed in UI:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSection = () => {
    switch (activeSection) {
      case "personal-info":
        return <PersonalInfoSection onSectionChange={setActiveSection} />
      case "business-details":
        return <BusinessDetailsSection onSectionChange={setActiveSection} />
      case "company-details":
        return <CompanyDetailsSection onSectionChange={setActiveSection} />
      case "interests":
        return <InterestsSection onSectionChange={setActiveSection} />
      case "offerings":
        return <OfferingsSection onSectionChange={setActiveSection} />
      default:
        return <PersonalInfoSection onSectionChange={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen w-full bg-slate-50">
      {/* Navbar with higher z-index */}
      <div className="relative z-50">
        <Navbarpostlogin 
          onSidebarToggle={toggleSidebar}
          showSidebarButton={true}
        />
      </div>
      
      {/* Sidebar */}
      <EditProfileSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
        isOpen={isSidebarOpen}
        onToggle={toggleSidebar}
      />

      {/* Main Content */}
      <div className="relative z-10 p-6 px-[204px] py-[60px]">
        <main className="pb-8 w-full">
          {renderSection()}
          
          {/* Submit Button Block */}
          {user && !user.is_startup_verified && (
            <div className="mt-10 ml-40 pt-6 border-t-2 border-slate-200">
              <h3 className="text-xl font-semibold text-slate-900">Submit for Verification</h3>
              <p className="text-sm text-slate-500 mt-2 mb-4">
                Once all 5 sections are complete and saved, click here to submit your profile for manual review by our team.
              </p>
              <Button
                onClick={onFinalSubmit}
                disabled={isSubmitting}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                    Submitting...
                  </>
                ) : (
                  'Submit Profile for Review'
                )}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}