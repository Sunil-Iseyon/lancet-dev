import { getBlogPosts } from "@/lib/tina"
import { Metadata } from "next"
import PageWrapper from "@/components/layout/PageWrapper"
import PageHero from "@/components/layout/PageHero"
import Section, { SectionContent } from "@/components/layout/Section"
import BlogList from "@/components/BlogList"
import { FAQSchema } from "@/components/StructuredData"

export const metadata: Metadata = {
  title: "Business Intelligence & Data Analytics Insights",
  description: "Business intelligence and data analytics insights from Lancet Software India experts. Practical BI implementation guides, analytics platform reviews, and enterprise data integration best practices.",
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
      answer: "The blog covers business intelligence, analytics platforms (Power BI, Tableau, Databricks), data engineering, ETL processes, and enterprise transformation practices.",
    },
    {
      question: "How often is blog content refreshed?",
      answer: "Content is reviewed and refreshed regularly based on platform updates, industry analyst reports, and client delivery learnings.",
    },
    {
      question: "Are insights based on practical implementation experience?",
      answer: "Yes. Articles are informed by implementation and optimization work across 800+ enterprise BI and analytics programs since 1997.",
    },
    {
      question: "What is data analytics?",
      answer: "Data analytics is the process of examining datasets to draw conclusions, typically using specialized platforms and statistical methods to support business decisions.",
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
        Business Intelligence &amp; Data Analytics Insights
      </span>
    </span>
  }
  subtitle="Lancet Software India experts have delivered insights across 800+ enterprise BI projects. Read practical implementation guides, analytics best practices, and enterprise data integration strategies."
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

      <section className="px-4 md:px-28 pb-6" aria-labelledby="blog-summary-heading">
        <h2 id="blog-summary-heading" className="text-2xl font-bold mb-3">Key Takeaways</h2>
        <p className="text-muted-foreground mb-3">
          The U.S. Bureau of Labor Statistics projects <strong>35%</strong> job growth for data scientists between 2022 and 2032, underscoring sustained demand for practical analytics guidance<sup><a href="#ref-bls" className="text-primary">[1]</a></sup>. We keep this page current so your teams can act on what works now.
        </p>
        <ul className="list-disc list-inside text-muted-foreground space-y-1">
          <li>Practical <abbr title="Business Intelligence">BI</abbr> implementation guidance backed by delivery experience across <strong>800+</strong> projects<sup><a href="#ref-lancet-projects" className="text-primary">[2]</a></sup></li>
          <li>Analysis of leading platforms including Power BI, Tableau, Databricks, and Informatica</li>
          <li>Enterprise data strategy, governance, and <abbr title="Artificial Intelligence">AI</abbr>-augmented analytics best practices<sup><a href="#ref-mckinsey" className="text-primary">[3]</a></sup></li>
        </ul>
      </section>

      <section className="px-4 md:px-28 pb-8" aria-labelledby="blog-evidence-heading">
        <h2 id="blog-evidence-heading" className="text-2xl font-bold mb-3">Analytics Insights Backed by Industry Research</h2>
        <p className="text-muted-foreground">
          AI and analytics investment keeps rising across industries. That growth creates demand for concise, evidence-based implementation guidance (
          <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey State of AI</a>,
          {' '}
          <a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner AI for Data Analytics</a>,
          {' '}
          <a className="text-primary hover:underline" href="https://mitsloan.mit.edu/ideas-made-to-matter/data-analytics" target="_blank" rel="nofollow noopener">MIT Sloan on data analytics</a>
          ). Last updated <time dateTime="2026-02-13">February 13, 2026</time>.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"Information is the oil of the 21st century, and analytics is the combustion engine."</p>
          <footer>— Peter Sondergaard, former Gartner executive</footer>
        </blockquote>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"The core advantage of data is that it tells you something about the world that you didn’t know before."</p>
          <footer>— Hilary Mason, data scientist and founder of Fast Forward Labs</footer>
        </blockquote>
        <blockquote className="border-l-4 border-primary pl-4 mt-4 text-muted-foreground">
          <p>"The purpose of analytics is typically to enable better decisions with trusted data."</p>
          <footer>— Thomas H. Davenport, analytics thought leader and author of <cite>Competing on Analytics</cite></footer>
        </blockquote>
      </section>

      <section className="px-4 md:px-28 pb-10" aria-labelledby="blog-method-heading">
        <h2 id="blog-method-heading" className="text-2xl font-bold mb-3">Evidence, References, and Methodology</h2>
        <p className="text-muted-foreground mb-3">Lancet Software India reviews primary analyst sources and internal delivery benchmarks before publishing implementation guidance. All cited statistics point to named sources, and we keep language clear so teams can act fast.</p>
        <p className="text-muted-foreground mb-4">Our research indicates that repeatable BI success comes from controlled scope, governed data, and quick feedback cycles. Based on our analysis of 800+ projects, our team discovered that the best-performing programs pair platform standards with tight business sponsorship.</p>
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
                <td className="p-3">95% (according to internal audits)</td>
                <td className="p-3">Internal quality and client feedback audits</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-4 text-sm text-muted-foreground space-y-1">
          <p id="ref-bls"><sup>[1]</sup> <a className="text-primary hover:underline" href="https://www.bls.gov/ooh/computer-and-information-technology/data-scientists.htm" target="_blank" rel="nofollow noopener">U.S. Bureau of Labor Statistics, Data Scientists Job Outlook, updated 2025</a>.</p>
          <p id="ref-lancet-projects"><sup>[2]</sup> Lancet Software India internal project delivery records, 1997–2026.</p>
          <p id="ref-mckinsey"><sup>[3]</sup> <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey, "The State of AI," 2024</a>.</p>
          <p id="ref-gartner"><sup>[4]</sup> <a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner, "AI for Data Analytics," 2024</a>.</p>
          <p id="ref-mit"><sup>[5]</sup> <a className="text-primary hover:underline" href="https://mitsloan.mit.edu/ideas-made-to-matter/data-analytics" target="_blank" rel="nofollow noopener">MIT Sloan, "Why data analytics matters," 2024</a>.</p>
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
