// import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
// import { apiClient } from '@/lib/my-api-client';
// import { toast } from 'react-hot-toast';
// import type { User } from '@/lib/my-api-client';

// // interface User {
// //   id: number;
// //   fullName: string;
// //   email: string;
// //   role: string;
// //   mobile?: string;
// // }



// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   // signup: (userData: { fullName: string; email: string; password: string; mobile?: string }) => Promise<void>;
//   sendOtp: (data: any) => Promise<boolean>;
//   verifyOtp: (data: any) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const { user, isAuthenticated, login: zustandLogin, logout: zustandLogout } = useAuthStore();
//   const navigate = useNavigate();
//   const [loading, setLoading] = React.useState(true);

//   // Initialize auth state on app load
//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       // setLoading(true);
//       console.log("first")
//       const response = await apiClient.login(email, password);
//       console.log("response from login api client",response);
      
//       if (response.success) {
//         zustandLogin(response.data.token, response.data.user);
//         toast.success('Login successful!');
//         navigate('/postlogin');
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // const signup = async (userData: { fullName: string; email: string; password: string; mobile?: string }) => {
//   //   try {
//   //     setLoading(true);
//   //     const response = await apiClient.signup(userData);
      
//   //     if (response.success) {
//   //       zustandLogin(response.data.token, response.data.user);
//   //       toast.success('Account created successfully!');
//   //       navigate('/postlogin');
//   //     } else {
//   //       throw new Error('Signup failed');
//   //     }
//   //   } catch (error: any) {
//   //     toast.error(error.message || 'Signup failed');
//   //     throw error;
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

//   const sendOtp = async (data: any) => {
//     try {
//       await apiClient.sendOtp(data); // Use the new apiClient method
//       toast.success("OTP sent successfully to your email.");
//       return true; // Indicate success
//     } catch (error: any) {
//       const errorMessage = error.message || "Failed to send OTP. Please try again.";
//       toast.error(errorMessage);
//       console.error("Send OTP error:", error);
//       return false; // Indicate failure
//     }
//   };

//   const verifyOtp = async (data: { email: string; otp: string }) => {
//     try {
//       const response = await apiClient.verifyOtp(data); // Use the new apiClient method
//       console.log("first", response);
//       const { token, user } = response;
//       zustandLogin(token, user); // Log the user in upon successful verification
//       toast.success("OTP verified and account created successfully!");
//       navigate("/postlogin");
//     } catch (error: any) {
//       const errorMessage = error.message || "OTP verification failed. Please try again.";
//        toast.error(errorMessage);
//       console.error("Verify OTP error:", error);
//     }
//   };

//   const logout = () => {
//     zustandLogout();
//     toast.success('Logged out successfully');
//     navigate('/prelogin');
//   };

//   const value: AuthContextType = {
//     user,
//     isAuthenticated,
//     login,
//     // signup,
//     sendOtp,
//     verifyOtp,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// 2
// import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '@/store/authStore';
// import { apiClient } from '@/lib/my-api-client';
// import { toast } from 'react-hot-toast';
// import type { User } from '@/lib/my-api-client';

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (email: string, password: string) => Promise<void>;
//   sendOtp: (data: {
//     full_name: string;
//     email: string;
//     password: string;
//     mobile?: string;
//     role: string;
//   }) => Promise<boolean>;
//   verifyOtp: (data: { email: string; otp: string }) => Promise<void>;
//   logout: () => void;
//   loading: boolean;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within an AuthProvider');
//   }
//   return context;
// };

// interface AuthProviderProps {
//   children: ReactNode;
// }

// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const { user, isAuthenticated, login: zustandLogin, logout: zustandLogout } = useAuthStore();
//   const navigate = useNavigate();
//   const [loading, setLoading] = React.useState(true);

//   useEffect(() => {
//     setLoading(false);
//   }, []);

//   const login = async (email: string, password: string) => {
//     try {
//       const response = await apiClient.login(email, password);
//       if (response.success) {
//         zustandLogin(response.data.token, response.data.user);
//         toast.success('Login successful!');
//         navigate('/postlogin');
//       } else {
//         throw new Error('Login failed');
//       }
//     } catch (error: any) {
//       toast.error(error.message || 'Login failed');
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   // 🟢 Updated sendOtp with role field
//   const sendOtp = async (data: {
//     full_name: string;
//     email: string;
//     password: string;
//     mobile?: string;
//     role: string;
//   }) => {
//     try {
//       console.log("Sending OTP payload:", data);
//       await apiClient.sendOtp(data);
//       toast.success("OTP sent successfully to your email.");
//       return true;
//     } catch (error: any) {
//       const errorMessage = error.message || "Failed to send OTP. Please try again.";
//       toast.error(errorMessage);
//       console.error("Send OTP error:", error);
//       return false;
//     }
//   };

//   const verifyOtp = async (data: { email: string; otp: string }) => {
//     try {
//       const response = await apiClient.verifyOtp(data);
//       const { token, user } = response;
//       zustandLogin(token, user);
//       toast.success("OTP verified and account created successfully!");
//       navigate("/postlogin");
//     } catch (error: any) {
//       const errorMessage = error.message || "OTP verification failed. Please try again.";
//       toast.error(errorMessage);
//       console.error("Verify OTP error:", error);
//     }
//   };

//   const logout = () => {
//     zustandLogout();
//     toast.success('Logged out successfully');
//     navigate('/prelogin');
//   };

//   const value: AuthContextType = {
//     user,
//     isAuthenticated,
//     login,
//     sendOtp,
//     verifyOtp,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


// src/contexts/AuthContext.tsx

import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/my-api-client';
import { toast } from 'react-hot-toast';
import type { User } from '@/lib/my-api-client';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  sendOtp: (data: {
    full_name: string;
    email: string;
    password: string;
    mobile?: string;
    role: string;
  }) => Promise<boolean>;
  verifyOtp: (data: { email: string; otp: string }) => Promise<User | undefined>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { user, isAuthenticated, login: zustandLogin, logout: zustandLogout } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiClient.login(email, password);
      if (response.success) {
        const { token, user } = response.data;
        zustandLogin(token, user);
        toast.success('Login successful!');

        // Send User-ID to Google Analytics
        if (typeof window.gtag === 'function') {
          window.gtag('set', { 'user_id': user.id.toString() });
        }
      
        
        // --- 🟢 MODIFICATION: Role-based redirection ---
        if (user.role === 'STUDENT') {
          console.log(user.role,"user role");
          navigate('/student-temp');
        } else if (user.role === 'STARTUP') {
          // This is our new startup logic
          if (user.is_startup_verified) {
            // State 3: Verified user
            navigate('/postlogin');
          } else if (!user.has_submitted_profile) {
            // State 1: New user, never submitted profile
            navigate('/edit-profile');
          } else {
            // State 2: Pending user, submitted but not verified
            navigate('/pending-verification');
          }
        } else {
          // Default for other roles (MENTOR, ADMIN, etc.)
          navigate('/postlogin');
        }
        // --- 🟢 END MODIFICATION ---

      } else {
        throw new Error('Login failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // 🟢 Updated sendOtp with role field
  const sendOtp = async (data: {
    full_name: string;
    email: string;
    password: string;
    mobile?: string;
    role: string;
  }) => {
    try {
      // console.log("Sending OTP payload:", data);
      await apiClient.sendOtp(data);
      toast.success("OTP sent successfully to your email.");
      return true;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
      console.error("Send OTP error:", error);
      return false;
    }
  };

  const verifyOtp = async (data: { email: string; otp: string }) => {
    try {
      const response = await apiClient.verifyOtp(data);
      const { token, user } = response;
      zustandLogin(token, user);
      toast.success("OTP verified and account created successfully!");

      // Send User-ID to Google Analytics
      if (typeof window.gtag === 'function') {
        window.gtag('set', { 'user_id': user.id.toString() });
      }
      
      // --- 🟢 MODIFICATION: Role-based redirection after signup/verify ---
      if (user.role === 'STUDENT') {
        console.log(user.role,"user role");
        navigate('/student-temp');
      } else if (user.role === 'STARTUP') {
        // A new startup will always be false for both flags,
        // so this will correctly send them to /edit-profile.
        if (user.is_startup_verified) {
          navigate('/postlogin');
        } else if (!user.has_submitted_profile) {
          navigate('/edit-profile'); // <-- THIS IS THE CORRECT REDIRECT
        } else {
          navigate('/pending-verification');
        }
      } else {
        // Default for other roles (MENTOR, ADMIN, etc.)
        navigate('/postlogin');
      }
      // --- 🟢 END MODIFICATION ---
      return user;

    } catch (error: any) {
      const errorMessage = error.message || "OTP verification failed. Please try again.";
      toast.error(errorMessage);
      console.error("Verify OTP error:", error);
    }
  };

  const logout = () => {
    zustandLogout();
    toast.success('Logged out successfully');
    navigate('/prelogin');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    login,
    sendOtp,
    verifyOtp,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};