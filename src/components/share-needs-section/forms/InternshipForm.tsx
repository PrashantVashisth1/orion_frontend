import { FormField } from "../ui/FormField";
import { SectionHeader } from "../ui/SectionHeader";
import { StyledInput } from "../ui/StyledInput";
import { Users } from "lucide-react";
import { StyledTextarea } from "../ui/StyledTextarea";
import { CheckboxGroup } from "../ui/CheckboxGroup";
import { SubmitButton } from "../ui/SubmitButton";

export const InternshipForm = ({
  onSubmit,
  formData,
  handleChange,
  isSubmitting
  // onImageUpload,
  // previewUrl,
  // setPreviewUrl,
}) => {
  const stipendOptions = [
    { id: "unpaid-internship", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-intern-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-intern-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    {
      id: "paid-intern-above-6k",
      label: "Above ₹6,000/month - Please specify",
    },
  ];

  const extendableOptions = [
    { id: "extendable-yes", label: "Yes (Based on performance)" },
    { id: "extendable-no", label: "No (Fixed duration)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Users}
        title="Internship Opportunities"
        description="Post internship opportunities and discover fresh talent for your organization. Build the next generation of professionals."
        gradientFrom="from-blue-500"
        gradientTo="to-cyan-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Maps to 'job_title' */}
        <FormField label="Job Title" id="job_title" required>
          <StyledInput
            id="job_title"
            placeholder="e.g., Frontend Developer Intern, Data Science Intern"
            icon={undefined}
            value={formData.job_title || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* Maps to 'description' */}
        <FormField label="Job Description" id="description" isTextarea required>
          <StyledTextarea
            id="description"
            placeholder="Detail the internship role, daily responsibilities, learning opportunities, mentorship provided, and what the intern will achieve by the end of the program."
            value={formData.description || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* This 'id' won't directly map to a SQL column, but its URL will go into details_json */}
        {/* <ImageUpload
          label="Internship Poster"
          id="internship_image_url" // Renamed ID for clarity of what will be stored
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        /> */}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Maps to 'open_for' */}
          <FormField label="Open For" id="open_for">
            <StyledInput
              id="open_for"
              placeholder="e.g., Engineering students, MBA students"
              icon={undefined}
              value={formData.open_for || ""} // Access formData with the new key
              onChange={handleChange}
            />
          </FormField>
          {/* Maps to 'duration' */}
          <FormField label="Duration" id="duration" required>
            <StyledInput
              id="duration"
              placeholder="e.g., 3 months, 6 months, Summer internship"
              icon={undefined}
              value={formData.duration || ""} // Access formData with the new key
              onChange={handleChange}
            />
          </FormField>
        </div>

        {/* This 'stipend' selection will go into details_json */}
        <FormField label="Stipend" id="stipend">
          <CheckboxGroup
            options={stipendOptions}
            name="stipend"
            type="radio"
            selectedValue={formData.stipend}
            onChange={handleChange}
            formData={formData} // Keep existing formData for CheckboxGroup logic if needed
          />
        </FormField>

        {/* Maps to 'min_skills' */}
        <FormField label="Skills Required" id="min_skills">
          <StyledInput
            id="min_skills"
            placeholder="e.g., HTML/CSS, JavaScript basics, Communication skills"
            icon={undefined}
            value={formData.min_skills || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* This 'extendable' selection will go into details_json */}
        <FormField label="Extendable" id="extendable">
          <CheckboxGroup
            options={extendableOptions}
            name="extendable"
            type="radio"
            selectedValue={formData.extendable}
            onChange={handleChange}
            formData={formData} // Keep existing formData for CheckboxGroup logic if needed
          />
        </FormField>

        {/* Maps to 'fulltime' */}
        <FormField label="Full-Time Opportunity" id="fulltime">
          <StyledInput
            id="fulltime"
            placeholder="e.g., Pre-placement offer available, Conversion based on performance"
            icon={undefined}
            value={formData.fulltime || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* These will be combined into 'contact_intern' on the backend */}
          <FormField label="Email" id="contact_email" required>
            {" "}
            {/* Renamed for clarity */}
            <StyledInput
              id="contact_email"
              placeholder="e.g., hr@company.com"
              type="email"
              icon={undefined}
              value={formData.contact_email || ""} // Access formData with new key
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="contact_phone" required>
            {" "}
            {/* Renamed for clarity */}
            <StyledInput
              id="contact_phone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.contact_phone || ""} // Access formData with new key
              onChange={handleChange}
            />
          </FormField>
        </div>

        {/* This 'internship_cv_email' will go into details_json */}
        <FormField label="Send your CV at" id="internship_cv_email" required>
          {" "}
          {/* Renamed for clarity */}
          <StyledInput
            id="internship_cv_email"
            placeholder="e.g., careers@company.com, hr@company.com"
            type="email"
            icon={undefined}
            value={formData.internship_cv_email || ""} // Access formData with new key
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("internship")}
          gradientFrom="from-blue-600"
          gradientTo="to-cyan-700"
          emoji="💼"
          isLoading={isSubmitting}
          text="POST INTERNSHIP OPPORTUNITY"
        />
      </div>
    </div>
  );
};
