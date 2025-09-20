import type { Movie } from "../types";
import MovieCard from "./MovieCard";


export default function MovieGrid({ items, onSelect }: { items: Movie[]; onSelect: (id: number) => void }) {
return (
<ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
{items.map((m) => <MovieCard key={m.id} m={m} onSelect={onSelect} />)}
</ul>
);
}
