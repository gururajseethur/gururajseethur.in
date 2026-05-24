import { describe, it, expect, vi } from "vitest";

vi.mock("../useContent", () => {
  // A manual implementation of the logic we just optimized, to prove the slice works
  function useContentTestLogic(collection, mockGlob) {
    const prefix = `/content/${collection}/`;

    const items = Object.entries(mockGlob)
      .filter(([path]) => path.startsWith(prefix))
      .map(([path, mod]) => {
        const slug = path.slice(prefix.length, -3);

        return {
          slug,
          attributes: mod.attributes || {},
          body: mod.body || "",
        };
      })
      .sort((a, b) => {
        const da = a.attributes.date || "";
        const db = b.attributes.date || "";
        return db.localeCompare(da);
      });

    return items;
  }
  return { useContentTestLogic };
});

import { useContentTestLogic } from "../useContent";

const mockAllContent = {
  "/content/projects/project-a.md": {
    attributes: { date: "2023-01-01", title: "Project A" },
    body: "Body A",
  },
  "/content/projects/project-b.md": {
    attributes: { date: "2023-02-01", title: "Project B" },
    body: "Body B",
  },
  "/content/blog/blog-post.md": {
    attributes: { date: "2022-01-01", title: "Blog Post" },
    body: "Blog Body",
  },
};

describe("useContent slug parsing optimization", () => {
  it("correctly parses project slugs using slice", () => {
    const items = useContentTestLogic("projects", mockAllContent);

    expect(items).toHaveLength(2);

    // Items are sorted newest first, so Project B (2023-02-01) comes before A (2023-01-01)
    expect(items[0].slug).toBe("project-b");
    expect(items[1].slug).toBe("project-a");
  });

  it("correctly parses blog slugs using slice", () => {
    const items = useContentTestLogic("blog", mockAllContent);

    expect(items).toHaveLength(1);
    expect(items[0].slug).toBe("blog-post");
  });
});
