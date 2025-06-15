"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Users, Gavel, Heart, Share2, TrendingUp, X } from "lucide-react"
import Image from "next/image"
import { useWallet } from "@/hooks/useWallet"
import { useClearNode } from "@/hooks/useClearNode"

// Mock data - replace with API call
const auctionDrops = [
  {
    id: 1,
    title: "Exclusive Art Auction",
    status: "live",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: 0,
    startingBid: 0,
    timeLeft: "24h 0m",
    bidders: 3,
    totalBids: 3,
    description: "Bid on a rare digital art piece.",
    participants: [
      // {
      //   id: "participation-001",
      //   user: {
      //     id: "user-bidder-001",
      //     email: "bidder1@example.com",
      //     username: "bidderOne",
      //     avatarUrl: "https://example.com/avatars/bidder1.png",
      //     publicKey: process.env.NEXT_PUBLIC_SESSION_KEY_PUBLIC_KEY,
      //     allocation: "0.0001",
      //   },
      //   queueIndex: 1,
      //   joinedAt: "2025-06-13T10:01:00.000Z",
      // },
      {
        id: "participation-002",
        user: {
          id: "user-bidder-002",
          email: "bidder2@example.com",
          username: "bidderTwo",
          avatarUrl: "https://example.com/avatars/bidder2.png",
          publicKey: process.env.NEXT_PUBLIC_WALLET_2_PUBLIC_KEY,
          allocation: "0.0002",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T10:03:00.000Z",
      },
    ],
  },

  // New drop 1
  {
    id: 4,
    title: "Rare Sneaker Auction",
    status: "live",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: 220,
    startingBid: 150,
    timeLeft: "12h 45m",
    bidders: 2,
    totalBids: 5,
    description: "Limited edition sneakers from a top designer.",
    participants: [
      // {
      //   id: "participation-001",
      //   user: {
      //     id: "user-bidder-001",
      //     email: "bidder1@example.com",
      //     username: "bidderOne",
      //     avatarUrl: "https://example.com/avatars/bidder1.png",
      //     publicKey: process.env.NEXT_PUBLIC_SESSION_KEY_PUBLIC_KEY,
      //     allocation: "0.0001",
      //   },
      //   queueIndex: 1,
      //   joinedAt: "2025-06-13T10:01:00.000Z",
      // },
      {
        id: "participation-002",
        user: {
          id: "user-bidder-002",
          email: "bidder2@example.com",
          username: "bidderTwo",
          avatarUrl: "https://example.com/avatars/bidder2.png",
          publicKey: process.env.NEXT_PUBLIC_WALLET_2_PUBLIC_KEY,
          allocation: "0.0002",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T10:03:00.000Z",
      },
    ],
  },

  // New drop 2
  {
    id: 10,
    title: "Luxury Watch Auction",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: 0,
    startingBid: 1200,
    timeLeft: "2d 3h",
    bidders: 0,
    totalBids: 0,
    description: "Auction for a classic Swiss luxury watch.",
    participants: [
      // {
      //   id: "participation-001",
      //   user: {
      //     id: "user-bidder-001",
      //     email: "bidder1@example.com",
      //     username: "bidderOne",
      //     avatarUrl: "https://example.com/avatars/bidder1.png",
      //     publicKey: process.env.NEXT_PUBLIC_SESSION_KEY_PUBLIC_KEY,
      //     allocation: "0.0001",
      //   },
      //   queueIndex: 1,
      //   joinedAt: "2025-06-13T10:01:00.000Z",
      // },
      {
        id: "participation-002",
        user: {
          id: "user-bidder-002",
          email: "bidder2@example.com",
          username: "bidderTwo",
          avatarUrl: "https://example.com/avatars/bidder2.png",
          publicKey: process.env.NEXT_PUBLIC_WALLET_2_PUBLIC_KEY,
          allocation: "0.0002",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T10:03:00.000Z",
      },
    ],
  },
]

interface AuctionDetailsPageViewProps {
  auctionId: string
}

export function AuctionDetailsPageView({ auctionId }: AuctionDetailsPageViewProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState("")
  const [isPlacingBid, setIsPlacingBid] = useState(false)
  const [isCreatingSession, setIsCreatingSession] = useState(false)
  const [isClosingSession, setIsClosingSession] = useState(false)
  const { isConnected, walletClient } = useWallet()
  const { isAuthenticated, connect, createApplicationSession, closeApplicationSession, getLedgerBalances } = useClearNode()

  // Find the auction by ID (replace with API call)
  const auction = auctionDrops.find((a) => a.id === Number.parseInt(auctionId))

  useEffect(() => {
    if (isAuthenticated && walletClient) {
        getLedgerBalances(walletClient.account!.address);
    }
}, [isAuthenticated, !!walletClient]);

  // Connect to ClearNode when wallet is connected
  useEffect(() => {
    if (isConnected && walletClient && !isAuthenticated) {
      console.log("Connecting to ClearNode...");
      connect(walletClient)
        .then(() => console.log("ClearNode connection initiated"))
        .catch((error) => console.error("Failed to connect to ClearNode:", error));
    }
  }, [isConnected, walletClient, isAuthenticated, connect]);

  if (!auction) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/auctions")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Auction Not Found</h1>
          <p className="text-gray-600">The auction you're looking for doesn't exist.</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "live":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Live</Badge>
      case "upcoming":
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Upcoming</Badge>
      case "ended":
        return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Ended</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handlePlaceBid = () => {
    setIsPlacingBid(true)
    console.log("Placing bid:", bidAmount)
    // Mock bid placement - replace with real API call
    setTimeout(() => {
      setIsPlacingBid(false)
      setBidAmount("")
      alert("Bid placed successfully!")
    }, 1000)
  }

  const handleCreateSession = async () => {
    if (!walletClient) return

    setIsCreatingSession(true)
    try {
      await createApplicationSession(walletClient.account!.address, auction)
      alert("Session created successfully!")
    } catch (error) {
      console.error("Error creating session:", error)
      alert("Failed to create session.")
    } finally {
      setIsCreatingSession(false)
    }
  }

  const handleCloseSession = async () => {
    if (!walletClient) return

    setIsClosingSession(true)
    try {
      await closeApplicationSession(walletClient.account!.address, 0, auction)
      alert("Session closed successfully!")
    } catch (error) {
      console.error("Error closing session:", error)
      alert("Failed to close session.")
    } finally {
      setIsClosingSession(false)
    }
  }

  const canBid = auction.status === "live"
  const minimumBid = auction.currentBid > 0 ? auction.currentBid + 1 : auction.startingBid
  console.log("isConnected = " , isConnected);
  console.log("isAuthenticated = " , isAuthenticated);
  console.log("walletClient = " , walletClient);
  const canCreateSession = auction.status === "live" && isConnected && !!walletClient
  const canCloseSession = canCreateSession && !!localStorage.getItem('app_session_id')

  // Bid history with new entries
  const bidHistory = [
    {
      user: "0x5fdEf9476FDe30cDa6a84f9207D475748Ddfa7F9",
      amount: "0.0001 USDC",
      time: "10 minutes ago",
    },
    {
      user: "0x0d2E193A5428ecD15Ea805cD75A3B851BfacDFab",
      amount: "0.0002 USDC",
      time: "15 minutes ago",
    },
    ...auction.currentBid > 0 ? [
      { user: "User123", amount: "$250", time: "2 minutes ago" },
      { user: "User456", amount: "$240", time: "5 minutes ago" },
      { user: "User789", amount: "$230", time: "8 minutes ago" },
      { user: "User321", amount: "$220", time: "12 minutes ago" },
      { user: "User654", amount: "$210", time: "15 minutes ago" },
    ] : [],
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/auctions")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Auctions
        </Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(auction.status)}
          <Badge variant="outline">Auction</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardContent>
          </Card>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{auction.description}</p>
            </CardContent>
          </Card>

          {/* Auction Details */}
          <Card>
            <CardHeader>
              <CardTitle>Auction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Starting Bid</p>
                  <p className="font-semibold">${auction.startingBid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Bids</p>
                  <p className="font-semibold">{auction.totalBids || 0}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Bidders</p>
                  <p className="font-semibold">{auction.bidders}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Time Left</p>
                  <p className="font-semibold">{auction.timeLeft}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Bidding Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{auction.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{auction.timeLeft}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{auction.bidders} bidders</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Heart className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Current Bid Display */}
              <div>
                <p className="text-sm text-gray-500">Current Bid</p>
                <p className="text-3xl font-bold text-green-600">
                  {auction.currentBid > 0 ? `$${auction.currentBid}` : "No bids yet"}
                </p>
                {auction.currentBid > 0 && (
                  <div className="flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>
                      {Math.round(((auction.currentBid - auction.startingBid) / auction.startingBid) * 100)}% above
                      starting bid
                    </span>
                  </div>
                )}
              </div>

              <Separator />

              {/* Bidding Section */}
              {canBid ? (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="bidAmount">Your Bid ($)</Label>
                    <Input
                      id="bidAmount"
                      type="number"
                      placeholder={`Minimum: $${minimumBid}`}
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={minimumBid}
                    />
                    <p className="text-xs text-gray-500 mt-1">Minimum bid: ${minimumBid}</p>
                  </div>
                  <Button
                    onClick={handlePlaceBid}
                    disabled={!bidAmount || Number.parseFloat(bidAmount) < minimumBid || isPlacingBid}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Gavel className="w-4 h-4 mr-2" />
                    {isPlacingBid ? "Placing Bid..." : "Place Bid"}
                  </Button>
                  <Button
                    onClick={handleCreateSession}
                    disabled={!canCreateSession || isCreatingSession}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {isCreatingSession ? "Creating Session..." : "Create Session"}
                  </Button>
                  <Button
                    onClick={handleCloseSession}
                    disabled={!canCloseSession || isClosingSession}
                    className="w-full bg-red-600 hover:bg-red-700"
                  >
                    <X className="w-4 h-4 mr-2" />
                    {isClosingSession ? "Closing Session..." : "Close Session"}
                  </Button>
                </div>
              ) : (
                <div className="text-center py-4">
                  {auction.status === "upcoming" && <p className="text-gray-500">This auction hasn't started yet</p>}
                  {auction.status === "ended" && <p className="text-gray-500">This auction has ended</p>}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Bid History */}
          <Card>
            <CardHeader>
              <CardTitle>Bid History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {bidHistory.length > 0 ? (
                  bidHistory.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{bid.user}</p>
                        <p className="text-sm text-gray-500">{bid.time}</p>
                      </div>
                      <p className="font-bold text-green-600">{bid.amount}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center py-4">No bids yet. Be the first to bid!</p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
