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
const mentors = [
  { name: "Saurav Kumar", role: "Founder Orion Eduverse, IIM Calcutta", image: saurav },
  { name: "Vivek KV", role: "IAS, IIM Calcutta", image: vivek },
  { name: "Dr. Ankur Shukla", role: "Prof. Finance & Strategy, Ph.D IIM Ranchi", image: ankur },
  { name: "Bhanu Pratap", role: "Co-founder at Mediversal HealthCare", image: bhanu },
  { name: "Jayant Gandhi", role: "Co-founder at Mediversal HealthCare", image: jayant },
  { name: "Ankur Mandal", role: "DoppleIQ, IIM Calcutta", image: mandal },
  { name: "Ashish Gupta", role: "Principal Product Manager, Microsoft, IIM Calcutta", image: ashishG },
  { name: "Jainendra Kumar", role: "Senior Dev. Engineer, Microsoft", image: jainendraK },
  { name: "Vivekananda Uppunda", role: "Co-founder Aayaama Technologies, Ex AWS, Motorola", image: vivekanandaU },
];

export default function MentorsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  // Keep cardsPerView state
  const [cardsPerView, setCardsPerView] = useState(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Detect screen size and set cards per view
  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      let newCardsPerView = 1;
      if (width >= 1024) {
        newCardsPerView = 3; // Desktop: 3 cards
      } else if (width >= 768) {
        newCardsPerView = 2; // Tablet: 2 cards
      }
      setCardsPerView(newCardsPerView);
      // Reset index to 0 when card view changes to prevent being stuck on a non-existent index
      setCurrentIndex(0); 
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const totalCards = mentors.length;
  // **NEW:** Calculate the total number of "pages" or slides needed
  const totalPages = Math.ceil(totalCards / cardsPerView);

  const slideToIndex = (index: number) => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    
    // Calculate the width of one "page" (cardsPerView * card width)
    // The total scrollable width divided by the number of total pages.
    const scrollablePageWidth = container.scrollWidth / totalPages;
    
    // Ensure index does not exceed totalPages - 1
    const newIndex = Math.max(0, Math.min(index, totalPages - 1));
    
    const scrollPosition = newIndex * scrollablePageWidth;

    container.scrollTo({ left: scrollPosition, behavior: "smooth" });
    setCurrentIndex(newIndex);
  };

  const goToPrev = () => {
    // Navigate to the previous page index
    const newIndex = currentIndex === 0 ? totalPages - 1 : currentIndex - 1;
    slideToIndex(newIndex);
  };

  const goToNext = () => {
    // Navigate to the next page index
    const newIndex = currentIndex === totalPages - 1 ? 0 : currentIndex + 1;
    slideToIndex(newIndex);
  };

  const MentorCard = ({ m }: { m: typeof mentors[0] }) => (
    // **IMPORTANT:** Added flex-basis and snap-align to make the carousel work correctly
    // flex-basis controls the width of the card.
    <div 
        className="cursor-pointer mentor-card flex-shrink-0 p-6 snap-start"
        style={{ flexBasis: `${100 / cardsPerView}%` }}
    >
      <div
        className="bg-gray-800 border border-gray-700 p-8 rounded-3xl shadow-lg
                     hover:shadow-2xl hover:scale-105 transition-all duration-300
                     flex flex-col items-center text-center h-full"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/40 to-purple-400/30 rounded-full blur-lg"></div>
          <img
            src={m.image}
            alt={m.name}
            className="w-36 h-36 rounded-full object-cover mb-5 ring-4 ring-indigo-500 relative z-10"
          />
        </div>
        <h3 className="text-xl font-semibold text-white mt-2">{m.name}</h3>
        <p className="text-sm text-indigo-300 mt-1">{m.role}</p>
      </div>
    </div>
  );

  return (
    <section id="mentors" className="py-20 bg-gray-900 text-gray-100 rounded-2xl">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Title Section */}
        <h2 className="text-3xl text-center sm:text-4xl font-bold text-white mb-3">
          <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Get Mentorship
          </span>{" "}
          From Brightest Minds
        </h2>
        <p className="text-lg sm:text-xl mb-12 text-center text-gray-300 max-w-3xl mx-auto">
          Connect with world-class advisors and mentors from IITs, IIMs, LSE, BCG and McKinsey alongside investors and accelerators with a global footprint.
        </p>

        {/* Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            // Removed overflow-x-hidden, added overflow-x-scroll to enable scrolling
            className="flex overflow-x-scroll snap-x snap-mandatory py-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {mentors.map((m, index) => (
              <MentorCard key={index} m={m} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrev}
            className="cursor-pointer absolute top-1/2 left-0 transform -translate-y-1/2 -ml-4 md:-ml-10
                         bg-indigo-600 p-3 rounded-full shadow-lg text-white
                         hover:bg-indigo-500 transition duration-300 z-20" // Increased z-index
            aria-label="Previous page"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={goToNext}
            className="cursor-pointer absolute top-1/2 right-0 transform -translate-y-1/2 -mr-4 md:-mr-10
                         bg-indigo-600 p-3 rounded-full shadow-lg text-white
                         hover:bg-indigo-500 transition duration-300 z-20" // Increased z-index
            aria-label="Next page"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Page Indicators */}
        <div className="flex justify-center mt-10 space-x-2">
          {/* Indicators are based on totalPages, not totalCards */}
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => slideToIndex(index)}
              className={`h-3 w-3 rounded-full transition-all duration-300 ${
                index === currentIndex ? "bg-indigo-500 w-8" : "bg-gray-600"
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}