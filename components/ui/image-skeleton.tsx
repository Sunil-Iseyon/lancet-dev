"use client"

import Image from "next/image"
import { useState } from "react"
import { cn } from "@/lib/utils"

interface ImageSkeletonProps {
  src: string
  alt: string
  fill?: boolean
  width?: number
  height?: number
  className?: string
  sizes?: string
  priority?: boolean
  quality?: number
  objectFit?: "contain" | "cover" | "fill" | "none" | "scale-down"
}

export function ImageSkeleton({
  src,
  alt,
  fill,
  width,
  height,
  className,
  sizes,
  priority = false,
  quality,
  objectFit = "cover",
}: ImageSkeletonProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  return (
    <div className={cn("relative overflow-hidden", fill && "w-full h-full", className)}>
      {/* Skeleton loader */}
      {isLoading && !hasError && (
        <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-slate-300/50 dark:via-slate-700/50 to-transparent animate-shimmer" />
        </div>
      )}
      
      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-100 dark:bg-slate-800">
          <div className="text-center">
            <svg
              className="w-12 h-12 mx-auto text-slate-400 mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm text-slate-500 dark:text-slate-400">Failed to load image</p>
          </div>
        </div>
      )}

      {/* Actual image */}
      {!hasError && (
        <Image
          src={src}
          alt={alt}
          fill={fill}
          width={!fill ? width : undefined}
          height={!fill ? height : undefined}
          className={cn(
            "transition-opacity duration-300",
            isLoading ? "opacity-0" : "opacity-100",
            objectFit === "cover" && "object-cover",
            objectFit === "contain" && "object-contain",
            objectFit === "fill" && "object-fill",
            objectFit === "none" && "object-none",
            objectFit === "scale-down" && "object-scale-down"
          )}
          sizes={sizes}
          priority={priority}
          quality={quality}
          onLoadingComplete={() => setIsLoading(false)}
          onError={() => {
            setIsLoading(false)
            setHasError(true)
          }}
        />
      )}
    </div>
  )
}
