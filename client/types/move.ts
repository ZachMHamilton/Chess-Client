export interface Move {
  from: string;
  to: string;
  promotion?: string;
}
export interface ChessMove {
  color: string;
  from: string;
  to: string;
  flags: string;
  piece: string;
  san: string;
  captured?: string;
  promotion?: string;
}
