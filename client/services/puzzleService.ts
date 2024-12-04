import { api } from "@/lib/api";

type Puzzle = {
  fen: string;
  moves: string;
};

export const fetchPuzzleData = async (rating: number): Promise<Puzzle[]> => {
  return api.get(`/api/Puzzle/next/?rating=${rating}`);
};