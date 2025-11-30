import React from "react";
import logo from "../../../public/logoimg.png";
import bhanu from "../../assets/Bhanu.png";
import vivekananda from "../../assets/VivekanandaUppunda.png";

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
    <div className="bg-white shadow-md rounded-xl p-5 flex flex-col border border-gray-200 w-100 h-100 relative flex-shrink-0">
      <div className="w-30 h-30 rounded-xl overflow-hidden flex-shrink-0 border border-gray-300 mx-auto mb-4">
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

      <img src={companyLogo} alt="company logo" className="w-8 h-8 absolute bottom-3 right-3 opacity-70" />
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
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
      name: "Sarah Lee",
      role: "CEO",
      company: "HealthFirst Solutions",
      message:
        "Super intuitive and extremely helpful for navigating the startup ecosystem. Highly recommended!",
      companyLogo: logo,
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
      name: "Michael Chen",
      role: "CTO",
      company: "FutureTech Labs",
      message:
        "Makes collaboration seamless and efficient. Love being part of this platform!",
      companyLogo: logo,
    },
  ];

  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="py-16 bg-gray-50 flex flex-col items-center overflow-hidden">
      <h2 className="text-3xl font-bold text-gray-900 mb-10">Testimonials</h2>

      <div className="relative w-[85%] overflow-hidden">
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
            animation: scroll 30s linear infinite;
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