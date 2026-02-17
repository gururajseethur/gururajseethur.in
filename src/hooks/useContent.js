/**
 * useContent — loads markdown files from /content via Vite's import.meta.glob.
 *
 * Returns an array of { slug, attributes, body } sorted by date (newest first).
 * The glob is eagerly resolved at build time — zero runtime fetches.
 */

// Eager-load all .md files from /content at build time
const allContent = import.meta.glob('/content/**/*.md', { eager: true });

/**
 * @param {'projects' | 'blog' | 'videos'} collection — content subfolder
 * @returns {{ slug: string, attributes: object, body: string }[]}
 */
export function useContent(collection) {
  const prefix = `/content/${collection}/`;

  const items = Object.entries(allContent)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, mod]) => {
      const slug = path
        .replace(prefix, '')
        .replace(/\.md$/, '');

      return {
        slug,
        attributes: mod.attributes || {},
        body: mod.body || '',
      };
    })
    .sort((a, b) => {
      const da = a.attributes.date || '';
      const db = b.attributes.date || '';
      return db.localeCompare(da);
    });

  return items;
}

/**
 * Get a single content item by collection + slug.
 */
export function useContentItem(collection, slug) {
  const items = useContent(collection);
  return items.find((item) => item.slug === slug) || null;
}
