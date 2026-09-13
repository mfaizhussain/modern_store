/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const USERS_KEY = 'modern-store-users';
const CURRENT_USER_KEY = 'modern-store-current-user';

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(() => readStorage(USERS_KEY, []));
  const [user, setUser] = useState(() => readStorage(CURRENT_USER_KEY, null));

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  const value = useMemo(() => ({
    user,
    isAuthenticated: Boolean(user),
    signUp({ name, email, password }) {
      const normalizedEmail = email.trim().toLowerCase();
      if (users.some(existingUser => existingUser.email === normalizedEmail)) {
        return { error: 'An account with this email already exists.' };
      }

      const newUser = { id: crypto.randomUUID(), name: name.trim(), email: normalizedEmail, password };
      setUsers(currentUsers => [...currentUsers, newUser]);
      setUser({ id: newUser.id, name: newUser.name, email: newUser.email });
      return { error: null };
    },
    signIn(email, password) {
      const normalizedEmail = email.trim().toLowerCase();
      const matchingUser = users.find(
        existingUser => existingUser.email === normalizedEmail && existingUser.password === password,
      );

      if (!matchingUser) return { error: 'Email or password is incorrect.' };
      setUser({ id: matchingUser.id, name: matchingUser.name, email: matchingUser.email });
      return { error: null };
    },
    signOut() {
      setUser(null);
    },
  }), [user, users]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
