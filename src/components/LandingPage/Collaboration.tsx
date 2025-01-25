export default function Collaboration() {
    return (
      <section id="collaboration" className="py-20 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate__animated animate__fadeInLeft">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Real-Time Collaboration That Feels Like Magic</h2>
              <div className="space-y-6">
                <CollaborationFeature
                  title="Multi-User Editing"
                  description="Work simultaneously with your team members. See changes in real-time as they happen."
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  }
                />
                <CollaborationFeature
                  title="Built-in Chat"
                  description="Communicate with your team directly within the design canvas."
                  icon={
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  }
                />
                <CollaborationFeature
                  title="Smart Conflict Resolution"
                  description="Never worry about overlapping changes with our intelligent conflict resolution system."
                  icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />}
                />
              </div>
            </div>
  
            <div className="relative animate__animated animate__fadeInRight">
              <div className="bg-neutral-800 rounded-xl p-6 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
  
                <div className="relative bg-neutral-900 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-sm font-medium">
                        JD
                      </div>
                      <div className="bg-neutral-800 rounded px-3 py-2 text-sm">Adding new flowchart section...</div>
                    </div>
                    <div className="flex items-center space-x-2 justify-end">
                      <div className="bg-blue-500 rounded px-3 py-2 text-sm">Great! I'll work on the connections.</div>
                      <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-sm font-medium">
                        SK
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }
  
  function CollaborationFeature({ title, description, icon }:{title:string, description:string,icon:React.ReactNode}) {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {icon}
            </svg>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-neutral-400">{description}</p>
        </div>
      </div>
    )
  }
  
  