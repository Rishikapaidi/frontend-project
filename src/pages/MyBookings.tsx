import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { apiService } from "../services/api";
import { Booking, BookingStatus, Service } from "../types";
import { useUser } from "../context/UserContext";

const MyBookings = () => {
  const { user } = useUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<BookingStatus | "all">("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [serviceDetailsLoading, setServiceDetailsLoading] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings(activeTab);
  }, [activeTab, bookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const res = await apiService.getBookings();
      setBookings(res.data);
      filterBookings(activeTab, res.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching bookings:", err);
      setError("Failed to load your bookings. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const filterBookings = (status: BookingStatus | "all", bookingsList = bookings) => {
    if (status === "all") {
      setFilteredBookings(bookingsList);
    } else {
      setFilteredBookings(bookingsList.filter(booking => booking.status === status));
    }
  };

  const cancelBooking = async (bookingId: string) => {
    if (window.confirm("Are you sure you want to cancel this booking?")) {
      try {
        await apiService.cancelBooking(bookingId);
        // Update the booking status to cancelled
        const updatedBookings = bookings.map(booking => 
          booking.id === bookingId 
            ? { ...booking, status: "cancelled" as BookingStatus } 
            : booking
        );
        setBookings(updatedBookings);
        filterBookings(activeTab, updatedBookings);
      } catch (err) {
        console.error("Error canceling booking:", err);
        alert("Failed to cancel booking. Please try again later.");
      }
    }
  };

  const viewServiceDetails = async (serviceId: string) => {
    setServiceDetailsLoading(true);
    setShowServiceModal(true);
    
    try {
      const res = await apiService.getServiceById(serviceId);
      setSelectedService(res.data);
    } catch (err) {
      console.error("Error fetching service details:", err);
      alert("Failed to load service details. Please try again later.");
    } finally {
      setServiceDetailsLoading(false);
    }
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const getStatusColor = (status: BookingStatus) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "confirmed", label: "Confirmed" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
        <div className="max-w-7xl mx-auto p-4 sm:p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Bookings</h1>
            <button className="text-gray-400 hover:text-gray-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
              </svg>
            </button>
          </div>
          
          {/* Tab Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex -mb-px space-x-6 sm:space-x-8 overflow-x-auto">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as BookingStatus | "all")}
                  className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                    activeTab === tab.id
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <h2 className="text-xl font-bold mb-4">
            {activeTab === "all" ? "All Bookings" : `${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Bookings`}
          </h2>
          
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
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm border border-gray-100">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No {activeTab !== "all" ? activeTab : ""} bookings</h3>
              <p className="mt-1 text-sm text-gray-500">
                {activeTab === "all" 
                  ? "You haven't made any bookings yet." 
                  : `You don't have any ${activeTab} bookings.`}
              </p>
            </div>
        ) : (
          <div className="space-y-4">
              {filteredBookings.map((booking) => (
              <div
                key={booking.id}
                  className="p-5 border border-gray-200 rounded-lg shadow-sm bg-white hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-lg">{booking.serviceName}</h3>
                      <p className="text-sm text-gray-500">
                        Booking #{booking.id} • Created on {booking.createdAt ? formatDate(booking.createdAt) : 'Unknown date'}
                      </p>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span className="text-sm text-gray-600">{formatDate(booking.date)}</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="text-sm text-gray-600">{booking.time}</span>
                    </div>
                    {booking.comments && (
                      <div className="flex items-start">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                        </svg>
                        <span className="text-sm text-gray-600">{booking.comments}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <button
                      onClick={() => viewServiceDetails(booking.serviceId)}
                      className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      View Service Details
                    </button>
                    
                    {booking.status !== "cancelled" && booking.status !== "completed" && (
                      <button
                        onClick={() => cancelBooking(booking.id)}
                        className="ml-3 px-4 py-2 text-sm border border-red-300 text-red-600 rounded-md hover:bg-red-50"
                      >
                        Cancel Booking
                      </button>
                    )}
                  </div>
              </div>
            ))}
          </div>
        )}
      </div>
      </div>

      {/* Service Details Modal */}
      {showServiceModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold">Service Details</h3>
                <button 
                  onClick={closeServiceModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {serviceDetailsLoading ? (
                <div className="flex justify-center py-10">
                  <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </div>
              ) : selectedService ? (
                <div>
                  <div className="mb-4">
                    {selectedService.imageUrl && (
                      <img 
                        src={selectedService.imageUrl} 
                        alt={selectedService.name} 
                        className="w-full h-64 object-cover rounded-lg mb-4"
                      />
                    )}
                    <h3 className="text-xl font-bold">{selectedService.name}</h3>
                    <div className="flex items-center mt-1">
                      <div className="flex mr-2">
                        {[...Array(5)].map((_, i) => (
                          <svg 
                            key={i} 
                            className={`h-4 w-4 ${i < Math.floor(selectedService.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">{selectedService.rating} ({Math.floor(Math.random() * 50) + 10} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="mb-4 border-b pb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">DESCRIPTION</h4>
                    <p className="text-gray-700">{selectedService.description}</p>
                  </div>
                  
                  <div className="mb-4 border-b pb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">PRICING</h4>
                    <p className="text-xl font-bold text-gray-900">${selectedService.cost} <span className="text-sm font-normal text-gray-500">per service</span></p>
                  </div>
                  
                  <div className="mb-4 border-b pb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">LOCATION</h4>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="text-gray-700">{selectedService.distance} miles away</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-500 mb-2">CATEGORY</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {selectedService.category.charAt(0).toUpperCase() + selectedService.category.slice(1)}
                    </span>
                  </div>
                  
                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={closeServiceModal}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 mr-2"
                    >
                      Close
                    </button>
                    <button
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Book Again
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">Service details not found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
