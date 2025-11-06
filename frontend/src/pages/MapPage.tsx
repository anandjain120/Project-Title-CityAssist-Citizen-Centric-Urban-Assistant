import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './MapPage.css';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapPage() {
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [trafficData, setTrafficData] = useState<any[]>([]);

  useEffect(() => {
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          // Default to a sample location
          setUserLocation([40.7128, -74.0060]); // NYC
        }
      );
    } else {
      setUserLocation([40.7128, -74.0060]);
    }
  }, []);

  if (!userLocation) {
    return <div className="map-loading">Loading map...</div>;
  }

  return (
    <div className="map-page">
      <div className="map-header">
        <h1>Commuter Assistant</h1>
        <p>Real-time traffic and route recommendations</p>
      </div>

      <div className="map-container">
        <MapContainer
          center={userLocation}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={userLocation}>
            <Popup>Your Location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <div className="map-actions">
        <button className="btn btn-primary">Get Route</button>
        <button className="btn btn-secondary">Alternate Routes</button>
        <button className="btn btn-secondary">Traffic Info</button>
      </div>
    </div>
  );
}

