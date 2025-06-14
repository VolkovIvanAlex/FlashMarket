"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload } from "lucide-react"

export function CreateDropView() {
  const [dropType, setDropType] = useState("fcfs")
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    startTime: "",
    endTime: "",
    price: "",
    supply: "",
    image: null as File | null,
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission - integrate with API later
    console.log("Creating drop:", { ...formData, type: dropType })
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Create New Drop</h1>
        <p className="text-gray-600 mt-2">Set up your flash sale or auction</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Drop Type Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Drop Type</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={dropType} onValueChange={setDropType}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fcfs" id="fcfs" />
                <Label htmlFor="fcfs" className="cursor-pointer">
                  <div>
                    <p className="font-medium">First Come, First Serve</p>
                    <p className="text-sm text-gray-600">Items sold at fixed price until supply runs out</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="random" id="random" />
                <Label htmlFor="random" className="cursor-pointer">
                  <div>
                    <p className="font-medium">Random Selection</p>
                    <p className="text-sm text-gray-600">Winners selected randomly from all participants</p>
                  </div>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="auction" id="auction" />
                <Label htmlFor="auction" className="cursor-pointer">
                  <div>
                    <p className="font-medium">Auction</p>
                    <p className="text-sm text-gray-600">Bidding system with highest bidder winning</p>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Product Details */}
        <Card>
          <CardHeader>
            <CardTitle>Product Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                placeholder="Enter product name"
                required
              />
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Describe your product"
                rows={3}
                required
              />
            </div>

            <div>
              <Label htmlFor="image">Product Image</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="hidden" />
                <Label htmlFor="image" className="cursor-pointer">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="mt-2 text-sm text-gray-600">
                    {formData.image ? formData.image.name : "Click to upload image"}
                  </p>
                </Label>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pricing & Supply */}
        <Card>
          <CardHeader>
            <CardTitle>Pricing & Supply</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">{dropType === "auction" ? "Starting Price ($)" : "Price ($)"}</Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) => handleInputChange("price", e.target.value)}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
              </div>

              <div>
                <Label htmlFor="supply">Supply</Label>
                <Input
                  id="supply"
                  type="number"
                  value={formData.supply}
                  onChange={(e) => handleInputChange("supply", e.target.value)}
                  placeholder="Number of items"
                  min="1"
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Timing */}
        <Card>
          <CardHeader>
            <CardTitle>Timing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startTime">Start Time</Label>
                <Input
                  id="startTime"
                  type="datetime-local"
                  value={formData.startTime}
                  onChange={(e) => handleInputChange("startTime", e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="endTime">End Time</Label>
                <Input
                  id="endTime"
                  type="datetime-local"
                  value={formData.endTime}
                  onChange={(e) => handleInputChange("endTime", e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex gap-4">
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 flex-1">
            Create Drop
          </Button>
          <Button type="button" variant="outline" className="flex-1">
            Save as Draft
          </Button>
        </div>
      </form>
    </div>
  )
}
