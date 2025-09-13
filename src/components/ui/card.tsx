import * as React from "react"
import { cn } from "@/lib/utils"

function Card({ className, children, ...props }: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div
      data-slot="card"
      className={cn(
        // Base styling with improved shadows and backdrop
        "bg-card/95 backdrop-blur-sm text-card-foreground flex flex-col gap-6 rounded-xl border shadow-lg relative overflow-hidden",
        // Enhanced border with gradient animation
        "before:absolute before:inset-0 before:rounded-xl before:p-[1px] before:bg-gradient-to-r before:from-blue-500/20 before:via-purple-500/20 before:to-pink-500/20 before:animate-pulse before:pointer-events-none",
        "before:mask-composite before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[mask-composite:xor]",
        // Hover effects
        "hover:shadow-xl hover:shadow-blue-500/10 hover:before:from-blue-500/40 hover:before:via-purple-500/40 hover:before:to-pink-500/40",
        "transition-all duration-300 ease-out",
        // Subtle glow effect
        "hover:ring-1 hover:ring-blue-500/20",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        // Add subtle bottom border with gradient
        "[.border-b]:border-gradient-to-r [.border-b]:from-transparent [.border-b]:via-border [.border-b]:to-transparent",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "leading-none font-semibold text-lg",
        // Add subtle gradient text effect
        "bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text",
        // Hover effect for interactive feel
        "transition-all duration-200 hover:from-foreground hover:to-foreground",
        className
      )}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn(
        "text-muted-foreground text-sm leading-relaxed",
        // Improved opacity and hover effect
        "opacity-90 hover:opacity-100 transition-opacity duration-200",
        className
      )}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        // Add subtle hover and focus effects
        "transition-transform duration-200 hover:scale-105 active:scale-95",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn(
        "px-6 flex-1",
        // Improved spacing and animation
        "animate-in fade-in-50 duration-300",
        className
      )}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center px-6 [.border-t]:pt-6",
        // Enhanced border styling
        "[.border-t]:border-gradient-to-r [.border-t]:from-transparent [.border-t]:via-border [.border-t]:to-transparent",
        // Subtle animation
        "animate-in slide-in-from-bottom-2 duration-300 delay-100",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
