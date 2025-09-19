import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Upload, Mail, Phone, MapPin, Globe, Calendar, Loader2 } from "lucide-react"
import { useUpdateProfileSection, useUploadImage,useStartupProfile } from "@/hooks/useStartupAPI"
import type { PersonalInfo } from "@/types/startup"
 import { toast } from 'react-hot-toast';

interface PersonalInfoSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function PersonalInfoSection({ onSectionChange }: PersonalInfoSectionProps) {
  const { data: profile, isError } = useStartupProfile();
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();

  const [formData, setFormData] = useState<PersonalInfo>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    birthDate: '',
    bio: '',
    profilePicture: ''
  });

  // Load existing data when profile changes
  useEffect(() => {
    // Check if profileData exists and has the personalInfo section
    if (profile?.data?.personalInfo) {
      const personalInfo = profile?.data?.personalInfo;
      console.log(personalInfo);
      setFormData({
        firstName: personalInfo.firstName || '',
        lastName: personalInfo.lastName || '',
        email: personalInfo.email || '',
        phone: personalInfo.phone || '',
        location: personalInfo.location || '',
        website: personalInfo.website || '',
        birthDate: personalInfo.birthDate ? new Date(personalInfo.birthDate).toISOString().split('T')[0] : '',
        bio: personalInfo.bio || '',
        profilePicture: personalInfo.profilePicture || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof PersonalInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file');
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      const result = await uploadImage({ file, type: 'profile' });
      setFormData(prev => ({
        ...prev,
        profilePicture: result.url
      }));
      toast.success('Profile picture uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload profile picture');
    }
  };

  const handleSubmit = async () => {
    try {
      const payload = {
      ...formData,
      birthDate: formData.birthDate 
        ? new Date(formData.birthDate).toISOString() 
        : null
    };
      await updateSection({ section: 'personalInfo', data: payload });
      toast.success('Personal information updated successfully');
      // Automatically navigate to next section after successful save
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('business-details');
        }
      }, 1000);
    } catch (err) {
      toast.error('Failed to update personal information');
    }
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.location;
  const isLoading = isUpdating || isUploading;
  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[800px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <User className="h-6 w-6" />
            <div>
              <h2 className="text-3xl font-bold">Personal Information</h2>
              <p className="text-sm text-zinc-300">Update your personal details and contact information</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Profile Picture Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <User className="w-5 h-5" />
              Profile Picture
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                <Avatar className="w-full h-full">
                  <AvatarImage src={formData.profilePicture || "/placeholder.svg?height=96&width=96"} alt="Profile Picture" />
                  <AvatarFallback>
                    {formData.firstName?.[0]?.toUpperCase() || 'U'}{formData.lastName?.[0]?.toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-zinc-800/70 rounded-full p-1"
                  onClick={() => document.getElementById('profile-picture-input')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-white" />
                  )}
                  <span className="sr-only">Upload profile picture</span>
                </Button>
                <input
                  id="profile-picture-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Upload a professional photo</p>
                <Button variant="link" className="text-purple-400 p-0 h-auto">
                  Change Photo
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <User className="w-5 h-5" />
              Basic Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-zinc-300">
                  First Name *
                </Label>
                <Input
                  id="first-name"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-zinc-300">
                  Last Name *
                </Label>
                <Input
                  id="last-name"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-300">
                  Email Address *
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-zinc-300">
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
                    className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location" className="text-zinc-300">
                  Location *
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-zinc-300">
                  Personal Website
                </Label>
                <div className="relative">
                  <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="website"
                    placeholder="https://yourwebsite.com"
                    type="url"
                    value={formData.website || ''}
                    onChange={(e) => handleInputChange('website', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="birth-date" className="text-zinc-300">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="birth-date"
                    type="date"
                    value={formData.birthDate || ''}
                    onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white pl-10"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <User className="w-5 h-5" />
              Bio
            </div>
            <div className="space-y-2">
              <Label htmlFor="bio" className="text-zinc-300">
                About You
              </Label>
              <Textarea
                id="bio"
                placeholder="Tell us about yourself, your background, and what you're passionate about..."
                rows={4}
                value={formData.bio || ''}
                onChange={(e) => handleInputChange('bio', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end pt-6">
            <Button 
              onClick={handleSubmit}
              disabled={!isFormValid || isLoading}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
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