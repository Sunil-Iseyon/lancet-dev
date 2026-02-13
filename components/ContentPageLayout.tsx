"use client"

import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import RelatedServicesCarousel from "@/components/RelatedServicesCarousel"

interface ContentPageLayoutProps {
  title: string
  subtitle?: string
  image: string
  body: any
  relatedItems?: Array<{
    path: string
    title: string
    subtitle?: string
    image: string
  }>
}

export default function ContentPageLayout({
  title,
  subtitle,
  image,
  body,
  relatedItems = [],
}: ContentPageLayoutProps) {
  const router = useRouter()
  const headingRef = useRef(null)
  const imageRef = useRef(null)
  const bodyRef = useRef(null)
  
  const headingInView = useInView(headingRef, { once: true, margin: "-15% 0px -15% 0px" })
  const imageInView = useInView(imageRef, { once: true, margin: "-15% 0px -15% 0px" })
  const bodyInView = useInView(bodyRef, { once: true, margin: "-15% 0px -15% 0px" })

  return (
    <main className=" px-4 md:px-28 pt-20">
      <div className="mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="mb-12 grid grid-cols-1 md:grid-cols-5 gap-8 items-center">
          <motion.div 
            ref={headingRef}
            initial={{ opacity: 0, x: -80 }}
            animate={headingInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -80 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-2 text-center"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-balance bg-gradient-to-r from-slate-900 via-primary to-slate-900  bg-clip-text text-transparent">{title}</h1>
            {subtitle && <p className="text-xl text-muted-foreground">{subtitle}</p>}
          </motion.div>

          <motion.div 
            ref={imageRef}
            initial={{ opacity: 0, x: 80 }}
            animate={imageInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 80 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="md:col-span-3 rounded-lg overflow-hidden shadow-sm"
          >
            <img src={image || "/placeholder.svg"} alt={title} className="w-full h-full" />
          </motion.div>
        </div>

        <motion.div
          ref={bodyRef}
          initial={{ opacity: 0, y: 40 }}
          animate={bodyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="prose prose-lg max-w-none mb-12"
        >
          {typeof body === 'string' ? (
            // Local mode: body is a markdown string
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-4xl font-bold mb-4 text-foreground" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-3xl font-bold mt-8 mb-3 text-foreground" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-2xl font-semibold mt-6 mb-2 text-foreground" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="text-lg text-foreground mb-4" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-lg leading-relaxed" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold" {...props} />
                ),
                a: ({ node, ...props }) => (
                  <a className="text-primary hover:underline" {...props} />
                ),
              }}
            >
              {body}
            </ReactMarkdown>
          ) : (
            // Tina Cloud mode: body is a TinaMarkdown rich-text object
            <div className="tina-content">
              <TinaMarkdown content={body} />
            </div>
          )}
        </motion.div>

        {relatedItems.length > 0 && (
          <RelatedServicesCarousel items={relatedItems} />
        )}

        <div className="mt-16 pt-12 border-t border-border">
          <p className="text-muted-foreground mb-4">Interested in our services?</p>
          <button 
            onClick={() => router.push("/contact")}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-md font-medium hover:opacity-90 transition-opacity"
          >
            Get in Touch
          </button>
        </div>
        
      </div>
    </main>
  )
}
