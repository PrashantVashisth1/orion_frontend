import { useState, useEffect } from "react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Package, Settings, Plus, X, DollarSign, Users, Target, Loader2 } from "lucide-react"
import { useUpdateProfileSection,useStartupProfile } from "@/hooks/useStartupAPI"
import type { Offerings } from "@/types/startup"
import { toast } from 'react-hot-toast';

interface OfferingsSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function OfferingsSection({ onSectionChange }: OfferingsSectionProps) {
  const { data: profile} = useStartupProfile();
  const { mutateAsync: updateSection, isPending: isUpdating } = useUpdateProfileSection();
  const [formData, setFormData] = useState<Offerings>({
    products: [],
    services: [],
    pricingModel: '',
    targetMarket: '',
    competitiveAdvantage: '',
    valueProposition: '',
    businessModel: '',
    revenueStreams: [],
    partnerships: [],
    certifications: []
  });

  // Load existing data when profile changes
useEffect(() => {
  if (profile?.data?.offerings) {
    const offerings = profile.data.offerings;
    console.log('Loading existing offerings:', offerings);
    
    setFormData({
      // Handle both array and JSON cases for backwards compatibility
      products: Array.isArray(offerings.products) 
        ? offerings.products 
        : (typeof offerings.products === 'string' 
          ? JSON.parse(offerings.products || '[]') 
          : offerings.products || []),
      
      services: Array.isArray(offerings.services) 
        ? offerings.services 
        : (typeof offerings.services === 'string' 
          ? JSON.parse(offerings.services || '[]') 
          : offerings.services || []),
          
      pricingModel:  offerings.pricingModel || '',
      targetMarket:  offerings.targetMarket || '',
      revenueStreams:  offerings.revenueStreams || [],
      valueProposition:  offerings.valueProposition || '',
      competitiveAdvantage:  offerings.competitiveAdvantage || '',
      businessModel:  offerings.businessModel || '',
      partnerships: offerings.partnerships || [],
      certifications: offerings.certifications || []
    });
  } else {
    console.log('No existing offerings found, using defaults');
  }
}, [profile]);

  const handleInputChange = (field: keyof Offerings, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // const handleArrayChange = (field: keyof Pick<Offerings, 'products' | 'services' | 'revenueStreams' | 'partnerships' | 'certifications'>, value: string[]) => {
  //   setFormData(prev => ({
  //     ...prev,
  //     [field]: value
  //   }));
  // };

  const addItem = (field: keyof Pick<Offerings, 'products' | 'services' | 'revenueStreams' | 'partnerships' | 'certifications'>) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], ""]
    }));
  };

  const removeItem = (field: keyof Pick<Offerings, 'products' | 'services' | 'revenueStreams' | 'partnerships' | 'certifications'>, index: number) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleItemChange = (field: keyof Pick<Offerings, 'products' | 'services' | 'revenueStreams' | 'partnerships' | 'certifications'>, index: number, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].map((item, i) => i === index ? value : item)
    }));
  };

const handleSubmit = async () => {
    try {
        console.log('Original formData:', formData);
        
        // Clean and transform data
        const apiPayload = {
            products: formData.products.filter(p => p && p.trim() !== ''),
            services: formData.services.filter(s => s && s.trim() !== ''),
            revenue_streams: formData.revenueStreams.filter(r => r && r.trim() !== ''),
            partnerships: formData.partnerships.filter(p => p && p.trim() !== ''),
            certifications: formData.certifications.filter(c => c && c.trim() !== ''),
            
            // String fields - ensure they're not undefined
            pricing_model: formData.pricingModel || '',
            target_market: formData.targetMarket || '',
            competitive_advantage: formData.competitiveAdvantage || '',
            value_proposition: formData.valueProposition || '',
            business_model: formData.businessModel || '',
        };
        
        console.log('API Payload being sent:', apiPayload);
        console.log('Payload stringified:', JSON.stringify(apiPayload, null, 2));
        
        const response = await updateSection({ section: 'offerings', data: apiPayload });
        console.log('Response:', response);
        
        toast.success('Offerings updated successfully');
        
        setTimeout(() => {
            if (onSectionChange) {
                onSectionChange('personal-info');
            }
        }, 1000);
        
    } catch (err) {
        // console.error('Full submission error:', err);
        // console.error('Error response:', err.response?.data);
        // console.error('Error status:', err.response?.status);
        
        // // Show more specific error message
        // const errorMessage = isError.response?.data?.error?.message || 
        //                    err.response?.data?.message || 
        //                    'Failed to update offerings';
        toast.error(`Error: ${err}`);
    }
};
  const isFormValid = formData.products.length > 0 || formData.services.length > 0;
  const isLoading = isUpdating;

  return (
    <div className="relative z-10 p-6 px-[106px] py-[60px]">
      <Card className="w-[896px] mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6" />
            <div>
              <h2 className="text-3xl font-bold">Offerings of Company</h2>
              <p className="text-sm text-zinc-300">Define your company's products, services, and offerings</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Products Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Package className="w-5 h-5" />
              Products
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Product Offerings</Label>
                <Button onClick={() => addItem('products')} className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Product
                </Button>
              </div>
              {formData.products.length === 0 && (
                <p className="text-sm text-zinc-400">No products added yet.</p>
              )}
              {formData.products.map((product, index) => (
                <div key={`product-${index}`} className="flex items-center gap-2">
                  <Input
                    placeholder={`Product ${index + 1} Name`}
                    value={product}
                    onChange={(e) => handleItemChange('products', index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem('products', index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove product</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Services Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Settings className="w-5 h-5" />
              Services
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Service Offerings</Label>
                <Button onClick={() => addItem('services')} className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </div>
              {formData.services.length === 0 && (
                <p className="text-sm text-zinc-400">No services added yet.</p>
              )}
              {formData.services.map((service, index) => (
                <div key={`service-${index}`} className="flex items-center gap-2">
                  <Input
                    placeholder={`Service ${index + 1} Name`}
                    value={service}
                    onChange={(e) => handleItemChange('services', index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem('services', index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove service</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Business Model & Pricing */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <DollarSign className="w-5 h-5" />
              Business Model & Pricing
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="pricing-model" className="text-zinc-300">
                  Pricing Model
                </Label>
                <Input
                  id="pricing-model"
                  placeholder="e.g., Subscription, One-time, Freemium"
                  value={formData.pricingModel}
                  onChange={(e) => handleInputChange('pricingModel', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="business-model" className="text-zinc-300">
                  Business Model
                </Label>
                <Input
                  id="business-model"
                  placeholder="e.g., B2B, B2C, Marketplace"
                  value={formData.businessModel}
                  onChange={(e) => handleInputChange('businessModel', e.target.value)}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Target Market */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Target Market
            </div>
            <div className="space-y-2">
              <Label htmlFor="target-market" className="text-zinc-300">
                Target Market Description
              </Label>
              <Textarea
                id="target-market"
                placeholder="Describe your target market, customer segments, and ideal customers..."
                rows={3}
                value={formData.targetMarket}
                onChange={(e) => handleInputChange('targetMarket', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Value Proposition */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Value Proposition
            </div>
            <div className="space-y-2">
              <Label htmlFor="value-proposition" className="text-zinc-300">
                Value Proposition
              </Label>
              <Textarea
                id="value-proposition"
                placeholder="What unique value do you provide to your customers?"
                rows={3}
                value={formData.valueProposition}
                onChange={(e) => handleInputChange('valueProposition', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Competitive Advantage */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="w-5 h-5" />
              Competitive Advantage
            </div>
            <div className="space-y-2">
              <Label htmlFor="competitive-advantage" className="text-zinc-300">
                Competitive Advantage
              </Label>
              <Textarea
                id="competitive-advantage"
                placeholder="What makes your offerings unique compared to competitors?"
                rows={3}
                value={formData.competitiveAdvantage}
                onChange={(e) => handleInputChange('competitiveAdvantage', e.target.value)}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Revenue Streams */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <DollarSign className="w-5 h-5" />
              Revenue Streams
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Revenue Sources</Label>
                <Button onClick={() => addItem('revenueStreams')} className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Revenue Stream
                </Button>
              </div>
              {formData.revenueStreams.length === 0 && (
                <p className="text-sm text-zinc-400">No revenue streams added yet.</p>
              )}
              {formData.revenueStreams.map((stream, index) => (
                <div key={`revenue-${index}`} className="flex items-center gap-2">
                  <Input
                    placeholder={`Revenue Stream ${index + 1}`}
                    value={stream}
                    onChange={(e) => handleItemChange('revenueStreams', index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem('revenueStreams', index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove revenue stream</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Partnerships */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Users className="w-5 h-5" />
              Partnerships
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Strategic Partnerships</Label>
                <Button onClick={() => addItem('partnerships')} className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Partnership
                </Button>
              </div>
              {formData.partnerships.length === 0 && (
                <p className="text-sm text-zinc-400">No partnerships added yet.</p>
              )}
              {formData.partnerships.map((partnership, index) => (
                <div key={`partnership-${index}`} className="flex items-center gap-2">
                  <Input
                    placeholder={`Partnership ${index + 1}`}
                    value={partnership}
                    onChange={(e) => handleItemChange('partnerships', index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem('partnerships', index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove partnership</span>
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Package className="w-5 h-5" />
              Certifications & Awards
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-zinc-300">Certifications & Awards</Label>
                <Button onClick={() => addItem('certifications')} className="bg-purple-600 text-white hover:bg-purple-700">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Certification
                </Button>
              </div>
              {formData.certifications.length === 0 && (
                <p className="text-sm text-zinc-400">No certifications added yet.</p>
              )}
              {formData.certifications.map((certification, index) => (
                <div key={`certification-${index}`} className="flex items-center gap-2">
                  <Input
                    placeholder={`Certification ${index + 1}`}
                    value={certification}
                    onChange={(e) => handleItemChange('certifications', index, e.target.value)}
                    className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem('certifications', index)}
                    className="text-zinc-400 hover:text-red-400"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Remove certification</span>
                  </Button>
                </div>
              ))}
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