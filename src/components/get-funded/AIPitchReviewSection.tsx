// import { Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export function AIPitchReviewSection() {
//   return (
//     <div className="relative">
//       {/* Coming Soon Overlay */}
//       <div className="absolute inset-0 z-10 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
//         <div className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold animate-pulse">
//           Coming Soon
//         </div>
//       </div>

//       {/* Main Content */}
//       <Card className="bg-gray-800/50 border-gray-700">
//         <CardHeader className="border-b border-gray-700">
//           <CardTitle className="text-2xl font-bold text-center text-white">
//             Get Your Pitch Deck Reviewed
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="pt-6">
//           <div className="max-w-xl mx-auto space-y-6">
//             {/* Upload Section */}
//             <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
//               <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
//               <div className="space-y-2">
//                 <h3 className="text-lg font-medium text-white">
//                   Upload Your File
//                 </h3>
//                 <p className="text-sm text-gray-400">PDF or MS Powerpoint</p>
//                 <p className="text-xs text-gray-500">max. upto 20 MB</p>
//               </div>
//             </div>

//             {/* Submit Button */}
//             <Button
//               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
//               size="lg"
//             >
//               Submit
//             </Button>

//             {/* Gemini Info */}
//             <div className="mt-4 text-center text-sm text-gray-400">
//               Gemini output will appear as a pop-up window
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutonLogo from "@/assets/auton-logo.png"; // Make sure this path is correct

export function AIPitchReviewSection() {
  const [activeTab, setActiveTab] = useState("ai-review");

  // Overlay for the AI Pitch Review section ONLY
  const ComingSoonOverlay = () => (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-900/80 backdrop-blur-sm">
      <div className="animate-pulse rounded-full bg-purple-600 px-6 py-3 text-lg font-semibold text-white">
        Coming Soon
      </div>
    </div>
  );

  // Smaller "Coming Soon" indicator for Auton
  const SmallComingSoonIndicator = () => (
    <div className="mt-6 flex justify-center"> {/* Added margin-top */}
      <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white"> {/* Smaller text/padding */}
        Coming Soon
      </div>
    </div>
  );


  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Titles */}
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 text-lg h-12">
          <TabsTrigger
            value="ai-review"
            className="data-[state=active]:bg-purple-600 text-lg"
          >
            AI Pitch Review
          </TabsTrigger>
          <TabsTrigger
            value="auton"
            className="data-[state=active]:bg-purple-600 text-lg"
          >
            Auton: Your Funding Partner
          </TabsTrigger>
        </TabsList>

        {/* Tab Content 1: AI Pitch Review */}
        <TabsContent value="ai-review" className="mt-6">
          <Card className="relative border-gray-700 bg-gray-800/50">
            {/* Original Content */}
            <CardHeader className="border-b border-gray-700">
              <CardTitle className="text-center text-xl font-bold text-white">
                Get Your Pitch Deck Reviewed
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mx-auto max-w-xl space-y-6">
                <div className="rounded-lg border-2 border-dashed border-gray-600 p-8 text-center">
                  <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                  <div className="space-y-2">
                    <h3 className="text-lg font-medium text-white">
                      Upload Your File
                    </h3>
                    <p className="text-sm text-gray-400">
                      PDF or MS Powerpoint
                    </p>
                    <p className="text-xs text-gray-500">max. upto 20 MB</p>
                  </div>
                </div>
                <Button
                  className="w-full bg-purple-600 text-white hover:bg-purple-700"
                  size="lg"
                  disabled
                >
                  Submit
                </Button>
                <div className="mt-4 text-center text-sm text-gray-400">
                  AI output will appear as a pop-up window
                </div>
              </div>
            </CardContent>
            {/* Full Coming Soon Overlay */}
            <ComingSoonOverlay />
          </Card>
        </TabsContent>

        {/* Tab Content 2: Auton */}
        <TabsContent value="auton" className="mt-6">
          {/* FIX: Removed 'relative' and 'overflow-hidden' from Card */}
          <Card className="border-gray-700 bg-gray-800/50">
            {/* FIX: Changed layout to vertical flex, removed min-height */}
            <CardContent className="flex flex-col items-center justify-center p-8">
              {/* Logo is now clearly visible */}
              <img
                src={AutonLogo}
                alt="Auton Logo"
                className="w-100 h-100 object-contain"
              />
              {/* FIX: Added the small indicator below the image */}
              <SmallComingSoonIndicator />
            </CardContent>
            {/* FIX: Removed the ComingSoonOverlay from here */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}