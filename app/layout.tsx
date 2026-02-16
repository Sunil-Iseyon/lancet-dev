import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Ubuntu } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import NextTopLoader from "nextjs-toploader"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import SmoothScrollProvider from "@/components/smooth-scroll-provider"
import SiteEvidenceSection from "@/components/SiteEvidenceSection"

const _SpaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400", "700"] })
const _Ubuntu = Ubuntu({ subsets: ["latin"], weight: ["300", "400", "500", "700"] })
// const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.lancetindia.com'),
  title: {
    default: "Lancet Software India - Business Intelligence & Data Analytics Solutions",
    template: "%s | Lancet Software India"
  },
  description:
    "Lancet Software India provides business intelligence and data analytics solutions. Since 1997, delivering BI consulting, data engineering, and enterprise analytics across Power BI, Tableau, and Databricks. 800+ projects completed with 95% client satisfaction.",
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
      "https://www.linkedin.com/company/lancet-software-india-pvt-ltd",
      "https://www.lancetindia.com"
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
    },
    "potentialAction": [
      {
        "@type": "ViewAction",
        "name": "View Business Intelligence Services",
        "target": "https://www.lancetindia.com/consulting/business-intelligent/strategy"
      },
      {
        "@type": "ContactAction",
        "name": "Contact Lancet Software India",
        "target": "https://www.lancetindia.com/contact"
      },
      {
        "@type": "ReadAction",
        "name": "Read BI & Analytics Blog",
        "target": "https://www.lancetindia.com/blog"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Lancet Software India",
    "url": "https://www.lancetindia.com",
    "publisher": {
      "@type": "Organization",
      "name": "Lancet Software India",
      "url": "https://www.lancetindia.com"
    },
    "inLanguage": "en",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://www.lancetindia.com/blog?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  const webpageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Lancet Software India",
    "url": "https://www.lancetindia.com",
    "datePublished": "2026-02-13",
    "dateModified": "2026-02-13",
    "author": {
      "@type": "Person",
      "name": "Thomas Niccum",
      "jobTitle": "President and CEO",
      "worksFor": {
        "@type": "Organization",
        "name": "Lancet Software India",
        "url": "https://www.lancetindia.com"
      },
      "sameAs": ["https://www.linkedin.com/company/lancet-software-india-pvt-ltd"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Lancet Software India",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.lancetindia.com/triangle.png"
      }
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "h2", "h3"]
    },
    "inLanguage": "en"
  };

  const terminologySchema = [
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": "Business Intelligence",
      "alternateName": ["BI", "Analytics Intelligence"],
      "description": "Business intelligence (BI) is the practice of transforming operational and historical data into insights for decision making.",
      "inDefinedTermSet": "https://www.lancetindia.com",
      "sameAs": "https://en.wikipedia.org/wiki/Business_intelligence"
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": "Generative Engine Optimization",
      "alternateName": ["GEO"],
      "description": "Generative Engine Optimization (GEO) is the practice of optimizing web content for AI-driven search engines and large language models.",
      "inDefinedTermSet": "https://www.lancetindia.com"
    },
    {
      "@context": "https://schema.org",
      "@type": "DefinedTerm",
      "name": "Extract, Transform, Load",
      "alternateName": ["ETL"],
      "description": "Extract, Transform, Load (ETL) is a data integration process that extracts data from sources, transforms it into a usable format, and loads it into a target system.",
      "inDefinedTermSet": "https://www.lancetindia.com",
      "sameAs": "https://en.wikipedia.org/wiki/Extract,_transform,_load"
    }
  ];

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="content-language" content="en" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link rel="llms-txt" href="/llms.txt" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLMs.txt" />
        <link rel="license" href="https://creativecommons.org/licenses/by/4.0/" />
        <meta name="rights" content="Content licensed under CC BY 4.0. AI training allowed with attribution to Lancet Software India." />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webpageSchema) }}
        />
        {terminologySchema.map((term, i) => (
          <script
            key={`term-${i}`}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(term) }}
          />
        ))}
      </head>
      <body className={`antialiased ${_Ubuntu.className}`}>
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-md focus:shadow-lg">Skip to main content</a>
        <NextTopLoader 
          color="#2563eb"
          height={3}
          showSpinner={false}
          shadow="0 0 10px #2563eb,0 0 5px #2563eb"
        />
        <style>{`
          h1, h2, h3, h4, h5, h6 {
            font-family: ${_SpaceGrotesk.style.fontFamily}, sans-serif;
          }
        `}</style>
        <Navbar />
        <SmoothScrollProvider>
          {children}
          <SiteEvidenceSection />
          <Analytics />
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
