/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { Chess } from 'chess.js';
import { fetchPuzzleData } from '../services/puzzleService';
import { makeMove } from '@/lib/makeMove';

type Puzzle = {
  fen: string;
  moves: string;
};

export const usePuzzle = (rating: number) => {
  const [game, setGame] = useState<Chess>(new Chess());
  const [puzzles, setPuzzles] = useState<Puzzle[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState(0);
  const [currentMove, setCurrentMove] = useState(1);
  const [moves, setMoves] = useState<{ before: string; after: string }[]>([]);
  const [feedback, setFeedback] = useState('');
  const [botTurn, setBotTurn] = useState(false);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [feedbackColor, setFeedbackColor] = useState<string>('text-gray-600');
  const [orientation, setOrientation] = useState<'white' | 'black'>('white');

  useEffect(() => {
    const loadPuzzles = async () => {
      const data = await fetchPuzzleData(rating);
      setPuzzles(data);
      if (data.length > 0 && data[0].fen) {
        setGame(new Chess(data[0].fen));
      }
    };
    loadPuzzles();
  }, [rating]);

  useEffect(() => {
    if (puzzles.length > 0 && puzzles[currentPuzzle].fen) {
      const puzzle = puzzles[currentPuzzle];
      setOrientation(puzzle.fen.split(' ')[1] === 'b' ? 'white' : 'black');
      const newGame = new Chess(puzzle.fen);
      setGame(newGame);
      setMoves(extractMoves(newGame));
    }
  }, [currentPuzzle, puzzles]);

  useEffect(() => {
    if (!botTurn || currentMove === moves.length) {
      return;
    }
    const result = makeMove({
      from: moves[currentMove].before,
      to: moves[currentMove].after,
      promotion: "q",
    }, game);
    if (!result) return;
    setCurrentMove(currentMove + 1);
    setBotTurn(!botTurn);
    setGame(new Chess(result.fen()));
  }, [botTurn]);

  useEffect(() => {
    if (puzzles.length > 0 && !moves[currentMove]) {
      setFeedback('Puzzle complete!');
      setTimeout(() => {
        nextPuzzle();
      }, 1500);
    }
  }, [currentMove]);


  const extractMoves = (current: Chess) => {
    const movesArray = puzzles[currentPuzzle]?.moves.split(' ');
    const moveList = movesArray?.map(move => ({
      before: move.substring(0, 2),
      after: move.substring(2, 4),
    })) || [];
    
    console.log(current.fen());
    setTimeout(() => {
      const newGame = makeMove({
        from: moveList[0].before,
        to: moveList[0].after,
        promotion: "q",
      }, current);
      if (newGame){
        setGame(newGame);
      }
    }, 1500);
    return moveList;
  };

  const onMoveMade = (sourceSquare: string, targetSquare: string): boolean => {
    const isMoveCorrect = sourceSquare === moves[currentMove]?.before && targetSquare === moves[currentMove]?.after;
    setFeedback(isMoveCorrect ? 'Correct move!' : `${sourceSquare} to ${targetSquare} is incorrect. Try again.`);
    setFeedbackColor(isMoveCorrect ? 'text-green-400' : 'text-red-600');
    setCurrentStreak(!isMoveCorrect ? 0 : moves[currentMove + 1] == undefined ? currentStreak + 1 : currentStreak);
    if (isMoveCorrect) {
      const result = makeMove({ from: sourceSquare, to: targetSquare, promotion: "q" }, game);
      if (!result) return false;
      setCurrentMove(currentMove + 1);
      setBotTurn(!botTurn);
      const newFen = result.fen();
      setGame(new Chess(newFen));
    }
    return isMoveCorrect;
  };

  const nextPuzzle = () => {
    if (currentPuzzle < puzzles.length - 1) {
      setCurrentPuzzle(currentPuzzle + 1);
      setCurrentMove(1);
      setFeedback('');
      setBotTurn(false);
      setGame(new Chess(puzzles[currentPuzzle + 1].fen));
    } else {
      setFeedback('Congratulations! You have completed all puzzles.');
    }
  };

  const previousPuzzle = () => {
    if (currentPuzzle > 0) {
      setCurrentPuzzle(currentPuzzle - 1);  
      setCurrentStreak(currentStreak > 0 ? currentStreak - 1 : 0);
    }
  };

  const getHint = () => {
    if (currentMove < moves.length) {
      setFeedback(`Hint: ${moves[currentMove].before.toLocaleUpperCase()} to move`);
      setFeedbackColor('text-blue-600');
      setCurrentStreak(0);
    }
  };

  return {
    game,
    feedback,
    feedbackColor,
    currentStreak,
    onMoveMade,
    nextPuzzle,
    botTurn,
    setBotTurn,
    currentMove,
    currentPuzzle,
    orientation,
    previousPuzzle,
    getHint
  };
};
