// // src/components/edit-profile/sections/StudentSkillsSection.tsx

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { Award, Plus, X, Loader2, Search, ExternalLink } from "lucide-react";
// import { 
//   useStudentProfile,
//   useUpdateProfileSection,
//   useAddCertificate,
//   useDeleteCertificate
// } from "@/hooks/useStudentAPI";
// import type { CertificateRecord } from "@/types/student";
// import { AVAILABLE_SKILLS } from "@/types/student";
// import { toast } from 'react-hot-toast';

// interface StudentSkillsSectionProps {
//   onSectionChange?: (section: string) => void;
// }

// export default function StudentSkillsSection({ onSectionChange }: StudentSkillsSectionProps) {
//   const { data: profile } = useStudentProfile();
//   const { mutateAsync: updateSkills, isPending: isUpdatingSkills } = useUpdateProfileSection();
//   const { mutateAsync: addCertificate, isPending: isAddingCert } = useAddCertificate();
//   const { mutateAsync: deleteCertificate, isPending: isDeletingCert } = useDeleteCertificate();

//   const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
//   const [showAddCert, setShowAddCert] = useState(false);
//   const [newCertificate, setNewCertificate] = useState<Partial<CertificateRecord>>({
//     certificateName: '',
//     issuingOrganization: '',
//     issueDate: '',
//     credentialId: '',
//     credentialUrl: ''
//   });

//   // Load existing data
//   useEffect(() => {
//     if (profile?.data?.skillsInfo) {
//       const skillsInfo = profile.data.skillsInfo;
//       setSelectedSkills(skillsInfo.selectedSkills || []);
//       setCertificates(skillsInfo.certificates || []);
//     }
//   }, [profile]);

//   const filteredSkills = AVAILABLE_SKILLS.filter(skill => 
//     skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
//     !selectedSkills.includes(skill)
//   );

//   const handleToggleSkill = (skill: string) => {
//     setSelectedSkills(prev => 
//       prev.includes(skill) 
//         ? prev.filter(s => s !== skill)
//         : [...prev, skill]
//     );
//   };

//   const handleSaveSkills = async () => {
//     try {
//       await updateSkills({ 
//         section: 'skills', 
//         data: {selectedSkills},
//       });
//       toast.success('Skills updated successfully');
//     } catch (err) {
//       toast.error('Failed to update skills');
//     }
//   };

//   const handleAddCertificate = async () => {
//     if (!newCertificate.certificateName) {
//       toast.error('Certificate name is required');
//       return;
//     }

//     try {
//       await addCertificate({
//         certificateName: newCertificate.certificateName,
//         issuingOrganization: newCertificate.issuingOrganization,
//         issueDate: newCertificate.issueDate 
//           ? new Date(newCertificate.issueDate).toISOString() 
//           : undefined,
//         credentialId: newCertificate.credentialId,
//         credentialUrl: newCertificate.credentialUrl
//       });
//       toast.success('Certificate added successfully');
//       setNewCertificate({
//         certificateName: '',
//         issuingOrganization: '',
//         issueDate: '',
//         credentialId: '',
//         credentialUrl: ''
//       });
//       setShowAddCert(false);
//     } catch (err) {
//       toast.error('Failed to add certificate');
//     }
//   };

//   const handleDeleteCertificate = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this certificate?')) {
//       try {
//         await deleteCertificate(id);
//         toast.success('Certificate deleted successfully');
//       } catch (err) {
//         toast.error('Failed to delete certificate');
//       }
//     }
//   };

//   const isLoading = isUpdatingSkills || isAddingCert || isDeletingCert;

//   return (
//     <div className="relative z-10 p-6 px-[154px] py-[60px]">
//       <Card className="w-[896px] mx-auto !bg-white !shadow-sm !border !border-gray-200 before:!hidden hover:!shadow-lg hover:!ring-0 !transition-none">
//         <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
//           <div className="flex items-center space-x-3">
//             <Award className="h-6 w-6 text-white" />
//             <div>
//               <h2 className="text-3xl font-bold text-white">Skills</h2>
//               <p className="text-sm text-blue-50">Update your Skills</p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 space-y-8 !animate-none !transition-none">
//           {/* Skills Selection */}
//           <div className="space-y-4">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">Select Your Skills</h3>
//               <Button
//                 onClick={handleSaveSkills}
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               >
//                 {isUpdatingSkills ? (
//                   <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Saving
//                   </>
//                 ) : (
//                   'Save Skills'
//                 )}
//               </Button>
//             </div>

//             {/* Search Skills */}
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search for your Skills"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="bg-white border-gray-300 pl-10 !text-black"
//               />
//             </div>

//             {/* Selected Skills */}
//             {selectedSkills.length > 0 && (
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Selected Skills</Label>
//                 <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[60px]">
//                   {selectedSkills.map((skill, index) => (
//                     <div
//                       key={index}
//                       className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm"
//                     >
//                       <span>{skill}</span>
//                       <button
//                         onClick={() => handleToggleSkill(skill)}
//                         className="hover:bg-blue-700 rounded-full p-0.5 cursor-pointer"
//                       >
//                         <X className="w-3 h-3" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Available Skills */}
//             <div className="space-y-2">
//               <Label className="text-gray-700">Available Skills</Label>
//               <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
//                 {filteredSkills.length === 0 ? (
//                   <p className="text-gray-500 col-span-full text-center py-4">
//                     {searchQuery ? 'No skills found' : 'All skills selected'}
//                   </p>
//                 ) : (
//                   filteredSkills.map((skill, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleToggleSkill(skill)}
//                       className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-left cursor-pointer"
//                     >
//                       <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
//                         {selectedSkills.includes(skill) && (
//                           <div className="w-2 h-2 bg-blue-600 rounded"></div>
//                         )}
//                       </div>
//                       <span className="text-gray-700">{skill}</span>
//                     </button>
//                   ))
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Certificates Section */}
//           <div className="space-y-4 pt-6 border-t border-gray-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
//               <Button
//                 onClick={() => setShowAddCert(!showAddCert)}
//                 className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               >
//                 <Plus className="w-4 h-4 mr-2" />
//                 Add Certificate
//               </Button>
//             </div>

//             {/* Add Certificate Form */}
//             {showAddCert && (
//               <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-2 md:col-span-2">
//                     <Label className="text-gray-700">Certificate Name *</Label>
//                     <Input
//                       placeholder="e.g., Python for Everybody Specialization"
//                       value={newCertificate.certificateName}
//                       onChange={(e) => setNewCertificate({ ...newCertificate, certificateName: e.target.value })}
//                       className="bg-white text-black border-gray-300"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-gray-700">Issuing Organization</Label>
//                     <Input
//                       placeholder="e.g., Coursera, University"
//                       value={newCertificate.issuingOrganization}
//                       onChange={(e) => setNewCertificate({ ...newCertificate, issuingOrganization: e.target.value })}
//                       className="bg-white text-black border-gray-300"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-gray-700">Issue Date</Label>
//                     <Input
//                       type="date"
//                       value={newCertificate.issueDate}
//                       onChange={(e) => setNewCertificate({ ...newCertificate, issueDate: e.target.value })}
//                       className="bg-white text-black border-gray-300"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-gray-700">Credential ID</Label>
//                     <Input
//                       placeholder="Certificate ID"
//                       value={newCertificate.credentialId}
//                       onChange={(e) => setNewCertificate({ ...newCertificate, credentialId: e.target.value })}
//                       className="bg-white text-black border-gray-300"
//                     />
//                   </div>
//                   <div className="space-y-2">
//                     <Label className="text-gray-700">Credential URL</Label>
//                     <Input
//                       placeholder="https://..."
//                       value={newCertificate.credentialUrl}
//                       onChange={(e) => setNewCertificate({ ...newCertificate, credentialUrl: e.target.value })}
//                       className="bg-white text-black border-gray-300"
//                     />
//                   </div>
//                 </div>
//                 <div className="flex justify-end gap-2">
//                   <Button
//                     onClick={() => setShowAddCert(false)}
//                     variant="outline"
//                     className="border-gray-300 bg-blue-600 hover:bg-blue-700 cursor-pointer"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     onClick={handleAddCertificate}
//                     disabled={isLoading}
//                     className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//                   >
//                     {isAddingCert ? (
//                       <>
//                       <Loader2 className="w-4 h-4 animate-spin" />
//                       Saving
//                       </>
//                     ) : (
//                       'Add Certificate'
//                     )}
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* Certificates List */}
//             <div className="space-y-3">
//               {certificates.length === 0 ? (
//                 <p className="text-gray-500 text-center py-8">No certificates added yet.</p>
//               ) : (
//                 certificates.map((cert) => (
//                   <div key={cert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
//                     <div className="flex-1">
//                       <div className="flex items-center gap-2">
//                         <Award className="w-5 h-5 text-blue-600" />
//                         <h4 className="font-semibold text-gray-900">{cert.certificateName}</h4>
//                       </div>
//                       {cert.issuingOrganization && (
//                         <p className="text-sm text-gray-600 mt-1">{cert.issuingOrganization}</p>
//                       )}
//                       <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
//                         {cert.issueDate && (
//                           <span>Issued: {new Date(cert.issueDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
//                         )}
//                         {cert.credentialId && (
//                           <span>ID: {cert.credentialId}</span>
//                         )}
//                       </div>
//                       {cert.credentialUrl && (
//                         <a
//                           href={cert.credentialUrl}
//                           target="_blank"
//                           rel="noopener noreferrer"
//                           className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
//                         >
//                           <ExternalLink className="w-3 h-3" />
//                           Show Certificate
//                         </a>
//                       )}
//                     </div>
//                     <Button
//                       onClick={() => cert.id && handleDeleteCertificate(cert.id)}
//                       variant="outline"
//                       size="sm"
//                       className="border-red-300 text-red-600 hover:bg-red-50 cursor-pointer"
//                       disabled={isLoading}
//                     >
//                       {isDeletingCert ? (
//                         <Loader2 className="w-4 h-4 animate-spin" />
//                       ) : (
//                         <X className="w-4 h-4" />
//                       )}
//                     </Button>
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <Button 
//               onClick={handleSaveSkills}
//               disabled={isLoading}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
//             >
//               {isLoading ? (
//                 <>
//                   <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 'Complete Profile'
//               )}
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src/components/edit-profile/sections/StudentSkillsSection.tsx

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Award, Plus, X, Loader2, Search, ExternalLink } from "lucide-react";
import { 
  useStudentProfile,
  useUpdateProfileSection,
  useAddCertificate,
  useDeleteCertificate
} from "@/hooks/useStudentAPI";
import type { CertificateRecord } from "@/types/student";
import { AVAILABLE_SKILLS } from "@/types/student";
import { toast } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

// interface StudentSkillsSectionProps {
//   onSectionChange?: (section: string) => void;
// }

export default function StudentSkillsSection() {
  const { data: profile } = useStudentProfile();
  const { mutateAsync: updateSkills, isPending: isUpdatingSkills } = useUpdateProfileSection();
  const { mutateAsync: addCertificate, isPending: isAddingCert } = useAddCertificate();
  const { mutateAsync: deleteCertificate, isPending: isDeletingCert } = useDeleteCertificate();
  const navigate = useNavigate();

  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [certificates, setCertificates] = useState<CertificateRecord[]>([]);
  const [showAddCert, setShowAddCert] = useState(false);
  const [newCertificate, setNewCertificate] = useState<Partial<CertificateRecord>>({
    certificateName: '',
    issuingOrganization: '',
    issueDate: '',
    credentialId: '',
    credentialUrl: ''
  });

  // Load existing data
  useEffect(() => {
    if (profile?.data?.skillsInfo) {
      const skillsInfo = profile.data.skillsInfo;
      setSelectedSkills(skillsInfo.selectedSkills || []);
      setCertificates(skillsInfo.certificates || []);
    }
  }, [profile]);

  const filteredSkills = AVAILABLE_SKILLS.filter(skill => 
    skill.toLowerCase().includes(searchQuery.toLowerCase()) &&
    !selectedSkills.includes(skill)
  );

  const handleToggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    );
  };

  const handleSaveSkills = async () => {
    try {
      console.log('Sending skills data:', { selectedSkills });
      
      const response = await updateSkills({ 
        section: 'skills', 
        data: { 
          selectedSkills
        } 
      });
      
      console.log('Skills update response:', response);
      toast.success('Skills updated successfully');
      navigate('/students/profile')
    } catch (err: any) {
      console.error('Error updating skills:', err);
      console.error('Error response:', err?.response?.data);
      console.error('Error status:', err?.response?.status);
      toast.error(err?.response?.data?.message || err?.response?.data?.error || 'Failed to update skills');
    }
  };

  const handleAddCertificate = async () => {
    if (!newCertificate.certificateName) {
      toast.error('Certificate name is required');
      return;
    }

    try {
      await addCertificate({
        certificateName: newCertificate.certificateName,
        issuingOrganization: newCertificate.issuingOrganization,
        issueDate: newCertificate.issueDate 
          ? new Date(newCertificate.issueDate).toISOString() 
          : undefined,
        credentialId: newCertificate.credentialId,
        credentialUrl: newCertificate.credentialUrl
      });
      toast.success('Certificate added successfully');
      setNewCertificate({
        certificateName: '',
        issuingOrganization: '',
        issueDate: '',
        credentialId: '',
        credentialUrl: ''
      });
      setShowAddCert(false);
    } catch (err: any) {
      console.error('Error adding certificate:', err);
      toast.error(err?.response?.data?.message || 'Failed to add certificate');
    }
  };

  const handleDeleteCertificate = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      try {
        await deleteCertificate(id);
        toast.success('Certificate deleted successfully');
      } catch (err: any) {
        console.error('Error deleting certificate:', err);
        toast.error(err?.response?.data?.message || 'Failed to delete certificate');
      }
    }
  };

  const isLoading = isUpdatingSkills || isAddingCert || isDeletingCert;

  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[896px] mx-auto !bg-white !shadow-sm !border !border-gray-200 before:!hidden hover:!shadow-lg hover:!ring-0 !transition-none">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Award className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">Skills</h2>
              <p className="text-sm text-blue-50">Update your Skills</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 !animate-none !transition-none">
          {/* Skills Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Select Your Skills</h3>
              <Button
                onClick={handleSaveSkills}
                disabled={isLoading}
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                {isUpdatingSkills ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  'Save Skills'
                )}
              </Button>
            </div>

            {/* Search Skills */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for your Skills"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white border-gray-300 pl-10 !text-black"
              />
            </div>

            {/* Selected Skills */}
            {selectedSkills.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-700">Selected Skills</Label>
                <div className="flex flex-wrap gap-2 p-4 bg-blue-50 rounded-lg border border-blue-200 min-h-[60px]">
                  {selectedSkills.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white rounded-full text-sm"
                    >
                      <span>{skill}</span>
                      <button
                        onClick={() => handleToggleSkill(skill)}
                        className="hover:bg-blue-700 rounded-full p-0.5 cursor-pointer"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Available Skills */}
            <div className="space-y-2">
              <Label className="text-gray-700">Available Skills</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-64 overflow-y-auto p-4 bg-gray-50 rounded-lg border border-gray-200">
                {filteredSkills.length === 0 ? (
                  <p className="text-gray-500 col-span-full text-center py-4">
                    {searchQuery ? 'No skills found' : 'All skills selected'}
                  </p>
                ) : (
                  filteredSkills.map((skill, index) => (
                    <button
                      key={index}
                      onClick={() => handleToggleSkill(skill)}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-sm text-left cursor-pointer"
                    >
                      <div className="w-4 h-4 border border-gray-400 rounded flex items-center justify-center">
                        {selectedSkills.includes(skill) && (
                          <div className="w-2 h-2 bg-blue-600 rounded"></div>
                        )}
                      </div>
                      <span className="text-gray-700">{skill}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Certificates Section */}
          <div className="space-y-4 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Certificates</h3>
              <Button
                onClick={() => setShowAddCert(!showAddCert)}
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Certificate
              </Button>
            </div>

            {/* Add Certificate Form */}
            {showAddCert && (
              <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-gray-700">Certificate Name *</Label>
                    <Input
                      placeholder="e.g., Python for Everybody Specialization"
                      value={newCertificate.certificateName}
                      onChange={(e) => setNewCertificate({ ...newCertificate, certificateName: e.target.value })}
                      className="bg-white border-gray-300 !text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Issuing Organization</Label>
                    <Input
                      placeholder="e.g., Coursera, University"
                      value={newCertificate.issuingOrganization}
                      onChange={(e) => setNewCertificate({ ...newCertificate, issuingOrganization: e.target.value })}
                      className="bg-white border-gray-300 !text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Issue Date</Label>
                    <Input
                      type="date"
                      value={newCertificate.issueDate}
                      onChange={(e) => setNewCertificate({ ...newCertificate, issueDate: e.target.value })}
                      className="bg-white border-gray-300 !text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Credential ID</Label>
                    <Input
                      placeholder="Certificate ID"
                      value={newCertificate.credentialId}
                      onChange={(e) => setNewCertificate({ ...newCertificate, credentialId: e.target.value })}
                      className="bg-white border-gray-300 !text-black"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-gray-700">Credential URL</Label>
                    <Input
                      placeholder="https://..."
                      value={newCertificate.credentialUrl}
                      onChange={(e) => setNewCertificate({ ...newCertificate, credentialUrl: e.target.value })}
                      className="bg-white border-gray-300 !text-black"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setShowAddCert(false)}
                    variant="outline"
                    className="border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleAddCertificate}
                    disabled={isLoading}
                    className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                  >
                    {isAddingCert ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      'Add Certificate'
                    )}
                  </Button>
                </div>
              </div>
            )}

            {/* Certificates List */}
            <div className="space-y-3">
              {certificates.length === 0 ? (
                <p className="text-gray-500 text-center py-8">No certificates added yet.</p>
              ) : (
                certificates.map((cert) => (
                  <div key={cert.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">{cert.certificateName}</h4>
                      </div>
                      {cert.issuingOrganization && (
                        <p className="text-sm text-gray-600 mt-1">{cert.issuingOrganization}</p>
                      )}
                      <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                        {cert.issueDate && (
                          <span>
                            Issued: {(() => {
                              try {
                                const date = new Date(cert.issueDate);
                                return isNaN(date.getTime()) 
                                  ? "Invalid date" 
                                  : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                              } catch {
                                return "Invalid date";
                              }
                            })()}
                          </span>
                        )}
                        {cert.credentialId && (
                          <span>ID: {cert.credentialId}</span>
                        )}
                      </div>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 mt-2 text-sm text-blue-600 hover:text-blue-700"
                        >
                          <ExternalLink className="w-3 h-3" />
                          Show Certificate
                        </a>
                      )}
                    </div>
                    <Button
                      onClick={() => cert.id && handleDeleteCertificate(cert.id)}
                      variant="outline"
                      size="sm"
                      className="border-red-300 text-red-600 hover:bg-red-50 cursor-pointer"
                      disabled={isLoading}
                    >
                      {isDeletingCert ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <X className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button 
              onClick={handleSaveSkills}
              disabled={isLoading}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Complete Profile'
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}