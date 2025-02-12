import React, { useState } from 'react';
import { Bell, Settings, User, Menu, X } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

interface NavbarProps {
  sidebarOpen: boolean;
  onSidebarOpen: (open: boolean) => void;
}

const Navbar = ({ sidebarOpen, onSidebarOpen }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const session = useSession()

  return (
    <div className="h-16 bg-white border-b border-gray-200">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => onSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 lg:hidden"
          >
            <Menu className="h-6 w-6" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">My Workspace</h1>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-4">
          <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors">
            <Bell className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full transition-colors">
            <Settings className="h-5 w-5" />
          </button>
          <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">
            <Image src={session.data?.user?.image || '/default-image.png'} alt="" />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Settings className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="absolute top-16 right-0 w-full md:hidden bg-white border-b border-gray-200 py-2 px-4 shadow-lg z-50">
          <div className="space-y-2">
            <button className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Bell className="h-5 w-5" />
              <span>Notifications</span>
            </button>
            <button className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </button>
            <button className="flex items-center space-x-2 w-full p-2 text-gray-700 hover:bg-gray-100 rounded-lg">
              <User className="h-5 w-5" />
              <span>Profile</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

export { Navbar }