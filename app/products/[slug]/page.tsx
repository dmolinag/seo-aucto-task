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
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white rounded-xl overflow-hidden relative aspect-square">
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          <p className="text-2xl font-semibold">
            {product.currency} {product.price}
          </p>

          <span className="inline-block w-fit px-3 py-1 text-sm rounded-md bg-green-100 text-green-700">
            {product.availability === "in_stock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Overview */}
      <section className="mt-10" aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-xl font-semibold mb-2">Overview</h2>
        <p className="text-gray-700">{product.longDescription}</p>
      </section>

      {/* Features */}
      <section className="mt-10" aria-labelledby="features-heading">
        <h2 id="features-heading" className="text-xl font-semibold mb-2">Features</h2>
        <ul className="space-y-2 list-disc pl-5">
          {product.features.map((f, i) => (
            <li key={i}>
              <strong>{f.title}:</strong> {f.description}
            </li>
          ))}
        </ul>
      </section>

      {/* Specs */}
      <section className="mt-10" aria-labelledby="specs-heading">
        <h2 id="specs-heading" className="text-xl font-semibold mb-2">Specifications</h2>
        <dl className="space-y-2">
          {product.specs.map((s, i) => (
            <div key={i} className="flex gap-2">
              <dt className="font-medium">{s.label}:</dt>
              <dd className="text-gray-700">{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Reviews */}
      <section className="mt-10" aria-labelledby="reviews-heading">
        <h2 id="reviews-heading" className="text-xl font-semibold mb-2">Customer Reviews</h2>
        <ul className="space-y-4">
          {product.reviews.map((r, i) => (
            <li key={i} className="border-t pt-4">
              <p className="font-semibold">{r.author}</p>
              <p className="text-sm text-gray-500">Rating: {r.rating}/5</p>
              <p className="text-gray-700">{r.comment}</p>
            </li>
          ))}
        </ul>
      </section>
    </article>
    </>
  );
}
