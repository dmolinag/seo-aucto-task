# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm i          # install dependencies
npm run dev    # start dev server at http://localhost:3000
npm run build  # production build
npm run lint   # run ESLint
```

There are no tests in this project.

## Architecture

This is a **Next.js 16 / React 19** app using the App Router with **Tailwind CSS v4** and **TypeScript**.

### Data flow

All product data originates from the in-memory catalog in `lib/products-data.ts` (`PRODUCTS` array with full `Product` type definitions). Two Route Handlers serve this data over HTTP with a simulated 300 ms delay:

- `GET /api/products` → `app/api/products/route.ts`
- `GET /api/products/[slug]` → `app/api/products/[slug]/route.ts`

Page components call `lib/api.ts` (`getAllProducts`, `getProduct`), which fetch from those route handlers. During `next build` — when no HTTP server is running — both functions catch `ECONNREFUSED` and fall back directly to the `PRODUCTS` array, so static prerendering works without a running server.

### Pages

- `app/page.tsx` — product listing, calls `getAllProducts()`
- `app/products/[slug]/page.tsx` — product detail, calls `getProduct(slug)`, returns `notFound()` for missing slugs

### Task goal

The primary task is to enhance `app/products/[slug]/page.tsx` for production SEO and performance:

- Add `generateMetadata` with Open Graph, Twitter tags, and canonical URL (use `http://localhost:3000` as base URL)
- Add JSON-LD structured data (`Product` schema)
- Replace `<img>` with `next/image`; add proper `alt` and sizing
- Use semantic HTML (`<article>`, proper heading hierarchy)
- Add fetch caching via `init` options passed to `getProduct` / `getAllProducts`
- Bonus: internal linking between related products (`product.relatedSlugs`), sitemap/robots

Images are served from `/public/images/` and referenced by relative path in product data.
