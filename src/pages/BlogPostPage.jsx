import React from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useContentItem } from '../hooks/useContent';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = useContentItem('blog', slug);

  if (!post) {
    return (
      <div className="px-5 md:px-8 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-sans text-3xl font-bold text-white mb-4">Post not found</h1>
          <Link to="/blog" className="text-cyan-400 hover:text-cyan-300 font-sans text-sm">
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { attributes, body } = post;

  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <ScrollReveal>
          <Link to="/blog" className="font-sans text-xs text-white/25 hover:text-cyan-400 transition-colors uppercase tracking-widest mb-8 inline-block">
            ← Back to Blog
          </Link>

          {attributes.cover_image && (
            <img
              src={attributes.cover_image}
              alt={attributes.title}
              className="w-full h-64 md:h-80 object-cover rounded-lg mb-8 opacity-80"
            />
          )}

          <div className="accent-line mb-6" />

          <span className="font-sans text-xs text-white/25 uppercase tracking-widest font-medium">
            {attributes.date
              ? new Date(attributes.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })
              : ''}
          </span>

          <h1 className="font-sans text-3xl md:text-4xl font-bold text-white mt-2 mb-10 tracking-tight">
            {attributes.title}
          </h1>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-card p-7 md:p-10">
            <MarkdownRenderer content={body} />
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}
