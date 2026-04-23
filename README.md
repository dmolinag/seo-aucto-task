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

---

## Implementation

1. First look
- Nothing about server side rendering
- Nothing about JSON-LD structured data
- Incorrect Image tag and props
- Some incorrect HTML tags
- Not bad responsivness

2. Claude Review
- Update Claude.md file to have a good understanding of the project.

3. Plan
- With Claude, I created a plan to implement the requirements and desired results. 

4. SEO (Search Engine Optimization), AEO (Answer Engine Optimization) and GEO (Generative Engine Optimization).
- Realized that SEO it's not the only technique to solve positioning issue. Now it's not only about ranking, also about rating.

5. Update plan to add GEO

6. 
- Step 1: Caching Strategy
- Step 2: generateMetadata
- setp 3: JSON-LD Structured Data
- step 4: next/image
- step 5: Semantic HTML
- step 6: Visual Design
- step 7: Internal Linking
- step 8: Sitemap & Robots.txt
- step 9: GEO: AI Conversational Visibility


7. 
Reviewed implementation checking lighthouse performance

