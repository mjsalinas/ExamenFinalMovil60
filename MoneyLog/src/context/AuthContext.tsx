import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

// ============================================================
// AUTH CONTEXT
// ============================================================
// NOTA PARA EL ESTUDIANTE:
// Las funciones login, register y logout contienen una implementación
// temporal (mock). Tu tarea es reemplazarlas con llamadas reales a
// Supabase Auth en los incisos del Examen Final.
// ============================================================

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO (Inciso C.1): Reemplaza esta función con supabase.auth.signInWithPassword
  const login = async (email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Implementación temporal — elimina esto al integrar Supabase
      setUser({ id: 'mock-id', email });
    } finally {
      setIsLoading(false);
    }
  };

  // TODO (Inciso C.2): Reemplaza esta función con supabase.auth.signUp
  const register = async (name: string, email: string, _password: string) => {
    setIsLoading(true);
    try {
      // Implementación temporal — elimina esto al integrar Supabase
      setUser({ id: 'mock-id', email, name });
    } finally {
      setIsLoading(false);
    }
  };

  // TODO (Inciso C.3): Implementa con supabase.auth.signOut
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider');
  return ctx;
}
