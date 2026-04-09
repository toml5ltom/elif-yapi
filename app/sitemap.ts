import { MetadataRoute } from "next";
import { getProperties, getDistricts } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://elifyapi.com";
  const locales = ["ar", "tr", "en"];

  const staticPages = ["", "/properties", "/citizenship", "/services", "/about", "/contact"];

  const staticRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: page === "" ? "daily" : "weekly" as const,
      priority: page === "" ? 1 : 0.8,
    }))
  );

  try {
    const { properties } = await getProperties({ limit: 100 });
    const propertyRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
      properties.map((p) => ({
        url: `${baseUrl}/${locale}/properties/${p.slug}`,
        lastModified: new Date(p.updated_at),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }))
    );
    return [...staticRoutes, ...propertyRoutes];
  } catch {
    return staticRoutes;
  }
}
