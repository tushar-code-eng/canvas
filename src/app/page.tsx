import Navbar from "@/components/LandingPage/Navbar"
import Hero from "@/components/LandingPage/Hero"
import Features from "@/components/LandingPage/Features"
import Collaboration from "@/components/LandingPage/Collaboration"
import Showcase from "@/components/LandingPage/Showcase"
import Pricing from "@/components/LandingPage/Pricing"
import Testimonials from "@/components/LandingPage/Testimonials"
import FAQ from "@/components/LandingPage/FAQ"
import CTA from "@/components/LandingPage/CTA"
import Footer from "@/components/LandingPage/Footer"

export default function Home() {
  return (
    <main className="antialiased text-gray-800 min-h-screen flex flex-col">
      <Navbar />
      <Hero />
      <Features />
      <Collaboration />
      <Showcase />
      <Pricing />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  )
}

