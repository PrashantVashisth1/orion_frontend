import { Briefcase } from "lucide-react";

// Import your new UI components
import { FormField } from "../ui/FormField";
import { StyledInput } from "../ui/StyledInput";
import { StyledTextarea } from "../ui/StyledTextarea";
import { CheckboxGroup } from "../ui/CheckboxGroup";
import { SectionHeader } from "../ui/SectionHeader";
import { SubmitButton } from "../ui/SubmitButton";
import { ImageUpload } from "../ui/ImageUpload";



export const LiveProjectsForm = ({
  onSubmit,
  formData,
  handleChange,
  isSubmitting,
  onImageUpload,
  previewUrl,
  // setPreviewUrl,
}) => {
  const modeOptions = [
    { id: "online-project", label: "Online" },
    { id: "offline-project", label: "Offline" },
    { id: "hybrid-project", label: "Hybrid" },
  ];

  const compensationOptions = [
    { id: "unpaid-project", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    { id: "paid-above-6k", label: "Above ₹6,000/month - Please specify" },
  ];

  const extendableOptions = [
    { id: "project-extendable-yes", label: "Yes (Based on milestones)" },
    { id: "project-extendable-no", label: "No (Fixed scope)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Briefcase}
        title="Live Projects"
        description="Share your ongoing projects and find the right talent to collaborate. Connect with skilled professionals who can bring your vision to life."
        gradientFrom="from-violet-500"
        gradientTo="to-purple-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Project Title" id="projectTitle" required>
          <StyledInput
            id="projectTitle"
            placeholder="e.g., AI-Powered Customer Analytics Dashboard"
            icon={undefined}
            value={formData.projectTitle || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Project Description"
          id="projectDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="projectDescription"
            placeholder="Describe the project scope, objectives, technologies involved, expected deliverables, and timeline. Include details about the team structure and collaboration expectations."
            value={formData.projectDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        <ImageUpload
          label="Project Image/Poster"
          id="live-projectsImage"
          onImageUpload={onImageUpload}
          previewUrl={previewUrl}
          // setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Skills Required" id="projectSkills" required>
            <StyledInput
              id="projectSkills"
              placeholder="e.g., React, Node.js, Python, UI/UX Design"
              icon={undefined}
              value={formData.projectSkills || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Duration" id="projectDuration" required>
            <StyledInput
              id="projectDuration"
              placeholder="e.g., 2 months, 6 months, 1 year"
              icon={undefined}
              value={formData.projectDuration || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Mode of Work" id="projectMode">
          <CheckboxGroup
            options={modeOptions}
            name="projectMode"
            type="radio"
            selectedValue={formData.projectMode}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Team Size" id="projectTeamSize">
            <StyledInput
              id="projectTeamSize"
              placeholder="e.g., 3-5 developers, 10+ team members"
              icon={undefined}
              value={formData.projectTeamSize || ""}
              onChange={handleChange}
            />
          </FormField>
          {/* Location field as a simple input. Backend will use projectModeLocation if available, else projectLocation */}
          <FormField
            label="Location (e.g., Mumbai, Maharashtra, Remote/Online)"
            id="projectLocation"
          >
            <StyledInput
              id="projectLocation"
              placeholder="e.g., Mumbai, Maharashtra, Remote/Online"
              icon={undefined}
              value={formData.projectLocation || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Compensation" id="projectCompensation">
          <CheckboxGroup
            options={compensationOptions}
            name="projectCompensation"
            type="radio"
            selectedValue={formData.projectCompensation}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Project Extendable" id="projectExtendable">
          <CheckboxGroup
            options={extendableOptions}
            name="projectExtendable"
            type="radio"
            selectedValue={formData.projectExtendable}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="projectEmail" required>
            <StyledInput
              id="projectEmail"
              placeholder="e.g., project@company.com"
              type="email"
              icon={undefined}
              value={formData.projectEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="projectPhone" required>
            <StyledInput
              id="projectPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.projectPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Send your CV at" id="projectCvEmail" required>
          <StyledInput
            id="projectCvEmail"
            placeholder="e.g., careers@company.com, hr@company.com"
            type="email"
            icon={undefined}
            value={formData.projectCvEmail || ""}
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("live_projects")}
          isLoading={isSubmitting}
          gradientFrom="from-violet-600"
          gradientTo="to-purple-700"
          emoji="🚀"
          text="POST PROJECT"
        />
      </div>
    </div>
  );
};