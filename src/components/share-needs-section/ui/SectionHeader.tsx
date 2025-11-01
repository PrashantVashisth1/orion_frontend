import { Sparkles } from "lucide-react";

// Enhanced Section Header component
export const SectionHeader = ({
  icon: Icon,
  title,
  description,
  gradientFrom,
  gradientTo,
}) => (
  <div className="text-center mb-12 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
    <div className="relative">
      <div
        className={`w-20 h-20 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
        <Icon className="w-10 h-10 text-white relative z-10" />
        <Sparkles className="w-4 h-4 text-white/60 absolute top-2 right-2" />
      </div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);