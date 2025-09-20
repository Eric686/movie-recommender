import { useState } from "react";


export function useAuth() {
  const [email, setEmail] = useState<string | null>(() => localStorage.getItem("auth_email"));
  const login = (e: string) => { localStorage.setItem("auth_email", e); setEmail(e); };
  const logout = () => { localStorage.removeItem("auth_email"); setEmail(null); };
  return { email, login, logout };
}