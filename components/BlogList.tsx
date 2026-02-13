"use client"

import { Calendar, User, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ImageSkeleton } from "@/components/ui/image-skeleton"
import { motion } from "framer-motion"

interface BlogListProps {
  blogPosts: any[]
}

export default function BlogList({ blogPosts }: BlogListProps) {
  const getItemVariants = (from: "left" | "right") => ({
    hidden: {
      opacity: 0,
      x: from === "left" ? -80 : 80
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.4, 0, 0.2, 1] as const
      }
    }
  })

  return (
    <div className="space-y-24">
      {blogPosts.map((post: any, index: number) => {
        const isEven = index % 2 === 0

        return (
          <motion.article
            key={post._sys.filename}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            className="group"
          >
            <Link href={`/blog/${post._sys.filename}`}>
              <div className="grid md:grid-cols-2 gap-8 items-center rounded-xl p-6 hover:bg-slate-50  transition-all">

                {/* IMAGE */}
                <motion.div
                  variants={getItemVariants(isEven ? "right" : "left")}
                  className={isEven ? "md:order-2" : "md:order-1"}
                >
                  <div className="relative h-64 md:h-80 overflow-hidden rounded-xl">
                    {post.image ? (
                      <ImageSkeleton
                        src={post.image}
                        alt={post.title}
                        fill
                        className="group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, 50vw"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <div className="text-white text-8xl font-bold opacity-20">
                           B
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>

                {/* CONTENT */}
                <motion.div
                  variants={getItemVariants(isEven ? "left" : "right")}
                  className={`space-y-4 ${isEven ? "md:order-1" : "md:order-2"}`}
                >
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                      {post.category || "Blog"}
                    </span>
                    {post.readTime && (
                      <span className="text-sm text-slate-500 dark:text-slate-400">
                        {post.readTime}
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  <p className="text-lg text-slate-600 dark:text-slate-400 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center gap-6 text-sm text-slate-600 dark:text-slate-400">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    )}
                    {post.date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>

                  <div className="pt-4">
                    <Button className="group/btn">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </motion.div>

              </div>
            </Link>
          </motion.article>
        )
      })}
    </div>
  )
}
