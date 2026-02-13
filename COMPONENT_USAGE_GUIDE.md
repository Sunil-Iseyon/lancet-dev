# Quick Reference: SEO Component Usage

This guide shows how to implement the new SEO enhancement components in your pages.

## 📦 Available Components

### 1. **Structured Data Components**
Location: `components/StructuredData.tsx`

- `BreadcrumbSchema` - Navigation breadcrumbs
- `ServiceSchema` - Service/product pages
- `ArticleSchema` - Blog posts and articles
- `JobPostingSchema` - Career/job listings

### 2. **FAQ Components**
Location: `components/FAQSchema.tsx`

- `FAQSchema` - Schema markup only (invisible)
- `FAQSection` - Full FAQ display with schema + UI

### 3. **Content Enhancement Components**
Location: `components/ContentEnhancements.tsx`

- `Citation` - Authoritative citations
- `Statistic` - Highlight key statistics
- `CitationsSection` - Reference list
- `ExpertQuote` - Attributed quotations
- `StatsGrid` - Visual statistics display

---

## 🚀 Quick Examples

### Adding Breadcrumbs to a Page
```tsx
import BreadcrumbSchema from '@/components/StructuredData'

export default function ServicePage() {
  return (
    <>
      <BreadcrumbSchema items={[
        { name: 'Home', url: '/' },
        { name: 'Services', url: '/services' },
        { name: 'Power BI', url: '/consulting/business-intelligent/powerbi' }
      ]} />
      {/* Rest of your page */}
    </>
  )
}
```

### Adding Service Schema
```tsx
import { ServiceSchema } from '@/components/StructuredData'

export default function PowerBIPage() {
  return (
    <>
      <ServiceSchema
        name="Power BI Consulting Services"
        description="Expert Power BI consulting and implementation services"
        url="https://www.lancetindia.com/consulting/business-intelligent/powerbi"
        serviceType="Business Intelligence Consulting"
      />
      {/* Rest of your page */}
    </>
  )
}
```

### Adding FAQ Section
```tsx
import { FAQSection } from '@/components/FAQSchema'

const faqs = [
  {
    question: "What is Power BI?",
    answer: "Power BI is a business analytics service by Microsoft that provides interactive visualizations and business intelligence capabilities."
  },
  {
    question: "How long does implementation take?",
    answer: "Typical Power BI implementation takes 4-8 weeks depending on complexity and data sources."
  }
]

export default function PowerBIPage() {
  return (
    <div>
      {/* Your content */}
      <FAQSection 
        faqs={faqs}
        url="https://www.lancetindia.com/consulting/business-intelligent/powerbi"
      />
    </div>
  )
}
```

### Adding Statistics to Content
```tsx
import { Statistic, StatsGrid } from '@/components/ContentEnhancements'

export default function AboutPage() {
  return (
    <div>
      <p>
        Lancet Software India has completed <Statistic value="800+" context="projects" /> 
        with <Statistic value="95%" context="client satisfaction" />.
      </p>

      <StatsGrid 
        stats={[
          { value: "800+", label: "BI Projects", description: "Completed since 1997" },
          { value: "50+", label: "Team Members", description: "Data experts" },
          { value: "95%", label: "Satisfaction", description: "Client rating" }
        ]}
        columns={3}
      />
    </div>
  )
}
```

### Adding Citations
```tsx
import { Citation, CitationsSection } from '@/components/ContentEnhancements'

const citations = [
  { 
    number: 1, 
    url: "https://www.gartner.com/...", 
    source: "Gartner", 
    title: "Data Analytics Trends 2024" 
  },
  { 
    number: 2, 
    url: "https://www.linkedin.com/company/lancet-software-india-pvt-ltd", 
    source: "LinkedIn", 
    title: "Company Profile" 
  }
]

export default function BlogPost() {
  return (
    <article>
      <p>
        <Citation number={1} url={citations[0].url} source={citations[0].source}>
          According to recent industry analysis
        </Citation>, the BI market is growing rapidly.
      </p>
      
      {/* More content */}
      
      <CitationsSection citations={citations} />
    </article>
  )
}
```

### Adding Expert Quotes
```tsx
import { ExpertQuote } from '@/components/ContentEnhancements'

export default function TestimonialPage() {
  return (
    <div>
      <ExpertQuote
        author="John Smith"
        role="CTO"
        company="Tech Corp"
      >
        Lancet Software India transformed our data analytics capabilities. 
        Their Power BI implementation exceeded our expectations.
      </ExpertQuote>
    </div>
  )
}
```

### Adding Job Posting Schema
```tsx
import { JobPostingSchema } from '@/components/StructuredData'

export default function CareerPage() {
  return (
    <>
      <JobPostingSchema
        title="Senior Business Intelligence Analyst"
        description="Join our team to work on cutting-edge BI projects..."
        datePosted="2026-02-01"
        validThrough="2026-04-01"
        employmentType="FULL_TIME"
        location="Bangalore, India"
        url="https://www.lancetindia.com/about/careers"
      />
      {/* Rest of page */}
    </>
  )
}
```

### Adding Article Schema (Blog Posts)
```tsx
import { ArticleSchema } from '@/components/StructuredData'

export default function BlogPost() {
  return (
    <>
      <ArticleSchema
        headline="Top 10 Power BI Best Practices"
        description="Learn the essential best practices for Power BI development"
        datePublished="2026-02-12"
        dateModified="2026-02-12"
        author="Lancet Software India"
        url="https://www.lancetindia.com/blog/power-bi-best-practices"
        image="https://www.lancetindia.com/blog-images/powerbi.jpg"
      />
      {/* Article content */}
    </>
  )
}
```

---

## 🎨 Styling Tips

All components use Tailwind CSS classes and respect your theme:
- `text-primary` - Uses your primary color
- `text-foreground` - Main text color
- `text-muted-foreground` - Secondary text
- `bg-card` - Card background
- `border-border` - Border color

Components automatically adapt to light/dark mode when using these semantic color classes.

---

## ✅ Best Practices

### Statistics
- Place at least one statistic in the first 100 words of each page
- Use real, verifiable numbers
- Provide context with the `context` prop

### Citations
- Aim for 3-5 citations per 1000 words
- Prefer authoritative sources (.edu, .gov, industry leaders)
- Use CitationsSection at the bottom of long content

### FAQs
- Add FAQ sections to service pages, blog posts, and product pages
- Write questions as users would ask them
- Keep answers concise but complete (1-3 paragraphs)

### Structured Data
- Always add BreadcrumbSchema to pages with navigation hierarchy
- Use ServiceSchema for all service/product pages
- Add ArticleSchema to all blog posts
- Include JobPostingSchema for each job opening

---

## 🔍 Testing Your Implementation

After adding components, verify they work:

1. **View Page Source** - Check for JSON-LD scripts in `<head>`
2. **Google Rich Results Test** - https://search.google.com/test/rich-results
3. **Schema Validator** - https://validator.schema.org/
4. **Lighthouse SEO Audit** - Chrome DevTools > Lighthouse

---

## 📚 Additional Resources

- [Schema.org Documentation](https://schema.org)
- [Google Search Central](https://developers.google.com/search)
- [SEO Best Practices](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)

---

**Last Updated:** February 12, 2026
