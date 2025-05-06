import React from "react";
import ServiceProviderForm from "./components/ServiceProviderForm";
import TransactionsPage from "./components/TransactionsPage";
import ProviderJobDashboard from "./components/ProviderJobDashboard";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <ProviderJobDashboard />
    </div>
  );
}

export default App;
