import { useState } from "react";


export default function Login({ onLogin }: { onLogin: (email: string) => void }) {
  const [value, setValue] = useState("");
return (
<div className="mx-auto max-w-lg rounded-2xl bg-white/5 p-6">
<p className="mb-4 text-sm text-white/80">Login to continue: enter your email to continue.</p>
<form onSubmit={(e) => { e.preventDefault(); if (value.trim()) onLogin(value.trim()); }}
className="flex gap-3">
<input type="email" required value={value} onChange={(e) => setValue(e.target.value)} placeholder="you@example.com"
className="flex-1 rounded-xl bg-white/10 px-4 py-3 outline-none ring-1 ring-white/20 placeholder:text-white/50 focus:ring-2 focus:ring-cyan-400"/>
<button className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-black hover:bg-cyan-400">Continue</button>
</form>
</div>
);
}