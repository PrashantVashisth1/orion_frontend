// 3. Updated Create Post Hook - src/hooks/useCreatePostForm.ts
import { useCallback } from 'react';
import { useCreatePostStore } from '../store/createPostStore';
import { useCreatePost } from './usePosts';
import { useFileUpload } from './useFileUpload';
import { toast } from 'react-hot-toast';

// File validation utilities
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ACCEPTED_DOCUMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const MAX_FILES = 5;

const validateFile = (file: File) => {
  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size must be less than 5MB' };
  }

  const isImage = ACCEPTED_IMAGE_TYPES.includes(file.type);
  const isDocument = ACCEPTED_DOCUMENT_TYPES.includes(file.type);
  
  if (!isImage && !isDocument) {
    return { isValid: false, error: 'File type not supported' };
  }

  return { isValid: true };
};

const getFileType = (file: File): 'image' | 'document' => {
  return ACCEPTED_IMAGE_TYPES.includes(file.type) ? 'image' : 'document';
};

const generateFileId = () => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const useCreatePostForm = () => {
  const {
    text,
    uploadedFiles,
    isUploading,
    isSubmitting,
    setText,
    addFile,
    removeFile,
    setUploading,
    setSubmitting,
    clearForm,
    getImages,
    getDocuments,
    canSubmit,
  } = useCreatePostStore();

  const createPostMutation = useCreatePost();
  const fileUploadMutation = useFileUpload();

  // Handle file upload
  const handleFileUpload = useCallback(async (files: File[]) => {
    if (uploadedFiles.length + files.length > MAX_FILES) {
      toast.error('Maximum 5 files allowed');
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = files.map(async (file) => {
        // Validate file
        const validation = validateFile(file);
        if (!validation.isValid) {
          toast.error(validation.error || 'Invalid file');
          return null;
        }

        // Upload file
        const response = await fileUploadMutation.mutateAsync(file);
        
        return {
          id: generateFileId(),
          name: file.name,
          url: response.data.url,
          type: getFileType(file),
          file,
        };
      });

      const results = await Promise.all(uploadPromises);
      const validFiles = results.filter(Boolean);
      
      validFiles.forEach((file) => {
        if (file) addFile(file);
      });

      if (validFiles.length > 0) {
        toast.success(`${validFiles.length} file(s) uploaded successfully`);
      }
    } catch (error) {
      toast.error('Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  }, [uploadedFiles.length, fileUploadMutation, addFile, setUploading]);

  // Handle file removal
  const handleFileRemove = useCallback((fileId: string) => {
    removeFile(fileId);
    toast.success('File removed');
  }, [removeFile]);

  // Submit post
  const handleSubmit = useCallback(async () => {
    if (!canSubmit()) return;

    setSubmitting(true);
    
    try {
      await createPostMutation.mutateAsync({
        text: text.trim(),
        images: getImages(),
        documents: getDocuments(),
      });

      clearForm();
      return { success: true };
    } catch (error) {
      console.error('Create post error:', error);
      return { success: false };
    } finally {
      setSubmitting(false);
    }
  }, [canSubmit, setSubmitting, createPostMutation, text, getImages, getDocuments, clearForm]);

  return {
    text,
    uploadedFiles,
    isUploading,
    isSubmitting,
    canSubmit: canSubmit(),
    setText,
    handleFileUpload,
    handleFileRemove,
    handleSubmit,
    clearForm,
  };
};