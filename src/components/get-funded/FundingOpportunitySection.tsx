import { Upload, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
// import { apiClient } from "@/lib/api-client";
import { toast } from "react-hot-toast";
// import AuthModals from "@/components/auth/auth-modals";

export function FundingOpportunitySection() {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null); // Keep the ref for clearing

  const { user } = useAuth();
  const [isUploading, setIsUploading] = useState(false);
  // const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => { // Changed type to HTMLLabelElement
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => { // Changed type to HTMLLabelElement
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => { // Changed type to HTMLLabelElement
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      validateAndSetFile(file);
    }
  };

  const validateAndSetFile = (file: File) => {
    const validTypes = [".pdf", ".pptx", ".ppt"];
    const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();
    if (!validTypes.includes(fileExtension)) {
      toast.error("Please upload a PDF or PowerPoint file.");
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File size should be less than 20MB.");
      return;
    }
    setSelectedFile(file);
  };

  const removeFile = () => {
    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // No longer need triggerFileInput function

  const handleUpload = async () => {
    if (!selectedFile) {
      toast.error("Please select a pitch deck file first.");
      return;
    }
    if (!user) {
      // setIsLoginModalOpen(true); // Keep commented if not using modal
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading("Uploading pitch deck...");

    const formData = new FormData();
    formData.append("pitchDeck", selectedFile);

    // --- Direct Fetch Implementation ---
    const url = `${import.meta.env.VITE_API_BASE || 'http://localhost:3000'}/api/get-funded/funding-opportunity/submit`;
    const token = localStorage.getItem('token');
    const headers = new Headers(); // Create Headers object

    if (token && token !== 'undefined') {
      headers.set('Authorization', `Bearer ${token}`);
    }
    // DO NOT set 'Content-Type' here for FormData!

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: headers, // Pass the headers object
        body: formData,   // Pass FormData directly
      });

      const responseData = await response.json(); // Always try to parse JSON

      if (!response.ok) {
        // Throw error using message from backend if available
        throw new Error(responseData.message || responseData.error || `HTTP error! status: ${response.status}`);
      }
      

      // Handle success (assuming backend sends a 'message' field on success)
      toast.success(responseData.message || "Pitch deck submitted successfully!", {
        id: toastId,
      });
      removeFile(); // Clear the selected file from UI

    } catch (error: any) {
      // Handle error
      console.error("Upload failed:", error);
      // Use the error message thrown from the try block or a default
      toast.error(error.message || "Upload failed. Please try again.", { id: toastId });

    } finally {
      setIsUploading(false); // Stop loading indicator
    }
    // --- End Direct Fetch Implementation ---
  };


  return (
    <div className="mx-auto max-w-4xl">
      <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-3xl font-bold text-white">
              Get priority access to{" "}
              <span className="text-purple-400">Investors</span> and{" "}
              <span className="text-blue-400">accelerators</span>
            </h2>
            <p className="text-xl text-gray-300">
              Join the waitlist. Submit your Pitch deck today
            </p>
          </div>

          {/* Upload Section */}
          <div className="mx-auto max-w-2xl">
            <div className="group relative">

              {/* --- FIX: Changed the main div to a label and added htmlFor --- */}
              <label // <-- Use label instead of div
                htmlFor="pitchDeckInput" // <-- Point label to the input's ID
                className={cn(
                  "block cursor-pointer border-2 border-dashed rounded-xl p-12 transition-all duration-300 bg-gray-800/30", // Added block
                  isDragging
                    ? "border-purple-500 bg-purple-500/10"
                    : "border-gray-600 hover:border-purple-500/50",
                  selectedFile ? "border-green-500/50" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                // Removed onClick={triggerFileInput}
              >
              {/* --- END FIX --- */}
                {/* --- FIX: Added id="pitchDeckInput" --- */}
                <input
                  type="file"
                  id="pitchDeckInput" // <-- Added ID here
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.pptx,.ppt"
                  className="hidden" // Keep hidden
                  // Make input unclickable directly, label handles it
                  style={{ pointerEvents: 'none' }} 
                />
                {/* --- END FIX --- */}

                {/* Content inside the label - clicking this triggers the input */}
                <div className="flex flex-col items-center space-y-4 text-center">
                  {!selectedFile ? (
                    <>
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20">
                        <Upload className="h-8 w-8 text-purple-400" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-xl font-semibold text-white">
                          Upload Your Pitch Deck
                        </h3>
                        <p className="text-sm text-gray-400">
                          Drag and drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500">
                          Supported formats: PDF, PPTX, PPT (Max size: 20MB)
                        </p>
                      </div>

                      
                      {/* <Button
                        type="button"
                        className="mt-4 bg-purple-600 text-white hover:bg-purple-700 z-10 relative" 
                        size="lg"
                      >
                        Choose File
                      </Button> */}
                    </>
                  ) : (
                    // Display for when a file IS selected
                    <div className="w-full space-y-4">
                      <div className="flex items-center justify-between space-x-4 rounded-lg bg-gray-800/50 p-4">
                         {/* ... (file info display - no changes needed here) ... */}
                         <div className="flex min-w-0 items-center space-x-4">
                          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-purple-600/20">
                            <Upload className="h-6 w-6 text-purple-400" />
                          </div>
                          <div className="min-w-0 text-left">
                            <p className="truncate text-sm font-medium text-white">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)}{" "}
                              MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={(e) => {
                             e.preventDefault(); // Prevent label click
                             removeFile();
                          }}
                          className="rounded-full p-2 hover:bg-gray-700 z-10 relative" // Added z-index
                        >
                          <X className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>

                      {/* --- FIX: Added stopPropagation to prevent label click --- */}
                      <Button
                        className="w-full bg-purple-600 text-white hover:bg-purple-700 z-10 relative" // Added z-index
                        onClick={(e) => {
                           e.stopPropagation(); // Prevent label click
                           e.preventDefault(); // Prevent potential form submit
                           handleUpload();
                        }}
                        size="lg"
                        disabled={isUploading}
                      >
                      {/* --- END FIX --- */}
                        {isUploading ? (
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : null}
                        {isUploading ? "Uploading..." : "Upload Pitch Deck"}
                      </Button>
                    </div>
                  )}
                </div>
              </label> {/* Closing label tag */}

              {/* Animated Border Effect */}
              <div
                className={cn(
                  "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur transition duration-500",
                  isDragging ? "opacity-30" : "opacity-0 group-hover:opacity-20"
                )}
                 style={{ pointerEvents: 'none' }} // Ensure border doesn't block label
              />
            </div>

            {/* Additional Info */}
            <div className="mt-8 space-y-4 text-center">
               {/* ... (no changes needed here) ... */}
               <p className="text-sm text-gray-400">
                Your pitch deck will be reviewed by our team and shared with
                relevant investors and accelerators
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <p className="text-sm text-gray-400">
                  Secure upload with end-to-end encryption
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* <AuthModals isLoginOpen={isLoginModalOpen} setIsLoginOpen={setIsLoginModalOpen} /> */}
    </div>
  );
}