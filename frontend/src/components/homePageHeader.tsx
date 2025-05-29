import React from "react";
import { Button } from "./ui/button";
import { Plane } from "lucide-react";
import Link from "next/link";

export default function HomeHeader() {
    return(
        <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Plane className="h-8 w-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">SkyBook</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Flights
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Hotels
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Cars
              </Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600">
                Deals
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Sign In</Button>
              <Button>Sign Up</Button>
            </div>
          </div>
        </div>
      </header>
    )
}