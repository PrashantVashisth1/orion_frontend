// src/pages/student-temp/index.tsx

import React from "react";
import { Link } from "react-router-dom";
// import Footer from "@/components/postlogincomponents/footer";
import { useAuth } from "@/contexts/AuthContext";
import { Video, ListChecks, ArrowRight } from "lucide-react";
import StudentPostLoginNavbar from "@/components/StudentPostLoginNavbartemp";

// A reusable card component for this page
const SectionCard: React.FC<{
  to: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}> = ({ to, title, description, icon }) => (
  <Link
    to={to}
    className="block p-8 bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-gray-700/50 transform transition-all duration-300 hover:scale-[1.03] hover:border-blue-500/70 shadow-lg hover:shadow-blue-500/20"
  >
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-2xl font-bold text-white">{title}</h3>
      <div className="p-3 bg-gray-700/50 rounded-full">{icon}</div>
    </div>
    <p className="text-gray-400 mb-6">{description}</p>
    <div className="flex items-center text-blue-400 font-medium">
      Go to {title}
      <ArrowRight className="h-5 w-5 ml-2" />
    </div>
  </Link>
);

const StudentTempPage: React.FC = () => {
  const { user } = useAuth();
  

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-white mt-4">
      <StudentPostLoginNavbar />
      
      <main className="flex-grow container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Welcome, {user?.full_name || "Student"}!
          </h1>
          <p className="text-xl text-gray-400">
            Explore opportunities and resources available for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* View Sessions Card */}
          <SectionCard
            to="/view-session"
            title="View Sessions"
            description="Browse upcoming webinars, workshops, and panel discussions hosted by startups and industry experts."
            icon={<Video className="h-6 w-6 text-blue-400" />}
          />

          {/* View Needs Card */}
          <SectionCard
            to="/view-needs"
            title="View Needs"
            description="Discover projects, internships, and other opportunities shared by startups looking for talent."
            icon={<ListChecks className="h-6 w-6 text-green-400" />}
          />
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default StudentTempPage;
// src/pages/student-temp/index.tsx

// import React from "react";
// import { Link } from "react-router-dom";
// import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";
// import Footer from "@/components/postlogincomponents/footer";
// import { useAuth } from "@/contexts/AuthContext";
// import { Video, ListChecks, ArrowRight } from "lucide-react";

// // A reusable card component for this page with light theme colors
// const SectionCard: React.FC<{
//   to: string;
//   title: string;
//   description: string;
//   icon: React.ReactNode;
// }> = ({ to, title, description, icon }) => (
//   <Link
//     to={to}
//     className="block p-8 bg-white rounded-2xl border border-gray-200 transform transition-all duration-300 hover:scale-[1.03] hover:border-blue-500 shadow-lg hover:shadow-blue-200"
//   >
//     <div className="flex items-center justify-between mb-4">
//       <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
//       <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
//     </div>
//     <p className="text-gray-600 mb-6">{description}</p>
//     <div className="flex items-center text-white font-medium bg-black py-3 px-22 rounded-lg">
//       Go to {title}
//       <ArrowRight className="h-5 w-5 ml-2" />
//     </div>
//   </Link>
// );

// const StudentTempPage: React.FC = () => {
//   const { user } = useAuth();

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
//       <Navbarpostlogin />

//       <main className="flex-grow container mx-auto px-4 py-16">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl md:text-5xl font-bold mb-4">
//             Welcome, {user?.full_name || "Student"}!
//           </h1>
//           <p className="text-xl text-gray-600">
//             Explore opportunities and resources available for you.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
//           {/* View Sessions Card */}
//           <SectionCard
//             to="/view-session"
//             title="View Sessions"
//             description="Browse upcoming webinars, workshops, and panel discussions hosted by startups and industry experts."
//             icon={<Video className="h-6 w-6 text-blue-600" />}
//           />

//           {/* View Needs Card */}
//           <SectionCard
//             to="/view-needs"
//             title="View Needs"
//             description="Discover projects, internships, and other opportunities shared by startups looking for talent."
//             icon={<ListChecks className="h-6 w-6 text-green-600" />}
//           />
//         </div>
//       </main>

//       <Footer />
//     </div>
//   );
// };
// export default StudentTempPage;