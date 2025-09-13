import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Building2, Briefcase, Users, Target, TrendingUp, Globe, Loader2 } from "lucide-react"
import { useUpdateProfileSection } from "@/hooks/useStartupAPI"
import type { BusinessDetails } from "@/types/startup"
import { useToast } from "@/components/ui/toast"

interface BusinessDetailsSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function BusinessDetailsSection({ onSectionChange }: BusinessDetailsSectionProps) {
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const { showToast } = useToast();
  const [formData, setFormData] = useState<BusinessDetails>({
    jobTitle: '',
    company: '',
    industry: '',
    experience: '',
    businessType: '',
    teamSize: '',
    revenue: '',
    fundingStage: '',
    skills: '',
    goals: '',
    linkedinProfile: '',
    twitterProfile: '',
    githubProfile: '',
    portfolioWebsite: ''
  });

  // Load existing data when profile changes
  useEffect(() => {
    // TODO: Get profile data from query
    // For now, we'll use empty form data
  }, []);

  const handleInputChange = (field: keyof BusinessDetails, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateSection({ section: 'businessDetails', data: formData });
      showToast('Business details updated successfully', 'success');
      // Automatically navigate to next section after successful save
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('company-details');
        }
      }, 1000);
    } catch (err) {
      showToast('Failed to update business details', 'error');
    }
  };

  const isFormValid = formData.jobTitle && formData.industry;
  const isLoading = isUpdating;

  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[800px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Building2 className="h-6 w-6" />
            <div>
              <h2 className="text-3xl font-bold">Business Details</h2>
              <p className="text-sm text-zinc-300">Update your business information and professional details</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Professional Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="w-5 h-5" />
              Professional Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="job-title" className="text-zinc-300">
                  Job Title *
                </Label>
                <Input
                  id="job-title"
                  placeholder="e.g., CEO, Founder, Developer"
                  value={formData.jobTitle}
                  onChange={(e) => handleInputChange('jobTitle', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company" className="text-zinc-300">
                  Company/Organization
                </Label>
                <Input
                  id="company"
                  placeholder="Your Company Name"
                  value={formData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
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
                <Label htmlFor="experience" className="text-zinc-300">
                  Years of Experience
                </Label>
                <Input
                  id="experience"
                  placeholder="e.g., 5 years"
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Business Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Building2 className="w-5 h-5" />
              Business Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="business-type" className="text-zinc-300">
                  Business Type
                </Label>
                <Input
                  id="business-type"
                  placeholder="e.g., Startup, Enterprise, Freelance"
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="team-size" className="text-zinc-300">
                  Team Size
                </Label>
                <Input
                  id="team-size"
                  placeholder="e.g., 1-10, 11-50, 50+"
                  value={formData.teamSize}
                  onChange={(e) => handleInputChange('teamSize', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="revenue" className="text-zinc-300">
                  Revenue Range
                </Label>
                <Input
                  id="revenue"
                  placeholder="e.g., $0-50K, $50K-500K, $500K+"
                  value={formData.revenue}
                  onChange={(e) => handleInputChange('revenue', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="funding-stage" className="text-zinc-300">
                  Funding Stage
                </Label>
                <Input
                  id="funding-stage"
                  placeholder="e.g., Bootstrapped, Seed, Series A"
                  value={formData.fundingStage}
                  onChange={(e) => handleInputChange('fundingStage', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Skills & Expertise */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Skills & Expertise
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills" className="text-zinc-300">
                Key Skills
              </Label>
              <Textarea
                id="skills"
                placeholder="List your key skills and expertise areas..."
                rows={3}
                value={formData.skills}
                onChange={(e) => handleInputChange('skills', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Business Goals */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUp className="w-5 h-5" />
              Business Goals
            </div>
            <div className="space-y-2">
              <Label htmlFor="goals" className="text-zinc-300">
                What are your business goals?
              </Label>
              <Textarea
                id="goals"
                placeholder="Describe your short-term and long-term business objectives..."
                rows={4}
                value={formData.goals}
                onChange={(e) => handleInputChange('goals', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Globe className="w-5 h-5" />
              Professional Links
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-zinc-300">
                  LinkedIn Profile
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/in/yourprofile"
                  type="url"
                  value={formData.linkedinProfile}
                  onChange={(e) => handleInputChange('linkedinProfile', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-zinc-300">
                  Twitter/X Profile
                </Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourhandle"
                  type="url"
                  value={formData.twitterProfile}
                  onChange={(e) => handleInputChange('twitterProfile', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github" className="text-zinc-300">
                  GitHub Profile
                </Label>
                <Input
                  id="github"
                  placeholder="https://github.com/yourusername"
                  type="url"
                  value={formData.githubProfile}
                  onChange={(e) => handleInputChange('githubProfile', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="portfolio" className="text-zinc-300">
                  Portfolio Website
                </Label>
                <Input
                  id="portfolio"
                  placeholder="https://yourportfolio.com"
                  type="url"
                  value={formData.portfolioWebsite}
                  onChange={(e) => handleInputChange('portfolioWebsite', e.target.value)}
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