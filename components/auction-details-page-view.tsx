"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Users, Gavel, Heart, Share2, TrendingUp } from "lucide-react"
import Image from "next/image"

// Mock data - replace with API call
const mockAuctions = [
  {
    id: 1,
    title: "Legendary Sneaker Auction",
    status: "live",
    image: "/placeholder.svg?height=400&width=400",
    currentBid: 250,
    startingBid: 100,
    timeLeft: "2h 15m",
    bidders: 12,
    totalBids: 28,
    description: "Limited edition sneakers from top brand with certificate of authenticity",
  },
  {
    id: 4,
    title: "Vintage Watch Auction",
    status: "upcoming",
    image: "/placeholder.svg?height=400&width=400",
    currentBid: 0,
    startingBid: 500,
    timeLeft: "1d 4h",
    bidders: 0,
    totalBids: 0,
    description: "Rare vintage timepiece from 1960s in excellent condition",
  },
]

interface AuctionDetailsPageViewProps {
  auctionId: string
}

export function AuctionDetailsPageView({ auctionId }: AuctionDetailsPageViewProps) {
  const router = useRouter()
  const [bidAmount, setBidAmount] = useState("")
  const [isPlacingBid, setIsPlacingBid] = useState(false)

  // Find the auction by ID (replace with API call)
  const auction = mockAuctions.find((a) => a.id === Number.parseInt(auctionId))

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

  const canBid = auction.status === "live"
  const minimumBid = auction.currentBid > 0 ? auction.currentBid + 1 : auction.startingBid

  // Mock bid history
  const bidHistory = [
    { user: "User123", amount: 250, time: "2 minutes ago" },
    { user: "User456", amount: 240, time: "5 minutes ago" },
    { user: "User789", amount: 230, time: "8 minutes ago" },
    { user: "User321", amount: 220, time: "12 minutes ago" },
    { user: "User654", amount: 210, time: "15 minutes ago" },
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
                {auction.currentBid > 0 ? (
                  bidHistory.map((bid, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                      <div>
                        <p className="font-medium">{bid.user}</p>
                        <p className="text-sm text-gray-500">{bid.time}</p>
                      </div>
                      <p className="font-bold text-green-600">${bid.amount}</p>
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
