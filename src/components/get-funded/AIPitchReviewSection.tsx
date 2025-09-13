import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AIPitchReviewSection() {
  return (
    <div className="relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 z-10 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold animate-pulse">
          Coming Soon
        </div>
      </div>

      {/* Main Content */}
      <Card className="bg-gray-800/50 border-gray-700">
        <CardHeader className="border-b border-gray-700">
          <CardTitle className="text-2xl font-bold text-center text-white">
            Get Your Pitch Deck Reviewed
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="max-w-xl mx-auto space-y-6">
            {/* Upload Section */}
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-white">
                  Upload Your File
                </h3>
                <p className="text-sm text-gray-400">PDF or MS Powerpoint</p>
                <p className="text-xs text-gray-500">max. upto 20 MB</p>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full bg-purple-600 hover:bg-purple-700 text-white"
              size="lg"
            >
              Submit
            </Button>

            {/* Gemini Info */}
            <div className="mt-4 text-center text-sm text-gray-400">
              Gemini output will appear as a pop-up window
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
