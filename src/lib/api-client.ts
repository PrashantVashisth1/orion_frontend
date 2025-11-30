// import { QueryClient } from '@tanstack/react-query';

// // Utility function to convert snake_case keys to camelCase
// function toCamelCase(obj: any): any {
//   if (obj === null || typeof obj !== 'object') {
//     return obj;
//   }
//   if (Array.isArray(obj)) {
//     return obj.map(item => toCamelCase(item));
//   }
//   return Object.keys(obj).reduce((acc, key) => {
//     const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
//     acc[camelCaseKey] = toCamelCase(obj[key]);
//     return acc;
//   }, {});
// }

// // API Base URL from environment
// const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// // Create QueryClient instance
// export const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       retry: 1,
//       refetchOnWindowFocus: false,
//     },
//   },
// });

// // API Client class for making authenticated requests
// export class ApiClient {
//   private baseURL: string;

//   constructor(baseURL: string = API_BASE_URL) {
//     this.baseURL = baseURL;
//   }

//   private getAuthHeaders(isFormData: boolean = false): HeadersInit {
//     const token = localStorage.getItem('token');
//     const headers: HeadersInit = {}; // Start empty

//     // Only set Content-Type if it's NOT FormData
//     if (!isFormData) {
//       headers['Content-Type'] = 'application/json';
//     }

//     if (token && token !== 'undefined') {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     return headers;
//   }

//   private async makeRequest<T>(
//     endpoint: string,
//     options: RequestInit = {}
//   ): Promise<T> {
//     const url = `${this.baseURL}/api${endpoint}`;
//     const isFormData = options.body instanceof FormData;
//     const baseHeaders = this.getAuthHeaders(isFormData);
//     const config: RequestInit = {
//       ...options, // Spread options first
//       headers: baseHeaders, // Apply base headers (might include Auth, excludes Content-Type for FormData)
//     };

//     // Merge headers properly
//     if (options.headers) {
//       config.headers = { ...config.headers, ...options.headers };
//     }

//     try {
//       const response = await fetch(url, config);
      
//       if (!response.ok) {
//         const errorData = await response.json().catch(() => ({ 
//           message: `HTTP error! status: ${response.status}` 
//         }));
//         throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
//       }

//       const jsonResponse = await response.json();
//       // Apply the casing conversion here
//       return toCamelCase(jsonResponse) as T;
//     } catch (error) {
//       console.error('API Request failed:', error);
//       throw error;
//     }
//   }

//   // Generic HTTP methods
//   async get<T>(endpoint: string): Promise<T> {
//     return this.makeRequest<T>(endpoint, { method: 'GET' });
//   }

//   async post<T>(endpoint: string, data?: any): Promise<T> {
//     return this.makeRequest<T>(endpoint, {
//       method: 'POST',
//       body: JSON.stringify(data),
//     });
//   }

//   async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
//     // We pass FormData directly. makeRequest detects it and skips setting Content-Type.
//     return this.makeRequest<T>(endpoint, {
//       method: 'POST',
//       body: formData,
//       // No 'Content-Type' header needed here; browser sets it.
//     });
//   }

//   async put<T>(endpoint: string, data?: any): Promise<T> {
//     return this.makeRequest<T>(endpoint, {
//       method: 'PUT',
//       body: JSON.stringify(data),
//     });
//   }

//   async patch<T>(endpoint: string, data?: any): Promise<T> {
//     return this.makeRequest<T>(endpoint, {
//       method: 'PATCH',
//       body: JSON.stringify(data),
//     });
//   }

//   async delete<T>(endpoint: string): Promise<T> {
//     return this.makeRequest<T>(endpoint, { method: 'DELETE' });
//   }

//   // File upload method
//   async uploadFile<T>(endpoint: string, file: File, type: string): Promise<T> {
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('type', type);

//     const token = localStorage.getItem('token');
//     const headers: HeadersInit = {};
    
//     if (token && token !== 'undefined') {
//       headers.Authorization = `Bearer ${token}`;
//     }

//     const response = await fetch(`${this.baseURL}/api${endpoint}`, {
//       method: 'POST',
//       headers,
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('File upload failed');
//     }

//     return await response.json();
//   }
// }

// // Export singleton instance
// export const apiClient = new ApiClient();

import { useAuthStore } from '@/store/authStore';
import { QueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';

// Utility function (unchanged)
function toCamelCase(obj: any): any {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  if (Array.isArray(obj)) {
    return obj.map(item => toCamelCase(item));
  }
  return Object.keys(obj).reduce((acc, key) => {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
    acc[camelCaseKey] = toCamelCase(obj[key]);
    return acc;
  }, {} as { [key: string]: any });
}

// API Base URL (ensure this points to your backend, e.g., http://localhost:3000)
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

// QueryClient (unchanged)
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// API Client class
export class ApiClient {
  private baseURL: string;

  // 1. ADD THIS STATIC LOCK FLAG
  private static isLoggingOut = false;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  // getAuthHeaders (simplified - only adds Auth token)
  private getAuthHeadersOnly(): HeadersInit {
    const token = useAuthStore.getState().token;
    const headers: HeadersInit = {}; // Start empty
    if (token && token !== 'undefined') {
      headers.Authorization = `Bearer ${token}`;
    }
    return headers;
  }


  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    // Determine if body is FormData
    const isFormData = options.body instanceof FormData;

    // Start with base headers (only Auth token)
    const baseHeaders = this.getAuthHeadersOnly();

    const config: RequestInit = {
      ...options,
      headers: { ...baseHeaders }, // Apply base headers
    };

    // --- FIX: Conditionally set Content-Type ONLY if NOT FormData ---
    if (!isFormData) {
      // Add default JSON Content-Type if not already set by specific options
      if (!config.headers || !(config.headers as Record<string, string>)['Content-Type']) {
         (config.headers as Record<string, string>)['Content-Type'] = 'application/json';
      }
    }
    // For FormData, we *explicitly do not* set Content-Type, letting the browser do it.
    // --- END FIX ---


    // Merge explicitly provided headers from options (if any) AFTER defaults
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
       // Re-check: If user explicitly passed FormData AND a Content-Type, remove it
       if (isFormData && (config.headers as Record<string, string>)['Content-Type']) {
           delete (config.headers as Record<string, string>)['Content-Type'];
       }
    }


    try {
      const response = await fetch(url, config);

      // === UPDATED SESSION EXPIRY LOGIC ===
      if (response.status === 401 || response.status === 403) {
        
        // 1. CHECK IF A TOKEN EXISTS
        // If there is no token, this is just a standard "Unauthorized" access (e.g. guest user),
        // not a "Session Expired" event. We shouldn't log them out or show a toast.
        const token = useAuthStore.getState().token;

        if (token) {
            // 2. CHECK LOCK
            if (ApiClient.isLoggingOut) {
               return new Promise(() => {}); 
            }

            // 3. TRIGGER LOGOUT
            ApiClient.isLoggingOut = true;
            console.warn("Session expired. Logging out...");
            
            toast.error("Session expired. Redirecting to login...", {
                duration: 3000, 
            });
            
            useAuthStore.getState().logout();
            localStorage.removeItem('auth-storage');

            if (!window.location.pathname.includes('/auth') && !window.location.pathname.includes('/prelogin')) {
               setTimeout(() => {
                   window.location.href = '/prelogin'; 
               }, 2000); 
            }
        }
        
        // Always throw so the calling function knows it failed
        throw new Error('Unauthorized');
      }
      // ====================================

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`
        }));
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      if (response.status === 204 || response.headers.get('content-length') === '0') {
        return null as T;
      }

      const jsonResponse = await response.json();
      return toCamelCase(jsonResponse) as T;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // --- Methods remain the same ---
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async postFormData<T>(endpoint: string, formData: FormData): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: formData,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile<T>(endpoint: string, file: File, type: string): Promise<T> {
    const formData = new FormData();
    formData.append('file', file); // Still assumes 'file' field for this specific method
    formData.append('type', type);
    return this.postFormData<T>(endpoint, formData);
  }

  async submitForReview<T>(endpoint: string): Promise<T> {
    // We don't need to send a body, the backend uses the auth token
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
    });
  }
  
}



// Export singleton instance
export const apiClient = new ApiClient();