// import { Checkbox } from '@/components/ui/checkbox';
// import InputField from './InputField';
// import type { EventFormData } from './types';

// interface WebinarFormProps {
//   formData: EventFormData;
//   setFormData: (data: EventFormData) => void;
// }

// const WebinarForm = ({ formData, setFormData }: WebinarFormProps) => (
//   <div className="space-y-6">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <InputField
//         label="Title/Topic"
//         placeholder="Enter webinar title"
//         value={formData.title}
//         onChange={(e) => setFormData({...formData, title: e.target.value})}
//         required
//       />
//       <InputField
//         label="Date/Time"
//         type="datetime-local"
//         value={formData.datetime}
//         onChange={(e) => setFormData({...formData, datetime: e.target.value})}
//         required
//       />
//     </div>

//     <InputField
//       label="Duration"
//       placeholder="e.g., 1 hour 30 minutes"
//       value={formData.duration}
//       onChange={(e) => setFormData({...formData, duration: e.target.value})}
//       required
//     />

//     <div>
//       <label className="block text-sm font-medium text-gray-200 mb-3">Audience Intended</label>
//       <div className="flex gap-6">
//         {['Students', 'Startups'].map((audience) => (
//           <label key={audience} className="flex items-center gap-3 cursor-pointer">
//             <Checkbox
//               checked={formData.audience.includes(audience)}
//               onCheckedChange={(checked) => {
//                 const updatedAudience = checked
//                   ? [...formData.audience, audience]
//                   : formData.audience.filter(a => a !== audience);
//                 setFormData({...formData, audience: updatedAudience});
//               }}
//               className="w-5 h-5"
//             />
//             <span className="text-gray-200 font-medium">{audience}</span>
//           </label>
//         ))}
//       </div>
//     </div>

//     <InputField
//       label="Description"
//       type="textarea"
//       placeholder="Describe your webinar content, objectives, and what attendees will learn"
//       value={formData.description}
//       onChange={(e) => setFormData({...formData, description: e.target.value})}
//       rows={4}
//     />

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <InputField
//         label="Speaker's Name"
//         placeholder="Enter speaker's name"
//         value={formData.speakerName}
//         onChange={(e) => setFormData({...formData, speakerName: e.target.value})}
//         required
//       />
//       <InputField
//         label="Speaker's Email"
//         type="email"
//         placeholder="speaker@example.com"
//         value={formData.speakerEmail}
//         onChange={(e) => setFormData({...formData, speakerEmail: e.target.value})}
//         required
//       />
//     </div>

//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <InputField
//         label="Contact Information"
//         placeholder="Phone number or additional contact"
//         value={formData.contact}
//         onChange={(e) => setFormData({...formData, contact: e.target.value})}
//       />
//       <InputField
//         label="Registration Link"
//         type="url"
//         placeholder="https://registration-link.com"
//         value={formData.registrationLink}
//         onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
//       />
//     </div>
//   </div>
// );

// export default WebinarForm; 


import React from 'react';
import { Calendar, Clock, Link, User, Mail, Phone, FileText, Users } from 'lucide-react';
import InputField from './InputField';
import type { EventFormData } from './types';

interface WebinarFormProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

const WebinarForm: React.FC<WebinarFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAudienceChange = (audience: string) => {
    setFormData(prev => {
      const currentAudience = prev.audience;
      const newAudience = currentAudience.includes(audience)
        ? currentAudience.filter(a => a !== audience)
        : [...currentAudience, audience];
      return { ...prev, audience: newAudience };
    });
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Topic / Title"
          name="title"
          placeholder="e.g. The Future of AI in SaaS"
          icon={FileText}
          required
          value={formData.title}
          onChange={handleChange}
        />
        <InputField
          label="Date & Time"
          name="datetime"
          type="datetime-local"
          icon={Calendar}
          required
          value={formData.datetime}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Duration (e.g. 45 mins)"
          name="duration"
          placeholder="45 mins"
          icon={Clock}
          required
          value={formData.duration}
          onChange={handleChange}
        />
        <InputField
          label="Registration Link"
          name="registrationLink"
          placeholder="https://zoom.us/..."
          icon={Link}
          value={formData.registrationLink}
          onChange={handleChange}
        />
      </div>

      <InputField
        label="Description"
        name="description"
        placeholder="What will attendees learn from this webinar?"
        textarea
        value={formData.description}
        onChange={handleChange}
      />

      <div className="space-y-3 bg-slate-50 p-5 rounded-xl border border-slate-200">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Users className="w-4 h-4" /> Target Audience <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {['Founders', 'Investors', 'Students', 'Mentors'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleAudienceChange(type)}
              className={`
                p-2 rounded-lg text-sm font-medium transition-all border
                ${formData.audience.includes(type)
                  ? 'bg-blue-100 text-blue-700 border-blue-300'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                }
              `}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-1">
          <User className="w-5 h-5 text-blue-600" />
          Speaker Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Speaker Name"
            name="speakerName"
            placeholder="Full Name"
            icon={User}
            required
            value={formData.speakerName}
            onChange={handleChange}
          />
          <InputField
            label="Speaker Email"
            name="speakerEmail"
            type="email"
            placeholder="email@example.com"
            icon={Mail}
            value={formData.speakerEmail}
            onChange={handleChange}
          />
          <InputField
            label="Contact Info / Bio"
            name="contact"
            placeholder="Brief bio or LinkedIn URL"
            icon={Phone}
            className="md:col-span-2"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default WebinarForm;