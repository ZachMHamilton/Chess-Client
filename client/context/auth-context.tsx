'use client';

import { createContext, useState, ReactNode } from "react";

interface AuthContextType {
  user: string | null;
  setUser: (user: string | null) => void;
  userStats: UserStatsType;
  setUserStats: (userStats: UserStatsType) => void;
}

interface UserStatsType {
  userId: string;
  gamesPlayed: number;
  puzzlesSolved: number;
  winRate: number;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  userStats: {userId: '', gamesPlayed: 0, puzzlesSolved: 0, winRate: 0},
  setUserStats: () => {}
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<UserStatsType>({userId: '', gamesPlayed: 0, puzzlesSolved: 0, winRate: 0});

  return (
    <AuthContext.Provider value={{user, setUser, userStats, setUserStats}}>
      {children}
    </AuthContext.Provider>
  );
}
