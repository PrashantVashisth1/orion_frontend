import { FormField } from "./form-field"
import { CheckboxGroup } from "./checkbox-group"

export function CSRForm() {
  return (
    <div className="space-y-6">
      <FormField id="initiative-type" label="Type of initiative" />

      <FormField id="project-desc" label="Project Description" type="textarea" />

      <FormField id="csr-duration" label="Duration" />

      <CheckboxGroup
        label="Mode"
        options={[
          { id: "mode-online", label: "Online" },
          { id: "mode-offline", label: "Offline" },
          { id: "mode-hybrid", label: "Hybrid" },
        ]}
      />

      <FormField id="members" label="No. of members" />

      <FormField id="compensation" label="Compensation (if any)" />

      <FormField id="location" label="Location" />

      <FormField id="csr-contact" label="Contact" />
    </div>
  )
}
