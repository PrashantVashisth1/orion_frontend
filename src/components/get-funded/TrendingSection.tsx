// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { useState, useEffect } from "react";
// import { apiClient } from "@/lib/api-client";
// import { Skeleton } from "@/components/ui/skeleton";
// import type { StartupCardData, TrendingApiResponse } from "@/types/trending";



// function StartupCard({
//   name,
//   description,
//   funding,
//   team,
//   growth, // Keep growth prop, even if often undefined
//   category,
//   isWeekly = false,
// }: StartupCardData) { // Use the imported type
//   return (
//     <Card
//       className={cn(
//         "flex flex-col overflow-hidden transition-all duration-300", // Added flex flex-col
//         isWeekly
//           ? "border-purple-500/20 bg-gradient-to-br from-purple-900/50 to-blue-900/50"
//           : "border-gray-700 bg-gray-800/50 hover:bg-gray-800/70"
//       )}
//     >
//       {/* FIX: Made CardContent grow to ensure consistent card heights */}
//       <CardContent className="flex flex-1 flex-col p-6"> {/* Added flex flex-1 flex-col */}
//         <div className="mb-4 flex items-start justify-between">
//           <div>
//             <h3 className="mb-1 text-xl font-semibold text-white">{name}</h3>
//             {category && ( // Only show badge if category exists
//               <Badge
//                 variant="secondary"
//                 className={cn(
//                   "bg-opacity-20",
//                   isWeekly
//                     ? "bg-purple-500 text-purple-200"
//                     : "bg-blue-500 text-blue-200"
//                 )}
//               >
//                 {category}
//               </Badge>
//             )}
//           </div>
//         </div>

//         {/* FIX: Gave description a min height and allow word break */}
//         <p className="mb-6 flex-1 text-sm text-gray-300 min-h-[4.5rem] break-words"> {/* Added flex-1 and min-h */}
//           {description || "No description available."} {/* Handle null description */}
//         </p>

//         {(funding || team || growth) && (
//           <div className="mb-6 grid grid-cols-3 gap-4 border-y border-gray-700 py-4">
//             {funding && (
//               <div>
//                 <p className="font-semibold text-purple-400">{funding}</p>
//                 <p className="text-xs text-gray-400">Funding</p>
//               </div>
//             )}
//             {team && (
//               <div>
//                 <p className="font-semibold text-blue-400">{team}</p>
//                 <p className="text-xs text-gray-400">Team</p>
//               </div>
//             )}
//             {growth && (
//               <div>
//                 <p className="font-semibold text-cyan-400">{growth}</p>
//                 <p className="text-xs text-gray-400">Growth</p>
//               </div>
//             )}
//           </div>
//         )}

//         {/* FIX: Pushed button to bottom */}
//         <Button
//           variant="secondary"
//           className={cn(
//             "mt-auto w-full", // Added mt-auto
//             isWeekly
//               ? "bg-purple-600 text-white hover:bg-purple-700"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           )}
//           // TODO: Link this button to the startup's profile page later
//           // onClick={() => navigate(`/profile/${startupId}`)}
//         >
//           View Profile
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }


// function transformProfileToCardData(profile: any, isWeekly: boolean = false): StartupCardData {
//   return {
//     id: profile.id, // Use profile ID
//     name: profile.companyDetails?.companyName || "Unnamed Startup",
//     description: profile.companyDetails?.companyDescription || "No description available.",
//     category: profile.companyDetails?.industry || "General",
//     funding: profile.businessDetails?.fundingStage || undefined,
//     team: profile.businessDetails?.teamSize || undefined,
//     growth: "Growing", // Replace with revenue or actual growth metric if available
//     isWeekly: isWeekly,
//   };
// }


// // --- Loading Skeletons ---
// const StartupCardSkeleton = () => (
//   <div className="flex flex-col space-y-3 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
//     <Skeleton className="h-6 w-3/4 rounded" />
//     <Skeleton className="h-4 w-1/4 rounded" />
//     <div className="flex-1 space-y-2 pt-4">
//       <Skeleton className="h-4 w-full rounded" />
//       <Skeleton className="h-4 w-full rounded" />
//       <Skeleton className="h-4 w-5/6 rounded" />
//     </div>
//     <div className="grid grid-cols-3 gap-4 border-y border-gray-700 py-4">
//       <Skeleton className="h-8 w-full rounded" />
//       <Skeleton className="h-8 w-full rounded" />
//       <Skeleton className="h-8 w-full rounded" />
//     </div>
//     <Skeleton className="h-10 w-full rounded-lg" />
//   </div>
// );


// export function TrendingSection() {
//   const [startupOfTheWeek, setStartupOfTheWeek] = useState<StartupCardData | null>(null);
//   const [trendingStartups, setTrendingStartups] = useState<StartupCardData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchTrendingData = async () => {
//       try {
//         setIsLoading(true);
//         const response = await apiClient.get<TrendingApiResponse>("/get-funded/trending");
//         console.log(response.trendingStartups[0 ])
        
//         if (response.startupOfTheWeek) {
//           setStartupOfTheWeek(transformProfileToCardData(response.startupOfTheWeek, true));
//         } else {
//           setStartupOfTheWeek(null); // Handle case where none is set
//         }

//         if (response.trendingStartups && response.trendingStartups.length > 0) {
//           setTrendingStartups(response.trendingStartups.map(profile => transformProfileToCardData(profile)));
//         } else {
//           setTrendingStartups([]); // Handle case where none are set
//         }
        
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching trending startups:", err);
//         setError("Failed to load trending startups.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchTrendingData();
//   }, []);

//   return (
//     <div className="space-y-8">
//       {/* Startup of the Week Section */}
//       <section>
//         <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-semibold text-white">
//           <span className="text-orange-400">Startup of the Week</span> 
//         </h2>
//         {isLoading ? (
//           <StartupCardSkeleton />
//         ) : error ? (
//           <p className="text-center text-red-400">{error}</p>
//         ) : startupOfTheWeek ? (
//           <StartupCard {...startupOfTheWeek} />
//         ) : (
//           <p className="text-center text-gray-400">No startup of the week selected.</p>
//         )}
//       </section>

//       {/* Trending Startups Section */}
//       <section>
//         <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-semibold text-white">
//           Trending Startups
//         </h2>
//         {isLoading ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
//             {[1, 2, 3].map(i => <StartupCardSkeleton key={i} />)}
//           </div>
//         ) : error ? (
//            <p className="text-center text-red-400">{error}</p>
//         ) : trendingStartups.length > 0 ? (
//           <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
//             {trendingStartups.map((startup) => (
//               <StartupCard key={startup.id} {...startup} /> // Use startup.id as key
//             ))}
//           </div>
//         ) : (
//           <p className="text-center text-gray-400">No trending startups found.</p>
//         )}
//       </section>
//     </div>
//   );
// }


import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Add this import
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import type { StartupCardData, TrendingApiResponse } from "@/types/trending";

function StartupCard({
  id, // Make sure id is included
  name,
  description,
  funding,
  team,
  growth,
  category,
  isWeekly = false,
}: StartupCardData) {
  const navigate = useNavigate(); // Add this hook

  const handleViewProfile = () => {
    // Navigate to the public profile page using the user_id
    navigate(`/profile/${id}`);
  };

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-300",
        isWeekly
          ? "border-purple-500/20 bg-gradient-to-br from-purple-900/50 to-blue-900/50"
          : "border-gray-700 bg-gray-800/50 hover:bg-gray-800/70"
      )}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="mb-1 text-xl font-semibold text-white">{name}</h3>
            {category && (
              <Badge
                variant="secondary"
                className={cn(
                  "bg-opacity-20",
                  isWeekly
                    ? "bg-purple-500 text-purple-200"
                    : "bg-blue-500 text-blue-200"
                )}
              >
                {category}
              </Badge>
            )}
          </div>
        </div>

        <p className="mb-6 flex-1 text-sm text-gray-300 min-h-[4.5rem] break-words">
          {description || "No description available."}
        </p>

        {(funding || team || growth) && (
          <div className="mb-6 grid grid-cols-3 gap-4 border-y border-gray-700 py-4">
            {funding && (
              <div>
                <p className="font-semibold text-purple-400">{funding}</p>
                <p className="text-xs text-gray-400">Funding</p>
              </div>
            )}
            {team && (
              <div>
                <p className="font-semibold text-blue-400">{team}</p>
                <p className="text-xs text-gray-400">Team</p>
              </div>
            )}
            {growth && (
              <div>
                <p className="font-semibold text-cyan-400">{growth}</p>
                <p className="text-xs text-gray-400">Growth</p>
              </div>
            )}
          </div>
        )}

        <Button
          variant="secondary"
          className={cn(
            "mt-auto w-full",
            isWeekly
              ? "bg-purple-600 text-white hover:bg-purple-700"
              : "bg-blue-600 text-white hover:bg-blue-700"
          )}
          onClick={handleViewProfile} // Add onClick handler
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

function transformProfileToCardData(profile: any, isWeekly: boolean = false): StartupCardData {
  return {
    id: profile.user?.id || profile.user_id, // Use user_id to navigate to profile
    name: profile.company_details?.company_name || profile.companyDetails?.companyName || "Unnamed Startup",
    description: profile.company_details?.company_description || profile.companyDetails?.companyDescription || "No description available.",
    category: profile.company_details?.industry || profile.companyDetails?.industry || "General",
    funding: profile.business_details?.funding_stage || profile.businessDetails?.fundingStage || undefined,
    team: profile.business_details?.team_size || profile.businessDetails?.teamSize || undefined,
    growth: "Growing",
    isWeekly: isWeekly,
  };
}

const StartupCardSkeleton = () => (
  <div className="flex flex-col space-y-3 rounded-lg border border-gray-700 bg-gray-800/50 p-6">
    <Skeleton className="h-6 w-3/4 rounded" />
    <Skeleton className="h-4 w-1/4 rounded" />
    <div className="flex-1 space-y-2 pt-4">
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
    </div>
    <div className="grid grid-cols-3 gap-4 border-y border-gray-700 py-4">
      <Skeleton className="h-8 w-full rounded" />
      <Skeleton className="h-8 w-full rounded" />
      <Skeleton className="h-8 w-full rounded" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg" />
  </div>
);

export function TrendingSection() {
  const [startupOfTheWeek, setStartupOfTheWeek] = useState<StartupCardData | null>(null);
  const [trendingStartups, setTrendingStartups] = useState<StartupCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTrendingData = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<TrendingApiResponse>("/get-funded/trending");
        console.log("Trending response:", response);
        
        if (response.startupOfTheWeek) {
          setStartupOfTheWeek(transformProfileToCardData(response.startupOfTheWeek, true));
        } else {
          setStartupOfTheWeek(null);
        }

        if (response.trendingStartups && response.trendingStartups.length > 0) {
          setTrendingStartups(response.trendingStartups.map(profile => transformProfileToCardData(profile)));
        } else {
          setTrendingStartups([]);
        }
        
        setError(null);
      } catch (err) {
        console.error("Error fetching trending startups:", err);
        setError("Failed to load trending startups.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrendingData();
  }, []);

  return (
    <div className="space-y-8">
      <section>
        <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-semibold text-white">
          <span className="text-orange-400">Startup of the Week</span> 
        </h2>
        {isLoading ? (
          <StartupCardSkeleton />
        ) : error ? (
          <p className="text-center text-red-400">{error}</p>
        ) : startupOfTheWeek ? (
          <StartupCard {...startupOfTheWeek} />
        ) : (
          <p className="text-center text-gray-400">No startup of the week selected.</p>
        )}
      </section>

      <section>
        <h2 className="mb-6 border-b border-gray-800 pb-2 text-2xl font-semibold text-white">
          Trending Startups
        </h2>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {[1, 2, 3].map(i => <StartupCardSkeleton key={i} />)}
          </div>
        ) : error ? (
           <p className="text-center text-red-400">{error}</p>
        ) : trendingStartups.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {trendingStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">No trending startups found.</p>
        )}
      </section>
    </div>
  );
}