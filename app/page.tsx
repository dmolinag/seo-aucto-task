import Link from "next/link";
import { getAllProducts } from "@/lib/api";

export default async function Home() {
  const products = await getAllProducts();

  return (
    <main className="max-w-5xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Kitchen Gadgets</h1>

      <div className="grid gap-4">
        {products.map((product) => (
          <div
            key={product.slug}
            className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition"
          >
            <h2 className="text-xl font-semibold mb-2">
              <Link
                href={`/products/${product.slug}`}
                className="text-blue-600 hover:underline"
              >
                {product.name}
              </Link>
            </h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
