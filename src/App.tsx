import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/my-api-client";
import StudentPrelogin from "./pages/Student-Pages/student-landing-Page"
import MentorPage from "./pages/Student-Pages/MentorPage"
import StudentViewNeeds from "./pages/Student-Pages/Student-View-Needs"
import StudentViewSessions from "./pages/Student-Pages/Student-View-Sessions"
import LearningResources from "./pages/Student-Pages/LearningResources"
// import Prelogin from "./pages/prelogin"
// import Prelogin from "./pages/postlogin"
import ExplorePossibilities from "./pages/Student-Pages/Student-temp"
import ShareProjectIdeas from "./pages/Student-Pages/share-project"
import StudentCreatePost from "./pages/Student-Pages/Create-Post-Page"
import StudentPostlogin from "./pages/Student-Pages/PostLogin"
import PendingVerificationPage from './pages/pending-verification';
import Prelogin from "./pages/prelogin"
import HomePage from "./pages/postlogin";
import ProfilePage from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import EnhancedShareNeedsForm from "./pages/share-need-page";
import StartupListing from "./pages/explore";
import CreatePostPage from "./pages/my-create-post";
import GetFundedPage from "./pages/get-funded";
import PublicProfilePage from './pages/public-profile';
import { Rocket } from "lucide-react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { StartupProfileProvider } from "./contexts/StartupProfileContext";
import ProtectedRoute from "./components/auth/routes/ProtectedRoute";
import PublicRoute from "./components/auth/routes/PublicRoute";
import OnlineSessionPage from "./pages/onlinesession";
import ViewSession from "./pages/ViewSession";
import HostSessionPage from "./pages/hostsession/index";
import ViewNeedsPage from "./pages/ViewNeeds";
import SinglePostPage from "./pages/singlePost";
import UserActivitiesPage from "./pages/my-activities/index";
import ResetPasswordPage from "./pages/reset-password";
import StudentTempPage from "./pages/student-temp";


// We use this for /edit-profile and /pending-verification
const AuthCheckLayout = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Or a spinner
  }

  if (!isAuthenticated) {
    return <Navigate to="/prelogin" replace />;
  }

  return <Outlet />; // User is logged in, show the child route
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <StartupProfileProvider>
            {/* Toast notifications - moved here from main.tsx */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: "#374151",
                  color: "#fff",
                  border: "1px solid #4B5563",
                },
                success: {
                  iconTheme: {
                    primary: "#10B981",
                    secondary: "#fff",
                  },
                },
                error: {
                  iconTheme: {
                    primary: "#EF4444",
                    secondary: "#fff",
                  },
                },
              }}
            />

            <Routes>
              {/* Redirect root to /prelogin */}
              <Route path="/" element={<Navigate to="/prelogin" replace />} />

              {/* Prelogin flow - only accessible to unauthenticated users */}
              <Route
                path="/prelogin"
                element={
                  <PublicRoute>
                    <Prelogin />
                  </PublicRoute>
                }
              />

              {/* We wrap /edit-profile and /pending-verification here */}
          <Route element={<AuthCheckLayout />}>
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/pending-verification" element={<PendingVerificationPage />} />
          </Route>

              <Route
                path="/student-temp"
                element={
                  <ProtectedRoute>
                    <StudentTempPage />
                  </ProtectedRoute>
                }
              />

              <Route
            path="/profile/:userId" // Use /users/ or keep /profile/ if you deleted the old one
            element={
              
                
                   <PublicProfilePage />
                
              
            }
          />

              {/* Post-login flow - only accessible to authenticated users */}
              <Route
                path="/postlogin"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />

              {/* Profile pages - only accessible to authenticated users */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/edit-profile"
                element={
                  <ProtectedRoute>
                    <EditProfile />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/share-needs"
                element={
                  <ProtectedRoute>
                    <EnhancedShareNeedsForm />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/view-needs"
                element={
                  <ProtectedRoute>
                    <ViewNeedsPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/post/:id"
                element={
                  
                    <SinglePostPage />
                  
                }
              />

              <Route
                path="/reset-password"
                element={<PublicRoute >
                  <ResetPasswordPage />
                </PublicRoute> }
              />

              <Route
                path="/explore"
                element={
                  <ProtectedRoute>
                    <StartupListing />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/get-funded"
                element={
                  <ProtectedRoute>
                    <GetFundedPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/online-session"
                element={
                  <ProtectedRoute>
                    <OnlineSessionPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/view-session"
                element={
                  <ProtectedRoute>
                    <ViewSession />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/host-session"
                element={
                  <ProtectedRoute>
                    <HostSessionPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/create-post"
                element={
                  <ProtectedRoute>
                    <CreatePostPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/activities"
                element={
                  <ProtectedRoute>
                    <UserActivitiesPage />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/students/prelogin"
                element={
                    <StudentPrelogin/>
                }
              />

              <Route
                path="/students/postlogin"
                element={
                  // <ProtectedRoute>
                    <StudentPostlogin/>
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/mentor"
                element={
                  // <ProtectedRoute>
                    <MentorPage/>
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/learning"
                element={
                  // <ProtectedRoute>
                    <LearningResources />
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/explore-possibilities"
                element={
                  // <ProtectedRoute>
                    <ExplorePossibilities/>
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/share"
                element={
                  // <ProtectedRoute>
                    <ShareProjectIdeas/>
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/view-sessions"
                element={
                  // <ProtectedRoute>
                    <StudentViewSessions/>
                  // </ProtectedRoute>
                }
              />

              <Route
                path="/students/view-needs"
                element={
                  // <ProtectedRoute>
                    <StudentViewNeeds/>
                  //  </ProtectedRoute>
                }
              />

              <Route
                path="/students/create-posts"
                element={
                  // <ProtectedRoute>
                    <StudentCreatePost/>
                  //  </ProtectedRoute>
                }
              />

              {/* Catch-all 404 */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col bg-white items-center justify-center min-h-[100vh] text-center px-4">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-4 rounded-full mb-4 shadow-lg animate-bounce">
                      <Rocket className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 bg-clip-text text-transparent mb-4">
                      Coming Soon
                    </h1>
                    <p className="text-lg text-black">
                      We're working on something awesome. Stay tuned 🚀
                    </p>
                  </div>
                }
              />
            </Routes>

            {/* React Query Devtools - only in development */}
            {/* {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />} */}
          </StartupProfileProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
};

export default App;

