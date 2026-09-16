import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/AddToCartButton";
import { formatCategory, formatPrice } from "@/lib/format";
import type { Product } from "@/types/product";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
      <Link
        href={`/products/${product.id}`}
        className="relative block aspect-square bg-stone-100 dark:bg-stone-900"
      >
        <Image
          src={product.thumbnail}
          alt={product.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex-1">
          <p className="text-xs font-medium tracking-wide text-muted uppercase">
            {formatCategory(product.category)}
          </p>
          <h2 className="mt-1 text-base font-semibold leading-snug">
            <Link href={`/products/${product.id}`} className="hover:underline">
              {product.title}
            </Link>
          </h2>
          <p className="mt-2 text-sm text-muted">
            {formatPrice(product.price)} · {product.rating.toFixed(1)} rating
          </p>
        </div>
        <AddToCartButton product={product} />
      </div>
    </article>
  );
}
