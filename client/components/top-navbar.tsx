"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Plus, User, LogOut } from "lucide-react"
import { useWallet } from '@/hooks/useWallet'
import { useClearNode } from '@/hooks/useClearNode'
import { useEffect } from 'react'
import { Hex } from "viem"

interface TopNavbarProps {
  onSignOut: () => void
}

export function TopNavbar({ onSignOut }: TopNavbarProps) {
  const router = useRouter()
  const { isConnected, connectWallet, walletClient } = useWallet()
  const { connect } = useClearNode()

  useEffect(() => {
    if (walletClient) {
      connect(walletClient)
    }
  }, [walletClient, connect])

  const shortenedAddress = walletClient ? `${walletClient.account?.address.slice(0, 6)}...${walletClient.account?.address.slice(-4)}` : ''

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b bg-white px-6">
      <div className="flex items-center gap-2">
        <SidebarTrigger className="-ml-1" />
      </div>

      <div className="flex items-center gap-4">
        {isConnected ? (
          <Button variant="outline" disabled>
            {shortenedAddress}
          </Button>
        ) : (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        )}
        <Button onClick={() => router.push("/create-drop")} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Create New Drop
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-8 w-8 rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" alt="User" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuItem onClick={() => router.push("/settings")}>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={onSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}