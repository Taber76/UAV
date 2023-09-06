import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { TileLayer, MapContainer, Marker } from "react-leaflet";
import Uavicon from '../../assets/uavmark.png';

import 'leaflet/dist/Leaflet.css';
import 'leaflet-bing-layer'
import L from 'leaflet';
import 'leaflet-rotatedmarker'

const MapComponent = () => {
  //const bingMapsKey = 'AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx'
  //const { latitude, longitude, zoomLevel } = {latitude: -34.7737, longitude: -55.8279, zoomLevel: 17};
  const mapRef = useRef(null);
  const uavRef = useRef(null);
  const uavData = useSelector((state) => state.uav);

  const IconLocation = L.icon({
    iconUrl: Uavicon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

  useEffect(() => {
    if (mapRef.current && uavData.connected) {
      const map = mapRef.current;
      const newPosition = L.latLng(uavData.position.lat, uavData.position.lon);
      map.setView(newPosition, map.getZoom(), { animate: true });
    }
  }, [uavData.connected]);

  useEffect(() => {
    if (uavRef.current && uavData.connected) {
      const uav = uavRef.current;
      const newPosition = L.latLng(uavData.position.lat, uavData.position.lon);
      uav.setLatLng(newPosition);
      uav.setRotationAngle(uavData.position.hdg);
    }
  }, [uavData.position]);
  
  return (
    <MapContainer
      ref={mapRef}
      className='leaflet-container'
      center={[-32.7983559, -55.9612037]}
      zoom={7}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {uavData.connected && (
        <Marker
          key={uavData.position.hdg}
          ref={uavRef}
          position={[uavData.position.lat, uavData.position.lon]}
          icon={IconLocation}
          rotationAngle={uavData.position.hdg}
          rotationOrigin="center"
        />
      )}        
    </MapContainer>
  );
};

export default MapComponent;

     // <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  /> 
     //<TileLayer.Bing key={bingMapsKey}/>