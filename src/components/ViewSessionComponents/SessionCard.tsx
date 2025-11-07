// SessionCard.tsx
import { format } from 'date-fns';
import type { Session } from './types';

interface SessionCardProps {
  session: Session;
  onJoinClick: (session: Session) => void;
}

const SessionCard = ({ session, onJoinClick }: SessionCardProps) => {
  // const truncatedDescription = session.description.length > 100 
  //   ? `${session.description.substring(0, 100)}...`
  //   : session.description;

  return (
    <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-6 shadow-xl border border-slate-700 overflow-hidden transform transition-all duration-300 hover:scale-[1.02] group">
      <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity" style={{
        background: 'radial-gradient(circle at 100% 100%, #8b5cf6, transparent 25%), radial-gradient(circle at 0% 0%, #3b82f6, transparent 25%)'
      }}></div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-purple-300 mr-4 border-2 border-slate-600 text-black font-semibold">
              {session.speakerName ? session.speakerName.substring(0, 1).toUpperCase() : session.panelistName ? session.panelistName.substring(0,1).toUpperCase(): session.presenterName ? session.presenterName.substring(0,1).toUpperCase() :'H'}
            </div>
            <div>
              <p className="text-xs text-slate-400">Host</p>
              <h3 className="text-lg font-bold text-white mt-1">{session.speakerName ? session.speakerName: session.panelistName ? session.panelistName: session.presenterName ? session.presenterName :''}</h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm font-semibold text-purple-400">{session.type}</p>
            <p className="text-xs text-slate-400 mt-1">{format(new Date(session.dateTime), 'do MMMM, yyyy')}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-white mt-1 mb-2">{session.title}</h2>
        <p className="text-sm text-slate-400 mb-4">{session.description ? session.description :session.aboutProduct ? session.aboutProduct : 'Come and join the insigtful panel-discussion'}</p>
        <div className="flex items-center justify-between text-slate-400 text-sm mt-4">
          <p className="flex items-center">
            <span className="text-purple-400 mr-2">●</span> Live Session
          </p>
          <p>
            {session.attendees || Math.floor(Math.random() * (1000 - 100 + 1)) + 100} attending
          </p>
          <button 
            onClick={() => onJoinClick(session)}
            className="px-4 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors"
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  );
};

export default SessionCard;

