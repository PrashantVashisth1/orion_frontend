// // import { Upload } from "lucide-react";
// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// // export function AIPitchReviewSection() {
// //   return (
// //     <div className="relative">
// //       {/* Coming Soon Overlay */}
// //       <div className="absolute inset-0 z-10 bg-gray-900/80 backdrop-blur-sm flex items-center justify-center">
// //         <div className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold animate-pulse">
// //           Coming Soon
// //         </div>
// //       </div>

// //       {/* Main Content */}
// //       <Card className="bg-gray-800/50 border-gray-700">
// //         <CardHeader className="border-b border-gray-700">
// //           <CardTitle className="text-2xl font-bold text-center text-white">
// //             Get Your Pitch Deck Reviewed
// //           </CardTitle>
// //         </CardHeader>
// //         <CardContent className="pt-6">
// //           <div className="max-w-xl mx-auto space-y-6">
// //             {/* Upload Section */}
// //             <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center">
// //               <Upload className="h-12 w-12 mx-auto mb-4 text-gray-400" />
// //               <div className="space-y-2">
// //                 <h3 className="text-lg font-medium text-white">
// //                   Upload Your File
// //                 </h3>
// //                 <p className="text-sm text-gray-400">PDF or MS Powerpoint</p>
// //                 <p className="text-xs text-gray-500">max. upto 20 MB</p>
// //               </div>
// //             </div>

// //             {/* Submit Button */}
// //             <Button
// //               className="w-full bg-purple-600 hover:bg-purple-700 text-white"
// //               size="lg"
// //             >
// //               Submit
// //             </Button>

// //             {/* Gemini Info */}
// //             <div className="mt-4 text-center text-sm text-gray-400">
// //               Gemini output will appear as a pop-up window
// //             </div>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   );
// // }

// import { useState } from "react";
// import { Upload } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import AutonLogo from "@/assets/auton-logo.png"; // Make sure this path is correct

// export function AIPitchReviewSection() {
//   const [activeTab, setActiveTab] = useState("ai-review");

//   // Overlay for the AI Pitch Review section ONLY
//   const ComingSoonOverlay = () => (
//     <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-900/80 backdrop-blur-sm">
//       <div className="animate-pulse rounded-full bg-purple-600 px-6 py-3 text-lg font-semibold text-white">
//         Coming Soon
//       </div>
//     </div>
//   );

//   // Smaller "Coming Soon" indicator for Auton
//   const SmallComingSoonIndicator = () => (
//     <div className="mt-6 flex justify-center"> {/* Added margin-top */}
//       <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white"> {/* Smaller text/padding */}
//         Coming Soon
//       </div>
//     </div>
//   );


//   return (
//     <div className="space-y-6">
//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         {/* Tab Titles */}
//         <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 text-lg h-12">
//           <TabsTrigger
//             value="ai-review"
//             className="data-[state=active]:bg-purple-600 text-lg"
//           >
//             AI Pitch Review
//           </TabsTrigger>
//           <TabsTrigger
//             value="auton"
//             className="data-[state=active]:bg-purple-600 text-lg"
//           >
//             Auton: Your AI Companion
//           </TabsTrigger>
//         </TabsList>

//         {/* Tab Content 1: AI Pitch Review */}
//         <TabsContent value="ai-review" className="mt-6">
//           <Card className="relative border-gray-700 bg-gray-800/50">
//             {/* Original Content */}
//             <CardHeader className="border-b border-gray-700">
//               <CardTitle className="text-center text-xl font-bold text-white">
//                 Get Your Pitch Deck Reviewed
//               </CardTitle>
//             </CardHeader>
//             <CardContent className="pt-6">
//               <div className="mx-auto max-w-xl space-y-6">
//                 <div className="rounded-lg border-2 border-dashed border-gray-600 p-8 text-center">
//                   <Upload className="mx-auto mb-4 h-12 w-12 text-gray-400" />
//                   <div className="space-y-2">
//                     <h3 className="text-lg font-medium text-white">
//                       Upload Your File
//                     </h3>
//                     <p className="text-sm text-gray-400">
//                       PDF or MS Powerpoint
//                     </p>
//                     <p className="text-xs text-gray-500">max. upto 20 MB</p>
//                   </div>
//                 </div>
//                 <Button
//                   className="w-full bg-purple-600 text-white hover:bg-purple-700"
//                   size="lg"
//                   disabled
//                 >
//                   Submit
//                 </Button>
//                 <div className="mt-4 text-center text-sm text-gray-400">
//                   AI output will appear as a pop-up window
//                 </div>
//               </div>
//             </CardContent>
//             {/* Full Coming Soon Overlay */}
//             <ComingSoonOverlay />
//           </Card>
//         </TabsContent>

//         {/* Tab Content 2: Auton */}
//         <TabsContent value="auton" className="mt-6">
//           <Card className="border-gray-700 bg-gray-800/50">
//             <CardContent className="flex flex-col items-center justify-center p-8">
//               <img
//                 src={AutonLogo}
//                 alt="Auton Logo"
//                 className="w-100 h-100 object-contain"
//               />
//               {/* FIX: Added the small indicator below the image */}
//               <SmallComingSoonIndicator />
//             </CardContent>
//             {/* FIX: Removed the ComingSoonOverlay from here */}
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// }

import { useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AutonLogo from "@/assets/auton-logo.png"; // Ensure this path is correct

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
    <div className="mt-6 flex justify-center"> {/* Align left */}
      <div className="rounded-full bg-purple-600 px-4 py-2 text-sm font-semibold text-white">
        Coming Soon
      </div>
    </div>
  );


  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab Titles */}
        <TabsList className="grid w-full grid-cols-2 bg-gray-800/50 h-auto">
          <TabsTrigger
            value="ai-review"
            className="data-[state=active]:bg-purple-600 text-lg"
          >
            AI Pitch Review
          </TabsTrigger>
          <TabsTrigger
            value="auton"
            className="data-[state=active]:bg-purple-600 text-lg h-auto"
          >
            A**** — Your AI Companion
          </TabsTrigger>
        </TabsList>

        {/* Tab Content 1: AI Pitch Review (Unchanged) */}
        <TabsContent value="ai-review" className="mt-6">
          <Card className="relative border-gray-700 bg-gray-800/50">
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

        {/* Tab Content 2: Auton (Updated Layout) */}
        <TabsContent value="auton" className="mt-6">
          <Card className="border-gray-700 bg-gray-800/50 overflow-hidden"> {/* Added overflow-hidden */}
             {/* --- FIX: Use Grid for two columns --- */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-h-[300px]"> {/* Ensure min height */}

              {/* Left Column: Text + Coming Soon */}
              <div className="flex flex-col justify-center p-8 md:p-12"> {/* Added padding */}
                 
                 <p className="text-gray-400 mb-6">
                    <span className="font-bold">A****</span> is a personalized, <span className="font-bold">strategic, data-driven, and emotionally intelligent </span> 
                    AI Companion that helps founders navigate their startup journey — intelligently, proactively, and personally.

                  
                 </p>
                 <span className="mt-2">“Peace of mind and a piece of intelligence — for every founder.”</span>
                 <SmallComingSoonIndicator />
              </div>

              {/* Right Column: Image */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-gray-700/50 to-gray-800/30 w-full"> {/* Optional background gradient */}
                <img
                  src={AutonLogo}
                  alt="Auton Logo"
                  className="w-full" // Make image fill space but maintain aspect ratio
                  style={{ maxHeight: '450px' }} // Optional: constrain max height
                />
              </div>

            </div>
            {/* --- END FIX --- */}
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}