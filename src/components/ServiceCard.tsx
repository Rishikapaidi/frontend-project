import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Service } from "../types";
import BookingModal from "./BookingModal";

interface Props {
  service: Service;
}

const ServiceCard: React.FC<Props> = ({ service }) => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/service/${service.id}`);
  };

  const handleBookNow = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card navigation when clicking Book Now
    setShowModal(true);
  };

  return (
    <>
      <div 
        className="bg-white shadow-sm border border-gray-100 rounded-lg overflow-hidden hover:shadow-md transition-shadow duration-200 cursor-pointer"
        onClick={handleCardClick}
      >
        <div className="relative">
          <img
            src={service.imageUrl}
            alt={service.name}
            className="w-full h-48 object-cover service-img"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x225?text=Service+Image";
            }}
          />
          <div className="absolute top-2 right-2 bg-green-100 text-green-800 px-2 py-1 rounded text-xs font-medium">
            Available
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-1">{service.name}</h3>
          <p className="text-gray-600 text-sm mb-3">{service.description.length > 100 
            ? `${service.description.substring(0, 100)}...` 
            : service.description}</p>
          
          <div className="flex items-center text-sm mb-3">
            <div className="flex items-center text-yellow-500 mr-4">
              <span className="mr-1">⭐</span>
              <span className="font-medium">{service.rating}</span>
            </div>
            
            <div className="flex items-center text-green-600 mr-4">
              <span className="mr-1">$</span>
              <span className="font-medium">{service.cost}</span>
            </div>
            
            <div className="flex items-center text-gray-500">
              <span className="mr-1">📍</span>
              <span>{service.distance} miles away</span>
            </div>
          </div>
          
          <button
            onClick={handleBookNow}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium"
          >
            Book Now
          </button>
        </div>
      </div>

      {showModal && (
        <BookingModal
          serviceId={service.id}
          serviceName={service.name}
          serviceCost={service.cost}
          onClose={() => setShowModal(false)}
          onSuccess={() => alert("Booking successful!")}
        />
      )}
    </>
  );
};

export default ServiceCard;
