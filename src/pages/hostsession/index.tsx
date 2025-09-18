// // // components/HostSessionPage.tsx (or app/host-session/page.tsx)
// // 'use client';

// // import React, { useState } from 'react';
// // import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
// // import WebinarForm from '@/components/hostsession-forms/WebinarForm';
// // import PanelForm from '@/components/hostsession-forms/PanelForm';
// // import DemoForm from '@/components/hostsession-forms/DemoForm';
// // import { toast } from 'sonner';
// // import { Loader2 } from 'lucide-react';
// // import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
// // import { useAuth } from '@/contexts/AuthContext';
// // // Initial state for the combined form data - This looks correct and comprehensive.
// // const initialFormData: EventFormData = {
// //   title: '',
// //   datetime: '',
// //   duration: '',
// //   registrationLink: '',

// //   description: '',
// //   audience: [],
// //   speakerName: '',
// //   speakerEmail: '',
// //   contact: '',

// //   topic: '',
// //   panelistName: '',
// //   panelistDesignation: '',
// //   panelistBio: '',
// //   moderatorName: '',
// //   moderatorDesignation: '',
// //   moderatorBio: '',

// //   presenterName: '',
// //   presenterDesignation: '',
// //   presenterAffiliation: '',
// //   aboutCompany: '',
// //   aboutProduct: '',
// // };

// // const HostSessionPage = () => {
// //   const [selectedType, setSelectedType] = useState<EventType>('webinar');
// //   const [formData, setFormData] = useState<EventFormData>(initialFormData);
// //   const [isLoading, setIsLoading] = useState(false);
// // const user  = useAuth();



// //   const handleTypeChange = (type: EventType) => {
// //     setSelectedType(type);
// //     setFormData(initialFormData);
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);

// //     let sessionDataToSend: any = {};
// //     let backendSessionType: string = '';

// //     // Extract date and time from the combined datetime string
// //     // This correctly extracts 'YYYY-MM-DD' and 'HH:MM'
// //     const [date, time] = formData.datetime.split('T');

// //     try {
// //       switch (selectedType) {
// //         case 'webinar':
// //           backendSessionType = 'webinar_sessions';

// //           // Frontend validation for webinar required fields
// //           if (!formData.title || !date || !time || !formData.duration || formData.audience.length === 0 || !formData.speakerName) {
// //               throw new Error('Please fill all required fields for webinar.');
// //           }

// //           sessionDataToSend = {
// //             title: formData.title,
// //             description: formData.description,
// //             date: date,
// //             time: time,
// //             duration: formData.duration,
// //             audience: formData.audience, // Backend expects TEXT[] (array of strings), directly compatible
// //             speakers: [{ name: formData.speakerName, email: formData.speakerEmail || '' }], // Backend expects JSONB (array of objects). This conversion is correct. `email` is optional so providing `''` is safe.
// //             contact: formData.contact,
// //             link: formData.registrationLink,
// //           };
// //           break;

// //         case 'panel':
// //           backendSessionType = 'panel_sessions';

// //           // Frontend validation for panel required fields
// //           if (!formData.topic || !date || !time || !formData.duration || !formData.panelistName || !formData.moderatorName) {
// //               throw new Error('Please fill all required fields for panel discussion.');
// //           }

// //           sessionDataToSend = {
// //             title: formData.topic, // Frontend 'topic' maps to backend 'title' - Correct.
// //             description: formData.panelistBio, // Frontend 'panelistBio' maps to backend 'description' - Correct.
// //             date: date,
// //             time: time,
// //             duration: formData.duration,
// //             panelists: [
// //               {
// //                 name: formData.panelistName,
// //                 designation: formData.panelistDesignation,
// //                 bio: formData.panelistBio,
// //               },
// //             ], // Backend expects JSONB (array of objects). This conversion is correct.
// //             moderator: {
// //               name: formData.moderatorName,
// //               designation: formData.moderatorDesignation,
// //               bio: formData.moderatorBio,
// //             }, // Backend expects JSONB (object). This conversion is correct.
// //             link: formData.registrationLink,
// //           };
// //           break;

// //         case 'demo':
// //           backendSessionType = 'demo_sessions';

// //           // Frontend validation for demo required fields
// //           if (!formData.title || !date || !time || !formData.duration || !formData.presenterName) {
// //               throw new Error('Please fill all required fields for product demo.');
// //           }

// //           sessionDataToSend = {
// //             title: formData.title,
// //             // Backend's 'description' for demo is optional.
// //             // You had a choice for description. I've chosen `aboutProduct` first, then `aboutCompany`.
// //             description: formData.aboutProduct || formData.aboutCompany,
// //             date: date,
// //             time: time,
// //             duration: formData.duration,
// //             presenter: {
// //               name: formData.presenterName,
// //               designation: formData.presenterDesignation,
// //               affiliation: formData.presenterAffiliation,
// //             }, // Backend expects JSONB (object). This conversion is correct.
// //             aboutCompany: formData.aboutCompany, // Maps to backend 'about_company' - Correct.
// //             aboutProduct: formData.aboutProduct, // Maps to backend 'about_product' - Correct.
// //             link: formData.registrationLink,
// //           };
// //           break;

// //         default:
// //           throw new Error('Invalid event type selected.');
// //       }

// //       // --- API Call ---
// //       const token = localStorage.getItem('token');
      
// //       const response = await fetch('http://localhost:4000/api/host-sessions', {
// //         method: 'POST',
// //         headers: {
// //           'Content-Type': 'application/json',
// //           // **IMPORTANT:** Add authorization header if your backend requires it (e.g., JWT)
// //           'Authorization': `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({
// //           sessionType: backendSessionType, // This matches the backend's expected 'sessionType'
// //           sessionData: sessionDataToSend,   // This structured data matches the backend's 'sessionData'
// //           userId: user?.user?.id,    // **CRITICAL:** Replace with actual user ID from authentication
// //         }),
// //       });

// //       const result = await response.json();

// //       if (response.ok) {
       
// //         toast.success(result.message || `${selectedType} session created successfully!`);
// //         setFormData(initialFormData); // Clear the form on success
// //       } else {
// //         // Backend's `res.status(400).json({ success: false, message: error.message || 'Failed to create session' });`
// //         // means `result.message` will contain the error from backend if validation fails.
// //         toast.error(result.message || 'Failed to create session. Please check your input.');
// //         console.error('API Error:', result);
// //       }
// //     } catch (error: any) {
// //       console.error('Form submission error:', error);
// //       toast.error(error.message || 'An unexpected error occurred. Please try again.');
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-900 text-white p-8 sm:p-12 md:p-20">
// //       <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700/50">
// //         <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
// //           Host a New Session
// //         </h1>
// //         <EventTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
// //         <form onSubmit={handleSubmit} className="space-y-8">
// //           {selectedType === 'webinar' && (
// //             <WebinarForm formData={formData} setFormData={setFormData} />
// //           )}
// //           {selectedType === 'panel' && (
// //             <PanelForm formData={formData} setFormData={setFormData} />
// //           )}
// //           {selectedType === 'demo' && (
// //             <DemoForm formData={formData} setFormData={setFormData} />
// //           )}
// //           <div className="pt-8 flex justify-center">
// //             <button
// //               type="submit"
// //               className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2"
// //               disabled={isLoading}
// //             >
// //               {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
// //               {isLoading ? 'Creating Session...' : 'Create Session'}
// //             </button>
// //           </div>
// //         </form>
// //       </div>
// //     </div>
// //   );
// // };

// // // export default HostSessionPage;

// // // // components/HostSessionPage.tsx (or app/host-session/page.tsx)
// // // 'use client';

// // // import React, { useState } from 'react';
// // // import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
// // // import WebinarForm from '@/components/hostsession-forms/WebinarForm';
// // // import PanelForm from '@/components/hostsession-forms/PanelForm';
// // // import DemoForm from '@/components/hostsession-forms/DemoForm';
// // // import { toast } from 'sonner';
// // // import { Loader2 } from 'lucide-react';
// // // import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
// // // import { useAuth } from '@/contexts/AuthContext';

// // // // Initial state for the combined form data
// // // const initialFormData: EventFormData = {
// // //   title: '',
// // //   datetime: '',
// // //   duration: '',
// // //   registrationLink: '',

// // //   description: '',
// // //   audience: [],
// // //   speakerName: '',
// // //   speakerEmail: '',
// // //   contact: '',

// // //   topic: '',
// // //   panelistName: '',
// // //   panelistDesignation: '',
// // //   panelistBio: '',
// // //   moderatorName: '',
// // //   moderatorDesignation: '',
// // //   moderatorBio: '',

// // //   presenterName: '',
// // //   presenterDesignation: '',
// // //   presenterAffiliation: '',
// // //   aboutCompany: '',
// // //   aboutProduct: '',
// // // };

// // // const HostSessionPage = () => {
// // //   const [selectedType, setSelectedType] = useState<EventType>('webinar');
// // //   const [formData, setFormData] = useState<EventFormData>(initialFormData);
// // //   const [isLoading, setIsLoading] = useState(false);
// // //   const user = useAuth();

// // //   const handleTypeChange = (type: EventType) => {
// // //     setSelectedType(type);
// // //     setFormData(initialFormData);
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();
// // //     setIsLoading(true);

// // //     try {
// // //       // Basic validation
// // //       if (!formData.title && !formData.topic) {
// // //         throw new Error('Please provide a title or topic for the session.');
// // //       }
// // //       if (!formData.datetime) {
// // //         throw new Error('Please select date and time.');
// // //       }
// // //       if (!formData.duration) {
// // //         throw new Error('Please specify duration.');
// // //       }

// // //       // Extract date and time from datetime-local input
// // //       const [date, time] = formData.datetime.split('T');

// // //       // Map frontend types to backend sessionType
// // //       const sessionTypeMapping = {
// // //         'webinar': 'webinar_sessions',
// // //         'panel': 'panel_sessions', 
// // //         'demo': 'demo_sessions'
// // //       };

// // //       const backendSessionType = sessionTypeMapping[selectedType];

// // //       // Prepare session data based on type
// // //       let sessionData: any = {
// // //         title: formData.title || formData.topic,
// // //         date: date, // YYYY-MM-DD format
// // //         time: time, // HH:MM format
// // //         duration: formData.duration,
// // //         link: formData.registrationLink || '',
// // //       };

// // //       // Add type-specific data matching your schema structure
// // //       switch (selectedType) {
// // //         case 'webinar':
// // //           if (!formData.speakerName) {
// // //             throw new Error('Speaker name is required for webinar.');
// // //           }
// // //           if (formData.audience.length === 0) {
// // //             throw new Error('Please select at least one audience type.');
// // //           }
          
// // //           sessionData = {
// // //             ...sessionData,
// // //             description: formData.description,
// // //             audience: formData.audience, // Array: ['Students', 'Professionals']
// // //             speakers: [{ 
// // //               name: formData.speakerName, 
// // //               email: formData.speakerEmail || '' 
// // //             }],
// // //             contact: formData.contact,
// // //           };
// // //           break;

// // //         case 'panel':
// // //           if (!formData.panelistName || !formData.moderatorName) {
// // //             throw new Error('Both panelist and moderator names are required.');
// // //           }
          
// // //           sessionData = {
// // //             ...sessionData,
// // //             description: formData.panelistBio, // Using panelistBio as description
// // //             panelists: [{
// // //               name: formData.panelistName,
// // //               designation: formData.panelistDesignation,
// // //               bio: formData.panelistBio,
// // //             }],
// // //             moderator: {
// // //               name: formData.moderatorName,
// // //               designation: formData.moderatorDesignation,
// // //               bio: formData.moderatorBio,
// // //             },
// // //           };
// // //           break;

// // //         case 'demo':
// // //           if (!formData.presenterName) {
// // //             throw new Error('Presenter name is required for demo.');
// // //           }
          
// // //           sessionData = {
// // //             ...sessionData,
// // //             description: formData.aboutProduct || formData.aboutCompany,
// // //             presenter: {
// // //               name: formData.presenterName,
// // //               designation: formData.presenterDesignation,
// // //               affiliation: formData.presenterAffiliation,
// // //             },
// // //             aboutCompany: formData.aboutCompany,
// // //             aboutProduct: formData.aboutProduct,
// // //           };
// // //           break;

// // //         default:
// // //           throw new Error('Invalid event type selected.');
// // //       }

// // //       // API Call - Using your endpoint structure
// // //       const token = localStorage.getItem('token');
      
// // //       const response = await fetch('http://localhost:4000/api/host-sessions', {
// // //         method: 'POST',
// // //         headers: {
// // //           'Content-Type': 'application/json',
// // //           'Authorization': `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify({
// // //           sessionType: backendSessionType, // webinar_sessions, panel_sessions, demo_sessions
// // //           sessionData: sessionData,
// // //           userId: user?.user?.id
// // //         }),
// // //       });

// // //       const result = await response.json();

// // //       if (response.ok) {
// // //         toast.success(result.message || `${selectedType.charAt(0).toUpperCase() + selectedType.slice(1)} session created successfully!`);
// // //         setFormData(initialFormData); // Clear the form on success
// // //       } else {
// // //         toast.error(result.message || 'Failed to create session. Please check your input.');
// // //         console.error('API Error:', result);
// // //       }
// // //     } catch (error: any) {
// // //       console.error('Form submission error:', error);
// // //       toast.error(error.message || 'An unexpected error occurred. Please try again.');
// // //     } finally {
// // //       setIsLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-900 text-white p-8 sm:p-12 md:p-20">
// // //       <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700/50">
// // //         <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
// // //           Host a New Session
// // //         </h1>
// // //         <EventTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
// // //         <form onSubmit={handleSubmit} className="space-y-8">
// // //           {selectedType === 'webinar' && (
// // //             <WebinarForm formData={formData} setFormData={setFormData} />
// // //           )}
// // //           {selectedType === 'panel' && (
// // //             <PanelForm formData={formData} setFormData={setFormData} />
// // //           )}
// // //           {selectedType === 'demo' && (
// // //             <DemoForm formData={formData} setFormData={setFormData} />
// // //           )}
// // //           <div className="pt-8 flex justify-center">
// // //             <button
// // //               type="submit"
// // //               className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2"
// // //               disabled={isLoading}
// // //             >
// // //               {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
// // //               {isLoading ? 'Creating Session...' : 'Create Session'}
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default HostSessionPage;

// 'use client';

// import React, { useState } from 'react';
// import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
// import WebinarForm from '@/components/hostsession-forms/WebinarForm';
// import PanelForm from '@/components/hostsession-forms/PanelForm';
// import DemoForm from '@/components/hostsession-forms/DemoForm';
// import { toast } from 'sonner';
// import { Loader2 } from 'lucide-react';
// import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
// import { useAuth } from '@/contexts/AuthContext';

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
          
//           const audienceStudents = formData.audience.includes('students');
//           const audienceProfessionals = formData.audience.includes('professionals');

//           sessionDataToSend = {
//             userId: user.id,
//             type: backendSessionType,
//             title: formData.title,
//             dateTime: formData.datetime,
//             duration: formData.duration,
//             registrationLink: formData.registrationLink,
//             description: formData.description,
//             audienceStudents,
//             audienceProfessionals,
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
      
//       const response = await fetch('http://localhost:4000/api/sessions', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         body: JSON.stringify(sessionDataToSend),
//       });

//       const result = await response.json();

//       if (response.ok) {
//         toast.success(result.message || `${selectedType} session created successfully!`);
//         setFormData(initialFormData);
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
//   );
// };

// export default HostSessionPage;

'use client';

import React, { useState } from 'react';
import EventTypeSelector from '@/components/hostsession-forms/EventTypeSelector';
import WebinarForm from '@/components/hostsession-forms/WebinarForm';
import PanelForm from '@/components/hostsession-forms/PanelForm';
import DemoForm from '@/components/hostsession-forms/DemoForm';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import type { EventType, EventFormData } from '@/components/hostsession-forms/types';
import { useAuth } from '@/contexts/AuthContext';

// Initial state for the combined form data
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
  const { user } = useAuth(); // Destructure user directly

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

      // Determine the type and data structure based on the selected event type
      switch (selectedType) {
        case 'webinar':
          backendSessionType = 'WEBINAR';
          
          if (!formData.title || !formData.datetime || !formData.duration || formData.audience.length === 0 || !formData.speakerName) {
            throw new Error('Please fill all required fields for webinar.');
          }
          
          // FIX: Send the audience field as a string array, matching the Prisma schema.
          sessionDataToSend = {
            userId: user.id,
            type: backendSessionType,
            title: formData.title,
            dateTime: formData.datetime,
            duration: formData.duration,
            registrationLink: formData.registrationLink,
            description: formData.description,
            audience: formData.audience, // Correctly sending the array of strings
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

      // --- API Call ---
      const token = localStorage.getItem('token');
      
      const response = await fetch('http://localhost:4000/api/sessions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(sessionDataToSend),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(result.message || `${selectedType} session created successfully!`);
        setFormData(initialFormData);
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
    <div className="min-h-screen bg-gray-900 text-white p-8 sm:p-12 md:p-20">
      <div className="max-w-4xl mx-auto bg-gray-800/60 backdrop-blur-sm rounded-2xl shadow-2xl p-6 sm:p-8 md:p-10 border border-gray-700/50">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
          Host a New Session
        </h1>
        <EventTypeSelector selectedType={selectedType} onTypeChange={handleTypeChange} />
        <form onSubmit={handleSubmit} className="space-y-8">
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
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/40 flex items-center justify-center gap-2"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
              {isLoading ? 'Creating Session...' : 'Create Session'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HostSessionPage;