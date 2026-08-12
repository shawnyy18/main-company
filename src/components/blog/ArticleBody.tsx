import AdSlot from "./AdSlot";
import ArticleInteractions from "./ArticleInteractions";

const CONTAINER_ID = "article-body";

/**
 * Renders the article HTML produced by the Markdown pipeline.
 *
 * Exactly one ad sits inside the body, at the section break nearest the
 * middle — never after the intro, and never inside a paragraph. The second
 * unit lives after the article on the page itself. `AdSlot` renders nothing
 * until AdSense is configured and the reader has accepted marketing cookies.
 */
export default function ArticleBody({ html }: { html: string }) {
  // The Markdown renderer always emits H2s as `<h2 id="...`, which makes this
  // split predictable. If the renderer changes, update this pattern with it.
  const sections = html.split(/(?=<h2 id=)/);

  // Only long enough articles earn an in-body ad. Below this the reader would
  // hit it before they'd got anything out of the page.
  const midIndex = sections.length >= 5 ? Math.floor(sections.length / 2) : -1;

  return (
    <div id={CONTAINER_ID} className="prose-article">
      {sections.map((section, index) => (
        <div key={index}>
          <div dangerouslySetInnerHTML={{ __html: section }} />
          {index === midIndex ? <AdSlot placement="mid-article" /> : null}
        </div>
      ))}

      <ArticleInteractions containerId={CONTAINER_ID} />
    </div>
  );
}
