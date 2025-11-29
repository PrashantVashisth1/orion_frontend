// import { Calendar, Monitor, Mic, PlayCircle } from 'lucide-react';
// import type { EventType } from './types'; // Ensure correct path

// interface EventTypeSelectorProps {
//   selectedType: EventType;
//   onTypeChange: (type: EventType) => void;
// }

// const eventTypes = [
//   { id: 'webinar' as EventType, label: 'Webinar', icon: Monitor },
//   { id: 'panel' as EventType, label: 'Panel Discussion', icon: Mic },
//   { id: 'demo' as EventType, label: 'Product Demo', icon: PlayCircle }
// ];

// const EventTypeSelector = ({ selectedType, onTypeChange }: EventTypeSelectorProps) => (
//   <div className="mb-10">
//     <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
//       <Calendar className="text-purple-400" />
//       Select Event Type
//     </h3>
//     <div className="flex flex-col sm:flex-row gap-3 bg-gray-700/30 p-3 rounded-xl border border-gray-600/50">
//       {eventTypes.map(({ id, label, icon: Icon }) => (
//         <button
//           key={id}
//           onClick={() => onTypeChange(id)}
//           className={`px-6 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 flex-1 ${
//             selectedType === id
//               ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
//               : 'bg-gray-600/70 text-gray-200 hover:bg-purple-500/20 hover:text-white'
//           }`}
//         >
//           <Icon size={20} />
//           <span className="font-semibold">{label}</span>
//         </button>
//       ))}
//     </div>
//   </div>
// );

// export default EventTypeSelector;



import React from 'react';
import { Video, Users, MonitorPlay } from 'lucide-react';
import type { EventType } from './types';

interface EventTypeSelectorProps {
  selectedType: EventType;
  onTypeChange: (type: EventType) => void;
}

const EventTypeSelector: React.FC<EventTypeSelectorProps> = ({ selectedType, onTypeChange }) => {
  const types = [
    { id: 'webinar', label: 'Webinar', icon: Video },
    { id: 'panel', label: 'Panel Discussion', icon: Users },
    { id: 'demo', label: 'Product Demo', icon: MonitorPlay },
  ] as const;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {types.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          type="button"
          onClick={() => onTypeChange(id)}
          className={`
            flex flex-col items-center justify-center p-2 rounded-xl border-2 transition-all duration-200 
            ${selectedType === id
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:bg-slate-50'
            }
          `}
        >
          <div className={`p-3 rounded-full mb-2 ${selectedType === id ? 'bg-blue-100' : 'bg-slate-100'}`}>
             <Icon className={`w-5 h-5 ${selectedType === id ? 'text-blue-600' : 'text-slate-500'}`} />
          </div>
          <span className="font-semibold text-sm">{label}</span>
        </button>
      ))}
    </div>
  );
};

export default EventTypeSelector;