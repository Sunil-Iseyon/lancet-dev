import { getBlogPosts } from "@/lib/tina"
import { Metadata } from "next"
import PageWrapper from "@/components/layout/PageWrapper"
import PageHero from "@/components/layout/PageHero"
import Section, { SectionContent } from "@/components/layout/Section"
import BlogList from "@/components/BlogList"
import { FAQSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Blog: Business Intelligence & Data Analytics Insights",
  description: "Read business intelligence, data analytics, and enterprise integration insights from Lancet Software India experts.",
  alternates: {
    canonical: "https://www.lancetindia.com/blog",
    languages: {
      en: "https://www.lancetindia.com/blog",
      "x-default": "https://www.lancetindia.com/blog",
    },
  },
}

export default async function BlogPage() {
  let blogPosts = []
  
  try {
    blogPosts = await getBlogPosts()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    blogPosts = []
  }

  const faqItems = [
    {
      question: "What topics does the Lancet blog cover?",
      answer: "The blog covers business intelligence, analytics platforms, data engineering, and enterprise transformation practices.",
    },
    {
      question: "How often is blog content refreshed?",
      answer: "Content is reviewed and refreshed regularly based on platform updates and client delivery learnings.",
    },
    {
      question: "Are insights based on practical implementation experience?",
      answer: "Yes. Articles are informed by implementation and optimization work across enterprise BI and analytics programs.",
    },
  ]

  return (
    <PageWrapper className="">
      <PageHero
  variant="default"
  size="sm"
  title={
    <span className="relative inline-block">
      <span className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
      <span className="relative bg-linear-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
        Our Blog
      </span>
    </span>
  }
  subtitle="Insights, tips, and updates from our experts in business intelligence, data integration, and analytics."
>
  <div className="mt-3 flex flex-col items-center gap-4">
    {/* Badge */}
    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold bg-primary/10 text-primary ring-1 ring-primary/20">
      ✦ Insights & Articles
    </span>

    {/* Subtle divider */}
    <div className="h-px w-24 bg-linear-to-r from-transparent via-primary/40 to-transparent" />
  </div>
</PageHero>

      <section className="px-4 md:px-28 pb-8" aria-labelledby="blog-evidence-heading">
        <h2 id="blog-evidence-heading" className="text-2xl font-bold mb-3">Analytics Insights Backed by Industry Research</h2>
        <p className="text-muted-foreground">
          Global AI and analytics investment continues to expand across industries, increasing demand for practical, evidence-based implementation guidance (<a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey</a>, <a className="text-primary hover:underline" href="https://www.gartner.com/en/information-technology/glossary/business-intelligence-tools" target="_blank" rel="nofollow noopener">Gartner</a>). Last updated <time dateTime="2026-02-13">February 13, 2026</time>.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"The aim of data science is to derive actionable insight from data."</p>
          <footer>— industry analytics principle</footer>
        </blockquote>
      </section>

      <div>
        {blogPosts.length > 0 ? (
          <BlogList blogPosts={blogPosts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
      <FAQSchema questions={faqItems} />
    </PageWrapper>
  )
}
