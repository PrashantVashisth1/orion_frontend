// import { StyledInput } from "./StyledInput";
// import { Label } from "@/components/ui/label";
// import { Checkbox } from "@/components/ui/checkbox";

// // Enhanced Checkbox Group component
// export const CheckboxGroup = ({
//   options,
//   name,
//   type = "checkbox",
//   selectedValue,
//   onChange,
//   formData,
// }) => {
//   return (
//     <div className="space-y-4">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         {options.map((option) => (
//           <div key={option.id} className="group">
//             <div
//               className="flex items-center space-x-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-4 rounded-xl border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-md cursor-pointer"
//               onClick={() =>
//                 type === "radio" &&
//                 onChange({ target: { name, value: option.id } })
//               }
//             >
//               {type === "radio" ? (
//                 <input
//                   type="radio"
//                   id={option.id}
//                   name={name}
//                   value={option.id}
//                   checked={selectedValue === option.id}
//                   onChange={() => {}} // Handled by onClick on parent div
//                   className="w-5 h-5 text-purple-500 bg-gray-700 border-2 border-gray-500 focus:ring-purple-500 focus:ring-2"
//                 />
//               ) : (
//                 <Checkbox
//                   id={option.id}
//                   checked={selectedValue && selectedValue.includes(option.id)} // For multiple checkboxes
//                   onCheckedChange={(checked) => {
//                     if (checked) {
//                       onChange({
//                         target: {
//                           name,
//                           value: [...(selectedValue || []), option.id],
//                         },
//                       });
//                     } else {
//                       onChange({
//                         target: {
//                           name,
//                           value: (selectedValue || []).filter(
//                             (item) => item !== option.id
//                           ),
//                         },
//                       });
//                     }
//                   }}
//                   className="border-2 border-gray-500 w-5 h-5 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
//                 />
//               )}
//               <Label
//                 htmlFor={option.id}
//                 className="text-sm font-medium text-gray-200 cursor-pointer flex-1"
//               >
//                 {option.label}
//               </Label>
//             </div>
//             {/* Conditional rendering for "Please specify" field for compensation/stipend */}
//             {option.label.includes("Please specify") &&
//               selectedValue === option.id && (
//                 <div className="mt-2 ml-8">
//                   <StyledInput
//                     id={`${name}Specify`} // This ID will be something like "projectCompensationSpecify"
//                     name={`${name}Specify`} // This name will be "projectCompensationSpecify"
//                     placeholder="Please specify amount"
//                     className={`h-10 text-sm ${
//                       selectedValue === option.id
//                         ? "border-red-500 focus:border-red-500"
//                         : ""
//                     }`}
//                     icon={undefined}
//                     required={selectedValue === option.id}
//                     value={formData[`${name}Specify`] || ""} // Access using the correct dynamic key
//                     onChange={onChange}
//                   />
//                   {selectedValue === option.id && (
//                     <p className="text-red-400 text-xs mt-1">
//                       * Required when this option is selected
//                     </p>
//                   )}
//                 </div>
//               )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };


import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { StyledInput } from "./StyledInput";

interface Option {
  id: string;
  label: string;
}

interface CheckboxGroupProps {
  options: Option[];
  name: string;
  type?: "checkbox" | "radio";
  selectedValue?: string | string[];
  onChange: (e: any) => void;
  formData?: any;
}

export const CheckboxGroup = ({
  options,
  name,
  type = "checkbox",
  selectedValue,
  onChange,
  formData,
}: CheckboxGroupProps) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {options.map((option) => {
          // Determine if this option is selected
          const isSelected =
            type === "radio"
              ? selectedValue === option.id
              : Array.isArray(selectedValue) && selectedValue.includes(option.id);

          // Helper to handle selection logic
          const handleSelect = () => {
            if (type === "radio") {
              onChange({ target: { name, value: option.id } });
            } else {
              // Safe array check to fix the TS error
              const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
              const isChecked = currentArray.includes(option.id);
              
              const newValue = isChecked
                ? currentArray.filter((item) => item !== option.id)
                : [...currentArray, option.id];
                
              onChange({ target: { name, value: newValue } });
            }
          };

          return (
            <div key={option.id} className="group relative">
              <div
                className={`
                  flex items-center space-x-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out
                  ${isSelected 
                    ? "bg-violet-50 border-violet-500 shadow-sm" 
                    : "bg-white border-slate-200 hover:border-violet-300 hover:bg-slate-50 hover:shadow-sm"
                  }
                `}
                onClick={handleSelect}
              >
                {type === "radio" ? (
                  <div className={`
                    flex items-center justify-center w-5 h-5 rounded-full border-[1.5px] transition-colors
                    ${isSelected ? "border-violet-600 bg-violet-600" : "border-slate-400 bg-transparent"}
                  `}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                    {/* Hidden native input for accessibility */}
                    <input
                      type="radio"
                      id={option.id}
                      name={name}
                      value={option.id}
                      checked={!!isSelected}
                      onChange={() => {}}
                      className="sr-only"
                    />
                  </div>
                ) : (
                  // Stop propagation on the checkbox itself to prevent double-firing with the parent div click
                  <div onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      id={option.id}
                      checked={!!isSelected}
                      onCheckedChange={(checked) => {
                        const currentArray = Array.isArray(selectedValue) ? selectedValue : [];
                        const newValue = checked
                          ? [...currentArray, option.id]
                          : currentArray.filter((item) => item !== option.id);
                        onChange({ target: { name, value: newValue } });
                      }}
                      className={`
                        w-5 h-5 border-2 transition-colors
                        data-[state=checked]:bg-violet-600 data-[state=checked]:border-violet-600 border-slate-400
                      `}
                    />
                  </div>
                )}
                
                <Label
                  htmlFor={option.id}
                  className={`text-sm font-semibold cursor-pointer flex-1 transition-colors ${
                    isSelected ? "text-violet-900" : "text-slate-600"
                  }`}
                  onClick={(e) => e.stopPropagation()} // Prevent double toggle
                >
                  {option.label}
                </Label>
              </div>

              {/* Conditional "Please specify" field */}
              {option.label.includes("Please specify") && isSelected && (
                <div className="mt-3 ml-2 animate-in fade-in slide-in-from-top-2 duration-200">
                  <StyledInput
                    id={`${name}Specify`}
                    name={`${name}Specify`}
                    placeholder="Please specify amount"
                    className="h-11 text-sm bg-white border-violet-200 focus:border-violet-500"
                    required={true}
                    value={formData?.[`${name}Specify`] || ""}
                    onChange={onChange}
                  />
                  <p className="text-rose-500 text-xs mt-1.5 font-medium ml-1">
                    * Required
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
