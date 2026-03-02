import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useContent } from '../hooks/useContent';
import useScrollReveal from '../hooks/useScrollReveal';

export default function BlogPage() {
  const { posts, loading } = useContent('blog');
  const sectionRef = useScrollReveal();

  return (
    <div ref={sectionRef} style={{ minHeight: '100vh', padding: '120px max(48px, 5vw)' }}>
      <div className="max-w-content mx-auto">

        {/* Header */}
        <div style={{ marginBottom: 72 }}>
          <div data-reveal style={{
            display: 'inline-block',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555',
            border: '1px solid #1C1C24', padding: '4px 12px', borderRadius: 99,
            marginBottom: 24,
          }}>
            // BLOG
          </div>
          <h1 data-reveal data-delay="100" style={{
            fontFamily: 'var(--font-display)', fontWeight: 700,
            fontSize: 'clamp(40px,6vw,64px)', color: '#FFFFFF',
            letterSpacing: '-0.03em', lineHeight: 1.1, margin: 0,
          }}>
            Writing.
          </h1>
        </div>

        {loading ? (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: '#555' }}>
            Loading...
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
            {(posts || []).map((post, i) => (
              <BlogCard key={post.slug || i} post={post} index={i} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlogCard({ post, index }) {
  const [hov, setHov] = useState(false);

  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      data-reveal
      data-delay={`${(index % 2) * 100}`}
      style={{
        background: '#0E0E12',
        border: `1px solid ${hov ? '#2A2A34' : '#1C1C24'}`,
        borderRadius: 16, padding: 32,
        transform: hov ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
        display: 'flex', flexDirection: 'column', gap: 12,
      }}
    >
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#555' }}>
        {post.date || ''}
      </div>
      <h2 style={{
        fontFamily: 'var(--font-sans)', fontWeight: 700, fontSize: 22,
        color: '#FFFFFF', margin: 0, lineHeight: 1.3,
      }}>
        {post.title}
      </h2>
      <p style={{
        fontSize: 15, color: '#666', lineHeight: 1.7, margin: 0, flex: 1,
        display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
      }}>
        {post.description || post.excerpt || ''}
      </p>
      <Link
        to={`/blog/${post.slug}`}
        style={{
          fontFamily: 'var(--font-mono)', fontSize: 13,
          color: hov ? '#FFFFFF' : '#555',
          textDecoration: 'none', transition: 'color 0.2s',
        }}
      >
        Read More →
      </Link>
    </div>
  );
}
