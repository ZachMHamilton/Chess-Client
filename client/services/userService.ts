import { api } from '../lib/api';

interface UserStats {
  userId: string;
  gamesPlayed: number;
  puzzlesSolved: number;
  winRate: number;
}

export const registerUser = async (username: string, email: string, password: string, confirmPassword: string) => {
  const data = { username, email, password, confirmPassword };
  return api.post('/api/User/register', data);
};

export const loginUser = async (username: string, password: string) => {
  const data = { username, password };
  return api.post('/api/User/login', data);
};

export const getUserStats = async (username: string): Promise<UserStats> => {
  return api.get(`/api/User/${username}`);
};