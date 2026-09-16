import Link from "next/link";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="max-w-2xl space-y-4">
        <p className="text-sm font-medium tracking-wide text-accent uppercase">
          New season catalog
        </p>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Everyday goods, all in one shop
        </h1>
        <p className="text-lg leading-8 text-muted">
          Browse the latest products, filter by category, and add favorites to
          your cart. Checkout stays in this browser so you can pick up where you
          left off.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/products"
            className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground"
          >
            Shop products
          </Link>
          <Link
            href="/cart"
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold"
          >
            View cart
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <HomeCard
          title="Full catalog"
          body="Beauty, tech, home, and more — scroll the grid or jump in from a category."
        />
        <HomeCard
          title="Search and filter"
          body="Look up a product by name, narrow by category, and page through results."
        />
        <HomeCard
          title="Saved cart"
          body="Add items as you browse. Your cart count stays in the header until you remove them."
        />
      </section>
    </div>
  );
}

function HomeCard({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl border border-border bg-card p-5">
      <h2 className="font-semibold">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{body}</p>
    </article>
  );
}
