
import ankur from "../../assets/Ankur shukla.jpg";
import vivek from "../../assets/vivek_k.png"
import bhanu from "../../assets/Bhanu.png"
import jayant from "../../assets/jayant.jpeg"
import mandal from "../../assets/ankur_mandal.jpeg"
import saurav from "../../assets/Saurav.png"
import ashishG from "../../assets/AshishGupta.jpeg"
import jainendraK from "../../assets/JainendraKumar.jpeg"
import vivekanandaU from "../../assets/VivekanandaUppunda.png"

"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// --- Data (Unchanged) ---
const mentors = [
  { name: "Saurav Kumar", role: "Founder Orion Eduverse, IIM Calcutta", image: saurav },
  { name: "Vivek KV", role: "IAS, IIM Calcutta", image: vivek },
  { name: "Dr. Ankur Shukla", role: "Prof. Finance & Strategy, Ph.D IIM Ranchi", image: ankur },
  { name: "Bhanu Pratap", role: "Co-founder at Mediversal HealthCare", image: bhanu },
  { name: "Jayant Gandhi", role: "Co-founder at Mediversal HealthCare", image: jayant },
  { name: "Ankur Mandal", role: "DoppleIQ, IIM Calcutta", image: mandal },
  { name: "Ashish Gupta", role: "Principal Product Manager, Microsoft, IIM Calcutta", image: ashishG },
  { name: "Jainendra Kumar", role: "Senior Dev. Engineer, Microsoft", image: jainendraK },
  { name: "Vivekananda Uppunda", role: "Co-founder Aayaama Technologies, Ex-Amazon Lab126, Ex-Motorola", image: vivekanandaU },
];

export default function MentorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // --- Carousel Logic (Unchanged) ---
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      let newCardsPerView = 1;
      if (width >= 1024) {
        newCardsPerView = 3; 
      } else if (width >= 768) {
        newCardsPerView = 2; 
      }
      setCardsPerView(newCardsPerView);
      setCurrentIndex(0); 
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = mentors.length;
  const totalPages = Math.ceil(totalCards / cardsPerView);

  const slideToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    const scrollablePageWidth = container.scrollWidth / totalPages;
    const newIndex = Math.max(0, Math.min(index, totalPages - 1));
    const scrollPosition = newIndex * scrollablePageWidth;

    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    const newIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
    slideToIndex(newIndex);
  };

  const goToNext = () => {
    const newIndex = currentIndex === totalPages - 1 ? 0 : currentIndex + 1;
    slideToIndex(newIndex);
  };

  // --- Mentor Card Component (UI Polish Retained) ---
  const MentorCard = ({ m }: { m: typeof mentors[0] }) => (
    <div 
        className="cursor-pointer mentor-card flex-shrink-0 p-3 sm:p-6 snap-start"
        style={{ flexBasis: `${100 / cardsPerView}%` }}
    >
      <div
        className="bg-white border border-gray-100 p-6 sm:p-8 rounded-3xl shadow-xl 
                     hover:shadow-2xl hover:scale-[1.03] transition-all duration-300
                     flex flex-col items-center text-center h-full"
      >
        <div className="relative flex justify-center w-full mb-5">
          <div className="absolute inset-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 
                         bg-gradient-to-br from-indigo-200/50 via-purple-200/50 to-pink-200/50 rounded-full blur-xl"></div>
          <img
            src={m.image}
            alt={m.name}
            className="w-36 h-36 rounded-full object-cover ring-[6px] ring-indigo-500/80 relative z-10 shadow-md"
          />
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mt-2">{m.name}</h3>
        <p className="text-sm text-gray-600 mt-1 leading-relaxed">{m.role}</p> 
      </div>
    </div>
  );

  // --- Main Render ---
  return (
    <section 
      id="mentors" 
      className="py-20 bg-gray-50 text-gray-900 rounded-2xl"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Get Mentorship
          </span>{" "}
          From Brightest Minds
        </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto">
            Connect with world-class advisors and mentors from IITs, IIMs, LSE, BCG and McKinsey alongside investors and accelerators with a global footprint.
          </p>
        </div>

        {/* Carousel Container: relative position for absolute arrows */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex overflow-x-scroll snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mentors.map((m, index) => (
              <MentorCard key={index} m={m} />
            ))}
          </div>

       
          {/* Previous Button */}
          <button
            onClick={goToPrev}
            className="cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2-ml-4 md:-ml-12 
                         p-3 rounded-full shadow-xl text-white border border-white
                        transition duration-300 z-20 
                        hidden md:flex items-center justify-center w-12 h-12 bg-blue-700" 
            aria-label="Previous mentor"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Button */}
          <button
            onClick={goToNext}
            className="cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2-mr-4 md:-mr-12 p-3 rounded-full shadow-xl text-white border border-white
                         hover:bg-indigo-800 transition duration-300 z-20
                        hidden md:flex items-center justify-center w-12 h-12 bg-blue-700"
            aria-label="Next mentor"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => slideToIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-indigo-600 w-8" : "bg-gray-400"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}