
import logo from "../../../public/logoimg.png";
import bhanu from "../../assets/Bhanu.png";
import vivekananda from "../../assets/VivekanandaUppunda.png";
import jayant from "../../assets/jayant.jpeg"
import ashish from "../../assets/AshishGupta.jpeg"
import swati from "../../assets/swati.jpg"
import kartik from "../../assets/kartik.jpg"
import sparsh from "../../assets/sparsh.jpg"
import bhaskar from "../../assets/bhaskar.jpg"

import React from "react";

interface TestimonialProps {
  image: string;
  name: string;
  role: string;
  company: string;
  message: string;
  companyLogo: string;
}

const TestimonialCard: React.FC<TestimonialProps> = ({ image, name, role, company, message, companyLogo }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-gray-200 w-80 h-96 relative flex-shrink-0">
      <div className="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-gray-300 mx-auto mb-4">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>

      <div className="flex-1 flex flex-col text-center">
        <p className="text-gray-700 text-sm italic line-clamp-4 mb-2 mt-2 flex-shrink-0">{message}</p>

        <div className="flex justify-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="text-yellow-500 text-lg">★</span>
          ))}
        </div>

        <div className="mt-auto">
          <p className="font-semibold text-gray-900 text-base">{name}</p>
          <p className="text-gray-600 text-xs mt-1">{role}</p>
          <p className="text-gray-600 text-xs">{company}</p>
        </div>
      </div>
        
      <div className="w-8 h-8 absolute bottom-3 right-3 opacity-70 bg-gray-200 rounded"></div>
      <img src={companyLogo} alt="company logo" className="w-8 h-8 absolute bottom-3 right-3 rounded-full" />
    </div>
  );
};

const TestimonialSection = () => {
    const testimonials: TestimonialProps[] = [
    {
      image: bhanu,
      name: "Bhanu Pratap",
      role: "Co-Founder & Director",
      company: "Mediversal Healthcare Pvt Ltd",
      message:
        "Amazing platform, very intelligently developed, it truly understands what startup ecosystem needs — connecting us effortlessly with the right people and opportunities. Thrilled to be part of this ecosystem!",
      companyLogo: logo,
    },
    {
      image: vivekananda,
      name: "Vivekananda Uppu",
      role: "Founder,ex - Motorola, Broadcom Nordic",
      company: "Aayaama Technologies",
      message:
        "OmVerg provides us at Aayaama with a strong base, with useful tools and resources to showcase our services & collaborate within the ecosystem.It's a smart platform,very refreshing and will add a lot of value to startup ecosystemss,students,investors & corporates in achieving their goals",
      companyLogo: logo,
    },
    {
      image: jayant,
      name: "Jayant Gandhi",
      role: "Co-Founder & Director",
      company: "Mediversal Healthcare Pvt Ltd",
      message:
        "OmVerg is very thoughtfully designed and developed for the startup ecosystem.It simplifies and declutters the relevant data that gets lost in the noisy platforms.Looking forward to upcoming AI features .Best Wishes.",
      companyLogo: logo,
    },
    {
      image: ashish,
      name: "Ashish Gupta",
      role: "Principal Product Manager",
      company: "Microsoft,Richmond ,Seattle",
      message:
        "Looking forward to connecting with passionate founders and students who are eager to learn and build.It's refreshing to see  AI & Blockchain being used to create genuine connections and impact.",
      companyLogo: logo,
    },
    {
    image: swati,
    name: "Swati Singh",
    role: "Bachelor’s in Design, Industrial & Product Design",
    company: "Anant National University",
    message:
      "OmVerg is bridging the gap between students and the real world. Looking forward to career-building opportunities through internships, live projects and collaboration with genuine members who are keen to help each other — all in one trusted ecosystem!",
    companyLogo: "logo",
  },
    {
    image: bhaskar,
    name: "Bhaskar Singh",
    role: "Final Year Student",
    company: "Govind Ballabh Pant University of Agriculture and Technology Pantnagar",
    message:
      "Very useful platform for students. It’s great to see different people and experts under one roof sharing and learning from each other.",
    companyLogo: "logo",
  },
  {
    image: sparsh,
    name: "Sparsh Jain",
    role: "PGDM",
    company: "IIM Calcutta",
    message:
      "Omverg looks fantastic for networking and building professional relationships within the student community and startup ecosystem. I look forward to the full version release.",
    companyLogo: "logo",
  },
  {
    image: kartik,
    name: "Kartik Khandekar",
    role: "PGDM",
    company: "IIM Calcutta",
    message:
      "As a student, I’ve always wanted to connect with real-world opportunities and OmVerg at the moment seems to be making it possible! From mentorship to live projects and startup exposure, everything feels meaningful and smartly designed. It’s much more than just a platform.",
    companyLogo: "logo",
  },
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Testimonials</h2>

      <div className="relative w-full overflow-hidden">
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }
          .animate-scroll {
            animation: scroll 40s linear infinite;
          }
          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}} />
        
        {/* Left gradient overlay */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        {/* Right gradient overlay */}
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>
        
        <div className="flex gap-6 animate-scroll">
          {duplicatedTestimonials.map((t, index) => (
            <TestimonialCard key={index} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;