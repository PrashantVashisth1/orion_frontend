// // src/types/student.ts

// export interface StudentPersonalInfo {
//   firstName: string;
//   lastName?: string;
//   headline?: string;
//   phone: string;
//   gender?: string;
//   dateOfBirth?: string;
//   location: string;
// }

// export interface EducationRecord {
//   id?: number;
//   institutionName: string;
//   degreeQualification: string;
//   fieldOfStudy: string;
//   gradeCgpa?: string;
//   startDate: string;
//   endDate?: string;
// }

// export interface WorkExperience {
//   id?: number;
//   companyName: string;
//   jobTitle: string;
//   startDate: string;
//   endDate?: string;
//   location: string;
//   description?: string;
// }

// export interface StudentProfile {
//   id: number;
//   userId: number;
//   isComplete: boolean;
//   completionPercentage: number;
//   personalInfo?: StudentPersonalInfo;
//   educationRecords?: EducationRecord[];
//   workExperiences?: WorkExperience[];
//   skillsInfo?: StudentSkills;
//   createdAt: string;
//   updatedAt: string;
// }

// export interface StudentProfileResponse {
//   success: boolean;
//   data: StudentProfile;
//   message?: string;
// }

// // types/student.ts

// export interface CertificateRecord {
//   id?: number;
//   studentSkillsId?: number;
//   certificateName: string;
//   issuingOrganization?: string;
//   issueDate?: string;
//   credentialId?: string;
//   credentialUrl?: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// export interface StudentSkills {
//   id?: number;
//   studentProfileId?: number;
//   selectedSkills: string[];
//   certificates?: CertificateRecord[];
//   createdAt?: string;
//   updatedAt?: string;
// }

// // Dedicated type for skills updates (certificates optional)
// export interface StudentSkillsUpdatePayload {
//   selectedSkills: string[];
//   certificates?: CertificateRecord[];
// }

// export type UpdateSectionPayload = 
//   | { section: 'personal-info'; data: Partial<StudentPersonalInfo> }
//   | { section: 'skills'; data: StudentSkillsUpdatePayload }
//   | { section: 'education'; data: Partial<EducationRecord> }
//   | { section: 'work-experience'; data: Partial<WorkExperience> };


// export interface AddEducationPayload {
//   institutionName: string;
//   degreeQualification: string;
//   fieldOfStudy: string;
//   gradeCgpa?: string;
//   startDate: string;
//   endDate?: string;
// }

// export interface UpdateEducationPayload extends AddEducationPayload {
//   recordId: number;
// }

// export interface AddWorkExperiencePayload {
//   companyName: string;
//   jobTitle: string;
//   startDate: string;
//   endDate?: string;
//   location: string;
//   description?: string;
// }

// export interface UpdateWorkExperiencePayload extends AddWorkExperiencePayload {
//   recordId: number;
// }

// export interface AddCertificatePayload {
//   certificateName: string;
//   issuingOrganization?: string;
//   issueDate?: string;
//   credentialId?: string;
//   credentialUrl?: string;
// }

// export interface UpdateCertificatePayload extends AddCertificatePayload {
//   recordId: number;
// }

// // Available skills list (can be expanded)
// export const AVAILABLE_SKILLS = [
//   "Algorithms & Data Structures",
//   "Artificial Intelligence (AI) Basics",
//   "API Design & Integration",
//   "Agile Methodologies (Scrum, Kanban)",
//   "AWS (Amazon Web Services)",
//   "Azure",
//   "Backend Development",
//   "Blockchain Development",
//   "C Programming",
//   "C++",
//   "Cloud Computing",
//   "Cybersecurity",
//   "Data Analysis",
//   "Data Science",
//   "Database Management (SQL, NoSQL)",
//   "DevOps",
//   "Docker",
//   "Frontend Development",
//   "Full Stack Development",
//   "Git & Version Control",
//   "Google Cloud Platform (GCP)",
//   "GraphQL",
//   "HTML/CSS",
//   "Java",
//   "JavaScript",
//   "Kubernetes",
//   "Machine Learning",
//   "Mobile App Development (iOS/Android)",
//   "Node.js",
//   "Python",
//   "React",
//   "React Native",
//   "RESTful APIs",
//   "Ruby on Rails",
//   "System Design",
//   "Testing & QA",
//   "TypeScript",
//   "UI/UX Design",
//   "Vue.js",
//   "Web Development",
// ];

// src/types/student.ts

export interface StudentPersonalInfo {
  firstName: string;
  lastName?: string;
  headline?: string;
  phone: string;
  gender?: string;
  dateOfBirth?: string;
  location: string;
  profilePicture?: string;    // The S3 Public URL (for display)
  profilePictureKey?: string; // The S3 Key (for deletion/cleanup)
}

export interface EducationRecord {
  id?: number;
  institutionName: string;
  degreeQualification: string;
  fieldOfStudy: string;
  gradeCgpa?: string;
  startDate: string;
  endDate?: string;
}

export interface WorkExperience {
  id?: number;
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  location: string;
  description?: string;
}

export interface CertificateRecord {
  id?: number;
  certificateName: string;
  issuingOrganization?: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

// ✅ FIXED: Make certificates optional
export interface StudentSkills {
  selectedSkills: string[];
  certificates?: CertificateRecord[]; // Made optional
}

export interface StudentProfile {
  id: number;
  userId: number;
  isComplete: boolean;
  completionPercentage: number;
  personalInfo?: StudentPersonalInfo;
  educationRecords?: EducationRecord[];
  workExperiences?: WorkExperience[];
  skillsInfo?: StudentSkills;
  createdAt: string;
  updatedAt: string;
}

export interface StudentProfileResponse {
  success: boolean;
  data: StudentProfile;
  message?: string;
}

// ✅ FIXED: Use Partial to allow incomplete data
// export interface UpdateSectionPayload {
//   section: 'personalInfo' | 'skills';
//   data: Partial<StudentPersonalInfo> | Partial<StudentSkills>;
// }
// src/types/student.ts (Find this interface and update it)

export interface UpdateSectionPayload {
  section: 'personalInfo' | 'skills';
  data: Partial<StudentPersonalInfo> | Partial<StudentSkills> | FormData; 
}

// ... (Rest of the file remains the same)

export interface AddEducationPayload {
  institutionName: string;
  degreeQualification: string;
  fieldOfStudy: string;
  gradeCgpa?: string;
  startDate: string;
  endDate?: string;
}

export interface UpdateEducationPayload extends AddEducationPayload {
  recordId: number;
}

export interface AddWorkExperiencePayload {
  companyName: string;
  jobTitle: string;
  startDate: string;
  endDate?: string;
  location: string;
  description?: string;
}

export interface UpdateWorkExperiencePayload extends AddWorkExperiencePayload {
  recordId: number;
}

export interface AddCertificatePayload {
  certificateName: string;
  issuingOrganization?: string;
  issueDate?: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface UpdateCertificatePayload extends AddCertificatePayload {
  recordId: number;
}

// Available skills list (can be expanded)
export const AVAILABLE_SKILLS = [
  "Algorithms & Data Structures",
  "Artificial Intelligence (AI) Basics",
  "API Design & Integration",
  "Agile Methodologies (Scrum, Kanban)",
  "AWS (Amazon Web Services)",
  "Azure",
  "Backend Development",
  "Blockchain Development",
  "C Programming",
  "C++",
  "Cloud Computing",
  "Cybersecurity",
  "Data Analysis",
  "Data Science",
  "Database Management (SQL, NoSQL)",
  "DevOps",
  "Docker",
  "Frontend Development",
  "Full Stack Development",
  "Git & Version Control",
  "Google Cloud Platform (GCP)",
  "GraphQL",
  "HTML/CSS",
  "Java",
  "JavaScript",
  "Kubernetes",
  "Machine Learning",
  "Mobile App Development (iOS/Android)",
  "Node.js",
  "Python",
  "React",
  "React Native",
  "RESTful APIs",
  "Ruby on Rails",
  "System Design",
  "Testing & QA",
  "TypeScript",
  "UI/UX Design",
  "Vue.js",
  "Web Development",
];