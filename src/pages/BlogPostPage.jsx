import React from 'react';
import { useParams, Link } from 'react-router-dom';
import MarkdownRenderer from '../components/MarkdownRenderer';
import { useContentItem } from '../hooks/useContent';

export default function BlogPostPage() {
  const { slug } = useParams();
  const post = useContentItem('blog', slug);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#070709', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 max(32px, 5vw)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 64, color: '#1C1C24', marginBottom: 16 }}>404</div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 24, color: '#FFFFFF', marginBottom: 16 }}>Post not found</h1>
          <Link to='/blog' style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: '#00D9FF', textDecoration: 'none' }}>
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const { attributes, body } = post;

  return (
    <div style={{ minHeight: '100vh', background: '#070709', paddingTop: 96, paddingBottom: 96 }}>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 max(32px, 4vw)' }}>

        <Link
          to='/blog'
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.12em',
            color: '#50505A', textDecoration: 'none', textTransform: 'uppercase',
            display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 48,
            transition: 'color 0.2s',
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
          onMouseLeave={e => e.currentTarget.style.color = '#50505A'}
        >
          ← BLOG
        </Link>

        {attributes.cover_image && (
          <img
            src={attributes.cover_image}
            alt={attributes.title}
            style={{
              width: '100%', height: 320, objectFit: 'cover',
              borderRadius: 12, marginBottom: 40, opacity: 0.85,
              border: '1px solid #1C1C24',
            }}
          />
        )}

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 32, height: 2, background: '#00D9FF' }} />
          {attributes.date && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#50505A', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              {new Date(attributes.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          {attributes.tags?.length > 0 && attributes.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', padding: '2px 8px', borderRadius: 4, border: '1px solid #1C1C24', color: '#50505A' }}>
              {tag}
            </span>
          ))}
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 800,
          fontSize: 'clamp(28px, 5vw, 48px)', color: '#FFFFFF',
          lineHeight: 1.1, letterSpacing: '-0.02em', margin: '0 0 40px',
        }}>
          {attributes.title}
        </h1>

        <div style={{ background: '#0E0E12', borderRadius: 12, border: '1px solid #1C1C24', padding: 'clamp(28px, 5vw, 48px)' }}>
          <MarkdownRenderer content={body} />
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid #1C1C24', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to='/blog'
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#50505A', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#50505A'}
          >
            ← ALL POSTS
          </Link>
          <Link
            to='/contact'
            style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00D9FF', textDecoration: 'none', letterSpacing: '0.1em', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#FFFFFF'}
            onMouseLeave={e => e.currentTarget.style.color = '#00D9FF'}
          >
            GET IN TOUCH →
          </Link>
        </div>
      </div>
    </div>
  );
}
