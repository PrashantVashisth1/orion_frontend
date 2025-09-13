import { Calendar, Monitor, Mic, PlayCircle } from 'lucide-react';
import type { EventType } from './types'; // Ensure correct path

interface EventTypeSelectorProps {
  selectedType: EventType;
  onTypeChange: (type: EventType) => void;
}

const eventTypes = [
  { id: 'webinar' as EventType, label: 'Webinar', icon: Monitor },
  { id: 'panel' as EventType, label: 'Panel Discussion', icon: Mic },
  { id: 'demo' as EventType, label: 'Product Demo', icon: PlayCircle }
];

const EventTypeSelector = ({ selectedType, onTypeChange }: EventTypeSelectorProps) => (
  <div className="mb-10">
    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
      <Calendar className="text-purple-400" />
      Select Event Type
    </h3>
    <div className="flex flex-col sm:flex-row gap-3 bg-gray-700/30 p-3 rounded-xl border border-gray-600/50">
      {eventTypes.map(({ id, label, icon: Icon }) => (
        <button
          key={id}
          onClick={() => onTypeChange(id)}
          className={`px-6 py-4 rounded-lg transition-all duration-300 flex items-center gap-3 hover:scale-105 flex-1 ${
            selectedType === id
              ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25'
              : 'bg-gray-600/70 text-gray-200 hover:bg-purple-500/20 hover:text-white'
          }`}
        >
          <Icon size={20} />
          <span className="font-semibold">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

export default EventTypeSelector;