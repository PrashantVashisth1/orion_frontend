// import { Textarea } from "@/components/ui/textarea";

// // Enhanced Textarea component
// export const StyledTextarea = ({ id, placeholder, value, onChange, ...props }) => (
//   <Textarea
//     id={id}
//     name={id} // Add name attribute
//     placeholder={placeholder}
//     value={value} // Controlled component
//     onChange={onChange} // Handle change
//     className="h-[160px] text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 resize-none bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10"
//     {...props}
//   />
// );

import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const StyledTextarea = ({
  id,
  placeholder,
  value,
  onChange,
  className,
  ...props
}: any) => (
  <Textarea
    id={id}
    name={id}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className={cn(
      "min-h-[140px] text-base rounded-xl border-slate-200 bg-slate-50 text-slate-900 placeholder:text-slate-400 shadow-sm p-4 resize-y transition-all duration-200",
      "focus:bg-white focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10 hover:bg-white hover:border-slate-300",
      className
    )}
    {...props}
  />
);