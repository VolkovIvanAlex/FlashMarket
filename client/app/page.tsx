"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { SignInView } from "@/components/auth/sign-in-view"
import { SignUpView } from "@/components/auth/sign-up-view"

export default function HomePage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authView, setAuthView] = useState<"signin" | "signup">("signin")
  const router = useRouter()

  useEffect(() => {
    // Check if user is authenticated (replace with real auth check)
    const isAuth = localStorage.getItem("isAuthenticated") === "true"
    if (isAuth) {
      router.push("/dashboard")
    } else {
      setIsAuthenticated(false)
    }
  }, [router])

  const handleSignIn = (email: string, password: string) => {
    // Mock authentication - replace with real auth logic
    console.log("Signing in:", { email, password })
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
    router.push("/dashboard")
  }

  const handleSignUp = (email: string, password: string, firstName: string, lastName: string) => {
    // Mock registration - replace with real auth logic
    console.log("Signing up:", { email, password, firstName, lastName })
    localStorage.setItem("isAuthenticated", "true")
    setIsAuthenticated(true)
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {authView === "signin" ? (
        <SignInView onSignIn={handleSignIn} onSwitchToSignUp={() => setAuthView("signup")} />
      ) : (
        <SignUpView onSignUp={handleSignUp} onSwitchToSignIn={() => setAuthView("signin")} />
      )}
    </div>
  )
}
