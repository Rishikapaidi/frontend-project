import React, { useEffect, useState } from "react";
import { fetchProviderBookingStats } from "../services/api";

const ProviderDashboard: React.FC = () => {
  const [stats, setStats] = useState({ listings: 0, bookings: 0, rating: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProviderBookingStats()
      .then(setStats)
      .catch((err) => console.error("Stats fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Service Provider Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Active Listings
            </h3>
            <p className="text-2xl font-semibold text-blue-600">
              {stats.listings}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Bookings
            </h3>
            <p className="text-2xl font-semibold text-green-600">
              {stats.bookings}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">Avg. Rating</h3>
            <p className="text-2xl font-semibold text-yellow-600">
              {stats.rating.toFixed(1)} ★
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProviderDashboard;
