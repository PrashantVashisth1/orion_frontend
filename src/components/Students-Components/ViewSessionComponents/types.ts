// // types.ts (Updated and refined)

// // This represents the structure of the data directly returned by your backend's fetchHostSessions
// // It uses a discriminated union for type safety based on 'session_type'.

// interface BaseFetchedSession {
//     id: number;
//     title: string;
//     description: string;
//     date: string; // YYYY-MM-DD
//     time: string; // HH:MM:SS (or HH:MM)
//     duration: string;
//     link: string; // Registration Link
//     user_id: string; // Assuming user_id is string or number in DB
//     created_at: string; // ISO date string
//   }
  
//   export interface FetchedWebinarSession extends BaseFetchedSession {
//     session_type: 'webinar';
//     audience: string[];
//     speakers: { name: string; email?: string }[];
//     contact: string;
//   }
  
//   export interface FetchedPanelSession extends BaseFetchedSession {
//     session_type: 'panel';
//     panelists: { name: string; designation?: string; bio?: string }[];
//     moderator: { name: string; designation?: string; bio?: string };
//   }
  
//   export interface FetchedDemoSession extends BaseFetchedSession {
//     session_type: 'demo';
//     presenter: { name: string; designation?: string; affiliation?: string };
//     about_company: string;
//     about_product: string;
//   }
  
//   // Union type for any session fetched from the backend
//   export type FetchedSession = FetchedWebinarSession | FetchedPanelSession | FetchedDemoSession;
  
  
//   // This interface defines the harmonized structure that your UI components (SessionsSection, SessionModal)
//   // expect for displaying a session. It flattens and transforms data from FetchedSession.
//   export interface DisplaySession {
//     id: number;
//     title: string;
//     host: string; // Derived from speaker/moderator/presenter
//     date: string; // Formatted date string (e.g., "30th June 2025, Monday")
//     time: string; // Formatted time string (e.g., "4:00 PM")
//     description: string; // Harmonized description
//     avatar: string; // A URL for the host's avatar
//     duration: string;
//     registrationLink: string;
//     session_type: 'webinar' | 'panel' | 'demo'; // Crucial for conditional rendering in modal
  
//     // Optional fields that may exist based on session_type
//     audience?: string[];
//     speakers?: { name: string; email?: string }[];
//     contact?: string;
  
//     panelists?: { name: string; designation?: string; bio?: string }[];
//     moderator?: { name: string; designation?: string; bio?: string };
  
//     presenter?: { name: string; designation?: string; affiliation?: string };
//     aboutCompany?: string;
//     aboutProduct?: string;
//   }

// types.ts
export interface Session {
  id: string;
  type: 'WEBINAR' | 'PANEL_DISCUSSION' | 'PRODUCT_DEMO';
  title: string;
  description: string;
  dateTime: string;
  duration: string;
  registrationLink: string;
  hostName: string;
  hostEmail: string;
  contactInfo?: string;
  audience: string[];
  attendees?: number;

  // Additional fields for different types
  speakerName?: string;
  speakerEmail?: string;
  moderatorName?: string;
  moderatorDesignation?: string;
  moderatorBio?: string;
  panelistName?: string;
  panelistDesignation?: string;
  panelistBio?: string;
  presenterName?: string;
  presenterDesignation?: string;
  presenterAffiliation?: string;
  aboutCompany?: string;
  aboutProduct?: string;
}