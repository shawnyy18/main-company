import {
  comparisonRows,
  formatPeso,
  packagesByCategory,
  type PackageCategory,
} from "@/lib/packages";

/**
 * At-a-glance comparison.
 *
 * Four columns cannot shrink to 375px and stay legible, so below `md` the
 * table scrolls horizontally with the label column pinned. The wrapper is
 * focusable so keyboard users can scroll it too.
 */
export default function PricingTable({
  category,
}: {
  category: PackageCategory;
}) {
  const tiers = packagesByCategory(category);
  const rows = comparisonRows[category];

  return (
    <div
      className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0"
      tabIndex={0}
      role="region"
      aria-label={`${category} package comparison`}
    >
      <table className="w-full min-w-[46rem] border-collapse text-left">
        <thead>
          <tr>
            <th scope="col" className="sticky left-0 z-10 bg-bg-primary py-5 pr-5 align-bottom">
              <span className="eyebrow">At a glance</span>
            </th>
            {tiers.map((tier) => (
              <th key={tier.slug} scope="col" className="px-5 py-5 align-bottom">
                <span className="display block text-[1.5rem] text-text-primary">
                  {tier.name}
                </span>
                {tier.recommended ? (
                  <span className="mt-2 inline-block bg-accent-bright px-2 py-0.5 font-mono text-[11px] uppercase tracking-wider text-ink">
                    Most chosen
                  </span>
                ) : null}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          <tr className="border-t border-border-default">
            <th scope="row" className="sticky left-0 z-10 bg-bg-primary py-5 pr-5 text-[15.5px] font-medium text-text-primary">
              Build price
            </th>
            {tiers.map((tier) => (
              <td key={tier.slug} className="px-5 py-5 text-[16px] text-text-primary">
                {tier.price === null ? "Private quote" : formatPeso(tier.price)}
              </td>
            ))}
          </tr>

          <tr className="border-t border-border-subtle">
            <th scope="row" className="sticky left-0 z-10 bg-bg-primary py-5 pr-5 text-[15.5px] font-medium text-text-primary">
              Care
            </th>
            {tiers.map((tier) => (
              <td key={tier.slug} className="px-5 py-5 text-[15.5px] text-text-secondary">
                {tier.price === null
                  ? "Quoted"
                  : tier.care.recommended
                    ? `From ${formatPeso(tier.care.monthly)}/mo, recommended`
                    : "Optional"}
              </td>
            ))}
          </tr>

          <tr className="border-t border-border-subtle">
            <th scope="row" className="sticky left-0 z-10 bg-bg-primary py-5 pr-5 text-[15.5px] font-medium text-text-primary">
              Hosting included
            </th>
            {tiers.map((tier) => (
              <td key={tier.slug} className="px-5 py-5 text-[15.5px] text-text-secondary">
                {tier.care.includedHostingMonths
                  ? `${tier.care.includedHostingMonths} months`
                  : "—"}
              </td>
            ))}
          </tr>

          {rows.map((row) => (
            <tr key={row} className="border-t border-border-subtle">
              <th scope="row" className="sticky left-0 z-10 bg-bg-primary py-5 pr-5 text-[15.5px] font-medium text-text-primary">
                {row}
              </th>
              {tiers.map((tier) => (
                <td
                  key={tier.slug}
                  className="px-5 py-5 text-[15.5px] text-text-secondary"
                >
                  {tier.compare[row] ?? "—"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
