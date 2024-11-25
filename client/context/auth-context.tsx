'use client';

import { createContext, useState, ReactNode } from "react";

export const AuthContext = createContext<string>("");

export function AuthProvider({ children }: { children: ReactNode }) {
  // [ ] Fetch user state and handle login
  const [user, setUser] = useState("Zach");

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
}
