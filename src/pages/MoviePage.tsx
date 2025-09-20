import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import DetailsPanel from "../components/DetailsPanel";
import Pagination from "../components/Pagination";
import { Api } from "../lib/tmdb";
import type { Movie, MovieDetails } from "../types";


export default function MoviePage() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<Movie[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [selected, setSelected] = useState<MovieDetails | null>(null);


// Fetch movies
useEffect(() => {
  let cancelled = false;
  (async () => {
    setLoading(true); setError(null);
    try {
      const data = await Api.list({ query, page });
      if (!cancelled) {
        setResults(data.results);
        setTotalPages(Math.max(1, Math.min(500, data.total_pages || 1)));
        if (data.results?.length) selectMovie(data.results[0].id);
        else setSelected(null);
      }
    } catch (e: any) {
      if (!cancelled) setError(e.message || "Failed to load");
    } finally {
      if (!cancelled) setLoading(false);
    }
  })();
  return () => { cancelled = true; };
}, [query, page]);


async function selectMovie(id: number) {
  try { setSelected(await Api.details(id)); } catch {}
}


return (
<div className="grid grid-cols-1 gap-6 md:grid-cols-[1fr_420px]">
  <div>
    <SearchBar query={query} onChange={(v) => { setPage(1); setQuery(v); }} />
      {loading && <div className="py-10 text-center text-white/70">Loading…</div>}
      {error && <div className="rounded-xl bg-red-500/20 p-3 text-sm text-red-200">{error}</div>}
      {!loading && !results.length && !error && <div className="py-10 text-center text-white/60">No results</div>}
      <MovieGrid items={results} onSelect={selectMovie} />
      <Pagination page={page} totalPages={totalPages} onPrev={() => setPage((p) => Math.max(1, p - 1))}
      onNext={() => setPage((p) => Math.min(totalPages, p + 1))}/>
  </div>


{selected ? <DetailsPanel m={selected} /> : <div className="rounded-2xl bg-white/5 p-6 text-white/60">Select a movie…</div>}
</div>
);
}