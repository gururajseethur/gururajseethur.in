export const seoConfig = {
  siteName: 'Gururaj Seethuru',
  siteUrl: 'https://gururajseethur.in',
  defaultTitle: 'Gururaj Seethuru — Cybersecurity & AI Systems Architect',
  titleTemplate: '%s | Gururaj Seethuru',
  defaultDescription:
    'Gururaj Seethuru is a cybersecurity engineer, local-first AI systems architect, and commercial filmmaker based in Bengaluru.',
  author: 'Gururaj Seethuru',
  locale: 'en_IN',
  twitterCard: 'summary_large_image',
  twitterCreator: '@Gururajseethur',
  routeDescriptions: {
    '/': 'Cybersecurity engineering, local-first AI systems, and narrative filmmaking by Gururaj Seethuru.',
    '/projects': 'Explore verified security automation platforms, zero-trust gateways, and sovereign AI pipelines by Gururaj Seethuru.',
    '/security': 'Certified Ethical Hacker (CEH) labs, empirical defense-in-depth evidence, and TryHackMe live stats by Gururaj Seethuru.',
    '/creative': 'Four years of commercial video editing, brand filmmaking, and motion graphics direction by Gururaj Seethuru.',
    '/videos': 'Selected video walkthroughs, commercial showreel, and technical explainers by Gururaj Seethuru.',
    '/blog': 'Engineering write-ups, home lab architectures, and technical dispatches by Gururaj Seethuru.',
    '/contact': 'Contact Gururaj Seethuru for cybersecurity, sovereign AI systems, and technical creative collaboration.',
  },
};

export const indexedRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/projects', changefreq: 'monthly', priority: '0.8' },
  { path: '/security', changefreq: 'monthly', priority: '0.8' },
  { path: '/creative', changefreq: 'monthly', priority: '0.7' },
  { path: '/videos', changefreq: 'monthly', priority: '0.6' },
  { path: '/blog', changefreq: 'weekly', priority: '0.7' },
  { path: '/contact', changefreq: 'yearly', priority: '0.5' },
];
