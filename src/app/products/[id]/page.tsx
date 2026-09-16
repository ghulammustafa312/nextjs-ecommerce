import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";

export const metadata: Metadata = {
  title: "Product",
};

/**
 * [id] is a dynamic segment. params is a Promise in Next.js 15+.
 * ProductDetail fetches the product through React Query in the browser.
 */
export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <ProductDetail id={id} />;
}
