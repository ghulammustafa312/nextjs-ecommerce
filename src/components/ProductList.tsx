"use client";

import { CategoryFilter } from "@/components/CategoryFilter";
import { Pagination } from "@/components/Pagination";
import { ProductCard } from "@/components/ProductCard";
import { ProductGridSkeleton } from "@/components/ProductGridSkeleton";
import { SearchForm } from "@/components/SearchForm";
import { formatCategory } from "@/lib/format";
import { PAGE_SIZE } from "@/lib/products";
import { useCategories, useProducts } from "@/queries/use-products";
import type { ProductFilters } from "@/types/product";

export function ProductList({ q, category, page }: ProductFilters & { page: number }) {
  const productsQuery = useProducts({ q, category, page });
  const categoriesQuery = useCategories();
  const data = productsQuery.data;
  const heading = q
    ? `Results for “${q}”`
    : category
      ? formatCategory(category)
      : "All products";

  return (
    <div className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{heading}</h1>
        <p className="text-muted">
          {data ? `${data.total} products from DummyJSON.` : "Loading products…"}
        </p>
        <SearchForm defaultQuery={q ?? ""} />
      </div>

      {categoriesQuery.data ? (
        <CategoryFilter categories={categoriesQuery.data} activeCategory={category} q={q} />
      ) : (
        <div className="h-9 animate-pulse rounded-full bg-stone-200 dark:bg-stone-800" />
      )}

      {productsQuery.isError ? (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
          Could not load products. Refresh the page to try again.
        </p>
      ) : !data ? (
        <ProductGridSkeleton />
      ) : data.products.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
          No products matched this search. Clear the query or pick another category.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {data?.products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {data ? (
        <Pagination
          page={page}
          totalPages={Math.max(1, Math.ceil(data.total / PAGE_SIZE))}
          q={q}
          category={category}
        />
      ) : null}
    </div>
  );
}
