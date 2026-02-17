import React from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { useContent } from '../hooks/useContent';

export default function BlogPage() {
  const posts = useContent('blog');

  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Blog
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            Writeups, walkthroughs, and technical notes. No filler.
          </p>
        </ScrollReveal>

        {posts.length === 0 && (
          <ScrollReveal>
            <div className="glass-card p-9 text-center">
              <p className="font-sans text-white/30">No posts yet. Add content via the <a href="/admin/" className="text-cyan-400 hover:text-cyan-300">/admin</a> panel.</p>
            </div>
          </ScrollReveal>
        )}

        <div className="space-y-6">
          {posts.map((post, i) => (
            <ScrollReveal key={post.slug} delay={i * 100}>
              <Link to={`/blog/${post.slug}`} className="block group">
                <div className="glass-card p-7 md:p-9 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 transition-all duration-300 group-hover:border-white/20">
                  {post.attributes.cover_image && (
                    <img
                      src={post.attributes.cover_image}
                      alt={post.attributes.title}
                      className="w-full h-48 object-cover rounded-lg mb-6 opacity-80"
                    />
                  )}
                  <span className="font-sans text-xs text-white/25 uppercase tracking-widest font-medium">
                    {post.attributes.date
                      ? new Date(post.attributes.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <h2 className="font-sans text-xl md:text-2xl font-semibold text-white mt-1 mb-3 group-hover:text-cyan-400 transition-colors">
                    {post.attributes.title}
                  </h2>
                  <p className="font-sans text-sm text-white/35 line-clamp-3">
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
