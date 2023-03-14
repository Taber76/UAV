// Crea mapa para drone
let mymap = L.map('map').setView([-34.7737, -55.8279], 17)

// Agrega una capa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
  }
).addTo(mymap)

// Crear un icono de marcador personalizado
const droneIcon = L.icon({
  iconUrl: 'uavmark.png',
  iconSize: [30, 30],
  //iconAnchor: [anchorX, anchorY],
  //popupAnchor: [popupAnchorX, popupAnchorY]
})



// Crear un mapa centrado en Uruguay
var mymapuru = L.map('mapwhere').setView([-34.77, -55.82], 10)

// Agregar una capa de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; OpenStreetMap contributors',
  maxZoom: 18
}).addTo(mymapuru)

// Agregar un controlador de eventos para el evento "click" en el mapa
mymapuru.on('click', function(e) {
  // Obtener las coordenadas del punto donde se hizo clic
  var lat = e.latlng.lat.toFixed(6);
  var lng = e.latlng.lng.toFixed(6);

  // Mostrar las coordenadas en la consola del navegador
  console.log('Latitud: ' + lat + ', Longitud: ' + lng);
});


let marker = L.marker([0, 0], {
  icon: droneIcon,
  rotationAngle: 0
  }
).addTo(mymap)



setInterval(async function() {
  let newUbication
  await fetch(`http://192.168.1.12:8080`, {
    })
      .then(response => response.json())
      .then(data => newUbication = data)

   marker.remove()

  marker = L.marker([newUbication.lat / 1E7, newUbication.lon / 1E7], {
    icon: droneIcon,
    rotationAngle: newUbication.heading
    }
  ).addTo(mymap)
 
  console.log('fetch')
}, 2000)