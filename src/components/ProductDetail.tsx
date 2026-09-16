"use client";

import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatCategory, formatPrice } from "@/lib/format";
import { useProduct } from "@/queries/use-products";

export function ProductDetail({ id }: { id: string }) {
  const { data: product, isError, isFetched } = useProduct(id);

  if (!isFetched && !product) {
    return (
      <div className="grid animate-pulse gap-10 lg:grid-cols-2">
        <div className="aspect-square rounded-3xl bg-stone-200 dark:bg-stone-800" />
        <div className="space-y-4">
          <div className="h-4 w-32 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-10 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
          <div className="h-24 w-full rounded bg-stone-200 dark:bg-stone-800" />
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <p className="rounded-2xl border border-dashed border-border p-8 text-center text-muted">
        Could not load this product. Refresh the page to try again.
      </p>
    );
  }

  if (!product) {
    notFound();
  }

  const gallery = product.images.slice(0, 4);

  return (
    <article className="grid gap-10 lg:grid-cols-2">
      <div className="space-y-3">
        <div className="relative aspect-square overflow-hidden rounded-3xl border border-border bg-card">
          <Image
            src={product.images[0] ?? product.thumbnail}
            alt={product.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {gallery.length > 1 ? (
          <div className="grid grid-cols-4 gap-3">
            {gallery.map((src) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl border border-border bg-card"
              >
                <Image src={src} alt="" fill sizes="120px" className="object-cover" />
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="space-y-5">
        <p className="text-sm font-medium tracking-wide text-muted uppercase">
          {formatCategory(product.category)}
          {product.brand ? ` · ${product.brand}` : ""}
        </p>
        <h1 className="text-4xl font-semibold tracking-tight">{product.title}</h1>
        <p className="text-lg text-muted">{product.description}</p>
        <p className="text-2xl font-semibold">{formatPrice(product.price)}</p>
        <p className="text-sm text-muted">
          {product.rating.toFixed(1)} rating · {product.stock} in stock
        </p>
        <AddToCartButton product={product} />
        <p>
          <Link href="/products" className="text-sm font-medium hover:underline">
            Back to products
          </Link>
        </p>
      </div>
    </article>
  );
}
