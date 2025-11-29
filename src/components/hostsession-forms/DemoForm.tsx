// import { User } from 'lucide-react';
// import InputField from './InputField';
// import type { EventFormData } from './types';

// interface DemoFormProps {
//   formData: EventFormData;
//   setFormData: (data: EventFormData) => void;
// }

// const DemoForm = ({ formData, setFormData }: DemoFormProps) => (
//   <div className="space-y-6">
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//       <InputField
//         label="Title/Topic"
//         placeholder="Enter demo title"
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
//       placeholder="e.g., 45 minutes"
//       value={formData.duration}
//       onChange={(e) => setFormData({...formData, duration: e.target.value})}
//       required
//     />

//     <div className="bg-blue-500/10 p-6 rounded-xl border border-blue-400/30">
//       <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
//         <User className="text-blue-400" />
//         Presenter's Information
//       </h4>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <InputField
//           label="Name"
//           placeholder="Presenter's name"
//           value={formData.presenterName}
//           onChange={(e) => setFormData({...formData, presenterName: e.target.value})}
//           required
//         />
//         <InputField
//           label="Designation"
//           placeholder="Presenter's designation"
//           value={formData.presenterDesignation}
//           onChange={(e) => setFormData({...formData, presenterDesignation: e.target.value})}
//         />
//       </div>
//       <InputField
//         label="Affiliation"
//         placeholder="Company/Organization"
//         value={formData.presenterAffiliation}
//         onChange={(e) => setFormData({...formData, presenterAffiliation: e.target.value})}
//       />
//     </div>

//     <InputField
//       label="About the Company"
//       type="textarea"
//       placeholder="Tell us about your company, its mission, and what it does"
//       value={formData.aboutCompany}
//       onChange={(e) => setFormData({...formData, aboutCompany: e.target.value})}
//       rows={4}
//     />

//     <InputField
//       label="About the Solution/Product"
//       type="textarea"
//       placeholder="Describe your solution or product, its key features, and benefits"
//       value={formData.aboutProduct}
//       onChange={(e) => setFormData({...formData, aboutProduct: e.target.value})}
//       rows={4}
//     />

//     <InputField
//       label="Registration Link"
//       type="url"
//       placeholder="https://registration-link.com"
//       value={formData.registrationLink}
//       onChange={(e) => setFormData({...formData, registrationLink: e.target.value})}
//     />
//   </div>
// );

// export default DemoForm; 



import React from 'react';
import { MonitorPlay, Calendar, Clock, Link, User, Award, Building2, Box } from 'lucide-react';
import InputField from './InputField';
import type { EventFormData } from './types';

interface DemoFormProps {
  formData: EventFormData;
  setFormData: React.Dispatch<React.SetStateAction<EventFormData>>;
}

const DemoForm: React.FC<DemoFormProps> = ({ formData, setFormData }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Product Details */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Product Name / Title"
            name="title"
            placeholder="e.g. Orion Platform V2 Demo"
            icon={MonitorPlay}
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
            label="Duration"
            name="duration"
            placeholder="e.g. 30 mins"
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
          <User className="w-5 h-5 text-blue-600" /> Presenter Info
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputField
            label="Presenter Name"
            name="presenterName"
            placeholder="Full Name"
            icon={User}
            required
            value={formData.presenterName}
            onChange={handleChange}
          />
          <InputField
            label="Designation"
            name="presenterDesignation"
            placeholder="Role"
            icon={Award}
            value={formData.presenterDesignation}
            onChange={handleChange}
          />
          <InputField
            label="Affiliation / Company"
            name="presenterAffiliation"
            placeholder="Company Name"
            icon={Building2}
            className="md:col-span-2"
            value={formData.presenterAffiliation}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="border-t border-slate-200 pt-6">
        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Box className="w-5 h-5 text-blue-600" /> Additional Info
        </h3>
        <div className="space-y-6">
          <InputField
            label="About the Company"
            name="aboutCompany"
            placeholder="Brief description..."
            textarea
            value={formData.aboutCompany}
            onChange={handleChange}
          />
          <InputField
            label="About the Product"
            name="aboutProduct"
            placeholder="Key features to be demonstrated..."
            textarea
            value={formData.aboutProduct}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DemoForm;