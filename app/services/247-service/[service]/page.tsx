import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import BreadcrumbSchema, { FAQSchema, ServiceSchema } from "@/components/StructuredData"

const publishedDate = "2026-02-13"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>
}): Promise<Metadata> {
  const { service } = await params
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "247-service") {
    return { title: 'Page Not Found' }
  }

  const title = `${pageData.title} - 24/7 Managed Services | Lancet Software India`
  const description = pageData.subtitle || `Professional ${pageData.title} managed services from Lancet Software India. 24/7 monitoring, support, and optimization for enterprise BI platforms.`
  const url = `https://www.lancetindia.com/services/247-service/${service}`

  return {
    title,
    description,
    openGraph: { title, description, url, type: 'website', images: pageData.image ? [{ url: pageData.image }] : [] },
    twitter: { card: 'summary_large_image', title, description, images: pageData.image ? [pageData.image] : [] },
    alternates: { canonical: url, languages: { en: url, 'x-default': url } },
    other: { 'DC.title': pageData.title, 'DC.description': description, 'DC.creator': 'Lancet Software India' },
  }
}

export default async function Service247Page({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "247-service") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("247-service")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== service)
    .slice(0, 5)
    .map((page: any) => ({
      path: `/247-service/${getPageSlug(page)}`,
      title: page.title,
      subtitle: page.subtitle,
      image: page.image,
    }))

  const pageUrl = `https://www.lancetindia.com/services/247-service/${service}`
  const faqItems = [
    {
      question: `What does ${pageData.title} managed service include?`,
      answer: `The ${pageData.title} managed service includes 24/7 monitoring, incident response, performance optimization, and proactive maintenance.`,
    },
    {
      question: `How does Lancet ensure uptime for ${pageData.title}?`,
      answer: `Lancet uses automated monitoring, alert escalation, and SLA-driven response processes to maintain high uptime for ${pageData.title}.`,
    },
  ]

  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: '24/7 Services', url: '/services/247-service' },
        { name: pageData.title, url: pageUrl },
      ]} />
      <ServiceSchema
        name={`${pageData.title} Managed Services`}
        description={pageData.subtitle || `24/7 ${pageData.title} managed services from Lancet Software India.`}
        url={pageUrl}
        serviceType="Managed IT Services"
        datePublished={publishedDate}
        dateModified={publishedDate}
        author={{ name: "Lancet Software India", url: "https://www.lancetindia.com/about/team" }}
        potentialAction={[
          { type: "ContactAction", name: "Request 24/7 Support", target: "https://www.lancetindia.com/contact" },
        ]}
      />
      <FAQSchema questions={faqItems} />
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
