import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/api";

const BASE_URL = "http://localhost:3000";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const products = await getAllProducts({ next: { revalidate: 3600 } });

  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/products/${p.slug}`,
    lastModified: new Date(p.updatedAt ?? p.createdAt),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...productEntries,
  ];
}
