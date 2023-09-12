import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { TileLayer, MapContainer, Marker, Popup, useMapEvents, Polyline } from "react-leaflet";
import Uavicon from '../../assets/uavmark.png';

import 'leaflet/dist/Leaflet.css';
//import 'leaflet-bing-layer'
import L from 'leaflet';
import 'leaflet-rotatedmarker'

const IconLocation = L.icon({
    iconUrl: Uavicon,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  })

const MapComponent = () => {
  //const bingMapsKey = 'AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx'
  
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const uavRef = useRef(null);
  const uavData = useSelector((state) => state.uav);

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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
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

      <Polyline pathOptions={{ color: 'red' }} positions={[[-32.7983559, -55.9612037], [-32.7883559, -55.9712037]]} />
      
      {markers.map((position, idx) => (
        <Marker key={`marker-${idx}`} position={position}>
          <Popup>
            <span>Un marcador.</span>
          </Popup>
        </Marker>
      ))}
      
      <LocationMarker markers={markers} setMarkers={setMarkers} />
    </MapContainer>
  );
};

function LocationMarker({ markers, setMarkers }) {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      const newMarker = [lat, lng];
      setMarkers([...markers, newMarker]); 
    }
  });
  return null;
}


export default MapComponent;

     // <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  /> 
     //<TileLayer.Bing key={bingMapsKey}/>