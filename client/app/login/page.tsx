'use client'
import React, { useContext, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AuthContext } from '@/context/auth-context'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter();
  const {setUser, setUserStats} = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  
  function handleRegister(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    fetch('https://localhost:7198/api/User/register/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          email: email,
          password: password,
          confirmPassword: confirmPassword,
      })
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setUser(username);
        handleStats();
        router.push('/home');
      })
      .catch((error) => {
        console.error("Error registering:", error);
      });
  }

  function handleLogin(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    fetch('https://localhost:7198/api/User/login/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          username: username,
          password: password,
      })
    })
      .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        setUser(username);
        handleStats();
        router.push('/home');
      })
      .catch((error) => {
        console.error("Error logging in:", error);
      });
  }

  function handleStats(){
    fetch(`https://localhost:7198/api/User/${username}/`, {
      method: 'GET',
      headers: {
          'Content-Type': 'application/json'
      },
    })
      .then((response) => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
      })
      .then((data) => {
          setUserStats(data);
      })
      .catch((error) => {
          console.error("Error fetching user stats:", error);
      });
  }
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-indigo-950">
      <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
        <Card className="w-full max-w-md">
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