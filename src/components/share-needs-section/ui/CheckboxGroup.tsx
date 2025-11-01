import { StyledInput } from "./StyledInput";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

// Enhanced Checkbox Group component
export const CheckboxGroup = ({
  options,
  name,
  type = "checkbox",
  selectedValue,
  onChange,
  formData,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option.id} className="group">
            <div
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-4 rounded-xl border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() =>
                type === "radio" &&
                onChange({ target: { name, value: option.id } })
              }
            >
              {type === "radio" ? (
                <input
                  type="radio"
                  id={option.id}
                  name={name}
                  value={option.id}
                  checked={selectedValue === option.id}
                  onChange={() => {}} // Handled by onClick on parent div
                  className="w-5 h-5 text-purple-500 bg-gray-700 border-2 border-gray-500 focus:ring-purple-500 focus:ring-2"
                />
              ) : (
                <Checkbox
                  id={option.id}
                  checked={selectedValue && selectedValue.includes(option.id)} // For multiple checkboxes
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange({
                        target: {
                          name,
                          value: [...(selectedValue || []), option.id],
                        },
                      });
                    } else {
                      onChange({
                        target: {
                          name,
                          value: (selectedValue || []).filter(
                            (item) => item !== option.id
                          ),
                        },
                      });
                    }
                  }}
                  className="border-2 border-gray-500 w-5 h-5 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
              )}
              <Label
                htmlFor={option.id}
                className="text-sm font-medium text-gray-200 cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
            {/* Conditional rendering for "Please specify" field for compensation/stipend */}
            {option.label.includes("Please specify") &&
              selectedValue === option.id && (
                <div className="mt-2 ml-8">
                  <StyledInput
                    id={`${name}Specify`} // This ID will be something like "projectCompensationSpecify"
                    name={`${name}Specify`} // This name will be "projectCompensationSpecify"
                    placeholder="Please specify amount"
                    className={`h-10 text-sm ${
                      selectedValue === option.id
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    icon={undefined}
                    required={selectedValue === option.id}
                    value={formData[`${name}Specify`] || ""} // Access using the correct dynamic key
                    onChange={onChange}
                  />
                  {selectedValue === option.id && (
                    <p className="text-red-400 text-xs mt-1">
                      * Required when this option is selected
                    </p>
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};