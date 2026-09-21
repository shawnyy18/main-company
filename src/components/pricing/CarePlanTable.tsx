import { carePlans, formatPeso } from "@/lib/packages";

export default function CarePlanTable() {
  return (
    <div className="grid border-t border-border-default md:grid-cols-3">
      {carePlans.map((plan, index) => (
        <div
          key={plan.slug}
          className={`border-b border-border-default py-10 md:border-b-0 ${
            index < carePlans.length - 1 ? "md:border-r md:pr-8" : "md:pl-8"
          } ${index === 1 ? "md:px-8" : ""}`}
        >
          <h3 className="display text-[1.75rem] text-text-primary">{plan.name}</h3>
          <p className="price mt-3 text-[2.5rem] text-text-primary">
            {formatPeso(plan.monthly)}
            <span className="ml-1.5 font-sans text-[15px] tracking-normal text-text-muted">
              /month
            </span>
          </p>

          <p className="mt-4 max-w-xs text-[15.5px] leading-[1.7] text-text-secondary">
            {plan.summary}
          </p>

          <ul className="mt-6 border-t border-border-subtle">
            {plan.includes.map((item) => (
              <li
                key={item}
                className="border-b border-border-subtle py-3 text-[16px] leading-[1.65] text-text-secondary"
              >
                {item}
              </li>
            ))}
            {plan.contentAllowance ? (
              <li className="border-b border-border-subtle py-3 text-[16px] leading-[1.65] text-text-secondary">
                Updates included: {plan.contentAllowance}
              </li>
            ) : null}
          </ul>

          <p className="mt-4 font-mono text-[11.5px] uppercase tracking-[0.09em] text-text-muted">
            Response {plan.responseTime}
          </p>
        </div>
      ))}
    </div>
  );
}
