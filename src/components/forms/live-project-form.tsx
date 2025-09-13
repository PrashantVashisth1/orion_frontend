import { FormField } from "./form-field"
import { CheckboxGroup } from "./checkbox-group"

export function LiveProjectForm() {
  return (
    <div className="space-y-6">
      <FormField
        id="project-title"
        label="Project Title"
        defaultValue="Quantum Computing Applications in Financial Modeling"
      />

      <FormField
        id="description"
        label="Description"
        type="textarea"
        defaultValue="This project involves exploring the practical applications of quantum algorithms for optimizing financial models, including portfolio optimization, risk assessment, and high-frequency trading strategies. The ideal candidate will work with simulated quantum environments and potentially actual quantum hardware (if available) to develop and test novel approaches. The goal is to identify areas where quantum computing can provide significant speedups or more accurate results compared to classical methods."
      />

      <FormField id="eligibility" label="Eligibility Criteria" />

      <FormField id="mode-work" label="Mode of Work" type="textarea" />

      <FormField id="skills" label="Minimum Skills Required" />

      <CheckboxGroup
        label="Stipend (if any)"
        options={[
          { id: "stipend-paid", label: "Paid" },
          { id: "stipend-unpaid", label: "Unpaid" },
          { id: "stipend-negotiable", label: "Negotiable" },
        ]}
      />

      <FormField id="contact" label="Contact" />
    </div>
  )
}
