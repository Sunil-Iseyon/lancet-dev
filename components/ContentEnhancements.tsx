import React from 'react'

/**
 * Citation Component
 * Adds authoritative citations with proper markup
 * Usage: <Citation number={1} url="https://..." source="Source Name">Citation text</Citation>
 */
interface CitationProps {
  number: number
  url: string
  source: string
  children?: React.ReactNode
}

export function Citation({ number, url, source, children }: CitationProps) {
  return (
    <span className="inline-citation">
      {children}
      <sup className="ml-0.5">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline text-xs"
          aria-label={`Citation ${number}: ${source}`}
        >
          [{number}]
        </a>
      </sup>
    </span>
  )
}

/**
 * Statistic Component
 * Highlights statistics for better SEO and AI visibility
 * Usage: <Statistic value="95%" context="client satisfaction" />
 */
interface StatisticProps {
  value: string | number
  context?: string
  className?: string
}

export function Statistic({ value, context, className = '' }: StatisticProps) {
  return (
    <span className={`inline-flex items-baseline gap-1 ${className}`}>
      <strong className="text-primary font-bold text-lg" data-statistic="true">
        {value}
      </strong>
      {context && <span className="text-sm text-muted-foreground">{context}</span>}
    </span>
  )
}

/**
 * Citations Section Component
 * Displays list of references at the bottom of content
 * Usage: <CitationsSection citations={[{number: 1, url: "...", source: "..."}]} />
 */
interface CitationItem {
  number: number
  url: string
  source: string
  title?: string
}

interface CitationsSectionProps {
  citations: CitationItem[]
  title?: string
}

export function CitationsSection({ citations, title = 'References' }: CitationsSectionProps) {
  if (citations.length === 0) return null

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <ol className="space-y-3 text-sm">
        {citations.map((citation) => (
          <li key={citation.number} className="flex gap-3">
            <span className="font-semibold text-primary shrink-0">[{citation.number}]</span>
            <div>
              <a
                href={citation.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground hover:text-primary hover:underline transition-colors"
              >
                {citation.title || citation.source}
              </a>
              <span className="text-muted-foreground ml-2">({citation.source})</span>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}

/**
 * Expert Quote Component
 * Displays expert quotations with proper attribution
 * Usage: <ExpertQuote author="Name" role="Title" company="Company">Quote text</ExpertQuote>
 */
interface ExpertQuoteProps {
  author: string
  role?: string
  company?: string
  children: React.ReactNode
  className?: string
}

export function ExpertQuote({ author, role, company, children, className = '' }: ExpertQuoteProps) {
  return (
    <blockquote className={`my-8 pl-6 border-l-4 border-primary italic ${className}`}>
      <p className="text-lg text-foreground mb-3">&ldquo;{children}&rdquo;</p>
      <footer className="text-sm text-muted-foreground not-italic">
        — <cite className="font-semibold text-foreground">{author}</cite>
        {role && <span>, {role}</span>}
        {company && <span> at {company}</span>}
      </footer>
    </blockquote>
  )
}

/**
 * Stats Grid Component
 * Displays multiple statistics in a grid layout
 * Usage: <StatsGrid stats={[{value: "800+", label: "Projects"}]} />
 */
interface StatItem {
  value: string | number
  label: string
  description?: string
}

interface StatsGridProps {
  stats: StatItem[]
  columns?: 2 | 3 | 4
  className?: string
}

export function StatsGrid({ stats, columns = 3, className = '' }: StatsGridProps) {
  const gridCols = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <div className={`grid ${gridCols[columns]} gap-6 my-12 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors"
        >
          <div className="text-4xl font-bold text-primary mb-2" data-statistic="true">
            {stat.value}
          </div>
          <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
          {stat.description && (
            <div className="text-sm text-muted-foreground">{stat.description}</div>
          )}
        </div>
      ))}
    </div>
  )
}
