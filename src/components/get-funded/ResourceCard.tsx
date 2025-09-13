import { FileDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DownloadButton } from "@/components/ui/DownloadButton";

interface ResourceCardProps {
  title: string;
  fileName: string;
  // onDownload: () => void;
  url: string;
  className?: string;
}

export function ResourceCard({
  title,
  fileName,
  url,
  className,
}: ResourceCardProps) {
  console.log(url)
  return (
    <Card className={cn("bg-gray-800/50 border-gray-700", className)}>
      <CardHeader>
        <CardTitle className="text-lg text-white mt-4">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="aspect-square w-full bg-gray-700/50 rounded-lg flex items-center justify-center mb-4">
          <FileDown className="h-12 w-12 text-purple-500" />
        </div>
        <p className="text-sm text-gray-400 mb-4">{fileName}</p>
        {/* <Button
          variant="secondary"
          className="w-full mb-5 bg-purple-600 hover:bg-purple-700 text-white"
          onClick={onDownload}
        >
          Download
        </Button> */}
        {/* <a
          href={url}
          download={fileName}
          className={cn(
            "w-full inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
            "h-10 py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white mb-3"
          )}
        >
          Download
        </a> */}
        <DownloadButton download={fileName} href={url}>Download</DownloadButton> 
      </CardContent>
    </Card>
  );
}
