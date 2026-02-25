import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="page-panel min-h-screen flex items-center justify-center px-5 md:px-8">
      <div className="max-w-md text-center">
        <div className="font-mono text-8xl font-bold text-accent mb-4 tracking-tighter">404</div>
        <h1 className="text-2xl font-bold text-fg mb-3">Page Not Found</h1>
        <p className="text-sm text-fg-secondary mb-8 leading-relaxed">
          The page you're looking for doesn't exist or has been moved.
          Unlike a CTF flag, this one's not hidden — it's just not here.
        </p>
        <div className="solid-card p-5 mb-8 text-left">
          <pre className="font-mono text-xs text-fg-secondary leading-relaxed">
{`$ curl -I gururajseethur.in${window?.location?.pathname || '/unknown'}
HTTP/1.1 404 Not Found
X-Powered-By: curiosity
X-Suggestion: try /`}
          </pre>
        </div>
        <Link to="/" className="btn-primary">
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
