import { UserItem } from "./UserItem";

export function UserList({ users, onEditUser, onDeleteUser }) {
  if (!users.length) {
    return (
      <p className="text-sm text-slate-500">
        No hay usuarios creados todavía. Crea el primero desde la opción "Crear
        usuario".
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {users.map((user) => (
        <UserItem
          key={user.id}
          user={user}
          onEdit={onEditUser}
          onDelete={onDeleteUser}
        />
      ))}
    </ul>
  );
}
