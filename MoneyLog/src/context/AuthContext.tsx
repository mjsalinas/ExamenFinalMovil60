import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../lib/supabase';

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
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // TODO (Inciso C.1): Reemplaza esta función con supabase.auth.signInWithPassword
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // TODO (Inciso C.2): Reemplaza esta función con supabase.auth.signUp
  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (error) throw error;

      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          name,
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  // TODO (Inciso C.3): Implementa con supabase.auth.signOut
  const logout = async () => {
    await supabase.auth.signOut();
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