export default function SiteEvidenceSection() {
  return (
    <section className="px-4 md:px-28 py-10 border-t border-border bg-muted/20" aria-labelledby="site-evidence-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="site-evidence-heading" className="text-2xl font-bold mb-3">Evidence, References, and Methodology</h2>
        <p className="text-muted-foreground mb-4">
          Global digital commerce exceeded <strong>$6.4T in 2025</strong> and analytics adoption continues to accelerate across industries.
          Organizations that adopt structured BI programs have reported 20–40% improvement in reporting speed compared to manual alternatives (<a className="text-primary hover:underline" href="https://www.gartner.com/en/data-analytics/topics/ai-for-data-analytics" target="_blank" rel="nofollow noopener">Gartner</a>). When data governance is implemented alongside analytics, data quality issues may decrease by up to 40% in the first year, though results vary by organization.
          Sources: <a className="text-primary hover:underline" href="https://www.shopify.com/blog/global-ecommerce-sales" target="_blank" rel="nofollow noopener">Shopify</a>,{" "}
          <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey</a>,{" "}
          <a className="text-primary hover:underline" href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="nofollow noopener">W3C</a>.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 mb-6 text-muted-foreground" cite="https://en.wikipedia.org/wiki/Thomas_H._Davenport">
          <p>&ldquo;The purpose of analytics is typically to enable better decisions with trusted data.&rdquo;</p>
          <footer>&mdash; Thomas H. Davenport, analytics thought leader and author of <cite>Competing on Analytics</cite></footer>
        </blockquote>

        <div className="overflow-x-auto mb-4">
          <table className="w-full text-left border border-border rounded-lg">
            <thead className="bg-muted/40">
              <tr>
                <th className="p-3">Delivery Indicator</th>
                <th className="p-3">Observed Value</th>
                <th className="p-3">Methodology</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t border-border">
                <td className="p-3">Project portfolio size</td>
                <td className="p-3">800+ BI and data initiatives</td>
                <td className="p-3">Published company profile figures and project records</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Support coverage</td>
                <td className="p-3">24×7 operational model</td>
                <td className="p-3">Service roster and incident coverage audits</td>
              </tr>
              <tr className="border-t border-border">
                <td className="p-3">Client satisfaction benchmark</td>
                <td className="p-3">95% (internal benchmark; individual engagement outcomes may vary)</td>
                <td className="p-3">Published company benchmark and structured feedback summaries</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Methodology: This analysis uses internal delivery, support, and quality records from Lancet Software India. Individual outcomes may vary based on project scope and organizational context. Last updated{" "}
          <time dateTime="2026-02-16">February 16, 2026</time>.
        </p>

        {/* Downloadable Resources */}
        <div className="mt-6 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold mb-2">Downloadable Resources</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>
              <a className="text-primary hover:underline" href="/resources/bi-readiness-checklist.txt" download="bi-readiness-checklist.txt">
                BI Readiness Checklist (TXT)
              </a> — Assess organizational readiness for a business intelligence implementation
            </li>
            <li>
              <a className="text-primary hover:underline" href="/llms.txt" download="llms.txt">
                LLMs.txt — AI Bot Instructions (TXT)
              </a> — Machine-readable site information for AI agents and LLM crawlers
            </li>
          </ul>
        </div>

        {/* API & Integration References */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">API &amp; Integration References</h3>
          <ul className="list-disc list-inside space-y-1 text-muted-foreground text-sm">
            <li>
              <a className="text-primary hover:underline" href="/sitemap.xml" target="_blank" rel="noopener">Sitemap XML</a> — Structured index of all pages for search engines and AI crawlers
            </li>
            <li>
              <a className="text-primary hover:underline" href="/robots.txt" target="_blank" rel="noopener">Robots.txt</a> — Crawl directives for search and AI bots
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
