import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export function Home() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Taller CRUD con autenticación
        </h1>
        <p className="text-sm text-slate-600">
          Esta aplicación integra el taller 14 (CRUD de usuarios) y el taller 15
          (autenticación, autorización y protección de rutas) en un solo proyecto
          usando React, Vite, React Router y Context API.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-800">
            1. CRUD de usuarios
          </h2>
          <p className="mb-3 text-xs text-slate-600">
            Crea, lista, edita y elimina usuarios con formularios controlados usando
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-[10px]">
              useState
            </code>
            y componentes reutilizables.
          </p>
          <Link
            to="/usuarios"
            className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            Ir a usuarios
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-800">
            2. Autenticación
          </h2>
          <p className="mb-3 text-xs text-slate-600">
            Inicia sesión con un usuario del CRUD. La sesión se maneja de forma
            global con Context API y se persiste con
            <code className="mx-1 rounded bg-slate-100 px-1 py-0.5 text-[10px]">
              localStorage
            </code>
            .
          </p>
          <Link
            to="/login"
            className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
          >
            Ir al login
          </Link>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm">
          <h2 className="mb-1 text-sm font-semibold text-slate-800">
            3. Roles y rutas protegidas
          </h2>
          <p className="mb-3 text-xs text-slate-600">
            Solo un usuario con rol <strong>admin</strong> puede ver y administrar
            todos los usuarios. Los usuarios normales solo acceden a su
            <strong className="mx-1">perfil</strong>.
          </p>
          {isAuthenticated ? (
            <Link
              to={user?.role === "admin" ? "/usuarios" : "/perfil"}
              className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            >
              Ir a mi panel
            </Link>
          ) : (
            <Link
              to="/login"
              className="inline-flex items-center rounded-md bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-800"
            >
              Empezar
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
