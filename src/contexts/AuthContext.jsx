import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

const AUTH_USER_KEY = "authUser";
const USERS_STORAGE_KEY = "users";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_USER_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        setUser(null);
      }
    }
  }, []);

  const login = (email, password) => {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    let users = [];
    if (storedUsers) {
      try {
        users = JSON.parse(storedUsers);
      } catch {
        users = [];
      }
    }

    const found = users.find(
      (u) =>
        u.email.trim().toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );

    if (found) {
      setUser(found);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(found));
      return found;
    }

    return null;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(AUTH_USER_KEY);
  };

  const isAuthenticated = !!user;

  const hasRole = (role) => {
    if (!role) return true;
    return user?.role === role;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, hasRole }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuthContext debe usarse dentro de un AuthProvider");
  }
  return ctx;
}
