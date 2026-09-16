"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getProduct, getProducts } from "@/lib/products";
import { queryKeys } from "@/queries/keys";
import { useBrowserReady } from "@/queries/use-browser-ready";
import type { ProductFilters } from "@/types/product";

export function useProducts(filters: ProductFilters) {
  const ready = useBrowserReady();
  return useQuery({
    queryKey: queryKeys.products(filters),
    queryFn: () => getProducts(filters),
    enabled: ready,
  });
}

export function useProduct(id: string) {
  const ready = useBrowserReady();
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProduct(id),
    enabled: ready,
  });
}

export function useCategories() {
  const ready = useBrowserReady();
  return useQuery({
    queryKey: queryKeys.categories,
    queryFn: getCategories,
    enabled: ready,
  });
}
