// import { FileDown } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { SimpleDownloadButton } from "@/components/ui/simpleDownloadButton";

// interface ResourceCardProps {
//   title: string;
//   fileName: string;
//   url: string;
//   className?: string;
// }

// export function ResourceCard({
//   title,
//   fileName,
//   url,
//   className,
// }: ResourceCardProps) {
//   return (
//     <Card
//       className={cn(
//         "bg-gray-800/50 border-gray-700 flex flex-col",
//         className
//       )}
//     >
//       <CardHeader>
//         {/* FIX: Gave title a minimum height to account for 1 or 2 lines */}
//         <CardTitle className="text-lg text-white mt-4 min-h-[1rem]">
//           {title}
//         </CardTitle>
//       </CardHeader>

//       <CardContent className="flex flex-col flex-1">
//         <div className="aspect-video w-full bg-gray-700/50 rounded-lg flex items-center justify-center mb-3">
//           <FileDown className="h-12 w-12 text-purple-500" />
//         </div>
        
//         <p className="text-sm text-gray-400 mb-4 min-h-[1rem] break-words">
//           {fileName}
//         </p>

//         <SimpleDownloadButton
//           download={fileName}
//           href={url}
//           className="mb-3"
//         >
//           Download
//         </SimpleDownloadButton>
//       </CardContent>
//     </Card>
//   );
// }

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
        "bg-white border-slate-200 flex flex-col shadow-sm hover:shadow-md transition-all duration-200",
        className
      )}
    >
      <CardHeader>
        <CardTitle className="text-lg text-slate-900 mt-4 min-h-[1rem] leading-snug">
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col flex-1">
        {/* Changed icon container to Blue */}
        <div className="aspect-video w-full bg-blue-50 border border-blue-100 rounded-lg flex items-center justify-center mb-3">
          <FileDown className="h-12 w-12 text-blue-600" />
        </div>
        
        <p className="text-sm text-slate-500 mb-4 min-h-[1rem] break-words font-medium">
          {fileName}
        </p>

        <SimpleDownloadButton
          download={fileName}
          href={url}
          className="mb-3 w-full bg-blue-600 hover:bg-blue-700"
        >
          Download
        </SimpleDownloadButton>
      </CardContent>
    </Card>
  );
}