import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/tina"
import BlogPostClient from "@/components/blog-page"
import { Metadata } from "next"
import BreadcrumbSchema from "@/components/StructuredData"
import { ArticleSchema } from "@/components/StructuredData"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const post = await getBlogPost(id)

  if (!post) {
    return {
      title: 'Blog Post Not Found',
    }
  }

  const title = `${post.title} | Lancet Software India Blog`
  const description = post.excerpt || `Read our insights on ${post.title}.`
  const url = `https://www.lancetindia.com/blog/${id}`

  return {
    title,
    description,
    openGraph: {
      title: post.title,
      description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author || 'Lancet Software India'],
      images: post.image ? [{ url: post.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'DC.title': post.title,
      'DC.description': description,
      'DC.creator': post.author || 'Lancet Software India',
      'article:published_time': post.date,
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const post = await getBlogPost(id)

  if (!post) notFound()

  const pageUrl = `https://www.lancetindia.com/blog/${id}`

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Blog', url: '/blog' },
        { name: post.title, url: `/blog/${id}` }
      ]} />

      {/* Article Schema */}
      <ArticleSchema
        headline={post.title}
        description={post.excerpt || `Read our insights on ${post.title}.`}
        datePublished={post.date}
        dateModified={post.dateModified || post.date}
        author={post.author || 'Lancet Software India'}
        url={pageUrl}
        image={post.image}
      />

      <BlogPostClient post={post} />
    </>
  )
}
