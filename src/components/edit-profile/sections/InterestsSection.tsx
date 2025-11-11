// import { useState, useEffect } from "react"
// import { Card, CardHeader, CardContent } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Heart, Target, TrendingUp, Users, Globe, Lightbulb, Loader2 } from "lucide-react"
// import { useStartupProfile, useUpdateProfileSection } from "@/hooks/useStartupAPI"
// import type { Interests } from "@/types/startup"
// import { toast } from 'react-hot-toast';

// interface InterestsSectionProps {
//   onSectionChange?: (section: string) => void;
// }

// export default function InterestsSection({ onSectionChange }: InterestsSectionProps) {
//   const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
//   const { data: profileResponse } = useStartupProfile(); 
//   const [formData, setFormData] = useState<Interests>({
//     primaryIndustry: '',
//     secondaryIndustry: '',
//     technologyInterests: {
//       aiMl: false,
//       blockchain: false,
//       cloudComputing: false,
//       cybersecurity: false,
//       iot: false,
//       fintech: false,
//       healthtech: false,
//       edtech: false,
//       sustainabilityTech: false,
//       otherTech: ''
//     },
//     primaryTargetMarket: '',
//     geographicFocus: '',
//     marketDescription: '',
//     partnershipInterests: {
//       startupPartnerships: false,
//       enterprisePartnerships: false,
//       researchCollaborations: false,
//       academicPartnerships: false,
//       governmentContracts: false,
//       nonprofitCollaborations: false,
//       // partnershipGoals: ''
//     },
//     innovationFocus: {
//       productDevelopment: false,
//       processInnovation: false,
//       businessModelInnovation: false,
//       sustainabilityInnovation: false,
//       socialImpact: false,
//       disruptiveTechnology: false,
//       // innovationDescription: ''
//     },
//     futureGoals: ''
//   });

//   // Load existing data when profile changes
//   // InterestsSection.tsx

// // Load existing data when profile changes
// useEffect(() => {
//     // Stop relying on temporary localStorage, use the backend data
//     if (profileResponse?.success && profileResponse.data) {
//         const profile = profileResponse.data;

//         // Extract and map data from the four related tables
//         const interests = profile.interests || {};
//         const tech = profile.technologyInterests || {}; // Assuming useStartupProfile converts snake_case to camelCase
//         const partnership = profile.partnershipInterests || {};
//         const innovation = profile.innovationFocus || {};

//         setFormData(prev => ({
//             // 1. Core Interests (Text Fields)
//             primaryIndustry: interests.primaryIndustry || '',
//             secondaryIndustry: interests.secondaryIndustry || '',
//             primaryTargetMarket: interests.primaryTargetMarket || '',
//             geographicFocus: interests.geographicFocus || '',
//             marketDescription: interests.marketDescription || '',
//             futureGoals: interests.futureGoals || '',

//             // 2. Technology Interests (Booleans)
//             technologyInterests: {
//                 aiMl: tech.aiMl ?? false,
//                 blockchain: tech.blockchain ?? false,
//                 cloudComputing: tech.cloudComputing ?? false,
//                 cybersecurity: tech.cybersecurity ?? false,
//                 iot: tech.iot ?? false,
//                 fintech: tech.fintech ?? false,
//                 healthtech: tech.healthtech ?? false,
//                 edtech: tech.edtech ?? false,
//                 sustainabilityTech: tech.sustainabilityTech ?? false,
//                 otherTech: tech.otherTech || '',
//             },

//             // 3. Partnership Interests (Booleans + Text)
//             partnershipInterests: {
//                 startupPartnerships: partnership.startupPartnerships ?? false,
//                 enterprisePartnerships: partnership.enterprisePartnerships ?? false,
//                 researchCollaborations: partnership.researchCollaborations ?? false,
//                 academicPartnerships: partnership.academicPartnerships ?? false,
//                 governmentContracts: partnership.governmentContracts ?? false,
//                 nonprofitCollaborations: partnership.nonprofitCollaborations ?? false,
//                 partnershipGoals: interests.partnershipGoals || '', 
//             },

//             // 4. Innovation Focus (Booleans + Text)
//             innovationFocus: {
//                 productDevelopment: innovation.productDevelopment ?? false,
//                 processInnovation: innovation.processInnovation ?? false,
//                 businessModelInnovation: innovation.businessModelInnovation ?? false,
//                 sustainabilityInnovation: innovation.sustainabilityInnovation ?? false,
//                 socialImpact: innovation.socialImpact ?? false,
//                 disruptiveTechnology: innovation.disruptiveTechnology ?? false,
//                 innovationDescription: interests.innovationDescription || '', // Note: This field is on the main 'interests' table
//             },
//         }));
//     }
    
//     // REMOVE the localStorage logic entirely, as the backend is the source of truth
// }, [profileResponse]); // <-- Add profileResponse as a dependency

//   const handleInputChange = (field: keyof Interests, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleTechnologyChange = (tech: keyof typeof formData.technologyInterests, checked: boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       technologyInterests: {
//         ...prev.technologyInterests,
//         [tech]: checked
//       }
//     }));
//   };

//   const handlePartnershipChange = (partnership: keyof typeof formData.partnershipInterests, checked: boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       partnershipInterests: {
//         ...prev.partnershipInterests,
//         [partnership]: checked
//       }
//     }));
//   };

//   const handleInnovationChange = (innovation: keyof typeof formData.innovationFocus, checked: boolean) => {
//     setFormData(prev => ({
//       ...prev,
//       innovationFocus: {
//         ...prev.innovationFocus,
//         [innovation]: checked
//       }
//     }));
//   };

//   const handleNestedTextChange = (section: 'technologyInterests' | 'partnershipInterests' | 'innovationFocus', field: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [section]: {
//         ...prev[section],
//         [field]: value
//       }
//     }));
//   };

//   const validateForm = () => {
//     const errors: string[] = [];
    
//     if (!formData.primaryIndustry?.trim()) {
//       errors.push('Primary industry is required');
//     }
    
//     return errors;
//   };

//   const handleSubmit = async () => {
//     const validationErrors = validateForm();
//     if (validationErrors.length > 0) {
//       toast.error(validationErrors[0]);
//       return;
//     }

//     try {
//       const combinedData = {
//         // 1. Interests Table Fields (Text Inputs)
//         primary_industry: formData.primaryIndustry,
//         secondary_industry: formData.secondaryIndustry || '',
//         primary_target_market: formData.primaryTargetMarket || '',
//         geographic_focus: formData.geographicFocus || '',
//         market_description: formData.marketDescription || '',
//         future_goals: formData.futureGoals || '',

//         // 2. TechnologyInterests Fields (Booleans + Other Tech Text)
//         ai_ml: formData.technologyInterests.aiMl,
//         blockchain: formData.technologyInterests.blockchain,
//         cloud_computing: formData.technologyInterests.cloudComputing,
//         cybersecurity: formData.technologyInterests.cybersecurity,
//         iot: formData.technologyInterests.iot,
//         fintech: formData.technologyInterests.fintech,
//         healthtech: formData.technologyInterests.healthtech,
//         edtech: formData.technologyInterests.edtech,
//         sustainability_tech: formData.technologyInterests.sustainabilityTech,
//         other_tech: formData.technologyInterests.otherTech || '',

//         // 3. PartnershipInterests Fields (Booleans + Partnership Goals Text)
//         startup_partnerships: formData.partnershipInterests.startupPartnerships,
//         enterprise_partnerships: formData.partnershipInterests.enterprisePartnerships,
//         research_collaborations: formData.partnershipInterests.researchCollaborations,
//         academic_partnerships: formData.partnershipInterests.academicPartnerships,
//         government_contracts: formData.partnershipInterests.governmentContracts,
//         nonprofit_collaborations: formData.partnershipInterests.nonprofitCollaborations,
//         // partnership_goals is handled in the main Interests table, but we ensure it's here:
//         partnership_goals: formData.partnershipInterests.partnershipGoals || '', 


//         // 4. InnovationFocus Fields (Booleans + Innovation Description Text)
//         product_development: formData.innovationFocus.productDevelopment,
//         process_innovation: formData.innovationFocus.processInnovation,
//         business_model_innovation: formData.innovationFocus.businessModelInnovation,
//         sustainability_innovation: formData.innovationFocus.sustainabilityInnovation,
//         social_impact: formData.innovationFocus.socialImpact,
//         disruptive_technology: formData.innovationFocus.disruptiveTechnology,
//         // innovation_description is handled in the main Interests table, but we ensure it's here:
//         innovation_description: formData.innovationFocus.innovationDescription || '',
//       };

//       // Send the unified payload to the backend
//       await updateSection({ section: 'interests', data: combinedData });
//       
//       // REMOVE the localStorage usage as the data is now correctly persisted in the backend
//       // localStorage.setItem('startupInterestsAdditional', JSON.stringify(additionalData)); // REMOVE THIS
      
//       toast.success('Interests updated successfully');
//       // Automatically navigate to next section after successful save
//       setTimeout(() => {
//         if (onSectionChange) {
//           onSectionChange('offerings');
//         }
//       }, 1000);
//     } catch (err: any) {
//       if (err?.response?.data?.error?.details) {
//         const backendErrors = err.response.data.error.details;
//         const errorMessage = backendErrors.map((detail: any) => detail.message).join(', ');
//         toast.error(errorMessage);
//       } else {
//         toast.error('Failed to update interests');
//       }
//     }
//   };

//   const isFormValid = !!formData.primaryIndustry;

//   return (
//     <div className="relative z-10 p-6 px-[106px] py-[60px]">
//       <Card className="w-[896px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
//         <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
//           <div className="flex items-center space-x-3">
//             <Heart className="h-6 w-6" />
//             <div>
//               <h2 className="text-3xl font-bold">Interests of Company</h2>
//               <p className="text-sm text-zinc-300">Define your company's interests, focus areas, and strategic priorities</p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 space-y-8 bg-zinc-900">
//           {/* Industry Focus */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <Target className="w-5 h-5" />
//               Industry Focus Areas
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="primary-industry" className="text-zinc-300">
//                   Primary Industry *
//                 </Label>
//                 <Input
//                   id="primary-industry"
//                   placeholder="e.g., Technology, Healthcare, Finance"
//                   value={formData.primaryIndustry}
//                   onChange={(e) => handleInputChange('primaryIndustry', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="secondary-industry" className="text-zinc-300">
//                   Secondary Industry
//                 </Label>
//                 <Input
//                   id="secondary-industry"
//                   placeholder="e.g., Education, Manufacturing, Retail"
//                   value={formData.secondaryIndustry || ''}
//                   onChange={(e) => handleInputChange('secondaryIndustry', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Technology Interests */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <TrendingUp className="w-5 h-5" />
//               Technology & Innovation Interests
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="ai-ml" 
//                     checked={formData.technologyInterests.aiMl}
//                     onCheckedChange={(checked) => handleTechnologyChange('aiMl', checked as boolean)}
//                   />
//                   <Label htmlFor="ai-ml" className="text-zinc-300">AI & Machine Learning</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="blockchain" 
//                     checked={formData.technologyInterests.blockchain}
//                     onCheckedChange={(checked) => handleTechnologyChange('blockchain', checked as boolean)}
//                   />
//                   <Label htmlFor="blockchain" className="text-zinc-300">Blockchain</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="cloud-computing" 
//                     checked={formData.technologyInterests.cloudComputing}
//                     onCheckedChange={(checked) => handleTechnologyChange('cloudComputing', checked as boolean)}
//                   />
//                   <Label htmlFor="cloud-computing" className="text-zinc-300">Cloud Computing</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="cybersecurity" 
//                     checked={formData.technologyInterests.cybersecurity}
//                     onCheckedChange={(checked) => handleTechnologyChange('cybersecurity', checked as boolean)}
//                   />
//                   <Label htmlFor="cybersecurity" className="text-zinc-300">Cybersecurity</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="iot" 
//                     checked={formData.technologyInterests.iot}
//                     onCheckedChange={(checked) => handleTechnologyChange('iot', checked as boolean)}
//                   />
//                   <Label htmlFor="iot" className="text-zinc-300">IoT</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="fintech" 
//                     checked={formData.technologyInterests.fintech}
//                     onCheckedChange={(checked) => handleTechnologyChange('fintech', checked as boolean)}
//                   />
//                   <Label htmlFor="fintech" className="text-zinc-300">FinTech</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="healthtech" 
//                     checked={formData.technologyInterests.healthtech}
//                     onCheckedChange={(checked) => handleTechnologyChange('healthtech', checked as boolean)}
//                   />
//                   <Label htmlFor="healthtech" className="text-zinc-300">HealthTech</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="edtech" 
//                     checked={formData.technologyInterests.edtech}
//                     onCheckedChange={(checked) => handleTechnologyChange('edtech', checked as boolean)}
//                   />
//                   <Label htmlFor="edtech" className="text-zinc-300">EdTech</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="sustainability" 
//                     checked={formData.technologyInterests.sustainabilityTech}
//                     onCheckedChange={(checked) => handleTechnologyChange('sustainabilityTech', checked as boolean)}
//                   />
//                   <Label htmlFor="sustainability" className="text-zinc-300">Sustainability Tech</Label>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="other-tech" className="text-zinc-300">
//                   Other Technology Interests
//                 </Label>
//                 <Input
//                   id="other-tech"
//                   placeholder="Add other technology areas of interest..."
//                   value={formData.technologyInterests.otherTech || ''}
//                   onChange={(e) => handleNestedTextChange('technologyInterests', 'otherTech', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Market Focus */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <Globe className="w-5 h-5" />
//               Market Focus & Target Segments
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label htmlFor="target-market" className="text-zinc-300">
//                     Primary Target Market
//                   </Label>
//                   <Input
//                     id="target-market"
//                     placeholder="e.g., B2B, B2C, Enterprise, SMB"
//                     value={formData.primaryTargetMarket || ''}
//                     onChange={(e) => handleInputChange('primaryTargetMarket', e.target.value)}
//                     className="bg-zinc-800 border-zinc-700 text-white"
//                   />
//                 </div>
//                 <div className="space-y-2">
//                   <Label htmlFor="geographic-focus" className="text-zinc-300">
//                     Geographic Focus
//                   </Label>
//                   <Input
//                     id="geographic-focus"
//                     placeholder="e.g., North America, Global, Local"
//                     value={formData.geographicFocus || ''}
//                     onChange={(e) => handleInputChange('geographicFocus', e.target.value)}
//                     className="bg-zinc-800 border-zinc-700 text-white"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="market-description" className="text-zinc-300">
//                   Market Description
//                 </Label>
//                 <Textarea
//                   id="market-description"
//                   placeholder="Describe your target market segments and customer profiles..."
//                   rows={3}
//                   value={formData.marketDescription || ''}
//                   onChange={(e) => handleInputChange('marketDescription', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Partnership Interests */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <Users className="w-5 h-5" />
//               Partnership & Collaboration Interests
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="startup-partnerships" 
//                     checked={formData.partnershipInterests.startupPartnerships}
//                     onCheckedChange={(checked) => handlePartnershipChange('startupPartnerships', checked as boolean)}
//                   />
//                   <Label htmlFor="startup-partnerships" className="text-zinc-300">Startup Partnerships</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="enterprise-partnerships" 
//                     checked={formData.partnershipInterests.enterprisePartnerships}
//                     onCheckedChange={(checked) => handlePartnershipChange('enterprisePartnerships', checked as boolean)}
//                   />
//                   <Label htmlFor="enterprise-partnerships" className="text-zinc-300">Enterprise Partnerships</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="research-collaborations" 
//                     checked={formData.partnershipInterests.researchCollaborations}
//                     onCheckedChange={(checked) => handlePartnershipChange('researchCollaborations', checked as boolean)}
//                   />
//                   <Label htmlFor="research-collaborations" className="text-zinc-300">Research Collaborations</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="academic-partnerships" 
//                     checked={formData.partnershipInterests.academicPartnerships}
//                     onCheckedChange={(checked) => handlePartnershipChange('academicPartnerships', checked as boolean)}
//                   />
//                   <Label htmlFor="academic-partnerships" className="text-zinc-300">Academic Partnerships</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="government-contracts" 
//                     checked={formData.partnershipInterests.governmentContracts}
//                     onCheckedChange={(checked) => handlePartnershipChange('governmentContracts', checked as boolean)}
//                   />
//                   <Label htmlFor="government-contracts" className="text-zinc-300">Government Contracts</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="nonprofit-collaborations" 
//                     checked={formData.partnershipInterests.nonprofitCollaborations}
//                     onCheckedChange={(checked) => handlePartnershipChange('nonprofitCollaborations', checked as boolean)}
//                   />
//                   <Label htmlFor="nonprofit-collaborations" className="text-zinc-300">Non-profit Collaborations</Label>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="partnership-goals" className="text-zinc-300">
//                   Partnership Goals
//                 </Label>
//                 <Textarea
//                   id="partnership-goals"
//                   placeholder="Describe your partnership objectives and what you're looking for in collaborators..."
//                   rows={3}
//                   value={formData.partnershipInterests.partnershipGoals || ''}
//                   onChange={(e) => handleNestedTextChange('partnershipInterests', 'partnershipGoals', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Innovation Focus */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <Lightbulb className="w-5 h-5" />
//               Innovation & Research Focus
//             </div>
//             <div className="space-y-4">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="product-development" 
//                     checked={formData.innovationFocus.productDevelopment}
//                     onCheckedChange={(checked) => handleInnovationChange('productDevelopment', checked as boolean)}
//                   />
//                   <Label htmlFor="product-development" className="text-zinc-300">Product Development</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="process-innovation" 
//                     checked={formData.innovationFocus.processInnovation}
//                     onCheckedChange={(checked) => handleInnovationChange('processInnovation', checked as boolean)}
//                   />
//                   <Label htmlFor="process-innovation" className="text-zinc-300">Process Innovation</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="business-model-innovation" 
//                     checked={formData.innovationFocus.businessModelInnovation}
//                     onCheckedChange={(checked) => handleInnovationChange('businessModelInnovation', checked as boolean)}
//                   />
//                   <Label htmlFor="business-model-innovation" className="text-zinc-300">Business Model Innovation</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="sustainability-innovation" 
//                     checked={formData.innovationFocus.sustainabilityInnovation}
//                     onCheckedChange={(checked) => handleInnovationChange('sustainabilityInnovation', checked as boolean)}
//                   />
//                   <Label htmlFor="sustainability-innovation" className="text-zinc-300">Sustainability Innovation</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="social-impact" 
//                     checked={formData.innovationFocus.socialImpact}
//                     onCheckedChange={(checked) => handleInnovationChange('socialImpact', checked as boolean)}
//                   />
//                   <Label htmlFor="social-impact" className="text-zinc-300">Social Impact</Label>
//                 </div>
//                 <div className="flex items-center space-x-2">
//                   <Checkbox 
//                     id="disruptive-technology" 
//                     checked={formData.innovationFocus.disruptiveTechnology}
//                     onCheckedChange={(checked) => handleInnovationChange('disruptiveTechnology', checked as boolean)}
//                   />
//                   <Label htmlFor="disruptive-technology" className="text-zinc-300">Disruptive Technology</Label>
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="innovation-description" className="text-zinc-300">
//                   Innovation Focus Description
//                 </Label>
//                 <Textarea
//                   id="innovation-description"
//                   placeholder="Describe your innovation priorities and research focus areas..."
//                   rows={4}
//                   value={formData.innovationFocus.innovationDescription || ''}
//                   onChange={(e) => handleNestedTextChange('innovationFocus', 'innovationDescription', e.target.value)}
//                   className="bg-zinc-800 border-zinc-700 text-white"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Future Goals */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-white">
//               <Target className="w-5 h-5" />
//               Future Goals & Aspirations
//             </div>
//             <div className="space-y-2">
//               <Label htmlFor="future-goals" className="text-zinc-300">
//                 Long-term Goals
//               </Label>
//               <Textarea
//                 id="future-goals"
//                 placeholder="Describe your company's long-term goals, aspirations, and where you see yourself in 5-10 years..."
//                 rows={4}
//                 value={formData.futureGoals || ''}
//                 onChange={(e) => handleInputChange('futureGoals', e.target.value)}
//                 className="bg-zinc-800 border-zinc-700 text-white"
//               />
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end pt-6">
//             <Button 
//               onClick={handleSubmit}
//               disabled={!isFormValid || isUpdating}
//               className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isUpdating ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 'Save Changes'
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Target, TrendingUp, Users, Globe, Lightbulb, Loader2 } from "lucide-react"
import { useStartupProfile, useUpdateProfileSection } from "@/hooks/useStartupAPI"
import type { Interests } from "@/types/startup"
import { toast } from 'react-hot-toast';

interface InterestsSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function InterestsSection({ onSectionChange }: InterestsSectionProps) {
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const { data: profileResponse } = useStartupProfile(); 
  const [formData, setFormData] = useState<Interests>({
    primaryIndustry: '',
    secondaryIndustry: '',
    technologyInterests: {
      aiMl: false,
      blockchain: false,
      cloudComputing: false,
      cybersecurity: false,
      iot: false,
      fintech: false,
      healthtech: false,
      edtech: false,
      sustainabilityTech: false,
      otherTech: ''
    },
    primaryTargetMarket: '',
    geographicFocus: '',
    marketDescription: '',
    partnershipGoals: '', // Moved to top level
    innovationDescription: '', // Moved to top level
    partnershipInterests: {
      startupPartnerships: false,
      enterprisePartnerships: false,
      researchCollaborations: false,
      academicPartnerships: false,
      governmentContracts: false,
      nonprofitCollaborations: false
    },
    innovationFocus: {
      productDevelopment: false,
      processInnovation: false,
      businessModelInnovation: false,
      sustainabilityInnovation: false,
      socialImpact: false,
      disruptiveTechnology: false,
      innovationDescription: '' // Added to match interface
    },
    futureGoals: ''
  });

  // Load existing data when profile changes
  useEffect(() => {
    if (profileResponse?.success && profileResponse.data) {
      const profile = profileResponse.data;

      const interests = profile.interests || {};
      const tech = profile.technologyInterests || {};
      const partnership = profile.partnershipInterests || {};
      const innovation = profile.innovationFocus || {};

      setFormData(() => ({
        // Core Interests (Text Fields)
        primaryIndustry: interests.primaryIndustry || '',
        secondaryIndustry: interests.secondaryIndustry || '',
        primaryTargetMarket: interests.primaryTargetMarket || '',
        geographicFocus: interests.geographicFocus || '',
        marketDescription: interests.marketDescription || '',
        futureGoals: interests.futureGoals || '',
        partnershipGoals: interests.partnershipGoals || '', // Top level
        innovationDescription: interests.innovationDescription || '', // Top level

        // Technology Interests (Booleans)
        technologyInterests: {
          aiMl: tech.aiMl ?? false,
          blockchain: tech.blockchain ?? false,
          cloudComputing: tech.cloudComputing ?? false,
          cybersecurity: tech.cybersecurity ?? false,
          iot: tech.iot ?? false,
          fintech: tech.fintech ?? false,
          healthtech: tech.healthtech ?? false,
          edtech: tech.edtech ?? false,
          sustainabilityTech: tech.sustainabilityTech ?? false,
          otherTech: tech.otherTech || '',
        },

        // Partnership Interests (Booleans only)
        partnershipInterests: {
          startupPartnerships: partnership.startupPartnerships ?? false,
          enterprisePartnerships: partnership.enterprisePartnerships ?? false,
          researchCollaborations: partnership.researchCollaborations ?? false,
          academicPartnerships: partnership.academicPartnerships ?? false,
          governmentContracts: partnership.governmentContracts ?? false,
          nonprofitCollaborations: partnership.nonprofitCollaborations ?? false,
        },

        // Innovation Focus (Booleans + description)
        innovationFocus: {
          productDevelopment: innovation.productDevelopment ?? false,
          processInnovation: innovation.processInnovation ?? false,
          businessModelInnovation: innovation.businessModelInnovation ?? false,
          sustainabilityInnovation: innovation.sustainabilityInnovation ?? false,
          socialImpact: innovation.socialImpact ?? false,
          disruptiveTechnology: innovation.disruptiveTechnology ?? false,
          innovationDescription: innovation.innovationDescription || '',
        },
      }));
    }
  }, [profileResponse]);

  const handleInputChange = (field: keyof Interests, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleTechnologyChange = (tech: keyof typeof formData.technologyInterests, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      technologyInterests: {
        ...prev.technologyInterests,
        [tech]: checked
      }
    }));
  };

  const handlePartnershipChange = (partnership: keyof typeof formData.partnershipInterests, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      partnershipInterests: {
        ...prev.partnershipInterests,
        [partnership]: checked
      }
    }));
  };

  const handleInnovationChange = (innovation: keyof typeof formData.innovationFocus, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      innovationFocus: {
        ...prev.innovationFocus,
        [innovation]: checked
      }
    }));
  };

  const handleNestedTextChange = (section: 'technologyInterests' | 'innovationFocus', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    if (!formData.primaryIndustry?.trim()) {
      errors.push('Primary industry is required');
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]);
      return;
    }

    try {
      const combinedData = {
        // Interests Table Fields (Text Inputs)
        primary_industry: formData.primaryIndustry,
        secondary_industry: formData.secondaryIndustry || '',
        primary_target_market: formData.primaryTargetMarket || '',
        geographic_focus: formData.geographicFocus || '',
        market_description: formData.marketDescription || '',
        future_goals: formData.futureGoals || '',
        partnership_goals: formData.partnershipGoals || '', // Top level
        innovation_description: formData.innovationDescription || '', // Top level

        // TechnologyInterests Fields (Booleans + Other Tech Text)
        ai_ml: formData.technologyInterests.aiMl,
        blockchain: formData.technologyInterests.blockchain,
        cloud_computing: formData.technologyInterests.cloudComputing,
        cybersecurity: formData.technologyInterests.cybersecurity,
        iot: formData.technologyInterests.iot,
        fintech: formData.technologyInterests.fintech,
        healthtech: formData.technologyInterests.healthtech,
        edtech: formData.technologyInterests.edtech,
        sustainability_tech: formData.technologyInterests.sustainabilityTech,
        other_tech: formData.technologyInterests.otherTech || '',

        // PartnershipInterests Fields (Booleans only)
        startup_partnerships: formData.partnershipInterests.startupPartnerships,
        enterprise_partnerships: formData.partnershipInterests.enterprisePartnerships,
        research_collaborations: formData.partnershipInterests.researchCollaborations,
        academic_partnerships: formData.partnershipInterests.academicPartnerships,
        government_contracts: formData.partnershipInterests.governmentContracts,
        nonprofit_collaborations: formData.partnershipInterests.nonprofitCollaborations,

        // InnovationFocus Fields (Booleans + Description)
        product_development: formData.innovationFocus.productDevelopment,
        process_innovation: formData.innovationFocus.processInnovation,
        business_model_innovation: formData.innovationFocus.businessModelInnovation,
        sustainability_innovation: formData.innovationFocus.sustainabilityInnovation,
        social_impact: formData.innovationFocus.socialImpact,
        disruptive_technology: formData.innovationFocus.disruptiveTechnology,
      };

      await updateSection({ section: 'interests', data: combinedData });
      
      toast.success('Interests updated successfully');
      // Automatically navigate to next section after successful save
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('offerings');
        }
      }, 1000);
    } catch (err: any) {
      if (err?.response?.data?.error?.details) {
        const backendErrors = err.response.data.error.details;
        const errorMessage = backendErrors.map((detail: any) => detail.message).join(', ');
        toast.error(errorMessage);
      } else {
        toast.error('Failed to update interests');
      }
    }
  };

  const isFormValid = !!formData.primaryIndustry;

  return (
    <div className="relative z-10 p-6 px-[106px] py-[60px]">
      <Card className="w-[896px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Heart className="h-6 w-6" />
            <div>
              <h2 className="text-3xl font-bold">Interests of Company</h2>
              <p className="text-sm text-zinc-300">Define your company's interests, focus areas, and strategic priorities</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Industry Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Industry Focus Areas
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="primary-industry" className="text-zinc-300">
                  Primary Industry *
                </Label>
                <Input
                  id="primary-industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={formData.primaryIndustry}
                  onChange={(e) => handleInputChange('primaryIndustry', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="secondary-industry" className="text-zinc-300">
                  Secondary Industry
                </Label>
                <Input
                  id="secondary-industry"
                  placeholder="e.g., Education, Manufacturing, Retail"
                  value={formData.secondaryIndustry || ''}
                  onChange={(e) => handleInputChange('secondaryIndustry', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Technology Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUp className="w-5 h-5" />
              Technology & Innovation Interests
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="ai-ml" 
                    checked={formData.technologyInterests.aiMl}
                    onCheckedChange={(checked) => handleTechnologyChange('aiMl', checked as boolean)}
                  />
                  <Label htmlFor="ai-ml" className="text-zinc-300">AI & Machine Learning</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="blockchain" 
                    checked={formData.technologyInterests.blockchain}
                    onCheckedChange={(checked) => handleTechnologyChange('blockchain', checked as boolean)}
                  />
                  <Label htmlFor="blockchain" className="text-zinc-300">Blockchain</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cloud-computing" 
                    checked={formData.technologyInterests.cloudComputing}
                    onCheckedChange={(checked) => handleTechnologyChange('cloudComputing', checked as boolean)}
                  />
                  <Label htmlFor="cloud-computing" className="text-zinc-300">Cloud Computing</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="cybersecurity" 
                    checked={formData.technologyInterests.cybersecurity}
                    onCheckedChange={(checked) => handleTechnologyChange('cybersecurity', checked as boolean)}
                  />
                  <Label htmlFor="cybersecurity" className="text-zinc-300">Cybersecurity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="iot" 
                    checked={formData.technologyInterests.iot}
                    onCheckedChange={(checked) => handleTechnologyChange('iot', checked as boolean)}
                  />
                  <Label htmlFor="iot" className="text-zinc-300">IoT</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="fintech" 
                    checked={formData.technologyInterests.fintech}
                    onCheckedChange={(checked) => handleTechnologyChange('fintech', checked as boolean)}
                  />
                  <Label htmlFor="fintech" className="text-zinc-300">FinTech</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="healthtech" 
                    checked={formData.technologyInterests.healthtech}
                    onCheckedChange={(checked) => handleTechnologyChange('healthtech', checked as boolean)}
                  />
                  <Label htmlFor="healthtech" className="text-zinc-300">HealthTech</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="edtech" 
                    checked={formData.technologyInterests.edtech}
                    onCheckedChange={(checked) => handleTechnologyChange('edtech', checked as boolean)}
                  />
                  <Label htmlFor="edtech" className="text-zinc-300">EdTech</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sustainability" 
                    checked={formData.technologyInterests.sustainabilityTech}
                    onCheckedChange={(checked) => handleTechnologyChange('sustainabilityTech', checked as boolean)}
                  />
                  <Label htmlFor="sustainability" className="text-zinc-300">Sustainability Tech</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="other-tech" className="text-zinc-300">
                  Other Technology Interests
                </Label>
                <Input
                  id="other-tech"
                  placeholder="Add other technology areas of interest..."
                  value={formData.technologyInterests.otherTech || ''}
                  onChange={(e) => handleNestedTextChange('technologyInterests', 'otherTech', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Market Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Globe className="w-5 h-5" />
              Market Focus & Target Segments
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="target-market" className="text-zinc-300">
                    Primary Target Market 
                  </Label>
                  <Input
                    id="target-market"
                    placeholder="e.g., B2B, B2C, Enterprise, SMB"
                    value={formData.primaryTargetMarket}
                    onChange={(e) => handleInputChange('primaryTargetMarket', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="geographic-focus" className="text-zinc-300">
                    Geographic Focus
                  </Label>
                  <Input
                    id="geographic-focus"
                    placeholder="e.g., North America, Global, Local"
                    value={formData.geographicFocus || ''}
                    onChange={(e) => handleInputChange('geographicFocus', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="market-description" className="text-zinc-300">
                  Market Description
                </Label>
                <Textarea
                  id="market-description"
                  placeholder="Describe your target market segments and customer profiles..."
                  rows={3}
                  value={formData.marketDescription || ''}
                  onChange={(e) => handleInputChange('marketDescription', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Partnership Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Users className="w-5 h-5" />
              Partnership & Collaboration Interests
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="startup-partnerships" 
                    checked={formData.partnershipInterests.startupPartnerships}
                    onCheckedChange={(checked) => handlePartnershipChange('startupPartnerships', checked as boolean)}
                  />
                  <Label htmlFor="startup-partnerships" className="text-zinc-300">Startup Partnerships</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enterprise-partnerships" 
                    checked={formData.partnershipInterests.enterprisePartnerships}
                    onCheckedChange={(checked) => handlePartnershipChange('enterprisePartnerships', checked as boolean)}
                  />
                  <Label htmlFor="enterprise-partnerships" className="text-zinc-300">Enterprise Partnerships</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="research-collaborations" 
                    checked={formData.partnershipInterests.researchCollaborations}
                    onCheckedChange={(checked) => handlePartnershipChange('researchCollaborations', checked as boolean)}
                  />
                  <Label htmlFor="research-collaborations" className="text-zinc-300">Research Collaborations</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="academic-partnerships" 
                    checked={formData.partnershipInterests.academicPartnerships}
                    onCheckedChange={(checked) => handlePartnershipChange('academicPartnerships', checked as boolean)}
                  />
                  <Label htmlFor="academic-partnerships" className="text-zinc-300">Academic Partnerships</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="government-contracts" 
                    checked={formData.partnershipInterests.governmentContracts}
                    onCheckedChange={(checked) => handlePartnershipChange('governmentContracts', checked as boolean)}
                  />
                  <Label htmlFor="government-contracts" className="text-zinc-300">Government Contracts</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="nonprofit-collaborations" 
                    checked={formData.partnershipInterests.nonprofitCollaborations}
                    onCheckedChange={(checked) => handlePartnershipChange('nonprofitCollaborations', checked as boolean)}
                  />
                  <Label htmlFor="nonprofit-collaborations" className="text-zinc-300">Non-profit Collaborations</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="partnership-goals" className="text-zinc-300">
                  Partnership Goals
                </Label>
                <Textarea
                  id="partnership-goals"
                  placeholder="Describe your partnership objectives and what you're looking for in collaborators..."
                  rows={3}
                  value={formData.partnershipGoals || ''}
                  onChange={(e) => handleInputChange('partnershipGoals', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Innovation Focus */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Lightbulb className="w-5 h-5" />
              Innovation & Research Focus
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="product-development" 
                    checked={formData.innovationFocus.productDevelopment}
                    onCheckedChange={(checked) => handleInnovationChange('productDevelopment', checked as boolean)}
                  />
                  <Label htmlFor="product-development" className="text-zinc-300">Product Development</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="process-innovation" 
                    checked={formData.innovationFocus.processInnovation}
                    onCheckedChange={(checked) => handleInnovationChange('processInnovation', checked as boolean)}
                  />
                  <Label htmlFor="process-innovation" className="text-zinc-300">Process Innovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="business-model-innovation" 
                    checked={formData.innovationFocus.businessModelInnovation}
                    onCheckedChange={(checked) => handleInnovationChange('businessModelInnovation', checked as boolean)}
                  />
                  <Label htmlFor="business-model-innovation" className="text-zinc-300">Business Model Innovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="sustainability-innovation" 
                    checked={formData.innovationFocus.sustainabilityInnovation}
                    onCheckedChange={(checked) => handleInnovationChange('sustainabilityInnovation', checked as boolean)}
                  />
                  <Label htmlFor="sustainability-innovation" className="text-zinc-300">Sustainability Innovation</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="social-impact" 
                    checked={formData.innovationFocus.socialImpact}
                    onCheckedChange={(checked) => handleInnovationChange('socialImpact', checked as boolean)}
                  />
                  <Label htmlFor="social-impact" className="text-zinc-300">Social Impact</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="disruptive-technology" 
                    checked={formData.innovationFocus.disruptiveTechnology}
                    onCheckedChange={(checked) => handleInnovationChange('disruptiveTechnology', checked as boolean)}
                  />
                  <Label htmlFor="disruptive-technology" className="text-zinc-300">Disruptive Technology</Label>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="innovation-description" className="text-zinc-300">
                  Innovation Focus Description
                </Label>
                <Textarea
                  id="innovation-description"
                  placeholder="Describe your innovation priorities and research focus areas..."
                  rows={4}
                  value={formData.innovationDescription || ''}
                  onChange={(e) => handleInputChange('innovationDescription', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Future Goals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Future Goals & Aspirations
            </div>
            <div className="space-y-2">
              <Label htmlFor="future-goals" className="text-zinc-300">
                Long-term Goals
              </Label>
              <Textarea
                id="future-goals"
                placeholder="Describe your company's long-term goals, aspirations, and where you see yourself in 5-10 years..."
                rows={4}
                value={formData.futureGoals || ''}
                onChange={(e) => handleInputChange('futureGoals', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid || isUpdating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}