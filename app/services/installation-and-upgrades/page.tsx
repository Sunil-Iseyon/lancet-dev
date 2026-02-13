import { getPage } from "@/lib/tina"
import ContentPageLayout from "@/components/ContentPageLayout"
import { notFound } from "next/navigation"

export default async function InstallationAndUpgradesPage() {
  const pageData = await getPage("installation-and-upgrades")
  
  if (!pageData) {
    notFound()
  }

  return (
    <ContentPageLayout
      title={pageData.title}
      subtitle={pageData.subtitle}
      image={pageData.image}
      body={pageData.body}
    />
  )
}
