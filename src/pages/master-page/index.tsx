// import React, { useState } from 'react';
// import { Briefcase, GraduationCap, Lightbulb, TrendingUp, Users, Zap, Sparkles, ArrowRight,Target, Award, Shield } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import logo from "../../../public/logoimg.png";
// import Testimonials from "../../components/Testimonials";
// // Define the structure for a Role object, including new visual styling properties
// interface Role {
//   id: string;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   path: string;
//   formUrl : string,
//   color: string; // Gradient class for icon background
//   bgColor: string; // Background color for the card
//   borderColor: string; // Border color for the card
// }

// // Data for the 6 roles with enhanced color themes inspired by the user's code
// const ROLES: Role[] = [
//   {
//     id: 'students',
//     title: 'Students',
//     description: 'Learn, grow, and discover project-based internships and mentorship opportunities.',
//     icon: GraduationCap,
//     path: '/students/prelogin',
//     formUrl : '',
//     color: "from-blue-400 to-blue-600",
//     bgColor: "bg-blue-50",
//     borderColor: "border-blue-200",
//   },
//   {
//     id: 'startups',
//     title: 'Startups',
//     description: 'Scale your vision, find talent, validate ideas, and secure early funding rounds.',
//     icon: Zap,
//     path: '/startup/prelogin',
//     formUrl : '',
//     color: "from-purple-400 to-purple-600",
//     bgColor: "bg-purple-50",
//     borderColor: "border-purple-200",
//   },
//   {
//     id: 'investors',
//     title: 'Investors/Accelerators',
//     description: 'Find high-potential ventures, track emerging trends, and fuel the next wave of innovation.',
//     icon: TrendingUp,
//     path: '/investors/prelogin',
//     formUrl : 'https://forms.gle/kbjkXCnmePpzRdPj6' ,
//     color: "from-green-400 to-green-600",
//     bgColor: "bg-green-50",
//     borderColor: "border-green-200",
//   },
//   {
//     id: 'mentors',
//     title: 'Mentors',
//     description: 'Share expertise, guide emerging leaders, and earn recognition for valuable contributions.',
//     icon: Award,
//     path: '/mentors/prelogin',
//     formUrl : 'https://forms.gle/6hirfhKhLQNJGgLi6',
//     color: "from-orange-400 to-orange-600",
//     bgColor: "bg-orange-50",
//     borderColor: "border-orange-200",
//   },
//   {
//     id: 'corporates',
//     title: 'Corporates',
//     description: 'Sponsor innovation challenges, find bespoke talent, and drive internal growth.',
//     icon: Briefcase,
//     path: '/corporates/prelogin',
//     formUrl : 'https://forms.gle/G4btuB5ddUccKjLr5',
//     color: "from-indigo-400 to-indigo-600",
//     bgColor: "bg-indigo-50",
//     borderColor: "border-indigo-200",
//   },
//   {
//     id: 'professionals',
//     title: 'Professionals',
//     description: 'Expand your network, offer consulting, and explore cutting-edge project opportunities.',
//     icon: Target,
//     path: '/professionals/prelogin',
//     formUrl : 'https://forms.gle/JdUmFf4qKCEyvgpo6',
//     color: "from-pink-400 to-pink-600",
//     bgColor: "bg-pink-50",
//     borderColor: "border-pink-200",
//   },
// ];

// // Data for the Features section
// // const FEATURES = [
// //   {
// //     icon: Globe,
// //     title: "Unified Ecosystem",
// //     description: "Connect all stakeholders in the innovation ecosystem under one platform, breaking down traditional barriers between students, startups, investors, and industry leaders."
// //   },
// //   {
// //     icon: Zap,
// //     title: "Smart Matching Engine",
// //     description: "Our intelligent algorithms match opportunities with the right people, ensuring meaningful connections that drive real results and mutual growth."
// //   },
// //   {
// //     icon: Shield,
// //     title: "Verified Community",
// //     description: "Every member is carefully vetted and verified to ensure authenticity and quality, creating a trusted, professional environment for collaboration."
// //   },
// //   {
// //     icon: Sparkles,
// //     title: "Curated Discovery",
// //     description: "Access curated opportunities tailored to your profile - from securing funding and internships to mentorship programs and strategic partnerships."
// //   }
// // ];

// // Data for the Benefits section (Refactored into cards)
// const BENEFIT_CARDS = [
//   { 
//     icon: Sparkles, 
//     title: "Exclusive Access", 
//     description: "Access to exclusive opportunities across diverse industries and sectors.", 
//     color: "from-blue-600 to-blue-400" 
//   },
//   { 
//     icon: Users, 
//     title: "Direct Networking", 
//     description: "Direct connections with decision-makers, mentors, and founders to accelerate your trajectory.", 
//     color: "from-purple-600 to-purple-400" 
//   },
//   { 
//     icon: Lightbulb, 
//     title: "Personalized Paths", 
//     description: "Our recommendation engine ensures optimal path discovery tailored precisely to your profile and goals.", 
//     color: "from-green-600 to-green-400" 
//   },
//   { 
//     icon: Briefcase, 
//     title: "Real-time Collaboration", 
//     description: "Access real-time tools and integrated workspaces for seamless project success and team coordination.", 
//     color: "from-orange-600 to-orange-400" 
//   },
//   { 
//     icon: TrendingUp, 
//     title: "Market Insights", 
//     description: "Get direct insights into market trends and trending opportunities before they become mainstream.", 
//     color: "from-red-600 to-red-400" 
//   },
//   { 
//     icon: Shield, 
//     title: "Secure Channels", 
//     description: "Utilize secure and private communication channels for sensitive and high-value discussions.", 
//     color: "from-pink-600 to-pink-400" 
//   },
// ];


// // Component for a single role card
// const RoleCard: React.FC<{ role: Role; onClick: () => void; isHovered: boolean; onHover: (hover: boolean) => void }> = ({ role, onClick, isHovered, onHover }) => {
//   const Icon = role.icon;
//   return (
//     <div
//       onClick={onClick}
//       onMouseEnter={() => onHover(true)}
//       onMouseLeave={() => onHover(false)}
//       className={`relative group cursor-pointer transition-all duration-300 ${isHovered ? 'scale-[1.03] shadow-2xl' : 'scale-100 shadow-lg'} w-full h-full`}
//       role="button"
//       tabIndex={0}
//     >
//       <div className={`${role.bgColor} ${role.borderColor} border-2 rounded-xl p-6 transition-all duration-300 h-full`}>
//         <div className="flex items-start space-x-4 mb-4">
//           <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
//             <Icon className="w-6 h-6 text-white" />
//           </div>
//           {/* FIX: Reduced font size to text-xl and added flex-1 to ensure wrapping/containment */}
//           <h3 className="text-xl font-bold text-gray-900 flex-1 min-w-0 leading-snug MT-2">{role.title}</h3>
//         </div>

//         <p className="text-gray-600 text-sm mb-4">{role.description}</p>

//         <button className="mt-2 flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
//           Explore Portal
//           <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
//         </button>
//       </div>
//     </div>
//   );
// };

// // Main Application Component
// const App: React.FC = () => {
//   const [hoveredRoleIndex, setHoveredRoleIndex] = useState<number | null>(null);
//   const navigate = useNavigate();

//   const handleRoleClick = (role: Role) => {
//     if(role.title === 'Students' || role.title === 'Startups'){
//       navigate(role.path);
//     }else{
//       // Open Google Form for all other roles
//     // window.location.href = role.formUrl;
//     window.open(role.formUrl, "_blank", "noopener,noreferrer");
//     }
//   };

//   // Utility component for staggered appearance
//   const AnimatedText: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
//     <div
//       className="opacity-0 translate-y-4 animate-slide-up-fade"
//       style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
//     >
//       {children}
//     </div>
//   );

//   // Home Page Content
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans text-gray-800">
//       {/* Custom Keyframes for Animation */}
//       <style>
//         {`
//           @keyframes slide-up-fade {
//             from {
//               opacity: 0;
//               transform: translateY(20px);
//             }
//             to {
//               opacity: 1;
//               transform: translateY(0);
//             }
//           }
//           .animate-slide-up-fade {
//             animation: slide-up-fade 0.8s ease-out;
//           }
//         `}
//       </style>

//       {/* Header */}
//       <header className="sticky top-0 z-10 bg-white shadow-sm">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//           <img src={logo} alt="" className="w-12 h-12" />
//           <h2 className="text-3xl font-semibold text-gray-500">
//             Om<span className='text-fuchsia-600'>Verg</span>
//           </h2>
//         </div>

//           <nav className="hidden md:flex space-x-8">
//             {/* <a href="#mission" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
//               Our Mission
//             </a> */}
//             <a href="#roles" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
//               Choose Your Journey
//             </a>
//             {/* <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
//               Features
//             </a> */}
//             <a href="#join" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
//               Why us ?
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Hero Section - Animated */}
//       <section className="relative overflow-hidden pt-14 pb-20">
//   <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 opacity-70" />

//   <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

//     {/*  ⭐ ADD LOGO HERE  */}
//     <AnimatedText delay={200}>
//       <img
//         src={logo}   // <-- replace with actual path
//         alt="OmVerg Logo"
//         className="mx-auto w-45 h-45 mb-2"
//       />
//     </AnimatedText>

//     <AnimatedText delay={300}>
//       <h2 className="text-6xl md:text-7xl font-bold text-gray-500 leading-tight mt-0 mb-6">
//         Om
//         <span className="text-fuchsia-600 bg-clip-text ">
//           Verg
//         </span>
//       </h2>
//     </AnimatedText>
//     <AnimatedText delay={100}>
//       <span className="inline-flex items-center px-4 py-2 mb-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium shadow-sm">
//         <Sparkles className="w-4 h-4 mr-2" />
//         Build,Connect and Grow
//       </span>
//     </AnimatedText>

//     <AnimatedText delay={500}>
//       <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
//         OmVerg Seamlessly Connects Students, Startups, Investors, Mentors, Corporates, and Professionals -
//         Driving Growth And Uniting Possibilities.
//       </p>
//     </AnimatedText>

//     <AnimatedText delay={700}>
//       <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
//         <a
//           href="#roles"
//           className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 !text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:text-white transform hover:-translate-y-1 transition-all duration-200 flex items-center"
//         >
//           Get Started Today
//           <ArrowRight className="ml-2 w-5 h-5" />
//         </a>
//       </div>
//     </AnimatedText>

//   </div>
// </section>


//       {/* Mission & Vision Section - Inspired structure */}
//       {/* <section id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center space-y-6 mb-16">
//           <h2 className="text-5xl font-bold text-gray-900">Our Core Vision</h2>
//           <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed">
//             We believe that opportunity should be accessible to everyone. Our mission is to create a vibrant ecosystem where talent meets opportunity, where ideas find funding, where experience guides ambition, and where collaboration drives innovation.
//           </p>
//         </div> */}

//         {/* Vision Points */}
//         {/* <div className="grid md:grid-cols-3 gap-8 mb-20">
//           <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Democratize Access</h3>
//             <p className="text-gray-700 leading-relaxed">
//               Break down barriers and make opportunities accessible regardless of background, location, or network. Everyone deserves a chance to succeed.
//             </p>
//           </div>
//           <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Foster Innovation</h3>
//             <p className="text-gray-700 leading-relaxed">
//               Create an environment where ideas flourish, collaboration thrives, and innovation happens naturally through meaningful connections.
//             </p>
//           </div>
//           <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border border-pink-200 shadow-md hover:shadow-lg transition-shadow duration-300">
//             <h3 className="text-2xl font-bold text-gray-900 mb-4">Drive Growth</h3>
//             <p className="text-gray-700 leading-relaxed">
//               Empower every member to grow - whether it's learning new skills, scaling a business, or making impactful investments.
//             </p>
//           </div>
//         </div>
//       </section> */}


//       {/* Role Selection Section (The core requirement) */}
//       <section id="roles" className="py-20 bg-gray-100/50">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center mb-16">
//             <h2 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Journey</h2>
//             <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//               Select your role to explore tailored opportunities, resources, and connections designed specifically for your goals and aspirations within our ecosystem.
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {ROLES.map((role, index) => (
//               <RoleCard
//                 key={role.id}
//                 role={role}
//                 onClick={() => handleRoleClick(role)}
//                 isHovered={hoveredRoleIndex === index}
//                 onHover={(hover) => setHoveredRoleIndex(hover ? index : null)}
//               />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Features Section - Inspired structure */}
//       {/* <section id='features'>
//       <div className="bg-white py-20">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="text-center space-y-6 mb-16">
//             <h2 className="text-5xl font-bold text-gray-900">Powerful Platform Features</h2>
//             <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
//               Our platform is built with cutting-edge technology and user-centric design to provide you with the best experience in opportunity discovery and networking.
//             </p>
//           </div>

//           <div className="grid md:grid-cols-2 gap-8">
//             {FEATURES.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
//                   <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
//                     <Icon className="w-7 h-7 text-white" />
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
//                   <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>
//       </section> */}
//       {/* Benefits Section (IMPROVED UI) */}
//       <section id='join'>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
//         <div className="text-center space-y-6 mb-16">
//           <h2 className="text-5xl font-bold text-gray-900 leading-tight">
//             Why Join OmVerg?
//           </h2>
//           <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed">
//             We're more than just a platform - we're a community dedicated to your success. Here's what sets us apart and makes us the preferred choice for opportunity seekers worldwide.
//           </p>
//         </div>

//         {/* New 3-Column Benefits Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {BENEFIT_CARDS.map((benefit, index) => {
//             const Icon = benefit.icon;
//             return (
//               <div 
//                 key={index} 
//                 className="bg-white p-6 rounded-xl border-t-4 border-b-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
//                 style={{ borderTopColor: benefit.color.split(' ').slice(-1)[0].replace('to-', '#').replace('from-', '#').replace('600', '500') }}
//               >
//                 <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
//                   <Icon className="w-6 h-6 text-white" />
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
//                 <p className="text-gray-600 text-base">{benefit.description}</p>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//       </section>
//       <Testimonials/>

//       {/* Footer - Inspired styling */}
      
//     </div>
//   );
// };

// export default App;




import React, { useState } from 'react';
import { 
  Briefcase, 
  GraduationCap, 
  Lightbulb, 
  TrendingUp, 
  Users, 
  Zap, 
  Sparkles, 
  ArrowRight,
  Target, 
  Award, 
  Shield,
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  X 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../public/logoimg.png";
import Testimonials from "../../components/Testimonials";

// --- PRIVACY POLICY MODAL COMPONENT ---
interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const policyContent = {
    effectiveDate: "4th Nov 2025",
    lastUpdated: "4th Nov 2025",
    company: "Orion Eduverse Pvt. Ltd",
    platform: "OmVerg",
    introduction: "Orion Eduverse Pvt. Ltd (“Company”, “we”, “our”, or “us”) operates OmVerg (“Platform”), which connects students, startups, and other stakeholders in the professional development, networking, and startup ecosystem.\n\nWe value your trust and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.",
    sections: [
      {
        title: "1. Information We Collect",
        content: [
          "We may collect the following categories of information:",
          "*a. From Students*\nName, email address, phone number, profile details\nEducational background, skills, interests, uploaded documents (e.g., resumes, certificates)\nCourse participation, learning activity, assessments",
          "*b. From Startups*\nFounder/team details, company name, contact information\nStartup profiles, pitch decks, documents, and progress updates\nHiring or collaboration preferences",
          "*c. Automatically Collected Data*\nDevice information (browser, OS, IP address)\nPlatform usage data (logins, activity, interactions)\nCookies and similar technologies (for session management and analytics)",
        ]
      },
      {
        title: "2. How We Use Your Information",
        content: [
          "We use collected information to:",
          "* Create and manage user accounts",
          "* Facilitate networking between students, startups, and other stakeholders",
          "* Enable startups to showcase their profiles and connect with other stakeholders",
          "* Monitor usage and improve Platform functionality",
          "* Send important notifications, updates, or service-related messages",
          "* Ensure safety, compliance, and fraud prevention",
        ]
      },
      {
        title: "3. How We Share Information",
        content: [
          "We do not sell your personal data. We may share information:",
          "* With other users of the Platform (e.g., students viewing startup profiles, startups viewing student profiles) based on user preferences and Platform functionality",
          "* With service providers who support Platform operations (hosting, analytics, communications)",
          "* If required by law, regulation, or legal process",
          "* During a business transfer (merger, acquisition, or asset sale)",
        ]
      },
      {
        title: "4. Data Retention",
        content: ["We retain your information as long as your account is active or as needed to provide services. If you request account deletion, we will delete your personal data, except where retention is legally required."],
      },
      {
        title: "5. Your Rights",
        content: [
          "Depending on your jurisdiction, you may have the right to:",
          "* Access, update, or delete your personal data",
          "* Restrict or object to processing of your data",
          "* Withdraw consent for optional data uses",
          "* Request data portability",
          "To exercise these rights, contact us at *contact@omverg.com*",
        ]
      },
      {
        title: "6. Security",
        content: ["We implement reasonable administrative, technical, and physical safeguards to protect your information. However, no system is fully secure, and we cannot guarantee absolute security."],
      },
      {
        title: "7. Use by Minors",
        content: ["Our Platform is intended for individuals *16 years or older* (or the applicable minimum age in your jurisdiction). If we learn that we have collected data from a minor without proper consent, we will delete it."],
      },
      {
        title: "8. International Users",
        content: ["If you are accessing our Platform from outside India, note that your data may be transferred, stored, and processed in jurisdictions with different data protection laws."],
      },
      {
        title: "9. Updates to This Policy",
        content: ["We may update this Privacy Policy from time to time. Changes will be posted on this page with a new “Last Updated” date. If changes are significant, we will notify you via email or Platform notice."],
      },
      {
        title: "10. Contact Us",
        content: [
          "If you have questions about this Privacy Policy, please contact us at:",
          "*Orion Eduverse Pvt Ltd.*",
          "Email: contact@omverg.com",
          "Address: Ranchi, Jharkhand, India.",
        ]
      },
    ]
  };

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm' aria-modal="true" role="dialog">
      <div className='relative w-full max-w-4xl max-h-[90vh] mx-4 my-8 p-6 md:p-10 rounded-xl shadow-2xl bg-white text-gray-800 overflow-y-auto border border-gray-200'>
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4 sticky top-0 bg-white z-10">
          <h2 className='text-3xl font-bold text-indigo-600'>Privacy Policy</h2>
          <button onClick={onClose} className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'>
            <X className='h-6 w-6 text-gray-600' />
          </button>
        </div>
        <div className="text-sm text-gray-500 mb-6 space-y-1">
          <p>Effective Date: <span className="font-semibold text-gray-700">{policyContent.effectiveDate}</span></p>
        </div>
        <p className="mb-8 text-gray-600 whitespace-pre-line leading-relaxed">{policyContent.introduction}</p>
        <div className="space-y-8">
          {policyContent.sections.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{section.title}</h3>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                {section.content.map((line, idx) => <p key={idx}>{line}</p>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- TERMS OF SERVICE MODAL COMPONENT ---
interface TermsOfServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TermsOfServiceModal: React.FC<TermsOfServiceModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const termsContent = [
    {
      title: '✅ 1. Acceptance of Terms',
      content: [
        'By accessing or using OmVerg, you confirm that:',
        '* You have read and agree to these Terms',
        '* You are legally capable of entering an agreement',
        '* If representing a startup, you are authorized to act on its behalf',
      ],
    },
    {
      title: '✅ 2. Eligibility',
      content: [
        'OmVerg is intended for:',
        '* Registered startups, founders, teams',
        '* Students and early-stage innovators',
        'You must be 16 years or older, unless permitted by local law or with guardian/institution authorization.',
      ],
    },
    {
      title: '✅ 3. User Accounts',
      content: [
        'You agree to provide accurate and truthful information',
        'You are responsible for maintaining the confidentiality of your login credentials',
        'You are responsible for all activities under your account',
        'OmVerg may suspend accounts involved in fraud, misinformation, harassment, or misuse',
      ],
    },
    {
      title: '✅ 4. Platform Use',
      content: [
        'OmVerg provides features such as:',
        '* Startup & user discovery',
        '* Networking and connections',
        '* Messaging & collaboration tools',
        '* Opportunity, learning, or event listings',
        'Users must not:',
        '* Impersonate others or provide false information',
        '* Upload harmful content, spam, harassment, hate speech, or illegal material',
        '* Use the platform for data scraping or unauthorized data collection',
        '* Attempt to hack or disrupt the platform',
      ],
    },
    {
      title: '✅ 5. User Content',
      content: [
        'User Content includes profile information, posts, messages, documents, and media.',
        'By submitting content, you grant OmVerg a non-exclusive, worldwide, royalty-free license to:',
        '* Store',
        '* Display',
        '* Process',
        '* Share your content as needed for platform functionality',
        'You retain ownership of your content.',
        'You agree that:',
        '* Your content does not violate any copyright or trademark laws',
        '* You have permission to share documents and media uploaded by you',
        '* Your content may be visible to other users depending on your profile settings',
      ],
    },
    {
      title: '✅ 6. Privacy & Data',
      content: ['OmVerg collects certain user information to operate the platform. By using OmVerg, you consent to the collection and handling of data as described in the Privacy Policy (published separately).'],
    },
    {
      title: '✅ 7. Communication Rules',
      content: [
        'Users must use communication features responsibly.',
        'The following are not allowed:',
        '* Harassment, bullying, threats',
        '* Fake job offers, fraud, misleading claims',
        '* Unsolicited spam messages',
        '* Misrepresentation of skills, company, or identity',
        'OmVerg may restrict messaging or remove content that violates these rules.',
      ],
    },
    {
      title: '✅ 8. Third-Party Links & Services',
      content: [
        'OmVerg may include external links or integrations.',
        'We are not responsible for:',
        '* Their content',
        '* Their policies',
        '* Any damage caused by external websites or services',
        'Interactions with third parties are at the user’s own risk.',
      ],
    },
    {
      title: '✅ 9. Intellectual Property',
      content: [
        'All platform content including design, branding, UI, features, software, and trademarks belong to OmVerg.',
        'Users may not:',
        '* Copy, modify, distribute, or reverse-engineer the platform',
        '* Create competing versions or derivative works',
      ],
    },
    {
      title: '✅ 10. Payments (If Applicable)',
      content: [
        'Some features may require a subscription or payment.',
        'If activated:',
        '* Prices and billing details will be displayed clearly before purchase',
        '* Non-payment may result in restricted access',
      ],
    },
    {
      title: '✅ 11. Termination',
      content: [
        'We may suspend or terminate access if a user:',
        '* Violates these Terms',
        '* Harms the platform or other users',
        '* Uses the platform for illegal or fraudulent actions',
        'Users may delete accounts at any time. Some user-submitted information may remain as part of platform history (messages, collaborations, openings) to maintain ecosystem integrity.',
      ],
    },
    {
      title: '✅ 12. No Guarantee of Business Outcome',
      content: [
        'OmVerg is a networking and discovery platform.',
        'We do not guarantee:',
        '* Successful partnerships',
        '* Employment or internship outcomes',
        '* Accuracy of information posted by users',
        '* Safety or legitimacy of third-party interactions',
        'Users must independently verify any opportunity or connection.',
      ],
    },
    {
      title: '✅ 13. Limitation of Liability',
      content: [
        'OmVerg is not liable for:',
        '* Losses, damages, fraud, or disputes between users',
        '* Business decisions, partnerships, contracts, or financial outcomes',
        '* Downtime, bugs, or platform interruptions',
        '* Data loss or unauthorized access',
        'Use of the platform is at your own risk.',
      ],
    },
    {
      title: '✅ 14. Changes to Terms',
      content: ['OmVerg may update these Terms as the platform evolves. When changes are posted, continued use of the platform signifies acceptance.'],
    },
    {
      title: '✅ 15. Governing Law',
      content: ['These Terms are governed by the laws of India, unless otherwise required by your local jurisdiction.'],
    },
    {
      title: '✅ 16. Contact',
      content: [
        'For questions or support:',
        '📩 Email: *contact@omverg.com*',
      ],
    },
  ];

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm' aria-modal="true" role="dialog">
      <div className='relative w-full max-w-4xl max-h-[90vh] mx-4 my-8 p-6 md:p-10 rounded-xl shadow-2xl bg-white text-gray-800 overflow-y-auto border border-gray-200'>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4  top-0 bg-white z-10">
          <h2 className='text-3xl font-bold text-indigo-600'>OmVerg – Terms of Service</h2>
          <button
            onClick={onClose}
            className='p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors'
            aria-label="Close terms of service modal"
          >
            <X className='h-6 w-6 text-gray-600' />
          </button>
        </div>

        {/* Dates */}
        <div className="text-sm text-gray-500 mb-6 space-y-1">
          <p>Effective Date: <span className="font-semibold text-gray-700">4th Nov 2025</span></p>
          <p>Last Updated: <span className="font-semibold text-gray-700">4th Nov 2025</span></p>
        </div>

        {/* Introduction */}
        <p className="mb-6 text-gray-600 leading-relaxed">
          Welcome to OmVerg (“OmVerg”, “we”, “our”). OmVerg is a digital networking and collaboration platform designed for startups, students, founders, and innovators. By using OmVerg, you agree to these Terms of Service (“Terms”). If you do not agree, please discontinue use of the platform.
        </p>

        {/* Terms Sections */}
        <div className="space-y-8">
          {termsContent.map((section, index) => (
            <div key={index}>
              <h3 className="text-xl font-bold mb-3 text-gray-900">{section.title}</h3>
              <div className="space-y-3 text-gray-600 leading-relaxed">
                {section.content.map((line, pIndex) => {
                  // Check for list item
                  if (line.startsWith('* ')) {
                    return (
                      <li key={pIndex} className="ml-5 list-disc">
                        {line.substring(2)}
                      </li>
                    );
                  }
                  // Simple bolding for contact email
                  const formattedLine = line.replace(/\*(.*?)\*/g, '<strong>$1</strong>');
                  return <p key={pIndex} dangerouslySetInnerHTML={{ __html: formattedLine }} />;
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Define the structure for a Role object
interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  formUrl : string,
  color: string;
  bgColor: string;
  borderColor: string;
}

// Data for the 6 roles
const ROLES: Role[] = [
  {
    id: 'students',
    title: 'Students',
    description: 'Learn, grow, and discover project-based internships and mentorship opportunities.',
    icon: GraduationCap,
    path: '/students/prelogin',
    formUrl : '',
    color: "from-blue-400 to-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    id: 'startups',
    title: 'Startups',
    description: 'Scale your vision, find talent, validate ideas, and secure early funding rounds.',
    icon: Zap,
    path: '/startup/prelogin',
    formUrl : '',
    color: "from-purple-400 to-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    id: 'investors',
    title: 'Investors/Accelerators',
    description: 'Find high-potential ventures, track emerging trends, and fuel the next wave of innovation.',
    icon: TrendingUp,
    path: '/investors/prelogin',
    formUrl : 'https://forms.gle/kbjkXCnmePpzRdPj6' ,
    color: "from-green-400 to-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  {
    id: 'mentors',
    title: 'Mentors',
    description: 'Share expertise, guide emerging leaders, and earn recognition for valuable contributions.',
    icon: Award,
    path: '/mentors/prelogin',
    formUrl : 'https://forms.gle/6hirfhKhLQNJGgLi6',
    color: "from-orange-400 to-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
  {
    id: 'corporates',
    title: 'Corporates',
    description: 'Sponsor innovation challenges, find bespoke talent, and drive internal growth.',
    icon: Briefcase,
    path: '/corporates/prelogin',
    formUrl : 'https://forms.gle/G4btuB5ddUccKjLr5',
    color: "from-indigo-400 to-indigo-600",
    bgColor: "bg-indigo-50",
    borderColor: "border-indigo-200",
  },
  {
    id: 'professionals',
    title: 'Professionals',
    description: 'Expand your network, offer consulting, and explore cutting-edge project opportunities.',
    icon: Target,
    path: '/professionals/prelogin',
    formUrl : 'https://forms.gle/JdUmFf4qKCEyvgpo6',
    color: "from-pink-400 to-pink-600",
    bgColor: "bg-pink-50",
    borderColor: "border-pink-200",
  },
];

// Data for the Benefits section
const BENEFIT_CARDS = [
  { 
    icon: Sparkles, 
    title: "Exclusive Access", 
    description: "Gain early access to opportunities across sectors from startup funding rounds to corporate innovation challenges, research programs, and global collaborations.", 
    color: "from-blue-600 to-blue-400" 
  },
  { 
    icon: Users, 
    title: "Ecosystem Opportunities ", 
    description: "Explore curated career building opportunities across startup ecosystem, Corporates, mentor ecosystem & CSR. Connect directly with founders, investors, mentors, and professionals.", 
    color: "from-purple-600 to-purple-400" 
  },
  { 
    icon: Lightbulb, 
    title: "Personalized Growth Paths", 
    description: "Let AI guide your journey.OmVerg’s smart recommendation engine maps the most relevant opportunities, mentors, and programs based on your goals, skills, and aspirations.", 
    color: "from-green-600 to-green-400" 
  },
  { 
    icon: Briefcase, 
    title: "Real-time Collaboration", 
    description: "Work, discuss, and co-create with your teams and mentors in one secure environment.Integrated project spaces and smart collaboration tools streamline your workflow from idea to execution.", 
    color: "from-orange-600 to-orange-400" 
  },
  { 
    icon: TrendingUp, 
    title: "Market & Ecosystem Insights", 
    description: "Stay ahead of the curve.Our AI-driven analytics surfaces market signals, funding trends, and emerging sectors — helping you make informed strategic decisions.", 
    color: "from-red-600 to-red-400" 
  },
  { 
    icon: Shield, 
    title: "Secure & Verified Channels", 
    description: "Powered by blockchain, OmVerg ensures identity verification, data integrity, and privacy.Every conversation, opportunity, and transaction is safe, transparent, and trustworthy.", 
    color: "from-pink-600 to-pink-400" 
  },
];

// Component for a single role card
const RoleCard: React.FC<{ role: Role; onClick: () => void; isHovered: boolean; onHover: (hover: boolean) => void }> = ({ role, onClick, isHovered, onHover }) => {
  const Icon = role.icon;
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover(true)}
      onMouseLeave={() => onHover(false)}
      className={`relative group cursor-pointer transition-all duration-300 ${isHovered ? 'scale-[1.03] shadow-2xl' : 'scale-100 shadow-lg'} w-full h-full`}
      role="button"
      tabIndex={0}
    >
      <div className={`${role.bgColor} ${role.borderColor} border-2 rounded-xl p-6 transition-all duration-300 h-full`}>
        <div className="flex items-start space-x-4 mb-4">
          <div className={`w-12 h-12 bg-gradient-to-br ${role.color} rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-md`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 flex-1 min-w-0 leading-snug MT-2">{role.title}</h3>
        </div>

        <p className="text-gray-600 text-sm mb-4">{role.description}</p>

        <button className="mt-2 flex items-center text-sm font-semibold text-gray-700 group-hover:text-blue-600 transition-colors">
          Explore Portal
          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};

// Main Application Component
const App: React.FC = () => {
  const [hoveredRoleIndex, setHoveredRoleIndex] = useState<number | null>(null);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  
  const navigate = useNavigate();

  const handleRoleClick = (role: Role) => {
    if(role.title === 'Students' || role.title === 'Startups'){
      navigate(role.path);
    }else{
      // Open Google Form for all other roles
      window.open(role.formUrl, "_blank", "noopener,noreferrer");
    }
  };

  // Utility component for staggered appearance
  const AnimatedText: React.FC<{ children: React.ReactNode; delay: number }> = ({ children, delay }) => (
    <div
      className="opacity-0 translate-y-4 animate-slide-up-fade"
      style={{ animationDelay: `${delay}ms`, animationFillMode: 'forwards' }}
    >
      {children}
    </div>
  );

  // Home Page Content
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 font-sans text-gray-800">
      {/* Custom Keyframes for Animation */}
      <style>
        {`
          @keyframes slide-up-fade {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-slide-up-fade {
            animation: slide-up-fade 0.8s ease-out;
          }
        `}
      </style>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-12 h-12" />
          <h2 className="text-3xl font-semibold text-gray-500">
            Om<span className='text-fuchsia-600'>Verg</span>
          </h2>
        </div>

          <nav className="hidden md:flex space-x-8">
            <a href="#roles" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Choose Your Journey
            </a>
            <a href="#join" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Why us ?
            </a>
            <a href="#testimonials" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Testimonials
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Animated */}
      <section className="relative overflow-hidden pt-14 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 opacity-70" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

          <AnimatedText delay={200}>
            <img
              src={logo}
              alt="OmVerg Logo"
              className="mx-auto w-45 h-45 mb-2"
            />
          </AnimatedText>

          <AnimatedText delay={300}>
            <h2 className="text-6xl md:text-7xl font-bold text-gray-500 leading-tight mt-0 mb-6">
              Om
              <span className="text-fuchsia-600 bg-clip-text ">
                Verg
              </span>
            </h2>
          </AnimatedText>
          <AnimatedText delay={100}>
            <span className="inline-flex items-center px-4 py-2 mb-2 rounded-full bg-blue-100 text-blue-700 text-sm font-medium shadow-sm">
              <Sparkles className="w-4 h-4 mr-2" />
              Build,Connect and Grow
            </span>
          </AnimatedText>

          <AnimatedText delay={500}>
            <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed mb-10">
              OmVerg Seamlessly Connects Students, Startups, Investors, Mentors, Corporates, and Professionals -
              Driving Growth And Uniting Possibilities.
            </p>
          </AnimatedText>

          <AnimatedText delay={700}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <a
                href="#roles"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 !text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl hover:text-white transform hover:-translate-y-1 transition-all duration-200 flex items-center"
              >
                Get Started Today
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
            </div>
          </AnimatedText>

        </div>
      </section>

      {/* Role Selection Section */}
      <section id="roles" className="py-20 bg-gray-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-gray-900 mb-4">Choose Your Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Select your role to explore tailored opportunities, resources, and connections designed specifically for your goals and aspirations within our ecosystem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ROLES.map((role, index) => (
              <RoleCard
                key={role.id}
                role={role}
                onClick={() => handleRoleClick(role)}
                isHovered={hoveredRoleIndex === index}
                onHover={(hover) => setHoveredRoleIndex(hover ? index : null)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id='join'>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold text-gray-900 leading-tight">
              Why Join OmVerg?
            </h2>
            <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed">
              We're more than just a platform - we're a community dedicated to your success. Here's what sets us apart and makes us the preferred choice for opportunity seekers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BENEFIT_CARDS.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white p-6 rounded-xl border-t-4 border-b-2 border-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
                  style={{ borderTopColor: benefit.color.split(' ').slice(-1)[0].replace('to-', '#').replace('from-', '#').replace('600', '500') }}
                >
                  <div className={`w-12 h-12 bg-gradient-to-br ${benefit.color} rounded-lg flex items-center justify-center mb-4 shadow-lg`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 text-base">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      <section id='testimonials'>
        <Testimonials/>
      </section>

      {/* --- NEW LIGHT THEME FOOTER --- */}
      <footer className="w-full mt-12 bg-[#003D9A]">
        {/* Wrapper */}
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[400px]">

          {/* Left Logo & Brand Panel */}
          <div className="bg-gray-200 p-8 flex flex-col items-center md:items-start justify-center text-center md:text-left space-y-6">
             <div className="flex items-center">
                <img src={logo} alt="OmVerg Logo" className="w-12 h-12 mr-3" />
                <h2 className="text-3xl font-bold text-gray-600">
                  Om<span className='text-fuchsia-600'>Verg</span>
                </h2>
             </div>
             
             <p className="text-gray-600 text-sm leading-relaxed max-w-xs">
                Connecting innovators, investors, and entrepreneurs to build the future together. Join our community of game-changers.
             </p>

             {/* Contact Info */}
             <div className="space-y-3 text-sm text-gray-600 w-full">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="h-4 w-4" />
                  <span>contact@omverg.com</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="h-4 w-4" />
                  <span>+91 9380706694</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Ranchi, Jharkhand</span>
                </div>
             </div>
          </div>

          {/* Right Content Panel */}
          <div className="md:col-span-3 bg-[#003D9A] text-white p-10 flex flex-col justify-between">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">

              {/* Sections (Replaces Platform Links) */}
              <div>
                <h4 className="font-semibold text-lg mb-6 text-purple-200">Navigate</h4>
                <ul className="space-y-3">
                  <li>
                    <a href="#roles" className="hover:text-purple-300 transition-colors text-white/90">
                      Choose Your Journey
                    </a>
                  </li>
                  <li>
                    <a href="#join" className="hover:text-purple-300 transition-colors text-white/90">
                      Why Us?
                    </a>
                  </li>
                  <li>
                    <a href="#testimonials" className="hover:text-purple-300 transition-colors text-white/90">
                      Testimonials
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h4 className="font-semibold text-lg mb-6 text-purple-200">Legal</h4>
                <ul className="space-y-3">
                   <li>
                      <button 
                        onClick={() => setIsPrivacyModalOpen(true)}
                        className="hover:text-purple-300 transition-colors text-white/90 text-left"
                      >
                        Privacy Policy
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => setIsTermsModalOpen(true)}
                        className="hover:text-purple-300 transition-colors text-white/90 text-left"
                      >
                        Terms of Service
                      </button>
                    </li>
                </ul>
              </div>

              {/* Connect / CTA */}
              <div>
                <h4 className="font-semibold text-lg mb-6 text-purple-200">Connect</h4>
                <div className="space-y-6">
                   <p className="text-sm text-white/90">
                     Join thousands of entrepreneurs, students, and mentors who are already connecting, learning, and growing together.
                   </p>
                   
                   <div className="flex gap-4">
                      <a href="https://www.linkedin.com/company/omverg" className="w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all" target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-5 w-5 text-white" />
                      </a>
                   </div>
                </div>
              </div>

            </div>

            {/* Bottom Copyright */}
            <div className="text-sm text-purple-200 mt-12 pt-8 border-t border-white/10 text-center md:text-left">
              © 2025 Orion Eduverse. All rights reserved.
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <PrivacyPolicyModal isOpen={isPrivacyModalOpen} onClose={() => setIsPrivacyModalOpen(false)} />
      <TermsOfServiceModal isOpen={isTermsModalOpen} onClose={() => setIsTermsModalOpen(false)} />
    </div>
  );
};

export default App;