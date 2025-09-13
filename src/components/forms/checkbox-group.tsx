import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

interface CheckboxOption {
  id: string
  label: string
}

interface CheckboxGroupProps {
  label: string
  options: CheckboxOption[]
  type?: "checkbox" | "radio"
}

export function CheckboxGroup({ label, options, type = "checkbox" }: CheckboxGroupProps) {
  return (
    <div className="space-y-2">
      <Label className="text-gray-900 font-medium">{label}</Label>
      <div className="bg-white border border-gray-200 rounded-md p-4 space-y-3">
        {options.map((option) => (
          <div key={option.id} className="flex items-center space-x-2">
            <Checkbox
              id={option.id}
              type={type === "radio" ? "radio" : "checkbox"}
              name={type === "radio" ? label.toLowerCase().replace(/\s+/g, "-") : undefined}
            />
            <Label htmlFor={option.id} className="text-sm">
              {option.label}
            </Label>
          </div>
        ))}
      </div>
    </div>
  )
}
