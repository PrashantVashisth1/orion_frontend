// import React, { createContext, useContext, useState, useEffect,type ReactNode } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   // Add other user properties as needed
// }

// interface AuthContextType {
//   user: User | null;
//   isAuthenticated: boolean;
//   login: (user: User, token: string) => void;
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
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   // Check for existing authentication on app load
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const userData = localStorage.getItem('user');
    
//     if (token && userData) {
//       try {
//         const parsedUser = JSON.parse(userData);
//         setUser(parsedUser);
//       } catch (error) {
//         console.error('Error parsing user data:', error);
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//       }
//     }
//     setLoading(false);
//   }, []);

//   const login = (userData: User, token: string) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(userData));
//     setUser(userData);
//     navigate('/postlogin');
//   };

//   const logout = () => {
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setUser(null);
//     navigate('/prelogin');
//   };

//   const value: AuthContextType = {
//     user,
//     isAuthenticated: !!user,
//     login,
//     logout,
//     loading,
//   };

//   return (
//     <AuthContext.Provider value={value}>
//       {children}
//     </AuthContext.Provider>
//   );
// }; 

















// / 3. Updated AuthContext to integrate with Zustand - src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { apiClient } from '@/lib/my-api-client';
import { toast } from 'react-hot-toast';

interface User {
  id: number;
  fullName: string;
  email: string;
  role: string;
  mobile?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (userData: { fullName: string; email: string; password: string; mobile?: string }) => Promise<void>;
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
      setLoading(true);
      const response = await apiClient.login(email, password);
      
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

  const signup = async (userData: { fullName: string; email: string; password: string; mobile?: string }) => {
    try {
      setLoading(true);
      const response = await apiClient.signup(userData);
      
      if (response.success) {
        zustandLogin(response.data.token, response.data.user);
        toast.success('Account created successfully!');
        navigate('/postlogin');
      } else {
        throw new Error('Signup failed');
      }
    } catch (error: any) {
      toast.error(error.message || 'Signup failed');
      throw error;
    } finally {
      setLoading(false);
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
    signup,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
