import { useState } from "react";
import { useUsers } from "../hooks/useUsers";
import { UserList } from "../components/UserList";
import { UserForm } from "../components/UserForm";

export function Users() {
  const { users, updateUser, deleteUser } = useUsers();
  const [editingUser, setEditingUser] = useState(null);

  const handleEditUser = (user) => {
    setEditingUser(user);
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleUpdateUser = (data) => {
    updateUser(data);
    setEditingUser(null);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      deleteUser(id);
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-[2fr,1.3fr]">
      <section>
        <div className="mb-4 flex items-center justify-between gap-2">
          <div>
            <h1 className="text-xl font-semibold text-slate-900">
              Lista de usuarios
            </h1>
            <p className="text-xs text-slate-500">
              CRUD completo: listar, editar y eliminar usuarios.
            </p>
          </div>
        </div>

        <UserList
          users={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </section>

      <section>
        {editingUser ? (
          <UserForm
            initialValues={editingUser}
            onSubmit={handleUpdateUser}
            onCancel={handleCancelEdit}
            submitLabel="Actualizar usuario"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 p-6 text-center text-sm text-slate-500">
            <p className="mb-2 font-medium text-slate-700">
              Selecciona un usuario para editar
            </p>
            <p className="text-xs">
              Al hacer clic en <strong>Editar</strong> en la lista, verás aquí el
              formulario con los datos cargados.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
