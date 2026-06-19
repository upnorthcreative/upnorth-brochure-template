export default function Loading() {
  return (
    <div className="flex-1 flex items-center justify-center py-28" role="status" aria-label="Loading">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-2 border-neutral-200 border-t-neutral-950 rounded-full animate-spin" aria-hidden="true" />
        <p className="text-sm text-neutral-400">Loading…</p>
      </div>
    </div>
  );
}
