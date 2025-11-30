import React, { useState } from 'react';
import { Briefcase, GraduationCap, Lightbulb, TrendingUp, Users, Zap, Sparkles, ArrowRight,Target, Award, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import logo from "../../../public/logoimg.png";
import Testimonials from "../../components/Testimonials";
// Define the structure for a Role object, including new visual styling properties
interface Role {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  path: string;
  formUrl : string,
  color: string; // Gradient class for icon background
  bgColor: string; // Background color for the card
  borderColor: string; // Border color for the card
}

// Data for the 6 roles with enhanced color themes inspired by the user's code
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

// Data for the Features section
// const FEATURES = [
//   {
//     icon: Globe,
//     title: "Unified Ecosystem",
//     description: "Connect all stakeholders in the innovation ecosystem under one platform, breaking down traditional barriers between students, startups, investors, and industry leaders."
//   },
//   {
//     icon: Zap,
//     title: "Smart Matching Engine",
//     description: "Our intelligent algorithms match opportunities with the right people, ensuring meaningful connections that drive real results and mutual growth."
//   },
//   {
//     icon: Shield,
//     title: "Verified Community",
//     description: "Every member is carefully vetted and verified to ensure authenticity and quality, creating a trusted, professional environment for collaboration."
//   },
//   {
//     icon: Sparkles,
//     title: "Curated Discovery",
//     description: "Access curated opportunities tailored to your profile - from securing funding and internships to mentorship programs and strategic partnerships."
//   }
// ];

// Data for the Benefits section (Refactored into cards)
const BENEFIT_CARDS = [
  { 
    icon: Sparkles, 
    title: "Exclusive Access", 
    description: "Access to exclusive opportunities across diverse industries and sectors.", 
    color: "from-blue-600 to-blue-400" 
  },
  { 
    icon: Users, 
    title: "Direct Networking", 
    description: "Direct connections with decision-makers, mentors, and founders to accelerate your trajectory.", 
    color: "from-purple-600 to-purple-400" 
  },
  { 
    icon: Lightbulb, 
    title: "Personalized Paths", 
    description: "Our recommendation engine ensures optimal path discovery tailored precisely to your profile and goals.", 
    color: "from-green-600 to-green-400" 
  },
  { 
    icon: Briefcase, 
    title: "Real-time Collaboration", 
    description: "Access real-time tools and integrated workspaces for seamless project success and team coordination.", 
    color: "from-orange-600 to-orange-400" 
  },
  { 
    icon: TrendingUp, 
    title: "Market Insights", 
    description: "Get direct insights into market trends and trending opportunities before they become mainstream.", 
    color: "from-red-600 to-red-400" 
  },
  { 
    icon: Shield, 
    title: "Secure Channels", 
    description: "Utilize secure and private communication channels for sensitive and high-value discussions.", 
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
          {/* FIX: Reduced font size to text-xl and added flex-1 to ensure wrapping/containment */}
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
  const navigate = useNavigate();

  const handleRoleClick = (role: Role) => {
    if(role.title === 'Students' || role.title === 'Startups'){
      navigate(role.path);
    }else{
      // Open Google Form for all other roles
    // window.location.href = role.formUrl;
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
      <header className="sticky top-0 z-10 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-12 h-12" />
          <h2 className="text-3xl font-semibold text-gray-500">
            Om<span className='text-fuchsia-600'>Verg</span>
          </h2>
        </div>

          <nav className="hidden md:flex space-x-8">
            {/* <a href="#mission" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Our Mission
            </a> */}
            <a href="#roles" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Choose Your Journey
            </a>
            {/* <a href="#features" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Features
            </a> */}
            <a href="#join" className="text-gray-600 hover:text-blue-600 transition-colors font-medium">
              Why us ?
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section - Animated */}
      <section className="relative overflow-hidden pt-14 pb-20">
  <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-100/20 to-pink-100/30 opacity-70" />

  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

    {/*  ⭐ ADD LOGO HERE  */}
    <AnimatedText delay={200}>
      <img
        src={logo}   // <-- replace with actual path
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


      {/* Mission & Vision Section - Inspired structure */}
      {/* <section id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="text-5xl font-bold text-gray-900">Our Core Vision</h2>
          <p className="max-w-4xl mx-auto text-xl text-gray-600 leading-relaxed">
            We believe that opportunity should be accessible to everyone. Our mission is to create a vibrant ecosystem where talent meets opportunity, where ideas find funding, where experience guides ambition, and where collaboration drives innovation.
          </p>
        </div> */}

        {/* Vision Points */}
        {/* <div className="grid md:grid-cols-3 gap-8 mb-20">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-8 rounded-2xl border border-blue-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Democratize Access</h3>
            <p className="text-gray-700 leading-relaxed">
              Break down barriers and make opportunities accessible regardless of background, location, or network. Everyone deserves a chance to succeed.
            </p>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-8 rounded-2xl border border-purple-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Foster Innovation</h3>
            <p className="text-gray-700 leading-relaxed">
              Create an environment where ideas flourish, collaboration thrives, and innovation happens naturally through meaningful connections.
            </p>
          </div>
          <div className="bg-gradient-to-br from-pink-50 to-pink-100 p-8 rounded-2xl border border-pink-200 shadow-md hover:shadow-lg transition-shadow duration-300">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Drive Growth</h3>
            <p className="text-gray-700 leading-relaxed">
              Empower every member to grow - whether it's learning new skills, scaling a business, or making impactful investments.
            </p>
          </div>
        </div>
      </section> */}


      {/* Role Selection Section (The core requirement) */}
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

      {/* Features Section - Inspired structure */}
      {/* <section id='features'>
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-6 mb-16">
            <h2 className="text-5xl font-bold text-gray-900">Powerful Platform Features</h2>
            <p className="max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed">
              Our platform is built with cutting-edge technology and user-centric design to provide you with the best experience in opportunity discovery and networking.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {FEATURES.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-md">
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed text-lg">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      </section> */}
      {/* Benefits Section (IMPROVED UI) */}
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

        {/* New 3-Column Benefits Grid */}
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
      <Testimonials/>

      {/* Footer - Inspired styling */}
      
    </div>
  );
};

export default App;

