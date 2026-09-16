"use client";

import { useState } from "react";
import { useCart } from "@/queries/use-cart";
import type { Product } from "@/types/product";

export function AddToCartButton({ product }: { product: Product }) {
  const { add } = useCart();
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd() {
    add(product);
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground transition hover:opacity-90"
    >
      {justAdded ? "Added" : "Add to cart"}
    </button>
  );
}
