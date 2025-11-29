// import { Users, User } from 'lucide-react';
// import InputField from './InputField';
// import type { EventFormData } from './types';

// interface PanelFormProps {
//   formData: EventFormData;
//   setFormData: (data: EventFormData) => void;
// }

// const PanelForm = ({ formData, setFormData }: PanelFormProps) => (
//   <div className="space-y-6">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <InputField
//         label="Topic"
//         placeholder="Enter panel discussion topic"
//         value={formData.topic}
//         onChange={(e) => setFormData({...formData, topic: e.target.value})}
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
//       placeholder="e.g., 2 hours"
//       value={formData.duration}
//       onChange={(e) => setFormData({...formData, duration: e.target.value})}
//       required
//     />

//     <div className="bg-gray-700/40 p-6 rounded-xl border border-gray-600/50">
//       <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//         <Users className="text-blue-400" />
//         Panelist's Information
//       </h4>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputField
//           label="Name"
//           placeholder="Panelist's name"
//           value={formData.panelistName}
//           onChange={(e) => setFormData({...formData, panelistName: e.target.value})}
//           required
//         />
//         <InputField
//           label="Designation"
//           placeholder="Panelist's designation"
//           value={formData.panelistDesignation}
//           onChange={(e) => setFormData({...formData, panelistDesignation: e.target.value})}
//         />
//       </div>
//       <InputField
//         label="Bio"
//         type="textarea"
//         placeholder="Panelist's biography"
//         value={formData.panelistBio}
//         onChange={(e) => setFormData({...formData, panelistBio: e.target.value})}
//         rows={3}
//       />
//     </div>

//     <div className="bg-purple-500/10 p-6 rounded-xl border border-purple-400/30">
//       <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//         <User className="text-purple-400" />
//         Moderator's Information
//       </h4>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputField
//           label="Name"
//           placeholder="Moderator's name"
//           value={formData.moderatorName}
//           onChange={(e) => setFormData({...formData, moderatorName: e.target.value})}
//           required
//         />
//         <InputField
//           label="Designation"
//           placeholder="Moderator's designation"
//           value={formData.moderatorDesignation}
//           onChange={(e) => setFormData({...formData, moderatorDesignation: e.target.value})}
//         />
//       </div>
//       <InputField
//         label="Bio"
//         type="textarea"
//         placeholder="Moderator's biography"
//         value={formData.moderatorBio}
//         onChange={(e) => setFormData({...formData, moderatorBio: e.target.value})}
//         rows={3}
//       />
//     </div>

//     <InputField
//       label="Registration Link"
//       type="url"
//       placeholder="https://registration-link.com"
//       value={formData.registrationLink}
//       onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
//     />
//   </div>
// );

// export default PanelForm; 


import React from 'react';
import { MessageSquare, Calendar, Clock, Link, User, Award, Mic2, Users } from 'lucide-react';
import InputField from './InputField';
import type { EventFormData } from './types';

interface PanelFormProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

const PanelForm: React.FC<PanelFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Session Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Discussion Topic"
            name="topic"
            placeholder="e.g. The Future of Fintech"
            icon={MessageSquare}
            required
            value={formData.topic}
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
            label="Duration"
            name="duration"
            placeholder="e.g. 60 mins"
            icon={Clock}
            required
            value={formData.duration}
            onChange={handleChange}
          />
          <InputField
            label="Registration Link"
            name="registrationLink"
            placeholder="https://..."
            icon={Link}
            value={formData.registrationLink}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-600" /> Panelist Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Panelist Name"
            name="panelistName"
            placeholder="Name"
            icon={User}
            required
            value={formData.panelistName}
            onChange={handleChange}
          />
          <InputField
            label="Designation"
            name="panelistDesignation"
            placeholder="Role & Company"
            icon={Award}
            value={formData.panelistDesignation}
            onChange={handleChange}
          />
          <InputField
            label="Panelist Bio"
            name="panelistBio"
            placeholder="Short introduction..."
            textarea
            className="md:col-span-2"
            value={formData.panelistBio}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Mic2 className="w-5 h-5 text-blue-600" /> Moderator Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Moderator Name"
            name="moderatorName"
            placeholder="Name"
            icon={User}
            required
            value={formData.moderatorName}
            onChange={handleChange}
          />
          <InputField
            label="Designation"
            name="moderatorDesignation"
            placeholder="Role & Company"
            icon={Award}
            value={formData.moderatorDesignation}
            onChange={handleChange}
          />
          <InputField
            label="Moderator Bio"
            name="moderatorBio"
            placeholder="Short introduction..."
            textarea
            className="md:col-span-2"
            value={formData.moderatorBio}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default PanelForm;