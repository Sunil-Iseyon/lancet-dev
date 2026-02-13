"use client"
import React, { useEffect, useRef } from "react"
import { motion } from "motion/react"
import { cn } from "@/lib/utils"

export const StickyScroll = ({
  content,
  contentClassName,
}: {
  content: {
    title: React.ReactNode
    description: React.ReactNode
    learn?: React.ReactNode
    content?: React.ReactNode | any
  }[]
  contentClassName?: string
}) => {
  const [activeCard, setActiveCard] = React.useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const container = ref.current
    if (!container) return

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.top + containerRect.height / 2

      let minDistance = Number.POSITIVE_INFINITY
      let closestIdx = 0
      cardRefs.current.forEach((card, idx) => {
        if (!card) return
        const cardRect = card.getBoundingClientRect()
        const cardCenter = cardRect.top + cardRect.height / 2
        const distance = Math.abs(containerCenter - cardCenter)
        if (distance < minDistance) {
          minDistance = distance
          closestIdx = idx
        }
      })
      setActiveCard(closestIdx)
    }

    // Handle wheel events to enable mouse/trackpad scrolling
    const handleWheel = (e: WheelEvent) => {
      e.stopPropagation() // Prevent SmoothScrollProvider from intercepting
      container.scrollTop += e.deltaY
    }

    container.addEventListener("scroll", handleScroll, { passive: true })
    container.addEventListener("wheel", handleWheel, { passive: false })
    handleScroll()
    return () => {
      container.removeEventListener("scroll", handleScroll)
      container.removeEventListener("wheel", handleWheel)
    }
  }, [content.length])

  return (
    <motion.div
      className="relative flex h-90 w-full overflow-y-auto"
      ref={ref}
      style={{ scrollbarColor: "var(--primary) var(--background)", scrollbarWidth: "thin" }}
    >
      {/* Left side - Text content */}
      <div className="relative flex flex-col items-start justify-start w-full lg:w-1/2 px-8 lg:px-16 py-12">
        

        <div className="">
          
          {content.map((item, index) => (
            
            <div
              key={"sticky-card-" + index}
              className="my-24 relative"
              ref={(el) => {
                cardRefs.current[index] = el
              }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: activeCard === index ? 48 : 0 }}
                className="absolute left-0 top-0 w-1.5 bg-gradient-to-b from-primary via-green-600 to-transparent"
                transition={{ duration: 0.3 }}
              />

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.3,
                  x: activeCard === index ? 0 : -15,
                  scale: activeCard === index ? 1 : 0.95,
                }}
                transition={{ duration: 0.5 }}
                className="text-3xl lg:text-4xl font-bold text-foreground transition-all duration-300 pl-8"
              >
                {item.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{
                  opacity: activeCard === index ? 1 : 0.4,
                  x: activeCard === index ? 0 : -15,
                }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-base lg:text-lg mt-4 max-w-xl text-muted-foreground transition-all duration-300 pl-8 leading-relaxed"
              >
                {item.description}
              </motion.p>

              {/* Learn More button below description */}
              {item.learn && (
                <div className="pl-8 mt-2">
                  {item.learn}
                </div>
              )}

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: activeCard === index ? 60 : 0 }}
                transition={{ duration: 0.4 }}
                className="mt-6 ml-8 h-1 bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full"
              />
            </div>
          ))}
          {/* <div className="h-40" /> */}
        </div>
      </div>

      <div
        className={cn(
          "sticky top-0 hidden h-100 w-1/2 lg:flex items-center justify-center overflow-hidden bg-transparent p-0",
          contentClassName,
        )}
        style={{ minWidth: 0, minHeight: 0 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.4 }}
          key={activeCard}
          className="w-full h-full relative"
        >
          {/*
            To ensure images fill the right section, use:
            <Image fill className="object-cover w-full h-full" ... />
            or for img tags: <img className="object-cover w-full h-full" ... />
          */}
          {/* <img className="object-cover w-full h-full"/> */}
          {content[activeCard].content ?? <div className="text-center text-muted-foreground">No content available</div>}
        </motion.div>
      </div>
    </motion.div>
  )
}
