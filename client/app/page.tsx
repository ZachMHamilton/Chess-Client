"use client";
import { useContext } from "react";
import Home from "./home/page";
import { AuthContext } from "@/context/auth-context";
import Login from "./login/page";

export default function App() {
  const {user} = useContext(AuthContext);
  return (
    <div>
      {user != null ? (
        <Home />
      ) : (
        <Login />
      )}
    </div>
  );
}
