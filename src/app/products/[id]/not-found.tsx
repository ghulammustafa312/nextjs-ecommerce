import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Product not found</h1>
      <p className="text-muted">
        We could not find that product. Try another item from the catalog.
      </p>
      <Link
        href="/products"
        className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
      >
        Browse products
      </Link>
    </div>
  );
}
