import React from 'react'

interface BreadcrumbItem {
  name: string
  url: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

/**
 * Breadcrumb Schema Component
 * Adds structured data for breadcrumb navigation
 * Usage: <BreadcrumbSchema items={[{name: "Home", url: "/"}, {name: "Services", url: "/services"}]} />
 */
export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `https://www.lancetindia.com${item.url}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Service Schema Component
 * Adds structured data for service pages
 */
interface ServiceSchemaProps {
  name: string
  description: string
  url: string
  provider?: {
    name: string
    url: string
  }
  areaServed?: string
  serviceType?: string
  datePublished?: string
  dateModified?: string
  inLanguage?: string
  author?: {
    name: string
    url?: string
    sameAs?: string[]
  }
  offerCatalog?: {
    name: string
    items: string[]
  }
  citation?: string[]
  potentialAction?: Array<{
    type: 'ContactAction' | 'DownloadAction' | 'ViewAction' | 'ReadAction'
    name: string
    target: string
  }>
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = { name: 'Lancet Software India', url: 'https://www.lancetindia.com' },
  areaServed = 'Worldwide',
  serviceType = 'Business Intelligence',
  datePublished,
  dateModified,
  inLanguage = 'en',
  author,
  offerCatalog,
  citation,
  potentialAction,
}: ServiceSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description,
    url,
    provider: {
      '@type': 'Organization',
      name: provider.name,
      url: provider.url,
    },
    areaServed,
    serviceType,
    inLanguage,
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified }),
    ...(author && {
      author: {
        '@type': 'Organization',
        name: author.name,
        ...(author.url && { url: author.url }),
        ...(author.sameAs && { sameAs: author.sameAs }),
      },
    }),
    ...(offerCatalog && {
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: offerCatalog.name,
        itemListElement: offerCatalog.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@type': 'Service',
            name: item,
          },
        })),
      },
    }),
    ...(citation && citation.length > 0 && { citation }),
    ...(potentialAction && potentialAction.length > 0 && {
      potentialAction: potentialAction.map((action) => ({
        '@type': action.type,
        name: action.name,
        target: action.target,
      })),
    }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

interface FAQSchemaProps {
  questions: Array<{
    question: string
    answer: string
  }>
}

export function FAQSchema({ questions }: FAQSchemaProps) {
  if (!questions.length) {
    return null
  }

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * Article/Blog Schema Component
 */
interface ArticleSchemaProps {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  author?: string
  authorUrl?: string
  authorSameAs?: string[]
  url: string
  image?: string
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author = 'Lancet Software India',
  authorUrl,
  authorSameAs,
  url,
  image,
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Person',
      name: author,
      ...(authorUrl && { url: authorUrl }),
      ...(authorSameAs && authorSameAs.length > 0 && { sameAs: authorSameAs }),
      affiliation: {
        '@type': 'Organization',
        name: 'Lancet Software India',
        url: 'https://www.lancetindia.com',
      },
    },
    publisher: {
      '@type': 'Organization',
      name: 'Lancet Software India',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.lancetindia.com/triangle.png',
      },
    },
    url,
    ...(image && { image }),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

/**
 * JobPosting Schema Component
 */
interface JobPostingSchemaProps {
  title: string
  description: string
  datePosted: string
  validThrough?: string
  employmentType?: string
  location?: string
  url: string
}

export function JobPostingSchema({
  title,
  description,
  datePosted,
  validThrough,
  employmentType = 'FULL_TIME',
  location = 'India',
  url,
}: JobPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title,
    description,
    datePosted,
    ...(validThrough && { validThrough }),
    employmentType,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Lancet Software India',
      sameAs: 'https://www.lancetindia.com',
      logo: 'https://www.lancetindia.com/triangle.png',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'IN',
        addressLocality: location,
      },
    },
    url,
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
