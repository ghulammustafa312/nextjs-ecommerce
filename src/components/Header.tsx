import Link from "next/link";
import { CartCount } from "@/components/CartCount";

export function Header() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Northline
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm font-medium">
          <Link className="text-muted hover:text-foreground" href="/">
            Home
          </Link>
          <Link className="text-muted hover:text-foreground" href="/products">
            Products
          </Link>
          <Link
            className="inline-flex items-center gap-2 text-muted hover:text-foreground"
            href="/cart"
          >
            Cart
            <CartCount />
          </Link>
        </nav>
      </div>
    </header>
  );
}
