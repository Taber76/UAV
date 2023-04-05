import React from 'react';
import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import L from 'leaflet';
import BingLayer from 'leaflet-bing-layer';

const MyMapContainer = () => {
  const [droneStatus, setDroneStatus] = useState({});

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetch('http://192.168.1.18:8080/pix')
        .then(response => response.json())
        .then(data => setDroneStatus(data));
    }, 1000); // Actualiza los datos cada segundo

    return () => clearInterval(intervalId); // Limpia el intervalo al desmontar el componente
  }, []);

  const bingMapsKey = "AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx";
  const bingLayer = new BingLayer(bingMapsKey, { type: "AerialWithLabels" });

  const droneIcon = L.icon({
    iconUrl: 'uavmark.png',
    iconSize: [40, 40],
    iconAnchor: [5, 5],
  });

  return (
    <div className="container">
      <MapContainer center={[-34.7737, -55.8279]} zoom={17} style={{ height: '100vh', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />
        {bingLayer}
        <Marker position={[droneStatus.lat / 1E7, droneStatus.lon / 1E7]} icon={droneIcon} rotationAngle={0} />
      </MapContainer>
    </div>
  );
};

export default MyMapContainer;