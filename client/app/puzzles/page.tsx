"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, RotateCcw, SkipForward } from 'lucide-react'
import Header from '@/components/ui/header'
import { Chessboard } from 'react-chessboard'

export default function Puzzles() {
  // [ ] Connect to puzzles API to get real data

  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
    <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 h-[85vh] flex items-center justify-center">
            {/* [ ] Replace with actual chessboard and real data*/}
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
              <Button variant="outline" className="w-full py-6">
                <SkipForward className="h-6 w-6" />
                <span className="sr-only">Next Puzzle</span>
              </Button>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Feedback</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-medium text-green-600 dark:text-green-400">Correct! Great move.</p>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  The knight fork threatens both the king and rook, forcing the opponent to lose material.
                </p>
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
                    <span className="text-2xl font-bold text-green-600 dark:text-green-400">7</span>
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