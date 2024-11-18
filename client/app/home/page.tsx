"use client"
import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { CircuitBoard, Users } from 'lucide-react'
import Header from '@/components/ui/header'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4 text-gray-800 dark:text-white">Welcome!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">Enhance your chess skills with puzzles and head-to-head gameplay</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg" onClick={() => router.push('/puzzles')}>
              <CircuitBoard className="mr-2 h-5 w-5" />
              Solve Puzzles
            </Button>
            <Button size="lg" variant="outline" onClick={() => router.push('/versus')}>
              <Users className="mr-2 h-5 w-5" />
              Play a Match
            </Button>
          </div>
        </section>
        <Tabs defaultValue="stats" className="max-w-3xl mx-auto">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="stats">Your Stats</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
          </TabsList>
          <TabsContent value="stats">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Your chess journey at a glance</CardDescription>
              </CardHeader>
              {/* All placeholders for now*/}
              <CardContent className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Puzzles Solved</span>
                  <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">247</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Current Streak</span>
                  <span className="text-3xl font-bold text-green-600 dark:text-green-400">7 days</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Games Played</span>
                  <span className="text-3xl font-bold text-purple-600 dark:text-purple-400">52</span>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Win Rate</span>
                  <span className="text-3xl font-bold text-orange-600 dark:text-orange-400">62%</span>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="quick-start">
            <Card>
              <CardHeader>
                <CardTitle>Jump Right In</CardTitle>
                <CardDescription>Start enhancing your chess skills now</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <Button className="h-20 text-lg" variant="outline" onClick={() => router.push('/puzzles')}>
                  <CircuitBoard className="mr-2 h-6 w-6" />
                  Daily Puzzle Challenge
                </Button>
                <Button className="h-20 text-lg" variant="outline" onClick={() => router.push('/versus')}>
                  <Users className="mr-2 h-6 w-6" />
                  Quick Match (5 min)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}