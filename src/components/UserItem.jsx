export function UserItem({ user, onEdit, onDelete }) {
  return (
    <li className="flex items-center justify-between gap-4 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="flex flex-col">
        <span className="font-semibold text-slate-800">{user.name}</span>
        <span className="text-xs text-slate-500">{user.email}</span>
        <span className="text-xs text-slate-500">
          Ciudad: {user.city} — Rol:{" "}
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-medium text-slate-700">
            {user.role}
          </span>
        </span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(user)}
          className="rounded-md border border-slate-300 px-3 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100"
        >
          Editar
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="rounded-md bg-red-500 px-3 py-1 text-xs font-medium text-white hover:bg-red-600"
        >
          Eliminar
        </button>
      </div>
    </li>
  );
}
