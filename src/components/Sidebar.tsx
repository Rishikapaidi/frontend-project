import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 h-screen shadow-md">
      <h2 className="text-xl font-bold mb-4">Navigation</h2>
      <ul className="space-y-2">
        <li><Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link></li>
        <li><Link to="/services" className="hover:text-blue-600">All Services</Link></li>
        <li><Link to="/service/create" className="hover:text-blue-600">Add Service</Link></li>
        <li><Link to="/profile" className="hover:text-blue-600">Profile</Link></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
