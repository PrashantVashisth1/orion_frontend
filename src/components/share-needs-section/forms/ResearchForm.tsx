import { CheckboxGroup } from "../ui/CheckboxGroup";
import { FormField } from "../ui/FormField";
import { SectionHeader } from "../ui/SectionHeader";
import { StyledInput } from "../ui/StyledInput";
import { StyledTextarea } from "../ui/StyledTextarea";
import { SubmitButton } from "../ui/SubmitButton";
import { FlaskConical } from "lucide-react";

// Research Form Component
export const ResearchForm = ({
  onSubmit,
  formData,
  handleChange,
  isSubmitting
  // onImageUpload,
  // previewUrl,
  // setPreviewUrl,
}) => {
  const stipendOptions = [
    { id: "unpaid-research", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-research-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-research-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    {
      id: "paid-research-above-6k",
      label: "Above ₹6,000/month - Please specify",
    },
  ];

  const extendableOptions = [
    { id: "research-extendable-yes", label: "Yes (Based on findings)" },
    { id: "research-extendable-no", label: "No (Fixed scope)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={FlaskConical}
        title="Research Opportunities"
        description="Share research opportunities and connect with academic talent. Foster innovation and discovery in your field."
        gradientFrom="from-emerald-500"
        gradientTo="to-teal-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Research Title" id="researchTitle" required>
          <StyledInput
            id="researchTitle"
            placeholder="e.g., AI in Healthcare: Predictive Analytics Study"
            icon={undefined}
            value={formData.researchTitle || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Research Description"
          id="researchDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="researchDescription"
            placeholder="Describe the research objectives, methodology, expected outcomes, and how researchers will contribute. Include the problem statement and research questions."
            value={formData.researchDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        {/* <ImageUpload
          label="Research Poster"
          id="researchImage"
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Open For" id="researchOpenFor">
            <StyledInput
              id="researchOpenFor"
              placeholder="e.g., Masters students, PhD candidates, Postdocs"
              icon={undefined}
              value={formData.researchOpenFor || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Duration" id="researchDuration" required>
            <StyledInput
              id="researchDuration"
              placeholder="e.g., 6 months, 1 year, 2-3 years (PhD)"
              icon={undefined}
              value={formData.researchDuration || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Stipend" id="researchStipend">
          <CheckboxGroup
            options={stipendOptions}
            name="researchStipend"
            type="radio"
            selectedValue={formData.researchStipend}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Skills Required" id="researchSkills">
          <StyledInput
            id="researchSkills"
            placeholder="e.g., Python/R, Statistical analysis, Literature review"
            icon={undefined}
            value={formData.researchSkills || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Extendable" id="researchExtendable">
          <CheckboxGroup
            options={extendableOptions}
            name="researchExtendable"
            type="radio"
            selectedValue={formData.researchExtendable}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="researchEmail" required>
            <StyledInput
              id="researchEmail"
              placeholder="e.g., prof.smith@university.edu"
              type="email"
              icon={undefined}
              value={formData.researchEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="researchPhone" required>
            <StyledInput
              id="researchPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.researchPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Send your CV at" id="researchCvEmail" required>
          <StyledInput
            id="researchCvEmail"
            placeholder="e.g., research@university.edu, prof.smith@university.edu"
            type="email"
            icon={undefined}
            value={formData.researchCvEmail || ""}
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("research")}
          gradientFrom="from-emerald-600"
          gradientTo="to-teal-700"
          emoji="🔬"
          isLoading={isSubmitting}
          text="POST RESEARCH OPPORTUNITY"
        />
      </div>
    </div>
  );
};