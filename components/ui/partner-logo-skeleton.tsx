"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"

interface PartnerLogoSkeletonProps {
  src: string
  alt: string
  className?: string
}

export function PartnerLogoSkeleton({ src, alt, className }: PartnerLogoSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className="relative inline-block">
      {/* Skeleton loader */}
      {isLoading && !hasError && (
        <div className={cn("bg-slate-200 dark:bg-slate-800 animate-pulse rounded", className)}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className={cn("flex items-center justify-center bg-slate-100 dark:bg-slate-800 rounded", className)}>
          <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <img
          src={src || "/placeholder.svg"}
          alt={alt}
          loading="lazy"
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0 absolute" : "opacity-100",
            className
          )}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
