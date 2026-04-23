import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products-data";

async function simulateDelay() {
  await new Promise((res) => setTimeout(res, 300));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  await simulateDelay();

  const product = PRODUCTS.find((p) => p.slug === slug);
  if (!product) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json(product);
}
