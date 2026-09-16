export function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export function formatCategory(slug: string): string {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function buildProductsHref({
  q,
  category,
  page,
}: {
  q?: string;
  category?: string;
  page?: number;
}): string {
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }
  if (category) {
    params.set("category", category);
  }
  if (page && page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `/products?${query}` : "/products";
}
