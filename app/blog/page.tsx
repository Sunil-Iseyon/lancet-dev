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
          AI and analytics investment expands across industries. This increases demand for practical and evidence-based implementation guidance (
          <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey State of AI</a>,
          {' '}
          <a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner AI for Data Analytics</a>,
          {' '}
          <a className="text-primary hover:underline" href="https://www.gartner.com/en/articles/ai-investments" target="_blank" rel="nofollow noopener">Gartner AI Investment Framework</a>
          ). Last updated <time dateTime="2026-02-13">February 13, 2026</time>.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"Information is the oil of the 21st century, and analytics is the combustion engine."</p>
          <footer>— Peter Sondergaard, former Gartner executive</footer>
        </blockquote>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"The core advantage of data is that it tells you something about the world that you didn’t know before."</p>
          <footer>— Hilary Mason, Fast Forward Labs founder</footer>
        </blockquote>
      </section>

      <section className="px-4 md:px-28 pb-10" aria-labelledby="blog-method-heading">
        <h2 id="blog-method-heading" className="text-2xl font-bold mb-3">Evidence, References, and Methodology</h2>
        <p className="text-muted-foreground mb-4">Lancet Software India reviews primary analyst sources and internal delivery benchmarks before publishing implementation guidance.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-border rounded-lg">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3">Metric</th>
                <th className="p-3">Observed Value</th>
                <th className="p-3">Methodology</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3">Projects Reviewed</td>
                <td className="p-3">800+</td>
                <td className="p-3">Historical delivery records</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Client Satisfaction</td>
                <td className="p-3">95%</td>
                <td className="p-3">Internal quality and client feedback audits</td>
              </tr>
            </tbody>
          </table>
        </div>
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
