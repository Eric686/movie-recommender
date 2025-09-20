import type { Movie, MovieDetails } from "../types";



const TMDB_BASE = "https://api.themoviedb.org/3";
const apiKey = import.meta.env.VITE_TMDB_API_KEY as string | undefined;


const cache = new Map<string, any>();


async function tmdb<T>(path: string, params: Record<string, any> = {}): Promise<T> {
  const url = new URL(TMDB_BASE + path);
  url.searchParams.set("api_key", apiKey ?? "");
  url.searchParams.set("language", "en-US");
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));
  const key = url.toString();
  if (cache.has(key)) return cache.get(key);

  const res = await fetch(key);
  if (!res.ok) throw new Error(`TMDB ${res.status}`);
  const json = (await res.json()) as T;
  cache.set(key, json);
  return json;
}

export const Api = {
  async list({ query, page }: { query: string; page: number }) {
    const path = query ? "/search/movie" : "/movie/now_playing";
    return tmdb<{ results: Movie[]; total_pages: number }>(path, { query, page });
  },
  async details(id: number) {
    return tmdb<MovieDetails>(`/movie/${id}`, { append_to_response: "credits" });
  },
};


export const IMG_BASE = "https://image.tmdb.org/t/p/w500";
export const posterUrl = (p: string | null) => (p ? IMG_BASE + p : undefined);
export const titleOf = (m: { title?: string; name?: string }) => m.title || m.name || "Untitled";
export const yearOf = (m: { release_date?: string; first_air_date?: string }) => {
  const d = m.release_date || m.first_air_date || "";
  return d ? new Date(d).getFullYear() : "—";
};