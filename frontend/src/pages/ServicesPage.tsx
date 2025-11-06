import { useState, useEffect } from 'react';
import './ServicesPage.css';

interface Service {
  id: string;
  name: string;
  category: string;
  address: string;
  phone?: string;
  distance?: number;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { value: 'all', label: 'All Services' },
    { value: 'hospital', label: 'Hospitals' },
    { value: 'pharmacy', label: 'Pharmacies' },
    { value: 'shelter', label: 'Shelters' },
    { value: 'community', label: 'Community Centers' },
    { value: 'utility', label: 'Utilities' },
  ];

  useEffect(() => {
    // Mock services - replace with actual API call
    // TODO: Replace with actual API call
    setServices([
      {
        id: '1',
        name: 'City General Hospital',
        category: 'hospital',
        address: '123 Main St',
        phone: '(555) 123-4567',
        distance: 0.5,
      },
      {
        id: '2',
        name: 'Local Pharmacy',
        category: 'pharmacy',
        address: '456 Oak Ave',
        phone: '(555) 987-6543',
        distance: 1.2,
      },
      {
        id: '3',
        name: 'Community Center',
        category: 'community',
        address: '789 Pine Rd',
        phone: '(555) 456-7890',
        distance: 2.1,
      },
    ]);
  }, []);

  const filteredServices =
    selectedCategory === 'all'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleDirections = (address: string) => {
    window.open(`https://maps.google.com/?q=${encodeURIComponent(address)}`);
  };

  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Local Services</h1>
        <p>Find nearby services and facilities</p>
      </div>

      <div className="services-filters">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setSelectedCategory(cat.value)}
            className={`filter-btn ${
              selectedCategory === cat.value ? 'active' : ''
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="services-list">
        {filteredServices.length === 0 ? (
          <div className="empty-state">
            <p>No services found in this category</p>
          </div>
        ) : (
          filteredServices.map((service) => (
            <div key={service.id} className="service-card">
              <div className="service-info">
                <h3 className="service-name">{service.name}</h3>
                <p className="service-category">{service.category}</p>
                <p className="service-address">📍 {service.address}</p>
                {service.distance && (
                  <p className="service-distance">{service.distance} km away</p>
                )}
              </div>
              <div className="service-actions">
                {service.phone && (
                  <button
                    onClick={() => handleCall(service.phone!)}
                    className="btn btn-primary btn-sm"
                  >
                    📞 Call
                  </button>
                )}
                <button
                  onClick={() => handleDirections(service.address)}
                  className="btn btn-secondary btn-sm"
                >
                  🗺️ Directions
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

