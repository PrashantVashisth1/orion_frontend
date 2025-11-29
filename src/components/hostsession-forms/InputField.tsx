// import { Input } from '@/components/ui/input';
// import { Textarea } from '@/components/ui/textarea';

// interface InputFieldProps {
//   label: string;
//   type?: string;
//   placeholder?: string;
//   value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
//   required?: boolean;
//   rows?: number;
// }

// const InputField = ({ 
//   label, 
//   type = 'text', 
//   placeholder, 
//   value, 
//   onChange, 
//   required = false, 
//   rows 
// }: InputFieldProps) => (
//   <div className="mb-6">
//     <label className="block text-sm font-medium text-gray-200 mb-3">
//       {label} {required && <span className="text-red-400">*</span>}
//     </label>
//     {type === 'textarea' ? (
//       <Textarea
//         rows={rows || 3}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className="w-full p-4 border border-gray-600 bg-gray-700/80 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//         required={required}
//       />
//     ) : (
//       <Input
//         type={type}
//         placeholder={placeholder}
//         value={value}
//         onChange={onChange}
//         className="w-full p-4 border border-gray-600 bg-gray-700/80 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
//         required={required}
//       />
//     )}
//   </div>
// );

// export default InputField; 


import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement> {
  label: string;
  icon?: React.ElementType;
  textarea?: boolean;
  className?: string; 
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  icon: Icon, 
  textarea = false, 
  className = '',
  ...props 
}) => {
  const baseClasses = `
    w-full bg-slate-50 text-slate-900 border border-slate-200 rounded-xl 
    focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
    placeholder:text-slate-400 transition-all duration-200 outline-none
  `;
  
  const paddingClasses = Icon ? 'pl-11 pr-4 py-3' : 'px-4 py-3';

  return (
    <div className={`space-y-2 ${className}`}>
      <label className="block text-sm font-semibold text-slate-700 ml-1">
        {label} {props.required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute left-3.5 top-3.5 text-slate-400 pointer-events-none">
            <Icon className="w-5 h-5" />
          </div>
        )}
        
        {textarea ? (
          <textarea
            className={`${baseClasses} p-4 min-h-[120px] resize-y`}
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            className={`${baseClasses} ${paddingClasses}`}
            {...(props as React.InputHTMLAttributes<HTMLInputElement>)}
          />
        )}
      </div>
    </div>
  );
};

export default InputField;