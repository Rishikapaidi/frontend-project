import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { apiService } from "../services/api";
import { Service } from "../types";
import BookingModal from "../components/BookingModal";
import { useTheme } from "../context/ThemeContext";

const ServiceDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<Service | null>(null);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const { darkMode } = useTheme();

  useEffect(() => {
    const fetchServiceDetails = async () => {
      setLoading(true);
      try {
        if (id) {
          const response = await apiService.getServiceById(id);
          setService(response.data);
          
          // Fetch related services from the same category
          const categoryResponse = await apiService.getServicesByCategory(response.data.category);
          // Filter out the current service from related services
          const filteredServices = categoryResponse.data.filter(
            (s: Service) => s.id !== response.data.id
          );
          setRelatedServices(filteredServices);
        }
        setError(null);
      } catch (err) {
        console.error("Error fetching service details:", err);
        setError("Failed to load service details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchServiceDetails();
  }, [id]);

  const handleBookService = () => {
    setShowBookingModal(true);
  };

  const handleRelatedServiceClick = (serviceId: string) => {
    navigate(`/service/${serviceId}`);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Header */}
      <div className={`${darkMode ? 'bg-gray-800 text-white' : 'bg-white'} shadow`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center">
              <Link to="/" className={`${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-600'} flex items-center`}>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 mr-1" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" 
                    clipRule="evenodd" 
                  />
                </svg>
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center py-12">
            <svg className="animate-spin h-10 w-10 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md dark:bg-red-900 dark:border-red-800 dark:text-red-300">
            {error}
          </div>
        ) : service ? (
          <div className={`${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow overflow-hidden`}>
            {/* Service Image */}
            <div className="relative">
              <img 
                src={service.imageUrl} 
                alt={service.name}
                className="w-full h-80 object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/1200x600?text=Service+Image";
                }}
              />
              <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                active
              </div>
            </div>

            {/* Service Details */}
            <div className="p-6">
              <div className="flex justify-between items-start">
                <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>{service.name}</h1>
                <div className="text-2xl font-bold text-green-500">$ {service.cost}.00</div>
              </div>

              <p className={`mt-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>{service.description}</p>

              {/* Service Info */}
              <div className="mt-6 space-y-4">
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Service radius: {service.distance} miles</span>
                </div>
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                  </svg>
                  <span className={`ml-2 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>Available: Mon-Sat, 9AM-5PM</span>
                </div>
              </div>

              {/* More from Category Section */}
              <div className="mt-8">
                <h2 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>More from {service.category.charAt(0).toUpperCase() + service.category.slice(1)}</h2>
                
                <div className="mt-4 space-y-3">
                  {relatedServices.length > 0 ? (
                    relatedServices.map((relatedService) => (
                      <div 
                        key={relatedService.id} 
                        className={`${darkMode ? 'bg-gray-700 border-gray-600 hover:bg-gray-600' : 'bg-white border-gray-200 hover:bg-gray-50'} border rounded-lg overflow-hidden cursor-pointer transition-colors duration-200`}
                        onClick={() => handleRelatedServiceClick(relatedService.id)}
                      >
                        <div className="p-4 flex items-center justify-between">
                          <div className="flex items-center">
                            <img 
                              src={relatedService.imageUrl}
                              alt={relatedService.name}
                              className="w-16 h-16 object-cover rounded-md"
                              onError={(e) => {
                                e.currentTarget.src = "https://via.placeholder.com/150?text=Service";
                              }}
                            />
                            <div className="ml-4">
                              <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>{relatedService.name}</h3>
                              <p className="text-green-600 font-medium">${relatedService.cost}.00</p>
                              <div className={`flex items-center text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>
                                <span className="flex items-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                  </svg>
                                  {relatedService.rating}
                                </span>
                                <span className="mx-2">•</span>
                                <span>{relatedService.distance} miles away</span>
                              </div>
                            </div>
                          </div>
                          <div className={`${darkMode ? 'text-gray-300' : 'text-gray-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} italic`}>No other services found in this category.</p>
                  )}
                </div>
              </div>

              {/* Booking Button */}
              <div className="mt-8">
                <button
                  onClick={handleBookService}
                  className="w-full bg-blue-600 text-white font-medium py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Book This Service
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className={`${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Service not found.</p>
          </div>
        )}
      </div>

      {/* Booking Modal */}
      {showBookingModal && service && (
        <BookingModal
          serviceId={service.id}
          serviceName={service.name}
          serviceCost={service.cost}
          serviceImage={service.imageUrl}
          onClose={() => setShowBookingModal(false)}
          onSuccess={() => {
            setShowBookingModal(false);
            alert("Booking successful!");
            navigate("/bookings");
          }}
        />
      )}
    </div>
  );
};

export default ServiceDetails; 