'use client';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/router";

export default function App() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.replace('/home')
    } else {
      router.replace('/login')
    }
  }, [user, router])

  return null
}
