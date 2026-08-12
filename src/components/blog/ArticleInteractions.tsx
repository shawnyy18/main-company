"use client";

import { useEffect } from "react";

/**
 * The only client-side JavaScript inside an article body.
 *
 * Code blocks are rendered to static HTML on the server, so instead of
 * hydrating one component per block this attaches a single delegated click
 * listener that copies the nearest <pre> to the clipboard.
 */
export default function ArticleInteractions({
  containerId,
}: {
  containerId: string;
}) {
  useEffect(() => {
    const container = document.getElementById(containerId);
    if (!container) return;

    const timers = new Set<ReturnType<typeof setTimeout>>();

    async function handleClick(event: MouseEvent) {
      const target = event.target as HTMLElement | null;
      const button = target?.closest<HTMLButtonElement>("[data-copy-code]");
      if (!button) return;

      const code = button.closest(".code-block")?.querySelector("code");
      if (!code?.textContent) return;

      const label = button.querySelector("[data-copy-label]");

      try {
        await navigator.clipboard.writeText(code.textContent);
        if (label) label.textContent = "Copied";
        button.dataset.copied = "true";
      } catch {
        if (label) label.textContent = "Press Ctrl+C";
      }

      const timer = setTimeout(() => {
        if (label) label.textContent = "Copy";
        delete button.dataset.copied;
        timers.delete(timer);
      }, 2000);
      timers.add(timer);
    }

    container.addEventListener("click", handleClick);
    return () => {
      container.removeEventListener("click", handleClick);
      timers.forEach(clearTimeout);
    };
  }, [containerId]);

  return null;
}
