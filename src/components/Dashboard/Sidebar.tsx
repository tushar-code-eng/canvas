import React from 'react';
import { Home, Clock, Star, FolderKanban, PlusCircle, Search } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="p-4">
        <div className="flex items-center space-x-2 mb-6">
          <FolderKanban className="h-6 w-6 text-blue-500" />
          <span className="text-xl font-bold text-white">FlowDesign</span>
        </div>
        
        <div className="relative mb-6">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search"
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-300 placeholder-gray-500"
          />
        </div>
      </div>

      <nav className="flex-1">
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800">
          <Clock className="h-5 w-5" />
          <span>Recent</span>
        </a>
        <a href="#" className="flex items-center space-x-3 px-4 py-3 text-gray-300 hover:bg-gray-800">
          <Star className="h-5 w-5" />
          <span>Starred</span>
        </a>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button className="w-full flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
          <PlusCircle className="h-5 w-5" />
          <span>New Project</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

export { Sidebar }