import React from 'react';
import { useStartupProfileContext } from '@/contexts/StartupProfileContext';
import { useNavigate, useLocation } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Building2, User, AlertCircle, ArrowRight, CheckCircle } from 'lucide-react';

interface ProfileCompletionCheckerProps {
  children: React.ReactNode;
}

const ProfileCompletionChecker: React.FC<ProfileCompletionCheckerProps> = ({ children }) => {
  const { profile, isComplete, completionPercentage, isLoading } = useStartupProfileContext();
  const navigate = useNavigate();
  const location = useLocation();

  // Allow access to edit-profile page and auth pages
  const allowedPaths = ['/edit-profile', '/prelogin', '/profile'];
  const isAllowedPath = allowedPaths.some(path => location.pathname.startsWith(path));

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // If profile is complete or user is on allowed path, show the children
  if (isComplete || isAllowedPath) {
    return <>{children}</>;
  }

  // Show profile completion required screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <Card className="w-full max-w-2xl bg-gray-800/90 backdrop-blur-sm border-gray-700/50 shadow-2xl">
          <CardContent className="p-8 text-center space-y-6">
            {/* Icon */}
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto">
              <Building2 className="h-12 w-12 text-blue-400" />
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-white">Complete Your Startup Profile</h1>
              <p className="text-gray-400 text-lg">
                To interact with the OrionEduverse community, please complete your startup profile first.
              </p>
            </div>

            {/* Progress */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-300">Profile Completion</span>
                <span className="text-blue-400 font-semibold">{completionPercentage}%</span>
              </div>
              <Progress 
                value={completionPercentage} 
                className="h-3 bg-gray-700"
              />
            </div>

            {/* Status */}
            <div className="bg-gray-700/50 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-center space-x-2 text-orange-400">
                <AlertCircle className="h-5 w-5" />
                <span className="font-medium">Profile Incomplete</span>
              </div>
              
              <div className="space-y-3 text-left">
                <h3 className="font-semibold text-white text-center mb-4">Required Sections:</h3>
                <ProfileSectionStatus 
                  title="Personal Information" 
                  completed={!!profile?.personalInfo?.firstName} 
                />
                <ProfileSectionStatus 
                  title="Business Details" 
                  completed={!!profile?.businessDetails?.jobTitle} 
                />
                <ProfileSectionStatus 
                  title="Company Details" 
                  completed={!!profile?.companyDetails?.companyName} 
                />
                <ProfileSectionStatus 
                  title="Company Offerings" 
                  completed={!!profile?.offerings?.products?.length || !!profile?.offerings?.services?.length} 
                />
                <ProfileSectionStatus 
                  title="Interests & Focus" 
                  completed={!!profile?.interests?.primaryIndustry} 
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                onClick={() => navigate('/edit-profile')}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                <User className="h-5 w-5 mr-2" />
                Complete Profile
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => navigate('/profile')}
                className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-700/50 py-3 px-6 rounded-xl"
              >
                View Current Profile
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-sm text-gray-500 bg-gray-800/50 rounded-lg p-4">
              <p>
                <strong>Why complete your profile?</strong><br />
                A complete startup profile helps you connect with the right partners, investors, 
                and collaborators in the OrionEduverse ecosystem. It's your digital identity 
                that showcases your startup's potential.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

interface ProfileSectionStatusProps {
  title: string;
  completed: boolean;
}

const ProfileSectionStatus: React.FC<ProfileSectionStatusProps> = ({ title, completed }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
        completed ? 'bg-green-500/20 text-green-400' : 'bg-gray-600 text-gray-400'
      }`}>
        {completed ? (
          <CheckCircle className="h-3 w-3" />
        ) : (
          <div className="w-2 h-2 bg-gray-400 rounded-full" />
        )}
      </div>
      <span className={`text-sm ${completed ? 'text-green-300' : 'text-gray-300'}`}>
        {title}
      </span>
      {completed && (
        <span className="text-xs text-green-400 font-medium">✓</span>
      )}
    </div>
  );
};

export default ProfileCompletionChecker;
