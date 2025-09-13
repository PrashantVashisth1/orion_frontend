import { FormField } from "./form-field"
import { CheckboxGroup } from "./checkbox-group"

export function ResearchForm() {
  return (
    <div className="space-y-6">
      <FormField id="research-title" label="Job Title" />

      <FormField id="research-desc" label="Description" type="textarea" />

      <FormField id="research-open" label="Open for" />

      <CheckboxGroup
        label="Stipend"
        options={[
          { id: "research-paid", label: "Paid" },
          { id: "research-unpaid", label: "Unpaid" },
          { id: "research-negotiable", label: "Negotiable" },
        ]}
      />

      <FormField id="research-skills" label="Minimum Skills Required" />

      <FormField id="research-duration" label="Duration" />

      <CheckboxGroup
        label="Extendable"
        options={[
          { id: "research-ext-yes", label: "Yes" },
          { id: "research-ext-no", label: "No" },
        ]}
        type="radio"
      />

      <FormField id="research-contact" label="Contact" />
    </div>
  )
}
