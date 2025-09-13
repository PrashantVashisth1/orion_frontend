// SessionsSection.tsx
'use client';

import type React from "react";
import { useState, useEffect, useCallback } from "react";
import SessionModal from "./Modal"; // Ensure this path is correct
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

// Import the refined types
import type { FetchedSession, FetchedWebinarSession, FetchedPanelSession, FetchedDemoSession, DisplaySession } from './types'; // Ensure this path is correct

// Helper function to map backend data (FetchedSession) to display data (DisplaySession)
const mapToDisplaySession = (session: FetchedSession): DisplaySession => {
  let hostName: string = "N/A";
  let displayDescription: string = session.description; // Default from backend's description
  let avatarUrl: string = "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"; // Default avatar

  // Logic to determine host, primary description, and potentially refine avatar based on type
  switch (session.session_type) {
    case 'webinar':
      const webinarSession = session as FetchedWebinarSession; // Type assertion for specific fields
      hostName = webinarSession.speakers[0]?.name || "Webinar Host";
      displayDescription = webinarSession.description; // Use webinar's specific description
      // You could map specific avatars here if your data included them
      break;
    case 'panel':
      const panelSession = session as FetchedPanelSession; // Type assertion
      hostName = panelSession.moderator?.name || "Panel Moderator";
      displayDescription = panelSession.description; // Use panel's specific description
      break;
    case 'demo':
      const demoSession = session as FetchedDemoSession; // Type assertion
      hostName = demoSession.presenter?.name || "Demo Presenter";
      // Prioritize aboutProduct or aboutCompany for the main display description
      displayDescription = demoSession.about_product || demoSession.about_company || demoSession.description;
      break;
  }

  // Format date and time for display
  const formattedDate = new Date(session.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long'
  });
  const formattedTime = new Date(`2000-01-01T${session.time}`).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
  });

  return {
    id: session.id,
    title: session.title,
    host: hostName,
    date: formattedDate,
    time: formattedTime,
    description: displayDescription,
    avatar: avatarUrl, // Consider adding logic for dynamic avatars if available
    duration: session.duration,
    registrationLink: session.link,
    session_type: session.session_type, // Pass the session_type for modal's conditional rendering

    // Conditionally include type-specific fields, ensuring they are optional in DisplaySession
    ...(session.session_type === 'webinar' && {
      audience: (session as FetchedWebinarSession).audience,
      speakers: (session as FetchedWebinarSession).speakers,
      contact: (session as FetchedWebinarSession).contact,
    }),
    ...(session.session_type === 'panel' && {
      panelists: (session as FetchedPanelSession).panelists,
      moderator: (session as FetchedPanelSession).moderator,
    }),
    ...(session.session_type === 'demo' && {
      presenter: (session as FetchedDemoSession).presenter,
      aboutCompany: (session as FetchedDemoSession).about_company,
      aboutProduct: (session as FetchedDemoSession).about_product,
    }),
  };
};

const SessionsSection: React.FC = () => {
  const [fetchedSessions, setFetchedSessions] = useState<DisplaySession[]>([]);
  const [selectedSession, setSelectedSession] = useState<DisplaySession | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSessions = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:4000/api/host-sessions'); // Your backend API endpoint
      const result = await response.json();

      if (response.ok) {
        // Map backend sessions to frontend DisplaySession format
        const mappedSessions: DisplaySession[] = result.sessions.map(mapToDisplaySession);
        setFetchedSessions(mappedSessions);
      } else {
        throw new Error(result.error || 'Failed to fetch sessions');
      }
    } catch (err: any) {
      console.error("Error fetching sessions:", err);
      setError(err.message || "Failed to load sessions. Please try again later.");
      toast.error("Failed to load sessions: " + (err.message || "Network error"));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSessions(); // Fetch sessions on component mount
  }, [fetchSessions]);

  const handleJoinSession = (session: DisplaySession) => {
    setSelectedSession(session);
    setIsModalOpen(true);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Explore Sessions
          </h2>
          {isLoading && (
            <div className="flex justify-center items-center text-white mt-8">
              <Loader2 className="animate-spin mr-3" size={24} />
              <p>Loading sessions...</p>
            </div>
          )}
          {error && (
            <p className="text-red-500 mt-4">{error}</p>
          )}
          {!isLoading && !error && fetchedSessions.length === 0 && (
            <p className="text-gray-400 mt-4">No sessions available at the moment. Check back later!</p>
          )}
        </div>

        <div className="grid gap-8 lg:gap-12">
          {fetchedSessions.map((session, index) => (
            <div
              key={session.id}
              className={`group relative ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} flex flex-col lg:flex items-center gap-8 lg:gap-12`}
            >
              <div className="flex-1 bg-slate-800/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 overflow-hidden border border-slate-700 group-hover:border-purple-500/30">
                <div className="p-8 lg:p-10">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={session.avatar}
                        alt={session.host}
                        className="w-16 h-16 rounded-full border-4 border-purple-400/30"
                      />
                      <div>
                        <h4 className="font-semibold text-white text-lg">{session.host}</h4>
                        <p className="text-purple-400 font-medium">Host</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full border border-purple-500/30">
                        <svg className="w-4 h-4 text-purple-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        <span className="text-purple-300 font-medium text-sm">{session.time}</span>
                      </div>
                      <p className="text-gray-400 text-sm mt-1">{session.date}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                      {session.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{session.description}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {session.session_type}
                      </span>
                      <span className="flex items-center">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                        {Math.floor(Math.random() * 500) + 100} attending
                      </span>
                    </div>
                    <button
                      onClick={() => handleJoinSession(session)}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1 flex items-center hover:from-purple-500 hover:to-blue-500"
                    >
                      Join Session
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <SessionModal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          session={selectedSession}
        />

        <div className="text-center mt-16">
          <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-4 rounded-xl text-lg font-medium hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transform hover:-translate-y-1">
            View All Sessions
          </button>
        </div>
      </div>
    </section>
  );
};

export default SessionsSection;