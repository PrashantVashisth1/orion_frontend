
// import { Cpu, Globe, Target, Lightbulb} from "lucide-react"
// // import type { StartupProfileResponse } from "@/types/startup"

// // interface InterestsProps { profile: StartupProfileResponse | null | undefined }

// export default function Interests({ profile }) {
//   const interestsData = profile?.data?.interests || {};
//   const techInterestsData = profile?.data?.technologyInterests || {};
//   const partnershipInterestsData = profile?.data?.partnershipInterests || {};
//   const innovationFocusData = profile?.data?.innovationFocus || {};

//   // 1. Industry & Market
//   const industryAndMarket = [
//     { name: 'Primary Industry', value: interestsData?.primaryIndustry },
//     { name: 'Secondary Industry', value: interestsData?.secondaryIndustry },
//     { name: 'Primary Target Market', value: interestsData?.primaryTargetMarket },
//     { name: 'Geographic Focus', value: interestsData?.geographicFocus },
//   ].filter(item => item.value);

//   // 2. Partnership Goals (Text)
//   const partnershipGoals = interestsData?.partnershipGoals || 'N/A';

//   // 3. Innovation Focus (Text)
//   const innovationDescription = interestsData?.innovationDescription || 'N/A';

//   // 4. Technology Interests (Boolean fields)
//   const techInterests = [
//     { name: 'AI/ML', key: 'aiMl' },
//     { name: 'Blockchain', key: 'blockchain' },
//     { name: 'Cloud Computing', key: 'cloudComputing' },
//     { name: 'Cybersecurity', key: 'cybersecurity' },
//     { name: 'IoT', key: 'iot' },
//     { name: 'Fintech', key: 'fintech' },
//     { name: 'Healthtech', key: 'healthtech' },
//     { name: 'Edtech', key: 'edtech' },
//     { name: 'Sustainability Tech', key: 'sustainabilityTech' },
//   ].filter(item => techInterestsData[item.key]); // Filter to show ONLY TRUE/Enabled ones
  
//   const otherTech = techInterestsData?.other_tech;
//   if (otherTech) techInterests.push({ name: otherTech, key: 'other' });

//   // 5. Partnership Types (Boolean fields)
//   const partnershipTypes = [
//     { name: 'Startup Partnerships', key: 'startupPartnerships' },
//     { name: 'Enterprise Partnerships', key: 'enterprisePartnerships' },
//     { name: 'Research Collaborations', key: 'researchCollaborations' },
//     { name: 'Academic Partnerships', key: 'academicPartnerships' },
//     { name: 'Government Contracts', key: 'governmentContracts' },
//     { name: 'Non-profit Collaborations', key: 'nonprofitCollaborations' },
//   ].filter(item => partnershipInterestsData[item.key]);

//   // 6. Innovation Focus (Boolean fields)
//   const innovationFocusAreas = [
//     { name: 'Product Development', key: 'productDevelopment' },
//     { name: 'Process Innovation', key: 'processInnovation' },
//     { name: 'Business Model Innovation', key: 'businessModelInnovation' },
//     { name: 'Sustainability Innovation', key: 'sustainabilityInnovation' },
//     { name: 'Social Impact', key: 'socialImpact' },
//     { name: 'Disruptive Technology', key: 'disruptiveTechnology' },
//   ].filter(item => innovationFocusData[item.key]);

//   const ItemTag = ({ name, color }) => (
//     <span className={`px-3 py-1 text-sm rounded-full font-medium ${color}`}>
//         {name}
//     </span>
//   );
  
//   const SectionContainer = ({ title, icon: Icon, children, color }) => (
//     <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
//         <div className="flex items-center space-x-3 mb-4">
//             <Icon className={`h-6 w-6 ${color}`} />
//             <h4 className="text-xl font-bold text-white">{title}</h4>
//         </div>
//         <div className="space-y-4">
//             {children}
//         </div>
//     </div>
//   );
  
//   const TextSection = ({ title, content }) => (
//       <div>
//           <h5 className="font-semibold text-gray-300 mb-2">{title}</h5>
//           <p className="text-sm text-gray-400 leading-relaxed italic border-l-4 border-blue-600/50 pl-3">"{content}"</p>
//       </div>
//   );
  
//   const TagSection = ({ items, emptyMessage }) => (
//       <div className="flex flex-wrap gap-2">
//           {items.length > 0 ? items.map((item, index) => (
//               <ItemTag key={index} name={item.name} color="bg-blue-600/20 text-blue-300" />
//           )) : (
//               <p className="text-sm text-gray-500">{emptyMessage}</p>
//           )}
//       </div>
//   );

//   return (
//     <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 shadow-xl relative w-full">
//       <h3 className="text-2xl font-bold text-white mb-6">⭐ Focus Areas & Interests</h3>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
//         {/* Industry & Market Focus */}
//         <SectionContainer title="Industry & Market Focus" icon={Globe} color="text-yellow-400">
//             <div className="grid grid-cols-2 gap-4">
//                 {industryAndMarket.map((item, index) => (
//                     <div key={index} className="flex flex-col p-3 bg-gray-700/30 rounded-lg border border-gray-600/50">
//                         <span className="text-xs text-gray-400 uppercase font-semibold">{item.name}</span>
//                         <span className="text-sm text-white font-medium">{item.value}</span>
//                     </div>
//                 ))}
//             </div>
//             <TextSection title="Market Description" content={interestsData?.marketDescription || 'N/A'} />
//         </SectionContainer>
        
//         {/* Technology Interests */}
//         <SectionContainer title="Technology Stack & Interests" icon={Cpu} color="text-green-400">
//             <TagSection 
//                 items={techInterests} 
//                 emptyMessage="No specific technologies listed."
//             />
//         </SectionContainer>
        
//         {/* Partnership Goals & Types */}
//         <SectionContainer title="Partnership & Collaboration" icon={Target} color="text-pink-400">
//             <TextSection title="Goals" content={partnershipGoals} />
//             <h5 className="font-semibold text-gray-300 mb-2 pt-4 border-t border-gray-700">Preferred Partner Types</h5>
//             <div className="flex flex-wrap gap-2">
//                 {partnershipTypes.map((item, index) => (
//                     <ItemTag key={index} name={item.name} color="bg-pink-600/20 text-pink-300" />
//                 ))}
//             </div>
//         </SectionContainer>
        
//         {/* Innovation Focus */}
//         <SectionContainer title="Innovation & Future Focus" icon={Lightbulb} color="text-cyan-400">
//             <TextSection title="Innovation Strategy" content={innovationDescription} />
//             <h5 className="font-semibold text-gray-300 mb-2 pt-4 border-t border-gray-700">Key Innovation Areas</h5>
//             <div className="flex flex-wrap gap-2">
//                 {innovationFocusAreas.map((item, index) => (
//                     <ItemTag key={index} name={item.name} color="bg-cyan-600/20 text-cyan-300" />
//                 ))}
//             </div>
//             <TextSection title="Future Goals" content={interestsData?.futureGoals || 'N/A'} />
//         </SectionContainer>

//       </div>
//     </div>
//   );
// }

import { Cpu, Globe, Target, Lightbulb} from "lucide-react"
// import type { StartupProfileResponse } from "@/types/startup"

// interface InterestsProps { profile: StartupProfileResponse | null | undefined }

export default function Interests({ profile }) {
  const interestsData = profile?.data?.interests || {};
  const techInterestsData = profile?.data?.technologyInterests || {};
  const partnershipInterestsData = profile?.data?.partnershipInterests || {};
  const innovationFocusData = profile?.data?.innovationFocus || {};

  // 1. Industry & Market
  const industryAndMarket = [
    { name: 'Primary Industry', value: interestsData?.primaryIndustry },
    { name: 'Secondary Industry', value: interestsData?.secondaryIndustry },
    { name: 'Primary Target Market', value: interestsData?.primaryTargetMarket },
    { name: 'Geographic Focus', value: interestsData?.geographicFocus },
  ].filter(item => item.value);

  // 2. Partnership Goals (Text)
  const partnershipGoals = interestsData?.partnershipGoals || 'N/A';

  // 3. Innovation Focus (Text)
  const innovationDescription = interestsData?.innovationDescription || 'N/A';

  // 4. Technology Interests (Boolean fields)
  const techInterests = [
    { name: 'AI/ML', key: 'aiMl' },
    { name: 'Blockchain', key: 'blockchain' },
    { name: 'Cloud Computing', key: 'cloudComputing' },
    { name: 'Cybersecurity', key: 'cybersecurity' },
    { name: 'IoT', key: 'iot' },
    { name: 'Fintech', key: 'fintech' },
    { name: 'Healthtech', key: 'healthtech' },
    { name: 'Edtech', key: 'edtech' },
    { name: 'Sustainability Tech', key: 'sustainabilityTech' },
  ].filter(item => techInterestsData[item.key]); // Filter to show ONLY TRUE/Enabled ones
  
  const otherTech = techInterestsData?.other_tech;
  if (otherTech) techInterests.push({ name: otherTech, key: 'other' });

  // 5. Partnership Types (Boolean fields)
  const partnershipTypes = [
    { name: 'Startup Partnerships', key: 'startupPartnerships' },
    { name: 'Enterprise Partnerships', key: 'enterprisePartnerships' },
    { name: 'Research Collaborations', key: 'researchCollaborations' },
    { name: 'Academic Partnerships', key: 'academicPartnerships' },
    { name: 'Government Contracts', key: 'governmentContracts' },
    { name: 'Non-profit Collaborations', key: 'nonprofitCollaborations' },
  ].filter(item => partnershipInterestsData[item.key]);

  // 6. Innovation Focus (Boolean fields)
  const innovationFocusAreas = [
    { name: 'Product Development', key: 'productDevelopment' },
    { name: 'Process Innovation', key: 'processInnovation' },
    { name: 'Business Model Innovation', key: 'businessModelInnovation' },
    { name: 'Sustainability Innovation', key: 'sustainabilityInnovation' },
    { name: 'Social Impact', key: 'socialImpact' },
    { name: 'Disruptive Technology', key: 'disruptiveTechnology' },
  ].filter(item => innovationFocusData[item.key]);

  const ItemTag = ({ name, color }) => (
    // Generic Tag: use light background and dark text
    <span className={`px-3 py-1 text-sm rounded-full font-medium ${color.replace('bg-', 'bg-').replace('/20', '/100').replace('text-', 'text-').replace('-300', '-700').replace('-400', '-700').replace('-600', '-700')} border border-opacity-50`}>
        {name}
    </span>
  );
  
  const SectionContainer = ({ title, icon: Icon, children, color }) => (
    // Card background adjusted for light theme
    <div className="bg-white/70 backdrop-blur-md rounded-xl p-6 border border-gray-200/50 shadow-md">
      <div className="flex items-center space-x-3 mb-4">
        {/* Icon color adjusted to darker variants */}
        <Icon className={`h-6 w-6 ${color.replace('-400', '-700')}`} />
        {/* Heading text is dark */}
        <h4 className="text-xl font-bold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
  
  const TextSection = ({ title, content }) => (
    <div>
      {/* Sub-heading text is dark gray */}
      <h5 className="font-semibold text-gray-700 mb-2">{title}</h5>
      {/* Content text is medium gray, border is dark blue */}
      <p className="text-sm text-gray-600 leading-relaxed italic border-l-4 border-blue-600 pl-3">"{content}"</p>
    </div>
  );
  
  const TagSection = ({ items, emptyMessage }) => (
    <div className="flex flex-wrap gap-2">
      {items.length > 0 ? items.map((item, index) => {
        // Use a generic light-blue tag for the Tech stack
        const techColorClass = "bg-blue-100 text-blue-700 border-blue-200";
        return <span key={index} className={`px-3 py-1 text-sm rounded-full font-medium ${techColorClass} border`}>{item.name}</span>
      }) : (
        // Empty message text is medium gray
        <p className="text-sm text-gray-500">{emptyMessage}</p>
      )}
    </div>
  );

  return (
    // Main container background and border adjusted
    <div className="bg-white/70 backdrop-blur-md rounded-2xl border border-gray-200/50 p-8 shadow-xl relative w-full">
      {/* Main heading text is dark */}
      <h3 className="text-2xl font-bold text-gray-900 mb-6">⭐ Focus Areas & Interests</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Industry & Market Focus */}
        <SectionContainer title="Industry & Market Focus" icon={Globe} color="text-yellow-400">
          <div className="grid grid-cols-2 gap-4">
            {industryAndMarket.map((item, index) => (
              <div key={index} className="flex flex-col p-3 bg-gray-100 rounded-lg border border-gray-200">
                {/* Labels and values adjusted */}
                <span className="text-xs text-gray-500 uppercase font-semibold">{item.name}</span>
                <span className="text-sm text-gray-800 font-medium">{item.value}</span>
              </div>
            ))}
          </div>
          <TextSection title="Market Description" content={interestsData?.marketDescription || 'N/A'} />
        </SectionContainer>
        
        {/* Technology Interests */}
        <SectionContainer title="Technology Stack & Interests" icon={Cpu} color="text-green-400">
          <TagSection 
            items={techInterests} 
            emptyMessage="No specific technologies listed."
          />
        </SectionContainer>
        
        {/* Partnership Goals & Types */}
        <SectionContainer title="Partnership & Collaboration" icon={Target} color="text-pink-400">
          <TextSection title="Goals" content={partnershipGoals} />
          {/* Sub-heading text and border adjusted */}
          <h5 className="font-semibold text-gray-700 mb-2 pt-4 border-t border-gray-200">Preferred Partner Types</h5>
          <div className="flex flex-wrap gap-2">
            {partnershipTypes.map((item, index) => (
              // Partnership tags adjusted: light pink background, dark pink text
              <ItemTag key={index} name={item.name} color="bg-pink-100 text-pink-700 border-pink-200" />
            ))}
          </div>
        </SectionContainer>
        
        {/* Innovation Focus */}
        <SectionContainer title="Innovation & Future Focus" icon={Lightbulb} color="text-cyan-400">
          <TextSection title="Innovation Strategy" content={innovationDescription} />
          {/* Sub-heading text and border adjusted */}
          <h5 className="font-semibold text-gray-700 mb-2 pt-4 border-t border-gray-200">Key Innovation Areas</h5>
          <div className="flex flex-wrap gap-2">
            {innovationFocusAreas.map((item, index) => (
              // Innovation tags adjusted: light cyan background, dark cyan text
              <ItemTag key={index} name={item.name} color="bg-cyan-100 text-cyan-700 border-cyan-200" />
            ))}
          </div>
          <TextSection title="Future Goals" content={interestsData?.futureGoals || 'N/A'} />
        </SectionContainer>

      </div>
    </div>
  );
}