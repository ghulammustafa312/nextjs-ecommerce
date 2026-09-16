/**
 * A GET form updates the URL (`/products?q=phone`) without JavaScript.
 * The products page then reads searchParams on the server and fetches again.
 */
export function SearchForm({ defaultQuery = "" }: { defaultQuery?: string }) {
  return (
    <form action="/products" method="get" className="flex w-full max-w-xl gap-2">
      <label className="sr-only" htmlFor="product-search">
        Search products
      </label>
      <input
        id="product-search"
        type="search"
        name="q"
        defaultValue={defaultQuery}
        placeholder="Search products"
        className="w-full rounded-full border border-border bg-card px-4 py-2 text-sm outline-none ring-accent focus:ring-2"
      />
      <button
        type="submit"
        className="rounded-full bg-foreground px-4 py-2 text-sm font-semibold text-background"
      >
        Search
      </button>
    </form>
  );
}
