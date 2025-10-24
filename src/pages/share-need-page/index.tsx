"use client";
import { useNeedsStore, createAndAddActivityPost } from "@/store/needsStore";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  X,
  Briefcase,
  Users,
  FlaskConical,
  Heart,
  Sparkles,
  ArrowRight,
  Upload,
  // Image as ImageIcon,
} from "lucide-react";
import Navbarpostlogin from "@/components/postlogincomponents/Navbarpostlogin";

// Function to create activity post from form data (for local display, not directly impacting backend)
// const createActivityPost = (formType, formData) => {
//   const getBadgeInfo = (type) => {
//     switch (type) {
//       case "live-projects":
//         return {
//           badge: "Project",
//           badgeColor:
//             "bg-violet-500/20 text-violet-400 border border-violet-500/30",
//         };
//       case "internship":
//         return {
//           badge: "Internship",
//           badgeColor: "bg-blue-500/20 text-blue-400 border border-blue-500/30",
//         };
//       case "research":
//         return {
//           badge: "Research",
//           badgeColor:
//             "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
//         };
//       case "csr-initiative":
//         return {
//           badge: "CSR",
//           badgeColor: "bg-rose-500/20 text-rose-400 border border-rose-500/30",
//         };
//       default:
//         return {
//           badge: "Opportunity",
//           badgeColor:
//             "bg-purple-500/20 text-purple-400 border border-purple-500/30",
//         };
//     }
//   };

//   const getAvatarColor = (type) => {
//     switch (type) {
//       case "live-projects":
//         return "bg-gradient-to-r from-violet-500 to-purple-600";
//       case "internship":
//         return "bg-gradient-to-r from-blue-500 to-cyan-600";
//       case "research":
//         return "bg-gradient-to-r from-emerald-500 to-teal-600";
//       case "csr-initiative":
//         return "bg-gradient-to-r from-rose-500 to-pink-600";
//       default:
//         return "bg-gradient-to-r from-purple-500 to-blue-600";
//     }
//   };

//   const getContent = (formType, data) => {
//     const companyName = data.companyName || "OrionEduverse";
//     const avatar = companyName.charAt(0).toUpperCase();

//     switch (formType) {
//       case "live-projects":
//         return `🚀 New Live Project Opportunity!\n\n📋 ${
//           data.projectTitle || "Project Title"
//         }\n\n${
//           data.projectDescription || "Project description"
//         }\n\n💼 Skills: ${
//           data.projectSkills || "Various skills"
//         }\n⏱️ Duration: ${
//           data.projectDuration || "Flexible"
//         }\n💰 Compensation: ${
//           data.projectCompensation || "Competitive"
//         }\n\nInterested? Apply now!`;

//       case "internship":
//         return `🎓 Internship Opportunity Available!\n\n📝 ${
//           data.jobTitle || "Internship Position"
//         }\n\n${
//           data.internshipDescription || "Internship description"
//         }\n\n🎯 Open For: ${data.openFor || "Students"}\n⏱️ Duration: ${
//           data.duration || "Flexible"
//         }\n💰 Stipend: ${
//           data.stipend || "Competitive"
//         }\n\nPerfect for students looking to gain real-world experience!`;

//       case "research":
//         return `🔬 Research Opportunity!\n\n📚 ${
//           data.researchTitle || "Research Project"
//         }\n\n${
//           data.researchDescription || "Research description"
//         }\n\n🎯 Open For: ${
//           data.researchOpenFor || "Researchers"
//         }\n⏱️ Duration: ${data.researchDuration || "Flexible"}\n💰 Stipend: ${
//           data.researchStipend || "Competitive"
//         }\n\nJoin us in pushing the boundaries of knowledge!`;

//       case "csr-initiative":
//         return `❤️ CSR Initiative - Make a Difference!\n\n🌱 ${
//           data.initiativeType || "Social Initiative"
//         }\n\n${data.csrDescription || "CSR description"}\n\n⏱️ Duration: ${
//           data.csrDuration || "Ongoing"
//         }\n👥 Team Size: ${data.members || "Flexible"}\n💰 Compensation: ${
//           data.csrCompensation || "Volunteer"
//         }\n\nHelp us create positive social impact!`;

//       default:
//         return `New opportunity posted by ${companyName}! Check it out and apply if interested.`;
//     }
//   };

//   const badgeInfo = getBadgeInfo(formType);

//   return {
//     id: `post-${Date.now()}`,
//     name: formData.companyName || "OrionEduverse",
//     avatar: (formData.companyName || "O").charAt(0).toUpperCase(),
//     avatarColor: getAvatarColor(formType),
//     badge: badgeInfo.badge,
//     badgeColor: badgeInfo.badgeColor,
//     timeAgo: "Just now",
//     content: getContent(formType, formData),
//     likes: 0,
//     comments: 0,
//     isFollowing: false,
//     image: formData.image || null,
//   };
// };

// Configuration for tabs
const TABS_CONFIG = [
  {
    id: "live-projects",
    label: "Live Projects",
    icon: Briefcase,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "internship",
    label: "Internship",
    icon: Users,
    color: "from-blue-500 to-cyan-600",
  },
  {
    id: "research",
    label: "Research",
    icon: FlaskConical,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "csr-initiative",
    label: "CSR Initiative",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
  },
];

// Animated background component
const AnimatedBackground = () => (
  <div className="fixed inset-0 overflow-hidden pointer-events-none">
    <div className="absolute -top-1/2 -left-1/2 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-pink-500/10 to-rose-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
    </div>
  </div>
);

import React, { type ReactNode } from 'react';
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";


interface FormFieldProps {
  label: string;
  id: string;
  children: ReactNode;
  isTextarea?: boolean;
  required?: boolean;
}

// Enhanced FormField component with floating labels
const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  children,
  // isTextarea = false,
  required = false,
}) => (
  <div className="relative group">
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-purple-500/50 relative z-10">
      <Label
        htmlFor={id}
        className="text-sm font-semibold text-gray-200 mb-3 flex items-center gap-2"
      >
        {label}
        {required && <span className="text-xs text-red-400">*</span>}
      </Label>
      {children}
    </div>
  </div>
);

// Enhanced Input component with better styling
const StyledInput = ({
  id,
  placeholder,
  icon: Icon,
  value,
  onChange,
  ...props
}) => (
  <div className="relative">
    {Icon && (
      <Icon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 z-20" />
    )}
    <Input
      id={id}
      name={id} // Add name attribute
      placeholder={placeholder}
      value={value} // Controlled component
      onChange={onChange} // Handle change
      className={`h-14 text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10 ${
        Icon ? "pl-12" : "pl-4"
      }`}
      {...props}
    />
  </div>
);

// Enhanced Textarea component
const StyledTextarea = ({ id, placeholder, value, onChange, ...props }) => (
  <Textarea
    id={id}
    name={id} // Add name attribute
    placeholder={placeholder}
    value={value} // Controlled component
    onChange={onChange} // Handle change
    className="h-[160px] text-base rounded-xl border-2 border-gray-600/50 focus:border-purple-500 focus:ring-0 transition-all duration-300 resize-none bg-gray-700/80 backdrop-blur-sm text-white placeholder-gray-400 relative z-10"
    {...props}
  />
);

// Enhanced Checkbox Group component
const CheckboxGroup = ({
  options,
  name,
  type = "checkbox",
  selectedValue,
  onChange,
  formData,
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {options.map((option) => (
          <div key={option.id} className="group">
            <div
              className="flex items-center space-x-3 bg-gradient-to-r from-gray-700/50 to-gray-800/50 p-4 rounded-xl border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-md cursor-pointer"
              onClick={() =>
                type === "radio" &&
                onChange({ target: { name, value: option.id } })
              }
            >
              {type === "radio" ? (
                <input
                  type="radio"
                  id={option.id}
                  name={name}
                  value={option.id}
                  checked={selectedValue === option.id}
                  onChange={() => {}} // Handled by onClick on parent div
                  className="w-5 h-5 text-purple-500 bg-gray-700 border-2 border-gray-500 focus:ring-purple-500 focus:ring-2"
                />
              ) : (
                <Checkbox
                  id={option.id}
                  checked={selectedValue && selectedValue.includes(option.id)} // For multiple checkboxes
                  onCheckedChange={(checked) => {
                    if (checked) {
                      onChange({
                        target: {
                          name,
                          value: [...(selectedValue || []), option.id],
                        },
                      });
                    } else {
                      onChange({
                        target: {
                          name,
                          value: (selectedValue || []).filter(
                            (item) => item !== option.id
                          ),
                        },
                      });
                    }
                  }}
                  className="border-2 border-gray-500 w-5 h-5 data-[state=checked]:bg-purple-500 data-[state=checked]:border-purple-500"
                />
              )}
              <Label
                htmlFor={option.id}
                className="text-sm font-medium text-gray-200 cursor-pointer flex-1"
              >
                {option.label}
              </Label>
            </div>
            {/* Conditional rendering for "Please specify" field for compensation/stipend */}
            {option.label.includes("Please specify") &&
              selectedValue === option.id && (
                <div className="mt-2 ml-8">
                  <StyledInput
                    id={`${name}Specify`} // This ID will be something like "projectCompensationSpecify"
                    name={`${name}Specify`} // This name will be "projectCompensationSpecify"
                    placeholder="Please specify amount"
                    className={`h-10 text-sm ${
                      selectedValue === option.id
                        ? "border-red-500 focus:border-red-500"
                        : ""
                    }`}
                    icon={undefined}
                    required={selectedValue === option.id}
                    value={formData[`${name}Specify`] || ""} // Access using the correct dynamic key
                    onChange={onChange}
                  />
                  {selectedValue === option.id && (
                    <p className="text-red-400 text-xs mt-1">
                      * Required when this option is selected
                    </p>
                  )}
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Enhanced Section Header component
const SectionHeader = ({
  icon: Icon,
  title,
  description,
  gradientFrom,
  gradientTo,
}) => (
  <div className="text-center mb-12 relative">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl blur-3xl"></div>
    <div className="relative">
      <div
        className={`w-20 h-20 bg-gradient-to-r ${gradientFrom} ${gradientTo} rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-white/20 rounded-3xl"></div>
        <Icon className="w-10 h-10 text-white relative z-10" />
        <Sparkles className="w-4 h-4 text-white/60 absolute top-2 right-2" />
      </div>
      <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-4">
        {title}
      </h2>
      <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </div>
  </div>
);

// Enhanced Submit Button component
const SubmitButton = ({ onClick, gradientFrom, gradientTo, emoji, text }) => (
  <div className="pt-8">
    <Button
      onClick={onClick}
      className={`w-full h-16 bg-gradient-to-r ${gradientFrom} ${gradientTo} hover:shadow-2xl text-white font-bold text-lg rounded-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] relative overflow-hidden group`}
    >
      <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
      <div className="relative z-10 flex items-center justify-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <span>{text}</span>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </Button>
  </div>
);

// Image Upload Component
const ImageUpload = ({
  label,
  id,
  required = false,
  onImageChange,
  previewUrl,
  setPreviewUrl,
}: {
  label: string;
  id: string;
  required?: boolean;
  onImageChange?: (data: any) => void;
  previewUrl: string | null;
  setPreviewUrl: (url: string | null) => void;
}) => {
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      if (onImageChange) {
        onImageChange({ file, url, id });
      }
    }
  };

  const handleRemoveImage = () => {
    setPreviewUrl(null);
    const fileInput = document.getElementById(id) as HTMLInputElement;
    if (fileInput) fileInput.value = "";
    if (onImageChange) {
      onImageChange({ file: null, url: null, id });
    }
  };

  return (
    <div className="space-y-3">
      <Label htmlFor={id} className="text-sm font-medium text-gray-200">
        {label} {required && <span className="text-red-400">*</span>}
      </Label>

      <div className="relative">
        {!previewUrl ? (
          <div className="border-2 border-dashed border-gray-600/50 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 cursor-pointer group">
            <input
              type="file"
              id={id}
              name={id}
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required={required}
            />
            <div className="space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full flex items-center justify-center mx-auto group-hover:from-purple-500/30 group-hover:to-blue-500/30 transition-all duration-300">
                <Upload className="w-8 h-8 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-300 font-medium">
                  Click to upload image
                </p>
                <p className="text-gray-400 text-sm">PNG, JPG, GIF up to 5MB</p>
              </div>
            </div>
          </div>
        ) : (
          <div className="relative">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-48 object-cover rounded-xl border border-gray-600/50"
            />
            <button
              type="button"
              onClick={handleRemoveImage}
              className="absolute top-2 right-2 w-8 h-8 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center transition-all duration-300"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Live Projects Form Component
const LiveProjectsForm = ({
  onSubmit,
  formData,
  handleChange,
  onImageUpload,
  previewUrl,
  setPreviewUrl,
}) => {
  const modeOptions = [
    { id: "online-project", label: "Online" },
    { id: "offline-project", label: "Offline" },
    { id: "hybrid-project", label: "Hybrid" },
  ];

  const compensationOptions = [
    { id: "unpaid-project", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    { id: "paid-above-6k", label: "Above ₹6,000/month - Please specify" },
  ];

  const extendableOptions = [
    { id: "project-extendable-yes", label: "Yes (Based on milestones)" },
    { id: "project-extendable-no", label: "No (Fixed scope)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Briefcase}
        title="Live Projects"
        description="Share your ongoing projects and find the right talent to collaborate. Connect with skilled professionals who can bring your vision to life."
        gradientFrom="from-violet-500"
        gradientTo="to-purple-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Project Title" id="projectTitle" required>
          <StyledInput
            id="projectTitle"
            placeholder="e.g., AI-Powered Customer Analytics Dashboard"
            icon={undefined}
            value={formData.projectTitle || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Project Description"
          id="projectDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="projectDescription"
            placeholder="Describe the project scope, objectives, technologies involved, expected deliverables, and timeline. Include details about the team structure and collaboration expectations."
            value={formData.projectDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        <ImageUpload
          label="Project Image/Poster"
          id="projectImage"
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Skills Required" id="projectSkills" required>
            <StyledInput
              id="projectSkills"
              placeholder="e.g., React, Node.js, Python, UI/UX Design"
              icon={undefined}
              value={formData.projectSkills || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Duration" id="projectDuration" required>
            <StyledInput
              id="projectDuration"
              placeholder="e.g., 2 months, 6 months, 1 year"
              icon={undefined}
              value={formData.projectDuration || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Mode of Work" id="projectMode">
          <CheckboxGroup
            options={modeOptions}
            name="projectMode"
            type="radio"
            selectedValue={formData.projectMode}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Team Size" id="projectTeamSize">
            <StyledInput
              id="projectTeamSize"
              placeholder="e.g., 3-5 developers, 10+ team members"
              icon={undefined}
              value={formData.projectTeamSize || ""}
              onChange={handleChange}
            />
          </FormField>
          {/* Location field as a simple input. Backend will use projectModeLocation if available, else projectLocation */}
          <FormField
            label="Location (e.g., Mumbai, Maharashtra, Remote/Online)"
            id="projectLocation"
          >
            <StyledInput
              id="projectLocation"
              placeholder="e.g., Mumbai, Maharashtra, Remote/Online"
              icon={undefined}
              value={formData.projectLocation || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Compensation" id="projectCompensation">
          <CheckboxGroup
            options={compensationOptions}
            name="projectCompensation"
            type="radio"
            selectedValue={formData.projectCompensation}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Project Extendable" id="projectExtendable">
          <CheckboxGroup
            options={extendableOptions}
            name="projectExtendable"
            type="radio"
            selectedValue={formData.projectExtendable}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="projectEmail" required>
            <StyledInput
              id="projectEmail"
              placeholder="e.g., project@company.com"
              type="email"
              icon={undefined}
              value={formData.projectEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="projectPhone" required>
            <StyledInput
              id="projectPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.projectPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Send your CV at" id="projectCvEmail" required>
          <StyledInput
            id="projectCvEmail"
            placeholder="e.g., careers@company.com, hr@company.com"
            type="email"
            icon={undefined}
            value={formData.projectCvEmail || ""}
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("live-projects")}
          gradientFrom="from-violet-600"
          gradientTo="to-purple-700"
          emoji="🚀"
          text="POST PROJECT"
        />
      </div>
    </div>
  );
};

// Internship Form Component
const InternshipForm = ({
  onSubmit,
  formData,
  handleChange,
  onImageUpload,
  previewUrl,
  setPreviewUrl,
}) => {
  const stipendOptions = [
    { id: "unpaid-internship", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-intern-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-intern-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    {
      id: "paid-intern-above-6k",
      label: "Above ₹6,000/month - Please specify",
    },
  ];

  const extendableOptions = [
    { id: "extendable-yes", label: "Yes (Based on performance)" },
    { id: "extendable-no", label: "No (Fixed duration)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Users}
        title="Internship Opportunities"
        description="Post internship opportunities and discover fresh talent for your organization. Build the next generation of professionals."
        gradientFrom="from-blue-500"
        gradientTo="to-cyan-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        {/* Maps to 'job_title' */}
        <FormField label="Job Title" id="job_title" required>
          <StyledInput
            id="job_title"
            placeholder="e.g., Frontend Developer Intern, Data Science Intern"
            icon={undefined}
            value={formData.job_title || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* Maps to 'description' */}
        <FormField label="Job Description" id="description" isTextarea required>
          <StyledTextarea
            id="description"
            placeholder="Detail the internship role, daily responsibilities, learning opportunities, mentorship provided, and what the intern will achieve by the end of the program."
            value={formData.description || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* This 'id' won't directly map to a SQL column, but its URL will go into details_json */}
        <ImageUpload
          label="Internship Poster"
          id="internship_image_url" // Renamed ID for clarity of what will be stored
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Maps to 'open_for' */}
          <FormField label="Open For" id="open_for">
            <StyledInput
              id="open_for"
              placeholder="e.g., Engineering students, MBA students"
              icon={undefined}
              value={formData.open_for || ""} // Access formData with the new key
              onChange={handleChange}
            />
          </FormField>
          {/* Maps to 'duration' */}
          <FormField label="Duration" id="duration" required>
            <StyledInput
              id="duration"
              placeholder="e.g., 3 months, 6 months, Summer internship"
              icon={undefined}
              value={formData.duration || ""} // Access formData with the new key
              onChange={handleChange}
            />
          </FormField>
        </div>

        {/* This 'stipend' selection will go into details_json */}
        <FormField label="Stipend" id="stipend">
          <CheckboxGroup
            options={stipendOptions}
            name="stipend"
            type="radio"
            selectedValue={formData.stipend}
            onChange={handleChange}
            formData={formData} // Keep existing formData for CheckboxGroup logic if needed
          />
        </FormField>

        {/* Maps to 'min_skills' */}
        <FormField label="Skills Required" id="min_skills">
          <StyledInput
            id="min_skills"
            placeholder="e.g., HTML/CSS, JavaScript basics, Communication skills"
            icon={undefined}
            value={formData.min_skills || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        {/* This 'extendable' selection will go into details_json */}
        <FormField label="Extendable" id="extendable">
          <CheckboxGroup
            options={extendableOptions}
            name="extendable"
            type="radio"
            selectedValue={formData.extendable}
            onChange={handleChange}
            formData={formData} // Keep existing formData for CheckboxGroup logic if needed
          />
        </FormField>

        {/* Maps to 'fulltime' */}
        <FormField label="Full-Time Opportunity" id="fulltime">
          <StyledInput
            id="fulltime"
            placeholder="e.g., Pre-placement offer available, Conversion based on performance"
            icon={undefined}
            value={formData.fulltime || ""} // Access formData with the new key
            onChange={handleChange}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* These will be combined into 'contact_intern' on the backend */}
          <FormField label="Email" id="contact_email" required>
            {" "}
            {/* Renamed for clarity */}
            <StyledInput
              id="contact_email"
              placeholder="e.g., hr@company.com"
              type="email"
              icon={undefined}
              value={formData.contact_email || ""} // Access formData with new key
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="contact_phone" required>
            {" "}
            {/* Renamed for clarity */}
            <StyledInput
              id="contact_phone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.contact_phone || ""} // Access formData with new key
              onChange={handleChange}
            />
          </FormField>
        </div>

        {/* This 'internship_cv_email' will go into details_json */}
        <FormField label="Send your CV at" id="internship_cv_email" required>
          {" "}
          {/* Renamed for clarity */}
          <StyledInput
            id="internship_cv_email"
            placeholder="e.g., careers@company.com, hr@company.com"
            type="email"
            icon={undefined}
            value={formData.internship_cv_email || ""} // Access formData with new key
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("internship")}
          gradientFrom="from-blue-600"
          gradientTo="to-cyan-700"
          emoji="💼"
          text="POST INTERNSHIP OPPORTUNITY"
        />
      </div>
    </div>
  );
};

// Research Form Component
const ResearchForm = ({
  onSubmit,
  formData,
  handleChange,
  onImageUpload,
  previewUrl,
  setPreviewUrl,
}) => {
  const stipendOptions = [
    { id: "unpaid-research", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-research-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-research-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    {
      id: "paid-research-above-6k",
      label: "Above ₹6,000/month - Please specify",
    },
  ];

  const extendableOptions = [
    { id: "research-extendable-yes", label: "Yes (Based on findings)" },
    { id: "research-extendable-no", label: "No (Fixed scope)" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={FlaskConical}
        title="Research Opportunities"
        description="Share research opportunities and connect with academic talent. Foster innovation and discovery in your field."
        gradientFrom="from-emerald-500"
        gradientTo="to-teal-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Research Title" id="researchTitle" required>
          <StyledInput
            id="researchTitle"
            placeholder="e.g., AI in Healthcare: Predictive Analytics Study"
            icon={undefined}
            value={formData.researchTitle || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Research Description"
          id="researchDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="researchDescription"
            placeholder="Describe the research objectives, methodology, expected outcomes, and how researchers will contribute. Include the problem statement and research questions."
            value={formData.researchDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        <ImageUpload
          label="Research Poster"
          id="researchImage"
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Open For" id="researchOpenFor">
            <StyledInput
              id="researchOpenFor"
              placeholder="e.g., Masters students, PhD candidates, Postdocs"
              icon={undefined}
              value={formData.researchOpenFor || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Duration" id="researchDuration" required>
            <StyledInput
              id="researchDuration"
              placeholder="e.g., 6 months, 1 year, 2-3 years (PhD)"
              icon={undefined}
              value={formData.researchDuration || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Stipend" id="researchStipend">
          <CheckboxGroup
            options={stipendOptions}
            name="researchStipend"
            type="radio"
            selectedValue={formData.researchStipend}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Skills Required" id="researchSkills">
          <StyledInput
            id="researchSkills"
            placeholder="e.g., Python/R, Statistical analysis, Literature review"
            icon={undefined}
            value={formData.researchSkills || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField label="Extendable" id="researchExtendable">
          <CheckboxGroup
            options={extendableOptions}
            name="researchExtendable"
            type="radio"
            selectedValue={formData.researchExtendable}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="researchEmail" required>
            <StyledInput
              id="researchEmail"
              placeholder="e.g., prof.smith@university.edu"
              type="email"
              icon={undefined}
              value={formData.researchEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="researchPhone" required>
            <StyledInput
              id="researchPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.researchPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Send your CV at" id="researchCvEmail" required>
          <StyledInput
            id="researchCvEmail"
            placeholder="e.g., research@university.edu, prof.smith@university.edu"
            type="email"
            icon={undefined}
            value={formData.researchCvEmail || ""}
            onChange={handleChange}
          />
        </FormField>

        <SubmitButton
          onClick={() => onSubmit("research")}
          gradientFrom="from-emerald-600"
          gradientTo="to-teal-700"
          emoji="🔬"
          text="POST RESEARCH OPPORTUNITY"
        />
      </div>
    </div>
  );
};

// CSR Initiative Form Component
const CSRForm = ({
  onSubmit,
  formData,
  handleChange,
  onImageUpload,
  previewUrl,
  setPreviewUrl,
}) => {
  const modeOptions = [
    { id: "online-csr", label: "Online" },
    { id: "offline-csr", label: "Offline" },
    { id: "hybrid-csr", label: "Hybrid" },
  ];

  const stipendOptions = [
    { id: "unpaid-csr", label: "Unpaid (Certificate + LOR)" },
    { id: "paid-csr-1-3k", label: "Paid (₹100 - ₹3,000)" },
    { id: "paid-csr-3-6k", label: "Paid (₹3,000 - ₹6,000)" },
    { id: "paid-csr-above-6k", label: "Above ₹6,000/month - Please specify" },
  ];

  return (
    <div className="px-6 sm:px-12 py-12">
      <SectionHeader
        icon={Heart}
        title="CSR Initiative"
        description="Create meaningful social impact through corporate social responsibility programs. Make a difference in communities and society."
        gradientFrom="from-rose-500"
        gradientTo="to-pink-600"
      />

      <div className="max-w-5xl mx-auto space-y-8">
        <FormField label="Initiative Type" id="initiativeType" required>
          <StyledInput
            id="initiativeType"
            placeholder="e.g., Education Support, Environmental Conservation, Healthcare Access"
            icon={undefined}
            value={formData.initiativeType || ""}
            onChange={handleChange}
          />
        </FormField>

        <FormField
          label="Initiative Description"
          id="csrDescription"
          isTextarea
          required
        >
          <StyledTextarea
            id="csrDescription"
            placeholder="Describe the social impact initiative, target beneficiaries, expected outcomes, and how volunteers will contribute. Include the problem being addressed and the solution approach."
            value={formData.csrDescription || ""}
            onChange={handleChange}
          />
        </FormField>

        <ImageUpload
          label="CSR Poster"
          id="csrImage"
          onImageChange={onImageUpload}
          previewUrl={previewUrl}
          setPreviewUrl={setPreviewUrl}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Duration" id="csrDuration" required>
            <StyledInput
              id="csrDuration"
              placeholder="e.g., 3 months, 6 months, Ongoing program"
              icon={undefined}
              value={formData.csrDuration || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Team Size" id="members">
            <StyledInput
              id="members"
              placeholder="e.g., 5-10 volunteers, 20+ team members"
              icon={undefined}
              value={formData.members || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <FormField label="Mode of Work" id="mode">
          <CheckboxGroup
            options={modeOptions}
            name="mode"
            type="radio"
            selectedValue={formData.mode}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <FormField label="Stipend" id="csrStipend">
          <CheckboxGroup
            options={stipendOptions}
            name="csrStipend"
            type="radio"
            selectedValue={formData.csrStipend}
            onChange={handleChange}
            formData={formData}
          />
        </FormField>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Compensation (Free Text)" id="csrCompensation">
            <StyledInput
              id="csrCompensation"
              placeholder="e.g., Travel reimbursement, Meals provided, Certificate"
              icon={undefined}
              value={formData.csrCompensation || ""}
              onChange={handleChange}
            />
          </FormField>
          {/* Location field as a simple input. Backend will use modeLocation if available, else location */}
          <FormField label="Location (e.g., City, State, Remote)" id="location">
            <StyledInput
              id="location"
              placeholder="e.g., Mumbai, Maharashtra, Remote/Online"
              icon={undefined}
              value={formData.location || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <FormField label="Email" id="csrEmail" required>
            <StyledInput
              id="csrEmail"
              placeholder="e.g., csr@company.com"
              type="email"
              icon={undefined}
              value={formData.csrEmail || ""}
              onChange={handleChange}
            />
          </FormField>
          <FormField label="Phone Number" id="csrPhone" required>
            <StyledInput
              id="csrPhone"
              placeholder="e.g., +91-9876543210"
              type="tel"
              icon={undefined}
              value={formData.csrPhone || ""}
              onChange={handleChange}
            />
          </FormField>
        </div>

        <SubmitButton
          onClick={() => onSubmit("csr-initiative")}
          gradientFrom="from-rose-600"
          gradientTo="to-pink-700"
          emoji="❤️"
          text="POST CSR INITIATIVE"
        />
      </div>
    </div>
  );
};

// Enhanced Main Header Component
const MainHeader = ({ activeTab, onTabChange }) => (
  
  <CardHeader className="relative p-0 m-0 overflow-hidden">
    <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative z-10 flex items-center justify-between px-8 py-8">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 bg-gradient-to-r from-violet-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl">
            <Briefcase className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white flex items-center gap-2">
              Share your Needs
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </h1>
            <p className="text-purple-200 text-lg">
              Post opportunities and connect with talent
            </p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="text-white hover:bg-white/20 rounded-xl h-12 w-12"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>

      {/* Enhanced Tab Navigation */}
      <div className="flex border-t border-white/20 bg-black/20 backdrop-blur-sm">
        {TABS_CONFIG.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex-1 px-6 py-5 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 relative overflow-hidden group ${
                activeTab === tab.id
                  ? "bg-white text-gray-900 shadow-lg"
                  : "text-white/90 hover:bg-white/15 hover:text-white"
              }`}
            >
              {activeTab === tab.id && (
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-10`}
                ></div>
              )}
              <div className="relative z-10 flex items-center space-x-2">
                <IconComponent className="w-4 h-4" />
                <span>{tab.label}</span>
              </div>
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-600"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  </CardHeader>
);


export default function EnhancedShareNeedsForm() {
  const [activeTab, setActiveTab] = useState("live-projects");
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [uploadedImages, setUploadedImages] = useState<
    Record<string, string | null>
  >({});
  const navigate = useNavigate();

  // Add Zustand store
  const {  setSubmitting, addBackendNeed, setError } =
    useNeedsStore();

  // Reset form data and image previews when the active tab changes
  useEffect(() => {
    setFormData({});
    setUploadedImages({});
  }, [activeTab]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | { target: { name: string; value: any } }
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = (imageData: {
    file: File | null;
    url: string | null;
    id: string;
  }) => {
    setUploadedImages((prev) => ({
      ...prev,
      [imageData.id]: imageData.url,
    }));

    const formTypePrefix = activeTab
      .split("-")
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
      .join("");
    const backendImageKey = `${formTypePrefix}Image`;

    setFormData((prev) => ({
      ...prev,
      [backendImageKey]: imageData.url,
    }));
  };

  // Updated handleSubmit function using Zustand instead of localStorage
  const handleSubmit = async (formType: string) => {
    console.log(`Submitting ${formType} form`);
    
    

    const finalFormData = { ...formData, companyName: "OrionEduverse" };

    console.log("Form Data to send to backend:", finalFormData);
    const token = localStorage.getItem("token");
    console.log("Authorization Token:", token);

    // Set submitting state
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE}/api/needs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token && { Authorization: `Bearer ${token}` }),
        },
        body: JSON.stringify({
          formType,
          formData: finalFormData,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        // console.log("Backend response:", result);

        // Success! Now use Zustand instead of localStorage

        // 1. Add to backend needs store (if you have the complete need object)
        if (result.data && result.data.need) {
          addBackendNeed(result.data.need);
        }

        // 2. Create and add activity post using Zustand store
        createAndAddActivityPost(formType, finalFormData);

        // Success feedback
        toast.success(`${formType.replace("-", " ").toUpperCase()} posted successfully!`);
        navigate("/view-needs");
        

        // Clear form
        setFormData({});
        setUploadedImages({});
      } else {
        const errorData = await response.json();
        console.error(
          "Failed to send data to backend:",
          response.status,
          errorData
        );
        setError(errorData.message || response.statusText);
        toast.error(`Error: ${errorData.message || response.statusText}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError(
        "An unexpected error occurred. Please check your internet connection and try again."
      );
      alert(
        "An unexpected error occurred. Please check your internet connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const renderActiveForm = () => {
    const commonProps = {
      onSubmit: handleSubmit,
      formData: formData,
      handleChange: handleChange,
      onImageUpload: handleImageUpload,
      // The image `id` (e.g., 'projectImage') is used for local preview state (`uploadedImages`).
      // The `handleImageUpload` function then handles converting this to the backend's expected key for `formData`.
      previewUrl: uploadedImages[`${activeTab}Image`] || null,
      setPreviewUrl: (url: string | null) =>
        handleImageUpload({ file: null, url: url, id: `${activeTab}Image` }),
    };

    switch (activeTab) {
      case "live-projects":
        return <LiveProjectsForm {...commonProps} />;
      case "internship":
        return <InternshipForm {...commonProps} />;
      case "research":
        return <ResearchForm {...commonProps} />;
      case "csr-initiative":
        return <CSRForm {...commonProps} />;
      default:
        return <LiveProjectsForm {...commonProps} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900 relative font-inter">
      <AnimatedBackground />
      <Navbarpostlogin />
      <div className="relative z-10 p-6 px-[450px] py-[60px]">
        <div className="mx-auto max-w-7xl">
          <Card className="overflow-hidden shadow-2xl border-0 bg-gray-800/90 backdrop-blur-lg border-gray-700/50 relative z-20 rounded-xl">
            <MainHeader activeTab={activeTab} onTabChange={setActiveTab} />
            <CardContent className="p-0 bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-sm relative z-30 overflow-hidden">
              {renderActiveForm()}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

