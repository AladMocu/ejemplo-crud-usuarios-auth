import { useAuth } from "../hooks/useAuth";

export function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <p className="text-sm text-slate-600">
        No hay información de usuario. Inicia sesión nuevamente.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-md space-y-4">
      <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="mb-1 text-xl font-semibold text-slate-900">
          Mi perfil
        </h1>
        <p className="mb-4 text-xs text-slate-500">
          Información del usuario autenticado.
        </p>

        <dl className="space-y-2 text-sm">
          <div>
            <dt className="text-xs font-medium text-slate-500">Nombre</dt>
            <dd className="text-slate-800">{user.name}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Email</dt>
            <dd className="text-slate-800">{user.email}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Ciudad</dt>
            <dd className="text-slate-800">{user.city}</dd>
          </div>
          <div>
            <dt className="text-xs font-medium text-slate-500">Rol</dt>
            <dd>
              <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
                {user.role}
              </span>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
