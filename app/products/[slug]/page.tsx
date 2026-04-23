import { getProduct } from "@/lib/api";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) return notFound();

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image */}
        <div className="bg-white rounded-xl overflow-hidden">
          {/* TODO: Replace with next/image */}
          <img src={product.images[0].url} />
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-2xl font-semibold">
            {product.currency} {product.price}
          </div>

          <span className="inline-block w-fit px-3 py-1 text-sm rounded-md bg-green-100 text-green-700">
            {product.availability === "in_stock" ? "In Stock" : "Out of Stock"}
          </span>
        </div>
      </div>

      {/* Overview */}
      <div className="mt-10">
        <div className="text-xl font-semibold mb-2">Overview</div>
        <p className="text-gray-700">{product.longDescription}</p>
      </div>

      {/* Features */}
      <div className="mt-10">
        <div className="text-xl font-semibold mb-2">Features</div>
        <ul className="space-y-2 list-disc pl-5">
          {product.features.map((f, i) => (
            <li key={i}>
              <strong>{f.title}:</strong> {f.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Specs */}
      <div className="mt-10">
        <div className="text-xl font-semibold mb-2">Specifications</div>
        <ul className="space-y-2">
          {product.specs.map((s, i) => (
            <li key={i}>
              <span className="font-medium">{s.label}:</span> {s.value}
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="mt-10">
        <div className="text-xl font-semibold mb-2">Customer Reviews</div>

        <div className="space-y-4">
          {product.reviews.map((r, i) => (
            <div key={i} className="border-t pt-4">
              <div className="font-semibold">{r.author}</div>
              <div className="text-sm text-gray-500">Rating: {r.rating}/5</div>
              <p className="text-gray-700">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
