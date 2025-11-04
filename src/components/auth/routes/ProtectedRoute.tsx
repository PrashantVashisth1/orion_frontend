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

  // --- 🟢 NEW STARTUP VERIFICATION LOGIC ---
  // This is the main gate for Startups.
  // We assume this ProtectedRoute wraps /postlogin, /share-need, etc.
  // We assume it does NOT wrap /edit-profile or /pending-verification.
  if (user?.role === 'STARTUP') {
    if (user.is_startup_verified) {
      // State 3: Verified!
      // Now we just run your existing check to make sure they aren't on the wrong dashboard.
      if (location.pathname === '/student-temp') {
        return <Navigate to="/postlogin" replace />;
      }
      // Verified and on a correct startup page, allow access.
      return <>{children}</>;
    }

    // --- If startup is NOT verified ---
    
    if (!user.has_submitted_profile) {
      // State 1: New Startup (not submitted). Force to edit profile.
      return <Navigate to="/edit-profile" replace />;
    } else {
      // State 2: Pending Startup (submitted, not verified). Force to pending page.
      return <Navigate to="/pending-verification" replace />;
    }
  }
  // --- 🟢 END OF NEW STARTUP LOGIC ---


  // --- 🟢 STUDENT DASHBOARD CHECK ---
  // If the code reaches here, the user is a STUDENT (or other role).
  if (user?.role === 'STUDENT') {
    // If a student lands on the startup dashboard (/postlogin)
    if (location.pathname === '/postlogin') {
      return <Navigate to="/student-temp" replace />;
    }
    // Student is on a correct page (e.g., /student-temp or /share-need)
    return <>{children}</>;
  }
  
  // --- 🟢 OTHER ROLES (MENTOR, ADMIN, etc.) ---
  // Assuming they use the /postlogin dashboard
  if (location.pathname === '/student-temp') {
    return <Navigate to="/postlogin" replace />;
  }

  // 6. If all checks pass, render the requested page
  return <>{children}</>;
};

export default ProtectedRoute;