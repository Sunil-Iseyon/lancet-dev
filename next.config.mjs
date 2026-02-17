/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
          },
          {
            key: 'Link',
            value: '</llms.txt>; rel="alternate"; type="text/plain"; title="LLMs.txt", </robots.txt>; rel="alternate"; type="text/plain"; title="Robots.txt", </sitemap.xml>; rel="sitemap"; type="application/xml"',
          },
        ],
      },
    ]
  },
}

export default nextConfig
