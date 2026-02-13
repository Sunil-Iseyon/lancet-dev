# Tina CMS Integration

This project has been configured to fetch content from Tina Cloud CMS instead of using hardcoded constant data.

## What Changed

All pages and components that previously used constant/static data now fetch from Tina CMS:

### Pages Updated:
- **Blog Page** (`app/blog/page.tsx`) - Fetches blog posts from `content/blog/`
- **Testimonials Page** (`app/testimonials/page.tsx`) - Fetches testimonials from `content/testimonials/`
- **Home Page** (`app/page.tsx`) - Fetches testimonials and features from Tina

### Components Updated:
- **ServicesSection** - Fetches services from `content/services/`
- **PartnersSection** - Fetches partners from `content/partners/`
- **FeaturesSection** - Fetches features from `content/features/`
- **TestimonialsSection** - Receives testimonials as props from Tina

## Content Structure

Content is organized in the following collections:

```
content/
├── blog/           # Blog posts (MDX format)
├── testimonials/   # Client testimonials (JSON)
├── services/       # Service offerings (JSON)
├── partners/       # Partner logos (JSON)
├── features/       # Feature highlights (JSON)
└── stats/          # Statistics (JSON)
```

## Local Development

The application is currently configured for local development mode, reading files directly from the `content/` folder.

### Running Locally

```bash
pnpm dev
```

The app will read content from the local `content/` directory.

## Setting Up Tina Cloud (Production)

To use Tina Cloud for production:

1. **Sign up for Tina Cloud**
   - Visit https://app.tina.io/
   - Create an account and a new project

2. **Get your credentials**
   - Copy your Client ID and Read-Only Token from Tina Cloud

3. **Update environment variables**
   ```bash
   # In .env.local or production environment
   NEXT_PUBLIC_TINA_CLIENT_ID=your_client_id_here
   TINA_TOKEN=your_read_only_token_here
   NEXT_PUBLIC_TINA_BRANCH=main
   TINA_PUBLIC_IS_LOCAL=false
   ```

4. **Build Tina**
   ```bash
    $env:NEXT_PUBLIC_TINA_CLIENT_ID=""; $env:TINA_TOKEN=""; $env:NEXT_PUBLIC_TINA_BRANCH="main"; pnpm build
   ```

5. **Access the CMS**
   - Visit `/admin` in your app to access the Tina CMS editor
   - Edit content directly in the browser

## Adding New Content

### For Local Development

Add JSON files to the respective folders:

**Testimonial** (`content/testimonials/example.json`):
```json
{
  "name": "John Doe",
  "position": "CEO",
  "company": "Tech Corp",
  "content": "Great service!",
  "rating": 5,
  "avatarUrl": "/images/avatar.jpg"
}
```

**Service** (`content/services/example.json`):
```json
{
  "serviceId": "my-service",
  "title": "My Service",
  "description": "Service description",
  "image": "/images/service.jpg",
  "link": "/services/my-service",
  "icon": "BarChart3"
}
```

**Blog Post** (`content/blog/example.mdx`):
```mdx
---
title: "My Blog Post"
excerpt: "Short description"
author: "Author Name"
date: 2025-12-26T00:00:00.000Z
category: "Category"
image: "/images/post.jpg"
readTime: "5 min read"
---

Your blog content here...
```

### With Tina Cloud

Once Tina Cloud is configured, you can add and edit content through the visual editor at `/admin`.

## Schema

The Tina schema is defined in `tina/config.ts` and includes:

- **Blog** - MDX format with frontmatter
- **Testimonials** - JSON with name, position, content, rating
- **Services** - JSON with serviceId, title, description, image, link, icon
- **Partners** - JSON with name and logo
- **Features** - JSON with title and description
- **Stats** - JSON with value and label

## Available Icons

For services and features, use these Lucide icon names:
- `BarChart3`
- `Zap`
- `Database`
- `Lightbulb`

Add more icons in `components/ServicesSection.tsx` by updating the `iconMap`.

## Troubleshooting

**Content not appearing?**
- Check that files exist in the correct `content/` subdirectory
- Verify JSON files have valid JSON syntax
- Make sure MDX files have proper frontmatter

**Errors about Tina client?**
- Ensure `TINA_PUBLIC_IS_LOCAL=true` is set in `.env.local`
- The app uses filesystem reading when in local mode

## Next Steps

1. Add more content files to `content/` folders
2. Customize the Tina schema in `tina/config.ts` as needed
3. When ready for production, set up Tina Cloud credentials
4. Deploy and enjoy content management through the Tina CMS editor!
