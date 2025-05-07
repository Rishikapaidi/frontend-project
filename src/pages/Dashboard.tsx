import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface Service {
  id: number;
  name: string;
  description: string;
  price: number;
}

const Dashboard: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    // Fetch the list of services from your API (this is a mock for now)
    const fetchServices = async () => {
      const mockServices: Service[] = [
        { id: 1, name: 'Plumbing', description: 'Fix pipes and leaks', price: 50 },
        { id: 2, name: 'Cleaning', description: 'Home and office cleaning', price: 30 },
        { id: 3, name: 'Electrician', description: 'Electrical repairs', price: 70 },
      ];
      setServices(mockServices);
    };

    fetchServices();
  }, []);

  return (
    <div className="dashboard">
      <h2>Service Dashboard</h2>
      <Link to="/service/create">
        <button>Add New Service</button>
      </Link>
      <div className="service-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <h3>{service.name}</h3>
            <p>{service.description}</p>
            <p>Price: ${service.price}</p>
            <Link to={`/service/${service.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
