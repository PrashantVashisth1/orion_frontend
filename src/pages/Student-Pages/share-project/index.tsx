
import headerImage1 from '../../../assets/add-1.png'; 
import headerImage2 from '../../../assets/add-2.png';
import headerImage3 from '../../../assets/add-3.png';
import Navbar from '@/components/Students-Components/StudentPostLoginNavbar';
import Footer from '@/components/Students-Components/student-footer'

import React, { useState } from 'react';

// --- Interface Definitions ---

interface PostProps {
  type: 'project' | 'idea';
  problem: string;
  solution: string;
  title: string;
}

interface SubmissionFormProps {
  type: 'project' | 'idea';
}

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: 'project' | 'idea';
}

// --- Component: PostCard ---

const PostCard: React.FC<PostProps> = ({ type, problem, solution, title }) => {
  const isIdea = type === 'idea';
  const solutionBgColorClass = isIdea ? 'bg-blue-50' : 'bg-purple-50';
  const solutionTextColorClass = isIdea ? 'text-blue-800' : 'text-purple-800';

  return (
    <div className="bg-white rounded-xl shadow-lg p-5 mb-4 border border-gray-200">
      <h3 className="font-bold text-xl text-gray-900 mb-2">{title}</h3>
      <div className="text-sm mb-3">
        <p className="font-semibold text-gray-700">Problem: </p>
        <p className="text-gray-600">{problem}</p>
      </div>
      <div className={`text-sm p-3 rounded-lg ${solutionBgColorClass} mb-3`}>
        <p className={`font-semibold ${solutionTextColorClass}`}>Solution: </p>
        <p className={`${solutionTextColorClass}`}>{solution}</p>
      </div>
      <div className="flex items-center justify-between text-gray-500 text-sm">
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {/* Heart Icon */}
            <svg className="w-4 h-4 mr-1 text-red-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
            </svg>
            124
          </div>
          <div className="flex items-center">
            {/* Comment Icon */}
            <svg className="w-4 h-4 mr-1 text-blue-400" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 12H5v-2h14v2zm0-3H5V7h14v2z"></path>
            </svg>
            13
          </div>
        </div>
        <a href="#" className="text-blue-600 font-medium hover:text-blue-800 transition duration-200">...read more</a>
      </div>
    </div>
  );
};

// --- Component: SubmissionForm (Replicated from Images) ---

const SubmissionForm: React.FC<SubmissionFormProps> = ({ type }) => {
  const isIdea = type === 'idea';
  const titleText = isIdea ? 'Idea Title' : 'Project Title';
  const problemPlaceholder = isIdea ? 'What issue does the idea address?' : 'What issue does the project address?';
  const solutionPlaceholder = isIdea ? 'How the idea solves the problem?' : 'How the project solves the problem?';

  const formFields = [
    { label: titleText, placeholder: titleText },
    { label: 'Problem', placeholder: problemPlaceholder },
    { label: 'Solution', placeholder: solutionPlaceholder },
    { label: 'Key Features', placeholder: 'List main functionalities/achievements' },
    { label: 'Tools Used', placeholder: 'What were the building blocks used - software/hardware e.t.c?' },
    { label: 'Team Members', placeholder: 'Tag your team members' },
    { label: 'Applicable Industries', placeholder: 'Choose industries where your idea can be applied' },
  ];

  return (
    <div className="p-8">
      {/* Form Fields Section */}
      <div className="space-y-6">
        {formFields.map((field, index) => (
          <div key={index}>
            <label className="block text-gray-700 font-semibold mb-1">
              {field.label}
            </label>
            <input
              type="text"
              placeholder={field.placeholder}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 transition duration-150"
            />
          </div>
        ))}
      </div>

      {/* Advance Fields Section */}
      <div className="mt-10 p-6 bg-blue-100 rounded-xl">
        <h3 className="text-xl font-bold text-blue-900 mb-4">Advance Fields</h3>
        <div className="space-y-3 text-lg text-blue-800">
          {['Looking for a co-founder?', 'Looking for team?', 'Looking for mentor?', 'Looking for investment?'].map((item, index) => (
            <div key={index} className="flex items-center">
              <input
                id={`adv-field-${index}`}
                type="checkbox"
                className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor={`adv-field-${index}`} className="ml-3">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Component: SubmissionModal (The Pop-up) ---

const SubmissionModal: React.FC<SubmissionModalProps> = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  return (
    // Backdrop
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full mx-auto transform transition-all duration-300 scale-100">
        
        {/* Modal Header */}
        <div className={`p-5 rounded-t-xl text-white ${type === 'idea' ? 'bg-blue-600' : 'bg-purple-600'}`}>
          <h2 className="text-2xl font-bold">{type === 'idea' ? 'Share Idea' : 'Share Project'}</h2>
        </div>

        {/* Modal Body: Form */}
        <div className="max-h-[70vh] overflow-y-auto">
          <SubmissionForm type={type} />
        </div>

        {/* Modal Footer: Buttons */}
        <div className="p-5 border-t border-gray-200 flex justify-center space-x-4 rounded-b-xl">
          <button
            onClick={onClose}
            className="px-6 py-3 font-semibold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-150"
          >
            Cancel
          </button>
          <button
            className={`px-6 py-3 font-semibold text-white rounded-lg transition duration-150 ${type === 'idea' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-purple-600 hover:bg-purple-700'}`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Component: App (Main Page) ---

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'projects' | 'ideas'>('projects');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // FIX: Convert the plural 'activeTab' type to the singular type required by the modal.
  const modalType: 'project' | 'idea' = activeTab === 'projects' ? 'project' : 'idea';

  const projectPosts: PostProps[] = [
    { type: 'project', title: 'A method to distill sea water utilizing 50% less fuel', problem: 'Sea water desalination takes a lot of energy to become suitable for drinking.', solution: 'We use reverse osmosis using solar energy and patentable technology that consumes 50% less energy.' },
    { type: 'project', title: 'Efficient Waste-to-Energy Conversion System', problem: 'Accumulation of non-recyclable waste leading to landfill expansion and environmental pollution.', solution: 'Implementing a pyrolysis-based system to convert mixed solid waste into syngas and biochar, significantly reducing landfill volume and generating clean energy.' },
    { type: 'project', title: 'Precision Agriculture with Drone Technology', problem: 'Inefficient resource use (water, fertilizers) and difficulty in monitoring crop health across large farms.', solution: 'Utilizing AI-powered drones for high-resolution imaging and multispectral analysis to detect crop stress early and optimize irrigation and fertilization, leading to increased yields and reduced costs.' },
    { type: 'project', title: 'Sustainable Urban Mobility Network', problem: 'Traffic congestion, air pollution, and limited access to public transport in urban areas.', solution: 'Developing an integrated network of electric autonomous shuttles, smart bike-sharing, and demand-responsive transit, managed by an AI-optimized routing system to enhance efficiency and reduce emissions.' },
  ];

  const ideaPosts: PostProps[] = [
    { type: 'idea', title: 'Modular AI-Powered Cloud Seeding System', problem: 'Limited access to fresh water in arid regions.', solution: 'Develop a modular, AI-powered system for cloud seeding that adapts to local weather patterns for increased rainfall.' },
    { type: 'idea', title: 'Bio-Inspired Passive Cooling Systems', problem: 'High energy consumption of traditional air conditioning.', solution: 'Explore passive cooling systems inspired by termite mounds, combined with smart materials for thermal regulation.' },
    { type: 'idea', title: 'Blockchain for Food Waste Learning', problem: 'Food waste in supply chains.', solution: 'Create a blockchain-based platform for real-time tracking of produce, enabling dynamic pricing and redistribution to reduce waste.' },
    { type: 'idea', title: 'Adaptive Learning with VR/AR Integration', problem: 'Lack of personalized learning experiences in education.', solution: 'Utilize adaptive learning algorithms with VR/AR integration to create immersive, customized educational modules for students.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <Navbar/>
      {/* Submission Modal */}
      <SubmissionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        type={modalType} // Passing the corrected singular type
      />

      {/* Header Section */}
      <div className="relative bg-white pt-10 pb-20 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Nav/Icons */}
          <div className="flex justify-between items-center mb-10">
            <div className="flex space-x-1 pt-2">
              <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
              <span className="block w-2 h-2 bg-gray-300 rounded-full"></span>
            </div>
            {/* <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
              JD
            </div> */}
          </div>

          <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
            <div className="md:w-1/2 text-left mb-8 md:mb-0">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
                Share {activeTab === 'projects' ? 'Project' : 'Idea'}
              </h1>
              <p className="text-gray-600 leading-relaxed max-w-md">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
            
            {/* Asymmetric Image Layout */}
            <div className="md:w-1/2 flex justify-center md:justify-end h-64 md:h-72">
              <div className="relative w-full max-w-sm h-full hidden sm:block">
                <img
                  src={headerImage1}
                  alt="Team collaborating"
                  className="absolute right-0 top-0 w-48 h-48 object-cover rounded-xl shadow-xl z-20"
                />
                <img
                  src={headerImage2}
                  alt="People giving high five"
                  className="absolute left-0 top-10 w-40 h-28 object-cover rounded-xl shadow-lg z-10"
                />
                <img
                  src={headerImage3}
                  alt="Man presenting on laptop"
                  className="absolute left-10 bottom-0 w-32 h-32 object-cover rounded-xl shadow-md z-0"
                />
                <div className="absolute right-4 top-20 flex flex-col space-y-1 z-30">
                  <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                  <span className="block w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
                </div>
              </div>
              <div className="sm:hidden">
                <div className="grid grid-cols-2 gap-4 max-w-xs">
                  <img src={headerImage1} alt="Team collaborating" className="w-full h-24 object-cover rounded-lg shadow-md col-span-2" />
                  <img src={headerImage2} alt="People giving high five" className="w-full h-24 object-cover rounded-lg shadow-md" />
                  <img src={headerImage3} alt="Man presenting on laptop" className="w-full h-24 object-cover rounded-lg shadow-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-300 mb-8 justify-evenly">
          <button
            className={`py-3 px-6 text-lg font-medium transition duration-200 border-b-4 ${
              activeTab === 'projects' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('projects')}
          >
            Projects
          </button>
          <button
            className={`py-3 px-6 text-lg font-medium transition duration-200 border-b-4 ${
              activeTab === 'ideas' 
                ? 'border-blue-600 text-blue-600' 
                : 'border-transparent text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab('ideas')}
          >
            Ideas
          </button>
        </div>

        {/* Upload Section */}
        <div className="bg-gray-200 p-8 rounded-lg text-center mb-10">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Got {activeTab === 'projects' ? 'a Project' : 'an Idea'} in Mind?
          </h2>
          <p className="text-gray-600 mb-5">
            Share your {activeTab === 'projects' ? 'project' : 'idea'} to collaborate with the community
          </p>
          <button 
            onClick={() => setIsModalOpen(true)} // Opens the modal
            className="bg-blue-500 text-white font-medium py-2 px-6 rounded-md hover:bg-blue-600 transition duration-300 shadow-md"
          >
            Upload {activeTab === 'projects' ? 'Project' : 'Idea'}
          </button>
        </div>

        {/* Posts Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {activeTab === 'projects'
            ? projectPosts.map((post, index) => <PostCard key={index} {...post} />)
            : ideaPosts.map((post, index) => <PostCard key={index} {...post} />)}
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default App;