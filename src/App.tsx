import Header from "./components/Header";
import Login from "./components/Login";
import MoviePage from "./pages/MoviePage";
import { useAuth } from "./hooks/useAuth";



export default function App() {
const { email, login, logout } = useAuth();
return (
  <div className="min-h-screen bg-[#0e1621] text-white">
    {!email ? (
      <div className="min-h-screen w-full grid place-items-center px-4">
        <Login onLogin={login} />
      </div>
    ) : (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <Header email={email} onLogout={logout} />
      <MoviePage />
    </div>
  )}
  </div>
);
}