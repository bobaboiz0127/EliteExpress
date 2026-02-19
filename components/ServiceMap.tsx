
import React, { useEffect, useRef } from 'react';
import { SERVICE_AREAS } from '../constants';

const ServiceMap: React.FC = () => {
  const mapRef = useRef<any>(null);

  useEffect(() => {
    // Check if Leaflet is loaded
    if (!(window as any).L) return;
    const L = (window as any).L;

    // Center map roughly between Dallas and Frisco
    if (!mapRef.current) {
      mapRef.current = L.map('service-map').setView([32.95, -96.75], 10);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(mapRef.current);

      // Add a circle representing our general service zone
      const circle = L.circle([32.95, -96.75], {
        color: '#DA70D6', // Orchid color
        fillColor: '#DA70D6',
        fillOpacity: 0.1,
        radius: 25000 // 25km radius
      }).addTo(mapRef.current);

      // Add markers for the 4 cities
      SERVICE_AREAS.forEach(area => {
        L.marker(area.coords)
          .addTo(mapRef.current)
          .bindPopup(`<b>${area.name}</b><br/>EliteExpress Service Area`)
          .openPopup();
      });

      // Try to get user location
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          const { latitude, longitude } = pos.coords;
          L.circleMarker([latitude, longitude], {
            radius: 8,
            fillColor: "#DA70D6",
            color: "#fff",
            weight: 2,
            opacity: 1,
            fillOpacity: 0.8
          }).addTo(mapRef.current).bindPopup("<b>You are here</b>").openPopup();
        }, (err) => {
          console.warn("Geolocation denied or unavailable", err);
        });
      }
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div className="bg-slate-900/80 p-8 rounded-[2.5rem] border border-slate-800 shadow-2xl orchid-shadow">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-3xl font-black text-white flex items-center tracking-tight uppercase">
          <svg className="w-8 h-8 mr-4 orchid-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Elite Zone
        </h3>
        <div className="flex items-center bg-slate-800 px-4 py-2 rounded-2xl border border-slate-700">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
          <span className="text-xs font-black text-green-400 uppercase tracking-widest">
            Mobile Units Active
          </span>
        </div>
      </div>
      <p className="text-xl text-slate-400 mb-8 font-medium">
        We bring our premium mobile studio directly to you in <span className="text-white font-bold">Dallas, Plano, Richardson, and Frisco.</span>
      </p>
      <div id="service-map" className="border-4 border-slate-800 overflow-hidden rounded-3xl orchid-shadow-sm shadow-inner"></div>
      <div className="mt-8 flex flex-wrap gap-3">
        {SERVICE_AREAS.map(area => (
          <span key={area.name} className="bg-slate-950 text-slate-300 px-5 py-2.5 rounded-2xl text-lg font-black border border-slate-800 uppercase tracking-wider">
            {area.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ServiceMap;
