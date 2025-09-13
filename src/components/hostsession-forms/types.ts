// types.ts
export type EventType = 'webinar' | 'panel' | 'demo';

// This interface combines all possible fields from WebinarForm, PanelForm, and DemoForm.
// Fields specific to one form will simply be empty/null/undefined when another form is active.
export interface EventFormData {
  // Common fields across forms
  title: string; // Used by Webinar, Demo; 'topic' in Panel maps to this in backend
  datetime: string; // Combines date and time
  duration: string;
  registrationLink: string;

  // Webinar-specific fields
  description: string;
  audience: string[]; // e.g., ['Students', 'Professionals']
  speakerName: string;
  speakerEmail: string;
  contact: string;

  // Panel-specific fields
  topic: string; // Frontend field for Panel title
  panelistName: string; // Individual panelist name for ease of input
  panelistDesignation: string;
  panelistBio: string; // Individual panelist bio, used for main description
  moderatorName: string; // Individual moderator name
  moderatorDesignation: string;
  moderatorBio: string; // Individual moderator bio

  // Demo-specific fields
  presenterName: string; // Individual presenter name
  presenterDesignation: string;
  presenterAffiliation: string;
  aboutCompany: string;
  aboutProduct: string; // Used for main description
}