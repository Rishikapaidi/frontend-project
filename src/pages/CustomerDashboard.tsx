//to be replaced, here for current structure

import React, { useEffect, useState } from "react";
import { fetchCustomerBookingStats } from "../services/api";

const CustomerDashboard: React.FC = () => {
  const [stats, setStats] = useState({ total: 0, completed: 0, pending: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomerBookingStats()
      .then(setStats)
      .catch((err) => console.error("Stats fetch failed:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Customer Dashboard</h1>

      {loading ? (
        <p>Loading stats...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Total Bookings
            </h3>
            <p className="text-2xl font-semibold text-blue-600">
              {stats.total}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Completed Services
            </h3>
            <p className="text-2xl font-semibold text-green-600">
              {stats.completed}
            </p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-sm font-medium text-gray-500">
              Pending Services
            </h3>
            <p className="text-2xl font-semibold text-yellow-600">
              {stats.pending}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerDashboard;
