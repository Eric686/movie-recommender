import { posterUrl, titleOf, yearOf } from "../lib/tmdb";
import type { Movie } from "../types";


export default function MovieCard({ m, onSelect }: { m: Movie; onSelect: (id: number) => void }) {
  return (
  <li>
    <button onClick={() => onSelect(m.id)} className="group block w-full overflow-hidden rounded-xl bg-white/5 ring-1 ring-white/10 hover:ring-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400">
    <div className="aspect-[2/3] w-full overflow-hidden bg-white/5">
    {posterUrl(m.poster_path) ? (
      <img src={posterUrl(m.poster_path)} alt={titleOf(m)} className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"/>
      ) : (
      <div className="flex h-full items-center justify-center text-white/40">No image</div>
      )}
      </div>
      <div className="p-3 text-left">
        <p className="line-clamp-2 font-semibold leading-snug">{titleOf(m)}</p>
        <p className="mt-1 text-sm text-white/60">{yearOf(m)}</p>
      </div>
    </button>
  </li>
  );
}