import type { Metadata } from "next";
import { ProductList } from "@/components/ProductList";

export const metadata: Metadata = {
  title: "Products",
};

function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/**
 * The page stays a Server Component so it can read the URL.
 * ProductList is a Client Component that fetches with React Query.
 */
export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[]; category?: string | string[]; page?: string | string[] }>;
}) {
  const params = await searchParams;
  const q = firstValue(params.q)?.trim() || undefined;
  const category = firstValue(params.category) || undefined;
  const page = Math.max(1, Number(firstValue(params.page)) || 1);

  return <ProductList q={q} category={category} page={page} />;
}
