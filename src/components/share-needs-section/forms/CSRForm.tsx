import { CheckboxGroup } from "../ui/CheckboxGroup";
import { FormField } from "../ui/FormField";
import { ImageUpload } from "../ui/ImageUpload";
import { SectionHeader } from "../ui/SectionHeader";
import { StyledInput } from "../ui/StyledInput";
import { StyledTextarea } from "../ui/StyledTextarea";
import { SubmitButton } from "../ui/SubmitButton";
import { Heart } from "lucide-react";

// CSR Initiative Form Component
export const CSRForm = ({
  onSubmit,
  formData,
  handleChange,
  isSubmitting,
  onImageUpload,
  previewUrl,
  // setPreviewUrl,
}) => {
  const modeOptions = [
    { id: "online-csr", label: "Online" },
    { id: "offline-csr", label: "Offline" },
    { id: "hybrid-csr", label: "Hybrid" },
  ];

  const stipendOptions = [
    { id: "unpaid-csr", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-csr-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-csr-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    { id: "paid-csr-above-6k", label: "Above ₹6,000/month - Please specify" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Heart}
        title="CSR Initiative"
        description="Create meaningful social impact through corporate social responsibility programs. Make a difference in communities and society."
        gradientFrom="from-rose-500"
        gradientTo="to-pink-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Initiative Type" id="initiativeType" required>
          <StyledInput
            id="initiativeType"
            placeholder="e.g., Education Support, Environmental Conservation, Healthcare Access"
            icon={undefined}
            value={formData.initiativeType || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Initiative Description"
          id="csrDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="csrDescription"
            placeholder="Describe the social impact initiative, target beneficiaries, expected outcomes, and how volunteers will contribute. Include the problem being addressed and the solution approach."
            value={formData.csrDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        <ImageUpload
          label="CSR Poster"
          id="csr-initiativeImage"
          onImageUpload={onImageUpload}
          previewUrl={previewUrl}
          // setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Duration" id="csrDuration" required>
            <StyledInput
              id="csrDuration"
              placeholder="e.g., 3 months, 6 months, Ongoing program"
              icon={undefined}
              value={formData.csrDuration || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Team Size" id="members">
            <StyledInput
              id="members"
              placeholder="e.g., 5-10 volunteers, 20+ team members"
              icon={undefined}
              value={formData.members || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Mode of Work" id="mode">
          <CheckboxGroup
            options={modeOptions}
            name="mode"
            type="radio"
            selectedValue={formData.mode}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Stipend" id="csrStipend">
          <CheckboxGroup
            options={stipendOptions}
            name="csrStipend"
            type="radio"
            selectedValue={formData.csrStipend}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Compensation (Free Text)" id="csrCompensation">
            <StyledInput
              id="csrCompensation"
              placeholder="e.g., Travel reimbursement, Meals provided, Certificate"
              icon={undefined}
              value={formData.csrCompensation || ""}
              onChange={handleChange}
            />
          </FormField>
          {/* Location field as a simple input. Backend will use modeLocation if available, else location */}
          <FormField label="Location (e.g., City, State, Remote)" id="location">
            <StyledInput
              id="location"
              placeholder="e.g., Mumbai, Maharashtra, Remote/Online"
              icon={undefined}
              value={formData.location || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="csrEmail" required>
            <StyledInput
              id="csrEmail"
              placeholder="e.g., csr@company.com"
              type="email"
              icon={undefined}
              value={formData.csrEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="csrPhone" required>
            <StyledInput
              id="csrPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.csrPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <SubmitButton
          onClick={() => onSubmit("csr_initiative")}
          gradientFrom="from-rose-600"
          gradientTo="to-pink-700"
          emoji="❤️"
          isLoading={isSubmitting}
          text="POST CSR INITIATIVE"
        />
      </div>
    </div>
  );
};