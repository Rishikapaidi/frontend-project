import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import ServiceList from "./pages/ServiceList";
import ServiceDetail from "./pages/ServiceDetail";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Profile from "./pages/Profile";
import AddService from "./pages/AddService";
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div
      className={
        darkMode
          ? "app dark bg-gray-900 text-white"
          : "app light bg-white text-black"
      }
    >
      <Router>
        <Navbar />

        <header className="flex justify-between items-center px-6 py-4 border-b">
          <h1 className="text-xl font-bold">Community Service</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>

        <Routes>
          {/* Public routes */}
          <Route path="/" element={<ServiceList />} />
          <Route path="/services/:id" element={<ServiceDetail />} />

          {/* Protected routes */}
          <Route
            path="/dashboard/customer"
            element={
              <ProtectedRoute allowedRoles={["customer"]}>
                <CustomerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/provider"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute allowedRoles={["customer", "provider"]}>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/provider/add-service"
            element={
              <ProtectedRoute allowedRoles={["provider"]}>
                <AddService />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
