import { useNavigate } from "react-router-dom";
import { UserForm } from "../components/UserForm";
import { useUsers } from "../hooks/useUsers";

export function CreateUser() {
  const { addUser } = useUsers();
  const navigate = useNavigate();

  const handleCreateUser = (data) => {
    addUser(data);
    navigate("/usuarios");
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  return (
    <div className="mx-auto max-w-xl space-y-4">
      <h1 className="text-xl font-semibold text-slate-900">
        Crear nuevo usuario
      </h1>
      <p className="text-xs text-slate-500 mb-2">
        Completa el formulario para registrar un nuevo usuario en el sistema.
      </p>

      <UserForm
        onSubmit={handleCreateUser}
        onCancel={handleCancel}
        submitLabel="Crear usuario"
      />
    </div>
  );
}
