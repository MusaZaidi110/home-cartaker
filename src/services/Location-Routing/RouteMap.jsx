import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet-routing-machine';

const RouteMap = ({ from, to }) => {
  const [directions, setDirections] = useState([]);

  useEffect(() => {
    const map = L.map('map').setView(from, 13);

    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    // Initialize routing control
    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(from[0], from[1]),
        L.latLng(to[0], to[1])
      ],
      routeWhileDragging: false,
    });

    // Extract step-by-step directions
    routingControl.on('routesfound', (e) => {
      const steps = e.routes[0].instructions;
      const directionsText = steps.map(step => step.text);
      setDirections(directionsText);
    });

    routingControl.addTo(map);

    return () => map.remove();
  }, [from, to]);

  return (
    <div>
      <div id="map" style={{ height: "500px", width: "100%" }}></div>
      <div style={{ marginTop: '20px', fontSize: '16px', fontFamily: 'Arial' }}>
        <h3>Directions</h3>
        <ul>
          {directions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default RouteMap;


// <RouteMap
//   from={[33.5577088, 73.138176]} // vendor location
//   to={[33.6587088, 73.258176]}   // user location
// />