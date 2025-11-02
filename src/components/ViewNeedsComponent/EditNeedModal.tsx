// src/components/ViewNeedsComponent/EditNeedModal.tsx

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import type { Need } from "./NeedCard"; // <-- Imports the newly fixed interface

// --- IMPORT YOUR SEGREGATED FORMS ---
// (Adjust paths if they are different from your 'share-needs-section' folder)
import { LiveProjectsForm } from "@/components/share-needs-section/forms/LiveProjectsForm";
import { InternshipForm } from "@/components/share-needs-section/forms/InternshipForm";
import { ResearchForm } from "@/components/share-needs-section/forms/ResearchForm";
import { CSRForm } from "@/components/share-needs-section/forms/CSRForm";

interface EditNeedModalProps {
  need: Need | null;
  onClose: () => void;
  onConfirmUpdate: (needId: number, formType: string, formData: any) => void;
  isUpdating: boolean; // <-- Passed from your store
}

export function EditNeedModal({
  need,
  onClose,
  onConfirmUpdate,
  isUpdating,
}: EditNeedModalProps) {
  
  // Local state to manage the form data
  const [formData, setFormData] = useState<Record<string, any>>({});

  // When the 'need' prop changes, update the local form state
  useEffect(() => {
    if (need && need.details_json) {
      // --- THIS IS THE FIX ---
      // 1. Create a copy of the raw details_json
      const cleanedData = { ...need.details_json };

      // 2. Map old camelCase keys to new snake_case keys
      // This handles data that might have 'jobTitle' or 'job_title'
      cleanedData.job_title = cleanedData.jobTitle || cleanedData.job_title;
      cleanedData.min_skills = cleanedData.minSkills || cleanedData.min_skills;
      cleanedData.open_for = cleanedData.openFor || cleanedData.open_for;
      cleanedData.contact_email = cleanedData.contactEmail || cleanedData.contact_email;
      cleanedData.contact_phone = cleanedData.contactPhone || cleanedData.contact_phone;
      cleanedData.internship_cv_email = cleanedData.internshipCvEmail || cleanedData.internship_cv_email;

      // 3. Delete the old camelCase keys to prevent data duplication
      delete cleanedData.jobTitle;
      delete cleanedData.minSkills;
      delete cleanedData.openFor;
      delete cleanedData.contactEmail;
      delete cleanedData.contactPhone;
      delete cleanedData.internshipCvEmail;
      
      // 4. Set the form state with the *cleaned* data
      setFormData(cleanedData);
      // --- END FIX ---
    } else {
      setFormData({}); // Clear form if no need
    }
  }, [need]);

  // Handle changes in the form fields
  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle the save/submit action
  const handleSave = () => {
    if (need) {
      onConfirmUpdate(need.id, need.type, formData);
    }
  };

  // Render the correct form based on the need type
  const renderActiveForm = () => {
    if (!need) return null;

    // These props will be passed to your segregated form components
    const commonProps = {
      // This overrides the form's default onSubmit
      onSubmit: () => handleSave(), 
      formData: formData,
      handleChange: handleChange,
      isSubmitting: isUpdating, // Pass the loading state
    };

    console.log("commonProps", commonProps)

    // Note: The 'image' props are omitted, assuming you'll add them later
    // if you re-enable image uploads on edits.

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
        return <p className="text-red-400">Error: Unknown need type.</p>;
    }
  };


  return (
    <Dialog open={!!need} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-700 text-white w-full max-w-[calc(100%-2rem)] sm:max-w-4xl p-0">
        <DialogHeader className="p-6 pb-4">
          <DialogTitle className="text-2xl font-bold text-white mb-1">
            Edit Need: {need?.title}
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Make changes to your posting. The form is pre-filled
            with your current details.
          </DialogDescription>
        </DialogHeader>

        {/* Scrollable container for the form */}
        <div className="max-h-[70vh] overflow-y-auto">
          {/* This renders the correct form (LiveProjectForm, InternshipForm, etc.)
            and passes the `isSubmitting` prop to its internal SubmitButton.
          */}
          {renderActiveForm()}
        </div>
      </DialogContent>
    </Dialog>
  );
}