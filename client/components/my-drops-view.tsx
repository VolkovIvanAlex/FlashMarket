"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import Image from "next/image"

const myDrops = [
  {
    id: 1,
    title: "Legendary Sneaker Auction",
    type: "auction",
    status: "live",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 250,
    participants: 12,
    revenue: 250,
    createdAt: "2024-01-15",
  },
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
  },
  {
    id: 3,
    title: "Rare Poster",
    type: "fcfs",
    status: "ended",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 45,
    participants: 156,
    revenue: 1350,
    createdAt: "2024-01-10",
  },
  {
    id: 4,
    title: "Vintage Watch",
    type: "auction",
    status: "draft",
    image: "/placeholder.svg?height=80&width=80",
    currentPrice: 0,
    participants: 0,
    revenue: 0,
    createdAt: "2024-01-12",
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

export function MyDropsView() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Drops</h1>
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
            {myDrops.map((drop) => (
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
                    <h3 className="font-semibold">{drop.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(drop.status)}
                      <Badge variant="outline">{drop.type === "auction" ? "Auction" : "FCFS"}</Badge>
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
                    <DropdownMenuItem>
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
