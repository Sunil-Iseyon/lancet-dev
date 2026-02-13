import { getPage, getPagesByCategory, getPageSlug } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"

export default async function EngagementModePage({
  params,
}: {
  params: Promise<{ mode: string }>
}) {
  const { mode } = await params
  
  // Fetch the current page content
  const pageData = await getPage(mode)
  
  if (!pageData || pageData.category !== "engagement-modes") {
    notFound()
  }

  // Fetch related pages from the same category
  const relatedPages = await getPagesByCategory("engagement-modes")
  const relatedItems = relatedPages
    .filter((page: any) => getPageSlug(page) !== mode)
    .map((page: any) => ({
      path: `/engagement-modes/${getPageSlug(page)}`,
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
