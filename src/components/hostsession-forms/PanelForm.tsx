import { Users, User } from 'lucide-react';
import InputField from './InputField';
import type { EventFormData } from './types';

interface PanelFormProps {
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
}

const PanelForm = ({ formData, setFormData }: PanelFormProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Topic"
        placeholder="Enter panel discussion topic"
        value={formData.topic}
        onChange={(e) => setFormData({...formData, topic: e.target.value})}
        required
      />
      <InputField
        label="Date/Time"
        type="datetime-local"
        value={formData.datetime}
        onChange={(e) => setFormData({...formData, datetime: e.target.value})}
        required
      />
    </div>

    <InputField
      label="Duration"
      placeholder="e.g., 2 hours"
      value={formData.duration}
      onChange={(e) => setFormData({...formData, duration: e.target.value})}
      required
    />

    <div className="bg-gray-700/40 p-6 rounded-xl border border-gray-600/50">
      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <Users className="text-blue-400" />
        Panelist's Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Name"
          placeholder="Panelist's name"
          value={formData.panelistName}
          onChange={(e) => setFormData({...formData, panelistName: e.target.value})}
          required
        />
        <InputField
          label="Designation"
          placeholder="Panelist's designation"
          value={formData.panelistDesignation}
          onChange={(e) => setFormData({...formData, panelistDesignation: e.target.value})}
        />
      </div>
      <InputField
        label="Bio"
        type="textarea"
        placeholder="Panelist's biography"
        value={formData.panelistBio}
        onChange={(e) => setFormData({...formData, panelistBio: e.target.value})}
        rows={3}
      />
    </div>

    <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-400/30">
      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <User className="text-purple-400" />
        Moderator's Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Name"
          placeholder="Moderator's name"
          value={formData.moderatorName}
          onChange={(e) => setFormData({...formData, moderatorName: e.target.value})}
          required
        />
        <InputField
          label="Designation"
          placeholder="Moderator's designation"
          value={formData.moderatorDesignation}
          onChange={(e) => setFormData({...formData, moderatorDesignation: e.target.value})}
        />
      </div>
      <InputField
        label="Bio"
        type="textarea"
        placeholder="Moderator's biography"
        value={formData.moderatorBio}
        onChange={(e) => setFormData({...formData, moderatorBio: e.target.value})}
        rows={3}
      />
    </div>

    <InputField
      label="Registration Link"
      type="url"
      placeholder="https://registration-link.com"
      value={formData.registrationLink}
      onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
    />
  </div>
);

export default PanelForm; 