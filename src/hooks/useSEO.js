import { useEffect } from 'react';
import { seoConfig } from '../config/seoConfig';

function normalizePath(pathname) {
  if (!pathname || pathname === '/') return '/';
  return pathname.replace(/\/+$/, '');
}

function absoluteUrl(pathname) {
  const normalizedPath = normalizePath(pathname);
  return normalizedPath === '/'
    ? `${seoConfig.siteUrl}/`
    : `${seoConfig.siteUrl}${normalizedPath}`;
}

function resolveTitle(title) {
  if (!title || title === 'Home') return seoConfig.defaultTitle;
  return seoConfig.titleTemplate.replace('%s', title);
}

function setMeta(selector, createAttrs, content) {
  if (!content) return;

  let tag = document.querySelector(selector);

  if (!tag) {
    tag = document.createElement('meta');
    Object.entries(createAttrs).forEach(([key, value]) => {
      tag.setAttribute(key, value);
    });
    document.head.appendChild(tag);
  }

  tag.setAttribute('content', content);
}

function setCanonical(url) {
  let tag = document.querySelector('link[rel="canonical"]');

  if (!tag) {
    tag = document.createElement('link');
    tag.setAttribute('rel', 'canonical');
    document.head.appendChild(tag);
  }

  tag.setAttribute('href', url);
}

export default function useSEO({ title, description } = {}) {
  useEffect(() => {
    const pathname = normalizePath(window.location.pathname);
    const canonicalUrl = absoluteUrl(pathname);
    const fullTitle = resolveTitle(title);
    const resolvedDescription =
      description ||
      seoConfig.routeDescriptions[pathname] ||
      seoConfig.defaultDescription;

    document.title = fullTitle;
    setCanonical(canonicalUrl);

    setMeta('meta[name="title"]', { name: 'title' }, fullTitle);
    setMeta('meta[name="description"]', { name: 'description' }, resolvedDescription);
    setMeta('meta[name="author"]', { name: 'author' }, seoConfig.author);

    setMeta('meta[property="og:type"]', { property: 'og:type' }, 'website');
    setMeta('meta[property="og:site_name"]', { property: 'og:site_name' }, seoConfig.siteName);
    setMeta('meta[property="og:locale"]', { property: 'og:locale' }, seoConfig.locale);
    setMeta('meta[property="og:title"]', { property: 'og:title' }, fullTitle);
    setMeta('meta[property="og:description"]', { property: 'og:description' }, resolvedDescription);
    setMeta('meta[property="og:url"]', { property: 'og:url' }, canonicalUrl);

    setMeta('meta[name="twitter:card"]', { name: 'twitter:card' }, seoConfig.twitterCard);
    setMeta('meta[name="twitter:creator"]', { name: 'twitter:creator' }, seoConfig.twitterCreator);
    setMeta('meta[name="twitter:title"]', { name: 'twitter:title' }, fullTitle);
    setMeta('meta[name="twitter:description"]', { name: 'twitter:description' }, resolvedDescription);
    setMeta('meta[name="twitter:url"]', { name: 'twitter:url' }, canonicalUrl);
  }, [title, description]);
}
