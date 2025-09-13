// 3. Create Post Store - src/store/createPostStore.ts
import { create } from 'zustand';

interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document';
  file?: File;
}

interface CreatePostState {
  text: string;
  uploadedFiles: UploadedFile[];
  isUploading: boolean;
  isSubmitting: boolean;
  
  setText: (text: string) => void;
  addFile: (file: UploadedFile) => void;
  removeFile: (id: string) => void;
  setUploading: (isUploading: boolean) => void;
  setSubmitting: (isSubmitting: boolean) => void;
  clearForm: () => void;
  getImages: () => string[];
  getDocuments: () => string[];
  canSubmit: () => boolean;
}

export const useCreatePostStore = create<CreatePostState>((set, get) => ({
  text: '',
  uploadedFiles: [],
  isUploading: false,
  isSubmitting: false,

  setText: (text: string) => set({ text }),
  
  addFile: (file: UploadedFile) => 
    set((state) => ({ 
      uploadedFiles: [...state.uploadedFiles, file] 
    })),
  
  removeFile: (id: string) => 
    set((state) => ({ 
      uploadedFiles: state.uploadedFiles.filter(f => f.id !== id) 
    })),
  
  setUploading: (isUploading: boolean) => set({ isUploading }),
  setSubmitting: (isSubmitting: boolean) => set({ isSubmitting }),
  
  clearForm: () => set({ 
    text: '', 
    uploadedFiles: [], 
    isUploading: false, 
    isSubmitting: false 
  }),

  getImages: () => {
    const files = get().uploadedFiles;
    return files.filter(f => f.type === 'image').map(f => f.url);
  },
  
  getDocuments: () => {
    const files = get().uploadedFiles;
    return files.filter(f => f.type === 'document').map(f => f.url);
  },
  
  canSubmit: () => {
    const { text, isSubmitting, isUploading } = get();
    return text.trim().length > 0 && !isSubmitting && !isUploading;
  },
}));