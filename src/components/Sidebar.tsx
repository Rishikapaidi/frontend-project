import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const location = useLocation();
  const { user } = useUser();
  const { darkMode } = useTheme();
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className={`min-w-64 w-64 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow-md min-h-screen flex flex-col flex-shrink-0`}>
      <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
        <h1 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-800'}`}>Community Service</h1>
      </div>
      
      <div className={`p-5 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-b`}>
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-xl font-bold text-blue-600 mr-3 flex-shrink-0">
            {user.firstName?.[0]}{user.lastName?.[0]}
          </div>
          <div>
            <p className="font-semibold text-base">{user.firstName} {user.lastName}</p>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>{user.email}</p>
          </div>
        </div>
        <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full inline-block dark:bg-gray-700 dark:text-gray-300">
          customer
        </div>
      </div>

      <nav className="flex-1 p-4">
        <div className="space-y-1">
          <Link 
            to="/" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/') 
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300' 
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            Dashboard
          </Link>
          
          <Link 
            to="/bookings" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/bookings') 
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300' 
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
            Bookings
          </Link>
          
          <Link 
            to="/profile" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/profile') 
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300' 
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Profile
          </Link>
          
          <Link 
            to="/settings" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/settings') 
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300' 
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
            </svg>
            Settings
          </Link>
          
          <Link 
            to="/help-support" 
            className={`flex items-center px-3 py-2 rounded-md ${
              isActive('/help-support') 
                ? 'bg-blue-50 text-blue-600 font-medium dark:bg-blue-900 dark:text-blue-300' 
                : darkMode 
                  ? 'text-gray-300 hover:bg-gray-700' 
                  : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Help & Support
          </Link>
        </div>
      </nav>
      
      <div className={`p-4 ${darkMode ? 'border-gray-700' : 'border-gray-200'} border-t`}>
        <button className={`flex items-center text-red-500 px-3 py-2 rounded-md w-full text-left ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-red-50'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
          </svg>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
