import Link from "next/link";
import { buildProductsHref } from "@/lib/format";

export function Pagination({
  page,
  totalPages,
  q,
  category,
}: {
  page: number;
  totalPages: number;
  q?: string;
  category?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const previousHref = buildProductsHref({ q, category, page: page - 1 });
  const nextHref = buildProductsHref({ q, category, page: page + 1 });

  return (
    <nav aria-label="Pagination" className="flex items-center justify-between gap-4">
      {page > 1 ? (
        <Link className="text-sm font-medium hover:underline" href={previousHref}>
          Previous
        </Link>
      ) : (
        <span className="text-sm text-muted">Previous</span>
      )}
      <p className="text-sm text-muted">
        Page {page} of {totalPages}
      </p>
      {page < totalPages ? (
        <Link className="text-sm font-medium hover:underline" href={nextHref}>
          Next
        </Link>
      ) : (
        <span className="text-sm text-muted">Next</span>
      )}
    </nav>
  );
}
