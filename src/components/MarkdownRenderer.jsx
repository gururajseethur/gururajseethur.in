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
      prose-headings:font-sans prose-headings:text-white prose-headings:font-semibold
      prose-p:text-white/50 prose-p:leading-relaxed
      prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300
      prose-strong:text-white/70
      prose-code:text-emerald-400 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
      prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-lg
      prose-ul:text-white/50 prose-ol:text-white/50
      prose-li:marker:text-white/20
      prose-blockquote:border-l-cyan-500/50 prose-blockquote:text-white/40
      prose-hr:border-white/10
      prose-img:rounded-lg prose-img:border prose-img:border-white/10"
    >
      <Markdown remarkPlugins={[remarkGfm]}>{content}</Markdown>
    </div>
  );
}
