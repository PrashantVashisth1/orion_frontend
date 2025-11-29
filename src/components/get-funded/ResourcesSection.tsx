// import { useState, useEffect } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ResourceCard } from "./ResourceCard";
// import { Skeleton } from "@/components/ui/skeleton";
// import { apiClient } from "@/lib/api-client";

// interface ResourceFile {
//   id: number;
//   title: string;
//   fileName: string;
//   url: string;
// }

// interface ResourceCategory {
//   id: number;
//   title: string;
//   files: ResourceFile[];
// }

// // Helper for loading state
// const LoadingSkeleton = () => (
//   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//     {[1, 2, 3].map((n) => (
//       <div key={n} className="space-y-4">
//         <Skeleton className="aspect-square w-full rounded-lg" />
//         <Skeleton className="h-4 w-3/4" />
//         <Skeleton className="h-10 w-full" />
//       </div>
//     ))}
//   </div>
// );

// export function ResourcesSection() {
//   const [categories, setCategories] = useState<ResourceCategory[]>([]);
//   const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         setIsLoading(true);
//         // FIX: Changed response.data to response
//         const response = await apiClient.get<ResourceCategory[]>("/get-funded/resources");
        
//         // console.log("Fetched Resources:", response); // For debugging

//         // FIX: Changed response.data to response
//         if (response && Array.isArray(response) && response.length > 0) {
//           setCategories(response);
//           setActiveCategory(response[0].id.toString()); 
//         } else {
//           console.warn("No resources found or response was not an array.");
//         }
//         setError(null);
//       } catch (err) {
//         console.error("Error fetching resources:", err);
//         setError("Failed to load resources.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchResources();
//   }, []);

//   if (isLoading) {
//     return (
//       <div className="space-y-6">
//         <Skeleton className="h-10 w-full grid grid-cols-3" />
//         <LoadingSkeleton />
//       </div>
//     );
//   }

//   if (error) {
//     return <div className="text-red-400 text-center">{error}</div>;
//   }

//   if (categories.length === 0) {
//     return <div className="text-gray-400 text-center">No resources found.</div>;
//   }

//   return (
//     <div className="space-y-6">
//       <Tabs 
//         value={activeCategory} 
//         onValueChange={setActiveCategory} 
//         className="w-full"
//       >
//         <TabsList className={`w-full grid grid-cols-${categories.length} bg-gray-800/50`}>
//           {categories.map((category) => (
//             <TabsTrigger
//               key={category.id}
//               value={category.id.toString()}
//               className="data-[state=active]:bg-purple-600"
//             >
//               {category.title}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {categories.map((category) => (
//           <TabsContent 
//             key={category.id} 
//             value={category.id.toString()}
//             className="mt-6"
//           >
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {category.files.length > 0 ? (
//                 category.files.map((file) => (
//                   <ResourceCard
//                     key={file.id}
//                     title={file.title}
//                     fileName={file.fileName}
//                     url={file.url}
//                   />
//                 ))
//               ) : (
//                 <p className="text-gray-400 col-span-3 text-center">
//                   No files in this category.
//                 </p>
//               )}
//             </div>
//           </TabsContent>
//         ))}
//       </Tabs>
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "./ResourceCard";
import { Skeleton } from "@/components/ui/skeleton";
import { apiClient } from "@/lib/api-client";

interface ResourceFile {
  id: number;
  title: string;
  fileName: string;
  url: string;
}

interface ResourceCategory {
  id: number;
  title: string;
  files: ResourceFile[];
}

// Helper for loading state
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[1, 2, 3].map((n) => (
      <div key={n} className="space-y-4">
        <Skeleton className="aspect-square w-full rounded-lg bg-slate-200" />
        <Skeleton className="h-4 w-3/4 bg-slate-200" />
        <Skeleton className="h-10 w-full bg-slate-200" />
      </div>
    ))}
  </div>
);

export function ResourcesSection() {
  const [categories, setCategories] = useState<ResourceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.get<ResourceCategory[]>("/get-funded/resources");
        
        if (response && Array.isArray(response) && response.length > 0) {
          setCategories(response);
          setActiveCategory(response[0].id.toString()); 
        } else {
          console.warn("No resources found or response was not an array.");
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching resources:", err);
        setError("Failed to load resources.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-full grid grid-cols-3 bg-slate-200" />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center font-medium">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-slate-500 text-center">No resources found.</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory} 
        className="w-full"
      >
        <TabsList className={`w-full grid grid-cols-${categories.length} bg-slate-100 p-1 border border-slate-200 rounded-xl`}>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              // Changed active text color to Blue
              className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-sm text-slate-600 font-medium rounded-lg transition-all"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent 
            key={category.id} 
            value={category.id.toString()} 
            className="mt-8 focus:outline-none"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.files.length > 0 ? (
                category.files.map((file) => (
                  <ResourceCard
                    key={file.id}
                    title={file.title}
                    fileName={file.fileName}
                    url={file.url}
                  />
                ))
              ) : (
                <p className="text-slate-400 col-span-3 text-center py-10">
                  No files in this category.
                </p>
              )}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}