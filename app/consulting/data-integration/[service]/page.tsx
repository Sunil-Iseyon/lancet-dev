import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"

export default async function DataIntegrationServicePage({
  params,
}: {
  params: Promise<{ service: string }>
}) {
  const { service } = await params
  
  // Fetch the current page content
  const pageData = await getPage(service)
  
  if (!pageData || pageData.category !== "data-integration") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("data-integration")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== service)
    .map((page: any) => ({
      path: `/consulting/data-integration/${getPageSlug(page)}`,
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
