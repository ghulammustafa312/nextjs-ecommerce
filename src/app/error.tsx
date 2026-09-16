"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto max-w-lg space-y-4 py-16 text-center">
      <h1 className="text-3xl font-semibold tracking-tight">Something went wrong</h1>
      <p className="text-muted">
        We could not load the catalog. Check your connection, then try again.
      </p>
      <p className="font-mono text-xs text-muted">{error.message}</p>
      <button
        type="button"
        onClick={reset}
        className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-accent-foreground"
      >
        Try again
      </button>
    </div>
  );
}
