// "use client"

// import type React from "react"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { User, Mail, Phone, Lock, Eye, EyeOff, Shield } from "lucide-react"
// import { signup } from "@/utils/api"
// import { useAuth } from "@/contexts/AuthContext"

// interface SignupFormProps {
//   onClose: () => void
//   onSwitchToLogin?: () => void
// }

// const SignupForm = ({ onClose, onSwitchToLogin }: SignupFormProps) => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     emailOtp: "",
//     mobile: "",
//     mobileOtp: "",
//     password: "",
//     confirmPassword: "",
//   })

//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [emailOtpSent, setEmailOtpSent] = useState(false)
//   const [mobileOtpSent, setMobileOtpSent] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [otpLoading, setOtpLoading] = useState({ email: false, mobile: false })
//   const { login: authLogin } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();
//   setIsLoading(true);
//   try {
//    const payload = await signup({
//      fullName: formData.fullName,
//      email: formData.email,
//      mobile: formData.mobile,
//      password: formData.password,
//      confirmPassword: formData.confirmPassword,
//    });
   
//    // Use the auth context login function which handles localStorage and navigation
//    authLogin(payload.user, payload.token);
//    console.log('Signed up & logged in:', payload.user);
//     onClose();
//   } catch (err) {
//     alert(err instanceof Error ? err.message : String(err));
//   } finally {
//     setIsLoading(false);
//   }
// };

//   const handleInputChange = (field: string, value: string) => {
//     setFormData((prev) => ({ ...prev, [field]: value }))
//   }

//   const sendEmailOtp = async () => {
//     if (!formData.email) return
//     setOtpLoading((prev) => ({ ...prev, email: true }))

//     // Simulate OTP sending
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     setEmailOtpSent(true)
//     setOtpLoading((prev) => ({ ...prev, email: false }))
//   }

//   const sendMobileOtp = async () => {
//     if (!formData.mobile) return
//     setOtpLoading((prev) => ({ ...prev, mobile: true }))

//     // Simulate OTP sending
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     setMobileOtpSent(true)
//     setOtpLoading((prev) => ({ ...prev, mobile: false }))
//   }

//   return (
//     <div className="space-y-6">
//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Full Name */}
//         <div className="space-y-2">
//           <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
//             Full Name
//           </Label>
//           <div className="relative">
//             <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               id="fullName"
//               type="text"
//               placeholder="Enter your full name"
//               value={formData.fullName}
//               onChange={(e) => handleInputChange("fullName", e.target.value)}
//               className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//           </div>
//         </div>

//         {/* Email with OTP */}
//         <div className="space-y-2">
//           <Label htmlFor="email" className="text-sm font-medium text-gray-700">
//             Email Address
//           </Label>
//           <div className="flex space-x-2">
//             <div className="relative flex-1">
//               <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="Enter your email"
//                 value={formData.email}
//                 onChange={(e) => handleInputChange("email", e.target.value)}
//                 className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <Button
//               type="button"
//               onClick={sendEmailOtp}
//               disabled={!formData.email || otpLoading.email || emailOtpSent}
//               className="h-12 px-4 bg-blue-600 hover:bg-blue-700"
//             >
//               {otpLoading.email ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : emailOtpSent ? (
//                 "Sent"
//               ) : (
//                 "Send OTP"
//               )}
//             </Button>
//           </div>

//           {/* Email OTP Input */}
//           {emailOtpSent && (
//             <div className="relative">
//               <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 type="text"
//                 placeholder="Enter email OTP"
//                 value={formData.emailOtp}
//                 onChange={(e) => handleInputChange("emailOtp", e.target.value)}
//                 className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
//                 maxLength={6}
//               />
//             </div>
//           )}
//         </div>

//         {/* Mobile with OTP */}
//         <div className="space-y-2">
//           <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
//             Mobile Number
//           </Label>
//           <div className="flex space-x-2">
//             <div className="relative flex-1">
//               <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 id="mobile"
//                 type="tel"
//                 placeholder="Enter your mobile number"
//                 value={formData.mobile}
//                 onChange={(e) => handleInputChange("mobile", e.target.value)}
//                 className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//                 required
//               />
//             </div>
//             <Button
//               type="button"
//               onClick={sendMobileOtp}
//               disabled={!formData.mobile || otpLoading.mobile || mobileOtpSent}
//               className="h-12 px-4 bg-blue-600 hover:bg-blue-700"
//             >
//               {otpLoading.mobile ? (
//                 <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               ) : mobileOtpSent ? (
//                 "Sent"
//               ) : (
//                 "Send OTP"
//               )}
//             </Button>
//           </div>

//           {/* Mobile OTP Input */}
//           {mobileOtpSent && (
//             <div className="relative">
//               <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//               <Input
//                 type="text"
//                 placeholder="Enter mobile OTP"
//                 value={formData.mobileOtp}
//                 onChange={(e) => handleInputChange("mobileOtp", e.target.value)}
//                 className="pl-10 h-12 border-green-200 focus:border-green-500 focus:ring-green-500"
//                 maxLength={6}
//               />
//             </div>
//           )}
//         </div>

//         {/* Password */}
//         <div className="space-y-2">
//           <Label htmlFor="password" className="text-sm font-medium text-gray-700">
//             Password
//           </Label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               placeholder="Create a password"
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

//         {/* Confirm Password */}
//         <div className="space-y-2">
//           <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
//             Confirm Password
//           </Label>
//           <div className="relative">
//             <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
//             <Input
//               id="confirmPassword"
//               type={showConfirmPassword ? "text" : "password"}
//               placeholder="Confirm your password"
//               value={formData.confirmPassword}
//               onChange={(e) => handleInputChange("confirmPassword", e.target.value)}
//               className="pl-10 pr-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
//               required
//             />
//             <button
//               type="button"
//               onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//               className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
//             </button>
//           </div>
//         </div>

//         {/* Privacy Policy Text */}
//         <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
//           <p className="text-xs text-gray-600 leading-relaxed">
//             Your personal data will be used to support your experience throughout this website, to manage access to your
//             account, and for other purposes described in our{" "}
//             <button type="button" className="text-blue-600 hover:text-blue-800 font-medium">
//               privacy policy
//             </button>
//             .
//           </p>
//         </div>

//         {/* Sign Up Button */}
//         <Button
//           type="submit"
//           disabled={isLoading}
//           className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200"
//         >
//           {isLoading ? (
//             <div className="flex items-center space-x-2">
//               <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
//               <span>Creating account...</span>
//             </div>
//           ) : (
//             "Create Account"
//           )}
//         </Button>
//       </form>

//       {/* Divider */}
//       <div className="relative">
//         <div className="absolute inset-0 flex items-center">
//           <div className="w-full border-t border-gray-200" />
//         </div>
//         <div className="relative flex justify-center text-sm">
//           <span className="px-2 bg-white text-gray-500">Already have an account?</span>
//         </div>
//       </div>

//       {/* Login Link */}
//       <div className="text-center">
//         <button 
//           type="button" 
//           onClick={() => {
//             if (onSwitchToLogin) {
//               onSwitchToLogin()
//             } else {
//               onClose()
//             }
//           }} 
//           className="text-blue-600 hover:text-blue-800 font-medium"
//         >
//           Sign in to your account
//         </button>
//       </div>
//     </div>
//   )
// }

// export default SignupForm


// src/components/forms/SignupForm.tsx
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';

interface SignupFormProps {
  onClose?: () => void;
  onSwitchToLogin?: () => void;
}

export default function SignupForm({ onClose, onSwitchToLogin }: SignupFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setIsLoading(true);
    try {
      await signup({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile || undefined,
      });
      toast.success('Account created successfully!');
      onClose?.();
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
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
    <div className="w-full max-w-md mx-auto bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join our community today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name Field */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="fullName"
                name="fullName"
                type="text"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
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

          {/* Mobile Field */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your mobile number"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create a password"
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

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? (
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
                Creating account...
              </>
            ) : (
              'Create Account'
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
              disabled={isLoading}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}