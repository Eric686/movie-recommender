export default function Pagination({ page, totalPages, onPrev, onNext }: {
  page: number; totalPages: number; onPrev: () => void; onNext: () => void;
}) {
  if (totalPages <= 1) return null;
  return (
  <div className="mt-6 flex items-center justify-center gap-4 text-sm text-white/70">
    <span>Page: {page}</span>
    <div className="flex items-center gap-2">
      <button onClick={onPrev} disabled={page === 1} className="rounded-lg bg-white/10 px-3 py-1.5 disabled:opacity-40">Prev</button>
      <button onClick={onNext} disabled={page >= totalPages} className="rounded-lg bg-white/10 px-3 py-1.5 disabled:opacity-40">Next</button>
    </div>
  </div>
);
}