import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Heart, Target, TrendingUp, Users, Globe, Lightbulb, Loader2 } from "lucide-react"
import { useUpdateProfileSection } from "@/hooks/useStartupAPI"
import type { Interests } from "@/types/startup"
import { useToast } from "@/components/ui/toast"

interface InterestsSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function InterestsSection({ onSectionChange }: InterestsSectionProps) {
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const { showToast } = useToast();
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
    partnershipInterests: {
      startupPartnerships: false,
      enterprisePartnerships: false,
      researchCollaborations: false,
      academicPartnerships: false,
      governmentContracts: false,
      nonprofitCollaborations: false,
      partnershipGoals: ''
    },
    innovationFocus: {
      productDevelopment: false,
      processInnovation: false,
      businessModelInnovation: false,
      sustainabilityInnovation: false,
      socialImpact: false,
      disruptiveTechnology: false,
      innovationDescription: ''
    },
    futureGoals: ''
  });

  // Load existing data when profile changes
  useEffect(() => {
    // TODO: Get profile data from query
    // For now, we'll use empty form data
  }, []);

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

  const handleNestedTextChange = (section: 'technologyInterests' | 'partnershipInterests' | 'innovationFocus', field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmit = async () => {
    try {
      await updateSection({ section: 'interests', data: formData });
      showToast('Interests updated successfully', 'success');
      // Automatically navigate to next section after successful save
      setTimeout(() => {
        if (onSectionChange) {
          onSectionChange('offerings');
        }
      }, 1000);
    } catch (err) {
      showToast('Failed to update interests', 'error');
    }
  };

  const isFormValid = formData.primaryIndustry && formData.technologyInterests.length > 0;
  const isLoading = isUpdating;

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
                  value={formData.secondaryIndustry}
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
              Technology & Innovation Interests *
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
            </div>
          </div>

          {/* Market Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Globe className="w-5 h-5" />
              Market & Geographic Interests
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="north-america" 
                    checked={formData.marketInterests.includes('North America')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'North America', checked as boolean)}
                  />
                  <Label htmlFor="north-america" className="text-zinc-300">North America</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="europe" 
                    checked={formData.marketInterests.includes('Europe')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'Europe', checked as boolean)}
                  />
                  <Label htmlFor="europe" className="text-zinc-300">Europe</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="asia-pacific" 
                    checked={formData.marketInterests.includes('Asia Pacific')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'Asia Pacific', checked as boolean)}
                  />
                  <Label htmlFor="asia-pacific" className="text-zinc-300">Asia Pacific</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="latin-america" 
                    checked={formData.marketInterests.includes('Latin America')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'Latin America', checked as boolean)}
                  />
                  <Label htmlFor="latin-america" className="text-zinc-300">Latin America</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="middle-east" 
                    checked={formData.marketInterests.includes('Middle East')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'Middle East', checked as boolean)}
                  />
                  <Label htmlFor="middle-east" className="text-zinc-300">Middle East</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="africa" 
                    checked={formData.marketInterests.includes('Africa')}
                    onCheckedChange={(checked) => handleCheckboxChange('marketInterests', 'Africa', checked as boolean)}
                  />
                  <Label htmlFor="africa" className="text-zinc-300">Africa</Label>
                </div>
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
                    id="startups" 
                    checked={formData.partnershipInterests.includes('Startups')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Startups', checked as boolean)}
                  />
                  <Label htmlFor="startups" className="text-zinc-300">Startups</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="enterprises" 
                    checked={formData.partnershipInterests.includes('Enterprises')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Enterprises', checked as boolean)}
                  />
                  <Label htmlFor="enterprises" className="text-zinc-300">Enterprises</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="universities" 
                    checked={formData.partnershipInterests.includes('Universities')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Universities', checked as boolean)}
                  />
                  <Label htmlFor="universities" className="text-zinc-300">Universities</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="research-institutes" 
                    checked={formData.partnershipInterests.includes('Research Institutes')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Research Institutes', checked as boolean)}
                  />
                  <Label htmlFor="research-institutes" className="text-zinc-300">Research Institutes</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="government" 
                    checked={formData.partnershipInterests.includes('Government')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Government', checked as boolean)}
                  />
                  <Label htmlFor="government" className="text-zinc-300">Government</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="non-profits" 
                    checked={formData.partnershipInterests.includes('Non-profits')}
                    onCheckedChange={(checked) => handleCheckboxChange('partnershipInterests', 'Non-profits', checked as boolean)}
                  />
                  <Label htmlFor="non-profits" className="text-zinc-300">Non-profits</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <TrendingUp className="w-5 h-5" />
              Investment & Funding Interests
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="seed-funding" 
                    checked={formData.investmentInterests.includes('Seed Funding')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Seed Funding', checked as boolean)}
                  />
                  <Label htmlFor="seed-funding" className="text-zinc-300">Seed Funding</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="series-a" 
                    checked={formData.investmentInterests.includes('Series A')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Series A', checked as boolean)}
                  />
                  <Label htmlFor="series-a" className="text-zinc-300">Series A</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="series-b" 
                    checked={formData.investmentInterests.includes('Series B')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Series B', checked as boolean)}
                  />
                  <Label htmlFor="series-b" className="text-zinc-300">Series B</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="growth-equity" 
                    checked={formData.investmentInterests.includes('Growth Equity')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Growth Equity', checked as boolean)}
                  />
                  <Label htmlFor="growth-equity" className="text-zinc-300">Growth Equity</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="grants" 
                    checked={formData.investmentInterests.includes('Grants')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Grants', checked as boolean)}
                  />
                  <Label htmlFor="grants" className="text-zinc-300">Grants</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="crowdfunding" 
                    checked={formData.investmentInterests.includes('Crowdfunding')}
                    onCheckedChange={(checked) => handleCheckboxChange('investmentInterests', 'Crowdfunding', checked as boolean)}
                  />
                  <Label htmlFor="crowdfunding" className="text-zinc-300">Crowdfunding</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Research Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Lightbulb className="w-5 h-5" />
              Research & Development Interests
            </div>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="product-development" 
                    checked={formData.researchInterests.includes('Product Development')}
                    onCheckedChange={(checked) => handleCheckboxChange('researchInterests', 'Product Development', checked as boolean)}
                  />
                  <Label htmlFor="product-development" className="text-zinc-300">Product Development</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="market-research" 
                    checked={formData.researchInterests.includes('Market Research')}
                    onCheckedChange={(checked) => handleCheckboxChange('researchInterests', 'Market Research', checked as boolean)}
                  />
                  <Label htmlFor="market-research" className="text-zinc-300">Market Research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="user-research" 
                    checked={formData.researchInterests.includes('User Research')}
                    onCheckedChange={(checked) => handleCheckboxChange('researchInterests', 'User Research', checked as boolean)}
                  />
                  <Label htmlFor="user-research" className="text-zinc-300">User Research</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="technology-research" 
                    checked={formData.researchInterests.includes('Technology Research')}
                    onCheckedChange={(checked) => handleCheckboxChange('researchInterests', 'Technology Research', checked as boolean)}
                  />
                  <Label htmlFor="technology-research" className="text-zinc-300">Technology Research</Label>
                </div>
              </div>
            </div>
          </div>

          {/* Other Interests */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Heart className="w-5 h-5" />
              Other Interests
            </div>
            <div className="space-y-2">
              <Label htmlFor="other-interests" className="text-zinc-300">
                Additional Interests or Focus Areas
              </Label>
              <Textarea
                id="other-interests"
                placeholder="Describe any other interests, focus areas, or strategic priorities for your company..."
                rows={4}
                value={formData.otherInterests}
                onChange={(e) => handleInputChange('otherInterests', e.target.value)}
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