"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addToCart,
  cartItemCount,
  readCart,
  removeFromCart,
  updateCartQuantity,
} from "@/lib/cart";
import { queryKeys } from "@/queries/keys";
import { useBrowserReady } from "@/queries/use-browser-ready";
import type { CartItem } from "@/types/cart";
import type { CartAddInput, UseCartValue } from "@/types/query";

export function useCart(): UseCartValue {
  const ready = useBrowserReady();
  const queryClient = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.cart,
    queryFn: async () => readCart(),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: ready,
  });
  const items = ready ? (query.data ?? []) : [];

  function setCart(next: CartItem[]) {
    queryClient.setQueryData(queryKeys.cart, next);
  }

  return {
    items,
    count: cartItemCount(items),
    isPending: !ready || query.isPending,
    add(product: CartAddInput) {
      setCart(addToCart(product));
    },
    updateQuantity(id: number, quantity: number) {
      setCart(updateCartQuantity(id, quantity));
    },
    remove(id: number) {
      setCart(removeFromCart(id));
    },
  };
}
