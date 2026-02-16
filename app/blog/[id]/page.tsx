import { notFound } from "next/navigation"
import { getBlogPost } from "@/lib/tina"
import BlogPostClient from "@/components/blog-page"
import { Metadata } from "next"
import BreadcrumbSchema from "@/components/StructuredData"
import { ArticleSchema } from "@/components/StructuredData"
import { FAQSchema } from "@/components/StructuredData"

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
  const description = post.excerpt || `${post.title}: practical AI conversation and prompt engineering strategies from Lancet Software India Blog.`
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
      languages: {
        'en': url,
        'x-default': url,
      },
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
  const isTurningTablesPost = id === 'Turning-the-Tables-on-ChatGPT'
  const isDevilsAdvocatePost = id === 'AI-as-Devils-Advocate'

  const turningTablesFaq = [
    {
      question: 'How can role-based prompting improve ChatGPT results?',
      answer: 'Role-based prompting narrows context and constraints, which generally improves output precision and consistency for practical tasks.',
    },
    {
      question: 'Why ask ChatGPT to ask clarifying questions first?',
      answer: 'Clarifying questions collect missing context before generation, reducing vague responses and improving relevance.',
    },
    {
      question: 'What is a simple reusable structure for better prompts?',
      answer: 'A practical structure is: Your Role, My Role, Context, and explicit constraints such as budget, time, and preferences.',
    },
  ]

  const turningTablesSupplementalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        name: 'ChatGPT',
        sameAs: 'https://platform.openai.com/docs/models/gpt-4o',
        inDefinedTermSet: 'https://www.lancetindia.com',
      },
      {
        '@type': 'QuantitativeValue',
        name: 'Dinner-party budget in example prompt',
        value: 200,
        unitText: 'USD',
      },
    ],
  }

  const devilsAdvocateFaq = [
    {
      question: 'How can AI act as a practical devil’s advocate for business ideas?',
      answer: 'AI can challenge assumptions, surface risks, and propose alternatives using structured prompts and clear constraints.',
    },
    {
      question: 'What prompt structure helps produce better critical feedback?',
      answer: 'A reliable structure is: ChatGPT Role, User Role, Context, Task, and iterative refinement questions.',
    },
    {
      question: 'Can AI replace human advisors in strategy decisions?',
      answer: 'AI helps with structured critique and scenario testing, but human judgment remains essential for nuanced decisions and accountability.',
    },
  ]

  const devilsAdvocateSupplementalSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'DefinedTerm',
        name: 'Team of Rivals',
        description: 'Leadership approach popularized by Doris Kearns Goodwin, emphasizing diverse and opposing viewpoints for better decisions.',
        sameAs: 'https://en.wikipedia.org/wiki/Team_of_Rivals',
        inDefinedTermSet: 'https://www.lancetindia.com',
      },
      {
        '@type': 'DefinedTerm',
        name: 'Devil’s Advocate',
        description: 'A deliberate challenge technique used to test assumptions, risks, and alternatives before execution.',
        inDefinedTermSet: 'https://www.lancetindia.com',
      },
      {
        '@type': 'CreativeWork',
        name: 'AI as Devil’s Advocate references',
        citation: [
          'https://www.loc.gov/item/2013655018/',
          'https://www.mckinsey.com/capabilities/people-and-organizational-performance/our-insights/the-ceos-guide-to-competitive-intelligence-gathering',
          'https://hbr.org/2009/12/in-praise-of-the-devils-advocate',
        ],
      },
    ],
  }

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
        description={post.excerpt || `${post.title}: practical AI conversation and prompt engineering strategies from Lancet Software India Blog.`}
        datePublished={post.date}
        dateModified={post.dateModified || post.date}
        author={post.author || 'Lancet Software India'}
        authorUrl={post.author ? undefined : 'https://www.lancetindia.com/about/team'}
        authorSameAs={post.author ? undefined : ['https://www.linkedin.com/company/lancet-software-india-pvt-ltd-/']}
        url={pageUrl}
        image={post.image}
      />

      {isTurningTablesPost && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(turningTablesSupplementalSchema) }}
          />
          <FAQSchema questions={turningTablesFaq} />
        </>
      )}

      {isDevilsAdvocatePost && (
        <>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(devilsAdvocateSupplementalSchema) }}
          />
          <FAQSchema questions={devilsAdvocateFaq} />
        </>
      )}

      <BlogPostClient post={post} />
    </>
  )
}
