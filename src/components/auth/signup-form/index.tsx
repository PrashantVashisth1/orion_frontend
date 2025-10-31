// // import React, { useState } from 'react';
// // import { useAuth } from '@/contexts/AuthContext';
// // import { toast } from 'react-hot-toast';
// // import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';

// // interface SignupFormProps {
// //   onClose?: () => void;
// //   onSwitchToLogin?: () => void;
// // }

// // export default function SignupForm({ onClose, onSwitchToLogin }: SignupFormProps) {
  
// //   const [formData, setFormData] = useState({
// //     fullName: '',
// //     email: '',
// //     mobile: '',
// //     password: '',
// //     confirmPassword: '',
// //   });
// //   const [showPassword, setShowPassword] = useState(false);
// //   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// //   const [isLoading, setIsLoading] = useState(false);

// //   const { signup } = useAuth();

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     if (!formData.fullName || !formData.email || !formData.password) {
// //       toast.error('Please fill in all required fields');
// //       return;
// //     }

// //     if (formData.password !== formData.confirmPassword) {
// //       toast.error('Passwords do not match');
// //       return;
// //     }

// //     if (formData.password.length < 6) {
// //       toast.error('Password must be at least 6 characters long');
// //       return;
// //     }

// //     setIsLoading(true);
// //     try {
// //       await signup({
// //         fullName: formData.fullName,
// //         email: formData.email,
// //         password: formData.password,
// //         mobile: formData.mobile || undefined,
// //       });
// //       onClose?.();
// //     } catch (error: any) {
// //       toast.error(error.message || 'Signup failed');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
// //     setFormData(prev => ({
// //       ...prev,
// //       [e.target.name]: e.target.value
// //     }));
// //   };

// //   return (
// //     <div className="w-full max-w-md mx-auto bg-gray-900">
// //       <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
// //         <div className="text-center mb-8">
// //           <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
// //           <p className="text-gray-400">Join our community today</p>
// //         </div>

// //         <form onSubmit={handleSubmit} className="space-y-6">
// //           {/* Full Name Field */}
// //           <div>
// //             <label htmlFor="fullName" className="block text-sm font-medium text-gray-300 mb-2">
// //               Full Name *
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <User className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 id="fullName"
// //                 name="fullName"
// //                 type="text"
// //                 required
// //                 value={formData.fullName}
// //                 onChange={handleChange}
// //                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter your full name"
// //                 disabled={isLoading}
// //               />
// //             </div>
// //           </div>

// //           {/* Email Field */}
// //           <div>
// //             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
// //               Email Address *
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Mail className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 id="email"
// //                 name="email"
// //                 type="email"
// //                 autoComplete="email"
// //                 required
// //                 value={formData.email}
// //                 onChange={handleChange}
// //                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter your email"
// //                 disabled={isLoading}
// //               />
// //             </div>
// //           </div>

// //           {/* Mobile Field */}
// //           <div>
// //             <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
// //               Mobile Number
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Phone className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 id="mobile"
// //                 name="mobile"
// //                 type="tel"
// //                 value={formData.mobile}
// //                 onChange={handleChange}
// //                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Enter your mobile number"
// //                 disabled={isLoading}
// //               />
// //             </div>
// //           </div>

// //           {/* Password Field */}
// //           <div>
// //             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
// //               Password *
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Lock className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 id="password"
// //                 name="password"
// //                 type={showPassword ? 'text' : 'password'}
// //                 autoComplete="new-password"
// //                 required
// //                 value={formData.password}
// //                 onChange={handleChange}
// //                 className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Create a password"
// //                 disabled={isLoading}
// //               />
// //               <button
// //                 type="button"
// //                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                 onClick={() => setShowPassword(!showPassword)}
// //                 disabled={isLoading}
// //               >
// //                 {showPassword ? (
// //                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
// //                 ) : (
// //                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Confirm Password Field */}
// //           <div>
// //             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
// //               Confirm Password *
// //             </label>
// //             <div className="relative">
// //               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
// //                 <Lock className="h-5 w-5 text-gray-400" />
// //               </div>
// //               <input
// //                 id="confirmPassword"
// //                 name="confirmPassword"
// //                 type={showConfirmPassword ? 'text' : 'password'}
// //                 autoComplete="new-password"
// //                 required
// //                 value={formData.confirmPassword}
// //                 onChange={handleChange}
// //                 className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
// //                 placeholder="Confirm your password"
// //                 disabled={isLoading}
// //               />
// //               <button
// //                 type="button"
// //                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
// //                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
// //                 disabled={isLoading}
// //               >
// //                 {showConfirmPassword ? (
// //                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
// //                 ) : (
// //                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
// //                 )}
// //               </button>
// //             </div>
// //           </div>

// //           {/* Submit Button */}
// //           <button
// //             type="submit"
// //             disabled={isLoading}
// //             className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
// //           >
// //             {isLoading ? (
// //               <>
// //                 <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
// //                 Creating account...
// //               </>
// //             ) : (
// //               'Create Account'
// //             )}
// //           </button>
// //         </form>

// //         {/* Switch to Login */}
// //         <div className="mt-6 text-center">
// //           <p className="text-gray-400">
// //             Already have an account?{' '}
// //             <button
// //               onClick={onSwitchToLogin}
// //               className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
// //               disabled={isLoading}
// //             >
// //               Sign in
// //             </button>
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useState } from 'react';
// import { useAuth } from '@/contexts/AuthContext';
// import { toast } from 'react-hot-toast';
// import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2 } from 'lucide-react';
// import {
//   InputOTP,
//   InputOTPGroup,
//   InputOTPSlot,
// } from "@/components/ui/input-otp"; // Make sure this path is correct

// // Props for the main component
// interface SignupFormProps {
//   onClose?: () => void;
//   onSwitchToLogin?: () => void;
// }

// // Props for the new OTP Form component
// interface OtpFormProps {
//   email: string;
//   onBack: () => void; // Function to go back to the details form
// }

// // --- OTP Form Component (with your theme) ---
// const OtpForm: React.FC<OtpFormProps> = ({ email, onBack }) => {
//   const [otp, setOtp] = useState("");
//   const { verifyOtp } = useAuth(); // Assuming verifyOtp is in your AuthContext
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (otp.length < 6) {
//         toast.error("Please enter the 6-digit OTP.");
//         return;
//     }
//     setIsLoading(true);
//     try {
//       // The verifyOtp function in AuthContext will handle success (login & redirect) and errors
//       await verifyOtp({ email, otp });
//     } catch (error: any) {
//       // AuthContext will show the toast, but we catch here to stop the loader
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
//       <div className="text-center mb-8">
//         <h2 className="text-3xl font-bold text-white mb-2">Check your email</h2>
//         <p className="text-gray-400">We've sent a 6-digit code to <br/><strong>{email}</strong></p>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div className="flex justify-center">
//             <InputOTP maxLength={6} value={otp} onChange={setOtp}>
//                 <InputOTPGroup>
//                     <InputOTPSlot index={0} className="text-white bg-gray-700/50 border-gray-600" />
//                     <InputOTPSlot index={1} className="text-white bg-gray-700/50 border-gray-600" />
//                     <InputOTPSlot index={2} className="text-white bg-gray-700/50 border-gray-600" />
//                     <InputOTPSlot index={3} className="text-white bg-gray-700/50 border-gray-600" />
//                     <InputOTPSlot index={4} className="text-white bg-gray-700/50 border-gray-600" />
//                     <InputOTPSlot index={5} className="text-white bg-gray-700/50 border-gray-600" />
//                 </InputOTPGroup>
//             </InputOTP>
//         </div>
        
//         <button
//           type="submit"
//           disabled={isLoading}
//           className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//         >
//           {isLoading ? (
//             <>
//               <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
//               Verifying...
//             </>
//           ) : (
//             'Verify & Create Account'
//           )}
//         </button>
//       </form>

//       <div className="mt-6 text-center">
//         <p className="text-gray-400">
//           Didn't receive the code?{' '}
//           <button
//             onClick={onBack}
//             className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
//             disabled={isLoading}
//           >
//             Go back and try again
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };


// // --- Main Signup Form (Now controls both steps) ---
// export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  
//   const [signupStep, setSignupStep] = useState<'details' | 'otp'>('details');
//   const [userEmail, setUserEmail] = useState('');

//   const [formData, setFormData] = useState({
//     full_name: '',
//     email: '',
//     mobile: '',
//     password: '',
//     confirmPassword: '',
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // Get sendOtp from your AuthContext
//   const { sendOtp } = useAuth();

//   const handleSubmitDetails = async (e: React.FormEvent) => {
//     e.preventDefault();
    
//     if (!formData.full_name || !formData.email || !formData.password) {
//       toast.error('Please fill in all required fields');
//       return;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       toast.error('Passwords do not match');
//       return;
//     }
//     if (formData.password.length < 6) {
//       toast.error('Password must be at least 6 characters long');
//       return;
//     }

//     setIsLoading(true);
//     try {
//       const success = await sendOtp({
//         full_name: formData.full_name,
//         email: formData.email,
//         password: formData.password,
//         mobile: formData.mobile || undefined,
//       });

//       if (success) {
//         setUserEmail(formData.email);
//         setSignupStep('otp');
//       }
//     } catch (error: any) {
//       // The toast is already shown in the AuthContext, so we just log here
//       console.error(error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData(prev => ({
//       ...prev,
//       [e.target.name]: e.target.value
//     }));
//   };

//   // If the step is 'otp', render the OtpForm
//   if (signupStep === 'otp') {
//     return (
//       <div className="w-full max-w-md mx-auto bg-gray-900">
//         <OtpForm email={userEmail} onBack={() => setSignupStep('details')} />
//       </div>
//     );
//   }

//   // Otherwise, render the details form
//   return (
//     <div className="w-full max-w-md mx-auto bg-gray-900">
//       <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
//         <div className="text-center mb-8">
//           <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
//           <p className="text-gray-400">Join our community today</p>
//         </div>

//         <form onSubmit={handleSubmitDetails} className="space-y-6">
//           {/* Full Name Field */}
//           <div>
//             <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
//               Full Name *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <User className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="full_name"
//                 name="full_name"
//                 type="text"
//                 required
//                 value={formData.full_name}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your full name"
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           {/* Email Field */}
//           <div>
//             <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
//               Email Address *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Mail className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 autoComplete="email"
//                 required
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your email"
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           {/* Mobile Field */}
//           <div>
//             <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
//               Mobile Number
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Phone className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="mobile"
//                 name="mobile"
//                 type="tel"
//                 value={formData.mobile}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Enter your mobile number"
//                 disabled={isLoading}
//               />
//             </div>
//           </div>

//           {/* Password Field */}
//           <div>
//             <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
//               Password *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="password"
//                 name="password"
//                 type={showPassword ? 'text' : 'password'}
//                 autoComplete="new-password"
//                 required
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Create a password"
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowPassword(!showPassword)}
//                 disabled={isLoading}
//               >
//                 {showPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Confirm Password Field */}
//           <div>
//             <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
//               Confirm Password *
//             </label>
//             <div className="relative">
//               <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//                 <Lock className="h-5 w-5 text-gray-400" />
//               </div>
//               <input
//                 id="confirmPassword"
//                 name="confirmPassword"
//                 type={showConfirmPassword ? 'text' : 'password'}
//                 autoComplete="new-password"
//                 required
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                 placeholder="Confirm your password"
//                 disabled={isLoading}
//               />
//               <button
//                 type="button"
//                 className="absolute inset-y-0 right-0 pr-3 flex items-center"
//                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                 disabled={isLoading}
//               >
//                 {showConfirmPassword ? (
//                   <EyeOff className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 ) : (
//                   <Eye className="h-5 w-5 text-gray-400 hover:text-gray-300" />
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <button
//             type="submit"
//             disabled={isLoading}
//             className="w-full flex justify-center items-center px-4 py-3 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
//           >
//             {isLoading ? (
//               <>
//                 <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
//                 Sending OTP...
//               </>
//             ) : (
//               'Continue'
//             )}
//           </button>
//         </form>

//         {/* Switch to Login */}
//         <div className="mt-6 text-center">
//           <p className="text-gray-400">
//             Already have an account?{' '}
//             <button
//               onClick={onSwitchToLogin}
//               className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
//               disabled={isLoading}
//             >
//               Sign in
//             </button>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'react-hot-toast';
import { Eye, EyeOff, Mail, Lock, User, Phone, Loader2, Briefcase } from 'lucide-react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // adjust path if needed

// --- OTP Form Component ---
interface OtpFormProps {
  email: string;
  onBack: () => void;
}

const OtpForm: React.FC<OtpFormProps> = ({ email, onBack }) => {
  const [otp, setOtp] = useState("");
  const { verifyOtp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) {
      toast.error("Please enter the 6-digit OTP.");
      return;
    }

    setIsLoading(true);
    try {
      await verifyOtp({ email, otp });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Check your email</h2>
        <p className="text-gray-400">
          We've sent a 6-digit code to <br />
          <strong>{email}</strong>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-center">
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup>
              {[...Array(6)].map((_, i) => (
                <InputOTPSlot
                  key={i}
                  index={i}
                  className="text-white bg-gray-700/50 border-gray-600"
                />
              ))}
            </InputOTPGroup>
          </InputOTP>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex justify-center items-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 focus:outline-none disabled:opacity-50 transition-all duration-200"
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
              Verifying...
            </>
          ) : (
            'Verify & Create Account'
          )}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-gray-400">
          Didn't receive the code?{" "}
          <button
            onClick={onBack}
            className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            disabled={isLoading}
          >
            Go back and try again
          </button>
        </p>
      </div>
    </div>
  );
};

// --- Signup Form with Role Selection ---
interface SignupFormProps {
  onSwitchToLogin?: () => void;
}

export default function SignupForm({ onSwitchToLogin }: SignupFormProps) {
  const [signupStep, setSignupStep] = useState<'details' | 'otp'>('details');
  const [userEmail, setUserEmail] = useState('');

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    role: '', // ✅ new field
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { sendOtp } = useAuth();

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.full_name || !formData.email || !formData.password || !formData.role) {
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
      const success = await sendOtp({
        full_name: formData.full_name,
        email: formData.email,
        password: formData.password,
        mobile: formData.mobile || undefined,
        role: formData.role, // ✅ include role
      });

      if (success) {
        setUserEmail(formData.email);
        setSignupStep('otp');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (signupStep === 'otp') {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-900">
        <OtpForm email={userEmail} onBack={() => setSignupStep('details')} />
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-900">
      <div className="bg-gray-800/90 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-gray-400">Join our community today</p>
        </div>

        <form onSubmit={handleSubmitDetails} className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="full_name"
                name="full_name"
                type="text"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your full name"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Mobile */}
          <div>
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-2">
              Mobile Number
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="mobile"
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your mobile number"
                disabled={isLoading}
              />
            </div>
          </div>

          {/* Role Selection */}
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-300 mb-2">
              Select Role *
            </label>
            <div className="relative">
              <Briefcase className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <select
                id="role"
                name="role"
                required
                value={formData.role}
                onChange={handleChange}
                className="block w-full pl-10 pr-3 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              >
                <option value="" disabled>Select your role</option>
                <option value="STARTUP">Startup</option>
                <option value="INVESTOR">Investor</option>
                <option value="MENTOR">Mentor</option>
                <option value="STUDENT">Student</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Create a password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="block w-full pl-10 pr-12 py-3 border border-gray-600 rounded-lg bg-gray-700/50 text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm your password"
                disabled={isLoading}
              />
              <button
                type="button"
                className="absolute right-3 top-3"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-5 w-5 text-gray-400" /> : <Eye className="h-5 w-5 text-gray-400" />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center px-4 py-3 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all duration-200"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5" />
                Sending OTP...
              </>
            ) : (
              'Continue'
            )}
          </button>
        </form>

        {/* Switch to Login */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <button
              onClick={onSwitchToLogin}
              className="font-medium text-blue-400 hover:text-blue-300 transition-colors"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
