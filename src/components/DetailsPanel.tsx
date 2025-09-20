import { posterUrl, titleOf } from "../lib/tmdb";
import type { MovieDetails } from "../types";
import { useMemo } from "react";


export default function DetailsPanel({ m }: { m: MovieDetails }) {
  const director = useMemo(() => m.credits?.crew.find((c) => c.job === "Director")?.name, [m]);
  const writer = useMemo(() => m.credits?.crew.find((c) => c.job === "Writer" || c.job === "Screenplay")?.name, [m]);


return (
<aside className="sticky top-4 h-fit rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
{posterUrl(m.poster_path) && (
  <div className="aspect-[16/9] w-full overflow-hidden rounded-xl">
    <img src={posterUrl(m.poster_path)!} alt={titleOf(m)} className="h-full w-full object-cover" />
  </div>
)}
<h2 className="mt-3 text-2xl font-extrabold">{titleOf(m)}</h2>
<p className="line-clamp-4 text-white/80">{m.overview || "No overview available."}</p>


{m.credits?.cast?.length ? (
  <div className="text-sm">
    <div className="mb-1 font-semibold uppercase tracking-wide text-white/60">Cast</div>
    <p className="text-white/80 line-clamp-2">{m.credits.cast.slice(0, 8).map((c) => c.name).join(", ")}</p>
  </div>
) : null}


<div className="grid grid-cols-[auto_1fr] items-center gap-x-3 gap-y-1 text-sm">
<span className="text-white/60">Director</span>
<span className="text-white/90">{director || "—"}</span>
<span className="text-white/60">Writer</span>
<span className="text-white/90">{writer || "—"}</span>
<span className="text-white/60">Rating</span>
<span className="inline-flex h-7 w-10 items-center justify-center rounded-lg bg-white/10 text-sm font-bold">{(m.vote_average ?? 0).toFixed(1)}</span>
</div>
</aside>
);
}