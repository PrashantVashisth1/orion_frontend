// import { useFileUpload } from "@/hooks/useFileUpload";
// import { Upload, Loader2, X } from "lucide-react";
// import React from "react";
// import { toast } from "react-hot-toast";

// interface ImageUploadProps {
//   id: string;
//   label: string;
//   previewUrl: string | null;
//   onImageUpload: (data: {
//     file: File | null;
//     url: string | null;
//     id: string;
//   }) => void;
// }

// export const ImageUpload: React.FC<ImageUploadProps> = ({
//   id,
//   label,
//   previewUrl,
//   onImageUpload,
// }) => {
//   const fileInputRef = React.useRef<HTMLInputElement>(null);
//   const { mutate, isPending } = useFileUpload();
//   console.log(previewUrl)

//   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (!file) return;

//     if (file.size > 5 * 1024 * 1024) {
//       toast.error("File is too large. Maximum size is 5MB.");
//       return;
//     }

//     const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
//     if (!allowedTypes.includes(file.type)) {
//       toast.error("Invalid file type. Only JPG, PNG, or WebP is allowed.");
//       return;
//     }

//     mutate(file, {
//       onSuccess: (response) => {
//         // --- THIS IS THE NEW DEBUGGING LINE ---
//         console.log("BACKEND UPLOAD RESPONSE:", response);
//         // -------------------------------------

//         // This line is the likely point of failure, we're guessing the structure
//         const returnedUrl = response?.data?.url; 
        
//         if (returnedUrl) {
//           onImageUpload({ file, url: returnedUrl, id });
//           toast.success("Image uploaded successfully!");
//         } else {
//           // This toast is probably what you are seeing
//           toast.error("Upload succeeded, but couldn't find the URL in the response.");
//         }
//       },
//       onError: (error) => {
//         console.error("Upload mutation error:", error);
//       },
//     });
//   };

//   const handleClick = () => {
//     if (fileInputRef.current && !isPending) {
//       fileInputRef.current.click();
//     }
//   };

//   const handleRemoveImage = (e: React.MouseEvent) => {
//     e.stopPropagation(); 
//     onImageUpload({ file: null, url: null, id: id });
//     toast.success("Image removed.");
//   };

//   return (
//     <div className="space-y-2">
//       <label className="block text-sm font-medium text-gray-300">
//         {label}
//       </label>
//       <div
//         className="relative flex h-48 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-6 text-gray-400 transition-colors hover:border-gray-500 hover:bg-gray-800"
//         onClick={handleClick}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           handleFileChange({ target: { files: e.dataTransfer.files } } as any);
//         }}
//       >
//         {isPending ? (
//           <div className="flex flex-col items-center">
//             <Loader2 className="h-10 w-10 animate-spin text-blue-400" />
//             <span className="mt-2 text-sm font-semibold">Uploading...</span>
//           </div>
//         ) : 
//         previewUrl ? (
//           <div className="relative h-full w-full">
//             <img
//               src={previewUrl}
//               alt="Preview"
//               className="h-full w-full rounded-md object-contain"
//             />
//             <button
//               onClick={handleRemoveImage}
//               className="absolute top-2 right-2 z-10 rounded-full bg-red-600/80 p-1 text-white shadow-lg transition-all hover:bg-red-700"
//               aria-label="Remove image"
//             >
//               <X className="h-4 w-4" />
//             </button>
//           </div>
//         ) : (
//           <div className="flex flex-col items-center text-center">
//             <Upload className="h-10 w-10" />
//             <span className="mt-2 text-sm font-semibold">
//               Click or drag file to upload
//             </span>
//             <span className="mt-1 text-xs">
//               PNG, JPG, or WebP (Max 5MB)
//             </span>
//           </div>
//         )}
//         <input
//           id={id}
//           ref={fileInputRef}
//           type="file"
//           className="hidden"
//           accept="image/jpeg,image/png,image/webp"
//           onChange={handleFileChange}
//           disabled={isPending}
//         />
//       </div>
//     </div>
//   );
// };

import { useRef, useState } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

interface ImageUploadProps {
  label: string;
  id: string;
  onImageUpload: (data: { file: File | null; url: string | null; id: string }) => void;
  previewUrl: string | null;
}

export const ImageUpload = ({
  label,
  id,
  onImageUpload,
  previewUrl,
}: ImageUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size should be less than 5MB");
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    const url = URL.createObjectURL(file);
    onImageUpload({ file, url, id });
  };

  const handleRemove = () => {
    if (fileInputRef.current) fileInputRef.current.value = "";
    onImageUpload({ file: null, url: null, id });
  };

  return (
    <div className="space-y-3">
      <span className="text-sm font-bold text-slate-700 ml-1 block">
        {label}
      </span>
      
      <div
        className={`
          relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 ease-in-out text-center
          ${isDragging 
            ? "border-purple-500 bg-purple-50" 
            : "border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-purple-400"
          }
        `}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false); }}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
          }
        }}
      >
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />

        {previewUrl ? (
          <div className="relative group w-full max-w-md mx-auto">
            <img
              src={previewUrl}
              alt="Preview"
              className="rounded-lg shadow-md max-h-64 w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={handleRemove}
                className="gap-2"
              >
                <X className="w-4 h-4" /> Remove Image
              </Button>
            </div>
          </div>
        ) : (
          <div 
            className="flex flex-col items-center justify-center cursor-pointer py-4"
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="p-4 bg-white rounded-full shadow-sm mb-3">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-sm font-medium text-slate-900">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500 mt-1">
              SVG, PNG, JPG or GIF (max. 5MB)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};