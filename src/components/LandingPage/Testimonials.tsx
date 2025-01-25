"use client"
import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    name: "John Doe",
    role: "Product Designer",
    company: "TechCorp",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "This tool has revolutionized our team's workflow. The real-time collaboration feature is a game-changer for our remote team.",
    rating: 5,
  },
  {
    name: "Sarah Adams",
    role: "Project Manager",
    company: "InnovateCo",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "The intuitive interface and smart templates have made creating flowcharts a breeze. Couldn't be happier with the results!",
    rating: 5,
  },
  {
    name: "Mike Roberts",
    role: "Tech Lead",
    company: "DevSolutions",
    image: "/placeholder.svg?height=100&width=100",
    quote:
      "Perfect for creating system architectures and team workflows. The export options are particularly useful for our documentation.",
    rating: 5,
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 animate__animated animate__fadeIn">
            What Our Users Say
          </h2>
          <p className="text-neutral-600 max-w-2xl mx-auto animate__animated animate__fadeIn">
            Join thousands of satisfied users who love our platform
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-300 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0">
                  <div className="bg-white p-8 rounded-xl shadow-lg max-w-3xl mx-auto">
                    <div className="flex items-center mb-6">
                      <img
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                        <p className="text-neutral-600">
                          {testimonial.role} at {testimonial.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-lg mb-4">"{testimonial.quote}"</p>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 fill-current" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevTestimonial}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-neutral-100 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  )
}

