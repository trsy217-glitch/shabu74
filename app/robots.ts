import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

/** Plan: "robots.txt로 막지 않기" — allow every crawler (Naver Yeti, Googlebot, …). */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
