"use client"
import { useEffect, useRef } from "react"
import Image from "next/image"

export default function Showcase() {
  const showcaseRef = useRef<HTMLElement | null>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate__animated")
          }
        })
      },
      {
        threshold: 0.1,
      },
    )

    if (!showcaseRef.current) return;

    const animatedElements = showcaseRef.current.querySelectorAll(".animate__animated")
    animatedElements.forEach((element: Element) => {
      observer.observe(element)
    })

    return () => {
      animatedElements.forEach((element: Element) => {
        observer.unobserve(element)
      })
    }
  }, [])

  return (
    <section id="showcase" className="py-20 bg-neutral-100" ref={showcaseRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 animate__animated animate__fadeIn">
            Showcase Your Designs
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto animate__animated animate__fadeIn">
            Create stunning visuals and share them with your team or the world
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <ShowcaseItem
            title="Flowcharts"
            description="Create complex flowcharts with ease"
            imageSrc="/placeholder.svg?height=300&width=400"
          />
          <ShowcaseItem
            title="Mind Maps"
            description="Organize your thoughts visually"
            imageSrc="/placeholder.svg?height=300&width=400"
          />
          <div className="group animate__animated animate__fadeInUp animate__delay-2s">
            <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
              <div className="bg-neutral-900 p-6 aspect-video relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-red-500/20 to-orange-500/20"></div>
                <div className="relative h-full flex items-center justify-center">
                  <div className="text-white text-center">
                    <span className="text-sm">Wireframe Example</span>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neutral-900 to-transparent"></div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2">UI Wireframes</h3>
                <p className="text-neutral-600 text-sm">Design user interfaces with our comprehensive wireframe kit</p>
              </div>
            </div>
          </div>
          <ShowcaseItem
            title="UML Diagrams"
            description="Design software architecture effortlessly"
            imageSrc="/placeholder.svg?height=300&width=400"
          />
          <ShowcaseItem
            title="Infographics"
            description="Present data in a visually appealing way"
            imageSrc="/placeholder.svg?height=300&width=400"
          />
          <ShowcaseItem
            title="Network Diagrams"
            description="Map out complex network structures"
            imageSrc="/placeholder.svg?height=300&width=400"
          />
        </div>

        <div className="mt-16 text-center animate__animated animate__fadeIn">
          <button className="bg-neutral-900 text-white px-8 py-3 rounded-lg hover:bg-neutral-800 transition-all duration-300 inline-flex items-center space-x-2 group">
            <span className="transition-transform duration-300">View More Examples</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}

function ShowcaseItem({ title, description, imageSrc }:{title:string, description:string, imageSrc:string}) {
  return (
    <div className="group animate__animated animate__fadeInUp">
      <div className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
        <div className="relative h-48">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-neutral-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  )
}

