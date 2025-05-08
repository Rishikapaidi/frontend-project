import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Configure default icon paths for Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

interface Service {
  id: number;
  title: string;
  latitude: number;
  longitude: number;
}

interface ServiceMapProps {
  services: Service[];
  userCoords: { lat: number; lng: number };
}

const ServiceMap: React.FC<ServiceMapProps> = ({ services, userCoords }) => {
  return (
    <MapContainer
      center={[userCoords.lat, userCoords.lng]}
      zoom={13}
      className="h-96 w-full rounded shadow"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location marker */}
      <Marker position={[userCoords.lat, userCoords.lng]}>
        <Popup>You are here</Popup>
      </Marker>

      {/* Service location markers */}
      {services.map((service) => (
        <Marker
          key={service.id}
          position={[service.latitude, service.longitude]}
        >
          <Popup>{service.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ServiceMap;
