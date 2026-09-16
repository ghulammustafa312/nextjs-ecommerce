export function ProductGridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, index) => (
        <div
          key={index}
          className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card"
        >
          <div className="aspect-square bg-stone-200 dark:bg-stone-800" />
          <div className="space-y-3 p-4">
            <div className="h-3 w-20 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-5 w-3/4 rounded bg-stone-200 dark:bg-stone-800" />
            <div className="h-4 w-1/2 rounded bg-stone-200 dark:bg-stone-800" />
          </div>
        </div>
      ))}
    </div>
  );
}
