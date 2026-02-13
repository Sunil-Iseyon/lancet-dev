"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  const pathname = usePathname()

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* 404 Animation */}
        <div className="relative mb-8">
          <div className="absolute inset-0 blur-3xl opacity-30">
            <div className="w-64 h-64 mx-auto bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
          
          <div className="relative">
            <h1 className="text-9xl font-bold bg-gradient-to-r from-slate-900 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-400 dark:to-cyan-400 bg-clip-text text-transparent">
              404
            </h1>
            <div className="flex justify-center mt-4">
              <FileQuestion className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-bounce" />
            </div>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Page Not Found
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-md mx-auto">
            Oops! The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button asChild size="lg" className="gap-2">
            <Link href="/">
              <Home className="w-5 h-5" />
              Back to Home
            </Link>
          </Button>
        </div>

        {/* Popular Links */}
        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800">
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
            Try one of these popular pages:
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/about/team"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              About Us
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/about/contact"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Contact
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <Link
              href="/resources/dashboard-gallery"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Resources
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
