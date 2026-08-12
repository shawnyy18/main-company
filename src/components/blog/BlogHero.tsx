/**
 * Blog homepage and category page header.
 * Deliberately quiet: it introduces the publication without competing with
 * the featured article directly beneath it.
 */
export default function BlogHero({
  eyebrow,
  title,
  description,
  topics,
}: {
  eyebrow: string;
  title: string;
  description: string;
  topics?: string[];
}) {
  return (
    <header className="mx-auto max-w-3xl">
      <p className="mb-5 inline-flex rounded-full border border-border-default bg-bg-surface px-3 py-1.5 text-xs font-semibold text-text-secondary">
        {eyebrow}
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl">
        {title}
      </h1>
      <p className="mt-5 text-[17px] leading-8 text-text-secondary">{description}</p>

      {topics && topics.length > 0 ? (
        <ul className="mt-7 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <li
              key={topic}
              className="rounded-full border border-border-default bg-bg-card px-3 py-1.5 text-xs font-medium text-text-secondary"
            >
              {topic}
            </li>
          ))}
        </ul>
      ) : null}
    </header>
  );
}
