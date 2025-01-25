import { Check } from "lucide-react"

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
  buttonText: string;
  buttonColor: string;
  isPopular?: boolean;
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-20 bg-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 animate__animated animate__fadeIn">
            Simple, Transparent Pricing
          </h2>
          <p className="text-neutral-400 max-w-2xl mx-auto animate__animated animate__fadeIn">
            Choose the perfect plan for your needs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            title="Free"
            price="$0"
            features={["Basic shapes and flowcharts", "Up to 3 documents", "Basic export options"]}
            buttonText="Get Started"
            buttonColor="bg-neutral-700 hover:bg-neutral-600"
          />
          <PricingCard
            title="Pro"
            price="$19"
            features={[
              "All Free features",
              "Unlimited documents",
              "Real-time collaboration",
              "Advanced export options",
            ]}
            buttonText="Start Pro Trial"
            buttonColor="bg-blue-500 hover:bg-blue-600"
            isPopular={true}
          />
          <PricingCard
            title="Enterprise"
            price="$49"
            features={["All Pro features", "Priority support", "Custom integrations", "Team management"]}
            buttonText="Contact Sales"
            buttonColor="bg-neutral-700 hover:bg-neutral-600"
          />
        </div>
      </div>
    </section>
  )
}

function PricingCard({ title, price, features, buttonText, buttonColor, isPopular = false }: PricingCardProps) {
  return (
    <div
      className={`bg-neutral-800 rounded-xl p-8 border ${isPopular ? "border-2 border-blue-500" : "border-neutral-700"} hover:border-blue-500 transition-colors animate__animated animate__fadeInUp relative`}
    >
      {isPopular && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm">Most Popular</span>
        </div>
      )}
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-white mb-4">{title}</h3>
        <div className="flex justify-center items-baseline">
          <span className="text-4xl font-bold text-white">{price}</span>
          <span className="text-neutral-400 ml-2">/month</span>
        </div>
      </div>
      <ul className="space-y-4 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center text-neutral-300">
            <Check className="w-5 h-5 text-green-500 mr-3" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 px-6 rounded-lg ${buttonColor} text-white transition-colors`}>
        {buttonText}
      </button>
    </div>
  )
}

