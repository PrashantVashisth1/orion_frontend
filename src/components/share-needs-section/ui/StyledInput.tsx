import { Input } from "@/components/ui/input";

// Enhanced Input component with better styling
export const StyledInput = ({
  id,
  placeholder,
  icon: Icon,
  value,
  onChange,
  ...props
}) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-20" />
    )}
    <Input
      id={id}
      name={id} // Add name attribute
      placeholder={placeholder}
      value={value} // Controlled component
      onChange={onChange} // Handle change
      className={`h-14 text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10 ${
        Icon ? "pl-12" : "pl-4"
      }`}
      {...props}
    />
  </div>
);