import React from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TabsContent, TabsList, TabsTrigger, Tabs } from "@/components/ui/tabs"
import { AwardIcon, CastleIcon, TrendingUp, Trophy, UserPen } from 'lucide-react'
import Header from '@/components/ui/header'

// [ ] Connect to users API to get real data
export default function Profile() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardContent className="flex items-center space-x-4 pt-6">
              <UserPen size={42}/>
              <div>
                <h2 className="text-2xl font-bold">Zach Hamilton</h2>
                <p className="text-gray-500 dark:text-gray-400">Chess Enthusiast</p>
              </div>
            </CardContent>
          </Card>
          {/* Placeholder values for now*/}
          <Tabs defaultValue="stats" className="space-y-4">
            <TabsList>
              <TabsTrigger value="stats">Stats</TabsTrigger>
              <TabsTrigger value="history">Game History</TabsTrigger>
            </TabsList>
            <TabsContent value="stats" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Games</CardTitle>
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">245</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                    <Trophy className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">62%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">ELO Rating</CardTitle>
                    <AwardIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1250</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Puzzles Solved</CardTitle>
                    <CastleIcon className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">528</div>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Performance Over Time</CardTitle>
                  <CardDescription>Your ELO rating progress over the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] bg-gradient-to-r from-blue-200 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-md" />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="history" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">vs. Player123</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Won in 32 moves</p>
                      </div>
                      <Button variant="outline">Review</Button>
                    </li>
                    <li className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">vs. ChessMaster99</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Lost in 45 moves</p>
                      </div>
                      <Button variant="outline">Review</Button>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}