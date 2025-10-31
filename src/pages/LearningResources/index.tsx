import React, { useState } from "react";
import Navbar from "../../components/StudentPostLoginNavbar";
import Footer from "../../components/student-footer";
import courses from "../../assets/courses.jpg";
import ai from "../../assets/courses.jpg";
import python from "../../assets/courses.jpg";
import marketing from "../../assets/courses.jpg";
import { Download } from "lucide-react";

interface Resource {
  title: string;
  author: string;
  rating: number;
  image: string;
}
const platformResources: Resource[] = [
  { title: "Learn Basics of AI", author: "Sahith Shetty", rating: 4.5, image: ai },
  { title: "Basics of Python", author: "Sahith Shetty", rating: 5, image: python },
  { title: "Introduction to Data Science", author: "Sahith Shetty", rating: 4.8, image: courses },
  { title: "Web Development Bootcamp", author: "Riya Patel", rating: 4.7, image: courses },
  { title: "Mastering Machine Learning", author: "Arjun Rao", rating: 4.9, image: ai },
  { title: "Cloud Computing Fundamentals", author: "Meera Nair", rating: 4.6, image: courses },
  { title: "React + TypeScript Complete Guide", author: "Sahith Shetty", rating: 4.8, image: python },
  { title: "Cybersecurity for Beginners", author: "Karthik Sharma", rating: 4.7, image: courses },
];

const communityResources: Resource[] = [
  { title: "Community Project: Chatbot with Python", author: "Ravi Menon", rating: 4.7, image: python },
  { title: "Collaborative AI Research", author: "Aarav Nair", rating: 4.9, image: ai },
  { title: "Open Source UI Design Kit", author: "Meera Shah", rating: 4.6, image: courses },
  { title: "Blockchain for Social Impact", author: "Tanishq Agarwal", rating: 4.8, image: ai },
  { title: "Community Web App Showcase", author: "Neha Verma", rating: 4.5, image: python },
  { title: "IoT Automation Project", author: "Ananya Gupta", rating: 4.7, image: courses },
  { title: "Data Visualization Dashboard", author: "Vikram Sethi", rating: 4.9, image: courses },
];

const mentorResources: Resource[] = [
  { title: "Advanced AI Applications", author: "Mentor: Dr. Rakesh", rating: 5, image: ai },
  { title: "Python for Data Analytics", author: "Mentor: Priya Sharma", rating: 4.8, image: python },
  { title: "Digital Marketing Course", author: "Mentor: Sanjay Rao", rating: 4.9, image: marketing },
  { title: "Full Stack Web Development", author: "Mentor: Nisha Mehta", rating: 4.8, image: courses },
  { title: "Career Prep: Interview Skills", author: "Mentor: Dr. Vivek Raj", rating: 4.6, image: courses },
  { title: "Project Management Essentials", author: "Mentor: Sneha Iyer", rating: 4.7, image: courses },
  { title: "Ethical Hacking for Professionals", author: "Mentor: Rohit Singh", rating: 4.8, image: python },
  { title: "AI-Powered Automation", author: "Mentor: Dr. Kavita Das", rating: 4.9, image: ai },
];

const LearningResource: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"platform" | "community" | "mentor">("platform");

  const renderResources = (data: Resource[]) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
      {data.map((res, i) => (
        <div
  key={i}
  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
>
  <div className="relative">
    <img src={res.image} alt={res.title} className="w-full h-48 object-cover" />
  </div>

  <div className="p-5 flex flex-col h-full justify-between">
    <div className="flex justify-between items-start">
      <div>
        <h3 className="font-semibold text-lg text-gray-900">{res.title}</h3>
        <p className="text-sm text-gray-600 mt-1 flex items-center gap-1">
          ⭐ {res.rating} • Posted by {res.author}
        </p>
      </div>
      <button
        className="text-gray-500 hover:text-blue-600 transition ml-3"
        title="Download Resource"
      >
        <Download className="w-8 h-8 cursor-pointer text-gray-700 hover:text-blue-600 transition" />
      </button>
    </div>
  </div>
</div>

      ))}
    </div>
  );

  const renderProjectSection = (text: string) => {
  const handleFileUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.docx,.pptx,.zip,.rar,.jpg,.png"; // customize accepted file types if needed
    input.onchange = (event: any) => {
      const file = event.target.files?.[0];
      if (file) {
        console.log("Selected file:", file.name);
        // TODO: you can later send it to backend or handle upload logic here
      }
    };
    input.click(); // ✅ this opens the file explorer
  };

  return (
    <div className="bg-gray-100 rounded-2xl p-14 text-center mb-12 shadow-inner">
      <h3 className="text-3xl font-semibold mb-3 text-gray-800">
        Got a Project in Mind?
      </h3>
      <p className="text-gray-600 mb-6 text-lg">{text}</p>
      <button
        onClick={handleFileUpload}
        className="bg-gray-900 cursor-pointer text-white px-8 py-3 rounded-md text-lg hover:bg-gray-700 transition"
      >
        Upload Project
      </button>
    </div>
  );
};


  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900">
      <Navbar />

      <main className="flex-grow px-6 md:px-12 lg:px-20 py-10">
        {/* <h2 className="text-3xl font-semibold text-center mb-10">Learning Resource</h2> */}

        {/* Tabs */}
        <div className="flex justify-center gap-10 mb-8 relative">
          {[
            { key: "platform", label: "By Orion Platform" },
            { key: "community", label: "By Community" },
            { key: "mentor", label: "By Mentor" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`relative cursor-pointer font-medium pb-2 bg-transparent border-none outline-none focus:outline-none focus:ring-0 transition-all duration-300 ${
                activeTab === tab.key
                  ? "text-blue-700 text-[15px] after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-blue-700"
                  : "text-gray-500 hover:text-blue-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="border-b border-gray-300 mb-10" />

        {activeTab === "platform" && <section>{renderResources(platformResources)}</section>}

        {activeTab === "community" && (
          <section>
            {renderProjectSection("Share your project to collaborate with the community")}
            {renderResources(communityResources)}
          </section>
        )}

        {activeTab === "mentor" && (
          <section>
            {renderProjectSection("Share your project to collaborate with mentors")}
            {renderResources(mentorResources)}
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default LearningResource;
