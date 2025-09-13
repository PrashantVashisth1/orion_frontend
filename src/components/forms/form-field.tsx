import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface FormFieldProps {
  id: string
  label: string
  type?: "input" | "textarea"
  placeholder?: string
  defaultValue?: string
}

export function FormField({ id, label, type = "input", placeholder, defaultValue }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-gray-900 font-medium">
        {label}
      </Label>
      {type === "textarea" ? (
        <Textarea
          id={id}
          className="bg-white border-gray-200 min-h-32"
          placeholder={placeholder}
          defaultValue={defaultValue}
        />
      ) : (
        <Input id={id} className="bg-white border-gray-200" placeholder={placeholder} defaultValue={defaultValue} />
      )}
    </div>
  )
}
