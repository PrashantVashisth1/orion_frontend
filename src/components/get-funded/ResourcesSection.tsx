import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResourceCard } from "./ResourceCard";
import resume from "../../assets/Resume.pdf";

interface ResourceCategory {
  id: string;
  title: string;
  files: {
    id: string;
    title: string;
    fileName: string;
    url: string;
  }[];
}

const resourceCategories: ResourceCategory[] = [
  {
    id: "pitch-deck",
    title: "Pitch Deck Template",
    files: [
      {
        id: "pitch-deck-1",
        title: "Pitch Deck Template",
        fileName: "Pitch Deck Sample.pptx",
        url: resume
      },
      {
        id: "pitch-deck-2",
        title: "Pitch Deck Template",
        fileName: "Pitch Deck Sample.pptx",
        url: resume
      },
    ],
  },
  {
    id: "financial-models",
    title: "Financial Models",
    files: [
      {
        id: "financial-model-1",
        title: "Financial Model",
        fileName: "Financial model.xlsx",
        url: resume
      },
    ],
  },
  {
    id: "due-diligence",
    title: "Due Diligence Certificate",
    files: [
      {
        id: "due-diligence-1",
        title: "Due Diligence Certificate",
        fileName: "Due diligence.docx",
        url: resume
      },
    ],
  },
];

export function ResourcesSection() {
  const [activeCategory, setActiveCategory] = useState(
    resourceCategories[0].id
  );

  // const handleDownload = (fileName: string) => {
  //   // TODO: Implement actual download functionality
  //   console.log(`Downloading ${fileName}`);
  // };

  return (
    <div className="space-y-6">
      <Tabs defaultValue={activeCategory} className="w-full">
        <TabsList className="w-full grid grid-cols-3 bg-gray-800/50">
          {resourceCategories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              onClick={() => setActiveCategory(category.id)}
              className="data-[state=active]:bg-purple-600"
            >
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {resourceCategories.map((category) => (
          <TabsContent key={category.id} value={category.id} className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.files.map((file) => (
                <ResourceCard
                  key={file.id}
                  title={file.title}
                  fileName={file.fileName}
                  url= {file.url}
                  
                />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
