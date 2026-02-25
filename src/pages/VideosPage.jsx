import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useContent } from '../hooks/useContent';

const YOUTUBE_REDIRECT_PATH = '/youtube';

export default function VideosPage() {
  const videos = useContent('videos');

  return (
    <div className="page-panel px-5 md:px-8 pt-24 md:pt-28 py-16 md:py-24">
      <div className="max-w-content mx-auto">
        <ScrollReveal>
          <div className="section-label">Videos</div>
          <div className="accent-line mb-6" />
          <h1 className="text-3xl md:text-4xl font-bold text-fg mb-3 tracking-tight">
            Videos
          </h1>
          <p className="text-sm text-fg-secondary mb-16 max-w-lg leading-relaxed">
            Technical walkthroughs, client edits, and security explainers. Public samples + private portfolio workflow.
          </p>

          <div className="flex flex-wrap gap-3 mb-12">
            <a
              href={YOUTUBE_REDIRECT_PATH}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Open YouTube Channel →
            </a>
            <a
              href="mailto:gururajseethur@gmail.com?subject=Private%20Video%20Portfolio%20Request"
              className="btn-secondary"
            >
              Request Private Reel
            </a>
          </div>
        </ScrollReveal>

        {videos.length === 0 && (
          <ScrollReveal>
            <div className="solid-card p-9 text-center">
              <p className="text-fg-secondary">No videos yet. Add them via the <a href="/admin/" className="text-accent hover:underline">/admin</a> panel.</p>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <ScrollReveal key={video.slug} delay={i * 100}>
              <div className="solid-card overflow-hidden">
                {video.attributes.access_type === 'private' ? (
                  <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <div className="absolute inset-0 bg-base flex items-center justify-center">
                      <div className="text-center px-6">
                        <div className="text-3xl mb-3">🔒</div>
                        <div className="font-mono text-xs text-accent uppercase tracking-widest mb-2">Private Work Sample</div>
                        <p className="text-xs text-fg-secondary max-w-xs mx-auto">
                          {video.attributes.private_preview_note || 'This video is private. Access is shared on request for recruiters and collaborators.'}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  video.attributes.youtube_embed_link && (
                    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                      <iframe
                        src={video.attributes.youtube_embed_link}
                        title={video.attributes.title}
                        className="absolute inset-0 w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )
                )}

                <div className="p-6 md:p-7">
                  <span className="font-mono text-xs text-fg-muted uppercase tracking-widest font-medium">
                    {video.attributes.date
                      ? new Date(video.attributes.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <h2 className="text-lg md:text-xl font-semibold text-fg mt-1 mb-3">
                    {video.attributes.title}
                  </h2>

                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className={`font-mono text-[10px] px-2.5 py-1 rounded border ${video.attributes.access_type === 'private' ? 'border-danger/30 text-danger' : 'border-accent/30 text-accent'}`}>
                      {video.attributes.access_type === 'private' ? 'PRIVATE' : 'PUBLIC'}
                    </span>
                    {video.attributes.client_or_project && (
                      <span className="font-mono text-[10px] px-2.5 py-1 rounded border border-edge text-fg-muted">
                        {video.attributes.client_or_project}
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-fg-secondary leading-relaxed">
                    {video.attributes.description}
                  </p>

                  {(video.attributes.role || video.attributes.outcome) && (
                    <div className="mt-4 space-y-1 text-xs text-fg-muted">
                      {video.attributes.role && <p><span className="text-fg-secondary">Role:</span> {video.attributes.role}</p>}
                      {video.attributes.outcome && <p><span className="text-fg-secondary">Outcome:</span> {video.attributes.outcome}</p>}
                    </div>
                  )}

                  {video.attributes.tools_used?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {video.attributes.tools_used.map((tool) => {
                        const value = typeof tool === 'string' ? tool : tool.tool;
                        return (
                        <span key={value} className="font-mono text-[10px] px-2 py-1 rounded border border-edge text-fg-muted">
                          {value}
                        </span>
                      );})}
                    </div>
                  )}

                  {video.attributes.access_type === 'private' && (
                    <a
                      href="mailto:gururajseethur@gmail.com?subject=Private%20Video%20Access%20Request"
                      className="inline-flex mt-4 text-accent hover:underline font-mono text-xs"
                    >
                      Request access to this sample →
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
