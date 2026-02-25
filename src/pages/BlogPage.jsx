import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useContent } from '../hooks/useContent';

export default function BlogPage() {
  const posts = useContent('blog');

  return (
    <div className="page-panel px-5 md:px-8 pt-24 md:pt-28 py-16 md:py-24">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Blog</div>
          <div className="accent-line mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3 tracking-tight">
            Blog
          </h1>
          <p className="text-sm text-fg-secondary mb-16 max-w-lg leading-relaxed">
            Writeups, walkthroughs, and technical notes. No filler.
          </p>
        </ScrollReveal>

        {posts.length === 0 && (
          <ScrollReveal>
            <div className="solid-card p-9 text-center">
              <p className="text-fg-secondary">No posts yet. Add content via the <a href="/admin/" className="text-accent hover:underline">/admin</a> panel.</p>
            </div>
          </ScrollReveal>
        )}

        <div className="space-y-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <Link to={`/blog/${post.slug}`} className="block group">
                <div className="solid-card p-7 md:p-9 transition-all duration-300 group-hover:border-edge">
                  {post.attributes.cover_image && (
                    <img
                      src={post.attributes.cover_image}
                      alt={post.attributes.title}
                      className="w-full h-48 object-cover rounded-lg mb-6 opacity-80"
                    />
                  )}
                  <span className="font-mono text-xs text-fg-muted uppercase tracking-widest font-medium">
                    {post.attributes.date
                      ? new Date(post.attributes.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <h2 className="text-xl md:text-2xl font-semibold text-fg mt-1 mb-3 group-hover:text-accent transition-colors">
                    {post.attributes.title}
                  </h2>
                  <p className="text-sm text-fg-secondary line-clamp-3">
                    {post.body.slice(0, 200).replace(/[#*>\-]/g, '').trim()}...
                  </p>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
