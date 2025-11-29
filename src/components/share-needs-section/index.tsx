// "use client";
// import { useNeedsStore, createAndAddActivityPost } from "@/store/needsStore";
// import { useState, useEffect } from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";

// // Import your refactored components
// import { MainHeader } from "./MainHeader";
// import { AnimatedBackground } from "./AnimatedBackground";
// import { LiveProjectsForm } from "./forms/LiveProjectsForm";
// import { InternshipForm } from "./forms/InternshipForm";
// import { ResearchForm } from "./forms/ResearchForm";
// import { CSRForm } from "./forms/CSRForm";

// export default function ShareNeedsSection() {
//   const [activeTab, setActiveTab] = useState("live-projects");
//   const [formData, setFormData] = useState<Record<string, any>>({});
//   const [uploadedImages, setUploadedImages] = useState<
//     Record<string, string | null>
//   >({});
//   const navigate = useNavigate();

//   // 1. Get IS_SUBMITTING state from the store
//   const { isSubmitting, setSubmitting, addBackendNeed, setError } =
//     useNeedsStore();

//   // Reset form data and image previews when the active tab changes
//   useEffect(() => {
//     setFormData({});
//     setUploadedImages({});
//   }, [activeTab]);

//   const handleChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//       | { target: { name: string; value: any } }
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (imageData: {
//     file: File | null;
//     url: string | null;
//     id: string;
//   }) => {
//     // --- ADD THESE DEBUG LINES ---
//     const expectedKey = `${activeTab}Image`;
//     console.log("--- ImageUpload Parent Debug ---");
//     console.log("Active Tab:", activeTab);
//     console.log("Expected Key for State:", expectedKey);
//     console.log("Received ID from Child:", imageData.id);
//     console.log("Do they match?", expectedKey === imageData.id);
//     console.log("---------------------------------");
//     // --- END DEBUG LINES ---
//     setUploadedImages((prev) => ({
//       ...prev,
//       [imageData.id]: imageData.url,
//     }));

//     const formTypePrefix = activeTab
//       .split("-")
//       .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
//       .join("");
//     const backendImageKey = `${formTypePrefix}Image`;

//     setFormData((prev) => ({
//       ...prev,
//       [backendImageKey]: imageData.url,
//     }));
//   };

//   // 2. Updated handleSubmit function
//   const handleSubmit = async (formType: string) => {
//     console.log(`Submitting ${formType} form`);
    
//     // REMOVED: const finalFormData = { ...formData, companyName: "OrionEduverse" };
//     // This should be handled by your backend based on the authenticated user.
//     // We will just send the formData.
    
//     console.log("Form Data to send to backend:", formData);
//     const token = localStorage.getItem("token");
//     console.log("Authorization Token:", token);

//     // Set submitting state
//     setSubmitting(true);
//     setError(null);

//     try {
//       const response = await fetch(`${import.meta.env.VITE_API_BASE}/needs`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           ...(token && { Authorization: `Bearer ${token}` }),
//         },
//         body: JSON.stringify({
//           formType, // e.g., 'live-projects'
//           formData: formData, // The state object
//         }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         if (result.data && result.data.need) {
//           addBackendNeed(result.data.need);
//         }
//         createAndAddActivityPost(formType, formData);

//         toast.success(`${formType.replace("-", " ").toUpperCase()} posted successfully!`);
//         navigate("/view-needs");
//         setFormData({});
//         setUploadedImages({});
//       } else {
//         const errorData = await response.json();
//         console.error(
//           "Failed to send data to backend:",
//           response.status,
//           errorData
//         );
//         setError(errorData.message || response.statusText);
//         toast.error(`Error: ${errorData.message || response.statusText}`);
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       const errorMessage = (error instanceof Error) ? error.message : "An unexpected error occurred.";
//       setError(
//         "An unexpected error occurred. Please check your internet connection and try again."
//       );
//       toast.error(errorMessage);
//     } finally {
//       // This ensures the button re-enables even if there's an error
//       setSubmitting(false);
//     }
//   };

//   const renderActiveForm = () => {
//     const commonProps = {
//       onSubmit: handleSubmit,
//       formData: formData,
//       handleChange: handleChange,
//       onImageUpload: handleImageUpload,
      
//       // 3. Pass the loading state down to the forms
//       isSubmitting: isSubmitting, 

//       previewUrl: uploadedImages[`${activeTab}Image`] || null,
//       setPreviewUrl: (url: string | null) =>
//         handleImageUpload({ file: null, url: url, id: `${activeTab}Image` }),
//     };

//     switch (activeTab) {
//       case "live-projects":
//         return <LiveProjectsForm {...commonProps} />;
//       case "internship":
//         return <InternshipForm {...commonProps} />;
//       case "research":
//         return <ResearchForm {...commonProps} />;
//       case "csr-initiative":
//         return <CSRForm {...commonProps} />;
//       default:
//         return <LiveProjectsForm {...commonProps} />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative font-inter">
//       <AnimatedBackground />
//       <Navbarpostlogin />
//       <div className="relative z-10 p-6 px-[100px] py-[60px]">
//         <div className="mx-auto max-w-7xl">
//           <Card className="overflow-hidden shadow-2xl border-0 bg-gray-800/90 backdrop-blur-lg border-gray-700/50 relative z-20 rounded-xl">
//             <MainHeader activeTab={activeTab} onTabChange={setActiveTab} />
//             <CardContent className="p-0 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm relative z-30 overflow-hidden">
//               {renderActiveForm()}
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useNeedsStore, createAndAddActivityPost } from "@/store/needsStore";
import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

// Import your components
import { MainHeader } from "./MainHeader";
import { AnimatedBackground } from "./AnimatedBackground";
import { LiveProjectsForm } from "./forms/LiveProjectsForm";
import { InternshipForm } from "./forms/InternshipForm";
import { ResearchForm } from "./forms/ResearchForm";
import { CSRForm } from "./forms/CSRForm";

export default function ShareNeedsSection() {
  const [activeTab, setActiveTab] = useState("live-projects");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, string | null>
  >({});
  const navigate = useNavigate();

  const { isSubmitting, setSubmitting, addBackendNeed, setError } =
    useNeedsStore();

  // Reset form data and image previews when the active tab changes
  useEffect(() => {
    setFormData({});
    setUploadedImages({});
  }, [activeTab]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageData: {
    file: File | null;
    url: string | null;
    id: string;
  }) => {
    setUploadedImages((prev) => ({
      ...prev,
      [imageData.id]: imageData.url,
    }));

    const formTypePrefix = activeTab
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");
    const backendImageKey = `${formTypePrefix}Image`;

    setFormData((prev) => ({
      ...prev,
      [backendImageKey]: imageData.url,
    }));
  };

  const handleSubmit = async (formType: string) => {
    console.log(`Submitting ${formType} form`);
    console.log("Form Data to send to backend:", formData);
    const token = localStorage.getItem("token");

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/needs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          formType,
          formData: formData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        if (result.data && result.data.need) {
          addBackendNeed(result.data.need);
        }
        createAndAddActivityPost(formType, formData);

        toast.success(`${formType.replace("-", " ").toUpperCase()} posted successfully!`);
        navigate("/view-needs");
        setFormData({});
        setUploadedImages({});
      } else {
        const errorData = await response.json();
        console.error("Failed to send data to backend:", response.status, errorData);
        setError(errorData.message || response.statusText);
        toast.error(`Error: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      const errorMessage = (error instanceof Error) ? error.message : "An unexpected error occurred.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const renderActiveForm = () => {
    const commonProps = {
      onSubmit: handleSubmit,
      formData: formData,
      handleChange: handleChange,
      onImageUpload: handleImageUpload,
      isSubmitting: isSubmitting,
      previewUrl: uploadedImages[`${activeTab}Image`] || null,
      setPreviewUrl: (url: string | null) =>
        handleImageUpload({ file: null, url: url, id: `${activeTab}Image` }),
    };

    switch (activeTab) {
      case "live-projects":
        return <LiveProjectsForm {...commonProps} />;
      case "internship":
        return <InternshipForm {...commonProps} />;
      case "research":
        return <ResearchForm {...commonProps} />;
      case "csr-initiative":
        return <CSRForm {...commonProps} />;
      default:
        return <LiveProjectsForm {...commonProps} />;
    }
  };

  return (
    // Updated container to light theme (bg-slate-50)
    <div className="min-h-screen bg-slate-50 relative font-inter pb-20">
      <AnimatedBackground />
      <Navbarpostlogin />
      
      <div className="relative z-10 p-6 px-4 sm:px-6 lg:px-8 py-10">
        <div className="mx-auto max-w-6xl">
          {/* Updated Card to white background with light border */}
          <Card className="overflow-hidden shadow-xl border border-slate-200 bg-white relative z-20 rounded-2xl">
            <MainHeader activeTab={activeTab} onTabChange={setActiveTab} />
            <CardContent className="p-0 relative z-30 overflow-hidden">
              {renderActiveForm()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}