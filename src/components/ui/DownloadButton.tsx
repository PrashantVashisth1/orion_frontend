// import { cn } from "@/lib/utils";
import React from "react";

interface DownloadButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  children: React.ReactNode;
  className?: string;
}

export function DownloadButton({ children, className, ...props }: DownloadButtonProps) {
  return (
    <a
      {...props} // Spreads href, download, etc.
      className=
        " text-black w-full mb-5 h-10 px-4 rounded-md text-sm font-medium flex items-center justify-center transition-all duration-200 ease-in-out bg-purple-600"
    >
      {children}
    </a>
  );
}