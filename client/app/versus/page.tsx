import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {  Flag, MessageSquare, Redo } from "lucide-react"
import Header from '@/components/ui/header'

export default function Versus() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="md:col-span-2 h-[85vh] flex flex-col items-center justify-center">
            {/* All placeholders for now*/}
            <CardContent className="h-full flex flex-col justify-center">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl font-bold">Player 1</CardTitle>
                <span className="text-2xl font-bold">6:42</span>
              </div>
              <div className="aspect-square bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 rounded-lg shadow-inner flex items-center justify-center mb-2 h-5/6">
                <span className="text-4xl">Chess Board Placeholder</span>
              </div>
              <div className="flex justify-between items-center">
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
      <footer className="bg-white dark:bg-gray-800 shadow-sm mt-auto">
        <div className="container mx-auto px-4 py-6 text-center text-gray-600 dark:text-gray-300">
          © 2024 ChessMaster Pro. All rights reserved.
        </div>
      </footer>
    </div>
  )
}