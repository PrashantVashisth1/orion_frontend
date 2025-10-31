// import React from "react";
import Navbar from "../../components/StudentPostLoginNavbar";
import HeroSection from "../../components/MentorHeroSection";
import MentorSection from "../../components/MentorSection";
import Footer from "../../components/student-footer";

const MentorPage = () => {
  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar />
      <HeroSection />
      <MentorSection />
      <Footer />
    </div>
  );
};

export default MentorPage;
