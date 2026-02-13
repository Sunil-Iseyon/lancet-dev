import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Team: Business Intelligence & Data Analytics Experts",
  description:
    "Meet the Lancet Software India leadership and consulting team delivering business intelligence and data analytics solutions.",
  alternates: {
    canonical: "https://www.lancetindia.com/about/team",
    languages: {
      en: "https://www.lancetindia.com/about/team",
      "x-default": "https://www.lancetindia.com/about/team",
    },
  },
  openGraph: {
    title: "Lancet Team | BI & Data Analytics Experts",
    description:
      "Leadership and consulting experts focused on enterprise BI, analytics, and data engineering delivery.",
    url: "https://www.lancetindia.com/about/team",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lancet Team | BI & Data Analytics Experts",
    description:
      "Meet the team driving BI and analytics transformation at Lancet Software India.",
  },
}

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return children
}
