"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import HomeHeader from "@/components/homePageHeader"
import { CalendarIcon, Plane, MapPin, Users, Star } from "lucide-react"
import { format } from "date-fns"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

export default function Homepage() {
  const [departDate, setDepartDate] = useState<Date>()
  const [returnDate, setReturnDate] = useState<Date>()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <HomeHeader/>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">Find Your Perfect Flight</h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Compare prices from hundreds of airlines and travel sites to get the best deals
            </p>
          </div>

          {/* Search Form */}
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                {/* From */}
                <div className="space-y-2">
                  <Label htmlFor="from">From</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="from" placeholder="Departure city" className="pl-10" />
                  </div>
                </div>

                {/* To */}
                <div className="space-y-2">
                  <Label htmlFor="to">To</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input id="to" placeholder="Destination city" className="pl-10" />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="space-y-2">
                  <Label>Departure</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {departDate ? format(departDate, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={departDate} onSelect={setDepartDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Return Date */}
                <div className="space-y-2">
                  <Label>Return</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {returnDate ? format(returnDate, "MMM dd") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar mode="single" selected={returnDate} onSelect={setReturnDate} initialFocus />
                    </PopoverContent>
                  </Popover>
                </div>

                {/* Passengers */}
                <div className="space-y-2">
                  <Label>Passengers</Label>
                  <Select defaultValue="1">
                    <SelectTrigger>
                      <Users className="mr-2 h-4 w-4" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 Passenger</SelectItem>
                      <SelectItem value="2">2 Passengers</SelectItem>
                      <SelectItem value="3">3 Passengers</SelectItem>
                      <SelectItem value="4">4+ Passengers</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-6">
                <Button asChild size="lg" className="w-full md:w-auto">
                  <Link href="/search">Search Flights</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Destinations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { city: "Paris", country: "France", price: "$299", image: "/placeholder.svg?height=200&width=300" },
              { city: "Tokyo", country: "Japan", price: "$599", image: "/placeholder.svg?height=200&width=300" },
              { city: "New York", country: "USA", price: "$199", image: "/placeholder.svg?height=200&width=300" },
              { city: "London", country: "UK", price: "$349", image: "/placeholder.svg?height=200&width=300" },
            ].map((destination, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="relative h-48">
                  <Image
                    src={destination.image || "/placeholder.svg"}
                    alt={destination.city}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg">{destination.city}</h3>
                  <p className="text-gray-600">{destination.country}</p>
                  <p className="text-blue-600 font-bold mt-2">From {destination.price}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose SkyBook?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
              <p className="text-gray-600">Compare prices from hundreds of airlines to find the best deals</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plane className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
              <p className="text-gray-600">Simple and secure booking process in just a few clicks</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock customer support for all your travel needs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Plane className="h-6 w-6" />
                <span className="text-lg font-bold">SkyBook</span>
              </div>
              <p className="text-gray-400">Your trusted partner for flight bookings worldwide.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="#" className="hover:text-white">
                    Twitter
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-white">
                    Instagram
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 SkyBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
