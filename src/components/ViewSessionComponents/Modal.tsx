// Modal.tsx
"use client";

import type React from "react";
import { useState } from "react";
import { X, Calendar, Clock, Users, User, Mail, Phone, Link, CheckCircle, Monitor, Mic, PlayCircle } from "lucide-react"; // Added Monitor, Mic, PlayCircle for icon display

// Import the refined types
import type { DisplaySession } from './types'; // Ensure this path is correct

interface SessionModalProps {
  open: boolean;
  onClose: () => void;
  session: DisplaySession | null; // Now expects DisplaySession
}

const SessionModal: React.FC<SessionModalProps> = ({ open, onClose, session }) => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  if (!open || !session) return null;

  const handleJoinSession = () => {
    // In a real application, this would trigger an actual registration API call.
    // For now, it just shows the success modal.
    setShowSuccessModal(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    onClose();
  };

  // Determine icon for the modal header based on session_type
  const getSessionIcon = (type: DisplaySession['session_type']) => {
    switch (type) {
      case 'webinar': return <Monitor className="w-8 h-8" />;
      case 'panel': return <Mic className="w-8 h-8" />;
      case 'demo': return <PlayCircle className="w-8 h-8" />;
      default: return <Calendar className="w-8 h-8" />;
    }
  };

  return (
    <>
      {/* Main Session Modal */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"> {/* Added p-4 for mobile spacing */}
        <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-5xl relative overflow-hidden max-h-[95vh] flex flex-col border border-slate-700">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 md:p-8 text-white relative">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                {getSessionIcon(session.session_type)} {/* Dynamic icon */}
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{session.title}</h2>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{session.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{session.time}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    Session Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Title/Topic</label>
                      <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">
                        {session.title}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Date & Time</label>
                      <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">
                        {session.date} | {session.time}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                      <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">
                        {session.duration}
                      </div>
                    </div>

                    {/* Audience for Webinar */}
                    {session.session_type === 'webinar' && session.audience && session.audience.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Audience Intended</label>
                        <div className="flex flex-wrap gap-2">
                          {session.audience.map((audience, i) => (
                            <div key={i} className="bg-purple-600/20 text-purple-300 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-1 border border-purple-500/30">
                              <Users className="w-4 h-4" />
                              {audience}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-4">Description</h3>
                  <div className="bg-slate-600/50 rounded-xl p-4 border border-slate-500 text-gray-300 leading-relaxed">
                    {session.description}
                  </div>
                </div>
              </div>

              {/* Right Column (Host/Speaker/Presenter/Moderator Info) */}
              <div className="space-y-6">
                <div className="bg-slate-700/50 rounded-2xl p-6 border border-slate-600">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-purple-400" />
                    {/* Dynamic header based on session type */}
                    {
                      session.session_type === 'webinar' ? 'Speaker Information' :
                      session.session_type === 'panel' ? 'Moderator & Panelists' :
                      session.session_type === 'demo' ? 'Presenter Information' :
                      'Host Information' // Fallback
                    }
                  </h3>
                  <div className="space-y-4">
                    {/* Common Host Name (always available via 'host' property in DisplaySession) */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                      <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">{session.host}</div>
                    </div>

                    {/* Webinar Specific Details */}
                    {session.session_type === 'webinar' && session.speakers && session.speakers.length > 0 && (
                      <>
                        {session.speakers[0]?.email && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Speaker's Email</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white flex items-center gap-2">
                              <Mail className="w-4 h-4 text-gray-400" />
                              {session.speakers[0].email}
                            </div>
                          </div>
                        )}
                        {session.contact && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Contact</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white flex items-center gap-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              {session.contact}
                            </div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Panel Specific Details */}
                    {session.session_type === 'panel' && (
                      <>
                        {session.moderator && (
                          <>
                            <h4 className="text-md font-semibold text-white mt-4">Moderator:</h4>
                            <div className="bg-slate-700/30 rounded-lg p-3 border border-slate-600">
                                <p className="text-white font-medium">{session.moderator.name}</p>
                                {session.moderator.designation && <p className="text-gray-400 text-sm">{session.moderator.designation}</p>}
                                {session.moderator.bio && <p className="text-gray-300 text-sm mt-2">{session.moderator.bio}</p>}
                            </div>
                          </>
                        )}
                        {session.panelists && session.panelists.length > 0 && (
                          <>
                            <h4 className="text-md font-semibold text-white mt-4">Panelists:</h4>
                            {session.panelists.map((panelist, i) => (
                              <div key={i} className="mb-4 p-3 bg-slate-700/30 rounded-lg border border-slate-600">
                                <p className="text-white font-medium">{panelist.name}</p>
                                {panelist.designation && <p className="text-gray-400 text-sm">{panelist.designation}</p>}
                                {panelist.bio && <p className="text-gray-300 text-sm mt-2">{panelist.bio}</p>}
                              </div>
                            ))}
                          </>
                        )}
                      </>
                    )}

                    {/* Demo Specific Details */}
                    {session.session_type === 'demo' && session.presenter && (
                      <>
                        {session.presenter.designation && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Designation</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">{session.presenter.designation}</div>
                          </div>
                        )}
                        {session.presenter.affiliation && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Affiliation</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white">{session.presenter.affiliation}</div>
                          </div>
                        )}
                        {session.aboutCompany && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">About Company</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-gray-300 leading-relaxed">{session.aboutCompany}</div>
                          </div>
                        )}
                        {session.aboutProduct && (
                          <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">About Product</label>
                            <div className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-gray-300 leading-relaxed">{session.aboutProduct}</div>
                          </div>
                        )}
                      </>
                    )}

                    {/* Registration Link (common across all types) */}
                    {session.registrationLink && (
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Registration Link</label>
                        <a
                          href={session.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-slate-600/50 rounded-xl p-3 border border-slate-500 text-white flex items-center gap-2 hover:text-purple-400 hover:underline cursor-pointer transition-colors"
                        >
                          <Link className="w-4 h-4 text-gray-400" />
                          <span className="truncate">{session.registrationLink}</span>
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* Join Session Button */}
                <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 text-white">
                  <h3 className="text-lg font-semibold mb-2">Ready to Join?</h3>
                  <p className="text-white/90 mb-4 text-sm">
                    Register now to secure your spot in this exclusive session.
                  </p>
                  <button
                    onClick={handleJoinSession}
                    className="w-full bg-white text-purple-600 font-semibold py-3 px-6 rounded-xl hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center gap-2"
                  >
                    <Users className="w-5 h-5" />
                    Join Session
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-60 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl shadow-2xl w-full max-w-md p-8 text-center relative border border-slate-700">
            <button onClick={handleCloseSuccess} className="absolute top-4 right-4 text-gray-400 hover:text-gray-300">
              <X className="w-6 h-6" />
            </button>

            <div className="w-20 h-20 bg-green-600/20 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-500/30">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>

            <h3 className="text-2xl font-bold text-white mb-4">Successfully Registered!</h3>

            <p className="text-gray-300 mb-6 leading-relaxed">
              You have been successfully registered for <strong className="text-purple-400">{session.title}</strong>. A confirmation email has been
              sent to your registered email address.
            </p>

            <div className="bg-slate-700/50 rounded-xl p-4 mb-6 border border-slate-600">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">Session Date:</span>
                <span className="font-medium text-white">{session.date}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-400">Session Time:</span>
                <span className="font-medium text-white">{session.time}</span>
              </div>
            </div>

            <button
              onClick={handleCloseSuccess}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-500 hover:to-blue-500 transition-all duration-200"
            >
              Got it, Thanks!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SessionModal;