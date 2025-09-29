import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/my-api-client';
import { toast } from 'react-hot-toast';
import type { User } from '@/lib/my-api-client';

// interface User {
//   id: number;
//   fullName: string;
//   email: string;
//   role: string;
//   mobile?: string;
// }



interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  // signup: (userData: { fullName: string; email: string; password: string; mobile?: string }) => Promise<void>;
  sendOtp: (data: any) => Promise<boolean>;
  verifyOtp: (data: any) => Promise<void>;
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

  // Initialize auth state on app load
  useEffect(() => {
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // setLoading(true);
      console.log("first")
      const response = await apiClient.login(email, password);
      console.log("response from login api client",response);
      
      if (response.success) {
        zustandLogin(response.data.token, response.data.user);
        toast.success('Login successful!');
        navigate('/postlogin');
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

  // const signup = async (userData: { fullName: string; email: string; password: string; mobile?: string }) => {
  //   try {
  //     setLoading(true);
  //     const response = await apiClient.signup(userData);
      
  //     if (response.success) {
  //       zustandLogin(response.data.token, response.data.user);
  //       toast.success('Account created successfully!');
  //       navigate('/postlogin');
  //     } else {
  //       throw new Error('Signup failed');
  //     }
  //   } catch (error: any) {
  //     toast.error(error.message || 'Signup failed');
  //     throw error;
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const sendOtp = async (data: any) => {
    try {
      await apiClient.sendOtp(data); // Use the new apiClient method
      toast.success("OTP sent successfully to your email.");
      return true; // Indicate success
    } catch (error: any) {
      const errorMessage = error.message || "Failed to send OTP. Please try again.";
      toast.error(errorMessage);
      console.error("Send OTP error:", error);
      return false; // Indicate failure
    }
  };

  const verifyOtp = async (data: { email: string; otp: string }) => {
    try {
      const response = await apiClient.verifyOtp(data); // Use the new apiClient method
      console.log("first", response);
      const { token, user } = response;
      zustandLogin(token, user); // Log the user in upon successful verification
      toast.success("OTP verified and account created successfully!");
      navigate("/postlogin");
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
    // signup,
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
