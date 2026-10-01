import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { SITE } from "@/lib/site";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, posts] = await Promise.all([
    prisma.product.findMany({ select: { slug: true, createdAt: true } }),
    prisma.post.findMany({ select: { slug: true, publishedAt: true } }),
  ]);
  const base = ["", "/products", "/blog", "/contact"].map((p) => ({ url: `${SITE.url}${p}` }));
  return [
    ...base,
    ...products.map((p) => ({ url: `${SITE.url}/products/${p.slug}`, lastModified: p.createdAt })),
    ...posts.map((p) => ({ url: `${SITE.url}/blog/${p.slug}`, lastModified: p.publishedAt })),
  ];
}
