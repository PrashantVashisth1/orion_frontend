// Base structure for a startup profile in the trending response
interface TrendingStartupProfile {
  id: number;
  user: {
    id: number;
  };
  company_details: {
    company_name: string | null;
    company_description: string | null;
    industry: string | null; // Used for category
  } | null;
  business_details: {
    funding_stage: string | null; // Used for funding
    team_size: string | null; // Used for team
    // revenue: string | null; // Add if you included revenue in the backend
  } | null;
}

// Type for the API response from GET /api/get-funded/trending
export interface TrendingApiResponse {
  startupOfTheWeek: TrendingStartupProfile | null;
  trendingStartups: TrendingStartupProfile[];
}

// Type for the props that StartupCard will actually use
export interface StartupCardData {
  id: number; // Use StartupProfile ID as the key
  name: string;
  description: string;
  category: string;
  funding?: string;
  team?: string;
  growth?: string; // We'll leave this undefined for now, or use revenue if available
  isWeekly?: boolean;
}