"use client";
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { logout } from '@/utils/auth';

interface HeaderProps {
  userName?: string;
}

export const Header: React.FC<HeaderProps> = ({ userName = 'John Doe' }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-full px-6 py-4 flex items-center justify-between">

        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-bold text-gray-900">
            ticktock
          </h1>
          

          <nav className="hidden md:flex items-center">
            <a 
              href="#" 
              className="text-gray-700 hover:text-gray-900 font-medium transition-colors"
            >
              Timesheets
            </a>
          </nav>
        </div>


        <div className="relative">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-2 text-gray-700 hover:text-gray-900 transition-colors focus:outline-none"
          >
            <span className="font-medium">{userName}</span>
            <ChevronDown 
              size={20} 
              className={`transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
            />
          </button>


          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
              <div className="py-1">
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Profile
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                >
                  Settings
                </a>
                <hr className="my-1 border-gray-200" />
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;