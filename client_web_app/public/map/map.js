// UAV position
const orientationv = document.getElementById('orientation-value')
const roll = document.getElementById('roll-value')
const pitch = document.getElementById('pitch-value')


let marker, droneIcon, mymap, heat


async function createMap() {

  mymap = L.map('map').setView([-34.7737, -55.8279], 17) // --------- crea mapa

      // Add baselayer
    /*  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19
      }).addTo(mymap)*/
  
      // Add geographical labels only layer on top of baselayer
  /*    var labels = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 19,
        pane: 'shadowPane'  // always display on top
      }).addTo(mymap)*/
      



 /* L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', // ------ capa basica openstreetmap
    {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      tileSize: 512,
      zoomOffset: -1,
      accessToken: 'your.mapbox.access.token'
    }
  ).addTo(mymap)*/

  const bingLayer = L.tileLayer.bing({ //----------------------------- crea capa terreno
    bingMapsKey: "AjfnsByYOk_tdufEWpdpE9PLJ_Wlz0vTia_5FZzhKstX5sWKMXEc4wPgGUQsSQvx",
    imagerySet: "AerialWithLabels",
  })
  bingLayer.addTo(mymap) // ----------------------------------- agrega capa terreno al mapa

  droneIcon = L.icon({ // -------------------------------- marcado personalizado UAV
    iconUrl: './images/uavmark.png',
    iconSize: [40, 40],
    iconAnchor: [5, 5],
    //popupAnchor: [popupAnchorX, popupAnchorY]
  })

  marker = L.marker([0, 0], { // ------------------ agrega marcador al mapa
    icon: droneIcon,
    rotationAngle: 0
    }
  ).addTo(mymap)


  heat = L.heatLayer([
    [-34.77377, -55.8278, 0.9], // lat, lng, intensity
    [-34.77376, -55.8279, 0.9],
    [-34.77375, -55.8278, 0.9],
    [-34.77374, -55.8279, 0.9],
    [-34.77374, -55.8283, 0.9],
    [-34.77372, -55.8279, 0.9],
    [-34.77371, -55.8278, 0.9],
    [-34.77370, -55.8282, 0.9],
    [-34.77369, -55.8280, 0.9],
    [-34.77368, -55.8279, 0.9],
    [-34.77367, -55.8277, 0.9],
    [-34.77356, -55.8280, 0.9],
    [-34.77365, -55.8279, 0.9]
    ],
    {
      radius: 12,
      blur: 10
    }).addTo(mymap)

 



}

async function refreshMap () {
  
  let newUbication
  await fetch(`http://192.168.1.18:8080/pix`, {
    })
    .then(response => response.json())
    .then(data => newUbication = data)

  marker.remove()

  marker = L.marker([newUbication.lat / 1E7, newUbication.lon / 1E7], {
    icon: droneIcon,
    rotationAngle: newUbication.heading
    }
  ).addTo(mymap)

  orientationv.innerHTML = newUbication.heading + '°'
  roll.innerHTML = newUbication.lat / 1E7 + '°'
  pitch.innerHTML = newUbication.lon / 1E7 + '°'
}