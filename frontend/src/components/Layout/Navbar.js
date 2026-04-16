import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { GraduationCap, Bell, User, Menu } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const { user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-gray-900" />
            </div>
            <span className="font-bold text-xl">Student OS</span>
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          {/* Right Side - Notifications & User */}
          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-800 rounded-lg transition">
              <Bell className="w-5 h-5 text-gray-300 hover:text-white transition" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-gray-300" />
              </div>
              <span className="text-sm font-medium hidden md:block">
                {user?.name?.split(' ')[0] || 'User'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;