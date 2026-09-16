"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/queries/use-cart";
import { formatPrice } from "@/lib/format";

export function CartView() {
  const { items, count, isPending, updateQuantity, remove } = useCart();

  if (isPending) {
    return <p className="text-muted">Loading cart…</p>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border p-8 text-center">
        <p className="text-lg font-medium">Your cart is empty</p>
        <p className="mt-2 text-muted">Add a product, then come back to this page.</p>
        <Link
          href="/products"
          className="mt-6 inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
        >
          Browse products
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="space-y-6">
      <ul className="space-y-4">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 sm:flex-row sm:items-center"
          >
            <div className="relative h-24 w-24 overflow-hidden rounded-xl bg-stone-100 dark:bg-stone-900">
              <Image
                src={item.thumbnail}
                alt={item.title}
                fill
                sizes="96px"
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <Link href={`/products/${item.id}`} className="font-semibold hover:underline">
                {item.title}
              </Link>
              <p className="mt-1 text-sm text-muted">{formatPrice(item.price)} each</p>
            </div>
            <div className="flex items-center gap-3">
              <label className="sr-only" htmlFor={`quantity-${item.id}`}>
                Quantity for {item.title}
              </label>
              <input
                id={`quantity-${item.id}`}
                type="number"
                min={1}
                value={item.quantity}
                onChange={(event) => {
                  const quantity = Number(event.target.value);
                  updateQuantity(item.id, Number.isNaN(quantity) ? 1 : quantity);
                }}
                className="w-16 rounded-lg border border-border bg-background px-2 py-1 text-sm"
              />
              <button
                type="button"
                onClick={() => remove(item.id)}
                className="text-sm text-muted hover:text-foreground"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-border pt-4">
        <p className="text-sm text-muted">{count} items</p>
        <p className="text-lg font-semibold">Total {formatPrice(total)}</p>
      </div>
    </div>
  );
}
