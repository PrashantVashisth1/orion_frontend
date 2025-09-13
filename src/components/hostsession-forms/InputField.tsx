import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const InputField = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  required = false, 
  rows 
}: InputFieldProps) => (
  <div className="mb-6">
    <label className="block text-sm font-medium text-gray-200 mb-3">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    {type === 'textarea' ? (
      <Textarea
        rows={rows || 3}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 border border-gray-600 bg-gray-700/80 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        required={required}
      />
    ) : (
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full p-4 border border-gray-600 bg-gray-700/80 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 placeholder-gray-400"
        required={required}
      />
    )}
  </div>
);

export default InputField; 