export const seoConfig = {
  siteName: 'Gururaj Seethur',
  siteUrl: 'https://gururajseethur.in',
  defaultTitle: 'Gururaj Seethur - Filmmaker & Ethical Hacker | Bengaluru',
  titleTemplate: '%s | Gururaj Seethur',
  defaultDescription:
    'Gururaj Seethur is a filmmaker, video editor, ethical hacker, and AI builder based in Bengaluru.',
  author: 'Gururaj Seethur',
  locale: 'en_IN',
  twitterCard: 'summary_large_image',
  twitterCreator: '@Gururajseethur',
  routeDescriptions: {
    '/': 'Gururaj Seethur is a filmmaker, video editor, ethical hacker, and AI builder based in Bengaluru.',
    '/projects': 'Explore technical projects, pentest tools, AI systems, and creative work by Gururaj Seethur.',
    '/security': 'Security lab, TryHackMe progress, CTF practice, and ethical hacking work by Gururaj Seethur.',
    '/creative': 'Creative direction, filmmaking, editing, and visual storytelling work by Gururaj Seethur.',
    '/videos': 'Selected video, filmmaking, and post-production work by Gururaj Seethur.',
    '/contact': 'Contact Gururaj Seethur for security, AI, creative, and technical collaboration.',
  },
};

export const indexedRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/security', changefreq: 'monthly', priority: '0.7' },
  { path: '/creative', changefreq: 'monthly', priority: '0.7' },
  { path: '/videos', changefreq: 'monthly', priority: '0.6' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
];
