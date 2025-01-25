"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

const faqData = [
  {
    question: "How does real-time collaboration work?",
    answer:
      "Our platform uses advanced WebSocket technology to enable instant collaboration. Multiple team members can work on the same diagram simultaneously, seeing changes in real-time. Changes are automatically saved and synced across all users.",
  },
  {
    question: "Can I export my designs in different formats?",
    answer:
      "Yes! You can export your designs in multiple formats including PNG, SVG, PDF, and more. Pro users get access to additional export options and higher resolution exports.",
  },
  {
    question: "Is there a limit to the number of collaborators?",
    answer:
      "Free plans allow up to 3 collaborators per project. Pro and Enterprise plans support unlimited collaborators with additional team management features.",
  },
  {
    question: "Do you offer custom templates?",
    answer:
      "Yes! We offer a wide range of pre-built templates, and Enterprise users can request custom templates tailored to their specific needs.",
  },
]

export default function FAQ() {
  return (
    <section id="faq" className="py-20 bg-neutral-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate__animated animate__fadeIn">
            Frequently Asked Questions
          </h2>
          <p className="text-neutral-400 animate__animated animate__fadeIn">
            Find answers to common questions about our platform
          </p>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    </section>
  )
}

interface FAQItemProps {
  question: string;
  answer: string;
}

function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="border border-neutral-700 rounded-lg animate__animated animate__fadeInUp">
      <button
        className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-white font-medium">{question}</span>
        <ChevronDown
          className={`w-6 h-6 text-neutral-400 transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      {isOpen && <div className="px-6 py-4 text-neutral-400">{answer}</div>}
    </div>
  )
}

