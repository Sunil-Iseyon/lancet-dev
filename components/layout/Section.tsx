/**
 * Section Component
 * Standardized content section with consistent spacing
 */

import { ReactNode } from "react"
import { cn } from "@/lib/utils"

interface SectionProps {
  children: ReactNode
  className?: string
  spacing?: "sm" | "md" | "lg" | "xl"
  background?: "default" | "muted" | "gradient" | "none"
  id?: string
}

export default function Section({
  children,
  className,
  spacing = "md",
  background = "default",
  id,
}: SectionProps) {
  const spacingClasses = {
    sm: "py-8 md:py-12",
    md: "py-12 md:py-16",
    lg: "py-16 md:py-24",
    xl: "py-24 md:py-32",
  }

  const backgroundClasses = {
    default: "bg-background",
    muted: "bg-muted/30",
    gradient: "bg-gradient-to-b from-background via-muted/20 to-background",
    none: "",
  }

  return (
    <section
      id={id}
      className={cn(
        "relative",
        spacingClasses[spacing],
        backgroundClasses[background],
        className
      )}
    >
      {children}
    </section>
  )
}

interface SectionHeaderProps {
  title: string | ReactNode
  subtitle?: string | ReactNode
  centered?: boolean
  className?: string
}

export function SectionHeader({
  title,
  subtitle,
  centered = true,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-12", centered && "text-center", className)}>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  )
}

interface SectionContentProps {
  children: ReactNode
  className?: string
  maxWidth?: "sm" | "md" | "lg" | "xl" | "full"
}

export function SectionContent({
  children,
  className,
  maxWidth = "lg",
}: SectionContentProps) {
  const maxWidthClasses = {
    sm: "max-w-3xl",
    md: "max-w-5xl",
    lg: "max-w-7xl",
    xl: "max-w-[1400px]",
    full: "max-w-full",
  }

  return (
    <div className={cn("mx-auto", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  )
}
