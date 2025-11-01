import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
  isTextarea?: boolean;
  required?: boolean;
}

// Enhanced FormField component with floating labels
export const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  children,
  // isTextarea = false,
  required = false,
}) => (
  <div className="relative group">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-purple-500/50 relative z-10">
      <Label
        htmlFor={id}
        className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2"
      >
        {label}
        {required && <span className="text-xs text-red-400">*</span>}
      </Label>
      {children}
    </div>
  </div>
);