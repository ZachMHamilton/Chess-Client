import { Move } from "@/types/move";
import { Chess } from "chess.js";

export const makeMove = (move: Move, game: Chess): Chess | null => {
  const gameCopy = new Chess(game.fen());
  try {
    gameCopy.move(move);
    return gameCopy;
  } catch (error) {
    console.error('Error during makeMove operation: ' + error);
  }
  return null;
};