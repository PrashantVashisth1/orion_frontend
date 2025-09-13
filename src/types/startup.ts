export interface PersonalInfo {
  profilePicture?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  location: string;
  website?: string;
  birthDate?: string;
  bio?: string;
}

export interface BusinessDetails {
  jobTitle: string;
  company?: string;
  industry: string;
  experience?: string;
  businessType?: string;
  teamSize?: string;
  revenue?: string;
  fundingStage?: string;
  skills?: string;
  goals?: string;
  linkedinProfile?: string;
  twitterProfile?: string;
  githubProfile?: string;
  portfolioWebsite?: string;
}

export interface CompanyDetails {
  companyLogo?: string;
  companyName: string;
  foundedYear: number;
  companyEmail: string;
  companyPhone: string;
  companyLocation: string;
  companyWebsite?: string;
  companyDescription: string;
  vision: string;
  mission: string;
  teamSize?: string;
  companyType?: string;
  industry: string;
  revenueRange?: string;
  legalName?: string;
  taxId?: string;
  registrationDate?: string;
  businessLicense?: string;
}

export interface Offerings {
  products: string[];
  services: string[];
  pricingModel?: string;
  targetMarket?: string;
  competitiveAdvantage?: string;
  valueProposition?: string;
  businessModel?: string;
  revenueStreams: string[];
  partnerships: string[];
  certifications: string[];
}

export interface TechnologyInterests {
  aiMl: boolean;
  blockchain: boolean;
  cloudComputing: boolean;
  cybersecurity: boolean;
  iot: boolean;
  fintech: boolean;
  healthtech: boolean;
  edtech: boolean;
  sustainabilityTech: boolean;
  otherTech?: string;
}

export interface PartnershipInterests {
  startupPartnerships: boolean;
  enterprisePartnerships: boolean;
  researchCollaborations: boolean;
  academicPartnerships: boolean;
  governmentContracts: boolean;
  nonprofitCollaborations: boolean;
  partnershipGoals?: string;
}

export interface InnovationFocus {
  productDevelopment: boolean;
  processInnovation: boolean;
  businessModelInnovation: boolean;
  sustainabilityInnovation: boolean;
  socialImpact: boolean;
  disruptiveTechnology: boolean;
  innovationDescription?: string;
}

export interface Interests {
  primaryIndustry: string;
  secondaryIndustry?: string;
  technologyInterests: TechnologyInterests;
  primaryTargetMarket?: string;
  geographicFocus?: string;
  marketDescription?: string;
  partnershipInterests: PartnershipInterests;
  innovationFocus: InnovationFocus;
  futureGoals?: string;
}

export interface StartupProfile {
  id?: string;
  userId: string;
  personalInfo: PersonalInfo;
  businessDetails: BusinessDetails;
  companyDetails: CompanyDetails;
  offerings: Offerings;
  interests: Interests;
  isComplete: boolean;
  createdAt?: string;
  updatedAt?: string;
  completionPercentage?: number;
}

export interface StartupProfileResponse {
  success: boolean;
  data?: StartupProfile;
  message: string;
}

export interface StartupProfileRequest {
  personalInfo?: Partial<PersonalInfo>;
  businessDetails?: Partial<BusinessDetails>;
  companyDetails?: Partial<CompanyDetails>;
  offerings?: Partial<Offerings>;
  interests?: Partial<Interests>;
}
