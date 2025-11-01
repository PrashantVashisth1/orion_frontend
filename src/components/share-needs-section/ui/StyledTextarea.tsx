import { Textarea } from "@/components/ui/textarea";

// Enhanced Textarea component
export const StyledTextarea = ({ id, placeholder, value, onChange, ...props }) => (
  <Textarea
    id={id}
    name={id} // Add name attribute
    placeholder={placeholder}
    value={value} // Controlled component
    onChange={onChange} // Handle change
    className="h-[160px] text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 resize-none bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10"
    {...props}
  />
);