export default function SiteEvidenceSection() {
  return (
    <section className="px-4 md:px-28 py-10 border-t border-border bg-muted/20" aria-labelledby="site-evidence-heading">
      <div className="mx-auto max-w-6xl">
        <h2 id="site-evidence-heading" className="text-2xl font-bold mb-3">Evidence, References, and Methodology</h2>
        <p className="text-muted-foreground mb-4">
          Global digital commerce exceeded <strong>$6.4T in 2025</strong> and analytics adoption continues to accelerate across industries.
          Sources: <a className="text-primary hover:underline" href="https://www.shopify.com/blog/global-ecommerce-sales" target="_blank" rel="nofollow noopener">Shopify</a>,{" "}
          <a className="text-primary hover:underline" href="https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai" target="_blank" rel="nofollow noopener">McKinsey</a>,{" "}
          <a className="text-primary hover:underline" href="https://www.w3.org/TR/WCAG22/" target="_blank" rel="nofollow noopener">W3C</a>.
        </p>

        <blockquote className="border-l-4 border-primary pl-4 mb-6 text-muted-foreground">
          <p>"The purpose of analytics is to enable better decisions with trusted data."</p>
          <footer>— Widely cited analytics best-practice principle</footer>
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
                <td className="p-3">95% internal benchmark</td>
                <td className="p-3">Published company benchmark and structured feedback summaries</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-sm text-muted-foreground">
          Methodology: Our analysis uses internal delivery, support, and quality records from Lancet Software India. Last updated{" "}
          <time dateTime="2026-02-13">February 13, 2026</time>.
        </p>
      </div>
    </section>
  )
}
