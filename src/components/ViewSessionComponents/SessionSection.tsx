// 'use client';

// import { useQuery } from '@tanstack/react-query';
// import { Loader2, Calendar, Clock, Link, User, Tag, Info, Briefcase, Phone, Users, FileText, Award, Layers, Globe, Code, Mail, Mic, ChevronRight, MapPin } from 'lucide-react';
// import { format } from 'date-fns';

// const fetchSessions = async () => {
//   const response = await fetch('http://localhost:4000/api/sessions');

//   if (!response.ok) {
//     throw new Error('Failed to fetch sessions');
//   }

//   return response.json();
// };

// // Helper function to get an icon based on session type
// const getIconForType = (type) => {
//   switch (type) {
//     case 'WEBINAR':
//       return <Layers className="w-8 h-8 text-purple-400" />;
//     case 'PANEL_DISCUSSION':
//       return <Globe className="w-8 h-8 text-blue-400" />;
//     case 'PRODUCT_DEMO':
//       return <Code className="w-8 h-8 text-green-400" />;
//     default:
//       return <Award className="w-8 h-8 text-gray-400" />;
//   }
// };

// const SessionsSection = () => {
//   const { data: sessions, isPending, isError, error } = useQuery({
//     queryKey: ['sessions'],
//     queryFn: fetchSessions,
//   });

//   if (isPending) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-slate-300">
//         <Loader2 className="h-8 w-8 animate-spin" />
//         <span className="ml-2">Loading sessions...</span>
//       </div>
//     );
//   }

//   if (isError) {
//     return (
//       <div className="flex items-center justify-center min-h-screen text-red-400">
//         <span className="text-center">Error: {error.message}</span>
//       </div>
//     );
//   }

//   return (
//     <section className="bg-slate-900 py-16">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-4xl font-bold text-center text-white mb-12">Upcoming Sessions</h2>
//         <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//           {sessions.length === 0 ? (
//             <div className="col-span-full text-center text-slate-400 text-lg">
//               No sessions available.
//             </div>
//           ) : (
//             sessions.map((session) => (
//               <div key={session.id} className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group">
//                 {/* Background gradient overlay */}
//                 <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{
//                   background: 'radial-gradient(circle at 100% 100%, #8b5cf6, transparent 25%), radial-gradient(circle at 0% 0%, #3b82f6, transparent 25%)'
//                 }}></div>

//                 {/* Content */}
//                 <div className="relative z-10">
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 rounded-full flex items-center justify-center bg-slate-700/50 mr-4 border-2 border-slate-600">
//                       {getIconForType(session.type)}
//                     </div>
//                     <div>
//                       <span className="text-xs font-semibold uppercase text-purple-400 tracking-widest">
//                         {session.type.replace(/_/g, ' ').toLowerCase()}
//                       </span>
//                       <h3 className="text-2xl font-bold text-white mt-1">{session.title}</h3>
//                     </div>
//                   </div>
                  
//                   {session.description && (
//                     <p className="text-sm text-slate-400 mb-4">{session.description}</p>
//                   )}

//                   {/* Key Details Section */}
//                   <div className="space-y-4 text-slate-300 border-t border-slate-700 pt-4">
//                     {session.dateTime && (
//                       <div className="flex items-center">
//                         <Calendar className="w-5 h-5 text-purple-400 mr-3" />
//                         <span>Date & Time: <span className="font-semibold">{format(new Date(session.dateTime), 'PPpp')}</span></span>
//                       </div>
//                     )}
//                     {session.duration && (
//                       <div className="flex items-center">
//                         <Clock className="w-5 h-5 text-purple-400 mr-3" />
//                         <span>Duration: <span className="font-semibold">{session.duration}</span></span>
//                       </div>
//                     )}
//                     {session.registrationLink && (
//                       <div className="flex items-center">
//                         <Link className="w-5 h-5 text-blue-400 mr-3" />
//                         <a href={session.registrationLink} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
//                           Register Here
//                         </a>
//                       </div>
//                     )}
                    
//                     {/* Webinar-specific fields with improved clarity */}
//                     {(session.speakerName || (session.audience && session.audience.length > 0)) && (
//                       <div className="pt-3 border-t border-slate-700">
//                         <p className="text-sm text-slate-400 flex items-center mb-2"><Mic className="w-4 h-4 mr-2" /> Webinar Details</p>
//                         {session.speakerName && (
//                           <p className="flex items-center mb-1"><ChevronRight className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">Speaker:</span> {session.speakerName}</p>
//                         )}
//                         {session.speakerEmail && (
//                           <p className="flex items-center text-sm text-slate-400"><Mail className="w-4 h-4 mr-2" /> {session.speakerEmail}</p>
//                         )}
//                         {session.audience && session.audience.length > 0 && (
//                           <div className="mt-2">
//                              <p className="flex items-center mb-1"><Users className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">Audience:</span></p>
//                              <div className="flex flex-wrap gap-2 mt-1">
//                               {session.audience.map((item, index) => (
//                                 <span key={index} className="bg-slate-700 text-slate-200 text-xs px-2 py-1 rounded-full capitalize">{item}</span>
//                               ))}
//                             </div>
//                           </div>
//                         )}
//                         {session.contactInfo && (
//                           <div className="mt-2">
//                             <p className="flex items-center mb-1"><Phone className="w-4 h-4 text-slate-500 mr-2" /><span className="font-semibold">Contact:</span></p>
//                             <p className="text-sm">{session.contactInfo}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}

//                     {/* Panel Discussion-specific fields with improved clarity */}
//                     {(session.panelistName || session.moderatorName) && (
//                       <div className="pt-3 border-t border-slate-700">
//                         <p className="text-sm text-slate-400 flex items-center mb-2"><Globe className="w-4 h-4 mr-2" /> Panel Details</p>
//                         {session.panelistName && (
//                           <p className="flex items-center mb-1"><ChevronRight className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">Panelist:</span> {session.panelistName}</p>
//                         )}
//                         {session.panelistDesignation && (
//                           <p className="flex items-center text-sm text-slate-400 ml-6"><Award className="w-4 h-4 mr-2" /> {session.panelistDesignation}</p>
//                         )}
//                         {session.panelistBio && (
//                           <p className="text-sm text-slate-400 mt-1 ml-6">{session.panelistBio}</p>
//                         )}
//                         {session.moderatorName && (
//                           <p className="flex items-center mt-2 mb-1"><ChevronRight className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">Moderator:</span> {session.moderatorName}</p>
//                         )}
//                         {session.moderatorDesignation && (
//                           <p className="flex items-center text-sm text-slate-400 ml-6"><Award className="w-4 h-4 mr-2" /> {session.moderatorDesignation}</p>
//                         )}
//                         {session.moderatorBio && (
//                           <p className="text-sm text-slate-400 mt-1 ml-6">{session.moderatorBio}</p>
//                         )}
//                       </div>
//                     )}

//                     {/* Product Demo-specific fields with improved clarity */}
//                     {session.presenterName && (
//                       <div className="pt-3 border-t border-slate-700">
//                         <p className="text-sm text-slate-400 flex items-center mb-2"><Briefcase className="w-4 h-4 mr-2" /> Product Demo Details</p>
//                         {session.presenterName && (
//                           <p className="flex items-center mb-1"><ChevronRight className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">Presenter:</span> {session.presenterName}</p>
//                         )}
//                         {session.presenterDesignation && (
//                           <p className="flex items-center text-sm text-slate-400 ml-6"><Award className="w-4 h-4 mr-2" /> {session.presenterDesignation}</p>
//                         )}
//                         {session.presenterAffiliation && (
//                           <p className="flex items-center text-sm text-slate-400 ml-6"><MapPin className="w-4 h-4 mr-2" /> {session.presenterAffiliation}</p>
//                         )}
//                         {session.aboutCompany && (
//                           <div className="mt-2">
//                             <p className="flex items-center mb-1"><Briefcase className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">About Company:</span></p>
//                             <p className="text-sm">{session.aboutCompany}</p>
//                           </div>
//                         )}
//                         {session.aboutProduct && (
//                           <div className="mt-2">
//                             <p className="flex items-center mb-1"><FileText className="w-4 h-4 text-slate-500 mr-2" /> <span className="font-semibold">About Product:</span></p>
//                             <p className="text-sm">{session.aboutProduct}</p>
//                           </div>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SessionsSection;

// SessionsSection.tsx
'use client';

import { useQuery } from '@tanstack/react-query';
// import { Loader2,  Globe, Award, Layers, Code } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import {  useState } from 'react';
import SessionCard from './SessionCard';
import SessionDetailsModal from './SessionDetailsModal';
import type { Session } from './types';
// import { motion } from "framer-motion";


const fetchSessions = async (): Promise<Session[]> => {
  const response = await fetch(`${import.meta.env.VITE_API_BASE}/sessions`);

  if (!response.ok) {
    throw new Error('Failed to fetch sessions');
  }

  return response.json();
};

const SessionsSection = () => {
  const { data: sessions, isPending, isError, error } = useQuery<Session[]>({
    queryKey: ['sessions'],
    queryFn: fetchSessions,
    refetchOnWindowFocus: true,
  });
  
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedSession, setSelectedSession] = useState<Session | null>(null);

  const openModal = (session: Session) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedSession(null);
  };
  
  // You can keep this helper function if you want to use it for the cards
  // const getIconForType = (type: string) => {
  //   switch (type) {
  //     case 'WEBINAR':
  //       return <Layers className="w-8 h-8 text-purple-400" />;
  //     case 'PANEL_DISCUSSION':
  //       return <Globe className="w-8 h-8 text-blue-400" />;
  //     case 'PRODUCT_DEMO':
  //       return <Code className="w-8 h-8 text-green-400" />;
  //     default:
  //       return <Award className="w-8 h-8 text-gray-400" />;
  //   }
  // };

  if (isPending) {
    return (
      <div className="flex items-center justify-center min-h-screen text-slate-300">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading sessions...</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-400">
        <span className="text-center">Error: {error.message}</span>
      </div>
    );
  }

  return (
    <section className="bg-slate-900 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-white mb-12">Upcoming Sessions</h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {sessions && sessions.length > 0 ? (
            sessions.map((session) => (
              <SessionCard key={session.id} session={session} onJoinClick={openModal} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 text-lg">
              No sessions available.
            </div>
          )}
        </div>
      </div>
      {selectedSession && (
        <SessionDetailsModal
          session={selectedSession}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </section>
//     <section className="relative py-20 bg-gradient-to-b from-white via-indigo-50 to-purple-50 overflow-hidden">

//   {/* Soft glowing blobs for depth */}
//   <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-300 opacity-30 blur-3xl rounded-full"></div>
//   <div className="absolute top-40 right-[-10rem] w-96 h-96 bg-blue-300 opacity-20 blur-3xl rounded-full"></div>
//   <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[32rem] h-[32rem] bg-pink-200 opacity-20 blur-[120px] rounded-full"></div>

//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

//     {/* Heading */}
//     <h2 className="text-4xl font-bold text-center bg-clip-text text-transparent 
//       bg-gradient-to-r from-indigo-600 to-purple-600 mb-4">
//       Upcoming Sessions
//     </h2>
//     <p className="text-center text-gray-500 mb-12">
//       Join expert-led discussions, workshops and live webinars.
//     </p>

//     {/* Cards Grid — NO parent white box now */}
//     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
//       {sessions?.map((session) => (
//         <motion.div
//   key={session.id}
//   initial={{ opacity: 0, y: 20 }}
//   whileInView={{ opacity: 1, y: 0 }}
//   transition={{ duration: 0.4 }}
//   viewport={{ once: true }}
// >
//   <SessionCard session={session} onJoinClick={openModal} />
// </motion.div>

//       ))}
//     </div>
//   </div>

//   {selectedSession && (
//     <SessionDetailsModal
//       session={selectedSession}
//       isOpen={isModalOpen}
//       onClose={closeModal}
//     />
//   )}
// </section>

  );
};

export default SessionsSection;