/**
 * Vite plugin — transforms .md files into JS modules with parsed frontmatter + raw body.
 * Keeps the build pipeline simple: no runtime YAML parsing needed.
 */
export default function markdownPlugin() {
  return {
    name: 'vite-plugin-markdown',
    transform(src, id) {
      if (!id.endsWith('.md')) return null;

      // Split frontmatter (between --- delimiters) from body
      const match = src.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
      if (!match) {
        return {
          code: `export const attributes = {};\nexport const body = ${JSON.stringify(src)};\nexport default { attributes, body };`,
          map: null,
        };
      }

      const [, frontmatterRaw, body] = match;

      // Minimal YAML parser — handles strings, lists, dates, booleans
      const attributes = {};
      let currentKey = null;
      let inList = false;

      for (const line of frontmatterRaw.split('\n')) {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;

        // List item
        if (trimmed.startsWith('- ') && currentKey && inList) {
          let val = trimmed.slice(2).trim();
          val = val.replace(/^["']|["']$/g, '');
          attributes[currentKey].push(val);
          continue;
        }

        // Key: value pair
        const kvMatch = trimmed.match(/^([a-zA-Z_][a-zA-Z0-9_]*):\s*(.*)$/);
        if (kvMatch) {
          const [, key, rawVal] = kvMatch;
          const val = rawVal.trim();

          if (val === '' || val === '[]') {
            // Could be start of a list or empty value
            attributes[key] = [];
            currentKey = key;
            inList = true;
            continue;
          }

          inList = false;
          currentKey = key;

          // Clean quotes
          let cleaned = val.replace(/^["']|["']$/g, '');

          // Booleans
          if (cleaned === 'true') cleaned = true;
          else if (cleaned === 'false') cleaned = false;

          attributes[key] = cleaned;
        }
      }

      return {
        code: `export const attributes = ${JSON.stringify(attributes)};\nexport const body = ${JSON.stringify(body)};\nexport default { attributes, body };`,
        map: null,
      };
    },
  };
}
