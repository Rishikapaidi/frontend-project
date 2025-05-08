import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ServiceCard from "../components/ServiceCard";
import HeaderFilters from "../components/HeaderFilters";
import Categories from "../components/Categories";
import { apiService } from "../services/api";
import { Service } from "../types";
import { useUser } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useUser();
  const [services, setServices] = useState<Service[]>([]);
  const [filteredServices, setFilteredServices] = useState<Service[]>([]);
  const [range, setRange] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState<boolean>(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const res = await apiService.getServices();
      setServices(res.data);
      filterServices(res.data, range, search, selectedCategory);
      setError(null);
    } catch (err) {
      console.error("Error fetching services:", err);
      setError("Failed to load services. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterServices = (
    serviceList: Service[],
    rangeValue: number,
    searchQuery: string,
    category: string
  ) => {
    let result = [...serviceList];
    
    // Filter by range
    result = result.filter((s) => s.distance <= rangeValue);
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Filter by category
    if (category) {
      result = result.filter((s) => s.category === category);
    }
    
    setFilteredServices(result);
  };

  const handleRangeChange = (value: number) => {
    setRange(value);
    filterServices(services, value, search, selectedCategory);
  };

  const handleSearch = (query: string) => {
    setSearch(query);
    filterServices(services, range, query, selectedCategory);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    filterServices(services, range, search, category);
    setShowCategories(false); // Close categories modal after selection
  };

  const handleSortChange = (sortType: string) => {
    let sorted = [...filteredServices];
    if (sortType === "high") sorted.sort((a, b) => b.cost - a.cost);
    else if (sortType === "low") sorted.sort((a, b) => a.cost - b.cost);
    else if (sortType === "latest") sorted.sort((a, b) => b.id.localeCompare(a.id));
    setFilteredServices(sorted);
  };

  const toggleCategoriesModal = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <header className="mb-6">
            <h1 className="text-2xl font-bold mb-4">Welcome, {user.firstName} {user.lastName}</h1>
          <HeaderFilters
            range={range}
            onRangeChange={handleRangeChange}
            onSortChange={handleSortChange}
              onCategoryChange={toggleCategoriesModal}
              onSearch={handleSearch}
            />
          </header>
          
          {/* Categories Modal */}
          {showCategories && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-bold">Select Category</h3>
                  <button 
                    onClick={toggleCategoriesModal}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <Categories
                  selectedCategory={selectedCategory}
                  onCategoryChange={handleCategoryChange}
          />
        </div>
            </div>
          )}
          
          {/* Distance indicator */}
          <div className="mb-4 flex items-center text-sm text-gray-500">
            <span>Distance: {range} miles</span>
          </div>
          
          {selectedCategory && (
            <div className="mb-4 flex items-center gap-2">
              <span className="text-sm text-gray-700">Active Filter:</span>
              <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
                {selectedCategory}
                <button 
                  onClick={() => handleCategoryChange("")}
                  className="ml-1 text-blue-600 hover:text-blue-800"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </span>
            </div>
          )}
          
          {loading ? (
            <div className="flex justify-center py-10">
              <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {error}
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">No services found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
          )}
      </div>
      </main>
    </div>
  );
};

export default Dashboard;
