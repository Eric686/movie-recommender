import { useRef } from "react";


export default function SearchBar({ query, onChange }: { query: string; onChange: (v: string) => void }) {
const inputRef = useRef<HTMLInputElement>(null);
return (
<div className="mb-4 flex items-center gap-3">
  <div className="relative flex-1">
    <input ref={inputRef} value={query} onChange={(e) => onChange(e.target.value)} placeholder="Search for a movie" className="w-full rounded-xl bg-white/10 px-4 py-3 pl-11 outline-none ring-1 ring-white/20 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400"/>
    <span className="pointer-events-none absolute left-3 top-2.5 text-white/60" aria-hidden>🔎</span>
  </div>
</div>
);
}