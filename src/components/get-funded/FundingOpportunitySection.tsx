import { Upload, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useState, useRef } from "react"

export function FundingOpportunitySection() {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    
    const file = e.dataTransfer.files[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      validateAndSetFile(file)
    }
  }

  const validateAndSetFile = (file: File) => {
    // Check file type
    const validTypes = ['.pdf', '.pptx', '.ppt']
    const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase()
    
    if (!validTypes.includes(fileExtension)) {
      alert('Please upload a PDF or PowerPoint file')
      return
    }

    // Check file size (20MB)
    if (file.size > 20 * 1024 * 1024) {
      alert('File size should be less than 20MB')
      return
    }

    setSelectedFile(file)
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleUpload = () => {
    if (!selectedFile) return
    // TODO: Implement actual file upload logic here
    console.log('Uploading file:', selectedFile)
  }

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/20">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="text-center mb-12 space-y-4">
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
          <div className="max-w-2xl mx-auto">
            <div className="group relative">
              <div 
                className={cn(
                  "border-2 border-dashed rounded-xl p-12 transition-all duration-300 bg-gray-800/30",
                  isDragging ? "border-purple-500 bg-purple-500/10" : "border-gray-600 hover:border-purple-500/50",
                  selectedFile ? "border-green-500/50" : ""
                )}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept=".pdf,.pptx,.ppt"
                  className="hidden"
                />

                <div className="flex flex-col items-center text-center space-y-4">
                  {!selectedFile ? (
                    <>
                      <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center">
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

                      <Button 
                        className="mt-4 bg-purple-600 hover:bg-purple-700 text-white"
                        size="lg"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Choose File
                      </Button>
                    </>
                  ) : (
                    <div className="space-y-4 w-full">
                      <div className="flex items-center justify-between space-x-4 bg-gray-800/50 p-4 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center flex-shrink-0">
                            <Upload className="h-6 w-6 text-purple-400" />
                          </div>
                          <div className="text-left min-w-0">
                            <p className="text-sm font-medium text-white truncate">
                              {selectedFile.name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={removeFile}
                          className="p-2 hover:bg-gray-700 rounded-full"
                        >
                          <X className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>

                      <Button 
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white"
                        onClick={handleUpload}
                        size="lg"
                      >
                        Upload Pitch Deck
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Animated Border Effect */}
              <div className={cn(
                "absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 blur transition duration-500",
                isDragging ? "opacity-30" : "opacity-0 group-hover:opacity-20"
              )} />
            </div>

            {/* Additional Info */}
            <div className="mt-8 text-center space-y-4">
              <p className="text-sm text-gray-400">
                Your pitch deck will be reviewed by our team and shared with relevant investors and accelerators
              </p>
              <div className="flex items-center justify-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <p className="text-sm text-gray-400">
                  Secure upload with end-to-end encryption
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
