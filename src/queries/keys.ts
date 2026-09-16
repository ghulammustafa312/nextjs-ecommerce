import type {
  CartQueryKey,
  CategoriesQueryKey,
  ProductQueryKey,
  ProductsQueryKey,
} from "@/types/query";
import type { ProductFilters } from "@/types/product";

export const queryKeys = {
  products: (filters: ProductFilters): ProductsQueryKey => ["products", filters],
  product: (id: string): ProductQueryKey => ["product", id],
  categories: ["categories"] as CategoriesQueryKey,
  cart: ["cart"] as CartQueryKey,
};
