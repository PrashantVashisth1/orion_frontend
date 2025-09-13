import { apiClient } from "@/lib/my-api-client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

// 6. File Upload Hook - src/hooks/useFileUpload.ts
export const useFileUpload = () => {
  return useMutation({
    mutationFn: (file: File) => apiClient.uploadFile(file),
    onError: (error: Error) => {
      toast.error(error.message || 'File upload failed');
    },
  });
};