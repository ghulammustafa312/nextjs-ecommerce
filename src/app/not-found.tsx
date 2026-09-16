import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Page not found</h1>
      <p className="text-muted">That page is not part of the shop.</p>
      <Link
        href="/"
        className="inline-flex rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
      >
        Back home
      </Link>
    </div>
  );
}
