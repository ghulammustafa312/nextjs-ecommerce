import type { CartItem } from "@/types/cart";
import type { Product, ProductFilters } from "@/types/product";

export type ProductsQueryKey = readonly ["products", ProductFilters];
export type ProductQueryKey = readonly ["product", string];
export type CategoriesQueryKey = readonly ["categories"];
export type CartQueryKey = readonly ["cart"];

export type CartAddInput = Pick<Product, "id" | "title" | "price" | "thumbnail">;

export type UseCartValue = {
  items: CartItem[];
  count: number;
  isPending: boolean;
  add: (product: CartAddInput) => void;
  updateQuantity: (id: number, quantity: number) => void;
  remove: (id: number) => void;
};
