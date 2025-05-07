import React, { useEffect, useState } from 'react';
import { getServices } from '../services/api';

interface Service {
  id: number;
  title: string;
  price: string;
  category: number;
}

const ServicesList: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getServices();
      setServices(res || []);
    };
    fetchData();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Services</h2>
      <ul className="space-y-4">
        {services.map(service => (
          <li key={service.id} className="p-4 border rounded shadow">
            <h3 className="font-semibold">{service.title}</h3>
            <p>${service.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ServicesList;
