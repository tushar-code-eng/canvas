export default function Features() {
    return (
      <section id="features" className="py-20 bg-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4 animate__animated animate__fadeIn">
              Powerful Features for Design Excellence
            </h2>
            <p className="text-neutral-600 max-w-2xl mx-auto animate__animated animate__fadeIn">
              Create, collaborate, and bring your ideas to life with our intuitive tools
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              title="Smart Shapes"
              description="Intelligent shape recognition and customization tools for perfect diagrams every time"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
                />
              }
              bgColor="bg-blue-500"
            />
            <FeatureCard
              title="Real-time Collaboration"
              description="Work together seamlessly with your team in real-time, anywhere in the world"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              }
              bgColor="bg-purple-500"
            />
            <FeatureCard
              title="Smart Templates"
              description="Start faster with pre-built templates for any type of diagram or flowchart"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                />
              }
              bgColor="bg-green-500"
            />
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <FeatureCard
              title="Version History"
              description="Track changes and revert to previous versions with unlimited version history"
              icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />}
              bgColor="bg-red-500"
            />
            <FeatureCard
              title="Easy Export"
              description="Export your designs in multiple formats with just one click"
              icon={
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              }
              bgColor="bg-yellow-500"
            />
          </div>
        </div>
      </section>
    )
  }
  
  function FeatureCard({ title, description, icon, bgColor }:{title:string, description:string, icon:React.ReactNode, bgColor:string}) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow animate__animated animate__fadeInUp">
        <div className={`h-12 w-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {icon}
          </svg>
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-neutral-600">{description}</p>
      </div>
    )
  }
  
  