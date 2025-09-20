export default function Header({ email, onLogout }: { email: string | null; onLogout: () => void }) {
return (
<div className="mb-6 flex items-start justify-between">
<h1 className="text-3xl font-extrabold tracking-wide">MOVIE RECOMMENDER</h1>
{email && (
  <button onClick={onLogout} className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/20">
  Logout </button>
)}
</div>
);
}