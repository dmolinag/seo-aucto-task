import type { MetadataRoute } from "next";

const BASE_URL = "http://localhost:3000";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      // Explicitly allow known AI crawlers for conversational search visibility
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "GoogleOther", allow: "/" },
      { userAgent: "cohere-ai", allow: "/" },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
