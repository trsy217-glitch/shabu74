import type { MetadataRoute } from "next";
import { menu, SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(menu.updatedAt);
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified, changeFrequency: "monthly", priority: 0.9 },
  ];
}
