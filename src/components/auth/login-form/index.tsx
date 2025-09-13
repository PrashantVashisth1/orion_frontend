import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Eye, EyeOff, Mail, Lock } from "lucide-react"
import { login } from "@/utils/api"
import { useToast } from "@/components/ui/toast"
import { useAuth } from "@/contexts/AuthContext"

interface LoginFormProps {
  onClose: () => void
  onSwitchToSignup?: () => void
}

const LoginForm = ({ onClose, onSwitchToSignup }: LoginFormProps) => {
  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
    rememberMe: false,
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { showToast } = useToast();
  const { login: authLogin } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const { user, token } = await login({
        email: formData.emailOrUsername,
        password: formData.password,
      });
      
      // Use the auth context login function which handles localStorage and navigation
      authLogin(user, token);
      showToast('Successfully logged in!', 'success');
      onClose();
    } catch (err) {
      let message = err instanceof Error ? err.message : String(err);
      if (/not found|no user/i.test(message)) {
        showToast('User not found.', 'error');
      } else if (/password/i.test(message)) {
        showToast('Password does not match.', 'error');
      } else if (/failed to fetch/i.test(message)) {
        showToast('Network error. Please try again.', 'error');
      } else {
        showToast(message, 'error');
      }
    } finally {
      setIsLoading(false);
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email/Username Field */}
        <div className="space-y-2">
          <Label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700">
            Username or Email Address
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="emailOrUsername"
              type="text"
              placeholder="Enter your username or email"
              value={formData.emailOrUsername}
              onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
              className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-gray-700">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
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

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="rememberMe"
              checked={formData.rememberMe}
              onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
            />
            <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
              Remember me
            </Label>
          </div>
          <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            Lost your password?
          </button>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Signing in...</span>
            </div>
          ) : (
            "Log In"
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="text-center">
        <button 
          type="button" 
          onClick={() => {
            if (onSwitchToSignup) {
              onSwitchToSignup()
            } else {
              onClose()
            }
          }} 
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          Create a new account
        </button>
      </div>
    </div>
  )
}

export default LoginForm
