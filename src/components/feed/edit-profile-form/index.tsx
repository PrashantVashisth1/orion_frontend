"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Camera, Save, X } from "lucide-react"

export default function EditProfileForm() {
  const [formData, setFormData] = useState({
    companyName: "Tech Flow AI Pvt. Lt.",
    foundedYear: "2015",
    email: "Tech Flow AI1234@gmail.com",
    phone: "+91 7868420255",
    location: "Global",
    about:
      "Tech Flow AI is India's leading social commerce platform that enables individuals and small businesses to start their own online stores. Founded in 2015, it offers a wide range of products and services to help entrepreneurs succeed in the digital marketplace.",
    vision:
      "To enable 100 million small businesses in India to succeed online. Create a level playing field for sellers from Tier 2+ cities and rural areas. Make digital entrepreneurship accessible, inclusive, and scalable across the country.",
    mission:
      "To democratize internet commerce for everyone in India. Empower individuals from all backgrounds— especially women and small entrepreneurs—to start their own online businesses. Provide a zero-investment platform with easy product sourcing and sharing tools.",
    website: "",
    linkedin: "",
    twitter: "",
  })

  const [interests, setInterests] = useState([
    { name: "Advertise", selected: true },
    { name: "Share Ideas", selected: true },
    { name: "Network", selected: false },
    { name: "Raise Funding", selected: true },
    { name: "Post Requirements", selected: true },
    { name: "Internships", selected: true },
    { name: "Conduct Brainstorming and GL", selected: false },
    { name: "Live Projects", selected: true },
    { name: "Get Ideas", selected: true },
  ])

  const [products, setProducts] = useState(["Fashion", "Home Decor", "Kitchen Essentials"])
  const [services, setServices] = useState([
    "Zero Commission",
    "Easy Product Listing",
    "Doorstep Delivery",
    "Secure Payment Options",
  ])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleInterest = (index: number) => {
    setInterests((prev) =>
      prev.map((interest, i) => (i === index ? { ...interest, selected: !interest.selected } : interest)),
    )
  }

  const addProduct = () => {
    setProducts((prev) => [...prev, ""])
  }

  const updateProduct = (index: number, value: string) => {
    setProducts((prev) => prev.map((product, i) => (i === index ? value : product)))
  }

  const removeProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }

  const addService = () => {
    setServices((prev) => [...prev, ""])
  }

  const updateService = (index: number, value: string) => {
    setServices((prev) => prev.map((service, i) => (i === index ? value : service)))
  }

  const removeService = (index: number) => {
    setServices((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSave = () => {
    // Handle save logic here
    console.log("Saving profile data:", { formData, interests, products, services })
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      {/* Profile Picture & Basic Info */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                <div className="w-16 h-16 bg-gray-400 rounded-full"></div>
              </div>
              <Button size="sm" className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0">
                <Camera className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 mb-2">Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-2">Upload a professional photo of your company logo or team</p>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange("companyName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="foundedYear">Founded Year</Label>
              <Input
                id="foundedYear"
                value={formData.foundedYear}
                onChange={(e) => handleInputChange("foundedYear", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange("phone", e.target.value)} />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange("location", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                placeholder="https://yourcompany.com"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* About Company */}
      <Card>
        <CardHeader>
          <CardTitle>About The Company</CardTitle>
        </CardHeader>
        <CardContent>
          <Label htmlFor="about">Company Description</Label>
          <Textarea
            id="about"
            value={formData.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            rows={4}
            className="mt-2"
          />
        </CardContent>
      </Card>

      {/* Vision & Mission */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Vision</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea value={formData.vision} onChange={(e) => handleInputChange("vision", e.target.value)} rows={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Mission</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={formData.mission}
              onChange={(e) => handleInputChange("mission", e.target.value)}
              rows={6}
            />
          </CardContent>
        </Card>
      </div>

      {/* Products & Services */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Products
              <Button onClick={addProduct} size="sm" variant="outline">
                Add Product
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {products.map((product, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={product}
                  onChange={(e) => updateProduct(index, e.target.value)}
                  placeholder="Product name"
                />
                <Button
                  onClick={() => removeProduct(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Services
              <Button onClick={addService} size="sm" variant="outline">
                Add Service
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {services.map((service, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={service}
                  onChange={(e) => updateService(index, e.target.value)}
                  placeholder="Service name"
                />
                <Button
                  onClick={() => removeService(index)}
                  size="sm"
                  variant="ghost"
                  className="text-red-600 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Interests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {interests.map((interest, index) => (
              <label key={index} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={interest.selected}
                  onChange={() => toggleInterest(index)}
                  className="rounded border-gray-300"
                />
                <span className="text-sm">{interest.name}</span>
              </label>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Social Media */}
      <Card>
        <CardHeader>
          <CardTitle>Social Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={formData.linkedin}
              onChange={(e) => handleInputChange("linkedin", e.target.value)}
              placeholder="https://linkedin.com/company/yourcompany"
            />
          </div>
          <div>
            <Label htmlFor="twitter">Twitter</Label>
            <Input
              id="twitter"
              value={formData.twitter}
              onChange={(e) => handleInputChange("twitter", e.target.value)}
              placeholder="https://twitter.com/yourcompany"
            />
          </div>
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end space-x-4">
        <Button variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
