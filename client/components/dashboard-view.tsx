"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, DollarSign } from "lucide-react"
import Image from "next/image"

const mockDrops = [
  {
    id: 1,
    title: "Legendary Sneaker Auction",
    type: "auction",
    status: "live",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 250,
    timeLeft: "2h 15m",
    participants: 12,
    description: "Limited edition sneakers from top brand",
  },
  {
    id: 2,
    title: "Exclusive Hoodie Drop",
    type: "fcfs",
    status: "upcoming",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 89,
    timeLeft: "4h 30m",
    participants: 0,
    description: "Premium streetwear hoodie",
  },
  {
    id: 3,
    title: "Mystery NFT Collection",
    type: "random",
    status: "live",
    image: "/placeholder.svg?height=200&width=200",
    currentPrice: 25,
    timeLeft: "6h 20m",
    participants: 156,
    description: "Random selection from exclusive NFT collection - 10 winners",
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

export function DashboardView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Manage your drops and track performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Drops</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">1 live, 1 upcoming</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,245</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">168</div>
            <p className="text-xs text-muted-foreground">Across all drops</p>
          </CardContent>
        </Card>
      </div>

      {/* Current Drops */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Current Drops</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockDrops.map((drop) => (
            <Card key={drop.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square relative">
                <Image src={drop.image || "/placeholder.svg"} alt={drop.title} fill className="object-cover" />
                <div className="absolute top-3 left-3">{getStatusBadge(drop.status)}</div>
                <div className="absolute top-3 right-3">
                  <Badge variant="outline" className="bg-white/90">
                    {drop.type === "auction" ? "Auction" : drop.type === "random" ? "Random" : "FCFS"}
                  </Badge>
                </div>
              </div>
              <CardContent className="p-4">
                <h3 className="font-semibold text-lg mb-2">{drop.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{drop.description}</p>

                <div className="flex justify-between items-center mb-3">
                  <div>
                    <p className="text-sm text-gray-500">Current Price</p>
                    <p className="font-bold text-lg">${drop.currentPrice}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Participants</p>
                    <p className="font-bold text-lg">{drop.participants}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{drop.timeLeft}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
