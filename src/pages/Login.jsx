import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginForm } from "../components/LoginForm";
import { useAuth } from "../hooks/useAuth";

export function Login() {
  const { login } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    const loggedUser = login(email, password);
    if (!loggedUser) {
      setError("Credenciales inválidas. Verifica el email y la contraseña.");
      return;
    }
    setError("");
    if (loggedUser.role === "admin") {
      navigate("/usuarios");
    } else {
      navigate("/perfil");
    }
  };

  return <LoginForm onSubmit={handleLogin} error={error} />;
}
