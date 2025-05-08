import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../services/api";
import BookingForm from "../components/BookingForm";
import ReviewSection from "../components/ReviewSection";
import SimilarJobsPanel from "../components/SimilarJobsPanel";
import ChatBotWidget from "../components/Chatbot/ChatBotWidget";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  provider_id: number;
  availableSlots: string[];
  category: string;
}

const ServiceDetail: React.FC = () => {
  const { id } = useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      getServiceById(Number(id))
        .then(setService)
        .catch((err) => console.error("Failed to fetch service", err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  if (loading) return <p className="p-4">Loading service...</p>;
  if (!service) return <p className="p-4 text-red-600">Service not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold">{service.title}</h1>
      <p className="text-gray-700 mt-2">{service.description}</p>
      <p className="text-blue-600 mt-2 font-semibold text-lg">
        ${service.price}
      </p>

      <div className="mt-6">
        <BookingForm
          jobId={service.id}
          providerId={service.provider_id}
          availableSlots={service.availableSlots}
          price={service.price}
        />
      </div>

      <ReviewSection jobId={service.id} />

      <SimilarJobsPanel currentJobId={service.id} category={service.category} />

      <ChatBotWidget />
    </div>
  );
};

export default ServiceDetail;
