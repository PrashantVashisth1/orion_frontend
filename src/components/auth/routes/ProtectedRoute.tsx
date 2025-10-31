// import React from 'react';
// import { Navigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';

// interface ProtectedRouteProps {
//   children: React.ReactNode;
// }

// const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
//   const { isAuthenticated, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="flex items-center space-x-2">
//           <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
//           <span className="text-gray-600">Loading...</span>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return <Navigate to="/prelogin" replace />;
//   }

//   return <>{children}</>;
// };

// export default ProtectedRoute; 

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  // 1. Get user and location
  const { isAuthenticated, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading...</span>
        </div>
      </div>
    );
  }

  // 2. If not authenticated, send to prelogin
  if (!isAuthenticated) {
    return <Navigate to="/prelogin" replace />;
  }

  // --- 🟢 NEW ROLE-BASED REDIRECTION LOGIC ---

  // 3. Check role (ensure case matches your backend: 'student' or 'STUDENT')
  const isStudent = user?.role === 'STUDENT'; 
  // const isStudent = user?.role === 'STUDENT'; // Use this if your backend sends uppercase

  const currentPath = location.pathname;

  // 4. If a student lands on the startup dashboard (/postlogin)
  if (isStudent && currentPath === '/postlogin') {
    // Redirect them to their correct dashboard
    return <Navigate to="/student-temp" replace />;
  }

  // 5. If a non-student (e.g., startup) lands on the student dashboard
  if (!isStudent && currentPath === '/student-temp') {
    // Redirect them to their correct dashboard
    return <Navigate to="/postlogin" replace />;
  }
  
  // --- 🟢 END OF NEW LOGIC ---

  // 6. If all checks pass, render the requested page
  return <>{children}</>;
};

export default ProtectedRoute;