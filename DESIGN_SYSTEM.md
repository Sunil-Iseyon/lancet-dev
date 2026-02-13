# Design System Implementation Guide

## Overview
This design system provides a unified, consistent structure for all pages across the Lancet website.

## Core Components

### 1. **PageWrapper** (`components/layout/PageWrapper.tsx`)
Standardized page container with consistent spacing and layout.

**Usage:**
\`\`\`tsx
import PageWrapper from "@/components/layout/PageWrapper"

<PageWrapper 
  size="default" // default | wide | full
  paddingTop={true} // adds pt-20 for navbar
>
  {children}
</PageWrapper>
\`\`\`

**Sizes:**
- `default`: max-w-7xl (1280px)
- `wide`: max-w-[1400px]
- `full`: full width with padding

---

### 2. **PageHero** (`components/layout/PageHero.tsx`)
Standardized hero sections with multiple variants.

**Usage:**
\`\`\`tsx
import PageHero from "@/components/layout/PageHero"

<PageHero
  title="Page Title"
  subtitle="Optional subtitle text"
  variant="default" // default | gradient | image | minimal
  size="md" // sm | md | lg | xl
  backgroundImage="/path/to/image.jpg" // for variant="image"
/>
\`\`\`

**Variants:**
- `default`: Gradient background with grid pattern
- `gradient`: Primary/accent gradient
- `image`: Full background image with overlay
- `minimal`: Plain background

**Sizes:**
- `sm`: py-12 md:py-16
- `md`: py-16 md:py-24
- `lg`: py-24 md:py-32
- `xl`: min-h-[60vh]

---

### 3. **Section** Components (`components/layout/Section.tsx`)
Standardized content sections with consistent spacing.

**Usage:**
\`\`\`tsx
import Section, { SectionHeader, SectionContent } from "@/components/layout/Section"

<Section 
  spacing="md" // sm | md | lg | xl
  background="default" // default | muted | gradient | none
  id="section-id"
>
  <SectionContent maxWidth="lg">
    <SectionHeader 
      title="Section Title"
      subtitle="Optional subtitle"
      centered={true}
    />
    {/* Your content */}
  </SectionContent>
</Section>
\`\`\`

**Spacing:**
- `sm`: py-8 md:py-12
- `md`: py-12 md:py-16
- `lg`: py-16 md:py-24
- `xl`: py-24 md:py-32

**Max Widths:**
- `sm`: max-w-3xl (768px)
- `md`: max-w-5xl (1024px)
- `lg`: max-w-7xl (1280px)
- `xl`: max-w-[1400px]
- `full`: max-w-full

---

## Utility Classes

### Typography
\`\`\`css
.gradient-text  // Standard gradient text effect
\`\`\`

### Cards
\`\`\`css
.card-hover     // Consistent hover effect for cards
\`\`\`

### Spacing
\`\`\`css
.section-spacing    // Standard section spacing
.container-padding  // Standard container padding
\`\`\`

---

## Standard Page Structure

### Basic Page Template
\`\`\`tsx
import PageWrapper from "@/components/layout/PageWrapper"
import PageHero from "@/components/layout/PageHero"
import Section, { SectionHeader, SectionContent } from "@/components/layout/Section"

export default function MyPage() {
  return (
    <PageWrapper>
      <PageHero
        title="Page Title"
        subtitle="Page description"
        variant="default"
        size="md"
      />

      <Section spacing="lg">
        <SectionContent maxWidth="lg">
          <SectionHeader
            title="Section Title"
            subtitle="Section description"
          />
          {/* Your content grid/cards */}
        </SectionContent>
      </Section>

      <Section spacing="md" background="muted">
        <SectionContent maxWidth="xl">
          {/* Additional content */}
        </SectionContent>
      </Section>
    </PageWrapper>
  )
}
\`\`\`

### With Image Hero
\`\`\`tsx
<PageWrapper paddingTop={false}>
  <PageHero
    title="Get In Touch"
    subtitle="Contact description"
    variant="image"
    backgroundImage="/hero-bg.jpg"
    size="lg"
  />
  {/* Rest of content */}
</PageWrapper>
\`\`\`

---

## Design Tokens (from globals.css)

### Typography Standards
- **H1**: text-4xl/5xl, font-bold
- **H2**: text-3xl, font-semibold  
- **H3**: text-2xl, font-semibold
- **H4**: text-xl, font-semibold

### Gradient Text Pattern
Use the \`.gradient-text\` utility or:
\`\`\`tsx
<h1 className="gradient-text">Title</h1>
\`\`\`

### Card Pattern
\`\`\`tsx
<Card className="card-hover">
  {/* Card content */}
</Card>
\`\`\`

---

## Migration Checklist

When converting a page to the new system:

- [ ] Replace custom page wrapper with \`<PageWrapper>\`
- [ ] Replace hero section with \`<PageHero>\`
- [ ] Wrap content sections with \`<Section>\` and \`<SectionContent>\`
- [ ] Replace custom gradient text with \`.gradient-text\` utility
- [ ] Replace custom card hover with \`.card-hover\` utility
- [ ] Remove inconsistent padding/margins
- [ ] Ensure consistent spacing using Section props
- [ ] Test responsive behavior

---

## Examples

### ✅ Refactored Pages
- Blog Page (\`app/blog/page.tsx\`)
- Contact Page (\`app/contact/page.tsx\`)
- Testimonials Page (\`app/testimonials/page.tsx\`)

### 🔄 Pages to Refactor
- Home Page
- About/Team Page
- Services Pages
- Career Page
- Dashboard Gallery

---

## Benefits

1. **Consistency**: All pages follow the same structure
2. **Maintainability**: Single source of truth for layouts
3. **Responsive**: Built-in responsive behavior
4. **Accessibility**: Semantic HTML structure
5. **Animations**: Consistent GSAP animations
6. **Flexibility**: Multiple variants while maintaining consistency
7. **Developer Experience**: Easy to understand and use

---

## Support

For questions or issues with the design system, refer to:
- Component source files in \`components/layout/\`
- \`app/globals.css\` for utility classes
- Refactored page examples
