"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, RotateCcw, SkipForward } from 'lucide-react'
import Header from '@/components/ui/header'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { makeMove } from '@/lib/makeMove'

// [ ] Connect to puzzles API to get real data
export default function Puzzles() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [turn, setTurn] = useState<'white' | 'black'>('white');
  const [rating] = useState<number>(350);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [puzzles, setPuzzles] = useState<any[]>([]);
  const [currentPuzzle, setCurrentPuzzle] = useState<number>(0);
  const [moves, setMoves] = useState<{ before: string; after: string }[]>([]);
  const [currentMove, setCurrentMove] = useState<number>(1);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');
  const [botTurn, setBotTurn] = useState<boolean>(false);
  const [currentStreak, setCurrentStreak] = useState<number>(0);
  const [feedbackColor, setFeedbackColor] = useState<string>('text-gray-600');

  useEffect(() => {
    // Fetch the active game for the user
    fetch(`https://localhost:7198/api/Puzzle/next/?rating=${rating}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
          }
        return response.json();
        })
        .then((data) => {
          setPuzzles(data);
          setLoaded(true);
          if (data[0].fen != null) {
            setGame(new Chess(data[0].fen));
          }
        })
        .catch((error) => {
            console.error("Error fetching puzzles from backend:", error);
        });
  }, [rating]); 

  useEffect(() => {
    if (loaded) {
      setTurn(puzzles[currentPuzzle].fen.split(' ')[1] === 'b' ? 'white' : 'black');
      setGame(new Chess(puzzles[currentPuzzle].fen));
      setMoves(extractMoves());
    }
  }, [currentPuzzle, loaded, puzzles, turn]);

  useEffect(() => {
    if (!botTurn || currentMove === moves.length) {
      return;
    }
    const result = makeMove({
      from: moves[currentMove].before,
      to: moves[currentMove].after,
      promotion: "q",
    }, game);

    setCurrentMove(currentMove + 1);
    const nextMove = moves[currentMove + 1];

    if (nextMove === undefined) {
      setFeedback('Puzzle complete!');
      return;
    }

    if (!result) {
      return;
    }

    const newFen = result.fen();
    setGame(new Chess(newFen));
    setBotTurn(botTurn ? false : true);
  }, [botTurn, currentMove, game, moves]);

  const nextPuzzle = () => {
    if (currentPuzzle !== puzzles.length - 1) {
      setBotTurn(false);
      setCurrentPuzzle(currentPuzzle + 1);
      setGame(new Chess(puzzles[currentPuzzle + 1].fen));
      setFeedback('');
      setCurrentMove(1);
    } else {
      setFeedback('Congratulations! You have completed all puzzles.');
    }
  }

  const extractMoves = () => {
    // Split the string into individual moves
    const movesArray: string[] = puzzles[currentPuzzle].moves.split(' ');

    const result = movesArray.map(move => {
        const before = move.substring(0, 2);
        const after = move.substring(2, 4);
        return { before, after };
    });

    setTimeout(() => {
      const newGame = makeMove({
        from: result[0].before,
        to: result[0].after,
        promotion: "q",
      }, game);
      if (newGame){
        setGame(newGame);
      }
    }, 1000);

    return result;
};

const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
  const isMoveCorrect = sourceSquare === moves[currentMove].before && targetSquare === moves[currentMove].after;
  const feedbackMessage = isMoveCorrect
    ? "Correct move!"
    : `${sourceSquare.toLocaleUpperCase()} to ${targetSquare.toLocaleUpperCase()} is incorrect. Try again.`;

  setFeedback(feedbackMessage);
  setCurrentStreak(!isMoveCorrect ? 0 : moves[currentMove+1] == undefined ? currentStreak + 1 : currentStreak);

  // Update feedback color and message
  setFeedbackColor(isMoveCorrect ? "text-green-400" : "text-red-600");

  if (isMoveCorrect) {
    // Perform the move and update game state
    const result = makeMove({ from: sourceSquare, to: targetSquare, promotion: "q" }, game);
    if (!result) return false;

    setCurrentMove(currentMove + 1);
    const nextMove = moves[currentMove + 1];
    if (!nextMove) {
      setFeedback('Puzzle complete!');
    }
    setBotTurn(!botTurn);

    const newFen = result.fen();
    setGame(new Chess(newFen));
  }

  return isMoveCorrect;
};


  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
    <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 h-[85vh] flex items-center justify-center">
            <CardContent className="flex-grow flex items-center justify-center h-full p-6">
              <div>
              <Chessboard 
                customBoardStyle={{
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                }}
                customDarkSquareStyle={{
                  backgroundColor: "#0f1217",
                  background: "linear-gradient(45deg, #374151, #2d3748)",
                }}
                customLightSquareStyle={{
                  backgroundColor: "#e2e8f0",
                  background: "linear-gradient(45deg, #e2e8f0, #cbd5e1)",
                }}
                boardWidth={600}
                onPieceDrop={onDrop}
                position={game.fen()} 
                boardOrientation={turn}
              />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="w-full py-6">
                <HelpCircle className="h-6 w-6" />
                <span className="sr-only">Hint</span>
              </Button>
              <Button variant="outline" className="w-full py-6">
                <RotateCcw className="h-6 w-6" />
                <span className="sr-only">Retry</span>
              </Button>
              <Button variant="outline" className="w-full py-6" onClick={() => nextPuzzle()}>
                <SkipForward className="h-6 w-6" />
                <span className="sr-only">Next Puzzle</span>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p id='feedback' className={`text-lg font-medium ${feedbackColor}`}>{feedback}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Puzzle Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Current Streak</span>
                    <span id='feedback' className={`text-2xl font-bold ${feedbackColor}`}>{currentStreak}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}