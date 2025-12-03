
// 'use client';

// import React, { useState } from 'react';
// import { useNavigate } from "react-router-dom";
// import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
// import WebinarForm from '@/components/hostsession-forms/WebinarForm';
// import PanelForm from '@/components/hostsession-forms/PanelForm';
// import DemoForm from '@/components/hostsession-forms/DemoForm';
// import toast from "react-hot-toast";
// import { useQueryClient } from "@tanstack/react-query";
// import { Loader2 } from 'lucide-react';
// import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
// import { useAuth } from '@/contexts/AuthContext';
// import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin';
// // import { toast } from '@/components/ui/use-toast';

// // Initial state for the combined form data
// const initialFormData: EventFormData = {
//   title: '',
//   datetime: '',
//   duration: '',
//   registrationLink: '',
//   description: '',
//   audience: [],
//   speakerName: '',
//   speakerEmail: '',
//   contact: '',
//   topic: '',
//   panelistName: '',
//   panelistDesignation: '',
//   panelistBio: '',
//   moderatorName: '',
//   moderatorDesignation: '',
//   moderatorBio: '',
//   presenterName: '',
//   presenterDesignation: '',
//   presenterAffiliation: '',
//   aboutCompany: '',
//   aboutProduct: '',
// };

// const HostSessionPage = () => {
//   const [selectedType, setSelectedType] = useState<EventType>('webinar');
//   const [formData, setFormData] = useState<EventFormData>(initialFormData);
//   const [isLoading, setIsLoading] = useState(false);
//   const { user } = useAuth(); // Destructure user directly
//   const navigate = useNavigate();
//   const queryClient = useQueryClient();
//   const handleTypeChange = (type: EventType) => {
//     setSelectedType(type);
//     setFormData(initialFormData);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);

//     let sessionDataToSend: any = {};
//     let backendSessionType: string = '';

//     try {
//       if (!user) {
//         throw new Error('User not authenticated. Please log in.');
//       }

//       // Determine the type and data structure based on the selected event type
//       switch (selectedType) {
//         case 'webinar':
//           backendSessionType = 'WEBINAR';
          
//           if (!formData.title || !formData.datetime || !formData.duration || formData.audience.length === 0 || !formData.speakerName) {
//             throw new Error('Please fill all required fields for webinar.');
//           }
          
//           // FIX: Send the audience field as a string array, matching the Prisma schema.
//           sessionDataToSend = {
//             userId: user.id,
//             type: backendSessionType,
//             title: formData.title,
//             dateTime: formData.datetime,
//             duration: formData.duration,
//             registrationLink: formData.registrationLink,
//             description: formData.description,
//             audience: formData.audience, // Correctly sending the array of strings
//             speakerName: formData.speakerName,
//             speakerEmail: formData.speakerEmail,
//             contactInfo: formData.contact,
//           };
//           break;

//         case 'panel':
//           backendSessionType = 'PANEL_DISCUSSION';
          
//           if (!formData.topic || !formData.datetime || !formData.duration || !formData.panelistName || !formData.moderatorName) {
//             throw new Error('Please fill all required fields for panel discussion.');
//           }

//           sessionDataToSend = {
//             userId: user.id,
//             type: backendSessionType,
//             title: formData.topic,
//             dateTime: formData.datetime,
//             duration: formData.duration,
//             registrationLink: formData.registrationLink,
//             panelistName: formData.panelistName,
//             panelistDesignation: formData.panelistDesignation,
//             panelistBio: formData.panelistBio,
//             moderatorName: formData.moderatorName,
//             moderatorDesignation: formData.moderatorDesignation,
//             moderatorBio: formData.moderatorBio,
//           };
//           break;

//         case 'demo':
//           backendSessionType = 'PRODUCT_DEMO';
          
//           if (!formData.title || !formData.datetime || !formData.duration || !formData.presenterName) {
//             throw new Error('Please fill all required fields for product demo.');
//           }

//           sessionDataToSend = {
//             userId: user.id,
//             type: backendSessionType,
//             title: formData.title,
//             dateTime: formData.datetime,
//             duration: formData.duration,
//             registrationLink: formData.registrationLink,
//             presenterName: formData.presenterName,
//             presenterDesignation: formData.presenterDesignation,
//             presenterAffiliation: formData.presenterAffiliation,
//             aboutCompany: formData.aboutCompany,
//             aboutProduct: formData.aboutProduct,
//           };
//           break;

//         default:
//           throw new Error('Invalid event type selected.');
//       }

//       // --- API Call ---
//       const token = localStorage.getItem('token');

//       const response = await fetch(`${import.meta.env.VITE_API_BASE}/sessions`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(sessionDataToSend),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success(result.message || "Session created successfully! 🎉");
//          // ✅ Invalidate queries so that ViewSession refetches fresh data
//         queryClient.invalidateQueries({ queryKey: ["sessions"] });
//         setFormData(initialFormData);
//         navigate("/view-session"); 
//       } else {
//         toast.error(result.error || 'Failed to create session. Please check your input.');
//         console.error('API Error:', result);
//       }
//     } catch (error: any) {
//       console.error('Form submission error:', error);
//       toast.error(error.message || 'An unexpected error occurred. Please try again.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
    
//     <>
//     <Navbarpostlogin/>
//     <div className="min-h-screen bg-gray-900 text-white p-8 sm:p-12 md:p-20">
      
//       <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700/50">
//         <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
//           Host a New Session
//         </h1>
//         <EventTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
//         <form onSubmit={handleSubmit} className="space-y-8">
//           {selectedType === 'webinar' && (
//             <WebinarForm formData={formData} setFormData={setFormData} />
//           )}
//           {selectedType === 'panel' && (
//             <PanelForm formData={formData} setFormData={setFormData} />
//           )}
//           {selectedType === 'demo' && (
//             <DemoForm formData={formData} setFormData={setFormData} />
//           )}
//           <div className="pt-8 flex justify-center">
//             <button
//               type="submit"
//               className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2"
//               disabled={isLoading}
//             >
//               {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
//               {isLoading ? 'Creating Session...' : 'Create Session'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//     </>
//   );
// };

// export default HostSessionPage;



// light theme
'use client';

import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
import WebinarForm from '@/components/hostsession-forms/WebinarForm';
import PanelForm from '@/components/hostsession-forms/PanelForm';
import DemoForm from '@/components/hostsession-forms/DemoForm';
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2 } from 'lucide-react';
import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
import { useAuth } from '@/contexts/AuthContext';
import Navbarpostlogin from '@/components/postlogincomponents/Navbarpostlogin';
import { useAuthStore } from '@/store/authStore';

const initialFormData: EventFormData = {
  title: '',
  datetime: '',
  duration: '',
  registrationLink: '',
  description: '',
  audience: [],
  speakerName: '',
  speakerEmail: '',
  contact: '',
  topic: '',
  panelistName: '',
  panelistDesignation: '',
  panelistBio: '',
  moderatorName: '',
  moderatorDesignation: '',
  moderatorBio: '',
  presenterName: '',
  presenterDesignation: '',
  presenterAffiliation: '',
  aboutCompany: '',
  aboutProduct: '',
};

const HostSessionPage = () => {
  const [selectedType, setSelectedType] = useState<EventType>('webinar');
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleTypeChange = (type: EventType) => {
    setSelectedType(type);
    setFormData(initialFormData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    let sessionDataToSend: any = {};
    let backendSessionType: string = '';

    try {
      if (!user) {
        throw new Error('User not authenticated. Please log in.');
      }

      switch (selectedType) {
        case 'webinar':
          backendSessionType = 'WEBINAR';
          if (!formData.title || !formData.datetime || !formData.duration || formData.audience.length === 0 || !formData.speakerName) {
            throw new Error('Please fill all required fields for webinar.');
          }
          sessionDataToSend = {
            userId: user.id,
            type: backendSessionType,
            title: formData.title,
            dateTime: formData.datetime,
            duration: formData.duration,
            registrationLink: formData.registrationLink,
            description: formData.description,
            audience: formData.audience,
            speakerName: formData.speakerName,
            speakerEmail: formData.speakerEmail,
            contactInfo: formData.contact,
          };
          break;

        case 'panel':
          backendSessionType = 'PANEL_DISCUSSION';
          if (!formData.topic || !formData.datetime || !formData.duration || !formData.panelistName || !formData.moderatorName) {
            throw new Error('Please fill all required fields for panel discussion.');
          }
          sessionDataToSend = {
            userId: user.id,
            type: backendSessionType,
            title: formData.topic,
            dateTime: formData.datetime,
            duration: formData.duration,
            registrationLink: formData.registrationLink,
            panelistName: formData.panelistName,
            panelistDesignation: formData.panelistDesignation,
            panelistBio: formData.panelistBio,
            moderatorName: formData.moderatorName,
            moderatorDesignation: formData.moderatorDesignation,
            moderatorBio: formData.moderatorBio,
          };
          break;

        case 'demo':
          backendSessionType = 'PRODUCT_DEMO';
          if (!formData.title || !formData.datetime || !formData.duration || !formData.presenterName) {
            throw new Error('Please fill all required fields for product demo.');
          }
          sessionDataToSend = {
            userId: user.id,
            type: backendSessionType,
            title: formData.title,
            dateTime: formData.datetime,
            duration: formData.duration,
            registrationLink: formData.registrationLink,
            presenterName: formData.presenterName,
            presenterDesignation: formData.presenterDesignation,
            presenterAffiliation: formData.presenterAffiliation,
            aboutCompany: formData.aboutCompany,
            aboutProduct: formData.aboutProduct,
          };
          break;

        default:
          throw new Error('Invalid event type selected.');
      }

      const token = useAuthStore.getState().token;
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sessionDataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || "Session created successfully! 🎉");
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
        setFormData(initialFormData);
        navigate("/view-session"); 
      } else {
        toast.error(result.error || 'Failed to create session. Please check your input.');
        console.error('API Error:', result);
      }
    } catch (error: any) {
      console.error('Form submission error:', error);
      toast.error(error.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      
      {/* LIGHT THEME: bg-slate-50 instead of gray-900 */}
      <div className="min-h-screen bg-slate-50 pb-8 sm:pb-12 md:pb-20 font-inter">
        <Navbarpostlogin/>
        
        {/* LIGHT THEME: White card, slate border, soft shadow */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 sm:p-8 md:p-10 border border-slate-200 mt-15">
          
          <h1 className="text-center text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Host a{" "}
            <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-transparent bg-clip-text">
              New Session
            </span>
          </h1>
          
          <EventTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
          
          <form onSubmit={handleSubmit} className="space-y-8 mt-8">
            {selectedType === 'webinar' && (
              <WebinarForm formData={formData} setFormData={setFormData} />
            )}
            {selectedType === 'panel' && (
              <PanelForm formData={formData} setFormData={setFormData} />
            )}
            {selectedType === 'demo' && (
              <DemoForm formData={formData} setFormData={setFormData} />
            )}
            
            <div className="pt-8 flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
                {isLoading ? 'Creating Session...' : 'Create Session'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default HostSessionPage;