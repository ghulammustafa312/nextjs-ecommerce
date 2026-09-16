import type { ReactNode } from "react";
import Link from "next/link";
import { buildProductsHref, formatCategory } from "@/lib/format";

export function CategoryFilter({
  categories,
  activeCategory,
  q,
}: {
  categories: string[];
  activeCategory?: string;
  q?: string;
}) {
  return (
    <nav aria-label="Product categories" className="flex flex-wrap gap-2">
      <CategoryChip href={buildProductsHref({ q })} active={!activeCategory}>
        All
      </CategoryChip>
      {categories.map((category) => (
        <CategoryChip
          key={category}
          href={buildProductsHref({ q, category })}
          active={category === activeCategory}
        >
          {formatCategory(category)}
        </CategoryChip>
      ))}
    </nav>
  );
}

function CategoryChip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`rounded-full border px-3 py-1 text-sm ${
        active
          ? "border-foreground bg-foreground text-background"
          : "border-border bg-card text-muted hover:text-foreground"
      }`}
    >
      {children}
    </Link>
  );
}
