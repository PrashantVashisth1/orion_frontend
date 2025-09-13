"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { User, Mail, Phone, Lock, Eye, EyeOff, Shield } from "lucide-react"
import { signup } from "@/utils/api"
import { useAuth } from "@/contexts/AuthContext"

interface SignupFormProps {
  onClose: () => void
  onSwitchToLogin?: () => void
}

const SignupForm = ({ onClose, onSwitchToLogin }: SignupFormProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    emailOtp: "",
    mobile: "",
    mobileOtp: "",
    password: "",
    confirmPassword: "",
  })

  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [emailOtpSent, setEmailOtpSent] = useState(false)
  const [mobileOtpSent, setMobileOtpSent] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [otpLoading, setOtpLoading] = useState({ email: false, mobile: false })
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);
  try {
   const payload = await signup({
     fullName: formData.fullName,
     email: formData.email,
     mobile: formData.mobile,
     password: formData.password,
     confirmPassword: formData.confirmPassword,
   });
   
   // Use the auth context login function which handles localStorage and navigation
   authLogin(payload.user, payload.token);
   console.log('Signed up & logged in:', payload.user);
    onClose();
  } catch (err) {
    alert(err instanceof Error ? err.message : String(err));
  } finally {
    setIsLoading(false);
  }
};

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const sendEmailOtp = async () => {
    if (!formData.email) return
    setOtpLoading((prev) => ({ ...prev, email: true }))

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setEmailOtpSent(true)
    setOtpLoading((prev) => ({ ...prev, email: false }))
  }

  const sendMobileOtp = async () => {
    if (!formData.mobile) return
    setOtpLoading((prev) => ({ ...prev, mobile: true }))

    // Simulate OTP sending
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setMobileOtpSent(true)
    setOtpLoading((prev) => ({ ...prev, mobile: false }))
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
            Full Name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Email with OTP */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address
          </Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="button"
              onClick={sendEmailOtp}
              disabled={!formData.email || otpLoading.email || emailOtpSent}
              className="h-12 px-4 bg-blue-600 hover:bg-blue-700"
            >
              {otpLoading.email ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : emailOtpSent ? (
                "Sent"
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>

          {/* Email OTP Input */}
          {emailOtpSent && (
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter email OTP"
                value={formData.emailOtp}
                onChange={(e) => handleInputChange("emailOtp", e.target.value)}
                className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                maxLength={6}
              />
            </div>
          )}
        </div>

        {/* Mobile with OTP */}
        <div className="space-y-2">
          <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
            Mobile Number
          </Label>
          <div className="flex space-x-2">
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter your mobile number"
                value={formData.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>
            <Button
              type="button"
              onClick={sendMobileOtp}
              disabled={!formData.mobile || otpLoading.mobile || mobileOtpSent}
              className="h-12 px-4 bg-blue-600 hover:bg-blue-700"
            >
              {otpLoading.mobile ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : mobileOtpSent ? (
                "Sent"
              ) : (
                "Send OTP"
              )}
            </Button>
          </div>

          {/* Mobile OTP Input */}
          {mobileOtpSent && (
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Enter mobile OTP"
                value={formData.mobileOtp}
                onChange={(e) => handleInputChange("mobileOtp", e.target.value)}
                className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
                maxLength={6}
              />
            </div>
          )}
        </div>

        {/* Password */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
            Confirm Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
              className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {/* Privacy Policy Text */}
        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <p className="text-xs text-gray-600 leading-relaxed">
            Your personal data will be used to support your experience throughout this website, to manage access to your
            account, and for other purposes described in our{" "}
            <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
              privacy policy
            </button>
            .
          </p>
        </div>

        {/* Sign Up Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Creating account...</span>
            </div>
          ) : (
            "Create Account"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Already have an account?</span>
        </div>
      </div>

      {/* Login Link */}
      <div className="text-center">
        <button 
          type="button" 
          onClick={() => {
            if (onSwitchToLogin) {
              onSwitchToLogin()
            } else {
              onClose()
            }
          }} 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Sign in to your account
        </button>
      </div>
    </div>
  )
}

export default SignupForm
