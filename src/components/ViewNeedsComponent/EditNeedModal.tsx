// import { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import type { Need } from "./NeedCard";

// // Import your segregated forms
// import { LiveProjectsForm } from "@/components/share-needs-section/forms/LiveProjectsForm";
// import { InternshipForm } from "@/components/share-needs-section/forms/InternshipForm";
// import { ResearchForm } from "@/components/share-needs-section/forms/ResearchForm";
// import { CSRForm } from "@/components/share-needs-section/forms/CSRForm";

// // --- NEW HELPER 1 ---
// // Helper to get the correct image URL from the need object
// const getImageUrlFromNeed = (need: Need) => {
//   if (!need?.details_json) return null;
//   switch (need.type) {
//     case 'live_projects':
//       return need.details_json.LiveProjectsImage;
//     case 'internship':
//       return need.details_json.InternshipImage;
//     case 'research':
//       return need.details_json.ResearchImage;
//     case 'csr_initiative':
//       return need.details_json.CsrInitiativeImage;
//     default:
//       return null;
//   }
// };

// // --- NEW HELPER 2 ---
// // Helper to get the correct image key for formData
// const getImageKeyForFormType = (formType: string) => {
//   switch (formType) {
//     case 'live_projects':
//       return 'LiveProjectsImage';
//     case 'internship':
//       return 'InternshipImage';
//     case 'research':
//       return 'ResearchImage';
//     case 'csr_initiative':
//       return 'CsrInitiativeImage';
//     default:
//       return null;
//   }
// };

// interface EditNeedModalProps {
//   need: Need | null;
//   onClose: () => void;
//   onConfirmUpdate: (needId: number, formType: string, formData: any) => void;
//   isUpdating: boolean;
// }

// export function EditNeedModal({
//   need,
//   onClose,
//   onConfirmUpdate,
//   isUpdating,
// }: EditNeedModalProps) {
//   const [formData, setFormData] = useState<Record<string, any>>({});
  
//   // --- NEW STATE ---
//   // State to manage the image preview URL
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   useEffect(() => {
//     if (need && need.details_json) {
//       // Your existing data cleaning logic is correct
//       const cleanedData = { ...need.details_json };
//       cleanedData.job_title = cleanedData.jobTitle || cleanedData.job_title;
//       cleanedData.min_skills = cleanedData.minSkills || cleanedData.min_skills;
//       // ... (add any other key mappings you need) ...
      
//       setFormData(cleanedData);

//       // --- NEW ---
//       // Set the initial preview URL from the need
//       const imageUrl = getImageUrlFromNeed(need);
//       setPreviewUrl(imageUrl);
//       // --- END NEW ---

//     } else {
//       setFormData({});
//       setPreviewUrl(null); // Clear form and preview if no need
//     }
//   }, [need]);

//   const handleChange = (
//     e:
//       | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//       | { target: { name: string; value: any } }
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };
  
//   // --- NEW FUNCTION ---
//   // Handles image upload/removal from the ImageUpload component
//   const handleImageUpload = (imageData: {
//     file: File | null;
//     url: string | null;
//     id: string; // e.g., 'live-projectsImage'
//   }) => {
//     if (!need) return;

//     // 1. Update the visual preview
//     setPreviewUrl(imageData.url);

//     // 2. Get the correct key for this form type (e.g., 'LiveProjectsImage')
//     const imageKey = getImageKeyForFormType(need.type);
//     if (!imageKey) return;

//     // 3. Update the main formData state so this URL change is saved
//     setFormData((prev) => ({
//       ...prev,
//       [imageKey]: imageData.url,
//     }));
//   };
//   // --- END NEW FUNCTION ---

//   const handleSave = () => {
//     if (need) {
//       onConfirmUpdate(need.id, need.type, formData);
//     }
//   };

//   const renderActiveForm = () => {
//     if (!need) return null;

//     // --- UPDATED ---
//     // Add the new image props to commonProps
//     const commonProps = {
//       onSubmit: () => handleSave(),
//       formData: formData,
//       handleChange: handleChange,
//       isSubmitting: isUpdating,
      
//       // These are the two props that were missing
//       onImageUpload: handleImageUpload,
//       previewUrl: previewUrl, 
//     };
//     // --- END UPDATED ---

//     // Now, passing {...commonProps} will satisfy the forms' prop types
//     switch (need.type) {
//       case "live_projects":
//         return <LiveProjectsForm {...commonProps} />;
//       case "internship":
//         return <InternshipForm {...commonProps} />;
//       case "research":
//         return <ResearchForm {...commonProps} />;
//       case "csr_initiative":
//         return <CSRForm {...commonProps} />;
//       default:
//         return <p className="text-red-400">Error: Unknown need type.</p>;
//     }
//   };

//   return (
//     <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
//       <DialogContent className="bg-slate-900 border-slate-700 text-white w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0">
//         <DialogHeader className="p-6 pb-4">
//           <DialogTitle className="text-2xl font-bold text-white mb-1">
//             Edit Need: {need?.title}
//           </DialogTitle>
//           <DialogDescription className="text-slate-400">
//             Make changes to your posting. The form is pre-filled with your
//             current details.
//           </DialogDescription>
//         </DialogHeader>

//         <div className="max-h-[70vh] overflow-y-auto">
//           {renderActiveForm()}
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }


import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Need } from "./NeedCard";
import { X } from "lucide-react";

// Import your segregated forms
import { LiveProjectsForm } from "@/components/share-needs-section/forms/LiveProjectsForm";
import { InternshipForm } from "@/components/share-needs-section/forms/InternshipForm";
import { ResearchForm } from "@/components/share-needs-section/forms/ResearchForm";
import { CSRForm } from "@/components/share-needs-section/forms/CSRForm";

// Helper to get the correct image URL from the need object
const getImageUrlFromNeed = (need: Need) => {
  if (!need?.details_json) return null;
  switch (need.type) {
    case 'live_projects':
      return need.details_json.LiveProjectsImage;
    case 'internship':
      return need.details_json.InternshipImage;
    case 'research':
      return need.details_json.ResearchImage;
    case 'csr_initiative':
      return need.details_json.CsrInitiativeImage;
    default:
      return null;
  }
};

// Helper to get the correct image key for formData
const getImageKeyForFormType = (formType: string) => {
  switch (formType) {
    case 'live_projects':
      return 'LiveProjectsImage';
    case 'internship':
      return 'InternshipImage';
    case 'research':
      return 'ResearchImage';
    case 'csr_initiative':
      return 'CsrInitiativeImage';
    default:
      return null;
  }
};

interface EditNeedModalProps {
  need: Need | null;
  onClose: () => void;
  onConfirmUpdate: (needId: number, formType: string, formData: any) => void;
  isUpdating: boolean;
}

export function EditNeedModal({
  need,
  onClose,
  onConfirmUpdate,
  isUpdating,
}: EditNeedModalProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    if (need && need.details_json) {
      const cleanedData = { ...need.details_json };
      cleanedData.job_title = cleanedData.jobTitle || cleanedData.job_title;
      cleanedData.min_skills = cleanedData.minSkills || cleanedData.min_skills;
      
      setFormData(cleanedData);
      const imageUrl = getImageUrlFromNeed(need);
      setPreviewUrl(imageUrl);
    } else {
      setFormData({});
      setPreviewUrl(null);
    }
  }, [need]);

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
    if (!need) return;

    setPreviewUrl(imageData.url);

    const imageKey = getImageKeyForFormType(need.type);
    if (!imageKey) return;

    setFormData((prev) => ({
      ...prev,
      [imageKey]: imageData.url,
    }));
  };

  const handleSave = () => {
    if (need) {
      onConfirmUpdate(need.id, need.type, formData);
    }
  };

  const renderActiveForm = () => {
    if (!need) return null;

    const commonProps = {
      onSubmit: () => handleSave(),
      formData: formData,
      handleChange: handleChange,
      isSubmitting: isUpdating,
      onImageUpload: handleImageUpload,
      previewUrl: previewUrl, 
    };

    switch (need.type) {
      case "live_projects":
        return <LiveProjectsForm {...commonProps} />;
      case "internship":
        return <InternshipForm {...commonProps} />;
      case "research":
        return <ResearchForm {...commonProps} />;
      case "csr_initiative":
        return <CSRForm {...commonProps} />;
      default:
        return <p className="text-red-500 p-4">Error: Unknown need type.</p>;
    }
  };

  return (
    <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      {/* Light Theme Styles */}
      <DialogContent className="bg-white border-slate-200 text-slate-900 w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 z-50 p-2 bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5 text-blue-700" />
        </button>

        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-slate-100">
          <DialogTitle className="text-2xl font-bold text-slate-900 mb-1">
            Edit Need: <span className="text-blue-600">{need?.title}</span>
          </DialogTitle>
          <DialogDescription className="text-slate-500">
            Make changes to your posting. The form is pre-filled with your current details.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable Content Area */}
        <div className="max-h-[75vh] overflow-y-auto bg-slate-50/50 px-6 pb-8 pt-4">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-1">
             {renderActiveForm()}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}