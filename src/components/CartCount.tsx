"use client";

import { useCart } from "@/queries/use-cart";

export function CartCount() {
  const { count } = useCart();

  return (
    <span
      aria-label={`${count} items in cart`}
      className="inline-flex min-w-6 items-center justify-center rounded-full bg-accent px-1.5 text-xs font-semibold text-accent-foreground"
    >
      {count}
    </span>
  );
}
