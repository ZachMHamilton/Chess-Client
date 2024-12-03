'use client'
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthContext } from '@/context/auth-context'
import { useRouter } from 'next/navigation'
import { getUserStats, loginUser, registerUser } from '@/services/userService'

export default function Login() {
  const router = useRouter();
  const {setUser, setUserStats} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  
  async function handleRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  
    try {
      await registerUser(username, email, password, confirmPassword);
      setUser(username);
      await handleStats();
      router.push('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('Error registering: ' + error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  
  async function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
  
    try {
      await loginUser(username, password);
      setUser(username);
      await handleStats();
      router.push('/home');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('Error logging in: ' + error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  
  async function handleStats() {
    try {
      const stats = await getUserStats(username);
      setUserStats(stats);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError('Error fetching user stats: ' + error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
          {error && <div className='text-xl font-bold text-center text-red-600 p-2'>{error}</div>}
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-center">Welcome to ChessMaster</CardTitle>
            <CardDescription className="text-center">
              Enter your username and to sign in to your account or register an account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <form>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="email">Username</Label>
                      <Input id="string" type="text" required onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <Button className="w-full" onClick={(e) => handleLogin(e)}>Sign In</Button>
                  </div>
                </form>
              </TabsContent>
              <TabsContent value="register">
                <form>
                  <div className="grid gap-4">
                  <div className="grid gap-2">
                      <Label htmlFor="email">Username</Label>
                      <Input id="username" type="text" required onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="m@example.com" required onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="password">Password</Label>
                      <Input id="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input id="confirm-password" type="password" required onChange={(e) => setConfirmPassword(e.target.value)}/>
                    </div>
                    <Button className="w-full" onClick={(e) => handleRegister(e)}>Create Account</Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}