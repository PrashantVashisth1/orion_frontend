import React from "react";
import mentor1 from '../../../assets/hero1.png'
import mentor2 from '../../../assets/hero2.png'
import mentor3 from '../../../assets/hero3.png'

const HeroSection: React.FC = () => {
  return (
    <section className="relative w-full flex flex-col lg:flex-row items-center justify-between px-6 lg:px-24 py-20 bg-white overflow-hidden">
      {/* Left Section (Text) */}
      <div className="flex flex-col items-start text-left space-y-6 max-w-xl z-10">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight">
          Learn, grow, and lead with guidance <br />
          from <span className="text-blue-600">experienced mentors</span>
        </h1>
        <p className="text-gray-600 text-lg leading-relaxed">
          Get personalised mentorship from industry leaders. Expand your network,
          accelerate growth, and build the skills needed to lead.
        </p>
        <button className="px-8 py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer">
          Join Now for Free
        </button>
      </div>

      {/* Right Section (Mentor Images Collage) */}
      <div className="relative mt-16 lg:mt-0 flex flex-col items-center lg:items-end justify-center w-full lg:w-[50%]">
        {/* Top Row */}
        <div className="flex gap-8 mb-8">
          <div className="relative">
            <img
              src={mentor1}
              alt="Mentor 1"
              className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-4xl object-cover shadow-lg"
            />
            {/* Dots bottom-right */}
            <div className="absolute -bottom-4 -right-4 grid grid-cols-3 gap-1 opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={mentor2}
              alt="Mentor 2"
              className="w-40 h-40 sm:w-48 sm:h-48 lg:w-56 lg:h-56 rounded-4xl object-cover shadow-lg"
            />
            {/* Dots bottom-left */}
            <div className="absolute -bottom-4 -left-4 grid grid-cols-3 gap-1 opacity-30">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Center Image */}
        <div className="relative">
          <img
            src={mentor3}
            alt="Mentor 3"
            className="w-60 h-48 sm:w-72 sm:h-56 lg:w-80 lg:h-64 rounded-4xl object-cover shadow-lg"
          />
          {/* Dots top-left */}
          <div className="absolute -top-4 -left-4 grid grid-cols-3 gap-1 opacity-30">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="w-2 h-2 bg-gray-300 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
