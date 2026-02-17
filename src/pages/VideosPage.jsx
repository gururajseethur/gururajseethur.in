import React from 'react';
import ScrollReveal from '../components/ScrollReveal';
import { useContent } from '../hooks/useContent';

export default function VideosPage() {
  const videos = useContent('videos');

  return (
    <div className="px-5 md:px-8 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <ScrollReveal>
          <div className="accent-line mb-6" />
          <h1 className="font-sans text-4xl md:text-5xl font-bold text-white mb-3 tracking-tight">
            Videos
          </h1>
          <p className="font-sans text-lg text-white/35 mb-16 max-w-lg leading-relaxed">
            Walkthroughs, demos, and technical breakdowns.
          </p>
        </ScrollReveal>

        {videos.length === 0 && (
          <ScrollReveal>
            <div className="glass-card p-9 text-center">
              <p className="font-sans text-white/30">No videos yet. Add them via the <a href="/admin/" className="text-cyan-400 hover:text-cyan-300">/admin</a> panel.</p>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {videos.map((video, i) => (
            <ScrollReveal key={video.slug} delay={i * 100}>
              <div className="glass-card overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
                {/* YouTube Embed */}
                {video.attributes.youtube_embed_link && (
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
                )}

                <div className="p-6 md:p-7">
                  <span className="font-sans text-xs text-white/25 uppercase tracking-widest font-medium">
                    {video.attributes.date
                      ? new Date(video.attributes.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : ''}
                  </span>
                  <h2 className="font-sans text-lg md:text-xl font-semibold text-white mt-1 mb-3">
                    {video.attributes.title}
                  </h2>
                  <p className="font-sans text-sm text-white/35 leading-relaxed">
                    {video.attributes.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </div>
  );
}
