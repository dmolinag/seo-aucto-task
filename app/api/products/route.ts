import { NextResponse } from "next/server";
import { PRODUCTS } from "@/lib/products-data";

async function simulateDelay() {
  await new Promise((res) => setTimeout(res, 300));
}

export async function GET() {
  await simulateDelay();
  return NextResponse.json(PRODUCTS);
}
