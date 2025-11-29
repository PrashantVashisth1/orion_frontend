
// import { Package, Wrench, Zap, Handshake, Award } from "lucide-react"
// // Importing necessary icons
// import { DollarSign, Target, Shield } from "lucide-react";
// // import type { StartupProfileResponse } from "@/types/startup"

// // interface OfferingsProps { profile: StartupProfileResponse | null | undefined }

// export default function Offerings({ profile }) {
//   const offerings = profile?.data?.offerings;
//   const products = offerings?.products || []
//   const services = offerings?.services || []
//   const revenueStreams = offerings?.revenueStreams || []
//   const partnerships = offerings?.partnerships || []
//   const certifications = offerings?.certifications || []

//   // Main attributes for a separate card
//   const mainAttributes = [
//     { label: "Business Model", value: offerings?.businessModel || 'N/A', icon: Zap },
//     { label: "Pricing Model", value: offerings?.pricingModel || 'N/A', icon: DollarSign },
//     { label: "Target Market", value: offerings?.targetMarket || 'N/A', icon: Target },
//     { label: "Competitive Advantage", value: offerings?.competitiveAdvantage || 'N/A', icon: Shield },
//   ];

//   const ListCard = ({ title, icon: Icon, items, emptyMessage, color }) => (
//     <div className="bg-gray-700/50 rounded-xl p-5 border border-gray-600/50 flex flex-col h-full">
//       <div className="flex items-center space-x-3 mb-4">
//         <Icon className={`h-5 w-5 ${color} flex-shrink-0`} />
//         <h4 className="font-semibold text-white text-lg">{title}</h4>
//       </div>
//       <div className="space-y-2 flex-grow min-h-[80px] max-h-[250px] overflow-y-auto pr-2 custom-scrollbar">
//         {items.length > 0 ? (
//           items.map((item, index) => (
//             <div key={index} className="bg-gray-600/50 rounded-lg px-3 py-2 text-sm text-gray-300 border border-gray-500/50 truncate hover:bg-gray-600/70 transition duration-200">
//               {item}
//             </div>
//           ))
//         ) : (
//           <p className="text-gray-400 text-sm italic">{emptyMessage}</p>
//         )}
//       </div>
//     </div>
//   );

//   const AttributeCard = ({ label, value, icon: Icon }) => (
//     <div className="p-4 bg-gray-700/30 rounded-lg border border-gray-600/50 flex flex-col justify-between h-full">
//         <div className="flex items-center gap-2 mb-2">
//             <Icon className="h-5 w-5 text-teal-400" />
//             <span className="text-xs text-gray-400 uppercase font-semibold">{label}</span>
//         </div>
//         <span className="text-lg font-bold text-white break-words">{value}</span>
//     </div>
//   );

//   return (
//     <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-2xl font-bold text-white mb-6">🚀 What We Offer & Our Strategy</h3>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         {mainAttributes.map((attr, index) => (
//             <AttributeCard key={index} {...attr} />
//         ))}
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
//         <ListCard
//           title="Products"
//           icon={Package}
//           items={products}
//           emptyMessage="No primary products listed."
//           color="text-red-400"
//         />
//         <ListCard
//           title="Services"
//           icon={Wrench}
//           items={services}
//           emptyMessage="No core services listed."
//           color="text-indigo-400"
//         />
//         <ListCard
//           title="Revenue Streams"
//           icon={DollarSign}
//           items={revenueStreams}
//           emptyMessage="No revenue streams defined."
//           color="text-green-400"
//         />
//         <ListCard
//           title="Key Partnerships"
//           icon={Handshake}
//           items={partnerships}
//           emptyMessage="No key partnerships listed."
//           color="text-yellow-400"
//         />
//         <ListCard
//           title="Certifications"
//           icon={Award}
//           items={certifications}
//           emptyMessage="No certifications achieved."
//           color="text-cyan-400"
//         />
//       </div>
      
//       {/* Scrollbar style for the list cards */}
//       <style>{`.custom-scrollbar::-webkit-scrollbar { width: 6px; } .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 3px; } .custom-scrollbar::-webkit-scrollbar-track { background-color: #1f2937; }`}</style>
//     </div>
//   )
// }

import { Package, Wrench, Zap, Handshake, Award } from "lucide-react"
// Importing necessary icons
import { DollarSign, Target, Shield } from "lucide-react";
// import type { StartupProfileResponse } from "@/types/startup"

// interface OfferingsProps { profile: StartupProfileResponse | null | undefined }

export default function Offerings({ profile }) {
  const offerings = profile?.data?.offerings;
  const products = offerings?.products || []
  const services = offerings?.services || []
  const revenueStreams = offerings?.revenueStreams || []
  const partnerships = offerings?.partnerships || []
  const certifications = offerings?.certifications || []

  // Main attributes for a separate card
  const mainAttributes = [
    { label: "Business Model", value: offerings?.businessModel || 'N/A', icon: Zap },
    { label: "Pricing Model", value: offerings?.pricingModel || 'N/A', icon: DollarSign },
    { label: "Target Market", value: offerings?.targetMarket || 'N/A', icon: Target },
    { label: "Competitive Advantage", value: offerings?.competitiveAdvantage || 'N/A', icon: Shield },
  ];

  const ListCard = ({ title, icon: Icon, items, emptyMessage, color }) => (
    // Card background changed to light gray/white, border adjusted
    <div className="bg-white/70 rounded-xl p-5 border border-gray-200/50 flex flex-col h-full">
      <div className="flex items-center space-x-3 mb-4">
        {/* Icon color kept vibrant but adjusted for contrast */}
        <Icon className={`h-5 w-5 ${color.replace('-400', '-600')} flex-shrink-0`} />
        {/* Title text is dark */}
        <h4 className="font-semibold text-gray-900 text-lg">{title}</h4>
      </div>
      <div className="space-y-2 flex-grow min-h-[80px] max-h-[250px] overflow-y-auto pr-2 custom-scrollbar-light">
        {items.length > 0 ? (
          items.map((item, index) => (
            // List item background and text adjusted for light theme
            <div key={index} className="bg-gray-100 rounded-lg px-3 py-2 text-sm text-gray-700 border border-gray-200 truncate hover:bg-gray-200 transition duration-200">
              {item}
            </div>
          ))
        ) : (
          // Empty message text adjusted
          <p className="text-gray-500 text-sm italic">{emptyMessage}</p>
        )}
      </div>
    </div>
  );

  const AttributeCard = ({ label, value, icon: Icon }) => (
    // Card background changed to light gray/white, border adjusted
    <div className="p-4 bg-gray-50/50 rounded-lg border border-gray-200/50 flex flex-col justify-between h-full">
      <div className="flex items-center gap-2 mb-2">
        {/* Icon color adjusted to a darker teal */}
        <Icon className="h-5 w-5 text-teal-600" />
        {/* Label text adjusted */}
        <span className="text-xs text-gray-500 uppercase font-semibold">{label}</span>
      </div>
      {/* Value text adjusted to dark gray */}
      <span className="text-lg font-bold text-gray-900 break-words">{value}</span>
    </div>
  );

  return (
    // Main container background and border adjusted
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-xl relative w-full">
      {/* Main heading text is dark */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">🚀 What We Offer & Our Strategy</h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {mainAttributes.map((attr, index) => (
            <AttributeCard key={index} {...attr} />
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        <ListCard
          title="Products"
          icon={Package}
          items={products}
          emptyMessage="No primary products listed."
          color="text-red-400" // Will render as text-red-600
        />
        <ListCard
          title="Services"
          icon={Wrench}
          items={services}
          emptyMessage="No core services listed."
          color="text-indigo-400" // Will render as text-indigo-600
        />
        <ListCard
          title="Revenue Streams"
          icon={DollarSign}
          items={revenueStreams}
          emptyMessage="No revenue streams defined."
          color="text-green-400" // Will render as text-green-600
        />
        <ListCard
          title="Key Partnerships"
          icon={Handshake}
          items={partnerships}
          emptyMessage="No key partnerships listed."
          color="text-yellow-400" // Will render as text-yellow-600
        />
        <ListCard
          title="Certifications"
          icon={Award}
          items={certifications}
          emptyMessage="No certifications achieved."
          color="text-cyan-400" // Will render as text-cyan-600
        />
      </div>
      
      {/* Scrollbar style updated for light theme */}
      <style>{`.custom-scrollbar-light::-webkit-scrollbar { width: 6px; } .custom-scrollbar-light::-webkit-scrollbar-thumb { background-color: #9ca3af; border-radius: 3px; } .custom-scrollbar-light::-webkit-scrollbar-track { background-color: #f3f4f6; }`}</style>
    </div>
  )
}