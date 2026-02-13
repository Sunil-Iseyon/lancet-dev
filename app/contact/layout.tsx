import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Contact Business Intelligence & Data Analytics Team",
  description:
    "Contact Lancet Software India for business intelligence, data analytics, and consulting support. Discuss your data goals with our team.",
  alternates: {
    canonical: "https://www.lancetindia.com/contact",
    languages: {
      en: "https://www.lancetindia.com/contact",
      "x-default": "https://www.lancetindia.com/contact",
    },
  },
  openGraph: {
    title: "Contact Lancet Software India | BI & Data Analytics",
    description:
      "Get in touch with Lancet Software India for BI, data analytics, and enterprise consulting enquiries.",
    url: "https://www.lancetindia.com/contact",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Lancet Software India",
    description:
      "Connect with our BI and data analytics consulting team.",
  },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children
}
