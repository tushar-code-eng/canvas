import Link from "next/link"

export default function CTA() {
  return (
    <section id="cta" className="py-20 bg-neutral-100 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-6 animate__animated animate__fadeIn">
            Start Creating Amazing Designs Today
          </h2>
          <p className="text-xl text-neutral-600 mb-8 animate__animated animate__fadeIn animate__delay-1s">
            Join thousands of teams already using our platform to bring their ideas to life
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate__animated animate__fadeInUp animate__delay-2s">
            <Link
              href="#"
              className="px-8 py-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center group"
            >
              Get Started for Free
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
              </svg>
            </Link>

            <Link
              href="#"
              className="px-8 py-4 bg-neutral-900 text-white rounded-lg hover:bg-neutral-800 transition-colors font-medium flex items-center group"
            >
              Schedule Demo
              <svg
                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
            </Link>
          </div>

          <div className="mt-12 pt-8 border-t border-neutral-200 animate__animated animate__fadeIn animate__delay-3s">
            <div className="flex flex-wrap justify-center items-center gap-8">
              <div className="flex items-center text-neutral-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Free 14-day trial
              </div>
              <div className="flex items-center text-neutral-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                No credit card required
              </div>
              <div className="flex items-center text-neutral-600">
                <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
                Cancel anytime
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

