import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

/**
 * Renders a markdown string inside the existing design system.
 * Applies clean typographic styles to the rendered HTML.
 */
export default function MarkdownRenderer({ content }) {
  if (!content) return null;

  return (
    <div className="prose prose-invert prose-sm md:prose-base max-w-none
      prose-headings:font-sans prose-headings:text-fg prose-headings:font-semibold
      prose-p:text-fg-secondary prose-p:leading-relaxed
      prose-a:text-accent prose-a:no-underline hover:prose-a:underline
      prose-strong:text-fg
      prose-code:text-accent prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-surface prose-pre:border prose-pre:border-edge-subtle prose-pre:rounded-lg
      prose-ul:text-fg-secondary prose-ol:text-fg-secondary
      prose-li:marker:text-fg-muted
      prose-blockquote:border-l-accent/50 prose-blockquote:text-fg-secondary
      prose-hr:border-edge-subtle
      prose-img:rounded-lg prose-img:border prose-img:border-edge-subtle"
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
