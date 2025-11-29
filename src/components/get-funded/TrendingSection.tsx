
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { cn } from "@/lib/utils";
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom"; // Add this import
// import { apiClient } from "@/lib/api-client";
// import { Skeleton } from "@/components/ui/skeleton";
// import type { StartupCardData, TrendingApiResponse } from "@/types/trending";

// function StartupCard({
//   id, // Make sure id is included
//   name,
//   description,
//   funding,
//   team,
//   growth,
//   category,
//   isWeekly = false,
// }: StartupCardData) {
//   const navigate = useNavigate(); // Add this hook

//   const handleViewProfile = () => {
//     // Navigate to the public profile page using the user_id
//     navigate(`/profile/${id}`);
//   };

//   return (
//     <Card
//       className={cn(
//         "flex flex-col overflow-hidden transition-all duration-300",
//         isWeekly
//           ? "border-purple-500/20 bg-gradient-to-br from-purple-900/50 to-blue-900/50"
//           : "border-gray-700 bg-gray-800/50 hover:bg-gray-800/70"
//       )}
//     >
//       <CardContent className="flex flex-1 flex-col p-6">
//         <div className="mb-4 flex items-start justify-between">
//           <div>
//             <h3 className="mb-1 text-xl font-semibold text-white">{name}</h3>
//             {category && (
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

//         <p className="mb-6 flex-1 text-sm text-gray-300 min-h-[4.5rem] break-words">
//           {description || "No description available."}
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

//         <Button
//           variant="secondary"
//           className={cn(
//             "mt-auto w-full",
//             isWeekly
//               ? "bg-purple-600 text-white hover:bg-purple-700"
//               : "bg-blue-600 text-white hover:bg-blue-700"
//           )}
//           onClick={handleViewProfile} // Add onClick handler
//         >
//           View Profile
//         </Button>
//       </CardContent>
//     </Card>
//   );
// }

// function transformProfileToCardData(profile: any, isWeekly: boolean = false): StartupCardData {
//   return {
//     id: profile.user?.id || profile.user_id, // Use user_id to navigate to profile
//     name: profile.company_details?.company_name || profile.companyDetails?.companyName || "Unnamed Startup",
//     description: profile.company_details?.company_description || profile.companyDetails?.companyDescription || "No description available.",
//     category: profile.company_details?.industry || profile.companyDetails?.industry || "General",
//     funding: profile.business_details?.funding_stage || profile.businessDetails?.fundingStage || undefined,
//     team: profile.business_details?.team_size || profile.businessDetails?.teamSize || undefined,
//     growth: "Growing",
//     isWeekly: isWeekly,
//   };
// }

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
//         console.log("Trending response:", response);
        
//         if (response.startupOfTheWeek) {
//           setStartupOfTheWeek(transformProfileToCardData(response.startupOfTheWeek, true));
//         } else {
//           setStartupOfTheWeek(null);
//         }

//         if (response.trendingStartups && response.trendingStartups.length > 0) {
//           setTrendingStartups(response.trendingStartups.map(profile => transformProfileToCardData(profile)));
//         } else {
//           setTrendingStartups([]);
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
//               <StartupCard key={startup.id} {...startup} />
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
import { useNavigate } from "react-router-dom";
import { apiClient } from "@/lib/api-client";
import { Skeleton } from "@/components/ui/skeleton";
import type { StartupCardData, TrendingApiResponse } from "@/types/trending";

function StartupCard({
  id,
  name,
  description,
  funding,
  team,
  growth,
  category,
  isWeekly = false,
}: StartupCardData) {
  const navigate = useNavigate();

  const handleViewProfile = () => {
    navigate(`/profile/${id}`);
  };

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden transition-all duration-300",
        isWeekly
          // Changed gradient to Blue theme
          ? "border-blue-200 bg-gradient-to-br from-blue-50 to-sky-50 shadow-md"
          : "border-slate-200 bg-white hover:shadow-md hover:border-slate-300"
      )}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className={cn("mb-1 text-xl font-bold", isWeekly ? "text-blue-900" : "text-slate-900")}>
              {name}
            </h3>
            {category && (
              <Badge
                variant="secondary"
                className={cn(
                  "font-medium",
                  isWeekly
                    // Changed badge to Blue
                    ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                )}
              >
                {category}
              </Badge>
            )}
          </div>
        </div>

        <p className={cn("mb-6 flex-1 text-sm min-h-[4.5rem] break-words leading-relaxed", isWeekly ? "text-slate-700" : "text-slate-500")}>
          {description || "No description available."}
        </p>

        {(funding || team || growth) && (
          <div className={cn("mb-6 grid grid-cols-3 gap-4 border-y py-4", isWeekly ? "border-blue-200" : "border-slate-100")}>
            {funding && (
              <div>
                {/* Changed text to Blue */}
                <p className="font-bold text-blue-600">{funding}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Funding</p>
              </div>
            )}
            {team && (
              <div>
                <p className="font-bold text-indigo-600">{team}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Team</p>
              </div>
            )}
            {growth && (
              <div>
                <p className="font-bold text-emerald-600">{growth}</p>
                <p className="text-xs text-slate-500 uppercase tracking-wide">Growth</p>
              </div>
            )}
          </div>
        )}

        <Button
          variant={isWeekly ? "default" : "outline"}
          className={cn(
            "mt-auto w-full font-semibold shadow-sm",
            isWeekly
              // Changed button to Blue
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
          )}
          onClick={handleViewProfile}
        >
          View Profile
        </Button>
      </CardContent>
    </Card>
  );
}

// ... (Helper function and Skeleton remain unchanged) ...
function transformProfileToCardData(profile: any, isWeekly: boolean = false): StartupCardData {
  return {
    id: profile.user?.id || profile.user_id,
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
  <div className="flex flex-col space-y-3 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
    <Skeleton className="h-6 w-3/4 rounded bg-slate-100" />
    <Skeleton className="h-4 w-1/4 rounded bg-slate-100" />
    <div className="flex-1 space-y-2 pt-4">
      <Skeleton className="h-4 w-full rounded bg-slate-100" />
      <Skeleton className="h-4 w-full rounded bg-slate-100" />
      <Skeleton className="h-4 w-5/6 rounded bg-slate-100" />
    </div>
    <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-4">
      <Skeleton className="h-8 w-full rounded bg-slate-100" />
      <Skeleton className="h-8 w-full rounded bg-slate-100" />
      <Skeleton className="h-8 w-full rounded bg-slate-100" />
    </div>
    <Skeleton className="h-10 w-full rounded-lg bg-slate-100" />
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
    <div className="space-y-12">
      {/* Startup of the Week Section */}
      <section>
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <span className="text-orange-500">Startup of the Week</span>
          </h2>
        </div>
        
        {isLoading ? (
          <StartupCardSkeleton />
        ) : error ? (
          <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
        ) : startupOfTheWeek ? (
          <StartupCard {...startupOfTheWeek} />
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500">No startup of the week selected.</p>
          </div>
        )}
      </section>

      {/* Trending Startups Section */}
      <section>
        <div className="flex items-center justify-between border-b border-slate-200 pb-4 mb-6">
          <h2 className="text-2xl font-bold text-slate-900">
            Trending Startups
          </h2>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-2">
            {[1, 2, 3].map(i => <StartupCardSkeleton key={i} />)}
          </div>
        ) : error ? (
           <p className="text-center text-red-500 bg-red-50 p-4 rounded-lg">{error}</p>
        ) : trendingStartups.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {trendingStartups.map((startup) => (
              <StartupCard key={startup.id} {...startup} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-200">
            <p className="text-slate-500">No trending startups found.</p>
          </div>
        )}
      </section>
    </div>
  );
}