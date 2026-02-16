import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/api/'],
      },
      {
        userAgent: ['GPTBot', 'ChatGPT-User', 'Google-Extended', 'ClaudeBot', 'anthropic-ai', 'Applebot-Extended', 'PerplexityBot', 'cohere-ai'],
        allow: '/',
      },
    ],
    sitemap: 'https://www.lancetindia.com/sitemap.xml',
  }
}
