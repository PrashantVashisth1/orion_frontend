// src/components/edit-profile/sections/StudentEducationSection.tsx

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { GraduationCap, Plus, X, Loader2, Edit2, Save } from "lucide-react";
// import { 
//   useStudentProfile,
//   useAddEducation,
//   useUpdateEducation,
//   useDeleteEducation
// } from "@/hooks/useStudentAPI";
// import type { EducationRecord } from "@/types/student";
// import { toast } from 'react-hot-toast';

// interface StudentEducationSectionProps {
//   onSectionChange?: (section: string) => void;
// }

// const normalizeDate = (value: any): string => {
//   if (!value) return "";

//   // If backend gives a Date object
//   if (value instanceof Date && !isNaN(value.getTime())) {
//     return value.toISOString().split("T")[0];
//   }

//   // If backend gives an ISO string
//   const d = new Date(value);
//   return !isNaN(d.getTime()) ? d.toISOString().split("T")[0] : "";
// };

// export default function StudentEducationSection({ onSectionChange }: StudentEducationSectionProps) {
//   const { data: profile } = useStudentProfile();
//   const { mutateAsync: addEducation, isPending: isAdding } = useAddEducation();
//   const { mutateAsync: updateEducation, isPending: isUpdating } = useUpdateEducation();
//   const { mutateAsync: deleteEducation, isPending: isDeleting } = useDeleteEducation();

//   const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
//   const [editingId, setEditingId] = useState<number | null>(null);
//   const [newRecord, setNewRecord] = useState<Partial<EducationRecord>>({
//     institutionName: '',
//     degreeQualification: '',
//     fieldOfStudy: '',
//     gradeCgpa: '',
//     startDate: '',
//     endDate: ''
//   });

//   // Load existing education records
//   useEffect(() => {
//   if (profile?.data?.educationRecords) {
//     setEducationRecords(
//       profile.data.educationRecords.map(record => ({
//         ...record,
//         startDate: normalizeDate(record.startDate),
//         endDate: normalizeDate(record.endDate)
//       }))
//     );
//   }
// }, [profile]);


//   const handleAddNew = async () => {
//     if (!newRecord.institutionName || !newRecord.degreeQualification || !newRecord.fieldOfStudy || !newRecord.startDate) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       await addEducation({
//         institutionName: newRecord.institutionName,
//         degreeQualification: newRecord.degreeQualification,
//         fieldOfStudy: newRecord.fieldOfStudy,
//         gradeCgpa: newRecord.gradeCgpa,
//         startDate: new Date(newRecord.startDate).toISOString(),
//         endDate: newRecord.endDate ? new Date(newRecord.endDate).toISOString() : undefined
//       });
//       toast.success('Education record added successfully');
//       setNewRecord({
//         institutionName: '',
//         degreeQualification: '',
//         fieldOfStudy: '',
//         gradeCgpa: '',
//         startDate: '',
//         endDate: ''
//       });
//     } catch (err) {
//       toast.error('Failed to add education record');
//     }
//   };

//   const handleUpdate = async (id: number, data: Partial<EducationRecord>) => {
//     if (!data.institutionName || !data.degreeQualification || !data.fieldOfStudy || !data.startDate) {
//       toast.error('Please fill in all required fields');
//       return;
//     }

//     try {
//       await updateEducation({
//         recordId: id,
//         institutionName: data.institutionName,
//         degreeQualification: data.degreeQualification,
//         fieldOfStudy: data.fieldOfStudy,
//         gradeCgpa: data.gradeCgpa,
//         startDate: new Date(data.startDate).toISOString(),
//         endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined
//       });
//       toast.success('Education record updated successfully');
//       setEditingId(null);
//     } catch (err) {
//       toast.error('Failed to update education record');
//     }
//   };

//   const handleDelete = async (id: number) => {
//     if (window.confirm('Are you sure you want to delete this education record?')) {
//       try {
//         await deleteEducation(id);
//         toast.success('Education record deleted successfully');
//       } catch (err) {
//         toast.error('Failed to delete education record');
//       }
//     }
//   };

//   const handleRecordChange = (index: number, field: keyof EducationRecord, value: string) => {
//     setEducationRecords(prev => prev.map((record, i) => 
//       i === index ? { ...record, [field]: value } : record
//     ));
//   };

//   const handleNext = () => {
//     if (onSectionChange) {
//       onSectionChange('work-experience');
//     }
//   };

//   const isLoading = isAdding || isUpdating || isDeleting;

//   return (
//     <div className="relative z-10 p-6 px-[154px] py-[60px]">
//       <Card className="w-[896px] mx-auto !bg-white !shadow-lg !border !border-gray-200 before:!hidden hover:!shadow-sm hover:!ring-0 !transition-none">
//         <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
//           <div className="flex items-center space-x-3">
//             <GraduationCap className="h-6 w-6 text-white" />
//             <div>
//               <h2 className="text-3xl font-bold text-white">Education</h2>
//               <p className="text-sm text-blue-50">Update your Educational Information</p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 space-y-8 bg-white !animate-none !transition-none">
//           {/* Add New Education Record */}
//           <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
//             <div className="flex items-center justify-between">
//               <h3 className="text-lg font-semibold text-gray-900">Add New Education</h3>
//               <Button
//                 onClick={handleAddNew}
//                 disabled={isLoading}
//                 className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
//               >
//                 {isAdding ? (
//                   <>
//                   <Loader2 className="w-4 h-4 animate-spin" />
//                   Saving
//                   </>
//                 ) : (
//                   <>
//                     <Plus className="w-4 h-4 mr-2" />
//                     Add Education
//                   </>
//                 )}
//               </Button>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Institution Name *</Label>
//                 <Input
//                   placeholder="University/College Name"
//                   value={newRecord.institutionName}
//                   onChange={(e) => setNewRecord({ ...newRecord, institutionName: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Degree/Qualification *</Label>
//                 <Input
//                   placeholder="e.g., Bachelor of Science"
//                   value={newRecord.degreeQualification}
//                   onChange={(e) => setNewRecord({ ...newRecord, degreeQualification: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Field of Study *</Label>
//                 <Input
//                   placeholder="e.g., Computer Science"
//                   value={newRecord.fieldOfStudy}
//                   onChange={(e) => setNewRecord({ ...newRecord, fieldOfStudy: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Grade/CGPA</Label>
//                 <Input
//                   placeholder="e.g., 3.8/4.0"
//                   value={newRecord.gradeCgpa}
//                   onChange={(e) => setNewRecord({ ...newRecord, gradeCgpa: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700">Start Date *</Label>
//                 <Input
//                   type="date"
//                   value={newRecord.startDate}
//                   onChange={(e) => setNewRecord({ ...newRecord, startDate: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label className="text-gray-700">End Date (or Present)</Label>
//                 <Input
//                   type="date"
//                   value={newRecord.endDate}
//                   onChange={(e) => setNewRecord({ ...newRecord, endDate: e.target.value })}
//                   className="bg-white border-gray-300 !text-black"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Existing Education Records */}
//           <div className="space-y-4">
//             <h3 className="text-lg font-semibold text-gray-900">Your Education History</h3>
//             {educationRecords.length === 0 ? (
//               <p className="text-gray-500 text-center py-8">No education records added yet.</p>
//             ) : (
//               educationRecords.map((record, index) => (
//                 <div key={record.id || index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
//                   {editingId === record.id ? (
//                     <div className="space-y-4">
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">Institution Name *</Label>
//                           <Input
//                             value={record.institutionName}
//                             onChange={(e) => handleRecordChange(index, 'institutionName', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">Degree/Qualification *</Label>
//                           <Input
//                             value={record.degreeQualification}
//                             onChange={(e) => handleRecordChange(index, 'degreeQualification', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">Field of Study *</Label>
//                           <Input
//                             value={record.fieldOfStudy}
//                             onChange={(e) => handleRecordChange(index, 'fieldOfStudy', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">Grade/CGPA</Label>
//                           <Input
//                             value={record.gradeCgpa || ''}
//                             onChange={(e) => handleRecordChange(index, 'gradeCgpa', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">Start Date *</Label>
//                           <Input
//                             type="date"
//                             value={record.startDate}
//                             onChange={(e) => handleRecordChange(index, 'startDate', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                         <div className="space-y-2">
//                           <Label className="text-gray-700">End Date</Label>
//                           <Input
//                             type="date"
//                             value={record.endDate || ''}
//                             onChange={(e) => handleRecordChange(index, 'endDate', e.target.value)}
//                             className="bg-white border-gray-300 !text-black"
//                           />
//                         </div>
//                       </div>
//                       <div className="flex justify-end gap-2">
//                         <Button
//                           onClick={() => setEditingId(null)}
//                           variant="outline"
//                           className="border-gray-300 bg-red-500 cursor-pointer"
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           onClick={() => record.id && handleUpdate(record.id, record)}
//                           disabled={isLoading}
//                           className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
//                         >
//                           {isUpdating ? (
//                             <Loader2 className="w-4 h-4 animate-spin" />
//                           ) : (
//                             <>
//                               <Save className="w-4 h-4 mr-2" />
//                               Save
//                             </>
//                           )}
//                         </Button>
//                       </div>
//                     </div>
//                   ) : (
//                     <div>
//                       <div className="flex items-start justify-between">
//                         <div className="flex-1">
//                           <h4 className="text-lg font-semibold text-gray-900">{record.institutionName}</h4>
//                           <p className="text-md text-gray-700">{record.degreeQualification} in {record.fieldOfStudy}</p>
//                           {record.gradeCgpa && (
//                             <p className="text-sm text-gray-600">Grade: {record.gradeCgpa}</p>
//                           )}
//                           {/* <p className="text-sm text-gray-500 mt-1">
//                             {new Date(record.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {record.endDate ? new Date(record.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
//                           </p> */}
//                           <p className="text-sm text-gray-500 mt-1">
//                             {record.startDate
//                               ? new Date(record.startDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
//                               : "No date"}
//                             {" - "}
//                             {record.endDate
//                               ? new Date(record.endDate).toLocaleDateString("en-US", { month: "short", year: "numeric" })
//                               : "Present"}
//                           </p>

//                         </div>
//                         <div className="flex gap-2">
//                           <Button
//                             onClick={() => setEditingId(record.id || null)}
//                             variant="outline"
//                             size="sm"
//                             className="border-emerald-600 text-emerald-500 hover:bg-blue-100 cursor-pointer"
//                           >
//                             <Edit2 className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             onClick={() => record.id && handleDelete(record.id)}
//                             variant="outline"
//                             size="sm"
//                             className="border-red-600 text-red-600 hover:bg-blue-100 cursor-pointer"
//                             disabled={isLoading}
//                           >
//                             {isDeleting ? (
//                               <Loader2 className="w-4 h-4 animate-spin" />
//                             ) : (
//                               <X className="w-4 h-4" />
//                             )}
//                           </Button>
//                         </div>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>

//           {/* Next Button */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <Button 
//               onClick={handleNext}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
//             >
//               Continue to Work Experience
//             </Button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// src/components/edit-profile/sections/StudentEducationSection.tsx

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { GraduationCap, Plus, X, Loader2, Edit2, Save } from "lucide-react";
import { 
  useStudentProfile,
  useAddEducation,
  useUpdateEducation,
  useDeleteEducation
} from "@/hooks/useStudentAPI";
import type { EducationRecord } from "@/types/student";
import { toast } from 'react-hot-toast';

interface StudentEducationSectionProps {
  onSectionChange?: (section: string) => void;
}

const normalizeDate = (value: any): string => {
  if (!value) return "";

  try {
    // Handle if it's already a Date object
    if (value instanceof Date) {
      if (isNaN(value.getTime())) return "";
      return value.toISOString().split("T")[0];
    }

    // Handle string dates (ISO format from backend)
    if (typeof value === 'string') {
      const date = new Date(value);
      if (isNaN(date.getTime())) return "";
      return date.toISOString().split("T")[0];
    }

    return "";
  } catch (error) {
    console.error('Error normalizing date:', error, value);
    return "";
  }
};

export default function StudentEducationSection({ onSectionChange }: StudentEducationSectionProps) {
  const { data: profile } = useStudentProfile();
  const { mutateAsync: addEducation, isPending: isAdding } = useAddEducation();
  const { mutateAsync: updateEducation, isPending: isUpdating } = useUpdateEducation();
  const { mutateAsync: deleteEducation, isPending: isDeleting } = useDeleteEducation();

  const [educationRecords, setEducationRecords] = useState<EducationRecord[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRecord, setNewRecord] = useState<Partial<EducationRecord>>({
    institutionName: '',
    degreeQualification: '',
    fieldOfStudy: '',
    gradeCgpa: '',
    startDate: '',
    endDate: ''
  });

  // Load existing education records
  useEffect(() => {
    if (profile?.data?.educationRecords) {
      setEducationRecords(
        profile.data.educationRecords.map(record => ({
          ...record,
          startDate: normalizeDate(record.startDate),
          endDate: normalizeDate(record.endDate)
        }))
      );
    }
  }, [profile]);

  const handleAddNew = async () => {
    if (!newRecord.institutionName || !newRecord.degreeQualification || !newRecord.fieldOfStudy || !newRecord.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await addEducation({
        institutionName: newRecord.institutionName,
        degreeQualification: newRecord.degreeQualification,
        fieldOfStudy: newRecord.fieldOfStudy,
        gradeCgpa: newRecord.gradeCgpa,
        startDate: new Date(newRecord.startDate).toISOString(),
        endDate: newRecord.endDate ? new Date(newRecord.endDate).toISOString() : undefined
      });
      
      // Add the new record to local state with normalized dates
      if (result?.data) {
        const normalizedRecord = {
          ...result.data,
          startDate: normalizeDate(result.data.startDate),
          endDate: normalizeDate(result.data.endDate)
        };
        setEducationRecords(prev => [...prev, normalizedRecord]);
      }
      
      toast.success('Education record added successfully');
      setNewRecord({
        institutionName: '',
        degreeQualification: '',
        fieldOfStudy: '',
        gradeCgpa: '',
        startDate: '',
        endDate: ''
      });
    } catch (err) {
      toast.error('Failed to add education record');
    }
  };

  const handleUpdate = async (id: number, data: Partial<EducationRecord>) => {
    if (!data.institutionName || !data.degreeQualification || !data.fieldOfStudy || !data.startDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      const result = await updateEducation({
        recordId: id,
        institutionName: data.institutionName,
        degreeQualification: data.degreeQualification,
        fieldOfStudy: data.fieldOfStudy,
        gradeCgpa: data.gradeCgpa,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined
      });
      
      // Update local state with normalized dates
      if (result?.data) {
        setEducationRecords(prev => prev.map(record => 
          record.id === id 
            ? {
                ...result.data,
                startDate: normalizeDate(result.data.startDate),
                endDate: normalizeDate(result.data.endDate)
              }
            : record
        ));
      }
      
      toast.success('Education record updated successfully');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update education record');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this education record?')) {
      try {
        await deleteEducation(id);
        // Remove from local state
        setEducationRecords(prev => prev.filter(record => record.id !== id));
        toast.success('Education record deleted successfully');
      } catch (err) {
        toast.error('Failed to delete education record');
      }
    }
  };

  const handleRecordChange = (index: number, field: keyof EducationRecord, value: string) => {
    setEducationRecords(prev => prev.map((record, i) => 
      i === index ? { ...record, [field]: value } : record
    ));
  };

  const handleNext = () => {
    if (onSectionChange) {
      onSectionChange('work-experience');
    }
  };

  const isLoading = isAdding || isUpdating || isDeleting;

  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[896px] mx-auto !bg-white !shadow-lg !border !border-gray-200 before:!hidden hover:!shadow-sm hover:!ring-0 !transition-none">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <GraduationCap className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">Education</h2>
              <p className="text-sm text-blue-50">Update your Educational Information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-white !animate-none !transition-none">
          {/* Add New Education Record */}
          <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Education</h3>
              <Button
                onClick={handleAddNew}
                disabled={isLoading}
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                {isAdding ? (
                  <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Saving
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Education
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Institution Name *</Label>
                <Input
                  placeholder="University/College Name"
                  value={newRecord.institutionName}
                  onChange={(e) => setNewRecord({ ...newRecord, institutionName: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Degree/Qualification *</Label>
                <Input
                  placeholder="e.g., Bachelor of Science"
                  value={newRecord.degreeQualification}
                  onChange={(e) => setNewRecord({ ...newRecord, degreeQualification: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Field of Study *</Label>
                <Input
                  placeholder="e.g., Computer Science"
                  value={newRecord.fieldOfStudy}
                  onChange={(e) => setNewRecord({ ...newRecord, fieldOfStudy: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Grade/CGPA</Label>
                <Input
                  placeholder="e.g., 3.8/4.0"
                  value={newRecord.gradeCgpa}
                  onChange={(e) => setNewRecord({ ...newRecord, gradeCgpa: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Start Date *</Label>
                <Input
                  type="date"
                  value={newRecord.startDate}
                  onChange={(e) => setNewRecord({ ...newRecord, startDate: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">End Date (or Present)</Label>
                <Input
                  type="date"
                  value={newRecord.endDate}
                  onChange={(e) => setNewRecord({ ...newRecord, endDate: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
            </div>
          </div>

          {/* Existing Education Records */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Education History</h3>
            {educationRecords.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No education records added yet.</p>
            ) : (
              educationRecords.map((record, index) => (
                <div key={record.id || index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  {editingId === record.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Institution Name *</Label>
                          <Input
                            value={record.institutionName}
                            onChange={(e) => handleRecordChange(index, 'institutionName', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Degree/Qualification *</Label>
                          <Input
                            value={record.degreeQualification}
                            onChange={(e) => handleRecordChange(index, 'degreeQualification', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Field of Study *</Label>
                          <Input
                            value={record.fieldOfStudy}
                            onChange={(e) => handleRecordChange(index, 'fieldOfStudy', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Grade/CGPA</Label>
                          <Input
                            value={record.gradeCgpa || ''}
                            onChange={(e) => handleRecordChange(index, 'gradeCgpa', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Start Date *</Label>
                          <Input
                            type="date"
                            value={record.startDate}
                            onChange={(e) => handleRecordChange(index, 'startDate', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">End Date</Label>
                          <Input
                            type="date"
                            value={record.endDate || ''}
                            onChange={(e) => handleRecordChange(index, 'endDate', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          className="border-gray-300 bg-red-500 cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => record.id && handleUpdate(record.id, record)}
                          disabled={isLoading}
                          className="bg-blue-600 text-white hover:bg-blue-500 cursor-pointer"
                        >
                          {isUpdating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{record.institutionName}</h4>
                          <p className="text-md text-gray-700">{record.degreeQualification} in {record.fieldOfStudy}</p>
                          {record.gradeCgpa && (
                            <p className="text-sm text-gray-600">Grade: {record.gradeCgpa}</p>
                          )}
                          <p className="text-sm text-gray-500 mt-1">
                            {record.startDate
                              ? (() => {
                                  try {
                                    const date = new Date(record.startDate);
                                    return isNaN(date.getTime()) 
                                      ? "Invalid date" 
                                      : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                                  } catch {
                                    return "Invalid date";
                                  }
                                })()
                              : "No date"}
                            {" - "}
                            {record.endDate
                              ? (() => {
                                  try {
                                    const date = new Date(record.endDate);
                                    return isNaN(date.getTime()) 
                                      ? "Invalid date" 
                                      : date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
                                  } catch {
                                    return "Invalid date";
                                  }
                                })()
                              : "Present"}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingId(record.id || null)}
                            variant="outline"
                            size="sm"
                            className="border-emerald-600 text-emerald-500 hover:bg-blue-100 cursor-pointer"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => record.id && handleDelete(record.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-600 text-red-600 hover:bg-blue-100 cursor-pointer"
                            disabled={isLoading}
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Continue to Work Experience
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}