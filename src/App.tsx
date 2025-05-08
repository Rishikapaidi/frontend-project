import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AddService from "./pages/AddService";
import Dashboard from "./pages/Dashboard";
import ServiceDetail from "./pages/ServiceDetail";
import "./App.css";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  return (
    <div className={darkMode ? "app dark" : "app light"}>
      <Router>
        <header className="header">
          <h1>Community Service</h1>
          <button onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </header>
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/service/create" element={<AddService />} />
          <Route path="/service/:id" element={<ServiceDetail />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
