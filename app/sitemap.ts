import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.lancetindia.com'
  
  // Static routes
  const routes = [
    '',
    '/about/team',
    '/about/careers',
    '/contact',
    '/blog',
    '/consulting/business-intelligent/powerbi',
    '/consulting/business-intelligent/tableau',
    '/consulting/business-intelligent/strategy',
    '/consulting/data-services/databricks',
    '/consulting/data-integration/aws',
    '/services/shopify',
    '/services/247-service',
    '/services/installation-and-upgrades',
    '/resources/dashboard-gallery',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as const,
    priority: route === '' ? 1.0 : route.includes('/blog') ? 0.8 : 0.9,
  }))
}
