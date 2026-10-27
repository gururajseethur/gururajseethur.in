import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useContentItem } from '../hooks/useContent';
import useSEO from '../hooks/useSEO';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = useContentItem('blog', slug);

  useSEO({
    title: post ? post.attributes?.title : 'Post Not Found',
    description: post ? post.attributes?.title : 'Engineering log article',
  });

  if (!post) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="glass-panel p-12 text-center max-w-md">
          <div className="font-mono text-4xl font-bold text-cobalt mb-3">404</div>
          <h1 className="font-display text-xl font-bold text-text-primary mb-4">
            Engineering Log Not Found
          </h1>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 font-mono text-xs text-cyan hover:underline"
          >
            ← Return to Engineering Logs
          </Link>
        </div>
      </div>
    );
  }

  const { attributes, body } = post;
  const dateStr = attributes.date
    ? new Date(attributes.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <div className="relative min-h-screen px-6 py-16 md:px-12">
      <article className="max-w-3xl mx-auto">
        {/* Back Link */}
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 font-mono text-xs text-text-muted hover:text-cyan transition-colors mb-10"
        >
          <span>← BACK TO ENGINEERING LOGS</span>
        </Link>

        {/* Post Header */}
        <header className="mb-12 border-b border-border-subtle pb-8">
          <div className="flex items-center gap-3 font-mono text-xs text-cyan mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan" />
            <span>DISPATCH // {dateStr}</span>
          </div>

          <h1 className="font-display text-3xl md:text-5xl font-bold text-text-primary leading-tight">
            {attributes.title}
          </h1>

          <div className="mt-4 flex items-center gap-4 font-mono text-xs text-text-muted">
            <span>BY GURURAJ SEETHURU</span>
            <span>·</span>
            <span>CYBERSECURITY & AI INFRASTRUCTURE</span>
          </div>
        </header>

        {/* Cover Image */}
        {attributes.cover_image && (
          <div className="mb-10 rounded-xl overflow-hidden border border-border">
            <img
              src={attributes.cover_image}
              alt={attributes.title}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Markdown Body */}
        <div className="glass-panel p-8 md:p-12 border-border/60">
          <MarkdownRenderer content={body} />
        </div>

        {/* Post Footer */}
        <div className="mt-12 pt-8 border-t border-border-subtle flex items-center justify-between font-mono text-xs">
          <Link to="/blog" className="text-cyan hover:underline">
            ← Previous Logs
          </Link>
          <Link to="/contact" className="text-text-muted hover:text-white">
            Discuss this Architecture →
          </Link>
        </div>
      </article>
    </div>
  );
}
