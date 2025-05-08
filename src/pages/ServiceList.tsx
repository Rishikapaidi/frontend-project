import React, { useEffect, useState } from "react";
import { getServices } from "../services/api";
import BookingForm from "../components/BookingForm";
import SearchBar from "../components/SearchBar";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  provider_id: number;
  availableSlots: string[];
}

const ServiceList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [query, setQuery] = useState<string>("");
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  // 1. Request browser geolocation on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) =>
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        (err) => console.error("Geolocation error:", err),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  // 2. Fetch services when query or coords change
  useEffect(() => {
    getServices(query, coords)
      .then(setServices)
      .catch((err) => console.error("Error fetching services:", err));
  }, [query, coords]);

  const toggleBookingForm = (id: number) => {
    setSelectedServiceId((prevId) => (prevId === id ? null : id));
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Available Services</h1>

      {/* Search input */}
      <div className="mb-4">
        <SearchBar value={query} onChange={setQuery} />
      </div>

      {/* Services list */}
      <ul className="space-y-6">
        {services.map((service) => (
          <li key={service.id} className="bg-white p-4 rounded shadow">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-gray-600">{service.description}</p>
                <p className="mt-2 text-blue-600 font-semibold">
                  ${service.price}
                </p>
              </div>
              <button
                onClick={() => toggleBookingForm(service.id)}
                className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                {selectedServiceId === service.id ? "Hide Booking" : "Book Now"}
              </button>
            </div>

            {selectedServiceId === service.id && (
              <div className="mt-4">
                <BookingForm
                  jobId={service.id}
                  providerId={service.provider_id}
                  availableSlots={service.availableSlots}
                  price={service.price}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServiceList;
