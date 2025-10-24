// import { useState } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { ResourceCard } from "./ResourceCard";
// import resume from "../../assets/Resume.pdf";

// interface ResourceCategory {
//   id: string;
//   title: string;
//   files: {
//     id: string;
//     title: string;
//     fileName: string;
//     url: string;
//   }[];
// }

// const resourceCategories: ResourceCategory[] = [
//   {
//     id: "pitch-deck",
//     title: "Pitch Deck Template",
//     files: [
//       {
//         id: "pitch-deck-1",
//         title: "Pitch Deck Template",
//         fileName: "Pitch Deck Sample.pptx",
//         url: resume
//       },
//       {
//         id: "pitch-deck-2",
//         title: "Pitch Deck Template",
//         fileName: "Pitch Deck Sample.pptx",
//         url: resume
//       },
//     ],
//   },
//   {
//     id: "financial-models",
//     title: "Financial Models",
//     files: [
//       {
//         id: "financial-model-1",
//         title: "Financial Model",
//         fileName: "Financial model.xlsx",
//         url: resume
//       },
//     ],
//   },
//   {
//     id: "due-diligence",
//     title: "Due Diligence Certificate",
//     files: [
//       {
//         id: "due-diligence-1",
//         title: "Due Diligence Certificate",
//         fileName: "Due diligence.docx",
//         url: resume
//       },
//     ],
//   },
// ];

// export function ResourcesSection() {
//   const [activeCategory, setActiveCategory] = useState(
//     resourceCategories[0].id
//   );

//   // const handleDownload = (fileName: string) => {
//   //   // TODO: Implement actual download functionality
//   //   console.log(`Downloading ${fileName}`);
//   // };

//   return (
//     <div className="space-y-6">
//       <Tabs defaultValue={activeCategory} className="w-full">
//         <TabsList className="w-full grid grid-cols-3 bg-gray-800/50">
//           {resourceCategories.map((category) => (
//             <TabsTrigger
//               key={category.id}
//               value={category.id}
//               onClick={() => setActiveCategory(category.id)}
//               className="data-[state=active]:bg-purple-600"
//             >
//               {category.title}
//             </TabsTrigger>
//           ))}
//         </TabsList>

//         {resourceCategories.map((category) => (
//           <TabsContent key={category.id} value={category.id} className="mt-6">
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {category.files.map((file) => (
//                 <ResourceCard
//                   key={file.id}
//                   title={file.title}
//                   fileName={file.fileName}
//                   url= {file.url}
                  
//                 />
//               ))}
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
        <Skeleton className="aspect-square w-full rounded-lg" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-10 w-full" />
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
        // FIX: Changed response.data to response
        const response = await apiClient.get<ResourceCategory[]>("/get-funded/resources");
        
        console.log("Fetched Resources:", response); // For debugging

        // FIX: Changed response.data to response
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
        <Skeleton className="h-10 w-full grid grid-cols-3" />
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-400 text-center">{error}</div>;
  }

  if (categories.length === 0) {
    return <div className="text-gray-400 text-center">No resources found.</div>;
  }

  return (
    <div className="space-y-6">
      <Tabs 
        value={activeCategory} 
        onValueChange={setActiveCategory} 
        className="w-full"
      >
        <TabsList className={`w-full grid grid-cols-${categories.length} bg-gray-800/50`}>
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id.toString()}
              className="data-[state=active]:bg-purple-600"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent 
            key={category.id} 
            value={category.id.toString()}
            className="mt-6"
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
                <p className="text-gray-400 col-span-3 text-center">
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