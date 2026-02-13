import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { ServiceSchema } from "@/components/StructuredData"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "business-intelligent") {
    return {
      title: 'Page Not Found',
    }
  }

  const title = `${pageData.title} - Business Intelligence Consulting | Lancet Software India`
  const description = pageData.subtitle || `Expert ${pageData.title} consulting services. Transform your data with professional business intelligence solutions from Lancet Software India.`
  const url = `https://www.lancetindia.com/consulting/business-intelligent/${service}`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: pageData.image ? [{ url: pageData.image }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: pageData.image ? [pageData.image] : [],
    },
    alternates: {
      canonical: url,
    },
    other: {
      'DC.title': pageData.title,
      'DC.description': description,
      'DC.creator': 'Lancet Software India',
    },
  }
}

export default async function BusinessIntelligentServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "business-intelligent") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("business-intelligent")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== service)
    .map((page: any) => ({
      path: `/consulting/business-intelligent/${getPageSlug(page)}`,
      title: page.title,
      subtitle: page.subtitle,
      image: page.image,
    }))

  const pageUrl = `https://www.lancetindia.com/consulting/business-intelligent/${service}`

  return (
    <>
      {/* Breadcrumb Schema */}
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Consulting', url: '/consulting' },
        { name: 'Business Intelligence', url: '/consulting/business-intelligent' },
        { name: pageData.title, url: `/consulting/business-intelligent/${service}` }
      ]} />

      {/* Service Schema */}
      <ServiceSchema
        name={`${pageData.title} Consulting Services`}
        description={pageData.subtitle || `Expert ${pageData.title} consulting, implementation, and support services from Lancet Software India. Transform your data into actionable insights.`}
        url={pageUrl}
        serviceType="Business Intelligence Consulting"
        areaServed="Worldwide"
      />

      <ContentPageLayout
        title={pageData.title}
        subtitle={pageData.subtitle}
        image={pageData.image}
        body={pageData.body}
        relatedItems={relatedItems}
      />
    </>
  )
}
