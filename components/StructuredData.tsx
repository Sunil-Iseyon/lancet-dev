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
}

export function ServiceSchema({
  name,
  description,
  url,
  provider = { name: 'Lancet Software India', url: 'https://www.lancetindia.com' },
  areaServed = 'Worldwide',
  serviceType = 'Business Intelligence',
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
  url: string
  image?: string
}

export function ArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  author = 'Lancet Software India',
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
      '@type': 'Organization',
      name: author,
      url: 'https://www.lancetindia.com',
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
