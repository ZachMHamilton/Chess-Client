"use client"
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {  Flag, MessageSquare, Redo } from "lucide-react"
import Header from '@/components/ui/header'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { makeMove } from '@/lib/makeMove'


export default function Versus() {
  const [game, setGame] = useState<Chess>(new Chess());
  const [turn, setTurn] = useState<string>('user');

  useEffect(() => {
    if(turn == 'bot') {
      fetch('https://localhost:7198/api/Bot/move', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: 3,
          fen: game.fen(),
        })
      })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const newGame = new Chess(data.fen);
        setTurn('user');
        setGame(newGame);
      })
      .catch((error) => {
        console.error("Error fetching move from backend:", error);
      });
    }
  }, [turn, game]);
  
  const onDrop = (sourceSquare: string, targetSquare: string): boolean => {
    const result = makeMove({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    }, game);

    if (!result) {
      return false;
    }

    setGame(result);
    setTurn(turn == 'user' ? 'bot' : 'user');
    return true;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 h-[85vh] flex flex-col items-center justify-center">
            <CardContent className="h-full flex flex-col justify-center">
              <div className="flex justify-between items-center p-2">
                <CardTitle className="text-xl font-bold">Player 1</CardTitle>
                <span className="text-2xl font-bold">6:42</span>
              </div>
              <div>
              <Chessboard 
                customBoardStyle={{
                  borderRadius: "8px",
                  border: "2px solid rgba(255, 255, 255, 0.1)",
                }}
                customDarkSquareStyle={{
                  background: "linear-gradient(45deg, #374151, #2d3748)",
                }}
                customLightSquareStyle={{
                  background: "linear-gradient(45deg, #e2e8f0, #cbd5e1)",
                }}
                customPremoveDarkSquareStyle={{
                  background: "linear-gradient(45deg, #A42323, #831212)",
                }}
                customPremoveLightSquareStyle={{
                  background: "linear-gradient(45deg, #BD2828, #9B1E1E)",
                }}
                boardWidth={550}
                onPieceDrop={onDrop}
                position={game.fen()} 
                arePremovesAllowed={true}
              />
              </div>
              <div className="flex justify-between items-center p-2">
                <CardTitle className="text-xl font-bold">Player 2</CardTitle>
                <span className="text-2xl font-bold">5:12</span>
              </div>
            </CardContent>
          </Card>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Match Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button variant="outline" className="w-full py-6">
                    <Flag className="mr-2 h-5 w-5" />
                    Resign
                  </Button>
                  <Button variant="outline" className="w-full py-6">
                    Offer Draw
                  </Button>
                  <Button variant="outline" className="w-full py-6" disabled>
                    <Redo className="mr-2 h-5 w-5" />
                    Rematch
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Chat</CardTitle>
              </CardHeader>
              <CardContent>
                {/* All placeholders for now*/}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="text-sm">
                      <span className="font-medium">Player 1:</span> Good luck!
                    </p>
                    <p className="text-sm">
                      <span className="font-medium">Player 2:</span> You too!
                    </p>
                  </div>
                  <form className="flex items-center space-x-2">
                    <Input placeholder="Type a message..." />
                    <Button type="submit" size="icon">
                      <MessageSquare className="h-4 w-4" />
                      <span className="sr-only">Send message</span>
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}