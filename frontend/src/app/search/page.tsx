import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import Header from "@/components/header"
import { Plane, ArrowRight, Filter, Star, Wifi, Utensils } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default function SearchResults() {
  const flights = [
    {
      id: 1,
      airline: "SkyWings",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "08:30", airport: "JFK", city: "New York" },
      arrival: { time: "14:45", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 599,
      class: "Economy",
      amenities: ["wifi", "meals"],
      rating: 4.5,
    },
    {
      id: 2,
      airline: "AirConnect",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "11:20", airport: "JFK", city: "New York" },
      arrival: { time: "18:30", airport: "CDG", city: "Paris" },
      duration: "8h 10m",
      stops: "1 stop",
      price: 449,
      class: "Economy",
      amenities: ["wifi"],
      rating: 4.2,
    },
    {
      id: 3,
      airline: "Premium Air",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "15:45", airport: "JFK", city: "New York" },
      arrival: { time: "22:00", airport: "CDG", city: "Paris" },
      duration: "7h 15m",
      stops: "Non-stop",
      price: 899,
      class: "Business",
      amenities: ["wifi", "meals"],
      rating: 4.8,
    },
    {
      id: 4,
      airline: "Budget Wings",
      logo: "/placeholder.svg?height=40&width=40",
      departure: { time: "06:15", airport: "JFK", city: "New York" },
      arrival: { time: "15:30", airport: "CDG", city: "Paris" },
      duration: "10h 15m",
      stops: "2 stops",
      price: 299,
      class: "Economy",
      amenities: [],
      rating: 3.9,
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header/> 

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Summary */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">New York (JFK) → Paris (CDG)</h1>
          <p className="text-gray-600">Tue, Dec 15 • 1 passenger • Economy</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="h-5 w-5" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                {/* Price Range */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Price Range</h3>
                  <Slider defaultValue={[200, 1000]} max={1000} min={200} step={50} className="mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>$200</span>
                    <span>$1000+</span>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Stops */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Stops</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="nonstop" />
                      <label htmlFor="nonstop" className="text-sm">
                        Non-stop
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="onestop" />
                      <label htmlFor="onestop" className="text-sm">
                        1 stop
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="twostops" />
                      <label htmlFor="twostops" className="text-sm">
                        2+ stops
                      </label>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Airlines */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3">Airlines</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="skywings" />
                      <label htmlFor="skywings" className="text-sm">
                        SkyWings
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="airconnect" />
                      <label htmlFor="airconnect" className="text-sm">
                        AirConnect
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="premiumair" />
                      <label htmlFor="premiumair" className="text-sm">
                        Premium Air
                      </label>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                {/* Departure Time */}
                <div>
                  <h3 className="font-medium mb-3">Departure Time</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" size="sm">
                      Morning
                    </Button>
                    <Button variant="outline" size="sm">
                      Afternoon
                    </Button>
                    <Button variant="outline" size="sm">
                      Evening
                    </Button>
                    <Button variant="outline" size="sm">
                      Night
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            {/* Sort Options */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">{flights.length} flights found</p>
              <Select defaultValue="price">
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="price">Price (Low to High)</SelectItem>
                  <SelectItem value="duration">Duration</SelectItem>
                  <SelectItem value="departure">Departure Time</SelectItem>
                  <SelectItem value="rating">Rating</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Flight Results */}
            <div className="space-y-4">
              {flights.map((flight) => (
                <Card key={flight.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                      {/* Airline Info */}
                      <div className="md:col-span-2">
                        <div className="flex items-center space-x-3">
                          <Image
                            src={flight.logo || "/placeholder.svg"}
                            alt={flight.airline}
                            width={40}
                            height={40}
                            className="rounded"
                          />
                          <div>
                            <p className="font-medium text-sm">{flight.airline}</p>
                            <div className="flex items-center space-x-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs text-gray-600">{flight.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Flight Details */}
                      <div className="md:col-span-6">
                        <div className="flex items-center justify-between">
                          <div className="text-center">
                            <p className="text-xl font-bold">{flight.departure.time}</p>
                            <p className="text-sm text-gray-600">{flight.departure.airport}</p>
                            <p className="text-xs text-gray-500">{flight.departure.city}</p>
                          </div>

                          <div className="flex-1 mx-4">
                            <div className="flex items-center justify-center space-x-2">
                              <div className="flex-1 border-t border-gray-300"></div>
                              <div className="text-center">
                                <Plane className="h-4 w-4 text-gray-400 mx-auto mb-1" />
                                <p className="text-xs text-gray-600">{flight.duration}</p>
                                <p className="text-xs text-gray-500">{flight.stops}</p>
                              </div>
                              <div className="flex-1 border-t border-gray-300"></div>
                            </div>
                          </div>

                          <div className="text-center">
                            <p className="text-xl font-bold">{flight.arrival.time}</p>
                            <p className="text-sm text-gray-600">{flight.arrival.airport}</p>
                            <p className="text-xs text-gray-500">{flight.arrival.city}</p>
                          </div>
                        </div>

                        {/* Amenities */}
                        <div className="flex items-center space-x-2 mt-3">
                          {flight.amenities.includes("wifi") && (
                            <Badge variant="secondary" className="text-xs">
                              <Wifi className="h-3 w-3 mr-1" />
                              WiFi
                            </Badge>
                          )}
                          {flight.amenities.includes("meals") && (
                            <Badge variant="secondary" className="text-xs">
                              <Utensils className="h-3 w-3 mr-1" />
                              Meals
                            </Badge>
                          )}
                          <Badge variant="outline" className="text-xs">
                            {flight.class}
                          </Badge>
                        </div>
                      </div>

                      {/* Price and Book */}
                      <div className="md:col-span-4 text-right">
                        <div className="mb-3">
                          <p className="text-2xl font-bold text-blue-600">${flight.price}</p>
                          <p className="text-sm text-gray-600">per person</p>
                        </div>
                        <Button asChild className="w-full md:w-auto">
                          <Link href={`/booking?flight=${flight.id}`}>
                            Select Flight
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
