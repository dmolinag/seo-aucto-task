import { getAllProducts } from "@/lib/api";

const BASE_URL = "http://localhost:3000";

export async function GET() {
  const products = await getAllProducts({ next: { revalidate: 3600 } });

  const productLines = products
    .map((p) => {
      const availability = p.availability === "in_stock" ? "In stock" : "Out of stock";
      return `- [${p.name}](${BASE_URL}/products/${p.slug}): ${p.description} $${p.price.toFixed(2)}. ${availability}.`;
    })
    .join("\n");

  const body = `# Kitchen Gadgets Store

A catalog of high-quality kitchen gadgets including smart thermometers and milk frothers.

## Products

${productLines}

## Site

- Homepage: ${BASE_URL}
- Sitemap: ${BASE_URL}/sitemap.xml
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
