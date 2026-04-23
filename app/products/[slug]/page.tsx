import { getProduct, getAllProducts } from "@/lib/api";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

const BASE_URL = "http://localhost:3000";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug, { next: { revalidate: 3600 } });

  if (!product) return {};

  const url = `${BASE_URL}/products/${slug}`;
  const imageUrl = `${BASE_URL}${product.images[0].url}`;

  return {
    title: product.name,
    description: product.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      url,
      title: product.name,
      description: product.description,
      images: [{ url: imageUrl, alt: product.images[0].alt }],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [imageUrl],
    },
  };
}

export async function generateStaticParams() {
  const products = await getAllProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug, { next: { revalidate: 3600 } });

  if (!product) return notFound();

  const url = `${BASE_URL}/products/${slug}`;
  const imageUrl = `${BASE_URL}${product.images[0].url}`;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: [imageUrl],
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      price: String(product.price),
      priceCurrency: product.currency,
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: String(product.rating),
      reviewCount: String(product.reviewCount),
    },
    review: product.reviews.map((r) => ({
      "@type": "Review",
      author: { "@type": "Person", name: r.author },
      reviewRating: { "@type": "Rating", ratingValue: String(r.rating) },
      reviewBody: r.comment,
      datePublished: r.date,
    })),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Kitchen Gadgets",
        item: BASE_URL,
      },
      { "@type": "ListItem", position: 3, name: product.name, item: url },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...product.features.map((f) => ({
        "@type": "Question",
        name: `What is the ${f.title.toLowerCase()} of the ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: f.description },
      })),
      ...product.specs.map((s) => ({
        "@type": "Question",
        name: `What is the ${s.label.toLowerCase()} of the ${product.name}?`,
        acceptedAnswer: { "@type": "Answer", text: s.value },
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    <article className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Image */}
        <div className="bg-stone-50 rounded-3xl overflow-hidden relative aspect-square p-8">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-8"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold tracking-tight leading-tight">{product.name}</h1>

          <p className="text-stone-500 text-base leading-relaxed">{product.description}</p>

          <p className="text-4xl font-bold tracking-tight">
            ${product.price.toFixed(2)}
            <span className="ml-2 text-xs font-semibold uppercase tracking-widest text-stone-400">{product.currency}</span>
          </p>

          <span className={`inline-flex items-center gap-1.5 w-fit px-3 py-1 text-sm font-medium rounded-full ring-1 ${
            product.availability === "in_stock"
              ? "bg-emerald-50 text-emerald-700 ring-emerald-200"
              : "bg-red-50 text-red-700 ring-red-200"
          }`}>
            <span className={`w-1.5 h-1.5 rounded-full ${product.availability === "in_stock" ? "bg-emerald-500" : "bg-red-500"}`} />
            {product.availability === "in_stock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Overview */}
      <section className="mt-12" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-3 border-t border-stone-200 pt-6">Overview</h2>
        <p className="text-stone-700 leading-relaxed">{product.longDescription}</p>
      </section>

      {/* Features */}
      <section className="mt-10" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4 border-t border-stone-200 pt-6">Features</h2>
        <ul className="grid sm:grid-cols-2 gap-4">
          {product.features.map((f, i) => (
            <li key={i} className="rounded-2xl border border-stone-100 bg-stone-50 p-4 hover:border-stone-200 transition-colors">
              <strong className="block text-sm font-semibold text-stone-800 mb-1">{f.title}</strong>
              <span className="text-sm text-stone-600">{f.description}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Specs */}
      <section className="mt-10" aria-labelledby="specs-heading">
        <h2 id="specs-heading" className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4 border-t border-stone-200 pt-6">Specifications</h2>
        <dl className="rounded-2xl border border-stone-100 overflow-hidden divide-y divide-stone-100">
          {product.specs.map((s, i) => (
            <div key={i} className={`flex gap-4 px-4 py-3 ${i % 2 === 1 ? "bg-stone-50/70" : "bg-white"}`}>
              <dt className="w-40 shrink-0 text-sm font-medium text-stone-600">{s.label}</dt>
              <dd className="text-sm text-stone-800">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Reviews */}
      <section className="mt-10" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-xs font-semibold uppercase tracking-widest text-stone-400 mb-4 border-t border-stone-200 pt-6">Customer Reviews</h2>
        <ul className="space-y-3">
          {product.reviews.map((r, i) => (
            <li key={i} className="rounded-2xl border border-stone-100 bg-white p-5 hover:border-stone-200 transition-colors">
              <div className="flex items-center justify-between mb-3">
                <p className="font-semibold text-stone-800">{r.author}</p>
                <span className="flex gap-0.5" aria-label={`${r.rating} out of 5 stars`}>
                  {Array.from({ length: 5 }).map((_, j) => (
                    <svg key={j} className={`w-4 h-4 ${j < r.rating ? "text-amber-400" : "text-stone-200"}`} fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </span>
              </div>
              <p className="text-sm text-stone-600 leading-relaxed">{r.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
    </>
  );
}
