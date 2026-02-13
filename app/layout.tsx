import type React from "react"
import type { Metadata } from "next"
import { Sansation, Space_Grotesk, Ubuntu } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"

const _Sansation = Sansation({ subsets: ["latin"], weight: ["400", "700"] })
const _Ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lancetindia.com'),
  title: {
    default: "Lancet Software India - Business Intelligence & Data Analytics Solutions",
    template: "%s | Lancet Software India"
  },
  description:
    "Transform your data into actionable insights with Lancet Software India. Since 1997, delivering professional business intelligence, data analytics, and consulting solutions. 800+ BI projects completed with 95% client satisfaction.",
  keywords: [
    "business intelligence",
    "data analytics",
    "Power BI",
    "Tableau",
    "Databricks",
    "data integration",
    "BI consulting",
    "data services",
    "analytics solutions"
  ],
  authors: [{ name: "Lancet Software India" }],
  creator: "Lancet Software India",
  publisher: "Lancet Software India",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.lancetindia.com',
    siteName: 'Lancet Software India',
    title: 'Lancet Software India - Business Intelligence & Data Analytics Solutions',
    description: 'Transform your data into actionable insights. 800+ BI projects, 50+ team members, 95% client satisfaction since 1997.',
    images: [
      {
        url: '/triangle.png',
        width: 1200,
        height: 630,
        alt: 'Lancet Software India Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lancet Software India - Business Intelligence & Data Analytics Solutions',
    description: 'Transform your data into actionable insights. 800+ BI projects, 50+ team members, 95% client satisfaction since 1997.',
    images: ['/triangle.png'],
  },
  alternates: {
    canonical: 'https://www.lancetindia.com',
    languages: {
      'en': 'https://www.lancetindia.com',
      'x-default': 'https://www.lancetindia.com',
    },
  },
  icons: {
    icon: [
      {
        url: "/triangle.png",
        type: "image/png",
      },
    ],
  },
  other: {
    'DC.title': 'Lancet Software India - Business Intelligence & Data Analytics Solutions',
    'DC.description': 'Professional business intelligence and data analytics solutions since 1997',
    'DC.creator': 'Lancet Software India',
    'DC.identifier': 'https://www.lancetindia.com',
    'DC.language': 'en',
    'license': 'https://creativecommons.org/licenses/by/4.0/',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Lancet Software India",
    "url": "https://www.lancetindia.com",
    "logo": "https://www.lancetindia.com/triangle.png",
    "description": "Leading provider of business intelligence and data analytics solutions since 1997",
    "foundingDate": "1997",
    "knowsLanguage": "en",
    "sameAs": [
      "https://www.linkedin.com/company/lancet-software-india-pvt-ltd"
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@lancetindia.com"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "800",
      "bestRating": "5"
    }
  };

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="content-language" content="en" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className={`antialiased ${_Ubuntu.className}`}>
        <NextTopLoader 
          color="#2563eb"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />
        <style>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${_Sansation.style.fontFamily}, sans-serif;
          }
        `}</style>
        <Navbar />
        <SmoothScrollProvider>
          {children}
          <Analytics />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
