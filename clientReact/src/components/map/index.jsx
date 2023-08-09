import { TileLayer, MapContainer, Marker } from "react-leaflet";
import Uavicon from '../../assets/uavmark.png';

import 'leaflet/dist/Leaflet.css';
import 'leaflet-bing-layer'
import L from 'leaflet';
import 'leaflet-rotatedmarker'


const MapComponent = () => {
  //const bingMapsKey = 'AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx'

  //const { latitude, longitude, zoomLevel } = {latitude: -34.7737, longitude: -55.8279, zoomLevel: 17};

  //console.log({ latitude, longitude, zoomLevel }, bingMapsKey);

  const IconLocation = L.icon({
    iconUrl: Uavicon,
    iconSize: [40, 40],
    iconAnchor: [5, 5]
  })


  return (
    <MapContainer className='leaflet-container' center={[-34.7737, -55.8279]} zoom={13} scrollWheelZoom={true}>
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' />
      <Marker 
        position={[-34.7737, -55.8279]}
        icon={IconLocation}
        rotationAngle={145}
        rotationOrigin="center"
      />        
    </MapContainer>
  );
};

export default MapComponent;

     // <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'  /> 
     //<TileLayer.Bing key={bingMapsKey}/>