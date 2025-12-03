import { NavLink, Routes, Route, Outlet, Navigate, useNavigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Users } from "./pages/Users";
import { CreateUser } from "./pages/CreateUser";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { useAuth } from "./hooks/useAuth";

function Layout() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const linkBase =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-800 hover:text-white";
  const activeClass = "bg-slate-800 text-white";

  return (
    <div className="min-h-screen flex flex-col bg-slate-100">
      <header className="bg-green-950 text-slate-100 shadow">
        <nav className="container mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <span className="text-lg font-semibold">CRUD + Auth</span>
            <span className="text-xs px-2 py-1 rounded-full bg-slate-800">
              Taller 14 & 15
            </span>
          </div>
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkBase} ${isActive ? activeClass : ""}`
              }
            >
              Inicio
            </NavLink>

            {isAuthenticated && user?.role === "admin" && (
              <>
                <NavLink
                  to="/usuarios"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeClass : ""}`
                  }
                >
                  Usuarios
                </NavLink>
                <NavLink
                  to="/crear"
                  className={({ isActive }) =>
                    `${linkBase} ${isActive ? activeClass : ""}`
                  }
                >
                  Crear usuario
                </NavLink>
              </>
            )}

            {isAuthenticated && (
              <NavLink
                to="/perfil"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : ""}`
                }
              >
              </NavLink>
            )}

            {!isAuthenticated && (
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `${linkBase} ${isActive ? activeClass : ""}`
                }
              >
                Login
              </NavLink>
            )}

            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="ml-2 px-3 py-2 rounded-md text-sm font-medium border border-slate-400 hover:bg-slate-100 hover:text-slate-900 text-slate-100 hover:border-slate-200"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        CRUD de usuarios con autenticación y roles (Context API + React Router)
      </footer>
    </div>
  );
}

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/perfil" element={<Profile />} />
        </Route>

        <Route element={<ProtectedRoute role="admin" />}>
          <Route path="/usuarios" element={<Users />} />
          <Route path="/crear" element={<CreateUser />} />
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Route>
    </Routes>
  );
}
