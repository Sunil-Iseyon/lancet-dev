import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"

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

  return (
    <ContentPageLayout
      title={pageData.title}
      subtitle={pageData.subtitle}
      image={pageData.image}
      body={pageData.body}
      relatedItems={relatedItems}
    />
  )
}
