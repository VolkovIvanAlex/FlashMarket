"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

const auctionDrops = [
  {
    id: 1,
    title: "Legendary Sneaker Auction",
    status: "live",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: 250,
    startingBid: 100,
    timeLeft: "2h 15m",
    bidders: 12,
    totalBids: 28,
    description: "Limited edition sneakers from top brand",
  },
  {
    id: 4,
    title: "Vintage Watch Auction",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: 0,
    startingBid: 500,
    timeLeft: "1d 4h",
    bidders: 0,
    totalBids: 0,
    description: "Rare vintage timepiece from 1960s",
  },
]

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

interface AuctionsViewProps {
  onViewAuction: (auction: any) => void
}

export function AuctionsView({ onViewAuction }: AuctionsViewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Auctions</h1>
        <p className="text-gray-600 mt-2">Track your auction performance and bidding activity</p>
      </div>

      {/* Auction Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">1 upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Bids</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">From 12 bidders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Highest Bid</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$250</div>
            <p className="text-xs text-muted-foreground">150% above starting</p>
          </CardContent>
        </Card>
      </div>

      {/* Auction Items */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Auction Items</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {auctionDrops.map((auction) => (
            <Card key={auction.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <Image src={auction.image || "/placeholder.svg"} alt={auction.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">{getStatusBadge(auction.status)}</div>
              </div>
              <CardContent className="p-6">
                <button
                  onClick={() => onViewAuction(auction)}
                  className="font-semibold text-xl mb-2 text-left hover:text-blue-600 transition-colors"
                >
                  {auction.title}
                </button>
                <p className="text-gray-600 mb-4">{auction.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Current Bid</p>
                    <p className="font-bold text-2xl text-green-600">
                      {auction.currentBid > 0 ? `$${auction.currentBid}` : "No bids yet"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Starting Bid</p>
                    <p className="font-semibold text-lg">${auction.startingBid}</p>
                  </div>
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>{auction.timeLeft}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Users className="w-4 h-4" />
                    <span>{auction.bidders} bidders</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1" onClick={() => onViewAuction(auction)}>
                    View Details
                  </Button>
                  <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Manage Auction</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
