import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";
import Profile from "./pages/Profile";
import ServiceDetails from "./pages/ServiceDetails";
import Settings from "./pages/Settings";
import HelpSupport from "./pages/HelpSupport";
import { UserProvider } from "./context/UserContext";
import { ThemeProvider } from "./context/ThemeContext";

const App = () => {
  return (
    <ThemeProvider>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/bookings" element={<MyBookings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/service/:id" element={<ServiceDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/help-support" element={<HelpSupport />} />
          </Routes>
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
};

export default App;
