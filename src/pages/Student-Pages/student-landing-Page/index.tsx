
import Navbar from "../../../components/Students-Components/student-navbar";
import Hero from "../../../components/Students-Components/student-hero";
import Footer from "../../../components/Students-Components/students-prelogin-footer";

import {
  Briefcase,
  GraduationCap,
  FlaskConical,
  Cpu,
  UserCheck,
  Wand2,
  Users,
  Rocket,
  Megaphone,
  Lightbulb,
  Puzzle,
  Trophy
} from "lucide-react";

// Images
import slive from "../../../assets/slive projects.png";
import internships from "../../../assets/internships.png";
import sresearch from "../../../assets/sResearch.png";
import iot from "../../../assets/iot.png";
import personality from "../../../assets/Personality.png";
import prompting from "../../../assets/prompt.png";
import sjoin from "../../../assets/s-joinstartup.png";
import sbuild from "../../../assets/sbuildstartup.png";
import spitch from "../../../assets/spitch.png";
import smentor from "../../../assets/smentor.png";
import sguest from "../../../assets/sguest.png";
import sproduct from "../../../assets/sproduct.png";
import shack from "../../../assets/shack.png";
import sidea from "../../../assets/sidea.png";
import splan from "../../../assets/s-b-plan.png";
import add1 from "../../../assets/add-1.png";
import add2 from "../../../assets/add-2.png";
import add3 from "../../../assets/add-3.png";

import SectionGrid from "../../../components/Students-Components/student-section-grid";

const sections = [
  {
    id: "experience",
    title: "Start your Corporate Experience",
    subtitle:
      "Step into a world of opportunities where learning meets real-world impact. Begin your journey toward growth, confidence, and career success.",
    items: [
      { title: "Live Projects", subtitle: "", img: slive, icon: <Briefcase size={20} /> },
      { title: "Internships", subtitle: "", img: internships, icon: <GraduationCap size={20} /> },
      { title: "Research", subtitle: "", img: sresearch, icon: <FlaskConical size={20} /> },
    ],
  },
  {
    id: "upskill",
    title: "Upskill with knowledge pool",
    subtitle: "Expand your skillset and stay ahead in a competitive world. Join a community where learning never stops and growth is constant.",
    items: [
      { title: "IOT Coursera", img: iot, icon: <Cpu size={20} /> },
      { title: "Personality", img: personality, icon: <UserCheck size={20} /> },
      { title: "Prompt Engineering", img: prompting, icon: <Wand2 size={20} /> },
    ],
  },
  {
    id: "startup",
    title: "Build your startup Business",
    subtitle: "Turn your ideas into impact with the right tools and guidance. Start strong, scale fast, and shape the future on your terms.",
    items: [
      { title: "Join a Startup", img: sjoin, icon: <Users size={20} /> },
      { title: "Build your Startup", img: sbuild, icon: <Rocket size={20} /> },
      { title: "Pitch to Startup", img: spitch, icon: <Megaphone size={20} /> },
    ],
  },
  {
    id: "learn",
    title: "Learn from the best",
    subtitle: "Gain insights from top industry leaders and experts. Accelerate your growth with real-world knowledge and mentorship.",
    items: [
      { title: "Mentorship", img: smentor, icon: <UserCheck size={20} /> },
      { title: "Guest Lecture", img: sguest, icon: <Megaphone size={20} /> },
      { title: "Product Demos", img: sproduct, icon: <Lightbulb size={20} /> },
    ],
  },
  {
    id: "compete",
    title: "Compete and win",
    subtitle: "Finish strong, unlock rewards, and celebrate your success. Every step you take brings you closer to victory.",
    items: [
      { title: "Hackathon", img: shack, icon: <Puzzle size={20} /> },
      { title: "Ideation", img: sidea, icon: <Lightbulb size={20} /> },
      { title: "B-Plan", img: splan, icon: <Trophy size={20} /> },
    ],
  },
];

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main className="max-w-6xl mx-auto px-6">
        <Hero />

        {sections.map((s) => (
          <SectionGrid key={s.id} {...s} />
        ))}

        <section className="py-16">
          <h2 className="text-4xl font-bold text-gray-900">
            Add value, Get recognized
          </h2>
          <p className="text-lg font-medium text-slate-600 max-w-3xl mt-3">
            Contribute to the platform's growth, foster quality engagement, earn rewards, and accelerate your career journey
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={add1} alt="hands" className="w-full h-56 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={add2} alt="team" className="w-full h-56 object-cover" />
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img src={add3} alt="celebrate" className="w-full h-56 object-cover" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
