export default function BookSkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border animate-pulse">
      <div className="aspect-[2/3] bg-gradient-to-br from-[#1a2235] to-[#0f1520]" />
      <div className="p-3 space-y-2">
        <div className="h-4 bg-[#1a2235] rounded w-3/4" />
        <div className="h-3 bg-[#1a2235] rounded w-1/3" />
      </div>
    </div>
  );
}

export function BookGridSkeleton({ count = 12 }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <BookSkeleton key={i} />
      ))}
    </div>
  );
}
