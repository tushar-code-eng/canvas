"use client"

import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <section id="navbar" className="fixed w-full top-0 z-50">
      <nav className="bg-neutral-900 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="text-white text-xl font-bold">
                FlowDesign
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <Link href="#features" className="text-neutral-300 hover:text-white transition-colors">
                  Features
                </Link>
                <Link href="#collaboration" className="text-neutral-300 hover:text-white transition-colors">
                  Collaboration
                </Link>
                <Link href="#showcase" className="text-neutral-300 hover:text-white transition-colors">
                  Showcase
                </Link>
                <Link href="#pricing" className="text-neutral-300 hover:text-white transition-colors">
                  Pricing
                </Link>
                <Link href="#testimonials" className="text-neutral-300 hover:text-white transition-colors">
                  Testimonials
                </Link>
                <Link href="#faq" className="text-neutral-300 hover:text-white transition-colors">
                  FAQ
                </Link>
                <Link href="/signIn" className="font-semibold text-neutral-300 border rounded-xl border-neutral-300 px-4 py-2 hover:text-black hover:bg-white hover:border-white transition-colors">
                  SignIn
                </Link>

              </div>
            </div>
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-400 hover:text-white hover:bg-neutral-800 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path
                    className="inline-flex"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className={`md:hidden ${isMobileMenuOpen ? "" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-neutral-900">
            <Link href="#features" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              Features
            </Link>
            <Link href="#collaboration" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              Collaboration
            </Link>
            <Link href="#showcase" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              Showcase
            </Link>
            <Link href="#pricing" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              Testimonials
            </Link>
            <Link href="#faq" className="block px-3 py-2 text-neutral-300 hover:text-white transition-colors">
              FAQ
            </Link>
          </div>
        </div>
      </nav>
    </section>
  )
}

