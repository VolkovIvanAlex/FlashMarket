"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const allDrops = [
  {
    id: 2,
    title: "Exclusive Hoodie Drop",
    type: "fcfs",
    status: "upcoming",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 89,
    participants: 0,
    revenue: 0,
    createdAt: "2024-01-14",
    description: "Premium streetwear hoodie",
    timeLeft: "4h 30m",
    supply: 50,
    sold: 0,
  },
  {
    id: 3,
    title: "Rare Poster",
    type: "fcfs",
    status: "ended",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 45,
    participants: 30,
    revenue: 1350,
    createdAt: "2024-01-10",
    description: "Vintage movie poster - sold out in 3 minutes",
    timeLeft: "Ended",
    supply: 30,
    sold: 30,
  },
  {
    id: 5,
    title: "Limited Art Print",
    type: "fcfs",
    status: "live",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 75,
    participants: 45,
    revenue: 225,
    createdAt: "2024-01-16",
    description: "Exclusive digital art print",
    timeLeft: "1h 45m",
    supply: 50,
    sold: 3,
  },
  {
    id: 6,
    title: "Mystery NFT Collection",
    type: "random",
    status: "live",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 25,
    participants: 156,
    revenue: 3900,
    createdAt: "2024-01-17",
    description: "Random selection from exclusive NFT collection",
    timeLeft: "6h 20m",
    supply: 10,
    sold: 0,
  },
  {
    id: 7,
    title: "Gaming Headset Giveaway",
    type: "random",
    status: "upcoming",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 0,
    participants: 0,
    revenue: 0,
    createdAt: "2024-01-18",
    description: "Free gaming headset - random winner selection",
    timeLeft: "2d 4h",
    supply: 1,
    sold: 0,
  },
  {
    id: 8,
    title: "Sneaker Collection Drop",
    type: "fcfs",
    status: "live",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 120,
    participants: 25,
    revenue: 3000,
    createdAt: "2024-01-19",
    description: "Limited edition sneaker collection",
    timeLeft: "3h 10m",
    supply: 100,
    sold: 25,
  },
  {
    id: 9,
    title: "Digital Art Raffle",
    type: "random",
    status: "ended",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 15,
    participants: 89,
    revenue: 1335,
    createdAt: "2024-01-12",
    description: "Exclusive digital artwork - 3 winners selected",
    timeLeft: "Ended",
    supply: 3,
    sold: 3,
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
    case "draft":
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

interface DropsViewProps {
  onViewDrop: (drop: any) => void
}

export function DropsView({ onViewDrop }: DropsViewProps) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Drops</h1>
          <p className="text-gray-600 mt-2">Manage all your drops and track performance</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">Create New Drop</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Drops</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {allDrops.map((drop) => (
              <div
                key={drop.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Image
                    src={drop.image || "/placeholder.svg"}
                    alt={drop.title}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                  <div>
                    <button
                      onClick={() => onViewDrop(drop)}
                      className="font-semibold text-left hover:text-blue-600 transition-colors"
                    >
                      {drop.title}
                    </button>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(drop.status)}
                      <Badge variant="outline">{drop.type === "random" ? "Random" : "FCFS"}</Badge>
                    </div>
                  </div>
                </div>

                <div className="hidden md:flex items-center gap-8 text-sm">
                  <div className="text-center">
                    <p className="text-gray-500">Price</p>
                    <p className="font-semibold">${drop.currentPrice}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Participants</p>
                    <p className="font-semibold">{drop.participants}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold">${drop.revenue}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onViewDrop(drop)}>
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
