import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TileLayer, MapContainer, Marker } from "react-leaflet";
import Uavicon from '../../assets/uavmark.png';

import 'leaflet/dist/Leaflet.css';
import 'leaflet-bing-layer'
import L from 'leaflet';
import 'leaflet-rotatedmarker'


const MapComponent = () => {
  //const bingMapsKey = 'AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx'
  //const { latitude, longitude, zoomLevel } = {latitude: -34.7737, longitude: -55.8279, zoomLevel: 17};
  const[position, setPosition] = useState({
    lat: -32.7983559,
    lon: -55.9612037,
    zoom: 7
  })
  const [mapKey, setMapKey] = useState(0)    
  
  const dispatch = useDispatch();
  const uavData = useSelector((state) => state.uav);

  const IconLocation = L.icon({
    iconUrl: Uavicon,
    iconSize: [40, 40],
    iconAnchor: [5, 5],
  })

  useEffect(() => {
    if (uavData.connected) {
      setPosition({
        lat: uavData.position.lat,
        lon: uavData.position.lon,
        zoom: 13
      });
    } else {
      setPosition({
        lat: -32.7983559,
        lon: -55.9612037,
        zoom: 7
      });
    }

  }, [uavData.connected, uavData.position]);

  useEffect(() => {
    setMapKey((prevKey) => prevKey + 1);
  }, [uavData.connected]);
  
  
  return (
    <MapContainer
      className='leaflet-container'
      key={mapKey}
      center={[position.lat, position.lon]}
      zoom={position.zoom}
      scrollWheelZoom={true}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      {uavData.connected && (
        <Marker 
          position={[position.lat, position.lon]}
          icon={IconLocation}
          rotationAngle={145}
          rotationOrigin="center"
        />
      )}        
    </MapContainer>
  );
};

export default MapComponent;

     // <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  /> 
     //<TileLayer.Bing key={bingMapsKey}/>