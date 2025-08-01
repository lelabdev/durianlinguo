import defaultBlog from "$lib/assets/default-blog.jpg?enhanced";

type EnhancedImgModule = { default: any };

export const blogCover: Record<string, EnhancedImgModule> = import.meta.glob(
  "/src/content/blog/img/*.jpg",
  {
    eager: true,
    query: { enhanced: true },
  },
);

export function getBlogImg(img: string) {
  const mod = blogCover[`/src/content/blog/img/${img}.jpg`];
  if (!mod) {
    console.warn("No image found for blog post", img);
  }
  return mod?.default ?? defaultBlog;
}
