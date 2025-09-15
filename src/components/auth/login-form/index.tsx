// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Eye, EyeOff, Mail, Lock } from "lucide-react"
// import { login } from "@/utils/api"
// import { useToast } from "@/components/ui/toast"
// import { useAuth } from "@/contexts/AuthContext"

// interface LoginFormProps {
//   onClose: () => void
//   onSwitchToSignup?: () => void
// }

// const LoginForm = ({ onClose, onSwitchToSignup }: LoginFormProps) => {
//   const [formData, setFormData] = useState({
//     emailOrUsername: "",
//     password: "",
//     rememberMe: false,
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const { showToast } = useToast();
//   const { login: authLogin } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const { user, token } = await login({
//         email: formData.emailOrUsername,
//         password: formData.password,
//       });
      
//       // Use the auth context login function which handles localStorage and navigation
//       authLogin(user, token);
//       showToast('Successfully logged in!', 'success');
//       onClose();
//     } catch (err) {
//       let message = err instanceof Error ? err.message : String(err);
//       if (/not found|no user/i.test(message)) {
//         showToast('User not found.', 'error');
//       } else if (/password/i.test(message)) {
//         showToast('Password does not match.', 'error');
//       } else if (/failed to fetch/i.test(message)) {
//         showToast('Network error. Please try again.', 'error');
//       } else {
//         showToast(message, 'error');
//       }
//     } finally {
//       setIsLoading(false);
//     }
//   }

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   return (
//     <div className="space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Email/Username Field */}
//         <div className="space-y-2">
//           <Label htmlFor="emailOrUsername" className="text-sm font-medium text-gray-700">
//             Username or Email Address
//           </Label>
//           <div className="relative">
//             <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               id="emailOrUsername"
//               type="text"
//               placeholder="Enter your username or email"
//               value={formData.emailOrUsername}
//               onChange={(e) => handleInputChange("emailOrUsername", e.target.value)}
//               className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         {/* Password Field */}
//         <div className="space-y-2">
//           <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//             Password
//           </Label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={formData.password}
//               onChange={(e) => handleInputChange("password", e.target.value)}
//               className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//             </button>
//           </div>
//         </div>

//         {/* Remember Me & Forgot Password */}
//         <div className="flex items-center justify-between">
//           <div className="flex items-center space-x-2">
//             <Checkbox
//               id="rememberMe"
//               checked={formData.rememberMe}
//               onCheckedChange={(checked) => handleInputChange("rememberMe", checked as boolean)}
//             />
//             <Label htmlFor="rememberMe" className="text-sm text-gray-600 cursor-pointer">
//               Remember me
//             </Label>
//           </div>
//           <button type="button" className="text-sm text-blue-600 hover:text-blue-800 font-medium">
//             Lost your password?
//           </button>
//         </div>

//         {/* Login Button */}
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
//         >
//           {isLoading ? (
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               <span>Signing in...</span>
//             </div>
//           ) : (
//             "Log In"
//           )}
//         </Button>
//       </form>

//       {/* Divider */}
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200" />
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
//         </div>
//       </div>

//       {/* Sign Up Link */}
//       <div className="text-center">
//         <button 
//           type="button" 
//           onClick={() => {
//             if (onSwitchToSignup) {
//               onSwitchToSignup()
//             } else {
//               onClose()
//             }
//           }} 
//           className="text-blue-600 hover:text-blue-800 font-medium"
//         >
//           Create a new account
//         </button>
//       </div>
//     </div>
//   )
// }

// export default LoginForm


// src/components/forms/LoginForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react';

interface LoginFormProps {
  onClose?: () => void;
  onSwitchToSignup?: () => void;
}

export default function LoginForm({ onClose, onSwitchToSignup }: LoginFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    try {
      await login(formData.email, formData.password);
      toast.success('Login successful!');
      onClose?.();
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Signing in...
              </>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Switch to Signup */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <button
              onClick={onSwitchToSignup}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              disabled={isLoading}
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}