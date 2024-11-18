import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, RotateCcw, SkipForward } from 'lucide-react'
import Header from '@/components/ui/header'

export default function Puzzles() {
  return (
    <div className="flex flex-col min-h-screen max-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
    <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 h-[85vh] flex items-center justify-center">
            <CardContent className="flex-grow flex items-center justify-center h-full p-6">
              <div className="aspect-square flex justify-center items-center bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-lg shadow-inner h-full p-0">
                <span className="text-4xl">Chess Board Placeholder</span>
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