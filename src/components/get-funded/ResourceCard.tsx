import { FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SimpleDownloadButton } from "@/components/ui/simpleDownloadButton";

interface ResourceCardProps {
  title: string;
  fileName: string;
  url: string;
  className?: string;
}

export function ResourceCard({
  title,
  fileName,
  url,
  className,
}: ResourceCardProps) {
  return (
    <Card
      className={cn(
        "bg-gray-800/50 border-gray-700 flex flex-col",
        className
      )}
    >
      <CardHeader>
        {/* FIX: Gave title a minimum height to account for 1 or 2 lines */}
        <CardTitle className="text-lg text-white mt-4 min-h-[1rem]">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        <div className="aspect-video w-full bg-gray-700/50 rounded-lg flex items-center justify-center mb-3">
          <FileDown className="h-12 w-12 text-purple-500" />
        </div>
        
        <p className="text-sm text-gray-400 mb-4 min-h-[1rem] break-words">
          {fileName}
        </p>

        <SimpleDownloadButton
          download={fileName}
          href={url}
          className="mb-3"
        >
          Download
        </SimpleDownloadButton>
      </CardContent>
    </Card>
  );
}