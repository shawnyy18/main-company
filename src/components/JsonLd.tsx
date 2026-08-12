/**
 * Renders a JSON-LD structured-data script.
 *
 * `<` is escaped to its unicode form so no value in the payload can close the
 * script tag early — the sanitisation approach recommended by the Next.js
 * JSON-LD guide.
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
