import { User } from 'lucide-react';
import InputField from './InputField';
import type { EventFormData } from './types';

interface DemoFormProps {
  formData: EventFormData;
  setFormData: (data: EventFormData) => void;
}

const DemoForm = ({ formData, setFormData }: DemoFormProps) => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <InputField
        label="Title/Topic"
        placeholder="Enter demo title"
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
      placeholder="e.g., 45 minutes"
      value={formData.duration}
      onChange={(e) => setFormData({...formData, duration: e.target.value})}
      required
    />

    <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-400/30">
      <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
        <User className="text-blue-400" />
        Presenter's Information
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputField
          label="Name"
          placeholder="Presenter's name"
          value={formData.presenterName}
          onChange={(e) => setFormData({...formData, presenterName: e.target.value})}
          required
        />
        <InputField
          label="Designation"
          placeholder="Presenter's designation"
          value={formData.presenterDesignation}
          onChange={(e) => setFormData({...formData, presenterDesignation: e.target.value})}
        />
      </div>
      <InputField
        label="Affiliation"
        placeholder="Company/Organization"
        value={formData.presenterAffiliation}
        onChange={(e) => setFormData({...formData, presenterAffiliation: e.target.value})}
      />
    </div>

    <InputField
      label="About the Company"
      type="textarea"
      placeholder="Tell us about your company, its mission, and what it does"
      value={formData.aboutCompany}
      onChange={(e) => setFormData({...formData, aboutCompany: e.target.value})}
      rows={4}
    />

    <InputField
      label="About the Solution/Product"
      type="textarea"
      placeholder="Describe your solution or product, its key features, and benefits"
      value={formData.aboutProduct}
      onChange={(e) => setFormData({...formData, aboutProduct: e.target.value})}
      rows={4}
    />

    <InputField
      label="Registration Link"
      type="url"
      placeholder="https://registration-link.com"
      value={formData.registrationLink}
      onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
    />
  </div>
);

export default DemoForm; 