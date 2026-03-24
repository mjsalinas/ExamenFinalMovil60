import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';
import { supabase } from '../services/supabaseClient'; 
import { Alert } from "react-native";


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
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        // throw new Error(error.message);  
          console.log('Email' + email  + 'pass' + password)
            Alert.alert("Error al iniciar sesion", error.message);


      }
      if (data.user) {
        setUser({
          id: data.user.id,
          email: data.user.email ?? '',
          name: data.user.user_metadata?.name,
        });
      }
    } finally {
      setIsLoading(false);
    }
  }; 


  //  const login = async (email: string, password: string) => {
  //       const {data, error} = await supabase.auth.signInWithPassword({
  //           email, 
  //           password
  //       });
  //       if (error) {
  //           Alert.alert("Error al iniciar sesion", error.message);
  //       };
  //      console.log("res data: ", data)
  //   };
  //   const logout = () =>{
  //       setUser(null);
  //       setIsAllowed(false);
  //   };


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
      if (error) {
        // throw new Error(error.message); 
            Alert.alert("Error al registrar"+ error.message);


      }
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
