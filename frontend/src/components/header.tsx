import React from "react";
import { Button } from "./ui/button";
import { Plane } from "lucide-react";
import Link from "next/link";

export default function Header() {
    return(
      <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Plane className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">SkyBook</span>
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost">Sign In</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </div>
    </header>
    )
}