// src/components/edit-profile/sections/StudentWorkExperienceSection.tsx

import { useState, useEffect } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Briefcase, Plus, X, Loader2, Edit2, Save } from "lucide-react";
import { 
  useStudentProfile,
  useAddWorkExperience,
  useUpdateWorkExperience,
  useDeleteWorkExperience
} from "@/hooks/useStudentAPI";
import type { WorkExperience } from "@/types/student";
import { toast } from 'react-hot-toast';

interface StudentWorkExperienceSectionProps {
  onSectionChange?: (section: string) => void;
}

export default function StudentWorkExperienceSection({ onSectionChange }: StudentWorkExperienceSectionProps) {
  const { data: profile } = useStudentProfile();
  const { mutateAsync: addWorkExperience, isPending: isAdding } = useAddWorkExperience();
  const { mutateAsync: updateWorkExperience, isPending: isUpdating } = useUpdateWorkExperience();
  const { mutateAsync: deleteWorkExperience, isPending: isDeleting } = useDeleteWorkExperience();

  const [workExperiences, setWorkExperiences] = useState<WorkExperience[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newRecord, setNewRecord] = useState<Partial<WorkExperience>>({
    companyName: '',
    jobTitle: '',
    startDate: '',
    endDate: '',
    location: '',
    description: ''
  });

  // Load existing work experiences
  useEffect(() => {
    if (profile?.data?.workExperiences) {
      setWorkExperiences(profile.data.workExperiences.map(exp => ({
        ...exp,
        startDate: exp.startDate ? new Date(exp.startDate).toISOString().split('T')[0] : '',
        endDate: exp.endDate ? new Date(exp.endDate).toISOString().split('T')[0] : ''
      })));
    }
  }, [profile]);

  const handleAddNew = async () => {
    if (!newRecord.companyName || !newRecord.jobTitle || !newRecord.startDate || !newRecord.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check description word count (max 150 words)
    if (newRecord.description) {
      const wordCount = newRecord.description.trim().split(/\s+/).length;
      if (wordCount > 150) {
        toast.error('Description must be 150 words or less');
        return;
      }
    }

    try {
      await addWorkExperience({
        companyName: newRecord.companyName,
        jobTitle: newRecord.jobTitle,
        startDate: new Date(newRecord.startDate).toISOString(),
        endDate: newRecord.endDate ? new Date(newRecord.endDate).toISOString() : undefined,
        location: newRecord.location,
        description: newRecord.description
      });
      toast.success('Work experience added successfully');
      setNewRecord({
        companyName: '',
        jobTitle: '',
        startDate: '',
        endDate: '',
        location: '',
        description: ''
      });
    } catch (err) {
      toast.error('Failed to add work experience');
    }
  };

  const handleUpdate = async (id: number, data: Partial<WorkExperience>) => {
    if (!data.companyName || !data.jobTitle || !data.startDate || !data.location) {
      toast.error('Please fill in all required fields');
      return;
    }

    // Check description word count (max 150 words)
    if (data.description) {
      const wordCount = data.description.trim().split(/\s+/).length;
      if (wordCount > 150) {
        toast.error('Description must be 150 words or less');
        return;
      }
    }

    try {
      await updateWorkExperience({
        recordId: id,
        companyName: data.companyName,
        jobTitle: data.jobTitle,
        startDate: new Date(data.startDate).toISOString(),
        endDate: data.endDate ? new Date(data.endDate).toISOString() : undefined,
        location: data.location,
        description: data.description
      });
      toast.success('Work experience updated successfully');
      setEditingId(null);
    } catch (err) {
      toast.error('Failed to update work experience');
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this work experience?')) {
      try {
        await deleteWorkExperience(id);
        toast.success('Work experience deleted successfully');
      } catch (err) {
        toast.error('Failed to delete work experience');
      }
    }
  };

  const handleRecordChange = (index: number, field: keyof WorkExperience, value: string) => {
    setWorkExperiences(prev => prev.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    ));
  };

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length;
  };

  const handleNext = () => {
    if (onSectionChange) {
      onSectionChange('skills');
    }
  };

  const isLoading = isAdding || isUpdating || isDeleting;

  return (
    <div className="relative z-10 p-6 px-[154px] py-[60px]">
      <Card className="w-[896px] mx-auto !bg-white !shadow-lg !border !border-gray-200 before:!hidden hover:!shadow-sm hover:!ring-0 !transition-none">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 p-6 rounded-t-lg">
          <div className="flex items-center space-x-3">
            <Briefcase className="h-6 w-6 text-white" />
            <div>
              <h2 className="text-3xl font-bold text-white">Work Experience</h2>
              <p className="text-sm text-blue-50">Update your Work Experience</p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 space-y-8 bg-white !animate-none !transition-none">
          {/* Add New Work Experience */}
          <div className="space-y-4 p-6 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Add New Experience</h3>
              <Button
                onClick={handleAddNew}
                disabled={isLoading}
                className="bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Experience
                  </>
                )}
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-gray-700">Company Name *</Label>
                <Input
                  placeholder="Company/Organization Name"
                  value={newRecord.companyName}
                  onChange={(e) => setNewRecord({ ...newRecord, companyName: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Job Title *</Label>
                <Input
                  placeholder="e.g., Software Engineer Intern"
                  value={newRecord.jobTitle}
                  onChange={(e) => setNewRecord({ ...newRecord, jobTitle: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">Start Date *</Label>
                <Input
                  type="date"
                  value={newRecord.startDate}
                  onChange={(e) => setNewRecord({ ...newRecord, startDate: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-gray-700">End Date (or Present)</Label>
                <Input
                  type="date"
                  value={newRecord.endDate}
                  onChange={(e) => setNewRecord({ ...newRecord, endDate: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700">Location *</Label>
                <Input
                  placeholder="City, State/Country"
                  value={newRecord.location}
                  onChange={(e) => setNewRecord({ ...newRecord, location: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label className="text-gray-700">Description (Max 150 words)</Label>
                <Textarea
                  placeholder="Describe your responsibilities and achievements..."
                  value={newRecord.description}
                  onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                  className="bg-white border-gray-300 !text-black"
                  rows={4}
                />
                <p className="text-xs !text-gray-900">
                  {newRecord.description ? getWordCount(newRecord.description) : 0} / 150 words
                </p>
              </div>
            </div>
          </div>

          {/* Existing Work Experiences */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Your Work History</h3>
            {workExperiences.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No work experience added yet.</p>
            ) : (
              workExperiences.map((exp, index) => (
                <div key={exp.id || index} className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                  {editingId === exp.id ? (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-gray-700">Company Name *</Label>
                          <Input
                            value={exp.companyName}
                            onChange={(e) => handleRecordChange(index, 'companyName', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Job Title *</Label>
                          <Input
                            value={exp.jobTitle}
                            onChange={(e) => handleRecordChange(index, 'jobTitle', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">Start Date *</Label>
                          <Input
                            type="date"
                            value={exp.startDate}
                            onChange={(e) => handleRecordChange(index, 'startDate', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-gray-700">End Date</Label>
                          <Input
                            type="date"
                            value={exp.endDate || ''}
                            onChange={(e) => handleRecordChange(index, 'endDate', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-gray-700">Location *</Label>
                          <Input
                            value={exp.location}
                            onChange={(e) => handleRecordChange(index, 'location', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                          />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                          <Label className="text-gray-700">Description (Max 150 words)</Label>
                          <Textarea
                            value={exp.description || ''}
                            onChange={(e) => handleRecordChange(index, 'description', e.target.value)}
                            className="bg-white border-gray-300 !text-black"
                            rows={4}
                          />
                          <p className="text-xs !text-gray-500">
                            {exp.description ? getWordCount(exp.description) : 0} / 150 words
                          </p>
                        </div>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => setEditingId(null)}
                          variant="outline"
                          className="bg-red-500 cursor-pointer"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={() => exp.id && handleUpdate(exp.id, exp)}
                          disabled={isLoading}
                          className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                        >
                          {isUpdating ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900">{exp.jobTitle}</h4>
                          <p className="text-md text-gray-700">{exp.companyName}</p>
                          <p className="text-sm text-gray-600">{exp.location}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} - {exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : 'Present'}
                          </p>
                          {exp.description && (
                            <p className="text-sm text-gray-600 mt-2">{exp.description}</p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => setEditingId(exp.id || null)}
                            variant="outline"
                            size="sm"
                            className="border-emerald-600 text-emerald-600 cursor-pointer hover:bg-blue-100"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => exp.id && handleDelete(exp.id)}
                            variant="outline"
                            size="sm"
                            className="border-red-300 text-red-600 hover:bg-blue-100 cursor-pointer"
                            disabled={isLoading}
                          >
                            {isDeleting ? (
                              <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                              <X className="w-4 h-4" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Next Button */}
          <div className="flex justify-end pt-6 border-t border-gray-200">
            <Button 
              onClick={handleNext}
              className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              Continue to Skills
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}