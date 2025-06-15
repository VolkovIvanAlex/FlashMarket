"use client"

import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, Users, TrendingUp } from "lucide-react"
import Image from "next/image"

const auctionDrops = [
  {
    id: "1",
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
      {
        id: "participation-001",
        user: {
          id: "user-bidder-001",
          email: "bidder1@example.com",
          username: "bidderOne",
          avatarUrl: "https://example.com/avatars/bidder1.png",
        },
        queueIndex: 1,
        joinedAt: "2025-06-13T10:01:00.000Z",
      },
      {
        id: "participation-002",
        user: {
          id: "user-bidder-002",
          email: "bidder2@example.com",
          username: "bidderTwo",
          avatarUrl: "https://example.com/avatars/bidder2.png",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T10:03:00.000Z",
      },
      {
        id: "participation-003",
        user: {
          id: "user-bidder-003",
          email: "bidder3@example.com",
          username: "bidderThree",
          avatarUrl: "https://example.com/avatars/bidder3.png",
        },
        queueIndex: 3,
        joinedAt: "2025-06-13T10:04:00.000Z",
      },
    ],
  },

  // New drop 1
  {
    id: "4",
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
      {
        id: "participation-004",
        user: {
          id: "user-bidder-004",
          email: "kickslover@example.com",
          username: "kicksFan",
          avatarUrl: "https://example.com/avatars/kickslover.png",
        },
        queueIndex: 1,
        joinedAt: "2025-06-13T09:00:00.000Z",
      },
      {
        id: "participation-005",
        user: {
          id: "user-bidder-005",
          email: "sneakerhead@example.com",
          username: "sneakerPro",
          avatarUrl: "https://example.com/avatars/sneakerhead.png",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T09:05:00.000Z",
      },
    ],
  },

  // New drop 2
  {
    id: "10",
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
      {
        id: "participation-006",
        user: {
          id: "user-bidder-006",
          email: "watchlover@example.com",
          username: "chronoKing",
          avatarUrl: "https://example.com/avatars/watchlover.png",
        },
        queueIndex: 1,
        joinedAt: "2025-06-13T08:30:00.000Z",
      },
      {
        id: "participation-007",
        user: {
          id: "user-bidder-007",
          email: "collector@example.com",
          username: "luxCollect",
          avatarUrl: "https://example.com/avatars/collector.png",
        },
        queueIndex: 2,
        joinedAt: "2025-06-13T08:35:00.000Z",
      },
      {
        id: "participation-008",
        user: {
          id: "user-bidder-008",
          email: "timefan@example.com",
          username: "tickTock",
          avatarUrl: "https://example.com/avatars/timefan.png",
        },
        queueIndex: 3,
        joinedAt: "2025-06-13T08:36:30.000Z",
      },
    ],
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

export function AuctionsPageView() {
  const router = useRouter()

  const handleViewAuction = (auctionId: number) => {
    router.push(`/auction/${auctionId}`)
  }

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
                  onClick={() => handleViewAuction(auction.id)}
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
                  <Button variant="outline" className="flex-1" onClick={() => handleViewAuction(auction.id)}>
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
