// 1. Updated Create Post Page - src/pages/create-post/index.tsx
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
  Loader2
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

    // Check if profile is complete before allowing post creation
    if (!checkProfileForPost()) {
      return
    }

    const result = await handleSubmit()
    if (result?.success) {
      navigate('/postlogin')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-green-500/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Subtle grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_60%,transparent_100%)] pointer-events-none"></div>

      {/* Header */}
      <div className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-6 border-b border-gray-700/50 backdrop-blur-sm">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/postlogin')}
              className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
            >
              <ArrowLeft className="h-6 w-6 text-gray-400 group-hover:text-white transition-colors" />
            </button>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white">Create Post</h1>
          </div>
          <Button
            onClick={onSubmit}
            disabled={!canSubmit}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium px-6 py-2 rounded-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
      <main className="relative z-10 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8">
        <div className="w-full">
          {/* Post Creation Card */}
          <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-sm rounded-2xl p-6 sm:p-8 lg:p-10 border border-gray-700/50 shadow-2xl">
            {/* User Info */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                Y
              </div>
              <div>
                <h3 className="font-semibold text-white text-lg">You</h3>
                <p className="text-gray-400 text-sm sm:text-base">Share your thoughts with the community</p>
              </div>
            </div>

            {/* Caption Input */}
            <div className="mb-6">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What's on your mind? Share your thoughts, ideas, or updates..."
                className="min-h-[120px] sm:min-h-[150px] lg:min-h-[180px] bg-gray-700/30 border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 resize-none text-base sm:text-lg leading-relaxed"
                maxLength={2000}
                disabled={isSubmitting}
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-gray-500 text-sm">Share your story with the community</p>
                <span className="text-gray-500 text-sm">{text.length}/2000</span>
              </div>
            </div>

            {/* File Upload Section */}
            <div className="mb-6">
              <div 
                onClick={() => !isUploading && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-gray-600/50 rounded-xl p-6 sm:p-8 lg:p-10 text-center hover:border-purple-500/50 hover:bg-gray-700/20 transition-all duration-300 ${
                  isUploading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                } group`}
              >
                <div className="flex flex-col items-center space-y-4 sm:space-y-6">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {isUploading ? (
                      <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-400 animate-spin" />
                    ) : (
                      <Upload className="h-8 w-8 sm:h-10 sm:w-10 lg:h-12 lg:w-12 text-purple-400" />
                    )}
                  </div>
                  <div>
                    <p className="text-white font-medium mb-2 text-base sm:text-lg lg:text-xl">
                      {isUploading ? 'Uploading files...' : 'Click to upload files'}
                    </p>
                    <p className="text-gray-400 text-sm sm:text-base">Support for images (PNG, JPG, GIF) and PDF documents</p>
                    <p className="text-gray-500 text-xs sm:text-sm mt-1">Maximum file size: 5MB each, up to 5 files</p>
                  </div>
                  <div className="flex items-center space-x-4 sm:space-x-6 text-gray-400">
                    <div className="flex items-center space-x-2">
                      <ImageIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm">Images</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5" />
                      <span className="text-xs sm:text-sm">Documents</span>
                    </div>
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
              <div className="mb-6">
                <h4 className="text-white font-medium mb-4 flex items-center space-x-2">
                  <Paperclip className="h-4 w-4" />
                  <span>Attached Files ({uploadedFiles.length})</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {uploadedFiles.map((file) => (
                    <div key={file.id} className="relative group">
                      <div className="bg-gray-700/50 rounded-xl p-4 border border-gray-600/50 hover:border-purple-500/50 transition-all duration-300">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                            {file.type === 'image' ? (
                              <ImageIcon className="h-5 w-5 text-blue-400" />
                            ) : (
                              <FileText className="h-5 w-5 text-red-400" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-medium truncate text-sm">{file.name}</p>
                            <p className="text-gray-400 text-xs capitalize">{file.type}</p>
                          </div>
                        </div>
                        
                        {/* Image Preview */}
                        {file.type === 'image' && file.url && (
                          <div className="mt-3 rounded-lg overflow-hidden">
                            <img
                              src={file.url}
                              alt="Preview"
                              className="w-full h-32 object-cover"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.style.display = 'none';
                              }}
                            />
                          </div>
                        )}
                      </div>
                      
                      {/* Remove Button */}
                      <button
                        onClick={() => handleFileRemove(file.id)}
                        disabled={isUploading || isSubmitting}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50"
                      >
                        <X className="h-3 w-3 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-between pt-6 border-t border-gray-700/50 space-y-4 sm:space-y-0">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => !isUploading && fileInputRef.current?.click()}
                  disabled={isUploading || isSubmitting}
                  className="flex items-center space-x-2 text-gray-400 hover:text-purple-400 transition-colors duration-200 disabled:opacity-50"
                >
                  <Camera className="h-5 w-5" />
                  <span className="text-sm sm:text-base font-medium">Add Media</span>
                </button>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    clearForm()
                    navigate('/postlogin')
                  }}
                  disabled={isSubmitting}
                  className="border-gray-600 text-gray-300 hover:bg-gray-700/50 px-4 sm:px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={onSubmit}
                  disabled={!canSubmit}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 sm:px-6 py-2"
                >
                  {isSubmitting ? (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Posting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Send className="h-4 w-4" />
                      <span>Share Post</span>
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

