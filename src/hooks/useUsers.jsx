import { createContext, useContext, useEffect, useState } from "react";

const UsersContext = createContext(null);
const USERS_STORAGE_KEY = "users";

const seedUsers = [
  {
    id: 1,
    name: "Admin",
    email: "admin@example.com",
    city: "Bogotá",
    role: "admin",
    password: "admin123",
  },
  {
    id: 2,
    name: "Usuario Demo",
    email: "user@example.com",
    city: "Medellín",
    role: "usuario",
    password: "user123",
  },
];

export function UsersProvider({ children }) {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem(USERS_STORAGE_KEY);
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch {
        return seedUsers;
      }
    }
    return seedUsers;
  });

  useEffect(() => {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }, [users]);

  const addUser = (user) => {
    setUsers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((u) => u.id)) + 1 : 1;
      return [...prev, { ...user, id: nextId }];
    });
  };

  const updateUser = (updatedUser) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u))
    );
  };

  const deleteUser = (id) => {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  return (
    <UsersContext.Provider value={{ users, addUser, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsers() {
  const ctx = useContext(UsersContext);
  if (!ctx) {
    throw new Error("useUsers debe usarse dentro de un UsersProvider");
  }
  return ctx;
}
