import React from 'react';
import { useContent } from '../hooks/useContent';

export default function VideosPage() {
  const videos = useContent('videos');

  const pill = (text, active = false) => ({
    fontFamily: 'var(--font-mono)',
    fontSize: 10,
    letterSpacing: '0.08em',
    padding: '3px 10px',
    borderRadius: 4,
    border: `1px solid ${active ? '#FF3B3B' : '#1C1C24'}`,
    color: active ? '#FF3B3B' : '#50505A',
    display: 'inline-block',
  });

  return (
    <div style={{ minHeight: '100vh', background: '#070709', paddingTop: 96, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 max(32px, 4vw)' }}>

        {/* Header */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: '#50505A', letterSpacing: '0.12em', marginBottom: 16 }}>
            // CREATIVE WORK / VIDEO
          </div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: 'clamp(36px, 6vw, 64px)', color: '#FFFFFF', lineHeight: 1.05, letterSpacing: '-0.03em', margin: 0 }}>
            Video<span style={{ color: '#FF3B3B' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', color: '#50505A', maxWidth: 480, marginTop: 16, lineHeight: 1.7 }}>
            Technical walkthroughs, client edits, and security explainers. Public samples + private portfolio workflow.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
            <a
              href="/youtube"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                textDecoration: 'none', padding: '10px 22px', borderRadius: 6,
                background: '#FF3B3B', color: '#FFFFFF', display: 'inline-block',
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = '0.85'}
              onMouseLeave={e => e.currentTarget.style.opacity = '1'}
            >
              YOUTUBE CHANNEL →
            </a>
            <a
              href="mailto:gururajseethur@gmail.com?subject=Private%20Video%20Portfolio%20Request"
              style={{
                fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em',
                textDecoration: 'none', padding: '10px 22px', borderRadius: 6,
                border: '1px solid #1C1C24', color: '#FFFFFF', display: 'inline-block',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FFFFFF'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C24'}
            >
              REQUEST PRIVATE REEL
            </a>
          </div>
        </div>

        {/* Empty state */}
        {videos.length === 0 && (
          <div style={{ border: '1px solid #1C1C24', borderRadius: 12, padding: 48, textAlign: 'center' }}>
            <p style={{ fontFamily: 'var(--font-sans)', color: '#50505A' }}>
              No videos yet. Add them via the{' '}
              <a href="/admin/" style={{ color: '#00D9FF', textDecoration: 'none' }}>/admin</a> panel.
            </p>
          </div>
        )}

        {/* Video grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 24 }}>
          {videos.map((video) => (
            <div
              key={video.slug}
              style={{
                border: '1px solid #1C1C24', borderRadius: 12,
                background: '#0E0E12', overflow: 'hidden',
                transition: 'border-color 0.25s',
              }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#FF3B3B'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#1C1C24'}
            >
              {/* Video embed or private */}
              {video.attributes.access_type === 'private' ? (
                <div style={{ paddingBottom: '56.25%', position: 'relative', background: '#0A0A0E' }}>
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 8 }}>
                    <div style={{ fontSize: 32 }}>🔒</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#FF3B3B', letterSpacing: '0.12em' }}>PRIVATE WORK SAMPLE</div>
                    <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#50505A', maxWidth: 260, textAlign: 'center', lineHeight: 1.6 }}>
                      {video.attributes.private_preview_note || 'Access shared on request for recruiters and collaborators.'}
                    </p>
                  </div>
                </div>
              ) : video.attributes.youtube_embed_link ? (
                <div style={{ paddingBottom: '56.25%', position: 'relative' }}>
                  <iframe
                    src={video.attributes.youtube_embed_link}
                    title={video.attributes.title}
                    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {/* Card body */}
              <div style={{ padding: '24px 28px 28px' }}>
                <div style={{ display: 'flex', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
                  <span style={pill(video.attributes.access_type, video.attributes.access_type === 'private')}>
                    {video.attributes.access_type === 'private' ? 'PRIVATE' : 'PUBLIC'}
                  </span>
                  {video.attributes.client_or_project && (
                    <span style={pill(video.attributes.client_or_project)}>
                      {video.attributes.client_or_project}
                    </span>
                  )}
                </div>

                {video.attributes.date && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#333', marginBottom: 6, letterSpacing: '0.08em' }}>
                    {new Date(video.attributes.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                )}

                <h2 style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 20, color: '#FFFFFF', margin: '0 0 10px', lineHeight: 1.3 }}>
                  {video.attributes.title}
                </h2>
                <p style={{ fontFamily: 'var(--font-sans)', fontSize: 14, color: '#50505A', lineHeight: 1.7, margin: 0 }}>
                  {video.attributes.description}
                </p>

                {(video.attributes.role || video.attributes.outcome) && (
                  <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {video.attributes.role && (
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#50505A', margin: 0 }}>
                        <span style={{ color: '#B0B0C0' }}>Role:</span> {video.attributes.role}
                      </p>
                    )}
                    {video.attributes.outcome && (
                      <p style={{ fontFamily: 'var(--font-sans)', fontSize: 12, color: '#50505A', margin: 0 }}>
                        <span style={{ color: '#B0B0C0' }}>Outcome:</span> {video.attributes.outcome}
                      </p>
                    )}
                  </div>
                )}

                {video.attributes.tools_used?.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
                    {video.attributes.tools_used.map(tool => {
                      const value = typeof tool === 'string' ? tool : tool.tool;
                      return <span key={value} style={pill(value)}>{value}</span>;
                    })}
                  </div>
                )}

                {video.attributes.access_type === 'private' && (
                  <a
                    href="mailto:gururajseethur@gmail.com?subject=Private%20Video%20Access%20Request"
                    style={{ marginTop: 16, display: 'inline-block', fontFamily: 'var(--font-mono)', fontSize: 11, color: '#00D9FF', textDecoration: 'none' }}
                  >
                    Request access →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
