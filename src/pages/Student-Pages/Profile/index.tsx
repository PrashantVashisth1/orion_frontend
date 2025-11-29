import React from 'react';
import { User, Mail, Phone, MapPin, Calendar, Briefcase, GraduationCap, Award, ExternalLink, Github, Linkedin, Globe, Building2, Loader2, AlertCircle } from 'lucide-react';
import { useStudentProfile } from '@/hooks/useStudentAPI';
import Footer from '@/components/Students-Components/student-footer';
import Navbar from "../../../components/Students-Components/StudentPostLoginNavbar";

const StudentProfile = () => {
  const { data: profileResponse, isLoading, error } = useStudentProfile();
  
  // Extract profile data from the response
  const profile = profileResponse?.data;

  const formatDate = (dateString: any): string => {
    if (!dateString) return 'Present';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'Present';
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    } catch {
      return 'Present';
    }
  };

  // Debug: Log the profile structure
  React.useEffect(() => {
    if (profile) {
      console.log('Profile structure:', profile);
      console.log('Personal Info:', profile.personalInfo);
      console.log('Skills Info:', profile.skillsInfo);
    }
  }, [profile]);

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-red-200 p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600">Unable to load your profile. Please try again later.</p>
        </div>
      </div>
    );
  }

  // No profile state
  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 max-w-md w-full text-center">
          <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">No Profile Found</h2>
          <p className="text-gray-600">Please complete your profile to view it here.</p>
        </div>
      </div>
    );
  }

  // Safely access nested data with fallbacks - use 'as any' to bypass TypeScript errors
  const personalInfo = (profile?.personalInfo || {}) as any;
  const educationRecords = (profile?.educationRecords || []) as any[];
  const workExperiences = (profile?.workExperiences || []) as any[];
  const skillsInfo = (profile?.skillsInfo || {}) as any;
  const selectedSkills = skillsInfo.selectedSkills || [];
  const certificates = skillsInfo.certificates || [];
  const profileImageUrl = personalInfo.profilePicture;

  return (
    <div className='bg-blue-50 '>
    <Navbar onSidebarToggle={false}/>
    <div className="min-h-screen bg-blue-50 py-8 px-4 border-black">
      <div className="max-w-5xl mx-auto p-7 bg-gray-50 rounded-lg shadow-sm border border-gray-200">
        {/* Header Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden mb-6">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-24"></div>
          <div className="px-8 pb-6">
            <div className="flex items-start gap-6 -mt-12">
              {/* <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0">
                <User className="w-12 h-12 text-white" />
              </div> */}
              <div className="w-24 h-24 rounded-full border-4 border-white bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg flex-shrink-0 overflow-hidden">
                {profileImageUrl ? (
                    <img 
                        src={profileImageUrl} 
                        alt={`${personalInfo.firstName} Profile`} 
                        className="w-full h-full object-cover" 
                    />
                ) : (
                    // Default Icon if no image URL is found
                    <User className="w-12 h-12 text-white" />
                )}
              </div>
              <div className="pt-14 flex-1">
                <h1 className="text-2xl font-bold text-gray-900">
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                {personalInfo.headline && (
                  <p className="text-gray-600 mt-1">{personalInfo.headline}</p>
                )}
                
                <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4 text-sm text-gray-600">
                  {personalInfo.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{personalInfo.email}</span>
                    </div>
                  )}
                  {personalInfo.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{personalInfo.phone}</span>
                    </div>
                  )}
                  {personalInfo.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{personalInfo.location}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 mt-4">
                  {personalInfo.linkedin && (
                    <a
                      href={personalInfo.linkedin.startsWith('http') ? personalInfo.linkedin : `https://${personalInfo.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      <Linkedin className="w-5 h-5" />
                    </a>
                  )}
                  {personalInfo.github && (
                    <a
                      href={personalInfo.github.startsWith('http') ? personalInfo.github : `https://${personalInfo.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}
                  {personalInfo.portfolioWebsite && (
                    <a
                      href={personalInfo.portfolioWebsite.startsWith('http') ? personalInfo.portfolioWebsite : `https://${personalInfo.portfolioWebsite}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-indigo-600 hover:text-indigo-700 transition-colors"
                    >
                      <Globe className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Education Section */}
        {educationRecords.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-blue-600" />
            </div>
              <h2 className="text-xl font-bold text-gray-900">Education</h2>
            </div>
            
            <div className="space-y-6">
              {educationRecords.map((edu, index) => (
                <div key={edu.id} className="relative pl-8">
                  {/* Timeline dot and line */}
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-blue-600 ring-4 ring-blue-100"></div>
                  {index !== educationRecords.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  
                  <div className="pb-6">
                    <div className="flex items-start justify-between flex-wrap gap-2">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{edu.institutionName}</h3>
                        <p className="text-gray-700 mt-1">
                          {edu.degreeQualification} in {edu.fieldOfStudy}
                        </p>
                      </div>
                      {edu.gradeCgpa && (
                        <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-medium">
                          {edu.gradeCgpa}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-gray-500 mt-2">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(edu.startDate)} - {formatDate(edu.endDate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Experience Section */}
        {workExperiences.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center">
                <Briefcase className="w-6 h-6 text-indigo-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Work Experience</h2>
            </div>
            
            <div className="space-y-6">
              {workExperiences.map((work, index) => (
                <div key={work.id} className="relative pl-8">
                  {/* Timeline dot and line */}
                  <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-indigo-600 ring-4 ring-indigo-100"></div>
                  {index !== workExperiences.length - 1 && (
                    <div className="absolute left-1.5 top-6 bottom-0 w-0.5 bg-gray-200"></div>
                  )}
                  
                  <div className="pb-6">
                    <h3 className="text-lg font-semibold text-gray-900">{work.jobTitle}</h3>
                    <div className="flex items-center gap-2 text-gray-700 mt-1">
                      <Building2 className="w-4 h-4" />
                      <span>{work.companyName}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      {work.location && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{work.location}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(work.startDate)} - {formatDate(work.endDate)}</span>
                      </div>
                    </div>
                    {work.description && (
                      <p className="text-gray-600 mt-3 leading-relaxed text-sm">{work.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {selectedSkills.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
              <h2 className="text-xl font-bold text-gray-900">Skills</h2>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {selectedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 rounded-full text-sm font-medium border border-blue-200"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Certifications Section */}
        {certificates.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-200">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Certifications</h2>
            </div>
            
            <div className="space-y-4">
              {certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="flex items-start gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
                >
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900">{cert.certificateName}</h3>
                    {cert.issuingOrganization && (
                      <p className="text-gray-600 text-sm mt-1">{cert.issuingOrganization}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 mt-2 text-xs text-gray-500">
                      {cert.issueDate && (
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>Issued {formatDate(cert.issueDate)}</span>
                        </div>
                      )}
                      {cert.credentialId && (
                        <span>ID: {cert.credentialId}</span>
                      )}
                    </div>
                  </div>
                  
                  {cert.credentialUrl && (
                    <a
                      href={cert.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-blue-600 hover:text-blue-700 text-sm font-medium whitespace-nowrap"
                    >
                      <span>View</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    <Footer/>
    </div>
  );
};

export default StudentProfile;