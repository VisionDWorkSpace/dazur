import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://dazur.capital",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://dazur.capital/#value-section",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://dazur.capital/#what-we-do-section",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://dazur.capital/#stakeholders-section",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ]
}
