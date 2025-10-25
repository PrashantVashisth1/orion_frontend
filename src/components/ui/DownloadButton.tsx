// import { cn } from "@/lib/utils";
import React from "react";

interface DownloadButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export function DownloadButton({ children, className, ...props }: DownloadButtonProps) {
  console.log(className)
  return (
    <a
      {...props} 
      className={className}
    >
      {children}
    </a>
  );
}


