// import React from "react";
import Navbar from "../../../components/Students-Components/StudentPostLoginNavbar";
import HeroSection from "../../../components/Students-Components/MentorHeroSection";
import MentorSection from "../../../components/Students-Components/MentorSection";
import Footer from "../../../components/Students-Components/student-footer";

const MentorPage = () => {
  return (
    <div className="font-sans bg-white text-gray-900">
      <Navbar onSidebarToggle={false} />
      <HeroSection />
      <MentorSection />
      <Footer />
    </div>
  );
};

export default MentorPage;
