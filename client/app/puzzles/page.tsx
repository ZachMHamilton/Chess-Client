"use client"
import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, SkipForward, SkipBack } from 'lucide-react'
import Header from '@/components/ui/header'
import { Chessboard } from 'react-chessboard'
import { usePuzzle } from '@/hooks/usePuzzle'

export default function Puzzles() {
  const [rating] = useState<number>(1000);
  const {
    game,
    feedback,
    feedbackColor,
    currentStreak,
    onMoveMade,
    nextPuzzle,
    orientation,
    previousPuzzle,
    getHint
  } = usePuzzle(rating);

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
                onPieceDrop={onMoveMade}
                position={game.fen()} 
                boardOrientation={orientation}
              />
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Button variant="outline" className="w-full py-6" onClick={() => getHint()}>
                <HelpCircle className="h-6 w-6" />
                <span className="sr-only">Hint</span>
              </Button>
              <Button variant="outline" className="w-full py-6" onClick={() => previousPuzzle()}>
                <SkipBack className="h-6 w-6" />
                <span className="sr-only">Previous Puzzle</span>
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