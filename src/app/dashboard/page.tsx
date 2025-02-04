"use client"
import React, { useState } from 'react';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Navbar } from '@/components/Dashboard/Navbar';
import { TemplateCard } from '@/components/Dashboard/TemplateCard';
import { RecentWork } from '@/components/Dashboard/RecentWork';
import { BarChart as FlowChart, Palette, Box, GitBranch, Menu } from 'lucide-react';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const templates = [
    {
      title: 'Flowchart',
      description: 'Create professional flowcharts and diagrams',
      icon: <FlowChart className="h-12 w-12 text-blue-600" />,
    },
    {
      title: 'Design Canvas',
      description: 'Start with a blank canvas for your designs',
      icon: <Palette className="h-12 w-12 text-blue-600" />,
    },
    {
      title: 'Wireframe',
      description: 'Create website and app wireframes',
      icon: <Box className="h-12 w-12 text-blue-600" />,
    },
    {
      title: 'Mind Map',
      description: 'Organize your thoughts and ideas',
      icon: <GitBranch className="h-12 w-12 text-blue-600" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-gray-900/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 transform bg-gray-900 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar sidebarOpen={sidebarOpen} onSidebarOpen={setSidebarOpen} />
        
        <div className="flex-1 overflow-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Create New</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {templates.map((template, index) => (
                  <TemplateCard
                    key={index}
                    title={template.title}
                    description={template.description}
                    icon={template.icon}
                  />
                ))}
              </div>
            </section>

            <section>
              <RecentWork />
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;