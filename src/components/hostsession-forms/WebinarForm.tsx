import { Checkbox } from '@/components/ui/checkbox';
import InputField from './InputField';
import type { EventFormData } from './types';

interface WebinarFormProps {
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
}

const WebinarForm = ({ formData, setFormData }: WebinarFormProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Title/Topic"
        placeholder="Enter webinar title"
        value={formData.title}
        onChange={(e) => setFormData({...formData, title: e.target.value})}
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
      placeholder="e.g., 1 hour 30 minutes"
      value={formData.duration}
      onChange={(e) => setFormData({...formData, duration: e.target.value})}
      required
    />

    <div>
      <label className="block text-sm font-medium text-gray-200 mb-3">Audience Intended</label>
      <div className="flex gap-6">
        {['Students', 'Professionals'].map((audience) => (
          <label key={audience} className="flex items-center gap-3 cursor-pointer">
            <Checkbox
              checked={formData.audience.includes(audience)}
              onCheckedChange={(checked) => {
                const updatedAudience = checked
                  ? [...formData.audience, audience]
                  : formData.audience.filter(a => a !== audience);
                setFormData({...formData, audience: updatedAudience});
              }}
              className="w-5 h-5"
            />
            <span className="text-gray-200 font-medium">{audience}</span>
          </label>
        ))}
      </div>
    </div>

    <InputField
      label="Description"
      type="textarea"
      placeholder="Describe your webinar content, objectives, and what attendees will learn"
      value={formData.description}
      onChange={(e) => setFormData({...formData, description: e.target.value})}
      rows={4}
    />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Speaker's Name"
        placeholder="Enter speaker's name"
        value={formData.speakerName}
        onChange={(e) => setFormData({...formData, speakerName: e.target.value})}
        required
      />
      <InputField
        label="Speaker's Email"
        type="email"
        placeholder="speaker@example.com"
        value={formData.speakerEmail}
        onChange={(e) => setFormData({...formData, speakerEmail: e.target.value})}
        required
      />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Contact Information"
        placeholder="Phone number or additional contact"
        value={formData.contact}
        onChange={(e) => setFormData({...formData, contact: e.target.value})}
      />
      <InputField
        label="Registration Link"
        type="url"
        placeholder="https://registration-link.com"
        value={formData.registrationLink}
        onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
      />
    </div>
  </div>
);

export default WebinarForm; 