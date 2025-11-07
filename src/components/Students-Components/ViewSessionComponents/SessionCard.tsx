import { format } from "date-fns";
import type { Session } from "./types";
import { motion } from "framer-motion";

interface SessionCardProps {
  session: Session;
  onJoinClick: (session: Session) => void;
}

// simple truncate helper
const truncateText = (text: string | undefined, maxLength: number) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

const CARD_MIN_HEIGHT = 260; // px - adjust if you want taller/shorter cards

const SessionCard = ({ session, onJoinClick }: SessionCardProps) => {
  return (
    <motion.article
      role="article"
      initial={{ opacity: 0, y: 15 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { duration: 0.40, ease: [0.25, 0.1, 0.25, 1] },
      }}
      whileHover={{
        scale: 1.02,
        y: -4,
        transition: { duration: 0.18, ease: [0.25, 0.1, 0.25, 1] },
      }}
      className="relative cursor-pointer flex flex-col justify-between rounded-3xl p-6 border border-gray-200 
    bg-white/70 backdrop-blur-md shadow-md overflow-hidden transition-all duration-300
    hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 hover:border-purple-300 hover:shadow-xl"
      style={{ minHeight: `${CARD_MIN_HEIGHT}px`, maxHeight: `${CARD_MIN_HEIGHT}px` }}
    >
      {/* Decorative animated blobs */}
      <motion.div
        aria-hidden
        className="absolute -top-10 -left-10 w-48 h-48 rounded-full opacity-30 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(167,139,250,0.25), rgba(167,139,250,0.08) 40%, transparent 60%)",
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" as any }}
      />
      <motion.div
        aria-hidden
        className="absolute -bottom-10 -right-8 w-56 h-56 rounded-full opacity-22 pointer-events-none"
        style={{
          background:
            "radial-gradient(closest-side, rgba(99,102,241,0.18), rgba(99,102,241,0.06) 40%, transparent 60%)",
        }}
        animate={{ scale: [1, 0.98, 1] }}
        transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" as any }}
      />

      {/* subtle radial overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(1000px 400px at 10% 10%, rgba(167,139,250,0.03), transparent 15%), radial-gradient(900px 300px at 90% 90%, rgba(99,102,241,0.02), transparent 18%)",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center
              bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-800 font-semibold shadow-inner"
            >
              {(
                session.speakerName ||
                session.panelistName ||
                session.presenterName ||
                "H"
              )[0]?.toUpperCase()}
            </div>

            <div>
              <p className="text-xs text-gray-500">Host</p>
              <h3 className="text-lg font-semibold text-gray-900">
                {session.speakerName || session.panelistName || session.presenterName || "Unknown"}
              </h3>
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm font-semibold text-purple-600">{session.type}</p>
            <p className="text-xs text-gray-500 mt-1">
              {format(new Date(session.dateTime), "do MMMM, yyyy")}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 leading-snug">{session.title}</h2>

        {/* Truncated description — reserve space so all cards match height */}
        <p className="text-sm text-gray-600 mt-2 mb-4 min-h-[48px]">
          {truncateText(session.description || session.aboutProduct || "Join this insightful session.", 100)}
        </p>

        {/* Spacer ensures bottom row anchors to bottom */}
        <div className="flex-grow" />

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 text-sm text-gray-700 mt-4">
          <div className="flex items-center gap-3">
            <span className="text-purple-500">●</span>
            <span>Live Session</span>
            <span className="text-gray-300">·</span>
            <span className="text-gray-600">{session.attendees ?? Math.floor(Math.random() * 500 + 100)} attending</span>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => onJoinClick(session)}
            className="ml-auto cursor-pointer px-4 py-2 rounded-full text-white font-medium
                       bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md hover:shadow-lg transition-all duration-200"
          >
            Join Session
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
};

export default SessionCard;
