
// SessionDetailsModal.tsx
'use client';

import {
  Calendar, Clock, Link, User, Tag, Phone, Users, Mail,
  Mic, Globe, Briefcase, Award, ChevronRight, MapPin, FileText, Info
} from 'lucide-react';
import { format } from 'date-fns';
import type { Session } from './types';

interface SessionDetailsModalProps {
  session: Session;
  isOpen: boolean;
  onClose: () => void;
}

const SessionDetailsModal = ({ session, isOpen, onClose }: SessionDetailsModalProps) => {
  if (!isOpen) {
    return null;
  }

  // --- Utility Functions ---
  const getIconForType = (type: Session['type']) => {
    switch (type) {
      case 'WEBINAR':
        return <Mic className="w-5 h-5 text-purple-400" />;
      case 'PANEL_DISCUSSION':
        return <Globe className="w-5 h-5 text-blue-400" />;
      case 'PRODUCT_DEMO':
        return <Briefcase className="w-5 h-5 text-green-400" />;
      default:
        return <Award className="w-5 h-5 text-gray-400" />;
    }
  };

  // --- Conditional Grouping Logic (Remains the same) ---
  const shouldRenderHostContact = (session.hostName || session.hostEmail || session.contactInfo);
  const shouldRenderSpeaker = (session.speakerName || session.speakerEmail);
  const shouldRenderPanelist = (session.panelistName || session.panelistDesignation || session.panelistBio);
  const shouldRenderModerator = (session.moderatorName || session.moderatorDesignation || session.moderatorBio);
  const shouldRenderPresenterInfo = (session.presenterName || session.presenterDesignation || session.presenterAffiliation);
  const shouldRenderAboutCompany = session.aboutCompany;
  const shouldRenderAboutProduct = session.aboutProduct;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75 backdrop-blur-sm">
      <div className="relative bg-slate-800 rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors p-1 rounded-full bg-slate-700/50 hover:bg-slate-700"
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Header section */}
        <div className="bg-gradient-to-r from-blue-700 to-purple-800 text-white rounded-lg p-6 mb-6 shadow-md">
          <div className="flex items-center gap-3 text-sm mb-2">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(session.dateTime), 'do MMMM, yyyy')} | {format(new Date(session.dateTime), 'h:mm a')}</span>
          </div>
          <h1 className="text-3xl font-bold mt-2">{session.title}</h1>
        </div>

        {/* Main Content Sections: Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-slate-300">
          
          {/* Left Column: Essential Session Details (Title, Date, Duration, Audience) */}
          <div>
            <h3 className="text-xl font-semibold text-purple-500 mb-4 flex items-center gap-2">
              <Info className="w-6 h-6 text-purple-400" /> Session Details
            </h3>
            <div className="space-y-4">
              {/* Title/Topic */}
              <div className="flex items-start">
                <Tag className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-white">Title/Topic:</span> {session.title}
                </div>
              </div>
              {/* Date & Time */}
              <div className="flex items-start">
                <Calendar className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-white">Date & Time:</span> {format(new Date(session.dateTime), 'do MMMM, yyyy')} | {format(new Date(session.dateTime), 'h:mm a')}
                </div>
              </div>
              {/* Duration */}
              <div className="flex items-start">
                <Clock className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                <div>
                  <span className="font-semibold text-white">Duration:</span> {session.duration}
                </div>
              </div>

              {/* Audience Intended */}
              {session.audience && session.audience.length > 0 && (
                <div className="flex items-start">
                  <Users className="w-5 h-5 text-slate-400 mr-3 mt-1" />
                  <div>
                    <span className="font-semibold text-white">Audience Intended:</span>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {session.audience.map((item, index) => (
                        <span key={index} className="bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded-full capitalize">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Dynamic Information (Speaker/Panel/Presenter) */}
          <div>
            <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              {getIconForType(session.type)} Information
            </h3>
            <div className="space-y-6">

              {/* --- 1. HOST & CONTACT DETAILS (Shared for all types if present) --- */}
              {shouldRenderHostContact && (
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-purple-400 flex items-center gap-2"><Mic className="w-4 h-4" /> Host/Contact</p>
                  {session.hostName && <div className="flex items-center"><User className="w-5 h-5 text-slate-400 mr-3" /><span className="font-semibold text-white">Name:</span> {session.hostName}</div>}
                  {session.hostEmail && <div className="flex items-center"><Mail className="w-5 h-5 text-slate-400 mr-3" /><span className="font-semibold text-white">Email:</span> {session.hostEmail}</div>}
                  {session.contactInfo && <div className="flex items-center"><Phone className="w-5 h-5 text-slate-400 mr-3" /><span className="font-semibold text-white">Contact:</span> {session.contactInfo}</div>}
                </div>
              )}

              {/* --- 2. WEBINAR: Speaker Information --- */}
              {session.type === 'WEBINAR' && shouldRenderSpeaker && (
                <div className={`space-y-3 ${shouldRenderHostContact ? 'pt-4 border-t border-slate-700' : ''}`}>
                  <p className="text-sm font-semibold text-purple-400 flex items-center gap-2"><User className="w-4 h-4" /> Speaker's Information</p>
                  {session.speakerName && (
                    <>
                      <div className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-slate-500 mr-2" />
                        <span className="font-semibold text-white">{session.speakerName}</span>
                      </div>
                      {session.speakerEmail && (
                        <div className="flex items-center text-sm text-slate-400 ml-6">
                          <Mail className="w-4 h-4 mr-2" /> {session.speakerEmail}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )}

              {/* --- 3. PANEL DISCUSSION: Panelist's and Moderator's Information --- */}
              {session.type === 'PANEL_DISCUSSION' && (shouldRenderPanelist || shouldRenderModerator) && (
                <div className={`space-y-6 ${shouldRenderHostContact || shouldRenderSpeaker ? 'pt-4 border-t border-slate-700' : ''}`}>
                  {/* Panelist's Information */}
                  {shouldRenderPanelist && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-blue-400 flex items-center gap-2"><Globe className="w-4 h-4" /> Panelist's Information</p>
                      {session.panelistName && (
                        <>
                          <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-slate-500 mr-2" />
                            <span className="font-semibold text-white">{session.panelistName}</span>
                          </div>
                          {session.panelistDesignation && (
                            <div className="flex items-center text-sm text-slate-400 ml-6">
                              <Award className="w-4 h-4 mr-2" /> {session.panelistDesignation}
                            </div>
                          )}
                          {session.panelistBio && (
                            <div className="mt-1 ml-6 text-sm text-slate-400">
                              <span className="font-semibold text-white">Bio: </span>
                              {session.panelistBio}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* Moderator's Information */}
                  {shouldRenderModerator && (
                    <div className={`space-y-3 ${shouldRenderPanelist ? 'pt-4 border-t border-slate-700' : ''}`}>
                      <p className="text-sm font-semibold text-blue-400 flex items-center gap-2"><User className="w-4 h-4" /> Moderator's Information</p>
                      {session.moderatorName && (
                        <>
                          <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-slate-500 mr-2" />
                            <span className="font-semibold text-white">{session.moderatorName}</span>
                          </div>
                          {session.moderatorDesignation && (
                            <div className="flex items-center text-sm text-slate-400 ml-6">
                              <Award className="w-4 h-4 mr-2" /> {session.moderatorDesignation}
                            </div>
                          )}
                          {session.moderatorBio && (
                            <div className="mt-1 ml-6 text-sm text-slate-400">
                              <span className="font-semibold text-white">Bio: </span>
                              {session.moderatorBio}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* --- 4. PRODUCT DEMO: Presenter's Information & About Product/Company --- */}
              {session.type === 'PRODUCT_DEMO' && (shouldRenderPresenterInfo || shouldRenderAboutCompany || shouldRenderAboutProduct) && (
                <div className="space-y-6">
                  {/* Presenter's Information */}
                  {shouldRenderPresenterInfo && (
                    <div className="space-y-3">
                      <p className="text-sm font-semibold text-green-400 flex items-center gap-2"><Briefcase className="w-4 h-4" /> Presenter's Information</p>
                      {session.presenterName && (
                        <>
                          <div className="flex items-center">
                            <ChevronRight className="w-4 h-4 text-slate-500 mr-2" />
                            <span className="font-semibold text-white">{session.presenterName}</span>
                          </div>
                          {session.presenterDesignation && (
                            <div className="flex items-center text-sm text-slate-400 ml-6">
                              <Award className="w-4 h-4 mr-2" /> {session.presenterDesignation}
                            </div>
                          )}
                          {session.presenterAffiliation && (
                            <div className="flex items-center text-sm text-slate-400 ml-6">
                              <MapPin className="w-4 h-4 mr-2" /> {session.presenterAffiliation}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  {/* About Company */}
                  {shouldRenderAboutCompany && (
                    <div className={`pt-4 border-t border-slate-700 space-y-3 ${shouldRenderPresenterInfo ? '' : 'mt-0'}`}>
                      <p className="flex items-center mb-1"><Briefcase className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold text-emerald-400">About the Company:</span></p>
                      <p className="text-sm text-slate-400">{session.aboutCompany}</p>
                    </div>
                  )}

                  {/* About Product */}
                  {shouldRenderAboutProduct && (
                    <div className={`pt-4 border-t border-slate-700 space-y-3 ${shouldRenderPresenterInfo || shouldRenderAboutCompany ? '' : 'mt-0'}`}>
                      <p className="flex items-center mb-1"><FileText className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold text-emerald-400">About the Solution/Product:</span></p>
                      <p className="text-sm text-slate-400">{session.aboutProduct}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Full-Width Section Below Grid */}
        <div className="mt-8 pt-4 border-t border-slate-700">
            {/* Description (Moved to full width) */}
            {session.description && (
                <div className="mb-6">
                    <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-purple-400" /> Description</h4>
                    <p className="text-slate-400">{session.description}</p>
                </div>
            )}
            
            {/* Registration Link (Always last) */}
            {session.registrationLink && (
              <div>
                <h4 className="text-lg font-semibold text-white mb-2 flex items-center gap-2"><Link className="w-5 h-5 text-purple-400" /> Registration Link</h4>
                <div className="bg-slate-700 p-3 rounded-md overflow-hidden whitespace-nowrap text-ellipsis">
                  <a href={session.registrationLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
                    {session.registrationLink}
                  </a>
                </div>
              </div>
            )}
        </div>


        {/* Join Session button */}
        {/* <div className="flex justify-center mt-8">
          <button className="bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:from-blue-700 hover:to-purple-800 transition-colors">
            Join Session
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SessionDetailsModal;
// SessionDetailsModal.tsx
// 'use client';

// import {
//   Calendar, Clock, Link, User, Tag, Phone, Users, Mail,
//   Mic, Globe, Briefcase, Award, ChevronRight, MapPin, FileText, Info
// } from 'lucide-react';
// import { format } from 'date-fns';
// import type { Session } from './types';

// interface SessionDetailsModalProps {
//   session: Session;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const SessionDetailsModal = ({ session, isOpen, onClose }: SessionDetailsModalProps) => {
//   if (!isOpen) {
//     return null;
//   }

//   // --- Utility Functions (kept) ---
//   const getIconForType = (type: Session['type']) => {
//     switch (type) {
//       case 'WEBINAR':
//         return <Mic className="w-5 h-5 text-indigo-600" />;
//       case 'PANEL_DISCUSSION':
//         return <Globe className="w-5 h-5 text-blue-600" />;
//       case 'PRODUCT_DEMO':
//         return <Briefcase className="w-5 h-5 text-green-600" />;
//       default:
//         return <Award className="w-5 h-5 text-gray-500" />;
//     }
//   };

//   // --- Conditional Grouping Logic (kept and used) ---
//   const shouldRenderHostContact = (session.hostName || session.hostEmail || session.contactInfo);
//   const shouldRenderSpeaker = (session.speakerName || session.speakerEmail);
//   const shouldRenderPanelist = (session.panelistName || session.panelistDesignation || session.panelistBio);
//   const shouldRenderModerator = (session.moderatorName || session.moderatorDesignation || session.moderatorBio);
//   const shouldRenderPresenterInfo = (session.presenterName || session.presenterDesignation || session.presenterAffiliation);
//   const shouldRenderAboutCompany = !!session.aboutCompany;
//   const shouldRenderAboutProduct = !!session.aboutProduct;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
//       <div className="relative bg-white/95 rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-xl border border-gray-200">
        
//         {/* Close button */}
//         <button
//           onClick={onClose}
//           className="absolute cursor-pointer top-4 right-4 text-gray-600 hover:text-gray-900 transition-colors p-2 rounded-full hover:bg-gray-300"
//           aria-label="Close modal"
//         >
//           <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
//           </svg>
//         </button>

//         {/* Header section */}
//         <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg p-6 mb-6 shadow-sm">
//           <div className="flex items-center gap-3 text-sm mb-2">
//             <Calendar className="w-4 h-4" />
//             <span>{format(new Date(session.dateTime), 'do MMMM, yyyy')} | {format(new Date(session.dateTime), 'h:mm a')}</span>
//           </div>
//           <h1 className="text-2xl md:text-3xl font-bold mt-2 leading-tight">{session.title}</h1>
//         </div>

//         {/* Main Content Sections: Two-Column Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-800">
          
//           {/* Left Column: Essential Session Details (Title, Date, Duration, Audience) */}
//           <div>
//             <h3 className="text-lg md:text-xl font-semibold text-indigo-600 mb-4 flex items-center gap-2">
//               <Info className="w-5 h-5 text-indigo-500" /> Session Details
//             </h3>
//             <div className="space-y-4 text-sm">
//               {/* Title/Topic */}
//               <div className="flex items-start">
//                 <Tag className="w-5 h-5 text-gray-400 mr-3 mt-1" />
//                 <div>
//                   <span className="font-semibold text-gray-900">Title/Topic:</span> <span className="text-gray-700">{session.title}</span>
//                 </div>
//               </div>
//               {/* Date & Time */}
//               <div className="flex items-start">
//                 <Calendar className="w-5 h-5 text-gray-400 mr-3 mt-1" />
//                 <div>
//                   <span className="font-semibold text-gray-900">Date & Time:</span> <span className="text-gray-700">{format(new Date(session.dateTime), 'do MMMM, yyyy')} | {format(new Date(session.dateTime), 'h:mm a')}</span>
//                 </div>
//               </div>
//               {/* Duration */}
//               <div className="flex items-start">
//                 <Clock className="w-5 h-5 text-gray-400 mr-3 mt-1" />
//                 <div>
//                   <span className="font-semibold text-gray-900">Duration:</span> <span className="text-gray-700">{session.duration}</span>
//                 </div>
//               </div>

//               {/* Audience Intended */}
//               {session.audience && session.audience.length > 0 && (
//                 <div className="flex items-start">
//                   <Users className="w-5 h-5 text-gray-400 mr-3 mt-1" />
//                   <div>
//                     <span className="font-semibold text-gray-900">Audience Intended:</span>
//                     <div className="mt-2 flex flex-wrap gap-2">
//                       {session.audience.map((item, index) => (
//                         <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full capitalize">{item}</span>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Column: Dynamic Information (Speaker/Panel/Presenter) */}
//           <div>
//             <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
//               {getIconForType(session.type)} Information
//             </h3>
//             <div className="space-y-6 text-sm text-gray-700">

//               {/* --- 1. HOST & CONTACT DETAILS (Shared for all types if present) --- */}
//               {shouldRenderHostContact && (
//                 <div className="space-y-3">
//                   <p className="text-sm font-semibold text-indigo-600 flex items-center gap-2"><Mic className="w-4 h-4 text-indigo-500" /> Host/Contact</p>
//                   {session.hostName && <div className="flex items-center"><User className="w-5 h-5 text-gray-400 mr-3" /><span className="font-semibold text-gray-900 mr-2">Name:</span> <span className="text-gray-700">{session.hostName}</span></div>}
//                   {session.hostEmail && <div className="flex items-center"><Mail className="w-5 h-5 text-gray-400 mr-3" /><span className="font-semibold text-gray-900 mr-2">Email:</span> <span className="text-gray-700">{session.hostEmail}</span></div>}
//                   {session.contactInfo && <div className="flex items-center"><Phone className="w-5 h-5 text-gray-400 mr-3" /><span className="font-semibold text-gray-900 mr-2">Contact:</span> <span className="text-gray-700">{session.contactInfo}</span></div>}
//                 </div>
//               )}

//               {/* --- 2. WEBINAR: Speaker Information --- */}
//               {session.type === 'WEBINAR' && shouldRenderSpeaker && (
//                 <div className={`space-y-3 ${shouldRenderHostContact ? 'pt-4 border-t border-gray-200' : ''}`}>
//                   <p className="text-sm font-semibold text-indigo-600 flex items-center gap-2"><User className="w-4 h-4 text-indigo-500" /> Speaker's Information</p>
//                   {session.speakerName && (
//                     <>
//                       <div className="flex items-center">
//                         <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
//                         <span className="font-semibold text-gray-900">{session.speakerName}</span>
//                       </div>
//                       {session.speakerEmail && (
//                         <div className="flex items-center text-sm text-gray-600 ml-6">
//                           <Mail className="w-4 h-4 mr-2" /> {session.speakerEmail}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               )}

//               {/* --- 3. PANEL DISCUSSION: Panelist's and Moderator's Information --- */}
//               {session.type === 'PANEL_DISCUSSION' && (shouldRenderPanelist || shouldRenderModerator) && (
//                 <div className={`space-y-6 ${shouldRenderHostContact || shouldRenderSpeaker ? 'pt-4 border-t border-gray-200' : ''}`}>
//                   {/* Panelist's Information */}
//                   {shouldRenderPanelist && (
//                     <div className="space-y-3">
//                       <p className="text-sm font-semibold text-blue-600 flex items-center gap-2"><Globe className="w-4 h-4 text-blue-500" /> Panelist's Information</p>
//                       {session.panelistName && (
//                         <>
//                           <div className="flex items-center">
//                             <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
//                             <span className="font-semibold text-gray-900">{session.panelistName}</span>
//                           </div>
//                           {session.panelistDesignation && (
//                             <div className="flex items-center text-sm text-gray-600 ml-6">
//                               <Award className="w-4 h-4 mr-2" /> {session.panelistDesignation}
//                             </div>
//                           )}
//                           {session.panelistBio && (
//                             <div className="mt-1 ml-6 text-sm text-gray-600">
//                               <span className="font-semibold text-gray-900">Bio: </span>
//                               <span className="text-gray-700">{session.panelistBio}</span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   )}

//                   {/* Moderator's Information */}
//                   {shouldRenderModerator && (
//                     <div className={`space-y-3 ${shouldRenderPanelist ? 'pt-4 border-t border-gray-200' : ''}`}>
//                       <p className="text-sm font-semibold text-blue-600 flex items-center gap-2"><User className="w-4 h-4 text-blue-500" /> Moderator's Information</p>
//                       {session.moderatorName && (
//                         <>
//                           <div className="flex items-center">
//                             <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
//                             <span className="font-semibold text-gray-900">{session.moderatorName}</span>
//                           </div>
//                           {session.moderatorDesignation && (
//                             <div className="flex items-center text-sm text-gray-600 ml-6">
//                               <Award className="w-4 h-4 mr-2" /> {session.moderatorDesignation}
//                             </div>
//                           )}
//                           {session.moderatorBio && (
//                             <div className="mt-1 ml-6 text-sm text-gray-600">
//                               <span className="font-semibold text-gray-900">Bio: </span>
//                               <span className="text-gray-700">{session.moderatorBio}</span>
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* --- 4. PRODUCT DEMO: Presenter's Information & About Product/Company --- */}
//               {session.type === 'PRODUCT_DEMO' && (shouldRenderPresenterInfo || shouldRenderAboutCompany || shouldRenderAboutProduct) && (
//                 <div className="space-y-6">
//                   {/* Presenter's Information */}
//                   {shouldRenderPresenterInfo && (
//                     <div className="space-y-3">
//                       <p className="text-sm font-semibold text-green-600 flex items-center gap-2"><Briefcase className="w-4 h-4 text-green-500" /> Presenter's Information</p>
//                       {session.presenterName && (
//                         <>
//                           <div className="flex items-center">
//                             <ChevronRight className="w-4 h-4 text-gray-400 mr-2" />
//                             <span className="font-semibold text-gray-900">{session.presenterName}</span>
//                           </div>
//                           {session.presenterDesignation && (
//                             <div className="flex items-center text-sm text-gray-600 ml-6">
//                               <Award className="w-4 h-4 mr-2" /> {session.presenterDesignation}
//                             </div>
//                           )}
//                           {session.presenterAffiliation && (
//                             <div className="flex items-center text-sm text-gray-600 ml-6">
//                               <MapPin className="w-4 h-4 mr-2" /> {session.presenterAffiliation}
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   )}

//                   {/* About Company */}
//                   {shouldRenderAboutCompany && (
//                     <div className={`pt-4 border-t border-gray-200 space-y-3 ${shouldRenderPresenterInfo ? '' : 'mt-0'}`}>
//                       <p className="flex items-center mb-1"><Briefcase className="w-4 h-4 text-gray-400 mr-2" /> <span className="font-semibold text-emerald-600">About the Company:</span></p>
//                       <p className="text-sm text-gray-700">{session.aboutCompany}</p>
//                     </div>
//                   )}

//                   {/* About Product */}
//                   {shouldRenderAboutProduct && (
//                     <div className={`pt-4 border-t border-gray-200 space-y-3 ${shouldRenderPresenterInfo || shouldRenderAboutCompany ? '' : 'mt-0'}`}>
//                       <p className="flex items-center mb-1"><FileText className="w-4 h-4 text-gray-400 mr-2" /> <span className="font-semibold text-emerald-600">About the Solution/Product:</span></p>
//                       <p className="text-sm text-gray-700">{session.aboutProduct}</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
        
//         {/* Full-Width Section Below Grid */}
//         <div className="mt-8 pt-4 border-t border-gray-200">
//             {/* Description (Moved to full width) */}
//             {session.description && (
//                 <div className="mb-6">
//                     <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><FileText className="w-5 h-5 text-indigo-500" /> Description</h4>
//                     <p className="text-gray-700">{session.description}</p>
//                 </div>
//             )}
            
//             {/* Registration Link (Always last) */}
//             {session.registrationLink && (
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-900 mb-2 flex items-center gap-2"><Link className="w-5 h-5 text-indigo-500" /> Registration Link</h4>
//                 <div className="bg-gray-200 p-3 rounded-md overflow-hidden whitespace-nowrap text-ellipsis">
//                   <a href={session.registrationLink} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">
//                     {session.registrationLink}
//                   </a>
//                 </div>
//               </div>
//             )}
//         </div>

//         {/* Join Session button */}
//         <div className="flex justify-center mt-8">
//           <button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-bold py-3 px-8 rounded-full shadow-md hover:from-indigo-600 hover:to-purple-600 transition-colors">
//             Join Session
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SessionDetailsModal;
