// import { QueryClient } from '@tanstack/react-query';

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

//   private getAuthHeaders(): HeadersInit {
//     const token = localStorage.getItem('token');
    
//     const headers: HeadersInit = {
//       'Content-Type': 'application/json',
//     };
    
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
//     const config: RequestInit = {
//       headers: this.getAuthHeaders(),
//       ...options,
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

//       return await response.json();
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



// // src/lib/api-client.ts

// // Utility function to convert snake_case keys to camelCase
// // function toCamelCase(obj: any): any {
// //   if (obj === null || typeof obj !== 'object') {
// //     return obj;
// //   }

// //   if (Array.isArray(obj)) {
// //     return obj.map(item => toCamelCase(item));
// //   }

// //   return Object.keys(obj).reduce((acc, key) => {
// //     const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
// //     acc[camelCaseKey] = toCamelCase(obj[key]);
// //     return acc;
// //   }, {});
// // }

// // const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000/api';

// // class ApiClient {
// //   private async makeRequest<T>(
// //     endpoint: string, 
// //     options: RequestInit = {}
// //   ): Promise<T> {
// //     const token = localStorage.getItem('token');
    
// //     const config: RequestInit = {
// //       headers: {
// //         'Content-Type': 'application/json',
// //         ...(token && { Authorization: `Bearer ${token}` }),
// //         ...options.headers,
// //       },
// //       ...options,
// //     };

// //     try {
// //       const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      
// //       if (!response.ok) {
// //         const errorData = await response.json().catch(() => ({ message: 'Network error' }));
// //         throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
// //       }
      
// //       // Get the JSON response and convert it to camelCase
// //       const jsonResponse = await response.json();
// //       return toCamelCase(jsonResponse);
// //     } catch (error) {
// //       console.error('API Request failed:', error);
// //       throw error;
// //     }
// //   }

// //   async get<T>(endpoint: string): Promise<T> {
// //     return this.makeRequest<T>(endpoint);
// //   }

// //   async post<T>(endpoint: string, data: any): Promise<T> {
// //     return this.makeRequest<T>(endpoint, {
// //       method: 'POST',
// //       body: JSON.stringify(data),
// //     });
// //   }

// //   async put<T>(endpoint: string, data: any): Promise<T> {
// //     return this.makeRequest<T>(endpoint, {
// //       method: 'PUT',
// //       body: JSON.stringify(data),
// //     });
// //   }

// //   async patch<T>(endpoint: string, data: any): Promise<T> {
// //     return this.makeRequest<T>(endpoint, {
// //       method: 'PATCH',
// //       body: JSON.stringify(data),
// //     });
// //   }

// //   async delete<T>(endpoint: string): Promise<T> {
// //     return this.makeRequest<T>(endpoint, { method: 'DELETE' });
// //   }

// //   // File upload method
// //   async uploadFile<T>(endpoint: string, file: File, type: string): Promise<T> {
// //     const formData = new FormData();
// //     formData.append('image', file);
// //     formData.append('type', type);

// //     const token = localStorage.getItem('token');
// //     const headers: HeadersInit = {};
    
// //     if (token && token !== 'undefined') {
// //       headers.Authorization = `Bearer ${token}`;
// //     }

// //     const response = await fetch(`${this.baseURL}/api${endpoint}`, {
// //       method: 'POST',
// //       headers,
// //       body: formData,
// //     });

// //     if (!response.ok) {
// //       throw new Error('File upload failed');
// //     }

// //     return await response.json();
// //   }
// // }

// // export const apiClient = new ApiClient();

// src/lib/api-client.ts

import { QueryClient } from '@tanstack/react-query';

// Utility function to convert snake_case keys to camelCase
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
  }, {});
}

// API Base URL from environment
const API_BASE_URL = import.meta.env.VITE_API_BASE || 'http://localhost:4000';

// Create QueryClient instance
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// API Client class for making authenticated requests
export class ApiClient {
  private baseURL: string;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
  }

  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('token');
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token && token !== 'undefined') {
      headers.Authorization = `Bearer ${token}`;
    }
    
    return headers;
  }

  private async makeRequest<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}/api${endpoint}`;
    const config: RequestInit = {
      headers: this.getAuthHeaders(),
      ...options,
    };

    // Merge headers properly
    if (options.headers) {
      config.headers = { ...config.headers, ...options.headers };
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ 
          message: `HTTP error! status: ${response.status}` 
        }));
        throw new Error(errorData.message || errorData.error || `HTTP error! status: ${response.status}`);
      }

      const jsonResponse = await response.json();
      // Apply the casing conversion here
      return toCamelCase(jsonResponse) as T;
    } catch (error) {
      console.error('API Request failed:', error);
      throw error;
    }
  }

  // Generic HTTP methods
  async get<T>(endpoint: string): Promise<T> {
    return this.makeRequest<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.makeRequest<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
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

  // File upload method
  async uploadFile<T>(endpoint: string, file: File, type: string): Promise<T> {
    const formData = new FormData();
    formData.append('image', file);
    formData.append('type', type);

    const token = localStorage.getItem('token');
    const headers: HeadersInit = {};
    
    if (token && token !== 'undefined') {
      headers.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(`${this.baseURL}/api${endpoint}`, {
      method: 'POST',
      headers,
      body: formData,
    });

    if (!response.ok) {
      throw new Error('File upload failed');
    }

    return await response.json();
  }
}

// Export singleton instance
export const apiClient = new ApiClient();