/**
 * PageHero Component
 * Standardized hero section with multiple variants
 */

"use client"

import { ReactNode, useRef, useEffect } from "react"
import { cn } from "@/lib/utils"
import { createAnimationContext, heroAnimation } from "@/lib/animations"

interface PageHeroProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  variant?: "default" | "gradient" | "image" | "minimal"
  backgroundImage?: string
  size?: "sm" | "md" | "lg" | "xl"
  children?: ReactNode
  className?: string
}

export default function PageHero({
  title,
  subtitle,
  variant = "default",
  backgroundImage,
  size = "md",
  children,
  className,
}: PageHeroProps) {
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const childrenRef = useRef(null)

  useEffect(() => {
    const ctx = createAnimationContext(() => {
      heroAnimation(titleRef.current, { duration: 1, offset: 60 })
      if (subtitle) {
        heroAnimation(subtitleRef.current, { duration: 0.8, delay: 0.2, offset: 40 })
      }
      if (children && childrenRef.current) {
        heroAnimation(childrenRef.current, { duration: 0.8, delay: 0.4, offset: 30 })
      }
    })

    return () => ctx.revert()
  }, [subtitle, children])

  const sizeClasses = {
    sm: "py-12 md:py-16",
    md: "py-16 md:py-24",
    lg: "py-24 md:py-32",
    xl: "min-h-[60vh] py-32 md:py-40",
  }

  const variantClasses = {
    default: "bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900",
    gradient: "bg-gradient-to-br from-primary/10 via-background to-accent/10",
    image: "relative overflow-hidden",
    minimal: "bg-background",
  }

  return (
    <section
      ref={heroRef}
      className={cn(
        "relative flex items-center justify-center px-4",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      style={
        variant === "image" && backgroundImage
          ? { backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }
          : undefined
      }
    >
      {/* Overlay for image variant */}
      {variant === "image" && (
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-0" />
      )}

      {/* Grid pattern for default/gradient variants */}
      {(variant === "default" || variant === "gradient") && (
        <div className="absolute inset-0 bg-grid-slate-200 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.05))]" />
      )}

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4 md:space-y-6">
        <h1
          ref={titleRef}
          className={cn(
            "text-4xl sm:text-5xl md:text-6xl font-bold",
            variant === "image"
              ? "text-white"
              : "bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent"
          )}
        >
          {title}
        </h1>

        {subtitle && (
          <p
            ref={subtitleRef}
            className={cn(
              "text-lg md:text-xl max-w-3xl mx-auto",
              variant === "image" ? "text-white/90" : "text-muted-foreground"
            )}
          >
            {subtitle}
          </p>
        )}

        {children && <div ref={childrenRef}>{children}</div>}
      </div>
    </section>
  )
}
