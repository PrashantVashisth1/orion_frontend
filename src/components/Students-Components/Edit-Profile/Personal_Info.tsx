// // src/components/edit-profile/sections/StudentPersonalInfoSection.tsx

// import { useState, useEffect } from "react";
// import { Card, CardHeader, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Label } from "@/components/ui/label";
// import { User, Phone, MapPin, Calendar, Loader2, Briefcase } from "lucide-react";
// import { useUpdateProfileSection, useStudentProfile } from "@/hooks/useStudentAPI";
// import type { StudentPersonalInfo } from "@/types/student";
// import { toast } from 'react-hot-toast';

// interface StudentPersonalInfoSectionProps {
//   onSectionChange?: (section: string) => void;
// }

// export default function StudentPersonalInfoSection({ onSectionChange }: StudentPersonalInfoSectionProps) {
//   const { data: profile } = useStudentProfile();
//   const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();

//   const [formData, setFormData] = useState<StudentPersonalInfo>({
//     firstName: '',
//     lastName: '',
//     headline: '',
//     phone: '',
//     gender: '',
//     dateOfBirth: '',
//     location: ''
//   });

//   // Load existing data when profile changes
//   useEffect(() => {
//     if (profile?.data?.personalInfo) {
//       const personalInfo = profile.data.personalInfo;
//       setFormData({
//         firstName: personalInfo.firstName || '',
//         lastName: personalInfo.lastName || '',
//         headline: personalInfo.headline || '',
//         phone: personalInfo.phone || '',
//         gender: personalInfo.gender || '',
//         dateOfBirth: personalInfo.dateOfBirth 
//           ? new Date(personalInfo.dateOfBirth).toISOString().split('T')[0] 
//           : '',
//         location: personalInfo.location || ''
//       });
//     }
//   }, [profile]);

//   const handleInputChange = (field: keyof StudentPersonalInfo, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       [field]: value
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const payload = {
//         ...formData,
//         dateOfBirth: formData.dateOfBirth 
//           ? new Date(formData.dateOfBirth).toISOString() 
//           : undefined
//       };
//       await updateSection({ section: 'personalInfo', data: payload });
//       toast.success('Personal information updated successfully');
//       // Automatically navigate to next section after successful save
//       setTimeout(() => {
//         if (onSectionChange) {
//           onSectionChange('education');
//         }
//       }, 1000);
//     } catch (err) {
//       toast.error('Failed to update personal information');
//     }
//   };

//   const isFormValid = formData.firstName && formData.phone && formData.location;

//   return (
//     <div className="relative z-10 p-6 px-[154px] py-[60px]">
//       <Card className="w-[896px] mx-auto  !bg-white !shadow-lg !border !border-gray-200 before:!hidden hover:!shadow-sm hover:!ring-0 !transition-none">
//         <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
//           <div className="flex items-center space-x-3">
//             <User className="h-6 w-6 text-white" />
//             <div>
//               <h2 className="text-3xl font-bold text-white">Personal Information</h2>
//               <p className="text-sm text-blue-50">Update your basic Personal information</p>
//             </div>
//           </div>
//         </CardHeader>
//         <CardContent className="p-6 space-y-8 bg-white !animate-none !transition-none">
//           {/* Basic Information */}
//           <div className="space-y-4">
//             <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
//               <User className="w-5 h-5" />
//               Basic Information
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div className="space-y-2">
//                 <Label htmlFor="first-name" className="text-gray-700">
//                   First Name *
//                 </Label>
//                 <Input
//                   id="first-name"
//                   placeholder="John"
//                   value={formData.firstName}
//                   onChange={(e) => handleInputChange('firstName', e.target.value)}
//                   className="!bg-white border-gray-300 !text-gray-900"
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="last-name" className="text-gray-700">
//                   Last Name
//                 </Label>
//                 <Input
//                   id="last-name"
//                   placeholder="Doe"
//                   value={formData.lastName || ''}
//                   onChange={(e) => handleInputChange('lastName', e.target.value)}
//                   className="!bg-white border-gray-300 !text-gray-900"
//                 />
//               </div>
//               <div className="space-y-2 md:col-span-2">
//                 <Label htmlFor="headline" className="text-gray-700">
//                   Headline/Professional Title
//                 </Label>
//                 <div className="relative">
//                   <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="headline"
//                     placeholder="e.g., Computer Science Student | Web Developer"
//                     value={formData.headline || ''}
//                     onChange={(e) => handleInputChange('headline', e.target.value)}
//                     className="!bg-white border-gray-300 !text-gray-900 pl-10"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="phone" className="text-gray-700">
//                   Phone Number *
//                 </Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="phone"
//                     placeholder="+1 (555) 123-4567"
//                     type="tel"
//                     value={formData.phone}
//                     onChange={(e) => handleInputChange('phone', e.target.value)}
//                     className="!bg-white border-gray-300 !text-gray-900 pl-10"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="gender" className="text-gray-700">
//                   Gender
//                 </Label>
//                 <select
//                   id="gender"
//                   value={formData.gender || ''}
//                   onChange={(e) => handleInputChange('gender', e.target.value)}
//                   className="w-full px-3 py-2 !bg-white border border-gray-300 rounded-md !text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 >
//                   <option value="">Select Gender</option>
//                   <option value="Male">Male</option>
//                   <option value="Female">Female</option>
//                   <option value="Other">Other</option>
//                   <option value="Prefer not to say">Prefer not to say</option>
//                 </select>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="date-of-birth" className="text-gray-700">
//                   Date of Birth
//                 </Label>
//                 <div className="relative">
//                   <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="date-of-birth"
//                     type="date"
//                     value={formData.dateOfBirth || ''}
//                     onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
//                     className="!bg-white border-gray-300 !text-gray-900 pl-10"
//                   />
//                 </div>
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="location" className="text-gray-700">
//                   Location (City, State, Country) *
//                 </Label>
//                 <div className="relative">
//                   <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//                   <Input
//                     id="location"
//                     placeholder="City, State, Country"
//                     value={formData.location}
//                     onChange={(e) => handleInputChange('location', e.target.value)}
//                     className="!bg-white border-gray-300 text-gray-900 pl-10"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Save Button */}
//           <div className="flex justify-end pt-6 border-t border-gray-200">
//             <Button 
//               onClick={handleSubmit}
//               disabled={!isFormValid || isUpdating}
//               className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
//   );
// }

// src/components/edit-profile/sections/StudentPersonalInfoSection.tsx

import { useState, useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { User, Phone, MapPin, Calendar, Loader2, Briefcase, Camera } from "lucide-react";
import { useUpdateProfileSection, useStudentProfile } from "@/hooks/useStudentAPI";
import type { StudentPersonalInfo } from "@/types/student";
import { toast } from 'react-hot-toast';

// Define the missing interface
interface StudentPersonalInfoSectionProps {
  onSectionChange?: (section: string) => void;
}

// Define the shape of the data we manage internally (from API)
interface StudentPersonalInfoState extends StudentPersonalInfo {
  profilePicture?: string; // S3 URL field added for display
}


export default function StudentPersonalInfoSection({ onSectionChange }: StudentPersonalInfoSectionProps) {
  const { data: profile } = useStudentProfile();
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<StudentPersonalInfoState>({
    firstName: '',
    lastName: '',
    headline: '',
    phone: '',
    gender: '',
    dateOfBirth: '',
    location: '',
    profilePicture: '' // Initialize with empty string
  });

  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [profilePreview, setProfilePreview] = useState<string | null>(null);

  // Load existing data when profile changes
  useEffect(() => {
    if (profile?.data?.personalInfo) {
      const personalInfo = profile.data.personalInfo;
      setFormData({
        firstName: personalInfo.firstName || '',
        lastName: personalInfo.lastName || '',
        headline: personalInfo.headline || '',
        phone: personalInfo.phone || '',
        gender: personalInfo.gender || '',
        dateOfBirth: personalInfo.dateOfBirth 
          ? new Date(personalInfo.dateOfBirth).toISOString().split('T')[0] 
          : '',
        location: personalInfo.location || '',
        profilePicture: personalInfo.profilePicture || ''
      });
      setProfilePreview(personalInfo.profilePicture || null);
    }
  }, [profile]);

  // Handle text input changes
  const handleInputChange = (field: keyof StudentPersonalInfoState, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // Handle file selection changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            toast.error('Only image files are allowed.');
            return;
        }

        setProfileFile(file);
        setProfilePreview(URL.createObjectURL(file)); // Create live preview
    } else {
        setProfileFile(null);
        setProfilePreview(formData.profilePicture || null);
    }
  };

  const handleSubmit = async () => {
    try {
      // 1. Create FormData object for multipart submission
      const formDataToSend = new FormData();

      // 2. Append text fields from state
      Object.entries(formData).forEach(([key, value]) => {
        if (value && key !== 'profilePicture') { 
            if (key === 'dateOfBirth' && formData.dateOfBirth) {
                formDataToSend.append('dateOfBirth', new Date(formData.dateOfBirth).toISOString());
            } else {
                formDataToSend.append(key, String(value));
            }
        }
      });

      // 3. Append the file if selected
      if (profileFile) {
          // 'file' must match the key defined in your backend: uploadSingle("file")
          formDataToSend.append('file', profileFile);
      }

      await updateSection({ section: 'personalInfo', data: formDataToSend });
      
      // Clean up temporary preview URL
      if (profileFile && profilePreview) {
         URL.revokeObjectURL(profilePreview);
      }
      
      toast.success('Personal information and image updated successfully');
      
      // Navigate after success
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('education');
        }
      }, 1000);

    } catch (err) {
      toast.error('Failed to update personal information');
    }
  };

  const isFormValid = formData.firstName && formData.phone && formData.location;

  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[896px] mx-auto !bg-white !shadow-lg !border !border-gray-200 before:!hidden hover:!shadow-sm hover:!ring-0 !transition-none">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">Personal Information</h2>
              <p className="text-sm text-blue-50">Update your basic Personal information</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-6 space-y-8 bg-white !animate-none !transition-none">
          
          {/* 🔥 NEW: Profile Photo Upload Section */}
          <div className="flex items-center space-x-6">
            <div 
              className="relative w-24 h-24 rounded-full border-4 border-blue-500 overflow-hidden cursor-pointer group"
              onClick={() => fileInputRef.current?.click()}
            >
              <img 
                src={profilePreview || 'https://via.placeholder.com/150?text=Upload+Photo'} 
                alt="Profile" 
                className="w-full h-full object-cover" 
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Camera className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-xl font-semibold text-gray-900">Profile Photo</h3>
              <p className="text-sm text-gray-500">JPG or PNG (max 5MB).</p>
              <Button 
                type="button" 
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 bg-blue-50 hover:bg-blue-100 px-3 py-1 text-sm h-auto"
              >
                {profileFile ? 'Change Photo' : 'Upload Photo'}
              </Button>
            </div>
            {/* Hidden file input */}
            <Input
                type="file"
                ref={fileInputRef}
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileChange}
                className="hidden"
                id="profile-picture-input"
            />
          </div>
          {/* END NEW PROFILE PHOTO SECTION */}
          
          
          {/* 💻 RESTORED: Basic Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
              <User className="w-5 h-5" />
              Basic Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-gray-700">
                  First Name *
                </Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="!bg-white border-gray-300 !text-gray-900"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-gray-700">
                  Last Name
                </Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  value={formData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="!bg-white border-gray-300 !text-gray-900"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="headline" className="text-gray-700">
                  Headline/Professional Title
                </Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="headline"
                    placeholder="e.g., Computer Science Student | Web Developer"
                    value={formData.headline || ''}
                    onChange={(e) => handleInputChange('headline', e.target.value)}
                    className="!bg-white border-gray-300 !text-gray-900 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700">
                  Phone Number *
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="!bg-white border-gray-300 !text-gray-900 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender" className="text-gray-700">
                  Gender
                </Label>
                <select
                  id="gender"
                  value={formData.gender || ''}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-3 py-2 !bg-white border border-gray-300 rounded-md !text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-of-birth" className="text-gray-700">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="date-of-birth"
                    type="date"
                    value={formData.dateOfBirth || ''}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="!bg-white border-gray-300 !text-gray-900 pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-gray-700">
                  Location (City, State, Country) *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="City, State, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="!bg-white border-gray-300 text-gray-900 pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid || isUpdating}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
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
  );
}