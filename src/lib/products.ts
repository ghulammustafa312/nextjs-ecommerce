import type { Product, ProductFilters, ProductListResponse } from "@/types/product";

const API_BASE = "https://dummyjson.com";

export const PAGE_SIZE = 12;

async function apiFetch<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`);

  if (!response.ok) {
    throw new Error(`DummyJSON request failed (${response.status}) for ${path}`);
  }

  return response.json() as Promise<T>;
}

export async function getProducts({
  q,
  category,
  page = 1,
}: ProductFilters = {}): Promise<ProductListResponse> {
  const skip = (page - 1) * PAGE_SIZE;
  const params = new URLSearchParams({
    limit: String(PAGE_SIZE),
    skip: String(skip),
  });

  if (q) {
    params.set("q", q);
    return apiFetch<ProductListResponse>(`/products/search?${params}`);
  }

  if (category) {
    return apiFetch<ProductListResponse>(
      `/products/category/${encodeURIComponent(category)}?${params}`,
    );
  }

  return apiFetch<ProductListResponse>(`/products?${params}`);
}

export async function getProduct(id: string): Promise<Product | null> {
  const response = await fetch(`${API_BASE}/products/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`DummyJSON request failed (${response.status}) for product ${id}`);
  }

  return response.json() as Promise<Product>;
}

export async function getCategories(): Promise<string[]> {
  return apiFetch<string[]>("/products/category-list");
}
