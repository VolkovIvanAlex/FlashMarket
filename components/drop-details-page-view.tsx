"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, Users, Heart, Share2 } from "lucide-react"
import Image from "next/image"

// Mock data - replace with API call
const mockDrops = [
  {
    id: 2,
    title: "Exclusive Hoodie Drop",
    type: "fcfs",
    status: "upcoming",
    image: "/placeholder.svg?height=400&width=400",
    currentPrice: 89,
    participants: 0,
    description: "Premium streetwear hoodie made from organic cotton",
    timeLeft: "4h 30m",
    supply: 50,
    sold: 0,
  },
  {
    id: 3,
    title: "Rare Poster",
    type: "fcfs",
    status: "ended",
    image: "/placeholder.svg?height=400&width=400",
    currentPrice: 45,
    participants: 30,
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
    image: "/placeholder.svg?height=400&width=400",
    currentPrice: 75,
    participants: 45,
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
    image: "/placeholder.svg?height=400&width=400",
    currentPrice: 25,
    participants: 156,
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
    image: "/placeholder.svg?height=400&width=400",
    currentPrice: 0,
    participants: 0,
    description: "Free gaming headset - random winner selection",
    timeLeft: "2d 4h",
    supply: 1,
    sold: 0,
  },
]

interface DropDetailsPageViewProps {
  dropId: string
}

export function DropDetailsPageView({ dropId }: DropDetailsPageViewProps) {
  const router = useRouter()
  const [isParticipating, setIsParticipating] = useState(false)

  // Find the drop by ID (replace with API call)
  const drop = mockDrops.find((d) => d.id === Number.parseInt(dropId))

  if (!drop) {
    return (
      <div className="space-y-6">
        <Button variant="ghost" size="sm" onClick={() => router.push("/drops")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Drops
        </Button>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Drop Not Found</h1>
          <p className="text-gray-600">The drop you're looking for doesn't exist.</p>
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
      case "draft":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Draft</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleParticipate = () => {
    setIsParticipating(true)
    console.log("Participating in drop:", drop.id)
    // Mock participation - replace with real API call
    setTimeout(() => {
      setIsParticipating(false)
      alert("Successfully registered for the drop!")
    }, 1000)
  }

  const canParticipate = drop.status === "live" && (drop.type === "random" || drop.participants < drop.supply)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" onClick={() => router.push("/drops")}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Drops
        </Button>
        <div className="flex items-center gap-2">
          {getStatusBadge(drop.status)}
          <Badge variant="outline">{drop.type === "random" ? "Random" : "FCFS"}</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Image and Details */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="aspect-square relative">
                <Image
                  src={drop.image || "/placeholder.svg"}
                  alt={drop.title}
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
              <p className="text-gray-600">{drop.description}</p>
            </CardContent>
          </Card>

          {/* Drop Details */}
          <Card>
            <CardHeader>
              <CardTitle>Drop Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Type</p>
                  <p className="font-semibold">
                    {drop.type === "random" ? "Random Selection" : "First Come First Serve"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">{drop.type === "random" ? "Winners" : "Supply"}</p>
                  <p className="font-semibold">{drop.supply}</p>
                </div>
                {drop.type !== "random" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Sold</p>
                      <p className="font-semibold">{drop.sold}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Remaining</p>
                      <p className="font-semibold">{drop.supply - drop.sold}</p>
                    </div>
                  </>
                )}
                {drop.type === "random" && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500">Participants</p>
                      <p className="font-semibold">{drop.participants}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Odds</p>
                      <p className="font-semibold">
                        {drop.participants > 0 ? `1 in ${Math.ceil(drop.participants / drop.supply)}` : "TBD"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Participation Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">{drop.title}</CardTitle>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{drop.timeLeft}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{drop.participants} participants</span>
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
              {/* Price Display */}
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="text-3xl font-bold text-green-600">${drop.currentPrice}</p>
              </div>

              <Separator />

              {/* Participation Section */}
              {canParticipate ? (
                <div className="space-y-4">
                  <div className="text-center">
                    {drop.type === "random" ? (
                      <>
                        <p className="text-sm text-gray-500 mb-2">
                          {drop.participants} participants registered • {drop.supply} winner{drop.supply > 1 ? "s" : ""}{" "}
                          will be selected
                        </p>
                        <Button
                          onClick={handleParticipate}
                          disabled={isParticipating}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          {isParticipating ? "Registering..." : "Enter Random Draw"}
                        </Button>
                        <p className="text-xs text-gray-500 mt-2">
                          Winners will be randomly selected when the drop ends
                        </p>
                      </>
                    ) : (
                      <>
                        <p className="text-sm text-gray-500 mb-2">
                          {drop.participants} / {drop.supply} participants registered
                        </p>
                        <Button
                          onClick={handleParticipate}
                          disabled={isParticipating || drop.participants >= drop.supply}
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          <Users className="w-4 h-4 mr-2" />
                          {isParticipating ? "Registering..." : "Participate in Drop"}
                        </Button>
                        {drop.participants >= drop.supply && (
                          <p className="text-sm text-red-500 mt-2">
                            Maximum number of participants reached for this drop
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  {drop.status === "upcoming" && <p className="text-gray-500">This drop hasn't started yet</p>}
                  {drop.status === "ended" && <p className="text-gray-500">This drop has ended</p>}
                  {drop.status === "draft" && <p className="text-gray-500">This drop is still in draft</p>}
                  {drop.status === "live" && drop.type === "fcfs" && drop.participants >= drop.supply && (
                    <p className="text-red-500">This drop is full</p>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Feed */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {drop.type === "random" ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>User123 entered the draw</span>
                      <span className="text-gray-500">1m ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User456 entered the draw</span>
                      <span className="text-gray-500">3m ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User789 entered the draw</span>
                      <span className="text-gray-500">5m ago</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>User123 purchased 2 items</span>
                      <span className="text-gray-500">1m ago</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>User456 purchased 1 item</span>
                      <span className="text-gray-500">3m ago</span>
                    </div>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
