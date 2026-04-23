import { PRODUCTS } from "./products-data";
import type { Product } from "./products-data";

export type {
  Product,
  ProductFeature,
  ProductSpec,
  Review,
} from "./products-data";

/**
 * Base URL for server-side `fetch` to this app's Route Handlers.
 */
function getApiOrigin(): string {
  return "http://127.0.0.1:3000";
}

/**
 * Fetches all products from `GET /api/products`.
 * Pass `init` (e.g. `{ next: { revalidate: 60 } }`) to control Next.js fetch caching / ISR.
 *
 * During `next build` there is no HTTP server, so the request may fail; we then fall back to the
 * same catalog the Route Handlers use (`lib/products-data`).
 */
export async function getAllProducts(init?: RequestInit): Promise<Product[]> {
  try {
    const res = await fetch(`${getApiOrigin()}/api/products`, {
      ...init,
    });
    if (res.ok) return res.json() as Promise<Product[]>;
  } catch {
    /* e.g. ECONNREFUSED while prerendering */
  }
  return [...PRODUCTS];
}

/**
 * Fetches one product from `GET /api/products/[slug]`.
 * Pass `init` (e.g. `{ next: { revalidate: 60 } }`) to control Next.js fetch caching / ISR.
 *
 * If the HTTP request is unavailable (e.g. during prerender), resolves from the shared catalog.
 */
export async function getProduct(
  slug: string,
  init?: RequestInit,
): Promise<Product | null> {
  try {
    const res = await fetch(
      `${getApiOrigin()}/api/products/${encodeURIComponent(slug)}`,
      { ...init },
    );
    if (res.ok) return res.json() as Promise<Product>;
    if (res.status === 404) {
      return PRODUCTS.find((p) => p.slug === slug) ?? null;
    }
  } catch {
    /* e.g. ECONNREFUSED while prerendering */
  }
  return PRODUCTS.find((p) => p.slug === slug) ?? null;
}
