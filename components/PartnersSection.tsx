import { getPartners } from "@/lib/tina"
import PartnersClient from "./PartnersClient"

export default async function PartnersSection() {
  const partners = await getPartners()

  return <PartnersClient partners={partners} />
}
