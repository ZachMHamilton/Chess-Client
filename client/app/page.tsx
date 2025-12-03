'use client';
import { useContext, useEffect } from "react";
import { AuthContext } from "@/context/auth-context";
import { useRouter } from "next/navigation";

export default function App() {
  const { user } = useContext(AuthContext)
  const router = useRouter()

  useEffect(() => {
    if (user) {
      router.push('/home')
    } else {
      router.push('/login')
    }
  }, [user, router])

  return null
}
