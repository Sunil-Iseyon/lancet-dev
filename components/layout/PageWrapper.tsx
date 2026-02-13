/**
 * PageWrapper Component
 * Standardized page container with consistent spacing and layout
 */

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface PageWrapperProps {
  children: ReactNode
  className?: string
  size?: "default" | "wide" | "full"
  paddingTop?: boolean
}

export default function PageWrapper({
  children,
  className,
  size = "default",
  paddingTop = true,
}: PageWrapperProps) {
  const sizeClasses = {
    default: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",
    wide: "max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8",
    full: "w-full px-4 sm:px-6 lg:px-8",
  }

  return (
    <div
      className={cn(
        "min-h-screen",
        paddingTop && "pt-20",
        "pb-12",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </div>
  )
}
