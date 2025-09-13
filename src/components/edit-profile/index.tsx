

import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Briefcase, Heart, Info, Upload, Eye, ShoppingCart, X } from "lucide-react"

export default function CompanyProfileForm() {
  const [products, setProducts] = useState<string[]>([])
  const [services, setServices] = useState<string[]>([])

  const addProduct = () => {
    setProducts([...products, ""]) // Add an empty string for a new product input
  }

  const removeProduct = (index: number) => {
    setProducts(products.filter((_, i) => i !== index))
  }

  const handleProductChange = (index: number, value: string) => {
    const newProducts = [...products]
    newProducts[index] = value
    setProducts(newProducts)
  }

  const addService = () => {
    setServices([...services, ""]) // Add an empty string for a new service input
  }

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index))
  }

  const handleServiceChange = (index: number, value: string) => {
    const newServices = [...services]
    newServices[index] = value
    setServices(newServices)
  }

  return (
    <div className="min-h-screen w-full bg-slate-900">
      <Card className="w-full max-w-6xl mx-auto bg-zinc-900 text-white shadow-lg border-0 before:hidden hover:shadow-lg hover:ring-0 transition-none">
        <CardHeader className="bg-gradient-to-r from-purple-800 to-pink-900 p-6 rounded-t-lg">
          <h2 className="text-3xl py-5 font-bold">Company Profile</h2>
          <p className="text-sm text-zinc-300">Complete your company information to get started</p>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-zinc-900">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Briefcase className="w-5 h-5" />
              Basic Information
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <div className="flex flex-col items-center gap-4 md:col-span-1">
                <div className="relative w-24 h-24 rounded-full border-2 border-zinc-700 flex items-center justify-center overflow-hidden">
                  <Avatar className="w-full h-full">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="Profile Picture" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute bottom-0 right-0 bg-zinc-800/70 rounded-full p-1"
                  >
                    <Upload className="w-4 h-4 text-white" />
                    <span className="sr-only">Upload profile picture</span>
                  </Button>
                </div>
                <p className="text-sm text-zinc-400 text-center">
                  Upload a professional photo of your company logo or team
                </p>
                <Button variant="link" className="text-purple-400">
                  Change Photo
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:col-span-2">
                <div className="space-y-2">
                  <Label htmlFor="company-name" className="text-zinc-300">
                    Company Name *
                  </Label>
                  <Input
                    id="company-name"
                    placeholder="Your Company Name"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="founded-year" className="text-zinc-300">
                    Founded Year *
                  </Label>
                  <Input
                    id="founded-year"
                    placeholder="2025"
                    type="number"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-zinc-300">
                    Email *
                  </Label>
                  <Input
                    id="email"
                    placeholder="email@yourcompany.com"
                    type="email"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-zinc-300">
                    Phone *
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    type="tel"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location" className="text-zinc-300">
                    Location *
                  </Label>
                  <Input id="location" placeholder="City, Country" className="bg-zinc-800 border-zinc-700 text-white" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website" className="text-zinc-300">
                    Website
                  </Label>
                  <Input
                    id="website"
                    placeholder="https://yourcompany.com"
                    type="url"
                    className="bg-zinc-800 border-zinc-700 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* About The Company Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Info className="w-5 h-5" />
              About The Company
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-description" className="text-zinc-300">
                Company Description *
              </Label>
              <Textarea
                id="company-description"
                placeholder="Tell us about your company..."
                rows={5}
                className="bg-zinc-800 border-zinc-700 text-white"
              />
            </div>
          </div>

          {/* Vision & Mission Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Eye className="w-5 h-5" />
              Vision & Mission
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="vision" className="text-zinc-300">
                  Vision *
                </Label>
                <Textarea
                  id="vision"
                  placeholder="What is your company's long-term vision?"
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mission" className="text-zinc-300">
                  Mission *
                </Label>
                <Textarea
                  id="mission"
                  placeholder="What is your company's mission statement?"
                  rows={4}
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>

          {/* Products & Services Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <ShoppingCart className="w-5 h-5" />
              Products & Services
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300">Products</Label>
                  <Button onClick={addProduct} className="bg-purple-600 text-white">
                    Add Product
                  </Button>
                </div>
                {products.length === 0 && <p className="text-sm text-zinc-400">No products added yet.</p>}
                {products.map((product, index) => (
                  <div key={`product-${index}`} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Product ${index + 1} Name`}
                      value={product}
                      onChange={(e) => handleProductChange(index, e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeProduct(index)}
                      className="text-zinc-400"
                    >
                      <X className="w-4 h-4" />
                      <span className="sr-only">Remove product</span>
                    </Button>
                  </div>
                ))}
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-zinc-300">Services</Label>
                  <Button onClick={addService} className="bg-pink-500 text-white">
                    Add Service
                  </Button>
                </div>
                {services.length === 0 && <p className="text-sm text-zinc-400">No services added yet.</p>}
                {services.map((service, index) => (
                  <div key={`service-${index}`} className="flex items-center gap-2 mt-2">
                    <Input
                      placeholder={`Service ${index + 1} Name`}
                      value={service}
                      onChange={(e) => handleServiceChange(index, e.target.value)}
                      className="bg-zinc-800 border-zinc-700 text-white flex-grow"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeService(index)}
                      className="text-zinc-400"
                    >
                      <X className="w-4 h-4" />
                      <span className="sr-only">Remove service</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interests Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Heart className="w-5 h-5" />
              Interests
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-advertise"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-advertise" className="text-zinc-300">
                  Advertise
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-share-ideas"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-share-ideas" className="text-zinc-300">
                  Share Ideas
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-network"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-network" className="text-zinc-300">
                  Network
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-raise-funding"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-raise-funding" className="text-zinc-300">
                  Raise Funding
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-post-requirements"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-post-requirements" className="text-zinc-300">
                  Post Requirements
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-internships"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-internships" className="text-zinc-300">
                  Internships
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-brainstorming"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-brainstorming" className="text-zinc-300">
                  Conduct Brainstorming and GL
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-live-projects"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-live-projects" className="text-zinc-300">
                  Live Projects
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="interest-get-ideas"
                  className="border-zinc-700 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
                />
                <Label htmlFor="interest-get-ideas" className="text-zinc-300">
                  Get Ideas
                </Label>
              </div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-lg font-semibold text-white">
              <Upload className="w-5 h-5" />
              Social Media
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="linkedin" className="text-zinc-300">
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  placeholder="https://linkedin.com/company/yourcompany"
                  type="url"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter" className="text-zinc-300">
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  placeholder="https://twitter.com/yourcompany"
                  type="url"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook" className="text-zinc-300">
                  Facebook
                </Label>
                <Input
                  id="facebook"
                  placeholder="https://facebook.com/yourcompany"
                  type="url"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram" className="text-zinc-300">
                  Instagram
                </Label>
                <Input
                  id="instagram"
                  placeholder="https://instagram.com/yourcompany"
                  type="url"
                  className="bg-zinc-800 border-zinc-700 text-white"
                />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 border-t border-zinc-800 flex justify-end gap-4 bg-zinc-900">
          <Button
            variant="outline"
            className="border-zinc-700 text-zinc-300 bg-transparent"
          >
            Cancel
          </Button>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-500 text-white">
            Save Changes
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
