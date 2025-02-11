import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const RecentWork = () => {

  const [recentProjects, setRecentProjects] = useState([])
  const router = useRouter();

  useEffect(() => {
    const fetchRecentProjects = async () => {
      const response = await axios.get('http://localhost:5000/api/getRecentSessions')
      console.log(response.data)
      setRecentProjects(response.data)
    }
    fetchRecentProjects()
  }, [])

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Recent Work</h2>
        <button className="text-blue-600 text-sm hover:text-blue-700 transition-colors">View All</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recentProjects.map((project: any) => (
          <div
            onClick={() => { router.push(`/design/${project.sessionId}`) }}
            key={project.id}
            className="group relative bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-blue-500 transition-colors cursor-pointer"
          >
            <div className="aspect-[14/8] overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1581291519195-ef11498d1cf2?auto=format&fit=crop&q=80&w=500"
                alt={project.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                  {project.name}
                </h3>
                <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full">
                  {project.type}
                </span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>{project.date}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentWork;

export { RecentWork }