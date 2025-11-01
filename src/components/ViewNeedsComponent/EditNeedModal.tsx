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
    // THIS IS THE FIX:
    // Safely access details_json (which now exists on the Need type)
    setFormData(need?.details_json || {}); 
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