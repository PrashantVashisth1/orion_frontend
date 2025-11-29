// import { Sparkles } from "lucide-react";

// // Enhanced Section Header component
// export const SectionHeader = ({
//   icon: Icon,
//   title,
//   description,
//   gradientFrom,
//   gradientTo,
// }) => (
//   <div className="text-center mb-12 relative">
//     <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
//     <div className="relative">
//       <div
//         className={`w-20 h-20 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden`}
//       >
//         <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
//         <Icon className="w-10 h-10 text-white relative z-10" />
//         <Sparkles className="w-4 h-4 text-white/60 absolute top-2 right-2" />
//       </div>
//       <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
//         {title}
//       </h2>
//       <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
//         {description}
//       </p>
//     </div>
//   </div>
// );

import type { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  icon: LucideIcon;
  title: string;
  description: string;
  gradientFrom?: string;
  gradientTo?: string;
}

export const SectionHeader = ({
  icon: Icon,
  title,
  description,
  gradientFrom = "from-blue-600",
  gradientTo = "to-violet-600",
}: SectionHeaderProps) => (
  <div className="text-center mb-10 space-y-4">
    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${gradientFrom} ${gradientTo} shadow-lg shadow-purple-500/20 mb-2`}>
      <Icon className="w-8 h-8 text-white" />
    </div>
    <h2 className="text-3xl font-bold text-slate-900 tracking-tight">
      {title}
    </h2>
    <p className="text-slate-500 max-w-2xl mx-auto text-base leading-relaxed">
      {description}
    </p>
  </div>
);