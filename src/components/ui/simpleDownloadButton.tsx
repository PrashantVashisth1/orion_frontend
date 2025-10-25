import React from "react";
import { cn } from "@/lib/utils";

// Define the props for our new button
interface SimpleDownloadButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  download: string;
  children: React.ReactNode;
}

export function SimpleDownloadButton({
  href,
  download,
  children,
  className,
  ...props
}: SimpleDownloadButtonProps) {
  return (
    <a
      href={href}
      download={download}
      className={cn(
        // Base button styles
        "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors h-10 px-4 py-2 w-full",
        
        // FIX: Added '!' to force the text color to be white
        "bg-purple-600 !text-white", // <-- THE FIX IS HERE
        
        // FIX: Explicitly remove underline
        "no-underline", 
        
        // Hover, focus, and disabled states
        "hover:bg-purple-700 hover:!text-white", // Also force text white on hover
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        "disabled:opacity-50 disabled:pointer-events-none",
        
        className // Allows for extra classes like 'mt-auto'
      )}
      {...props}
    >
      {children}
    </a>
  );
}