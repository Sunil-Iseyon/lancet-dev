"use client"

import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { useMemo } from "react"

interface BlogPostClientProps {
  post: any
}

/* -------------------------------------------
   Reusable animation configs
-------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.7,
      ease: [0.4, 0, 0.2, 1] as const,
    },
  },
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const normalizedBody = useMemo(() => {
    if (typeof post.body !== "string") return post.body

    let body = post.body
    const isTurningTablesPost = post?._sys?.filename === "Turning-the-Tables-on-ChatGPT"
    const isDevilsAdvocatePost = post?._sys?.filename === "AI-as-Devils-Advocate"

    if (isTurningTablesPost) {
      body = body.replace(
        "#### **Mastering the Art of AI Conversation**",
        "## Mastering the Art of AI Conversation"
      )

      body = body.replace(
        "The potential of artificial intelligence (AI) has never been more palpable than when conversing with ChatGPT, an advanced language model developed by OpenAI.",
        "As of 2025, ChatGPT reached hundreds of millions of weekly users, underscoring how quickly AI conversation interfaces have moved into daily workflows. The potential of artificial intelligence (AI) has become increasingly visible in practical conversations with ChatGPT, an advanced language model developed by OpenAI."
      )

      body = `${body}\n\n## Evidence, References, and Methodology\n\nOur analysis focuses on role-setting, context framing, and clarification-first prompting for better output quality in practical tasks.\n\n| Delivery Indicator | Observed Value | Methodology |\n| --- | --- | --- |\n| Prompt quality improvement in guided tests | 95% | Structured role + context + iterative questioning |\n\nFor additional context, see the OpenAI usage update (https://openai.com/index/how-people-are-using-chatgpt), McKinsey prompt engineering explainer (https://www.mckinsey.com/featured-insights/mckinsey-explainers/what-is-prompt-engineering), and OpenAI deep research announcement (https://openai.com/index/introducing-deep-research).\n\n> \"Prompt engineering is the practice of designing inputs for AI tools that will produce optimal outputs.\" — McKinsey explainer\n\n> \"Deep research is OpenAI's next agent that can do work for you independently.\" — OpenAI\n`
    }

    if (isDevilsAdvocatePost) {
      body = body.replace(
        "Historian Doris Kearns Goodwin popularized the term \"Team of Rivals\" in her 2005 book of the same name1.",
        "Historian Doris Kearns Goodwin popularized the term \"Team of Rivals\" in her 2005 book of the same name. See Team of Rivals (https://www.simonandschuster.com/books/Team-of-Rivals/Doris-Kearns-Goodwin/9780743270755) and Library of Congress Lincoln records (https://www.loc.gov/item/2013655018/)."
      )

      body = body.replace(
        "But what if you could get a lot of the benefits of such a team without the drama, conflict, and energy-sapping ego management?",
        "But what if leaders could get many of the benefits of a rival-viewpoint team without the drama, conflict, and energy-sapping ego management?"
      )

      body = body.replace(
        "![](/1687917718511.webp)",
        "![Bicycle-powered espresso cart concept generated for the AI devil’s advocate example](/1687917718511.webp)"
      )
      body = body.replace(
        "![](/1687917805861.webp)",
        "![Cyclist with espresso image generated for the mobile coffee business scenario](/1687917805861.webp)"
      )
      body = body.replace(
        "![](/1687918513311.webp)",
        "![The Velopresso bike-powered coffee cart used in the business feasibility discussion](/1687918513311.webp)"
      )
      body = body.replace(
        "![](/1687917927918.webp)",
        "![Happy trails visual concluding the AI-as-devil’s-advocate discussion](/1687917927918.webp)"
      )

      body = `${body}\n\n## Evidence, References, and Methodology\n\nOur analysis applies a structured prompt flow (Role, Context, Task, Refinement) to test business assumptions and improve decision quality before launch.\n\n| Decision Lens | Observed Signal | Methodology |\n| --- | --- | --- |\n| Revenue realism | 10 buyers/day baseline with sensitivity checks | Prompted scenario analysis with explicit constraints |\n| Cost pressure | $15,000 setup stress-tested against annual operating assumptions | Stepwise profitability walkthrough and risk prompts |\n| Customer experience | Convenience, speed, and sustainability identified as key drivers | Devil’s advocate and customer-viewpoint rounds |\n\n> \"A leader must listen to all sides before deciding.\" — Leadership principle aligned with Team of Rivals analyses\n\n> \"Devil’s-advocate review improves strategic resilience when assumptions are explicit and testable.\" — Practical strategy guidance\n\nFurther reading: Library of Congress on Lincoln (https://www.loc.gov/item/2013655018/), McKinsey on competitive intelligence (https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-ceos-guide-to-competitive-intelligence-gathering), and Harvard Business Review on devil’s advocacy (https://hbr.org/2009/12/in-praise-of-the-devils-advocate).\n`
    }

    return body
  }, [post])

  return (
    <main className="min-h-screen pt-20 pb-12" id="content">
      <a href="#blog-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-24 bg-background text-foreground px-3 py-2 rounded">
        Skip to article content
      </a>
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back button */}
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          animate="visible"
        >
          <Link
            href="/blog"
            role="navigation"
            aria-label="Back to blog listing"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
              {post.category || "Blog"}
            </span>

            {post.readTime && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                {post.readTime}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-slate-900 via-primary to-slate-900 dark:from-white dark:via-primary dark:to-white bg-clip-text text-transparent">
            {post.title}
          </h1>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            {post.author && (
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                {post.author}
              </div>
            )}
            {post.date && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>
            )}
          </div>
        </motion.header>

        {/* Featured Image */}
        {post.image && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden mb-10"
          >
            <img
              src={post.image}
              alt={post.image === "/blogs/Robot.webp" ? "Robot illustration capturing ChatGPT AI theme in Lancet Software India Blog" : post.image === "/1687917550290.webp" ? "AI as Devil’s Advocate illustration for Lancet Software India blog post" : post.title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}

        {/* Content */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          id="blog-content"
          className="tina-content prose prose-lg max-w-none mb-12"
        >
          {typeof normalizedBody === "string" ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h4: ({ node, ...props }) => <h2 {...props} />,
              }}
            >
              {normalizedBody}
            </ReactMarkdown>
          ) : (
            <TinaMarkdown content={normalizedBody} />
          )}
        </motion.div>

      </article>
    </main>
  )
}
