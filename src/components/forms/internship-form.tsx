import { FormField } from "./form-field"
import { CheckboxGroup } from "./checkbox-group"

export function InternshipForm() {
  return (
    <div className="space-y-6">
      <FormField id="job-title" label="Job Title" />

      <FormField id="description" label="Description" type="textarea" />

      <FormField id="open-for" label="Open for" />

      <CheckboxGroup
        label="Stipend"
        options={[
          { id: "stipend-paid", label: "Paid" },
          { id: "stipend-unpaid", label: "Unpaid" },
          { id: "stipend-negotiable", label: "Negotiable" },
        ]}
      />

      <FormField id="min-skills" label="Minimum Skills Required" />

      <FormField id="duration" label="Duration" />

      <CheckboxGroup
        label="Extendable"
        options={[
          { id: "extendable-yes", label: "Yes" },
          { id: "extendable-no", label: "No" },
        ]}
        type="radio"
      />

      <FormField id="fulltime" label="Full time opportunity" />

      <FormField id="contact-intern" label="Contact" />
    </div>
  )
}
