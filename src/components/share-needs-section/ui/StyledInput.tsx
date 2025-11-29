// import { Input } from "@/components/ui/input";

// // Enhanced Input component with better styling
// export const StyledInput = ({
//   id,
//   placeholder,
//   icon: Icon,
//   value,
//   onChange,
//   ...props
// }) => (
//   <div className="relative">
//     {Icon && (
//       <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-20" />
//     )}
//     <Input
//       id={id}
//       name={id} // Add name attribute
//       placeholder={placeholder}
//       value={value} // Controlled component
//       onChange={onChange} // Handle change
//       className={`h-14 text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10 ${
//         Icon ? "pl-12" : "pl-4"
//       }`}
//       {...props}
//     />
//   </div>
// );


import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export const StyledInput = ({
  id,
  placeholder,
  icon: Icon,
  value,
  onChange,
  className,
  ...props
}: any) => (
  <div className="relative group">
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5 z-20 group-focus-within:text-violet-600 transition-colors duration-200" />
    )}
    <Input
      id={id}
      name={id}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={cn(
        "h-12 text-base rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 shadow-sm transition-all duration-200",
        "focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 hover:bg-white hover:border-slate-300",
        Icon ? "pl-12" : "pl-4",
        className
      )}
      {...props}
    />
  </div>
);