# Next.js SEO Take-Home Test

## Objective

Enhance the `/products/[slug]` page to be production-ready with a strong focus on SEO and performance.

Run the following commands to get started

- `npm i`
- `npm run dev`

---

## Requirements

### SEO

- Implement dynamic metadata using `generateMetadata`
- Add Open Graph + Twitter tags
- Add canonical URL
- Include structured data (JSON-LD)

  **Note:** Canonical URLs, Open Graph images, and JSON-LD must use **absolute** URLs (including a scheme and host). In production that is typically `https://your-domain.com/...`. **For this take-home, using `http://localhost:3000/...` as the base URL is sufficient** for review; you do not need to deploy or configure a real domain.

### Performance

- Optimize data fetching (caching strategy)
- Replace `<img>` with `next/image`
- Provide proper alt text and sizing

### HTML

- Use semantic HTML (`article`, headings, etc.)

### Styling

- Modify the style and layout of the product page in any way you feel is an improvement.
- Consideration for Desktop vs Mobile view.

### Bonus

- Internal linking
- Sitemap or robots considerations

---

## Deliverables

- GitHub repo
- README explaining your decisions — **the text above is the task brief; include your write-up** (new section at the end of this README) covering tradeoffs, caching, and SEO choices.
