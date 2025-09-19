import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Upload, Building2, MapPin, Globe, Calendar, Users, Target, Loader2 } from "lucide-react"
import { useUpdateProfileSection, useUploadImage,useStartupProfile } from "@/hooks/useStartupAPI"
import type { CompanyDetails } from "@/types/startup"
import { toast } from 'react-hot-toast';

interface CompanyDetailsSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function CompanyDetailsSection({ onSectionChange }: CompanyDetailsSectionProps) {
  const { data: profile, isError } = useStartupProfile();
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const { mutateAsync: uploadImage, isPending: isUploading } = useUploadImage();
  const [formData, setFormData] = useState<CompanyDetails>({
    companyName: '',
    foundedYear: 2024,
    companyEmail: '',
    companyPhone: '',
    companyLocation: '',
    companyWebsite: '',
    companyDescription: '',
    vision: '',
    mission: '',
    teamSize: '',
    companyType: '',
    industry: '',
    revenueRange: '',
    legalName: '',
    taxId: '',
    registrationDate: '',
    businessLicense: ''
  });

  // Load existing data when profile changes
  useEffect(() => {
    if (profile?.data?.companyDetails) {
      const companyDetails = profile.data.companyDetails;
      setFormData({
        companyName: companyDetails.companyName || '',
        foundedYear: companyDetails.foundedYear || 2024,
        companyEmail: companyDetails.companyEmail || '',
        companyPhone: companyDetails.companyPhone || '',
        companyLocation: companyDetails.companyLocation || '',
        companyWebsite: companyDetails.companyWebsite || '',
        companyDescription: companyDetails.companyDescription || '',
        vision: companyDetails.vision || '',
        mission: companyDetails.mission || '',
        teamSize: companyDetails.teamSize || '',
        companyType: companyDetails.companyType || '',
        industry: companyDetails.industry || '',
        revenueRange: companyDetails.revenueRange || '',
        legalName: companyDetails.legalName || '',
        taxId: companyDetails.taxId || '',
        registrationDate: companyDetails.registrationDate ? new Date(companyDetails.registrationDate).toISOString().split('T')[0] : '',
        businessLicense: companyDetails.businessLicense || '',
        companyLogo: companyDetails.companyLogo || ''
      });
    }
  }, [profile]);

  const handleInputChange = (field: keyof CompanyDetails, value: string | number) => {
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
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size must be less than 5MB');
      return;
    }

    try {
      const result = await uploadImage({ file, type: 'logo' });
      setFormData(prev => ({
        ...prev,
        companyLogo: result.url
      }));
      toast.success('Company logo uploaded successfully');
    } catch (err) {
      toast.error('Failed to upload company logo');
    }
  };

  const validateForm = () => {
    const errors: string[] = [];
    
    // Required field validation
    if (!formData.companyName?.trim()) errors.push('Company name is required');
    if (!formData.foundedYear) errors.push('Founded year is required');
    if (!formData.companyEmail?.trim()) errors.push('Company email is required');
    if (!formData.companyPhone?.trim()) errors.push('Company phone is required');
    if (!formData.companyLocation?.trim()) errors.push('Company location is required');
    if (!formData.companyDescription?.trim()) errors.push('Company description is required');
    if (!formData.vision?.trim()) errors.push('Vision is required');
    if (!formData.mission?.trim()) errors.push('Mission is required');
    if (!formData.industry?.trim()) errors.push('Industry is required');
    
    // Length validation (matching backend requirements)
    if (formData.companyDescription && formData.companyDescription.length < 10) {
      errors.push('Company description must be at least 10 characters long');
    }
    if (formData.vision && formData.vision.length < 10) {
      errors.push('Vision must be at least 10 characters long');
    }
    if (formData.mission && formData.mission.length < 10) {
      errors.push('Mission must be at least 10 characters long');
    }
    
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.companyEmail && !emailRegex.test(formData.companyEmail)) {
      errors.push('Please enter a valid email address');
    }
    
    // Founded year validation
    const currentYear = new Date().getFullYear();
    if (formData.foundedYear && (formData.foundedYear < 1900 || formData.foundedYear > currentYear)) {
      errors.push(`Founded year must be between 1900 and ${currentYear}`);
    }
    
    return errors;
  };

  const handleSubmit = async () => {
    // Validate form before submission
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      toast.error(validationErrors[0]); // Show first error
      return;
    }

    try {
      const payload = {
      ...formData,
      registrationDate: formData.registrationDate
        ? new Date(formData.registrationDate).toISOString() 
        : null
    };
      await updateSection({ section: 'companyDetails', data: payload });
      toast.success('Company details updated successfully');
      // Automatically navigate to next section after successful save
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('interests');
        }
      }, 1000);
    } catch (err: any) {
      // Handle backend validation errors
      if (err?.response?.data?.error?.details) {
        const backendErrors = err.response.data.error.details;
        const errorMessage = backendErrors.map((detail: any) => detail.message).join(', ');
        toast.error(errorMessage);
      } else {
        toast.error('Failed to update company details');
      }
    }
  };

  const isFormValid = formData.companyName && formData.foundedYear && formData.companyEmail && 
                     formData.companyPhone && formData.companyLocation && formData.companyDescription && 
                     formData.vision && formData.mission && formData.industry &&
                     formData.companyDescription.length >= 10 && formData.vision.length >= 10 && 
                     formData.mission.length >= 10;
  const isLoading = isUpdating || isUploading;

  return (
    <div className="relative z-10 p-6 px-[106px] py-[60px]">
      <Card className="w-[896px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-6 w-6" />
            <div>
              <h2 className="text-3xl font-bold">Company Details</h2>
              <p className="text-sm text-zinc-300">Complete your company information and organizational details</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Company Logo Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Building2 className="w-5 h-5" />
              Company Logo
            </div>
            <div className="flex items-center space-x-6">
              <div className="relative w-24 h-24 rounded-full border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                <Avatar className="w-full h-full">
                  <AvatarImage src={formData.companyLogo || "/placeholder.svg?height=96&width=96"} alt="Company Logo" />
                  <AvatarFallback>
                    {formData.companyName?.substring(0, 2).toUpperCase() || 'CO'}
                  </AvatarFallback>
                </Avatar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute bottom-0 right-0 bg-zinc-800/70 rounded-full p-1"
                  onClick={() => document.getElementById('company-logo-input')?.click()}
                  disabled={isUploading}
                >
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 text-white animate-spin" />
                  ) : (
                    <Upload className="w-4 h-4 text-white" />
                  )}
                  <span className="sr-only">Upload company logo</span>
                </Button>
                <input
                  id="company-logo-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-zinc-400">Upload your company logo</p>
                <Button variant="link" className="text-purple-400 p-0 h-auto">
                  Change Logo
                </Button>
              </div>
            </div>
          </div>

          {/* Basic Company Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Building2 className="w-5 h-5" />
              Basic Company Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="company-name" className="text-zinc-300">
                  Company Name *
                </Label>
                <Input
                  id="company-name"
                  placeholder="Your Company Name"
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="founded-year" className="text-zinc-300">
                  Founded Year *
                </Label>
                <Input
                  id="founded-year"
                  placeholder="2020"
                  type="number"
                  value={formData.foundedYear}
                  onChange={(e) => handleInputChange('foundedYear', parseInt(e.target.value) || 2024)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-email" className="text-zinc-300">
                  Company Email *
                </Label>
                <Input
                  id="company-email"
                  placeholder="contact@yourcompany.com"
                  type="email"
                  value={formData.companyEmail}
                  onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-phone" className="text-zinc-300">
                  Company Phone *
                </Label>
                <Input
                  id="company-phone"
                  placeholder="+1 (555) 123-4567"
                  type="tel"
                  value={formData.companyPhone}
                  onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-location" className="text-zinc-300">
                  Company Location *
                </Label>
                <Input
                  id="company-location"
                  placeholder="City, Country"
                  value={formData.companyLocation}
                  onChange={(e) => handleInputChange('companyLocation', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website" className="text-zinc-300">
                  Company Website
                </Label>
                <Input
                  id="company-website"
                  placeholder="https://yourcompany.com"
                  type="url"
                  value={formData.companyWebsite || ''}
                  onChange={(e) => handleInputChange('companyWebsite', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Company Description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Company Description
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-description" className="text-zinc-300">
                Company Description *
              </Label>
              <Textarea
                id="company-description"
                placeholder="Describe your company, what you do, and your core business... (minimum 10 characters)"
                rows={4}
                value={formData.companyDescription}
                onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                className={`bg-zinc-800 border-zinc-700 text-white ${
                  formData.companyDescription && formData.companyDescription.length < 10 ? 'border-red-500' : ''
                }`}
              />
              <div className="flex justify-between items-center">
                <span className={`text-xs ${
                  formData.companyDescription && formData.companyDescription.length < 10 ? 'text-red-400' : 'text-gray-500'
                }`}>
                  {formData.companyDescription ? `${formData.companyDescription.length}/10 minimum characters` : 'Minimum 10 characters required'}
                </span>
              </div>
            </div>
          </div>

          {/* Vision & Mission */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Vision & Mission
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="vision" className="text-zinc-300">
                  Vision *
                </Label>
                <Textarea
                  id="vision"
                  placeholder="What is your company's vision for the future? (minimum 10 characters)"
                  rows={3}
                  value={formData.vision}
                  onChange={(e) => handleInputChange('vision', e.target.value)}
                  className={`bg-zinc-800 border-zinc-700 text-white ${
                    formData.vision && formData.vision.length < 10 ? 'border-red-500' : ''
                  }`}
                />
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${
                    formData.vision && formData.vision.length < 10 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {formData.vision ? `${formData.vision.length}/10 minimum characters` : 'Minimum 10 characters required'}
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission" className="text-zinc-300">
                  Mission *
                </Label>
                <Textarea
                  id="mission"
                  placeholder="What is your company's mission statement? (minimum 10 characters)"
                  rows={3}
                  value={formData.mission}
                  onChange={(e) => handleInputChange('mission', e.target.value)}
                  className={`bg-zinc-800 border-zinc-700 text-white ${
                    formData.mission && formData.mission.length < 10 ? 'border-red-500' : ''
                  }`}
                />
                <div className="flex justify-between items-center">
                  <span className={`text-xs ${
                    formData.mission && formData.mission.length < 10 ? 'text-red-400' : 'text-gray-500'
                  }`}>
                    {formData.mission ? `${formData.mission.length}/10 minimum characters` : 'Minimum 10 characters required'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="w-5 h-5" />
              Business Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="team-size" className="text-zinc-300">
                  Team Size
                </Label>
                <Input
                  id="team-size"
                  placeholder="e.g., 1-10, 11-50, 50+"
                  value={formData.teamSize || ''}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-type" className="text-zinc-300">
                  Company Type
                </Label>
                <Input
                  id="company-type"
                  placeholder="e.g., Startup, Enterprise, Non-profit"
                  value={formData.companyType || ''}
                  onChange={(e) => handleInputChange('companyType', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-zinc-300">
                  Industry *
                </Label>
                <Input
                  id="industry"
                  placeholder="e.g., Technology, Healthcare, Finance"
                  value={formData.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue-range" className="text-zinc-300">
                  Revenue Range
                </Label>
                <Input
                  id="revenue-range"
                  placeholder="e.g., $0-50K, $50K-500K, $500K+"
                  value={formData.revenueRange || ''}
                  onChange={(e) => handleInputChange('revenueRange', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Legal Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="w-5 h-5" />
              Legal Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="legal-name" className="text-zinc-300">
                  Legal Name
                </Label>
                <Input
                  id="legal-name"
                  placeholder="Legal Company Name"
                  value={formData.legalName || ''}
                  onChange={(e) => handleInputChange('legalName', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tax-id" className="text-zinc-300">
                  Tax ID
                </Label>
                <Input
                  id="tax-id"
                  placeholder="Tax Identification Number"
                  value={formData.taxId || ''}
                  onChange={(e) => handleInputChange('taxId', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registration-date" className="text-zinc-300">
                  Registration Date
                </Label>
                <Input
                  id="registration-date"
                  type="date"
                  value={formData.registrationDate || ''}
                  onChange={(e) => handleInputChange('registrationDate', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-license" className="text-zinc-300">
                  Business License
                </Label>
                <Input
                  id="business-license"
                  placeholder="Business License Number"
                  value={formData.businessLicense || ''}
                  onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
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
                <div className="flex items-center space-x-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </div>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 