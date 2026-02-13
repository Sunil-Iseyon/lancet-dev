"use client"

import { useRef, type ReactNode } from "react"
import { motion, useInView } from "framer-motion"

interface AnimatedCardProps {
  children: ReactNode
  index?: number
  className?: string
  delay?: number
}

export function AnimatedCard({ children, index = 0, className = "", delay = 0 }: AnimatedCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const cardInView = useInView(cardRef, { once: true, margin: "-15% 0px -15% 0px" })

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ 
        duration: 0.6, 
        delay: delay || index * 0.15,
        ease: "easeOut" 
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
