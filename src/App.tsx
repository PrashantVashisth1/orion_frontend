import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { queryClient } from "@/lib/my-api-client";
// import Prelogin from "./pages/student-landing-Page";
import Prelogin from "./pages/prelogin";
import HomePage from "./pages/postlogin";
import ProfilePage from "./pages/profile";
import EditProfile from "./pages/edit-profile";
import EnhancedShareNeedsForm from "./pages/share-need-page";
import StartupListing from "./pages/explore";
import CreatePostPage from "./pages/my-create-post";
import GetFundedPage from "./pages/get-funded";
import PublicProfilePage from './pages/public-profile';
import { Rocket } from "lucide-react";
import { AuthProvider } from "./contexts/AuthContext";
import { StartupProfileProvider } from "./contexts/StartupProfileContext";
import ProtectedRoute from "./components/auth/routes/ProtectedRoute";
import PublicRoute from "./components/auth/routes/PublicRoute";
import OnlineSessionPage from "./pages/onlinesession";
import ViewSession from "./pages/ViewSession";
import HostSessionPage from "./pages/hostsession/index";
import ViewNeedsPage from "./pages/ViewNeeds";
// import SinglePostPage from "./pages/singlePost";
import UserActivitiesPage from "./pages/my-activities/index";
import ResetPasswordPage from "./pages/reset-password";



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

              {/* <Route
                path="/post/:id"
                element={
                  <ProtectedRoute>
                    <SinglePostPage />
                  </ProtectedRoute>
                }
              /> */}

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

              {/* Catch-all 404 */}
              <Route
                path="*"
                element={
                  <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
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

