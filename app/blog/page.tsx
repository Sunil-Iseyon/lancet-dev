import { getBlogPosts } from "@/lib/tina"
import PageWrapper from "@/components/layout/PageWrapper"
import PageHero from "@/components/layout/PageHero"
import Section, { SectionContent } from "@/components/layout/Section"
import BlogList from "@/components/BlogList"

export default async function BlogPage() {
  let blogPosts = []
  
  try {
    blogPosts = await getBlogPosts()
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    blogPosts = []
  }

  return (
    <PageWrapper className="">
      <PageHero
  variant="default"
  size="sm"
  title={
    <span className="relative inline-block">
      <span className="absolute inset-0 blur-2xl bg-primary/20 rounded-full" />
      <span className="relative bg-gradient-to-r from-slate-900 via-primary to-slate-900 bg-clip-text text-transparent">
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
    <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
  </div>
</PageHero>

      <div>
        {blogPosts.length > 0 ? (
          <BlogList blogPosts={blogPosts} />
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted-foreground">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
