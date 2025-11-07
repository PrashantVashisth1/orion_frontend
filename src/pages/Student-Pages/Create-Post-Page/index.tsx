// src/pages/create-post/index.tsx
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { useProfileRequirement } from "@/hooks/useProfileRequirement"
import { useCreatePostForm } from "@/hooks/useCreatePostForm"
import {
  ArrowLeft,
  Upload,
  X,
  FileText,
  Image as ImageIcon,
  Send,
  Camera,
  Paperclip,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

export default function CreatePostPage() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()
  const { checkProfileForPost } = useProfileRequirement()

  const {
    text,
    uploadedFiles,
    isUploading,
    isSubmitting,
    canSubmit,
    setText,
    handleFileUpload,
    handleFileRemove,
    handleSubmit,
    clearForm,
  } = useCreatePostForm()

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length > 0) {
      handleFileUpload(files)
    }
  }

  const onSubmit = async () => {
    if (!canSubmit) return
    if (!checkProfileForPost()) return
    const result = await handleSubmit()
    if (result?.success) {
      navigate("/postlogin")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-violet-50 to-pink-50 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-32 w-96 h-96 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[28rem] h-[28rem] bg-pink-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-6 border-b border-gray-200 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/postlogin")}
              className="p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="h-6 w-6 text-gray-600 group-hover:text-gray-900" />
            </button>
            <h1 className="text-3xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Create Post
            </h1>
          </div>
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Posting...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Post</span>
              </div>
            )}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 px-6 sm:px-8 md:px-12 lg:px-16 xl:px-24 py-10">
        <div className="w-full">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 sm:p-10 lg:p-12 border border-gray-200 shadow-2xl transition-all duration-300 hover:shadow-[0_0_25px_rgba(147,51,234,0.1)]">
            
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-semibold text-lg shadow-lg ring-2 ring-white">
                Y
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 text-lg">You</h3>
                <p className="text-gray-500 text-sm">Share your thoughts with the community</p>
              </div>
            </div>

            {/* Text Input */}
            <div className="mb-8">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
                className="min-h-[160px] bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-300/40 resize-none text-base leading-relaxed rounded-xl"
                maxLength={2000}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">Your voice matters ✨</p>
                <span className="text-gray-400 text-sm">{text.length}/2000</span>
              </div>
            </div>

            {/* Upload Section */}
            <div className="mb-8">
              <div
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-gray-300 rounded-xl p-10 text-center bg-gradient-to-br from-gray-50 to-gray-100 hover:from-purple-50 hover:to-blue-50 transition-all duration-300 ${
                  isUploading ? "cursor-not-allowed opacity-50" : "cursor-pointer"
                } group`}
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {isUploading ? (
                      <Loader2 className="h-10 w-10 text-purple-500 animate-spin" />
                    ) : (
                      <Upload className="h-10 w-10 text-purple-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-gray-900 font-medium text-lg mb-1">
                      {isUploading ? "Uploading..." : "Click to upload files"}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Supports images, PDFs, and documents (max 5MB each)
                    </p>
                  </div>
                </div>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                accept="image/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileInputChange}
                className="hidden"
                disabled={isUploading || isSubmitting}
              />
            </div>

            {/* Uploaded Files Preview */}
            {uploadedFiles.length > 0 && (
              <div className="mb-8">
                <h4 className="text-gray-900 font-medium mb-3 flex items-center space-x-2">
                  <Paperclip className="h-4 w-4 text-gray-600" />
                  <span>Attached Files ({uploadedFiles.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            {file.type === "image" ? (
                              <ImageIcon className="h-5 w-5 text-blue-500" />
                            ) : (
                              <FileText className="h-5 w-5 text-red-500" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-gray-900 font-medium truncate text-sm">{file.name}</p>
                            <p className="text-gray-500 text-xs capitalize">{file.type}</p>
                          </div>
                        </div>
                        {file.type === "image" && file.url && (
                          <div className="mt-3 rounded-lg overflow-hidden ring-1 ring-gray-200">
                            <img
                              src={file.url}
                              alt="Preview"
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement
                                target.style.display = "none"
                              }}
                            />
                          </div>
                        )}
                      </div>
                      <button
                        onClick={() => handleFileRemove(file.id)}
                        disabled={isUploading || isSubmitting}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-200 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  disabled={isUploading || isSubmitting}
                  className="flex items-center space-x-2 text-gray-500 hover:text-purple-500 transition-colors duration-200 disabled:opacity-50"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-sm font-medium">Add Media</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    clearForm()
                    navigate("/postlogin")
                  }}
                  disabled={isSubmitting}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100 px-4 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSubmit}
                  disabled={!canSubmit}
                  className="bg-gradient-to-r from-blue-700 to-purple-700 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span className="cursor-pointer">Share Post</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
