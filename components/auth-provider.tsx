"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ZReservation, ZUser } from "@/lib/zenturo-storage";
import {
  getReservationsForEmail,
  getSessionEmail,
  getUserByEmail,
  loginUser as storageLogin,
  logoutUser as storageLogout,
  registerUser as storageRegister,
} from "@/lib/zenturo-storage";

type AuthContextValue = {
  user: ZUser | null;
  reservations: ZReservation[];
  refresh: () => void;
  login: (email: string, password: string) => ReturnType<typeof storageLogin>;
  register: (
    prenom: string,
    nom: string,
    email: string,
    password: string
  ) => ReturnType<typeof storageRegister>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<ZUser | null>(null);
  const [reservations, setReservations] = useState<ZReservation[]>([]);

  const refresh = useCallback(() => {
    const email = getSessionEmail();
    if (!email) {
      setUser(null);
      setReservations([]);
      return;
    }
    setUser(getUserByEmail(email));
    setReservations(getReservationsForEmail(email));
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const login = useCallback(
    (email: string, password: string) => {
      const r = storageLogin(email, password);
      if (r.ok) refresh();
      return r;
    },
    [refresh]
  );

  const register = useCallback(
    (prenom: string, nom: string, email: string, password: string) => {
      const r = storageRegister(prenom, nom, email, password);
      if (r.ok) refresh();
      return r;
    },
    [refresh]
  );

  const logout = useCallback(() => {
    storageLogout();
    refresh();
  }, [refresh]);

  const value = useMemo(
    () => ({
      user,
      reservations,
      refresh,
      login,
      register,
      logout,
    }),
    [user, reservations, refresh, login, register, logout]
  );

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth doit être utilisé sous AuthProvider");
  return ctx;
}
